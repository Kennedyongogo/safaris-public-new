import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LocationOn,
  Schedule,
  People,
  ArrowBack,
  Image as ImageIcon,
} from "@mui/icons-material";

const MotionBox = motion(Box);

// Destinations are now fetched from API

// Attraction Card Component with Image Transitions
const AttractionCard = ({ attraction, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = attraction.images || [];
  const hasMultipleImages = images.length > 1;

  // Auto-transition images if there are multiple
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <Card
      sx={{
        overflow: "hidden",
        border: "1px solid rgba(107, 78, 61, 0.2)",
        borderRadius: 2,
        cursor: "pointer",
        transition: "transform 0.2s ease, boxShadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        },
      }}
      onClick={() => onClick(attraction)}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{
            height: { xs: "250px", md: "300px" },
            borderRadius: 2,
            border: "1px solid rgba(107, 78, 61, 0.2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflow: "hidden",
            position: "relative"
          }}>
            {images.length > 0 ? (
              <>
                {images.map((image, imgIndex) => {
                  const isActive = imgIndex === currentImageIndex;
                  return (
                    <Box
                      key={imgIndex}
                      component="img"
                      src={image}
                      alt={`${attraction.name} - Image ${imgIndex + 1}`}
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
                        console.error(`Failed to load attraction image: ${image}`);
                        e.target.src = "/foundation-logo.png";
                      }}
                    />
                  );
                })}
                {hasMultipleImages && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
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
              </>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Box
                  component="img"
                  src="/foundation-logo.png"
                  alt="No images available"
                  sx={{
                    width: "80px",
                    height: "80px",
                    opacity: 0.5,
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#3D2817",
                fontSize: { xs: "1.25rem", md: "1.4rem" },
              }}
            >
              {attraction.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.7,
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 500,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {attraction.description}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default function DestinationDetails() {
  const { id } = useParams(); // This will be the destination ID from the URL
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [attractionDialogOpen, setAttractionDialogOpen] = useState(false);
  const [dialogImageIndex, setDialogImageIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine where user came from based on location state or referrer
  const cameFrom = location.state?.from || 
    (document.referrer.includes("/destinations") ? "/destinations" : "/");
  const cameFromDestinations = cameFrom === "/destinations";
  const cameFromHero = cameFrom === "hero";
  const cameFromServices = cameFrom === "services";

  const handleAttractionClick = (attraction) => {
    setSelectedAttraction(attraction);
    setDialogImageIndex(0); // Reset to first image when opening
    setAttractionDialogOpen(true);
  };

  const handleCloseAttractionDialog = () => {
    setAttractionDialogOpen(false);
    setSelectedAttraction(null);
    setDialogImageIndex(0);
  };

  // Auto-transition images in dialog if there are multiple
  useEffect(() => {
    if (!attractionDialogOpen || !selectedAttraction || !selectedAttraction.images || selectedAttraction.images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setDialogImageIndex((prev) => (prev + 1) % selectedAttraction.images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [attractionDialogOpen, selectedAttraction]);

  useEffect(() => {
    fetchDestinationDetails();
  }, [id]);

  const fetchDestinationDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the ID from the URL params
      const response = await fetch(`/api/destinations/public/id/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch destination details");
      }
      const data = await response.json();
      if (data.success && data.data) {
        // Helper to build full image URL
        const buildFullImageUrl = (imagePath) => {
          if (!imagePath) return "";
          if (imagePath.startsWith("http")) return imagePath;
          // Use relative path that gets proxied to the API server
          return `/${imagePath}`;
        };

        // Use the exact API data structure provided by user
        const mappedDestination = {
          id: data.data.id,
          slug: data.data.slug,
          title: data.data.title,
          description: data.data.description,
          image: buildFullImageUrl(data.data.hero_image), // Convert to full URL
          imageAlt: data.data.hero_image_alt || `${data.data.title} destination`,
          location: data.data.location,
          duration: data.data.duration_display || `${data.data.duration_min}-${data.data.duration_max} Days`,
          durationMin: data.data.duration_min,
          durationMax: data.data.duration_max,
          bestTime: Array.isArray(data.data.best_visit_months)
            ? data.data.best_visit_months.join(", ")
            : "Best months vary by destination",
          wildlife: Array.isArray(data.data.featured_species)
            ? data.data.featured_species.join(", ")
            : "Various wildlife species",
          wildlifeTypes: Array.isArray(data.data.wildlife_types)
            ? data.data.wildlife_types.join(", ")
            : "Various wildlife experiences",
          highlights: Array.isArray(data.data.key_highlights)
            ? data.data.key_highlights
            : [],
          gallery_images: Array.isArray(data.data.gallery_images)
            ? data.data.gallery_images.map(img => buildFullImageUrl(img))
            : [],
          attractions: Array.isArray(data.data.attractions)
            ? data.data.attractions.map(attr => {
                const processedImages = (attr.images || []).map(img => buildFullImageUrl(img));
                console.log(`Attraction "${attr.name}" has ${processedImages.length} images:`, processedImages);
                return {
                  name: attr.name,
                  description: attr.description,
                  images: processedImages // Convert all attraction images to full URLs
                };
              })
            : [],
          category_tags: Array.isArray(data.data.category_tags)
            ? data.data.category_tags
            : [],
          is_active: data.data.is_active,
          sort_order: data.data.sort_order,
          createdAt: data.data.createdAt,
          updatedAt: data.data.updatedAt
        };
        setDestination(mappedDestination);
      } else {
        throw new Error("Destination not found");
      }
    } catch (err) {
      console.error("Error fetching destination details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          bgcolor: "#F5F1E8", // Light beige from palette
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
              "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)", // Rust and medium brown
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error || !destination) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Destination not found"}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          variant="contained"
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const wildlifeItems =
    destination?.wildlife
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) || [];

  const wildlifeTypesItems =
    destination?.wildlifeTypes
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) || [];

  return (
    <Box
      sx={{
        pt: 0.75,
        pb: 0.75,
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
              if (cameFromDestinations) {
                // Navigate back to destinations page
                navigate("/destinations");
              } else if (cameFromHero) {
                // Navigate to home and scroll to top (hero section)
                navigate("/");
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              } else {
                // Navigate to home and scroll to destinations section (from services)
                navigate("/");
                setTimeout(() => {
                  const section = document.getElementById("mission-section");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }, 100);
              }
            }}
            sx={{
              mt: 0.5,
              mb: 0.5,
              backgroundColor: "#B85C38", // Burnt orange/rust
              color: "white",
              fontWeight: 600,
              outline: "none",
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:focus-visible": { outline: "none", boxShadow: "none" },
              "&:hover": {
                backgroundColor: "#8B4225", // Dark rust
                color: "white",
              },
            }}
          >
            {cameFromHero ? "Back to Hero Section" : "Back to Destination"}
          </Button>

          <Paper
            elevation={3}
            sx={{
              py: { xs: 0.75, sm: 1, md: 1.25 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(107, 78, 61, 0.2)", // Medium brown border
              minHeight: "auto",
              height: "auto",
              overflow: "hidden",
            }}
          >
            {/* Hero Image */}
            <Box
              sx={{
                width: "100%",
                height: { xs: "240px", sm: "320px", md: "420px" },
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Box
                component="img"
                src={destination.image}
                alt={destination.imageAlt}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = "/foundation-logo.png";
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to top, rgba(61, 40, 23, 0.85), rgba(184, 92, 56, 0.3), transparent)", // Dark brown and rust
                  p: 1.5,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3.2rem" },
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  {destination.title}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
              {/* Key Information Chips */}
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  flexWrap: "wrap",
                  mb: 2,
                }}
              >
                <Chip
                  icon={<LocationOn />}
                  label={destination.location}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#B85C38", // Burnt orange/rust
                    color: "white",
                    "& .MuiChip-icon": {
                      color: "white",
                    },
                  }}
                />
                <Chip
                  icon={<Schedule />}
                  label={`Duration: ${destination.duration}`}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: "#3D2817", // Dark brown from palette
                    color: "#3D2817",
                    "& .MuiChip-icon": {
                      color: "#3D2817",
                    },
                  }}
                />
                <Chip
                  icon={<People />}
                  label={`Best Time: ${destination.bestTime}`}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: "#B85C38", // Burnt orange/rust
                    color: "#3D2817",
                    "& .MuiChip-icon": {
                      color: "#B85C38",
                    },
                  }}
                />
                {destination.wildlife && destination.wildlife !== "Various wildlife species" && (
                  <Chip
                    label={`Featured Species: ${destination.wildlife}`}
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderColor: "#2D4A2D",
                      color: "#3D2817",
                    }}
                  />
                )}
                {destination.wildlifeTypes && destination.wildlifeTypes !== "Various wildlife experiences" && (
                  <Chip
                    label={`Wildlife Types: ${destination.wildlifeTypes}`}
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderColor: "#6B7D47",
                      color: "#3D2817",
                    }}
                  />
                )}
                {Array.isArray(destination.category_tags) && destination.category_tags.length > 0 && (
                  <Chip
                    label={`Categories: ${destination.category_tags.join(", ")}`}
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderColor: "#6B4E3D",
                      color: "#3D2817",
                    }}
                  />
                )}
              </Box>

              {/* Description */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#3D2817", // Dark brown from palette
                  fontSize: { xs: "1.35rem", sm: "1.5rem", md: "1.65rem" },
                }}
              >
                About This Destination
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: "text.secondary",
                  mb: 2,
                  fontSize: { xs: "1.05rem", sm: "1.15rem" },
                  fontWeight: 600,
                }}
              >
                {destination.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  width: "100%",
                  alignItems: "stretch",
                }}
              >
                {/* Wildlife Section */}
                <Card
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#F5F1E8", // Light beige from palette
                    border: "1px solid rgba(107, 78, 61, 0.3)", // Medium brown border
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: { xs: 1.25, sm: 1.5 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#3D2817", // Dark brown from palette
                        fontSize: { xs: "1.2rem", md: "1.35rem" },
                      }}
                    >
                      Wildlife
                    </Typography>

                    {/* Wildlife Types */}
                    {wildlifeTypesItems.length > 0 && (
                      <Box sx={{ mb: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: "#6B4E3D",
                            mb: 0.5,
                            fontSize: { xs: "0.95rem", md: "1rem" },
                          }}
                        >
                          Wildlife Types:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, mb: 1 }}>
                          {wildlifeTypesItems.map((item, index) => (
                            <Typography
                              key={`type-${index}`}
                              component="li"
                              variant="body2"
                              sx={{
                                mb: 0.25,
                                color: "text.secondary",
                                lineHeight: 1.6,
                                fontSize: { xs: "1rem", md: "1.05rem" },
                                fontWeight: 500,
                              }}
                            >
                              {item}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Featured Species */}
                    {wildlifeItems.length > 0 && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: "#6B4E3D",
                            mb: 0.5,
                            fontSize: { xs: "0.95rem", md: "1rem" },
                          }}
                        >
                          Featured Species:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                          {wildlifeItems.map((item, index) => (
                            <Typography
                              key={`species-${index}`}
                              component="li"
                              variant="body2"
                              sx={{
                                mb: 0.25,
                                color: "text.secondary",
                                lineHeight: 1.6,
                                fontSize: { xs: "1rem", md: "1.05rem" },
                                fontWeight: 500,
                              }}
                            >
                              {item}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Fallback if no specific data */}
                    {wildlifeItems.length === 0 && wildlifeTypesItems.length === 0 && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.6,
                          fontSize: { xs: "1rem", md: "1.05rem" },
                          fontWeight: 500,
                        }}
                      >
                        Various wildlife species
                      </Typography>
                    )}
                  </CardContent>
                </Card>

                {/* Highlights Section */}
                <Card
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#F5F1E8", // Light beige from palette
                    border: "1px solid rgba(107, 78, 61, 0.3)", // Medium brown border
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: { xs: 1.25, sm: 1.5 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#3D2817", // Dark brown from palette
                        fontSize: { xs: "1.2rem", md: "1.35rem" },
                      }}
                    >
                      Highlights
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                      {destination.highlights.map((highlight, index) => (
                        <Typography
                          key={index}
                          component="li"
                          variant="body1"
                          sx={{
                            mb: 0.5,
                            color: "text.secondary",
                            lineHeight: 1.7,
                            fontSize: { xs: "1.05rem", md: "1.1rem" },
                            fontWeight: 600,
                          }}
                        >
                          {highlight}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Gallery Images Section */}
              {Array.isArray(destination.gallery_images) && destination.gallery_images.length > 0 && (
                <Box sx={{ mt: 3, mx: { xs: 1.5, sm: 1.5, md: 1.5 } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: "#3D2817",
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                      textAlign: "center",
                    }}
                  >
                    Gallery Images
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      },
                      gap: { xs: 1, sm: 1.5, md: 2 },
                      width: "100%",
                    }}
                  >
                    {destination.gallery_images.map((image, index) => (
                      <Card
                        key={index}
                        sx={{
                          height: 250,
                          borderRadius: 2,
                          border: "1px solid rgba(107, 78, 61, 0.2)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          overflow: "hidden",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          component="img"
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            flex: 1,
                          }}
                          onError={(e) => {
                            e.target.src = "/foundation-logo.png";
                          }}
                        />
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Tourist Attractions Section */}
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "#3D2817",
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                  }}
                >
                  Must-Visit Attractions
                </Typography>
                <Grid container spacing={3}>
                  {destination.attractions?.map((attraction, index) => (
                    <Grid item xs={12} key={index}>
                      <AttractionCard
                        attraction={attraction}
                        onClick={handleAttractionClick}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Call to Action */}
              <Box
                sx={{
                  mt: 2,
                  textAlign: "center",
                  p: 1.5,
                  background: "linear-gradient(135deg, #B85C38, #C97A5A)", // Rust to light rust
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "white",
                    fontSize: { xs: "1.3rem", md: "1.45rem" },
                  }}
                >
                  Ready to Experience This Destination?
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/plan", { state: { from: "destination-detail", destinationId: destination.id } })}
                  sx={{
                    backgroundColor: "white",
                    color: "#3D2817", // Dark brown from palette
                    fontWeight: 700,
                    fontSize: { xs: "1.05rem", md: "1.1rem" },
                    px: 3,
                    py: 1.25,
                    outline: "none",
                    "&:focus": { outline: "none" },
                    "&:focus-visible": { outline: "none", boxShadow: "none" },
                    "&:hover": {
                      backgroundColor: "#F5F1E8", // Light beige from palette
                      color: "#3D2817",
                    },
                  }}
                >
                  Book Your Safari
                </Button>
              </Box>
            </Box>
          </Paper>
        </MotionBox>
      </Container>

      {/* Attraction Detail Dialog */}
      <Dialog
        open={attractionDialogOpen}
        onClose={handleCloseAttractionDialog}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            border: "1px solid rgba(107, 78, 61, 0.2)",
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
        {selectedAttraction && (
          <>
            <DialogTitle
              sx={{
                pb: 1,
                background: "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderBottom: "1px solid rgba(107, 78, 61, 0.1)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#3D2817",
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                }}
              >
                {selectedAttraction.name}
              </Typography>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                {/* Main Image with Transitions */}
                {selectedAttraction.images && selectedAttraction.images.length > 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "250px", md: "350px" },
                      borderRadius: 2,
                      border: "1px solid rgba(107, 78, 61, 0.2)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      mb: 3,
                      position: "relative",
                    }}
                  >
                    {selectedAttraction.images.map((image, imgIndex) => {
                      const isActive = imgIndex === dialogImageIndex;
                      return (
                        <Box
                          key={imgIndex}
                          component="img"
                          src={image}
                          alt={`${selectedAttraction.name} - Image ${imgIndex + 1}`}
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
                            console.error(`Failed to load attraction image: ${image}`);
                            e.target.src = "/foundation-logo.png";
                          }}
                        />
                      );
                    })}

                    {/* Image Indicators */}
                    {selectedAttraction.images.length > 1 && (
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
                        {selectedAttraction.images.map((_, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              width: dialogImageIndex === idx ? 20 : 6,
                              height: 6,
                              borderRadius: "3px",
                              backgroundColor:
                                dialogImageIndex === idx
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

                {/* Full Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    lineHeight: 1.7,
                    fontSize: { xs: "1.05rem", md: "1.15rem" },
                    fontWeight: 500,
                  }}
                >
                  {selectedAttraction.description}
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                p: { xs: 2, md: 3 },
                pt: 0,
                background: "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderTop: "1px solid rgba(107, 78, 61, 0.1)",
              }}
            >
              <Button
                onClick={handleCloseAttractionDialog}
                variant="outlined"
                sx={{
                  borderColor: "#6B4E3D",
                  color: "#6B4E3D",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    borderColor: "#5D4037",
                    backgroundColor: "#6B4E3D",
                    color: "white",
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

