import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Stack,
} from "@mui/material";
import { Description, Assignment, Lock as LockIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const MotionBox = motion(Box);

export default function Plan() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [visibleFields, setVisibleFields] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  // Helper function to check if a field should be visible based on conditional logic
  const shouldShowField = (field) => {
    if (!field.conditional_logic) return true;

    const { depends_on_field, show_when_value, hide_when_value } = field.conditional_logic;
    const dependentValue = formData[depends_on_field];

    // If hide_when_value is specified and matches, hide the field
    if (hide_when_value && dependentValue === hide_when_value) {
      return false;
    }

    // If show_when_value is specified, only show when it matches
    if (show_when_value) {
      return dependentValue === show_when_value;
    }

    // If no specific conditions, show by default
    return true;
  };

  // Update visible fields when form data changes (only when visibility actually changes)
  useEffect(() => {
    if (selectedForm?.fields) {
      const visible = selectedForm.fields
        .filter(field => shouldShowField(field))
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

      console.log('Visible fields:', visible.map(f => ({ id: f.id, type: f.field_type, display_order: f.display_order })));

      // Only reset step if the visible fields actually changed
      const visibleFieldIds = visible.map(f => f.id).sort().join(',');
      const currentVisibleIds = visibleFields.map(f => f.id).sort().join(',');

      setVisibleFields(visible);

      // Only reset to first step if the set of visible fields changed
      if (visibleFieldIds !== currentVisibleIds) {
        setCurrentStep(0);
      }
    }
  }, [selectedForm, formData, visibleFields]);

  // Handle form input changes
  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Check if current field is valid/answered
  const isCurrentFieldValid = () => {
    const field = currentField;
    if (!field) return true; // No field to validate

    // If field is not required, it's always valid
    if (!field.is_required) return true;

    // Special handling for compound fields
    if (field.field_type === 'compound') {
      return (field.sub_fields || []).every(subField => {
        if (!subField.is_required) return true;

        const subFieldValue = formData[subField.field_name];
        switch (subField.type) {
          case 'text':
          case 'email':
          case 'tel':
          case 'number':
          case 'textarea':
          case 'date':
            return subFieldValue && subFieldValue.toString().trim() !== '';
          default:
            return true;
        }
      });
    }

    const fieldValue = formData[field.field_name];

    // Check based on field type
    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'textarea':
      case 'date':
        return fieldValue && fieldValue.toString().trim() !== '';

      case 'select':
        return fieldValue && fieldValue !== '';

      case 'radio':
        return fieldValue && fieldValue !== '';

      case 'checkbox':
        return fieldValue === true;

      case 'checkbox_group':
        return fieldValue && Array.isArray(fieldValue) && fieldValue.length > 0;

      default:
        return true;
    }
  };

  // Navigation functions
  const handleNext = () => {
    if (currentStep < visibleFields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if all visible required fields are valid
  const areAllFieldsValid = () => {
    console.log('Checking validation for fields:', visibleFields.map(f => ({ id: f.id, type: f.field_type, required: f.is_required })));
    return visibleFields.every(field => {
      if (!field.is_required) return true;

      // Special handling for compound fields
      if (field.field_type === 'compound') {
        console.log('Validating compound field:', field.field_name, 'sub_fields:', field.sub_fields);
        const isValid = (field.sub_fields || []).every(subField => {
          if (!subField.is_required) return true;

          const subFieldValue = formData[subField.field_name];
          console.log(`Checking sub_field ${subField.field_name}:`, subFieldValue);
          switch (subField.type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'number':
            case 'textarea':
            case 'date':
              return subFieldValue && subFieldValue.toString().trim() !== '';
            default:
              return true;
          }
        });
        console.log('Compound field valid:', isValid);
        return isValid;
      }

      const fieldValue = formData[field.field_name];
      console.log(`Checking field ${field.field_name}:`, fieldValue);

      // Check based on field type
      switch (field.field_type) {
        case 'text':
        case 'email':
        case 'tel':
        case 'number':
        case 'textarea':
        case 'date':
          return fieldValue && fieldValue.toString().trim() !== '';

        case 'select':
          return fieldValue && fieldValue !== '';

        case 'radio':
          return fieldValue && fieldValue !== '';

        case 'checkbox':
          return fieldValue === true;

        case 'checkbox_group':
          return fieldValue && Array.isArray(fieldValue) && fieldValue.length > 0;

        default:
          return true;
      }
    });
  };

  const handleSubmit = async () => {
    // Validate all fields before submission
    if (!areAllFieldsValid()) {
      alert('Please answer all required questions before submitting.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`/api/forms/public/${selectedForm.slug}/submit`, formData);
      // Handle success - show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your enquiry has been submitted successfully. We'll get back to you within 24 hours.",
        confirmButtonColor: "#B85C38",
      });
      setSelectedForm(null);
      setCurrentStep(0);
      setFormData({});
    } catch (error) {
      console.error('Form submission error:', error);
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: error.message || "Please try again.",
        confirmButtonColor: "#B85C38",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get current field to display
  const currentField = visibleFields[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === visibleFields.length - 1;

  const fetchForms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/forms/public');

      // Process forms to extract sub_fields from validation_rules for compound fields
      const processedForms = (response.data.data || []).map(form => ({
        ...form,
        fields: form.fields.map(field => {
          // Extract sub_fields from validation_rules for compound fields
          if (field.field_type === 'compound' && field.validation_rules?.sub_fields) {
            console.log('Processing compound field:', field.field_name, 'sub_fields:', field.validation_rules.sub_fields);
            return {
              ...field,
              sub_fields: field.validation_rules.sub_fields
            };
          }
          return field;
        })
      }));

      setForms(processedForms);
    } catch (err) {
      setError(err.message || 'Failed to load forms');
    } finally {
      setLoading(false);
    }
  };

  // Reset form state when selecting a new form
  const selectForm = (form) => {
    setSelectedForm(form);
    setCurrentStep(0);
    setFormData({});
    setVisibleFields([]);
  };

  // If there's only one form and no selection needed, select it automatically
  if (forms.length === 1 && !selectedForm) {
    const singleForm = forms[0];
    // Automatically select the single form to trigger the step-by-step logic
    setTimeout(() => selectForm(singleForm), 0);
    return null; // Return null while selecting
  }

  // Render the step-by-step form if a form is selected
  if (selectedForm) {
    const currentForm = selectedForm;
    return (
      <Box
        sx={{
          pt: 1.5,
          pb: 1.5,
          px: 0,
          bgcolor: "#F5F1E8",
          background:
            "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            pt: { xs: 0.75, sm: 0.75, md: 0.75 },
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                py: { xs: 1.5, sm: 2, md: 2.5 },
                px: { xs: 1.5, sm: 1.5, md: 1.5 },
                borderRadius: { xs: 3, md: 4 },
                background: "#FFFFFF",
                border: "1px solid rgba(107, 78, 61, 0.2)",
                minHeight: "auto",
                height: "auto",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                    fontWeight: 800,
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                    background:
                      "linear-gradient(45deg, #6B4E3D, #B85C38, #3D2817)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: { xs: "80px", sm: "100px", md: "120px" },
                      height: "4px",
                      background: "linear-gradient(45deg, #6B4E3D, #B85C38)",
                      borderRadius: "2px",
                    },
                  }}
                >
                  GET A TRIP QUOTE
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 3,
                    fontWeight: 500,
                    fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                    color: "text.secondary",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Your private African safari quote – delivered in 24 hrs
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    color: "text.secondary",
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.6,
                    textAlign: "center",
                  }}
                >
                  Share your dates, dream wildlife sightings and budget. We'll hand-craft
                  an expert-guided, crowd-free itinerary across East Africa's best parks and
                  beaches. Ready for the Great Migration, gorilla treks or Zanzibar's white
                  sand? Let's build your unforgettable journey today.
                </Typography>
              </Box>

              {/* Progress Indicator */}
              <Box sx={{ px: { xs: 2, md: 4 }, mb: 3 }}>
                <Box sx={{ maxWidth: 800, mx: "auto" }}>
                  <Typography variant="body2" sx={{ mb: 1, color: "#6B4E3D", textAlign: "center" }}>
                    Question {currentStep + 1} of {visibleFields.length}
                  </Typography>
                  <Box sx={{ width: '100%', height: 8, bgcolor: '#e0e0e0', borderRadius: 4 }}>
                    <Box
                      sx={{
                        width: `${((currentStep + 1) / visibleFields.length) * 100}%`,
                        height: '100%',
                        bgcolor: '#B85C38',
                        borderRadius: 4,
                        transition: 'width 0.3s ease-in-out'
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Current Question */}
              <Box sx={{ px: { xs: 2, md: 4 }, pb: 2 }}>
                {currentField ? (
                  <Box sx={{ maxWidth: 800, mx: "auto" }}>
                    <Typography variant="h6" sx={{ mb: 3, color: "#6B4E3D", fontWeight: 600, textAlign: "center" }}>
                      Please answer the following question:
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          color: "#2c3e50",
                          textAlign: "center",
                        }}
                      >
                        {currentStep + 1}. {currentField.label}
                        {currentField.is_required && (
                          <Typography component="span" sx={{ color: "#d32f2f", ml: 0.5 }}>
                            *
                          </Typography>
                        )}
                      </Typography>

                      {/* Render current field based on type */}
                      <Box sx={{ maxWidth: 600, mx: "auto" }}>
                        {currentField.field_type === 'text' || currentField.field_type === 'email' || currentField.field_type === 'tel' || currentField.field_type === 'number' ? (
                          <TextField
                            fullWidth
                            type={currentField.field_type}
                            placeholder={currentField.placeholder || `Enter ${currentField.label.toLowerCase()}`}
                            variant="outlined"
                            required={currentField.is_required}
                            value={formData[currentField.field_name] || ''}
                            onChange={(e) => handleInputChange(currentField.field_name, e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f9f9f9',
                                '& fieldset': {
                                  borderColor: 'rgba(107, 78, 61, 0.3)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#6B4E3D',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#B85C38',
                                },
                              },
                            }}
                          />
                        ) : currentField.field_type === 'textarea' ? (
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder={currentField.placeholder || `Enter ${currentField.label.toLowerCase()}`}
                            variant="outlined"
                            required={currentField.is_required}
                            value={formData[currentField.field_name] || ''}
                            onChange={(e) => handleInputChange(currentField.field_name, e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f9f9f9',
                                '& fieldset': {
                                  borderColor: 'rgba(107, 78, 61, 0.3)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#6B4E3D',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#B85C38',
                                },
                              },
                            }}
                          />
                        ) : currentField.field_type === 'select' ? (
                          <FormControl fullWidth required={currentField.is_required}>
                            <InputLabel>Select {currentField.label.toLowerCase()}</InputLabel>
                            <Select
                              label={`Select ${currentField.label.toLowerCase()}`}
                              value={formData[currentField.field_name] || ''}
                              onChange={(e) => handleInputChange(currentField.field_name, e.target.value)}
                              sx={{
                                backgroundColor: '#f9f9f9',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'rgba(107, 78, 61, 0.3)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#6B4E3D',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#B85C38',
                                },
                              }}
                            >
                              <MenuItem value="">
                                <em>Choose an option</em>
                              </MenuItem>
                              {currentField.options?.map((option) => (
                                <MenuItem key={option.id} value={option.option_value}>
                                  {option.option_label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : currentField.field_type === 'radio' ? (
                          <FormControl component="fieldset" required={currentField.is_required}>
                            <RadioGroup
                              value={formData[currentField.field_name] || ''}
                              onChange={(e) => handleInputChange(currentField.field_name, e.target.value)}
                            >
                              {currentField.options?.map((option) => (
                                <FormControlLabel
                                  key={option.id}
                                  value={option.option_value}
                                  control={
                                    <Radio
                                      sx={{
                                        color: 'rgba(107, 78, 61, 0.3)',
                                        '&.Mui-checked': {
                                          color: '#B85C38',
                                        },
                                      }}
                                    />
                                  }
                                  label={option.option_label}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        ) : currentField.field_type === 'checkbox' ? (
                          <FormControlLabel
                            control={
                              <Checkbox
                                required={currentField.is_required}
                                checked={formData[currentField.field_name] || false}
                                onChange={(e) => handleInputChange(currentField.field_name, e.target.checked)}
                                sx={{
                                  color: 'rgba(107, 78, 61, 0.3)',
                                  '&.Mui-checked': {
                                    color: '#B85C38',
                                  },
                                }}
                              />
                            }
                            label={currentField.label}
                          />
                        ) : currentField.field_type === 'checkbox_group' ? (
                          <FormControl component="fieldset" required={currentField.is_required}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {currentField.options?.map((option) => (
                                <FormControlLabel
                                  key={option.id}
                                  control={
                                    <Checkbox
                                      checked={formData[currentField.field_name]?.includes(option.option_value) || false}
                                      onChange={(e) => {
                                        const currentValues = formData[currentField.field_name] || [];
                                        let newValues;
                                        if (e.target.checked) {
                                          newValues = [...currentValues, option.option_value];
                                        } else {
                                          newValues = currentValues.filter(val => val !== option.option_value);
                                        }
                                        handleInputChange(currentField.field_name, newValues);
                                      }}
                                      sx={{
                                        color: 'rgba(107, 78, 61, 0.3)',
                                        '&.Mui-checked': {
                                          color: '#B85C38',
                                        },
                                      }}
                                    />
                                  }
                                  label={option.option_label}
                                />
                              ))}
                            </Box>
                          </FormControl>
                        ) : currentField.field_type === 'date' ? (
                          <TextField
                            fullWidth
                            type="date"
                            label={currentField.label}
                            InputLabelProps={{ shrink: true }}
                            required={currentField.is_required}
                            value={formData[currentField.field_name] || ''}
                            onChange={(e) => handleInputChange(currentField.field_name, e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f9f9f9',
                                '& fieldset': {
                                  borderColor: 'rgba(107, 78, 61, 0.3)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#6B4E3D',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#B85C38',
                                },
                              },
                            }}
                          />
                        ) : currentField.field_type === 'compound' ? (
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {currentField.help_text || "Please fill in all the information below"}
                            </Typography>
                            <Stack spacing={2}>
                              {(currentField.sub_fields || []).map((subField) => (
                                <Box key={subField.field_name}>
                                  {subField.type === 'textarea' ? (
                                    <TextField
                                      fullWidth
                                      multiline
                                      rows={3}
                                      label={`${subField.label}${subField.is_required ? ' *' : ''}`}
                                      placeholder={subField.placeholder}
                                      required={subField.is_required}
                                      value={formData[subField.field_name] || ''}
                                      onChange={(e) => handleInputChange(subField.field_name, e.target.value)}
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          backgroundColor: '#f9f9f9',
                                          '& fieldset': {
                                            borderColor: 'rgba(107, 78, 61, 0.3)',
                                          },
                                          '&:hover fieldset': {
                                            borderColor: '#6B4E3D',
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: '#B85C38',
                                          },
                                        },
                                      }}
                                    />
                                  ) : subField.type === 'date' ? (
                                    <TextField
                                      fullWidth
                                      type="date"
                                      label={`${subField.label}${subField.is_required ? ' *' : ''}`}
                                      InputLabelProps={{ shrink: true }}
                                      required={subField.is_required}
                                      value={formData[subField.field_name] || ''}
                                      onChange={(e) => handleInputChange(subField.field_name, e.target.value)}
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          backgroundColor: '#f9f9f9',
                                          '& fieldset': {
                                            borderColor: 'rgba(107, 78, 61, 0.3)',
                                          },
                                          '&:hover fieldset': {
                                            borderColor: '#6B4E3D',
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: '#B85C38',
                                          },
                                        },
                                      }}
                                    />
                                  ) : (
                                    <TextField
                                      fullWidth
                                      type={subField.type}
                                      label={`${subField.label}${subField.is_required ? ' *' : ''}`}
                                      placeholder={subField.placeholder}
                                      required={subField.is_required}
                                      value={formData[subField.field_name] || ''}
                                      onChange={(e) => handleInputChange(subField.field_name, e.target.value)}
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          backgroundColor: '#f9f9f9',
                                          '& fieldset': {
                                            borderColor: 'rgba(107, 78, 61, 0.3)',
                                          },
                                          '&:hover fieldset': {
                                            borderColor: '#6B4E3D',
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: '#B85C38',
                                          },
                                        },
                                      }}
                                    />
                                  )}
                                </Box>
                              ))}
                            </Stack>
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: 'italic' }}>
                            Unsupported field type: {currentField.field_type}
                          </Typography>
                        )}

                        {currentField.help_text && (
                          <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: 'block', textAlign: 'center' }}>
                            {currentField.help_text}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 6 }}>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      No form fields available at the moment.
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Newsletter and Privacy Policy - Only show on last step */}
              {isLastStep && (
                <Box sx={{ px: { xs: 2, md: 4 }, mt: 3 }}>
                  <Box sx={{ maxWidth: 800, mx: "auto" }}>
                    {/* Newsletter Checkbox */}
                    <Box sx={{ mb: 3 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.newsletter_optin || false}
                            onChange={(e) => handleInputChange('newsletter_optin', e.target.checked)}
                            sx={{
                              color: 'rgba(107, 78, 61, 0.3)',
                              '&.Mui-checked': {
                                color: '#B85C38',
                              },
                            }}
                          />
                        }
                        label="Yes, send me Asilia Africa's newsletter. You can unsubscribe at any time. See our Privacy Policy."
                        sx={{
                          alignItems: 'flex-start',
                          '& .MuiFormControlLabel-label': {
                            fontSize: '0.9rem',
                            color: 'text.secondary',
                            lineHeight: 1.4,
                            ml: 1,
                          },
                        }}
                      />
                    </Box>

                    {/* Privacy Policy Notice */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      p: 2,
                      bgcolor: 'rgba(184, 92, 56, 0.05)',
                      borderRadius: 1,
                      border: '1px solid rgba(184, 92, 56, 0.1)',
                    }}>
                      <LockIcon sx={{ color: '#6B4E3D', mt: 0.2, fontSize: '1.2rem' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                        We protect your personal information. By submitting, you agree to the use of it as described in our Privacy Policy and Notice at Collection. You may opt out of our communications at any time.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Navigation Buttons - positioned at card edges */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                mx: { xs: -1.5, sm: -1.5, md: -1.5 },
                px: { xs: 1.5, sm: 1.5, md: 1.5 }
              }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={isFirstStep}
                  sx={{
                    px: 2,
                    py: 0.5,
                    color: '#6B4E3D',
                    borderColor: '#6B4E3D',
                    '&:hover': {
                      borderColor: '#B85C38',
                      backgroundColor: 'rgba(184, 92, 56, 0.1)',
                    },
                    '&:disabled': {
                      color: '#ccc',
                      borderColor: '#ccc',
                    },
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': { outline: 'none' },
                  }}
                >
                  Back
                </Button>

                {isLastStep ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading || !areAllFieldsValid()}
                    sx={{
                      px: 3,
                      py: 0.5,
                      background: "linear-gradient(135deg, #6B4E3D 0%, #B85C38 100%)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #8B4225 0%, #6B4E3D 100%)",
                      },
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      '&:disabled': {
                        background: '#ccc',
                        color: '#666',
                      },
                      '&:focus': { outline: 'none' },
                      '&:focus-visible': { outline: 'none' },
                    }}
                  >
                    {loading ? 'Submitting...' : (currentForm.submit_button_text || 'Submit Form')}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isCurrentFieldValid()}
                    sx={{
                      px: 3,
                      py: 0.5,
                      background: "linear-gradient(135deg, #6B4E3D 0%, #B85C38 100%)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #8B4225 0%, #6B4E3D 100%)",
                      },
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      '&:disabled': {
                        background: '#ccc',
                        color: '#666',
                      },
                      '&:focus': { outline: 'none' },
                      '&:focus-visible': { outline: 'none' },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Paper>
          </MotionBox>
        </Container>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          pt: 1.5,
          pb: 1.5,
          px: 0,
          bgcolor: "#F5F1E8",
          background:
            "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)",
            zIndex: 0,
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#3D2817",
              mb: 2,
              textAlign: "center",
            }}
          >
            Akira Safaris
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#B85C38",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Crafting Your African Adventure
          </Typography>
        </Box>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "#B85C38",
              mb: 2,
            }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "#6B4E3D",
            textAlign: "center",
            fontWeight: 500,
            position: "relative",
            zIndex: 1,
          }}
        >
          Loading your forms...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          pt: 1.5,
          pb: 1.5,
          px: 0,
          bgcolor: "#F5F1E8",
          background:
            "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)",
            zIndex: 0,
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 1.5,
        px: 0,
        bgcolor: "#F5F1E8",
        background:
          "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)",
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0.75, sm: 0.75, md: 0.75 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              py: { xs: 1.5, sm: 2, md: 2.5 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(107, 78, 61, 0.2)",
              minHeight: "auto",
              height: "auto",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                  background:
                    "linear-gradient(45deg, #6B4E3D, #B85C38, #3D2817)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "80px", sm: "100px", md: "120px" },
                    height: "4px",
                    background: "linear-gradient(45deg, #6B4E3D, #B85C38)",
                    borderRadius: "2px",
                  },
                }}
              >
                Plan Your Adventure
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  fontWeight: 500,
                  fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                  color: "text.secondary",
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.7,
                }}
              >
                Fill out our safari planning form to get started on your adventure
              </Typography>
            </Box>

        {forms.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No forms available at the moment
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {forms.map((form) => (
              <Grid item xs={12} sm={6} md={4} key={form.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={() => selectForm(form)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Assignment sx={{ mr: 1, color: '#6B4E3D' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {form.title}
                      </Typography>
                    </Box>

                    {form.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, lineHeight: 1.5 }}
                      >
                        {form.description.length > 100
                          ? `${form.description.substring(0, 100)}...`
                          : form.description
                        }
                      </Typography>
                    )}

                    {/* Form Fields Preview */}
                    {form.fields && form.fields.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#6B4E3D' }}>
                          Questions ({form.fields.length}):
                        </Typography>
                        <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                          {form.fields.slice(0, 5).map((field, index) => (
                            <Box key={field.id} sx={{ mb: 1.5 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                                {index + 1}. {field.label}
                                {field.is_required && <span style={{ color: '#d32f2f' }}> *</span>}
                              </Typography>

                              {/* Field Type Preview */}
                              <Box sx={{ mt: 0.5, pl: 2 }}>
                                {field.field_type === 'text' || field.field_type === 'email' || field.field_type === 'tel' || field.field_type === 'number' ? (
                                  <Box
                                    sx={{
                                      height: 32,
                                      border: '1px solid #e0e0e0',
                                      borderRadius: 1,
                                      backgroundColor: '#f9f9f9',
                                      display: 'flex',
                                      alignItems: 'center',
                                      px: 1
                                    }}
                                  >
                                    <Typography variant="caption" color="text.secondary">
                                      {field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                    </Typography>
                                  </Box>
                                ) : field.field_type === 'textarea' ? (
                                  <Box
                                    sx={{
                                      height: 48,
                                      border: '1px solid #e0e0e0',
                                      borderRadius: 1,
                                      backgroundColor: '#f9f9f9',
                                      display: 'flex',
                                      alignItems: 'center',
                                      px: 1
                                    }}
                                  >
                                    <Typography variant="caption" color="text.secondary">
                                      {field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                    </Typography>
                                  </Box>
                                ) : field.field_type === 'select' ? (
                                  <Box
                                    sx={{
                                      height: 32,
                                      border: '1px solid #e0e0e0',
                                      borderRadius: 1,
                                      backgroundColor: '#f9f9f9',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      px: 1
                                    }}
                                  >
                                    <Typography variant="caption" color="text.secondary">
                                      Select an option
                                    </Typography>
                                  </Box>
                                ) : field.field_type === 'radio' ? (
                                  <Box sx={{ pl: 1 }}>
                                    {field.options?.map((option, optIndex) => (
                                      <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                        <Box
                                          sx={{
                                            width: 12,
                                            height: 12,
                                            border: '1px solid #6B4E3D',
                                            borderRadius: '50%',
                                            mr: 1
                                          }}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                          {option.option_label}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                ) : field.field_type === 'checkbox' ? (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                      sx={{
                                        width: 12,
                                        height: 12,
                                        border: '1px solid #6B4E3D',
                                        mr: 1
                                      }}
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                      {field.label}
                                    </Typography>
                                  </Box>
                                ) : field.field_type === 'checkbox_group' ? (
                                  <Box sx={{ pl: 1 }}>
                                    {field.options?.map((option) => (
                                      <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                        <Box
                                          sx={{
                                            width: 12,
                                            height: 12,
                                            border: '1px solid #6B4E3D',
                                            mr: 1
                                          }}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                          {option.option_label}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                ) : field.field_type === 'date' ? (
                                  <Box
                                    sx={{
                                      height: 32,
                                      border: '1px solid #e0e0e0',
                                      borderRadius: 1,
                                      backgroundColor: '#f9f9f9',
                                      display: 'flex',
                                      alignItems: 'center',
                                      px: 1
                                    }}
                                  >
                                    <Typography variant="caption" color="text.secondary">
                                      Select date
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    {field.field_type} field
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          ))}

                          {form.fields.length > 5 && (
                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1, display: 'block' }}>
                              +{form.fields.length - 5} more questions...
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}
