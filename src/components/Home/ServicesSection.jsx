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

// Dummy destination data
const dummyDestinations = [
  {
    id: 1,
    title: "Kenya",
    description:
      "Experience the world-famous Great Migration in Maasai Mara, witness the Big Five, and explore diverse landscapes from savannah plains to snow-capped mountains. Kenya offers unparalleled wildlife viewing and rich cultural experiences.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "East Africa",
    duration: "5-14 Days",
    bestTime: "July - October, January - March",
    wildlife: "Big Five, Great Migration, Wildebeest, Elephants",
    highlights: ["Maasai Mara", "Amboseli", "Samburu", "Tsavo"],
  },
  {
    id: 2,
    title: "Uganda",
    description:
      "Discover the Pearl of Africa with mountain gorilla trekking in Bwindi, chimpanzee encounters, and diverse ecosystems. Home to half of the world's remaining mountain gorillas and the source of the Nile.",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "East Africa",
    duration: "7-14 Days",
    bestTime: "June - September, December - February",
    wildlife: "Mountain Gorillas, Chimpanzees, Big Five, Primates",
    highlights: ["Bwindi Impenetrable", "Queen Elizabeth", "Murchison Falls"],
  },
  {
    id: 3,
    title: "Tanzania",
    description:
      "Home to the Serengeti's Great Migration, Ngorongoro Crater, and Mount Kilimanjaro. Experience vast wilderness areas, incredible wildlife concentrations, and pristine beaches of Zanzibar.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "East Africa",
    duration: "7-14 Days",
    bestTime: "June - October, December - March",
    wildlife: "Big Five, Great Migration, Wildebeest, Zebras",
    highlights: ["Serengeti", "Ngorongoro", "Kilimanjaro", "Zanzibar"],
  },
  {
    id: 4,
    title: "Rwanda",
    description:
      "The Land of a Thousand Hills offers intimate gorilla trekking experiences, golden monkey encounters, and rich cultural heritage. Experience one of Africa's most successful conservation stories.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "East Africa",
    duration: "4-10 Days",
    bestTime: "June - September, December - February",
    wildlife: "Mountain Gorillas, Golden Monkeys, Big Five",
    highlights: ["Volcanoes National Park", "Nyungwe Forest", "Akagera"],
  },
];

export default function ServicesSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  // const [missionCategories, setMissionCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Commented out dialog-related state
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [selectedMission, setSelectedMission] = useState(null);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [missionDetails, setMissionDetails] = useState(null);
  // const [loadingDetails, setLoadingDetails] = useState(false);

  // Use dummy data instead of API
  const missionCategories = dummyDestinations;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Commented out - showing all 3 cards
  // const cardsToShow = isMobile ? 1 : isTablet ? 2 : 3;
  // const maxIndex = Math.max(0, missionCategories.length - cardsToShow);

  useEffect(() => {
    setIsVisible(true);
    // fetchMissionCategories(); // Commented out - using dummy data
  }, []);

  // Commented out API fetch logic
  // const fetchMissionCategories = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await fetch("/api/mission-categories/public");

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();

  //     if (result.success && result.data) {
  //       setMissionCategories(result.data);
  //     } else {
  //       throw new Error(result.message || "Failed to fetch mission categories");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching mission categories:", err);
  //     setError(err.message);
  //     setMissionCategories([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  const handleViewMore = (destination) => {
    // Navigate to destination details page (from services section)
    navigate(`/destination/${destination.id}`, { state: { from: "services" } });
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
        bgcolor: "background.paper",
        background:
          "linear-gradient(135deg, rgba(245, 241, 232, 0.9) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(232, 224, 209, 0.9) 100%)", // Beige tones
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
            "radial-gradient(circle at 20% 80%, rgba(107, 78, 61, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(184, 92, 56, 0.1) 0%, transparent 50%)", // Medium brown and rust
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
            ) : missionCategories.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography color="text.secondary" variant="body1">
                  No mission categories available at the moment.
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
                  {missionCategories.map((destination, index) => (
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
                            height: { xs: "480px", sm: "520px" },
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                            },
                          }}
                        >
                          {/* Image Section */}
                          <Box
                            sx={{
                              position: "relative",
                              height: isMobile ? "180px" : "220px",
                              width: "100%",
                              overflow: "hidden",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            <Box
                              component="img"
                              src={destination.image}
                              alt={destination.title}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                              onError={(e) => {
                                e.target.src = "/foundation-logo.png";
                              }}
                            />
                          </Box>

                          <CardContent
                            sx={{
                              flexGrow: 1,
                              p: { xs: 2, sm: 3 },
                              display: "flex",
                              flexDirection: "column",
                              minHeight: { xs: "260px", sm: "300px" },
                            }}
                          >
                            <Box sx={{ mb: { xs: 1, sm: 2 } }}>
                              <Chip
                                label="Safari Destination"
                                color="primary"
                                size="small"
                                sx={{ mb: { xs: 1, sm: 1.5 } }}
                              />
                              <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                  fontWeight: 600,
                                  mb: { xs: 0.5, sm: 1 },
                                  color: "text.primary",
                                  fontSize: { xs: "1rem", sm: "1.25rem" },
                                }}
                              >
                                {destination.title}
                              </Typography>
                            </Box>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mb: { xs: 1, sm: 1.5 },
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                lineHeight: 1.5,
                                flexGrow: 1,
                                fontSize: { xs: "0.95rem", sm: "1.05rem" },
                                fontWeight: 700,
                                minHeight: { xs: "3.6rem", sm: "4.5rem" },
                              }}
                            >
                              {destination.description}
                            </Typography>

                            <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                  mb: { xs: 0.25, sm: 0.5 },
                                }}
                              >
                                <LocationOn
                                  sx={{
                                      fontSize: { xs: 12, sm: 14 },
                                      color: "#6B4E3D", // Medium brown
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                      fontSize: { xs: "0.85rem", sm: "0.95rem" },
                                      fontWeight: 700,
                                      overflow: "hidden",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                      textOverflow: "ellipsis",
                                  }}
                                >
                                  {destination.location}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ mt: "auto", pt: { xs: 0.5, sm: 1 } }}>
                              <Button
                                variant="outlined"
                                size="small"
                                fullWidth
                                endIcon={<ArrowForward />}
                                onClick={() => handleViewMore(destination)}
                                sx={{
                                  borderColor: "#6B4E3D", // Medium brown
                                  color: "#6B4E3D",
                                  fontSize: "0.875rem",
                                  py: 1,
                                  outline: "none",
                                  "&:focus": { outline: "none", boxShadow: "none" },
                                  "&:focus-visible": { outline: "none", boxShadow: "none" },
                                  "&:hover": {
                                    borderColor: "#B85C38", // Rust
                                    backgroundColor: "#6B4E3D",
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
    </Box>
  );
}
