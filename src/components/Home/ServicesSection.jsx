import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Fade,
  Slide,
  Chip,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
  Container,
} from "@mui/material";
import {
  School,
  Psychology,
  VolunteerActivism,
  LocalHospital,
  Group,
  EmojiPeople,
  ChevronLeft,
  ChevronRight,
  ArrowForward,
  LocationOn,
  Schedule,
  People,
} from "@mui/icons-material";

// Category configuration mapping - Earth Tones
const categoryConfig = {
  educational_support: {
    icon: School,
    color: "#6B4E3D", // Medium brown
    gradient: "linear-gradient(135deg, #6B4E3D, #8B6F5E)",
  },
  mental_health_awareness: {
    icon: Psychology,
    color: "#6B7D47", // Olive green
    gradient: "linear-gradient(135deg, #6B7D47, #8B9A6B)",
  },
  poverty_alleviation: {
    icon: VolunteerActivism,
    color: "#2D4A2D", // Dark forest green
    gradient: "linear-gradient(135deg, #2D4A2D, #6B7D47)",
  },
  community_empowerment: {
    icon: Group,
    color: "#B85C38", // Burnt orange/rust
    gradient: "linear-gradient(135deg, #B85C38, #C97A5A)",
  },
  healthcare_access: {
    icon: LocalHospital,
    color: "#3D2817", // Dark brown
    gradient: "linear-gradient(135deg, #3D2817, #6B4E3D)",
  },
  youth_development: {
    icon: EmojiPeople,
    color: "#8B6F5E", // Lighter brown
    gradient: "linear-gradient(135deg, #8B6F5E, #B85C38)",
  },
};

// Helper to build image URL
const buildImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("uploads/")) return `/${imagePath}`;
  if (imagePath.startsWith("/uploads/")) return imagePath;
  return imagePath;
};

// Destination Card Component with Image Transitions
const DestinationCard = ({ destination, isMobile }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Combine hero image with gallery images for transitions
  const getAllImages = () => {
    const images = [];

    // Add hero image first
    if (destination.image) {
      images.push(destination.image);
    }

    // Add gallery images
    if (destination.gallery_images && Array.isArray(destination.gallery_images)) {
      images.push(...destination.gallery_images.filter(img => img)); // Filter out empty URLs
    }

    return images;
  };

  const images = getAllImages();
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
    <Box
      sx={{
        position: "relative",
        height: isMobile ? "200px" : "240px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
      }}
    >
      {images.length > 0 && !imageError ? (
        <>
          {images.map((imageUrl, imgIndex) => {
            const isActive = imgIndex === currentImageIndex;
            return (
              <Box
                key={imgIndex}
                component="img"
                src={imageUrl}
                alt={`${destination.title} - Image ${imgIndex + 1}`}
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
                  if (isActive) {
                    setImageError(true);
                  }
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
          <Typography variant="body2" color="text.secondary">
            No image available
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
        }}
      >
        <Chip
          label="Safari Destination"
          size="small"
          sx={{
            backgroundColor: "#6B4E3D",
            color: "white",
            border: "1px solid #8B6F5E",
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: 0.2,
          }}
        />
      </Box>
    </Box>
  );
};

// Mission Card Component
const MissionCard = ({
  category,
  config,
  IconComponent,
  isVisible,
  index,
  onViewMore,
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images from the category
  const getAllImages = () => {
    if (
      category.images &&
      Array.isArray(category.images) &&
      category.images.length > 0
    ) {
      return category.images
        .map((img) => {
          const path = typeof img === "object" ? img.path : img;
          return buildImageUrl(path);
        })
        .filter((url) => url); // Filter out empty URLs
    }
    return [];
  };

  const images = getAllImages();
  const hasMultipleImages = images.length > 1;
  const currentImageUrl = images.length > 0 ? images[currentImageIndex] : null;

  // Auto-transition images if there are multiple
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Slide direction="up" in={isVisible} timeout={800 + index * 200}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            },
          }}
          onClick={() => onViewMore(category)}
        >
          {/* Image Section - Fixed 200px height like news cards */}
          <Box
            sx={{
              position: "relative",
              height: 200,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {currentImageUrl && !imageError ? (
              <>
                {images.map((imageUrl, imgIndex) => {
                  const isActive = imgIndex === currentImageIndex;
                  return (
                    <Box
                      key={imgIndex}
                      component="img"
                      src={imageUrl}
                      alt={category.title}
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
                  background: `linear-gradient(135deg, ${config.color}05, ${config.color}02)`,
                }}
              >
                <IconComponent sx={{ fontSize: 80, color: config.color }} />
              </Box>
            )}
          </Box>

          <CardContent
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ mb: 1.5 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: "text.primary",
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {category.title}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.5,
                flexGrow: 1,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              {category.description}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForward />}
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                onViewMore(category);
              }}
              sx={{
                borderColor: config.color,
                color: config.color,
                fontSize: "0.875rem",
                py: 1,
                mt: "auto",
                "&:hover": {
                  borderColor: config.color,
                  backgroundColor: config.color,
                  color: "white",
                },
                "&:focus": {
                  outline: "none",
                },
                "&:focus-visible": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              View More
            </Button>
          </CardContent>
        </Card>
      </Slide>
    </Grid>
  );
};

// Destinations are now fetched from API

export default function ServicesSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Commented out dialog-related state
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [selectedMission, setSelectedMission] = useState(null);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [missionDetails, setMissionDetails] = useState(null);
  // const [loadingDetails, setLoadingDetails] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Commented out - showing all 3 cards
  // const cardsToShow = isMobile ? 1 : isTablet ? 2 : 3;
  // const maxIndex = Math.max(0, missionCategories.length - cardsToShow);

  useEffect(() => {
    setIsVisible(true);
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/destinations/public");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Helper to build full image URL
        const buildFullImageUrl = (imagePath) => {
          if (!imagePath) return "";
          if (imagePath.startsWith("http")) return imagePath;
          // Prepend the API base URL to relative paths
          return `http://localhost:4000/${imagePath}`;
        };

        // Map API data to component expected format
        const mappedDestinations = result.data.map(destination => ({
          id: destination.id,
          slug: destination.slug, // Include slug for navigation
          title: destination.title,
          description: destination.description,
          image: buildFullImageUrl(destination.hero_image), // Convert to full URL
          gallery_images: Array.isArray(destination.gallery_images)
            ? destination.gallery_images.map(img => buildFullImageUrl(img)) // Convert gallery images to full URLs
            : [],
          location: destination.location,
          duration: destination.duration_display || `${destination.duration_min}-${destination.duration_max} Days`,
          highlights: Array.isArray(destination.key_highlights)
            ? destination.key_highlights.slice(0, 3) // Take first 3 highlights
            : [],
          attractions: Array.isArray(destination.attractions)
            ? destination.attractions.map(attr => ({
                name: attr.name,
                description: attr.description,
                images: (attr.images || []).map(img => buildFullImageUrl(img)) // Convert all attraction images to full URLs
              }))
            : []
        }));
        setDestinations(mappedDestinations);
      } else {
        throw new Error(result.message || "Failed to fetch destinations");
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError(err.message);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  // Commented out navigation functions - showing all 3 cards
  // const handlePrevious = () => {
  //   setCurrentIndex((prev) => Math.max(0, prev - 1));
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  // };

  // const getVisibleCategories = () => {
  //   return missionCategories.slice(currentIndex, currentIndex + cardsToShow);
  // };

  const handleViewMore = async (destination) => {
    try {
      // Fetch destination details from backend
      const response = await fetch(`/api/destinations/public/id/${destination.id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Navigate to destination details page with the fetched data
        navigate(`/destination/${destination.id}`, {
          state: { destination: result.data }
        });
      } else {
        throw new Error(result.message || "Failed to fetch destination details");
      }
    } catch (error) {
      console.error("Error fetching destination details:", error);
      // Still navigate even if fetch fails, let the destination page handle it
      navigate(`/destination/${destination.id}`);
    }
  };

  // Commented out dialog handlers - using page navigation instead
  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  //   setSelectedMission(null);
  //   setMissionDetails(null);
  // };

  return (
    <Box
      id="mission-section"
      sx={{
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 0.5, sm: 0.75, md: 1 },
        px: 0,
        backgroundColor: "#F5F1E8", // Solid beige background to prevent rendering flicker
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(107, 78, 61, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0, sm: 0, md: 0 },
        }}
      >
        <Box
          sx={{
            pt: { xs: 1.5, sm: 2, md: 2.5 },
            pb: { xs: 0.5, sm: 0.75, md: 1 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
          }}
        >
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                  fontWeight: 800,
                  fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
                  background:
                    "linear-gradient(45deg, #6B4E3D, #B85C38, #6B7D47)", // Medium brown, rust, olive green
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "60px", sm: "70px", md: "80px" },
                    height: "4px",
                    background: "linear-gradient(45deg, #6B4E3D, #B85C38)", // Medium brown to rust
                    borderRadius: "2px",
                  },
                }}
              >
                Safari Destination
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 1,
                  maxWidth: { xs: "100%", sm: "800px", md: "900px" },
                  mx: "auto",
                  px: { xs: 1, sm: 0 },
                  fontWeight: 500,
                  fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                  lineHeight: 1.6,
                  color: "text.primary",
                }}
              >
                Discover the breathtaking beauty of Kenya's wildlife and
                landscapes through our curated safari destinations, offering
                unforgettable adventures and authentic cultural experiences.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  flexWrap: "wrap",
                  mb: 1.5,
                  px: { xs: 1, sm: 0 },
                }}
              >
                <Chip
                  label="Wildlife Adventures"
                  sx={{
                    background: "linear-gradient(45deg, #6B4E3D, #8B6F5E)", // Medium brown to lighter brown
                    color: "white",
                    fontWeight: 600,
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  }}
                />
                <Chip
                  label="Nature Exploration"
                  sx={{
                    background: "linear-gradient(45deg, #B85C38, #C97A5A)", // Rust to light rust
                    color: "white",
                    fontWeight: 600,
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  }}
                />
                <Chip
                  label="Cultural Experiences"
                  sx={{
                    background: "linear-gradient(45deg, #6B7D47, #8B9A6B)", // Olive green to light olive
                    color: "white",
                    fontWeight: 600,
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  }}
                />
              </Box>
            </Box>
          </Fade>

          <Box sx={{ position: "relative" }}>
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={8}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box textAlign="center" py={4}>
                <Typography color="error" variant="body1">
                  {error}
                </Typography>
              </Box>
            ) : destinations.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography color="text.secondary" variant="body1">
                  No destinations available at the moment.
                </Typography>
              </Box>
            ) : (
              <Box>
                {/* Destination Cards Grid - Project Style */}
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2.5, md: 3 }}
                  justifyContent="center"
                >
                  {destinations.map((destination, index) => (
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                      }}
                      key={destination.id}
                    >
                      <Slide
                        direction="up"
                        in={isVisible}
                        timeout={800 + index * 200}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                            },
                          }}
                        >
                          <DestinationCard destination={destination} isMobile={isMobile} />

                          <CardContent
                            sx={{
                              flexGrow: 1,
                              p: { xs: 2, sm: 2.5 },
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Box sx={{ mb: 1.5 }}>
                              <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                  fontWeight: 700,
                                  mb: 1,
                                  color: "text.primary",
                                  fontSize: { xs: "1.2rem", sm: "1.35rem" },
                                }}
                              >
                                {destination.title}
                              </Typography>
                            </Box>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mb: 1.5,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                lineHeight: 1.5,
                                fontSize: { xs: "0.95rem", sm: "1.05rem" },
                                fontWeight: 600,
                              }}
                            >
                              {destination.description}
                            </Typography>

                            <Box sx={{ mb: 1.5 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.75,
                                  mb: 0.75,
                                }}
                              >
                                <LocationOn
                                  sx={{
                                    fontSize: { xs: 14, sm: 16 },
                                    color: "#5D4037",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: { xs: "0.9rem", sm: "0.95rem" },
                                    color: "text.secondary",
                                    fontWeight: 600,
                                  }}
                                >
                                  {destination.location}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.75,
                                }}
                              >
                                <Schedule
                                  sx={{
                                    fontSize: { xs: 14, sm: 16 },
                                    color: "#5D4037",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: { xs: "0.9rem", sm: "0.95rem" },
                                    color: "text.secondary",
                                    fontWeight: 600,
                                  }}
                                >
                                  {destination.duration}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ mb: 2, flexGrow: 1 }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  fontSize: "0.85rem",
                                  fontWeight: 700,
                                  color: "#5D4037",
                                  mb: 0.5,
                                  display: "block",
                                }}
                              >
                                Highlights:
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {destination.highlights.slice(0, 3).map((highlight, idx) => (
                                  <Chip
                                    key={idx}
                                    label={highlight}
                                    size="small"
                                    sx={{
                                      fontSize: "0.8rem",
                                      height: "22px",
                                      backgroundColor: "#f5f5f5",
                                      color: "#5D4037",
                                      fontWeight: 700,
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                mt: "auto",
                              }}
                            >
                              <Button
                                variant="outlined"
                                size="small"
                                fullWidth
                                endIcon={<ArrowForward />}
                                onClick={() => handleViewMore(destination)}
                                sx={{
                                  borderColor: "#5D4037",
                                  color: "#5D4037",
                                  fontSize: "0.95rem",
                                  fontWeight: 700,
                                  py: 0.75,
                                  outline: "none",
                                  "&:focus": {
                                    outline: "none",
                                  },
                                  "&:focus-visible": {
                                    outline: "none",
                                    boxShadow: "none",
                                  },
                                  "&:hover": {
                                    borderColor: "#4E342E",
                                    backgroundColor: "#5D4037",
                                    color: "white",
                                  },
                                }}
                              >
                                View Details
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Slide>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      </Card>
    </Box>
  );
}
