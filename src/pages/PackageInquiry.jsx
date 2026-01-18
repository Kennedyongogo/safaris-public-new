import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  LocationOn,
  Schedule,
  Image as ImageIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const MotionBox = motion(Box);

export default function PackageInquiry() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get package data from location state
  const packageData = location.state?.package;
  const destination = location.state?.destination;
  const category = location.state?.category; // Full category object
  const categoryName = location.state?.categoryName || category?.category_name;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    numberOfTravelers: "",
    budget: "",
    message: "",
  });

  // Auto-transition images if there are multiple
  useEffect(() => {
    if (!packageData?.gallery || packageData.gallery.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % packageData.gallery.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [packageData?.gallery]);

  // Helper to build image URL
  const buildImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("uploads/")) return `/${imagePath}`;
    if (imagePath.startsWith("/uploads/")) return imagePath;
    return imagePath;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the inquiry data
      const inquiryData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        travelDate: formData.travelDate || null,
        numberOfTravelers: formData.numberOfTravelers ? parseInt(formData.numberOfTravelers) : null,
        budget: formData.budget?.trim() || null,
        message: formData.message?.trim() || null,
        package: packageData,
        destination: destination,
        categoryName: categoryName,
        destinationId: destination?.id || null,
      };

      // Send inquiry to backend
      const response = await fetch("/api/package-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit inquiry");
      }

      // Prepare navigation data (use component-level variables, not redeclare)
      const returnPath = location.state?.returnPath || -1;
      const navCategory = location.state?.category;
      const navDestination = location.state?.destination;
      const navDestinationId = location.state?.destinationId;
      const navPackageData = location.state?.package;

      // Function to handle navigation
      const navigateBack = () => {
        if (returnPath && returnPath !== -1) {
          const isPackageDetail = returnPath === "/package-detail" || returnPath?.includes("/package-detail");
          
          const navigationState = {
            category: navCategory,
            destination: navDestination,
            destinationId: navDestinationId,
          };
          
          // If returning to PackageDetail, include package data
          if (isPackageDetail && navPackageData) {
            navigationState.package = navPackageData;
            navigationState.returnPath = "/category-packages"; // Set return path for PackageDetail
          }
          
          navigate(returnPath, {
            state: navigationState,
            replace: false,
          });
        } else {
          navigate(-1);
        }
      };

      // Show success alert and navigate back
      await Swal.fire({
        icon: "success",
        title: "Inquiry Sent!",
        text: "We'll get back to you soon with more information about this package.",
        confirmButtonColor: "#c8a97e",
        zIndex: 10000,
        timer: 2000, // Auto close after 2 seconds
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      // Navigate back after alert closes (await ensures this runs after Swal closes)
      navigateBack();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to send inquiry. Please try again.",
        confirmButtonColor: "#c8a97e",
        zIndex: 10000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!packageData) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Package information not found
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{
            backgroundColor: "#c8a97e",
            "&:hover": {
              backgroundColor: "#8b7355",
            },
          }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  const images = (packageData.gallery || []).map(buildImageUrl);

  return (
    <Box
      sx={{
        pt: 0.75,
        pb: 0.75,
        px: 0,
        bgcolor: "#f9f7f3",
        background:
          "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(249, 247, 243, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(200, 169, 126, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 115, 85, 0.08) 0%, transparent 50%)",
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
          pt: { xs: 0.375, sm: 0.375, md: 0.375 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Button
            startIcon={<ArrowBack />}
            onClick={() => {
              // Navigate back with all necessary state
              const returnPath = location.state?.returnPath || -1;
              const packageId = location.state?.packageId;
              const category = location.state?.category;
              const destination = location.state?.destination;
              const destinationId = location.state?.destinationId;
              const packageData = location.state?.package;
              
              // Check if returnPath is PackageDetail - pass package data
              const isPackageDetail = returnPath === "/package-detail" || returnPath?.includes("/package-detail");
              
              const navigationState = {
                category: category, // Full category object with packages
                destination: destination,
                destinationId: destinationId,
              };
              
              // If returning to PackageDetail, include package data
              if (isPackageDetail && packageData) {
                navigationState.package = packageData;
                navigationState.returnPath = "/category-packages"; // Set return path for PackageDetail
              }
              
              if (packageId) {
                navigationState.highlightPackageId = packageId;
              }
              
              if (returnPath && returnPath !== -1) {
                // Navigate to the return path with all necessary state
                navigate(returnPath, {
                  state: navigationState,
                  replace: false,
                });
              } else {
                // Fallback: navigate back in history (state might be lost)
                navigate(-1);
              }
            }}
            sx={{
              mt: 0.5,
              mb: 0.5,
              backgroundColor: "#c8a97e",
              color: "white",
              fontWeight: 600,
              outline: "none",
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:focus-visible": { outline: "none", boxShadow: "none" },
              "&:hover": {
                backgroundColor: "#8b7355",
              },
            }}
          >
            Back
          </Button>

          {/* Main Card Container - Like BlogDetail */}
          <Paper
            elevation={3}
            sx={{
              py: { xs: 0.75, sm: 1, md: 1.25 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(139, 115, 85, 0.2)",
              overflow: "hidden",
            }}
          >
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {/* Left Column - Package Details (50%) */}
              <Grid size={{ xs: 12, md: 6 }}>
                {/* Package Header */}
                <Box sx={{ mb: 3 }}>
                  {categoryName && (
                    <Chip
                      label={categoryName}
                      sx={{
                        mb: 1.5,
                        backgroundColor: "#c8a97e",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  )}
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#1a1a1a",
                      fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
                    }}
                  >
                    {packageData.title}
                  </Typography>
                  {destination && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <LocationOn sx={{ color: "#8b7355", fontSize: 20 }} />
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#666666",
                          fontWeight: 500,
                        }}
                      >
                        {destination.title}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Package Image Gallery */}
                {images.length > 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "300px", md: "400px" },
                      borderRadius: 2,
                      border: "1px solid rgba(139, 115, 85, 0.2)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      mb: 3,
                      position: "relative",
                    }}
                  >
                    {images.map((image, imgIndex) => {
                      const isActive = imgIndex === currentImageIndex;
                      return (
                        <Box
                          key={imgIndex}
                          component="img"
                          src={image}
                          alt={`${packageData.title} - Image ${imgIndex + 1}`}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: isActive ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out",
                          }}
                          onError={(e) => {
                            e.target.src = "/IMG-20251210-WA0070.jpg";
                          }}
                        />
                      );
                    })}
                    {images.length > 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          left: "50%",
                          transform: "translateX(-50%)",
                          display: "flex",
                          gap: 0.5,
                          zIndex: 3,
                        }}
                      >
                        {images.map((_, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              width: currentImageIndex === idx ? 20 : 6,
                              height: 6,
                              borderRadius: "3px",
                              backgroundColor:
                                currentImageIndex === idx
                                  ? "white"
                                  : "rgba(255, 255, 255, 0.5)",
                              transition: "all 0.3s ease",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                )}

                {/* Package Description */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#1a1a1a",
                    fontSize: { xs: "1.2rem", md: "1.4rem" },
                  }}
                >
                  About This Package
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#666666",
                    lineHeight: 1.7,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 500,
                    mb: 3,
                  }}
                >
                  {packageData.short_description}
                </Typography>

                {/* Highlights */}
                {packageData.highlights && packageData.highlights.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        color: "#1a1a1a",
                        fontSize: { xs: "1.2rem", md: "1.4rem" },
                      }}
                    >
                      Highlights
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {packageData.highlights.map((highlight, idx) => (
                        <Typography
                          key={idx}
                          component="li"
                          variant="body1"
                          sx={{
                            mb: 1,
                            color: "#666666",
                            lineHeight: 1.6,
                            fontSize: { xs: "1rem", md: "1.05rem" },
                            fontWeight: 500,
                          }}
                        >
                          {highlight}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Pricing */}
                {packageData.pricing_tiers && packageData.pricing_tiers.length > 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        color: "#1a1a1a",
                        fontSize: { xs: "1.2rem", md: "1.4rem" },
                      }}
                    >
                      Indicative Pricing (2026 Rates)
                    </Typography>
                    {packageData.pricing_tiers.map((tier, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          mb: 1.5,
                          p: 2,
                          backgroundColor: "#f9f7f3",
                          borderRadius: 2,
                          border: "1px solid rgba(139, 115, 85, 0.1)",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#1a1a1a",
                            fontSize: { xs: "1rem", md: "1.05rem" },
                            fontWeight: 600,
                          }}
                        >
                          <Box component="span" sx={{ color: "#8b7355", mr: 1 }}>
                            {tier.tier}:
                          </Box>
                          {tier.price_range}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>

              {/* Right Column - Inquiry Form (50%) */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    pl: { xs: 0, md: 3 },
                    borderLeft: { xs: "none", md: "1px solid rgba(139, 115, 85, 0.15)" },
                    height: "100%",
                  }}
                >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    color: "#1a1a1a",
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                  }}
                >
                  Inquire About This Package
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666666",
                    mb: 3,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  Fill out the form below and we'll get back to you with more details.
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#c8a97e",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#c8a97e",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#c8a97e",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#c8a97e",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#c8a97e",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#c8a97e",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Preferred Travel Date"
                        name="travelDate"
                        type="date"
                        value={formData.travelDate}
                        onChange={handleInputChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#c8a97e",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#c8a97e",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Number of Travelers"
                        name="numberOfTravelers"
                        type="number"
                        value={formData.numberOfTravelers}
                        onChange={handleInputChange}
                        inputProps={{ min: 1 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#c8a97e",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#c8a97e",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Budget Range"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="e.g., Mid-range, Luxury"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#c8a97e",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#c8a97e",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Additional Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        placeholder="Tell us more about your travel preferences, special requirements, or any questions..."
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#c8a97e",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#c8a97e",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                          backgroundColor: "#c8a97e",
                          color: "white",
                          fontWeight: 600,
                          py: 1.5,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          "&:hover": {
                            backgroundColor: "#8b7355",
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                          },
                          "&:focus-visible": {
                            outline: "none",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                          "Send Inquiry"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}

