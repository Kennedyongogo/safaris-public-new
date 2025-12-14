import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Send } from "@mui/icons-material";

const africanDestinations = [
  "South Africa",
  "Krüger National Park & Sabi Sand Game Reserve",
  "Cape Town",
  "Garden Route",
  "Indian Ocean Islands (Mauritius, Seychelles, ...)",
  "Rwanda (Gorillas & Chimps)",
  "Botswana (Okavango Delta)",
  "Namibia",
  "Kenya",
  "Madagascar",
  "Somewhere else",
];

const travelReasons = [
  "Big 5 Safari",
  "Honeymoon",
  "Family Safari",
  "Special Occasion",
  "Bush & Beach",
  "Trip with friends",
  "Adventure",
  "Wellness",
  "Local Tribe Experience",
  "Photographic Safari",
];

const budgetOptions = [
  {
    value: "rustic",
    label: "Rustic Escape",
    range: "0€ - 499€",
    description:
      "Great for budget-friendly adventures and authentic local experiences",
  },
  {
    value: "comfort",
    label: "Comfort Explorer",
    range: "500€ - 999€",
    description: "Perfect balance of comfort, style, and value",
  },
  {
    value: "luxury",
    label: "Luxury Retreat",
    range: "1.000€ +",
    description:
      "For premium experiences, top-tier stays, and personalized service",
  },
];

export default function Plan() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    knowDestination: "",
    destinations: [],
    travelReasons: [],
    privateGuide: "",
    timeFrame: "",
    arrivalDate: "",
    departureDate: "",
    preferredMonth: "",
    travelDays: "",
    numberOfTravelers: "",
    numberOfChildren: "",
    budget: "",
    comments: "",
    newsletter: false,
    terms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Trip quote submitted:", formData);
      setLoading(false);
      // Reset form or show success message
    }, 1000);
  };

  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 1.5,
        px: 0,
        bgcolor: "#F5F1E8", // Light beige from palette
        background:
          "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "auto",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)", // Rust and medium brown
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
        <Paper
          elevation={3}
          sx={{
            py: { xs: 1.5, sm: 2, md: 2.5 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "#FFFFFF",
            border: "1px solid rgba(107, 78, 61, 0.2)", // Medium brown border
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
                fontWeight: 700,
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.7rem" },
                color: "#3D2817", // Dark brown from palette
                fontFamily: "serif",
              }}
            >
              GET A TRIP QUOTE
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                fontSize: { xs: "1.15rem", sm: "1.3rem", md: "1.45rem" },
                color: "#3D2817", // Dark brown from palette
                fontFamily: "serif",
              }}
            >
              Your dream safari in Africa starts here!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: "900px",
                mx: "auto",
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
              }}
            >
              We are thrilled to plan your next adventure! Whether you're
              dreaming of an exhilarating safari experience amidst the majestic
              wildlife, a serene beach getaway with powdery sands and
              crystal-clear waters, or an immersive city escape filled with
              culture and history, we've got you covered. Just let us know your
              preferred destination and travel dates, along with any specific
              activities or attractions you're interested in, and we'll tailor a
              perfect itinerary to match your desires. Get ready to embark on an
              unforgettable journey!
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#3D2817", // Dark brown from palette
                }}
              >
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="First name"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Last name"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Country Code</InputLabel>
                    <Select
                      value={formData.countryCode}
                      onChange={(e) =>
                        handleInputChange("countryCode", e.target.value)
                      }
                      label="Country Code"
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value="+1">+1 (US/CA)</MenuItem>
                      <MenuItem value="+44">+44 (UK)</MenuItem>
                      <MenuItem value="+27">+27 (ZA)</MenuItem>
                      <MenuItem value="+254">+254 (KE)</MenuItem>
                      <MenuItem value="+255">+255 (TZ)</MenuItem>
                      <MenuItem value="+256">+256 (UG)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Do you know where you want to go? */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#3D2817", // Dark brown from palette
                }}
              >
                Do you know where you want to go? *
              </Typography>
              <RadioGroup
                value={formData.knowDestination}
                onChange={(e) =>
                  handleInputChange("knowDestination", e.target.value)
                }
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes, I do."
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No, please support me in planning my trip."
                />
              </RadioGroup>
            </Box>

            {/* Where in Africa & Why travel */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: "#3D2817", // Dark brown from palette
                  }}
                >
                  Where in Africa would you like to travel to?
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {africanDestinations.map((destination) => (
                    <FormControlLabel
                      key={destination}
                      control={
                        <Checkbox
                          checked={formData.destinations.includes(destination)}
                          onChange={(e) =>
                            handleCheckboxChange(
                              "destinations",
                              destination,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={destination}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: "#3D2817", // Dark brown from palette
                  }}
                >
                  Why do you want to travel to Africa?
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {travelReasons.map((reason) => (
                    <FormControlLabel
                      key={reason}
                      control={
                        <Checkbox
                          checked={formData.travelReasons.includes(reason)}
                          onChange={(e) =>
                            handleCheckboxChange(
                              "travelReasons",
                              reason,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={reason}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>

            {/* Private Guide Question */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#3D2817", // Dark brown from palette
                }}
              >
                Interested to book Daniel as your Private Safari Guide for South
                Africa?
              </Typography>
              <RadioGroup
                value={formData.privateGuide}
                onChange={(e) =>
                  handleInputChange("privateGuide", e.target.value)
                }
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="That would be great! Tell me more about it."
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="Maybe next time!"
                />
              </RadioGroup>
            </Box>

            {/* Time Frame */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#3D2817", // Dark brown from palette
                }}
              >
                Do you have a specific time frame for your upcoming trip? *
              </Typography>
              <RadioGroup
                value={formData.timeFrame}
                onChange={(e) => handleInputChange("timeFrame", e.target.value)}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes, I have set dates."
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No, I am flexible with my dates."
                />
              </RadioGroup>
            </Box>

            {/* Date and Travel Information */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="When is your arrival date?"
                  type="date"
                  value={formData.arrivalDate}
                  onChange={(e) =>
                    handleInputChange("arrivalDate", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="When is your departure date?"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) =>
                    handleInputChange("departureDate", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="When would you like to travel?"
                  placeholder="Enter your preferred month"
                  value={formData.preferredMonth}
                  onChange={(e) =>
                    handleInputChange("preferredMonth", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="How many days would you like to travel?"
                  type="number"
                  placeholder="Enter a number"
                  value={formData.travelDays}
                  onChange={(e) =>
                    handleInputChange("travelDays", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Who will be travelling with you (including you!)? *"
                  type="number"
                  placeholder="Number of travelers"
                  required
                  value={formData.numberOfTravelers}
                  onChange={(e) =>
                    handleInputChange("numberOfTravelers", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Number of children"
                  type="number"
                  placeholder="Number of children"
                  value={formData.numberOfChildren}
                  onChange={(e) =>
                    handleInputChange("numberOfChildren", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Budget */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#3D2817", // Dark brown from palette
                }}
              >
                Do you have a budget in mind (per person, per day), excluding
                flight and transportation costs? *
              </Typography>
              <RadioGroup
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
              >
                {budgetOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {option.label}: {option.range}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontSize: "1rem" }}
                        >
                          {option.description}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </Box>

            {/* Comments */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#3D2817", // Dark brown from palette
                }}
              >
                Is there anything else that we need to know?
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter your comments"
                value={formData.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Checkboxes */}
            <Box sx={{ mb: 4 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.newsletter}
                    onChange={(e) =>
                      handleInputChange("newsletter", e.target.checked)
                    }
                  />
                }
                label="I want to subscribe to the newsletter."
              />
              <Box sx={{ mt: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.terms}
                      onChange={(e) =>
                        handleInputChange("terms", e.target.checked)
                      }
                      required
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the terms & conditions.{" "}
                      <Typography
                        component="span"
                        sx={{
                          color: "primary.main",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        View terms of use
                      </Typography>
                    </Typography>
                  }
                />
              </Box>
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Send />
                  )
                }
                disabled={loading || !formData.terms}
                sx={{
                  backgroundColor: "#B85C38", // Burnt orange/rust
                  color: "white",
                  px: { xs: 4, sm: 5, md: 6 },
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: 2,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#8B4225", // Dark rust
                  },
                  "&:disabled": {
                    backgroundColor: "#ccc",
                    color: "white",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </Box>

          {/* Steps Section */}
          <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
            <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
              {/* Step 1 */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: { xs: 2, sm: 2.5, md: 3 },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      fontSize: { xs: "2.35rem", sm: "2.85rem", md: "3.35rem" },
                      color: "#B85C38", // Burnt orange/rust
                    }}
                  >
                    01
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.7rem" },
                      color: "#3D2817", // Dark brown from palette
                    }}
                  >
                    Share Your Ideal Travel Experience
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      lineHeight: 1.7,
                    }}
                  >
                    Tell us about your perfect getaway, detailing the
                    destinations, activities, and experiences you've always
                    dreamed of. This will help us craft a personalized adventure
                    that turns your travel vision into reality.
                  </Typography>
                </Box>
              </Grid>

              {/* Step 2 */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: { xs: 2, sm: 2.5, md: 3 },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      fontSize: { xs: "2.35rem", sm: "2.85rem", md: "3.35rem" },
                      color: "#B85C38", // Burnt orange/rust
                    }}
                  >
                    02
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.7rem" },
                      color: "#3D2817", // Dark brown from palette
                    }}
                  >
                    Let David Craft Your Perfect Journey
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      lineHeight: 1.7,
                    }}
                  >
                    David, our travel expert with hands-on experience, is here
                    to help you create a personalized adventure just for you.
                    Let his insights transform your dream trip into an
                    unforgettable reality.
                  </Typography>
                </Box>
              </Grid>

              {/* Step 3 */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: { xs: 2, sm: 2.5, md: 3 },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      fontSize: { xs: "2.35rem", sm: "2.85rem", md: "3.35rem" },
                      color: "#B85C38", // Burnt orange/rust
                    }}
                  >
                    03
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.7rem" },
                      color: "#3D2817", // Dark brown from palette
                    }}
                  >
                    Finalize Your Plans & Pack Your Bags
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      lineHeight: 1.7,
                    }}
                  >
                    Once you've reviewed and approved your customized itinerary,
                    it's time to get excited—your adventure awaits! Confirm the
                    details and start packing for an unforgettable journey.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
