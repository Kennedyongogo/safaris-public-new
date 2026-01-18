import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Tooltip,
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

// Category configuration mapping - Client Palette
const categoryConfig = {
  educational_support: {
    icon: School,
    color: "#8b7355", // Secondary Brown
    gradient: "linear-gradient(135deg, #8b7355, #c8a97e)",
  },
  mental_health_awareness: {
    icon: Psychology,
    color: "#8b7355", // Secondary Brown
    gradient: "linear-gradient(135deg, #8b7355, #c8a97e)",
  },
  poverty_alleviation: {
    icon: VolunteerActivism,
    color: "#8b7355", // Secondary Brown
    gradient: "linear-gradient(135deg, #8b7355, #c8a97e)",
  },
  community_empowerment: {
    icon: Group,
    color: "#c8a97e", // Accent Gold
    gradient: "linear-gradient(135deg, #c8a97e, #8b7355)",
  },
  healthcare_access: {
    icon: LocalHospital,
    color: "#1a1a1a", // Primary Black
    gradient: "linear-gradient(135deg, #1a1a1a, #8b7355)",
  },
  youth_development: {
    icon: EmojiPeople,
    color: "#c8a97e", // Accent Gold
    gradient: "linear-gradient(135deg, #c8a97e, #8b7355)",
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
const DestinationCard = ({ destination, isMobile, onClick }) => {
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
      onClick={onClick}
      sx={{
        position: "relative",
        height: isMobile ? "300px" : "400px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
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
                bottom: 60,
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
          <Typography variant="body2" sx={{ color: "#666666" }}>
            No image available
          </Typography>
        </Box>
      )}
      
      {/* Title positioned at lower right */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          p: 2,
          zIndex: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            textAlign: "right",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {destination.title}
        </Typography>
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
              sx={{
                mb: 2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.5,
                flexGrow: 1,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                color: "#666666",
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
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [travellerItems, setTravellerItems] = useState([]);
  const [interestItems, setInterestItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [travellerLoading, setTravellerLoading] = useState(true);
  const [interestLoading, setInterestLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const isInitialMount = useRef(true);
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
    // Load all three endpoints simultaneously on mount to prevent loading on tab switch
    Promise.all([
      fetchDestinations(),
      fetchTravellerItems(),
      fetchInterestItems()
    ]).catch(err => {
      console.error("Error loading initial data:", err);
    });
  }, []);

  // Separate effect to handle tab state from navigation
  useEffect(() => {
    // On initial mount (page load/refresh), always default to tab 0
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setActiveTab(0);
      return;
    }

    // Only after initial mount, check for navigation state
    // This ensures refresh always starts with tab 0, but navigation can set the tab
    if (location.pathname === "/" && location.state?.activeTab !== undefined && location.state?.activeTab !== null) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.pathname, location.state]);

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
          // Use relative path that gets proxied to the API server
          return `/${imagePath}`;
        };

        // Map API data to component expected format
        const mappedDestinations = result.data.map(destination => {
          // Extract highlights from packages (first package's highlights)
          let highlights = [];
          if (Array.isArray(destination.packages) && destination.packages.length > 0) {
            const firstCategory = destination.packages[0];
            if (firstCategory.packages && firstCategory.packages.length > 0) {
              const firstPackage = firstCategory.packages[0];
              highlights = Array.isArray(firstPackage.highlights)
                ? firstPackage.highlights.slice(0, 3) // Take first 3 highlights
                : [];
            }
          }

          return {
            id: destination.id,
            slug: destination.slug, // Include slug for navigation
            title: destination.title,
            subtitle: destination.subtitle || "",
            description: destination.brief_description || "", // Use brief_description
            image: buildFullImageUrl(destination.hero_image), // Convert to full URL
            gallery_images: Array.isArray(destination.gallery_images)
              ? destination.gallery_images.map(img => buildFullImageUrl(img)) // Convert gallery images to full URLs
              : [],
            location: destination.location,
            duration: "Multiple packages available", // Packages have varying durations
            highlights: highlights,
            packages: Array.isArray(destination.packages) ? destination.packages : []
          };
        });
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

  const fetchTravellerItems = async () => {
    try {
      setTravellerLoading(true);
      const response = await fetch("/api/traveller-gallery/public?limit=12");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const buildFullImageUrl = (imagePath) => {
          if (!imagePath) return "";
          if (imagePath.startsWith("http")) return imagePath;
          return `/${imagePath}`;
        };

        const mappedItems = (result.data.items || result.data).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description || "",
          category: item.category,
          image: buildFullImageUrl(item.filePath),
          type: item.type,
          tags: Array.isArray(item.tags) ? item.tags : [],
        }));

        setTravellerItems(mappedItems);
      } else {
        throw new Error(result.message || "Failed to fetch traveller gallery items");
      }
    } catch (err) {
      console.error("Error fetching traveller items:", err);
      setTravellerItems([]);
    } finally {
      setTravellerLoading(false);
    }
  };

  const fetchInterestItems = async () => {
    try {
      setInterestLoading(true);
      const response = await fetch("/api/interest-gallery/public?limit=12");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const buildFullImageUrl = (imagePath) => {
          if (!imagePath) return "";
          if (imagePath.startsWith("http")) return imagePath;
          return `/${imagePath}`;
        };

        const mappedItems = (result.data.items || result.data).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description || "",
          category: item.category,
          image: buildFullImageUrl(item.filePath),
          type: item.type,
          tags: Array.isArray(item.tags) ? item.tags : [],
        }));

        setInterestItems(mappedItems);
      } else {
        throw new Error(result.message || "Failed to fetch interest gallery items");
      }
    } catch (err) {
      console.error("Error fetching interest items:", err);
      setInterestItems([]);
    } finally {
      setInterestLoading(false);
    }
  };

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
        backgroundColor: "#f9f7f3", // Warm White background to prevent rendering flicker
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(139, 115, 85, 0.2)",
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
                  color: "#1a1a1a",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "60px", sm: "70px", md: "80px" },
                    height: "4px",
                    background: "linear-gradient(45deg, #1a1a1a, #c8a97e)",
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
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  lineHeight: 1.6,
                  color: "#666666",
                }}
              >
                Discover the breathtaking beauty of East Africa's wildlife and
                landscapes through our curated safari destinations, offering
                unforgettable adventures and authentic cultural experiences.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  flexWrap: "wrap",
                  mb: 3,
                  px: { xs: 1, sm: 0 },
                }}
              >
                <Tooltip
                  title="Safari destinations across East Africa"
                  arrow
                  placement="top"
                  PopperProps={{
                    sx: {
                      "& .MuiTooltip-tooltip": {
                        bgcolor: "#8b7355",
                        fontSize: "0.875rem",
                        maxWidth: 300,
                        p: 1.5,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                      "& .MuiTooltip-arrow": {
                        color: "#8b7355",
                      },
                    },
                  }}
                >
                  <Chip
                    label="By Destination"
                    onClick={() => setActiveTab(0)}
                    sx={{
                      background: activeTab === 0 ? "#8b7355" : "#c8a97e",
                      color: "white",
                      fontWeight: 600,
                      px: { xs: 1.5, sm: 2 },
                      py: 1,
                      fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform: activeTab === 0 ? "scale(1.05)" : "scale(1)",
                      boxShadow: activeTab === 0 ? "0 4px 12px rgba(139, 115, 85, 0.4)" : "0 2px 6px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        background: "#8b7355",
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 12px rgba(139, 115, 85, 0.4)",
                      },
                    }}
                  />
                </Tooltip>
                <Tooltip
                  title="Tailored by travel group"
                  arrow
                  placement="top"
                  PopperProps={{
                    sx: {
                      "& .MuiTooltip-tooltip": {
                        bgcolor: "#8b7355",
                        fontSize: "0.875rem",
                        maxWidth: 300,
                        p: 1.5,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                      "& .MuiTooltip-arrow": {
                        color: "#8b7355",
                      },
                    },
                  }}
                >
                  <Chip
                    label="By Traveller"
                    onClick={() => setActiveTab(1)}
                    sx={{
                      background: activeTab === 1 ? "#8b7355" : "#c8a97e",
                      color: "white",
                      fontWeight: 600,
                      px: { xs: 1.5, sm: 2 },
                      py: 1,
                      fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform: activeTab === 1 ? "scale(1.05)" : "scale(1)",
                      boxShadow: activeTab === 1 ? "0 4px 12px rgba(139, 115, 85, 0.4)" : "0 2px 6px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        background: "#8b7355",
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 12px rgba(139, 115, 85, 0.4)",
                      },
                    }}
                  />
                </Tooltip>
                <Tooltip
                  title="Organized by special interests"
                  arrow
                  placement="top"
                  PopperProps={{
                    sx: {
                      "& .MuiTooltip-tooltip": {
                        bgcolor: "#8b7355",
                        fontSize: "0.875rem",
                        maxWidth: 300,
                        p: 1.5,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                      "& .MuiTooltip-arrow": {
                        color: "#8b7355",
                      },
                    },
                  }}
                >
                  <Chip
                    label="By Interest"
                    onClick={() => setActiveTab(2)}
                    sx={{
                      background: activeTab === 2 ? "#8b7355" : "#c8a97e",
                      color: "white",
                      fontWeight: 600,
                      px: { xs: 1.5, sm: 2 },
                      py: 1,
                      fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform: activeTab === 2 ? "scale(1.05)" : "scale(1)",
                      boxShadow: activeTab === 2 ? "0 4px 12px rgba(139, 115, 85, 0.4)" : "0 2px 6px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        background: "#8b7355",
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 12px rgba(139, 115, 85, 0.4)",
                      },
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Fade>

          <Box sx={{ position: "relative" }}>
            {/* Destinations Tab */}
            {activeTab === 0 && (
              <>
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
                    <Typography sx={{ color: "#666666" }} variant="body1">
                      No destinations available at the moment.
                    </Typography>
                  </Box>
                ) : (
                  <Box>
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
                                overflow: "hidden",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(-8px)",
                                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                                },
                              }}
                            >
                              <DestinationCard 
                                destination={destination} 
                                isMobile={isMobile}
                                onClick={() => handleViewMore(destination)}
                              />
                            </Card>
                          </Slide>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </>
            )}

            {/* By Traveller Tab */}
            {activeTab === 1 && (
              <>
                {travellerLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    py={8}
                  >
                    <CircularProgress />
                  </Box>
                ) : travellerItems.length === 0 ? (
                  <Box textAlign="center" py={4}>
                    <Typography sx={{ color: "#666666" }} variant="body1">
                      No traveller gallery items available at the moment.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(5, 1fr)",
                      },
                      gap: { xs: 2, sm: 2.5, md: 3, lg: 3 },
                      width: "100%",
                    }}
                  >
                    {travellerItems.map((item, index) => (
                      <Slide
                        direction="up"
                        in={isVisible}
                        timeout={800 + index * 200}
                        key={item.id}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                            },
                          }}
                        >
                          <DestinationCard 
                            destination={{
                              ...item,
                              title: item.title,
                              image: item.image,
                              gallery_images: [],
                            }} 
                            isMobile={isMobile}
                            onClick={() => navigate("/category-details", { state: { from: "traveller", itemId: item.id } })}
                          />
                        </Card>
                      </Slide>
                    ))}
                  </Box>
                )}
              </>
            )}

            {/* By Interest Tab */}
            {activeTab === 2 && (
              <>
                {interestLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    py={8}
                  >
                    <CircularProgress />
                  </Box>
                ) : interestItems.length === 0 ? (
                  <Box textAlign="center" py={4}>
                    <Typography sx={{ color: "#666666" }} variant="body1">
                      No interest gallery items available at the moment.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(5, 1fr)",
                      },
                      gap: { xs: 2, sm: 2.5, md: 3, lg: 3 },
                      width: "100%",
                    }}
                  >
                    {interestItems.map((item, index) => (
                      <Slide
                        direction="up"
                        in={isVisible}
                        timeout={800 + index * 200}
                        key={item.id}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                            },
                          }}
                        >
                          <DestinationCard 
                            destination={{
                              ...item,
                              title: item.title,
                              image: item.image,
                              gallery_images: [],
                            }} 
                            isMobile={isMobile}
                            onClick={() => navigate("/category-details", { state: { from: "interest", itemId: item.id } })}
                          />
                        </Card>
                      </Slide>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
      </Card>
    </Box>
  );
}
