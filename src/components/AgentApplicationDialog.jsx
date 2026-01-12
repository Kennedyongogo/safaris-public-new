import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";

export default function AgentApplicationDialog({ open, onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    business_type: "",
    years_of_experience: "",
    motivation: "",
    target_market: "",
  });

  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

  const handleNext = () => {
    const isValid = validateStep(activeStep);
    if (!isValid) {
      // Close dialog first (without resetting form), then show alert
      handleClose(false);
      setTimeout(() => {
        Swal.fire({
          icon: "warning",
          title: "Please Complete Required Fields",
          text: "Please fill in all required fields before proceeding. Reopen the form to see which fields need attention.",
          confirmButtonColor: "#c8a97e",
          zIndex: 10000,
          didOpen: () => {
            const confirmButton = document.querySelector(".swal2-confirm");
            if (confirmButton) {
              confirmButton.style.outline = "none";
              confirmButton.style.boxShadow = "none";
              confirmButton.addEventListener("focus", (e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "none";
              });
            }
          },
        });
      }, 300);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = (resetForm = true) => {
    if (resetForm) {
      setActiveStep(0);
      setErrors({});
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company_name: "",
        business_type: "",
        years_of_experience: "",
        motivation: "",
        target_market: "",
      });
    }
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0:
        if (!formData.full_name.trim()) {
          newErrors.full_name = "Full name is required";
        }
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        }
        
        setErrors(newErrors);
        
        // Return validation result (don't show alert here, it will be shown in handleNext)
        return Object.keys(newErrors).length === 0;
      default:
        setErrors({});
        return true;
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!validateStep(0)) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company_name: formData.company_name.trim() || null,
        business_type: formData.business_type.trim() || null,
        years_of_experience: formData.years_of_experience
          ? parseInt(formData.years_of_experience)
          : null,
        motivation: formData.motivation.trim() || null,
        target_market: formData.target_market.trim() || null,
      };

      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Close dialog first, then show success message
        handleClose();
        
        // Small delay to ensure dialog closes before showing alert
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Application Submitted!",
            html: `
              <p style="margin: 1rem 0;">Thank you for your interest in becoming an agent with Akira Safaris.</p>
              <p style="margin: 1rem 0; font-size: 0.9rem; color: #666;">
                Your application has been received and is pending review. 
                Our team will get back to you within 2-3 business days.
              </p>
            `,
            confirmButtonColor: "#c8a97e",
            confirmButtonText: "OK",
            zIndex: 10000,
            didOpen: () => {
              const confirmButton = document.querySelector(".swal2-confirm");
              if (confirmButton) {
                confirmButton.style.outline = "none";
                confirmButton.style.boxShadow = "none";
                confirmButton.addEventListener("focus", (e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                });
              }
            },
          });
        }, 100);
      } else {
        throw new Error(data.message || "Failed to submit application");
      }
    } catch (error) {
      // Close dialog first, then show error message
      handleClose();
      
      // Small delay to ensure dialog closes before showing alert
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: error.message || "An error occurred while submitting your application. Please try again later.",
            confirmButtonColor: "#c8a97e",
            confirmButtonText: "OK",
            zIndex: 10000,
          didOpen: () => {
            const confirmButton = document.querySelector(".swal2-confirm");
            if (confirmButton) {
              confirmButton.style.outline = "none";
              confirmButton.style.boxShadow = "none";
              confirmButton.addEventListener("focus", (e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "none";
              });
            }
          },
        });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    const textFieldStyles = {
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        "&:hover fieldset": {
          borderColor: "#c8a97e",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#c8a97e",
          borderWidth: 2,
        },
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#c8a97e",
      },
    };

    switch (step) {
      case 0:
        return (
          <Box>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: "#1a1a1a",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Personal Information
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={(e) => handleInputChange("full_name", e.target.value)}
              required
              error={!!errors.full_name}
              helperText={errors.full_name}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              error={!!errors.email}
              helperText={errors.email}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              error={!!errors.phone}
              helperText={errors.phone}
              sx={textFieldStyles}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: "#1a1a1a",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Business Information
            </Typography>
            <TextField
              fullWidth
              label="Company Name (if applicable)"
              margin="normal"
              placeholder="Enter company name"
              value={formData.company_name}
              onChange={(e) => handleInputChange("company_name", e.target.value)}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Business Type"
              margin="normal"
              placeholder="e.g., Travel Agency, Freelancer"
              value={formData.business_type}
              onChange={(e) => handleInputChange("business_type", e.target.value)}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Years of Experience"
              margin="normal"
              type="number"
              placeholder="Enter years of experience"
              value={formData.years_of_experience}
              onChange={(e) => handleInputChange("years_of_experience", e.target.value)}
              inputProps={{ min: 0, max: 120 }}
              sx={textFieldStyles}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: "#1a1a1a",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Additional Details
            </Typography>
            <TextField
              fullWidth
              label="Why do you want to become an agent?"
              margin="normal"
              multiline
              rows={4}
              placeholder="Tell us about your interest"
              value={formData.motivation}
              onChange={(e) => handleInputChange("motivation", e.target.value)}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Target Market"
              margin="normal"
              placeholder="e.g., USA, Europe, Asia"
              value={formData.target_market}
              onChange={(e) => handleInputChange("target_market", e.target.value)}
              sx={textFieldStyles}
            />
          </Box>
        );
      case 3:
        return (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 2, md: 4 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#1a1a1a",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Review & Submit
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "text.primary",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
              }}
            >
              Please review your information before submitting.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.9rem", md: "1rem" },
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Once you submit, our team will review your application and get back to you within 2-3 business days.
            </Typography>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 2, md: 4 },
          background: "#FFFFFF",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflow: "auto",
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        "& .MuiDialog-paper": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        "& .MuiDialog-container": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 4 },
          background: "linear-gradient(135deg, rgba(200, 169, 126, 0.05) 0%, rgba(139, 115, 85, 0.03) 100%)",
          borderBottom: "1px solid rgba(139, 115, 85, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1a1a1a",
            mb: 1,
            fontSize: { xs: "1.5rem", md: "1.75rem" },
          }}
        >
          Agent Application
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666666",
            fontWeight: 600,
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          Step {activeStep + 1} of {steps.length}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 3 },
          minHeight: { xs: "300px", md: "400px" },
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflowY: "auto",
        }}
      >
        {getStepContent(activeStep)}
      </DialogContent>
      <DialogActions
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 3 },
          borderTop: "1px solid rgba(139, 115, 85, 0.1)",
          background: "#f9f7f3",
        }}
      >
        <Button
          onClick={handleClose}
          color="inherit"
          sx={{
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1.25 },
            fontSize: { xs: "0.9rem", md: "1rem" },
            fontWeight: 500,
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          Cancel
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep > 0 && (
          <Button
            onClick={handleBack}
            sx={{
              mr: 1,
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 1.25 },
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 500,
              color: "#8b7355",
              "&:hover": {
                backgroundColor: "rgba(139, 115, 85, 0.08)",
              },
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },
            }}
          >
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.25 },
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              fontWeight: 600,
              borderRadius: "50px",
              backgroundColor: "#c8a97e",
              color: "white",
              boxShadow: "0 4px 15px rgba(200, 169, 126, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#8b7355",
                boxShadow: "0 6px 20px rgba(139, 115, 85, 0.4)",
                transform: "translateY(-2px)",
              },
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.25 },
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              fontWeight: 600,
              borderRadius: "50px",
              backgroundColor: "#c8a97e",
              color: "white",
              boxShadow: "0 4px 15px rgba(200, 169, 126, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#8b7355",
                boxShadow: "0 6px 20px rgba(139, 115, 85, 0.4)",
                transform: "translateY(-2px)",
              },
              "&:disabled": {
                backgroundColor: "rgba(200, 169, 126, 0.5)",
                cursor: "not-allowed",
              },
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={16} sx={{ color: "white" }} />
                <span>Submitting...</span>
              </Box>
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

