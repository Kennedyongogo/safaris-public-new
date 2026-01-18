import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  Alert,
  Divider,
  Chip,
} from "@mui/material";
import { ArrowBack, AttachMoney } from "@mui/icons-material";
import { motion } from "framer-motion";
import ItineraryMap from "../components/Destination/ItineraryMap";

const MotionBox = motion(Box);

export default function PackageDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageIndex, setImageIndex] = useState(0);
  
  // Get package data from location state
  const selectedPackage = location.state?.package;
  const category = location.state?.category;
  const destination = location.state?.destination;
  const returnPath = location.state?.returnPath || "/category-packages";
  const destinationId = location.state?.destinationId;

  // Auto-transition images if there are multiple
  useEffect(() => {
    if (!selectedPackage || !selectedPackage.gallery || selectedPackage.gallery.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % selectedPackage.gallery.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [selectedPackage]);

  const handleBackToPackages = () => {
    if (returnPath) {
      navigate(returnPath, {
        state: {
          category: category,
          destination: destination,
          destinationId: destinationId,
        },
      });
    } else {
      navigate(-1);
    }
  };

  const handleInquire = () => {
    const packageId = `${category?.category_name || 'unknown'}-${selectedPackage?.number || 'unknown'}`;
    
    navigate("/package-inquiry", { 
      state: { 
        package: selectedPackage,
        destination: destination,
        category: category,
        categoryName: category?.category_name,
        packageId: packageId,
        returnPath: location.pathname,
        destinationId: destinationId,
      } 
    });
  };

  // Check if package data is valid
  if (!selectedPackage) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Package not found. Please navigate from a package listing.
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToPackages}
          variant="contained"
          sx={{
            backgroundColor: "#c8a97e",
            "&:hover": {
              backgroundColor: "#8b7355",
            },
          }}
        >
          Back to Packages
        </Button>
      </Container>
    );
  }

  const images = selectedPackage.gallery || [];
  const hasMultipleImages = images.length > 1;

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
          pb: { xs: 0.375, sm: 0.375, md: 0.375 },
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
            onClick={handleBackToPackages}
            sx={{
              mt: 0.5,
              mb: 0.5,
              backgroundColor: "#c8a97e",
              color: "white",
              fontWeight: 600,
              outline: "none !important",
              "&:focus": { outline: "none !important", boxShadow: "none !important" },
              "&:focus-visible": { outline: "none !important", boxShadow: "none !important" },
              "&:active": { outline: "none !important", boxShadow: "none !important" },
              "&:hover": {
                backgroundColor: "#8b7355",
              },
            }}
          >
            Back to Packages
          </Button>

          {/* Main Card Container - Styled like CategoryPackages dialog */}
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
            {/* Header Section */}
            <Box
              sx={{
                pb: 1,
                background: "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderBottom: "1px solid rgba(139, 115, 85, 0.1)",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
                {destination && (
                  <Chip
                    label={destination.title}
                    size="small"
                    sx={{
                      backgroundColor: "#8b7355",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                )}
                {category && (
                  <Chip
                    label={category.category_name}
                    size="small"
                    sx={{
                      backgroundColor: "#c8a97e",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                )}
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1a1a1a",
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                }}
              >
                {selectedPackage.title}
              </Typography>
            </Box>

            <Box sx={{ p: { xs: 2, md: 3 } }}>
              {/* Main Image with Transitions */}
              {images.length > 0 && (
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "250px", md: "400px" },
                    borderRadius: 2,
                    border: "1px solid rgba(139, 115, 85, 0.2)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                    mb: 3,
                    position: "relative",
                  }}
                >
                  {images.map((image, imgIndex) => {
                    const isActive = imgIndex === imageIndex;
                    return (
                      <Box
                        key={imgIndex}
                        component="img"
                        src={image}
                        alt={`${selectedPackage.title} - Image ${imgIndex + 1}`}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: isActive ? 1 : 0,
                          transition: "opacity 0.5s ease-in-out",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src = "/IMG-20251210-WA0070.jpg";
                        }}
                      />
                    );
                  })}

                  {/* Image Indicators */}
                  {hasMultipleImages && (
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
                            width: imageIndex === idx ? 20 : 6,
                            height: 6,
                            borderRadius: "3px",
                            backgroundColor:
                              imageIndex === idx
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

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: "#1a1a1a",
                  lineHeight: 1.7,
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                  fontWeight: 500,
                  mb: 3,
                }}
              >
                {selectedPackage.short_description}
              </Typography>

              {/* Itinerary Map Section */}
              {selectedPackage.itinerary && Array.isArray(selectedPackage.itinerary) && selectedPackage.itinerary.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "#8b7355",
                      mb: 2,
                      fontSize: { xs: "1rem", md: "1.1rem" },
                    }}
                  >
                    Itinerary Route Map
                  </Typography>
                  <ItineraryMap itinerary={selectedPackage.itinerary} height={400} />
                  
                  {/* Day-by-Day Itinerary List */}
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "#8b7355",
                        mb: 1.5,
                        fontSize: { xs: "0.95rem", md: "1rem" },
                      }}
                    >
                      Day-by-Day Itinerary
                    </Typography>
                    <Box component="ul" sx={{ pl: 2.5 }}>
                      {selectedPackage.itinerary.map((day, dayIdx) => (
                        <Typography
                          key={dayIdx}
                          component="li"
                          variant="body2"
                          sx={{
                            mb: 1.5,
                            color: "#666666",
                            lineHeight: 1.8,
                            fontSize: { xs: "1rem", md: "1.05rem" },
                            fontWeight: 500,
                          }}
                        >
                          <Box component="span" sx={{ fontWeight: 700, color: "#8b7355", mr: 1 }}>
                            Day {day.day}:
                          </Box>
                          {day.description || "No description"}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Highlights */}
              {selectedPackage.highlights && selectedPackage.highlights.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "#8b7355",
                      mb: 1.5,
                      fontSize: { xs: "1rem", md: "1.1rem" },
                    }}
                  >
                    Highlights:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2.5 }}>
                    {selectedPackage.highlights.map((highlight, idx) => (
                      <Typography
                        key={idx}
                        component="li"
                        variant="body2"
                        sx={{
                          mb: 0.75,
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

              <Divider sx={{ my: 3 }} />

              {/* Pricing */}
              {selectedPackage.pricing_tiers && selectedPackage.pricing_tiers.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "#8b7355",
                      mb: 1.5,
                      fontSize: { xs: "1rem", md: "1.1rem" },
                    }}
                  >
                    Indicative Pricing (2026 Rates):
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {selectedPackage.pricing_tiers.map((tier, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <AttachMoney
                          sx={{
                            fontSize: { xs: 18, md: 20 },
                            color: "#8b7355",
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#1a1a1a",
                            fontSize: { xs: "1rem", md: "1.05rem" },
                            fontWeight: 600,
                          }}
                        >
                          <Box component="span" sx={{ color: "#c8a97e", fontWeight: 700 }}>
                            {tier.tier}:
                          </Box>{" "}
                          {tier.price_range}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  pt: 2,
                }}
              >
                <Button
                  onClick={handleBackToPackages}
                  variant="outlined"
                  sx={{
                    borderColor: "#8b7355",
                    color: "#8b7355",
                    outline: "none !important",
                    "&:focus": { outline: "none !important", boxShadow: "none !important" },
                    "&:focus-visible": { outline: "none !important", boxShadow: "none !important" },
                    "&:active": { outline: "none !important", boxShadow: "none !important" },
                    "&:hover": {
                      borderColor: "#c8a97e",
                      backgroundColor: "#8b7355",
                      color: "white",
                    },
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={handleInquire}
                  variant="contained"
                  sx={{
                    backgroundColor: "#c8a97e",
                    color: "white",
                    fontWeight: 600,
                    outline: "none !important",
                    "&:focus": { outline: "none !important", boxShadow: "none !important" },
                    "&:focus-visible": { outline: "none !important", boxShadow: "none !important" },
                    "&:active": { outline: "none !important", boxShadow: "none !important" },
                    "&:hover": {
                      backgroundColor: "#8b7355",
                    },
                  }}
                >
                  Inquire About This Package
                </Button>
              </Box>
            </Box>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}
