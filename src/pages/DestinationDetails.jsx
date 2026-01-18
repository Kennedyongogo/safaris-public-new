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
  CheckCircle,
  AttachMoney,
  Visibility,
} from "@mui/icons-material";

const MotionBox = motion(Box);

// Destinations are now fetched from API

// Category Card Component
const CategoryCard = ({ category, onClick }) => {
  // Get first image from first package in category for preview
  const previewImage = category.packages && category.packages.length > 0 && category.packages[0].gallery && category.packages[0].gallery.length > 0
    ? category.packages[0].gallery[0]
    : null;
  const packageCount = category.packages ? category.packages.length : 0;

  return (
    <Card
      sx={{
        overflow: "hidden",
        border: "1px solid rgba(139, 115, 85, 0.15)",
        borderRadius: 3,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "linear-gradient(to bottom, #FFFFFF 0%, #f9f7f3 100%)",
        boxShadow: "0 2px 8px rgba(26, 26, 26, 0.08)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 32px rgba(26, 26, 26, 0.15)",
          borderColor: "rgba(200, 169, 126, 0.3)",
        },
      }}
      onClick={onClick}
    >
      {/* Image Section */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "240px", md: "280px" },
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        {previewImage ? (
          <Box
            component="img"
            src={previewImage}
            alt={category.category_name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src = "/IMG-20251210-WA0070.jpg";
            }}
          />
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
            <ImageIcon sx={{ fontSize: 64, color: "rgba(0,0,0,0.2)" }} />
          </Box>
        )}
        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
            pointerEvents: "none",
          }}
        />
        {/* Package count badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(200, 169, 126, 0.95)",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: "0.875rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {packageCount} {packageCount === 1 ? "Package" : "Packages"}
        </Box>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ p: { xs: 2, sm: 2.5 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: "#1a1a1a",
            fontSize: { xs: "0.7rem", sm: "0.85rem", md: "0.95rem" },
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {category.category_name}
        </Typography>

        {/* View Packages Hint */}
        <Box
          sx={{
            mt: "auto",
            pt: 1.5,
            borderTop: "1px solid rgba(139, 115, 85, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#c8a97e",
              fontSize: { xs: "0.875rem", sm: "0.9rem" },
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            View Packages
          </Typography>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#c8a97e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease",
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: "7px solid white",
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                ml: 0.5,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Package Card Component with Image Transitions - Compact & Beautiful Design
const PackageCard = ({ package: pkg, categoryName, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = pkg.gallery || [];
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
        border: "1px solid rgba(139, 115, 85, 0.15)",
        borderRadius: 3,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "linear-gradient(to bottom, #FFFFFF 0%, #f9f7f3 100%)",
        boxShadow: "0 2px 8px rgba(26, 26, 26, 0.08)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 32px rgba(26, 26, 26, 0.15)",
          borderColor: "rgba(200, 169, 126, 0.3)",
        },
      }}
      onClick={() => onClick(pkg)}
    >
      {/* Image Section - Compact */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "220px", md: "240px" },
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        {images.length > 0 ? (
          <>
            {images.map((image, imgIndex) => {
              const isActive = imgIndex === currentImageIndex;
              return (
                <Box
                  key={imgIndex}
                  component="img"
                  src={image}
                  alt={`${pkg.title} - Image ${imgIndex + 1}`}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.6s ease-in-out",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load package image: ${image}`);
                    e.target.src = "/IMG-20251210-WA0070.jpg";
                  }}
                />
              );
            })}
            {hasMultipleImages && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 0.75,
                  zIndex: 3,
                }}
              >
                {images.map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      width: currentImageIndex === idx ? 24 : 8,
                      height: 8,
                      borderRadius: "4px",
                      backgroundColor:
                        currentImageIndex === idx
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(255, 255, 255, 0.4)",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                ))}
              </Box>
            )}
            {/* Gradient overlay for better text readability */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                pointerEvents: "none",
              }}
            />
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
            <ImageIcon sx={{ fontSize: 48, color: "rgba(0,0,0,0.2)" }} />
          </Box>
        )}
      </Box>

      {/* Content Section - Compact */}
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, pb: { xs: 1.5, sm: 2 } }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 0.75,
            color: "#1a1a1a",
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {pkg.title}
        </Typography>

        {/* Description - Truncated */}
        <Typography
          variant="body2"
          sx={{
            color: "#666666",
            lineHeight: 1.5,
            fontSize: { xs: "0.875rem", sm: "0.9rem" },
            mb: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.7em",
          }}
        >
          {pkg.short_description}
        </Typography>

        {/* Highlights - Compact with icons */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <Box sx={{ mb: 1.25 }}>
            <Box
              component="ul"
              sx={{
                pl: 0,
                mb: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {pkg.highlights.slice(0, 2).map((highlight, idx) => (
                <Box
                  key={idx}
                  component="li"
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 0.75,
                  }}
                >
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: "#c8a97e",
                      mt: 0.75,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666666",
                      lineHeight: 1.4,
                      fontSize: { xs: "0.8rem", sm: "0.85rem" },
                      fontWeight: 500,
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {highlight}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Pricing - Compact */}
        {pkg.pricing_tiers && pkg.pricing_tiers.length > 0 && (
          <Box
            sx={{
              mt: "auto",
              pt: 1,
              borderTop: "1px solid rgba(139, 115, 85, 0.1)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#8b7355",
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                fontWeight: 600,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {pkg.pricing_tiers[0]?.tier && (
                <>
                  <Box component="span" sx={{ color: "#c8a97e", mr: 0.5 }}>
                    From:
                  </Box>
                  {pkg.pricing_tiers[0].price_range}
                </>
              )}
            </Typography>
          </Box>
        )}

        {/* View Details Hint */}
        <Box
          sx={{
            mt: 1.25,
            pt: 1.25,
            borderTop: "1px solid rgba(139, 115, 85, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#c8a97e",
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            View Details
          </Typography>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#c8a97e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: "6px solid white",
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                ml: 0.5,
              }}
            />
          </Box>
        </Box>
      </CardContent>
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
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const [dialogImageIndex, setDialogImageIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine where user came from based on location state or referrer
  const cameFrom = location.state?.from || 
    (document.referrer.includes("/destinations") ? "/destinations" : "/");
  const cameFromDestinations = cameFrom === "/destinations";
  const cameFromHero = cameFrom === "hero";
  const cameFromServices = cameFrom === "services";

  const handleCategoryClick = (category) => {
    // Navigate to CategoryPackages component with category and destination data
    navigate("/category-packages", {
      state: {
        category: category,
        destination: destination,
        destinationId: id,
      },
    });
  };

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setDialogImageIndex(0); // Reset to first image when opening
    setPackageDialogOpen(true);
  };

  const handleClosePackageDialog = () => {
    setPackageDialogOpen(false);
    setSelectedPackage(null);
    setDialogImageIndex(0);
  };

  // Auto-transition images in dialog if there are multiple
  useEffect(() => {
    if (!packageDialogOpen || !selectedPackage || !selectedPackage.gallery || selectedPackage.gallery.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setDialogImageIndex((prev) => (prev + 1) % selectedPackage.gallery.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [packageDialogOpen, selectedPackage]);

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

        // Map new API data structure with packages
        const mappedDestination = {
          id: data.data.id,
          slug: data.data.slug,
          title: data.data.title,
          subtitle: data.data.subtitle || "",
          description: data.data.brief_description || "", // Use brief_description
          image: buildFullImageUrl(data.data.hero_image), // Convert to full URL
          imageAlt: data.data.hero_image_alt || `${data.data.title} destination`,
          location: data.data.location,
          gallery_images: Array.isArray(data.data.gallery_images)
            ? data.data.gallery_images.map(img => buildFullImageUrl(img))
            : [],
          packages: Array.isArray(data.data.packages)
            ? data.data.packages.map(category => ({
                category_name: category.category_name || "",
                category_order: category.category_order || 0,
                packages: Array.isArray(category.packages)
                  ? category.packages.map(pkg => ({
                      number: pkg.number || 0,
                      title: pkg.title || "",
                      short_description: pkg.short_description || "",
                      highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
                      pricing_tiers: Array.isArray(pkg.pricing_tiers) ? pkg.pricing_tiers : [],
                      gallery: Array.isArray(pkg.gallery)
                        ? pkg.gallery.map(img => buildFullImageUrl(img))
                        : [],
                      itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : []
                    }))
                  : []
              }))
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
          bgcolor: "#f9f7f3", // Warm White from palette
          background:
            "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(249, 247, 243, 0.95) 100%)",
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
              "radial-gradient(circle at 20% 80%, rgba(200, 169, 126, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 115, 85, 0.08) 0%, transparent 50%)", // Accent Gold and Secondary Brown
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


  return (
    <Box
      sx={{
        pt: 0.75,
        pb: 0.75,
        px: 0,
        bgcolor: "#f9f7f3", // Warm White from palette
        background:
          "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(249, 247, 243, 0.95) 100%)",
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
            "radial-gradient(circle at 20% 80%, rgba(200, 169, 126, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 115, 85, 0.08) 0%, transparent 50%)", // Accent Gold and Secondary Brown
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
              backgroundColor: "#c8a97e", // Accent Gold
              color: "white",
              fontWeight: 600,
              outline: "none",
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:focus-visible": { outline: "none", boxShadow: "none" },
              "&:hover": {
                backgroundColor: "#8b7355", // Secondary Brown
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
              border: "1px solid rgba(139, 115, 85, 0.2)", // Secondary Brown border
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
                  e.target.src = "/IMG-20251210-WA0070.jpg";
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to top, rgba(26, 26, 26, 0.85), rgba(200, 169, 126, 0.3), transparent)", // Primary Black and Accent Gold
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
                    mb: destination.subtitle ? 0.5 : 0,
                  }}
                >
                  {destination.title}
                </Typography>
                {destination.subtitle && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: 500,
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                      textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                      fontStyle: "italic",
                    }}
                  >
                    {destination.subtitle}
                  </Typography>
                )}
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
                    backgroundColor: "#c8a97e", // Accent Gold
                    color: "white",
                    "& .MuiChip-icon": {
                      color: "white",
                    },
                  }}
                />
                {destination.packages && destination.packages.length > 0 && (
                  <Chip
                    icon={<Schedule />}
                    label={`${destination.packages.reduce((total, cat) => total + (cat.packages?.length || 0), 0)} Packages Available`}
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderColor: "#1a1a1a", // Primary Black
                      color: "#1a1a1a",
                      "& .MuiChip-icon": {
                        color: "#1a1a1a",
                      },
                    }}
                  />
                )}
                {destination.packages && destination.packages.length > 0 && (
                  <Chip
                    icon={<People />}
                    label={`${destination.packages.length} Categories`}
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderColor: "#c8a97e", // Accent Gold
                      color: "#1a1a1a",
                      "& .MuiChip-icon": {
                        color: "#c8a97e",
                      },
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
                  color: "#1a1a1a", // Primary Black
                  fontSize: { xs: "1.35rem", sm: "1.5rem", md: "1.65rem" },
                }}
              >
                About This Destination
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: "#666666",
                  mb: 2,
                  fontSize: { xs: "1.05rem", sm: "1.15rem" },
                  fontWeight: 600,
                }}
              >
                {destination.description}
              </Typography>


              {/* Gallery Images Section */}
              {Array.isArray(destination.gallery_images) && destination.gallery_images.length > 0 && (
                <Box sx={{ mt: 3, mx: { xs: 1.5, sm: 1.5, md: 1.5 } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: "#1a1a1a",
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
                          border: "1px solid rgba(139, 115, 85, 0.2)",
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
                            e.target.src = "/IMG-20251210-WA0070.jpg";
                          }}
                        />
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Packages Section - Categories Only */}
              {destination.packages && destination.packages.length > 0 && (
                <Box id="packages-section" sx={{ mt: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: "#1a1a1a",
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                    }}
                  >
                    Safari Packages & Tours
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: "#666666",
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      fontWeight: 500,
                    }}
                  >
                    Select a category to view available packages
                  </Typography>
                  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                    {destination.packages
                      .sort((a, b) => (a.category_order || 0) - (b.category_order || 0))
                      .map((category, catIndex) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={catIndex}>
                          <CategoryCard
                            category={category}
                            onClick={() => handleCategoryClick(category)}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              )}

              {/* Call to Action */}
              <Box
                sx={{
                  mt: 2,
                  textAlign: "center",
                  p: 1.5,
                  background: "linear-gradient(135deg, #c8a97e, #8b7355)", // Accent Gold to Secondary Brown
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
                    color: "#1a1a1a", // Primary Black
                    fontWeight: 700,
                    fontSize: { xs: "1.05rem", md: "1.1rem" },
                    px: 3,
                    py: 1.25,
                    outline: "none",
                    "&:focus": { outline: "none" },
                    "&:focus-visible": { outline: "none", boxShadow: "none" },
                    "&:hover": {
                      backgroundColor: "#f9f7f3", // Warm White
                      color: "#1a1a1a",
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

      {/* Package Detail Dialog */}
      <Dialog
        open={packageDialogOpen}
        onClose={handleClosePackageDialog}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            border: "1px solid rgba(139, 115, 85, 0.2)",
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
        {selectedPackage && (
          <>
            <DialogTitle
              sx={{
                pb: 1,
                background: "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderBottom: "1px solid rgba(139, 115, 85, 0.1)",
              }}
            >
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
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                {/* Main Image with Transitions */}
                {selectedPackage.gallery && selectedPackage.gallery.length > 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "250px", md: "350px" },
                      borderRadius: 2,
                      border: "1px solid rgba(139, 115, 85, 0.2)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      mb: 3,
                      position: "relative",
                    }}
                  >
                    {selectedPackage.gallery.map((image, imgIndex) => {
                      const isActive = imgIndex === dialogImageIndex;
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
                            console.error(`Failed to load package image: ${image}`);
                            e.target.src = "/IMG-20251210-WA0070.jpg";
                          }}
                        />
                      );
                    })}

                    {/* Image Indicators */}
                    {selectedPackage.gallery.length > 1 && (
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
                        {selectedPackage.gallery.map((_, idx) => (
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

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    lineHeight: 1.7,
                    fontSize: { xs: "1.05rem", md: "1.15rem" },
                    fontWeight: 500,
                    mb: 2,
                  }}
                >
                  {selectedPackage.short_description}
                </Typography>

                {/* Highlights */}
                {selectedPackage.highlights && selectedPackage.highlights.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#8b7355",
                        mb: 1,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                      }}
                    >
                      Highlights:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {selectedPackage.highlights.map((highlight, idx) => (
                        <Typography
                          key={idx}
                          component="li"
                          variant="body2"
                          sx={{
                            mb: 0.5,
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
                {selectedPackage.pricing_tiers && selectedPackage.pricing_tiers.length > 0 && (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#8b7355",
                        mb: 1,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                      }}
                    >
                      Indicative Pricing (2026 Rates):
                    </Typography>
                    {selectedPackage.pricing_tiers.map((tier, idx) => (
                      <Typography
                        key={idx}
                        variant="body1"
                        sx={{
                          mb: 0.75,
                          color: "text.primary",
                          fontSize: { xs: "1rem", md: "1.05rem" },
                          fontWeight: 600,
                        }}
                      >
                        <strong>{tier.tier}:</strong> {tier.price_range}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                p: { xs: 2, md: 3 },
                pt: 0,
                background: "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderTop: "1px solid rgba(139, 115, 85, 0.1)",
              }}
            >
              <Button
                onClick={handleClosePackageDialog}
                variant="outlined"
                sx={{
                  borderColor: "#8b7355",
                  color: "#8b7355",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    borderColor: "#c8a97e",
                    backgroundColor: "#8b7355",
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

