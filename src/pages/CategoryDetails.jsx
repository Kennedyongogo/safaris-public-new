import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

// Destination Card Component with Image Transitions
const DestinationCard = ({ destination, onClick, isMobile }) => {
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
    <Card
      onClick={onClick}
      sx={{
        position: "relative",
        height: { xs: "280px", sm: "320px", md: "360px" },
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        border: "1px solid rgba(139, 115, 85, 0.15)",
        borderRadius: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 32px rgba(26, 26, 26, 0.15)",
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
      
      {/* Title positioned at bottom */}
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
    </Card>
  );
};

export default function CategoryDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [itemLoading, setItemLoading] = useState(false);

  // Get the tab we came from (traveller, interest, or destinations)
  const cameFromTab = location.state?.from || "destinations";
  const itemId = location.state?.itemId;
  
  // Determine tab label and tab index for navigation back
  const getTabInfo = () => {
    switch (cameFromTab) {
      case "traveller":
        return { label: "Back to By Traveller", tabIndex: 1 };
      case "interest":
        return { label: "Back to By Interest", tabIndex: 2 };
      default:
        return { label: "Back to Destinations", tabIndex: 0 };
    }
  };

  const tabInfo = getTabInfo();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchDestinations();
    if (itemId && (cameFromTab === "traveller" || cameFromTab === "interest")) {
      fetchClickedItem();
    }
  }, [itemId, cameFromTab]);

  const fetchClickedItem = async () => {
    if (!itemId) return;
    
    try {
      setItemLoading(true);
      const endpoint = cameFromTab === "traveller" 
        ? `/api/traveller-gallery/public/${itemId}`
        : `/api/interest-gallery/public/${itemId}`;
      
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setClickedItem({
          title: result.data.title,
          description: result.data.description || "",
          category: result.data.category,
        });
      }
    } catch (err) {
      console.error("Error fetching clicked item:", err);
      // Don't set error, just don't show description
      setClickedItem(null);
    } finally {
      setItemLoading(false);
    }
  };

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
        const buildFullImageUrl = (imagePath) => {
          if (!imagePath) return "";
          if (imagePath.startsWith("http")) return imagePath;
          return `/${imagePath}`;
        };

        // Get ALL destinations (no limit)
        const mappedDestinations = result.data.map(dest => ({
          id: dest.id,
          title: dest.title,
          subtitle: dest.subtitle || "",
          description: dest.brief_description || "",
          image: buildFullImageUrl(dest.hero_image),
          gallery_images: Array.isArray(dest.gallery_images)
            ? dest.gallery_images.map(img => buildFullImageUrl(img))
            : [],
          location: dest.location,
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

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
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
              navigate("/", { 
                state: { 
                  scrollToSection: "mission-section",
                  activeTab: tabInfo.tabIndex 
                } 
              });
              // Small delay to ensure page loads before scrolling
              setTimeout(() => {
                const section = document.getElementById("mission-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }, 100);
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
            {tabInfo.label}
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
            <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
              {/* Item Description Section - Only show if we have a clicked item */}
              {clickedItem && clickedItem.description && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "#1a1a1a",
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                    }}
                  >
                    {clickedItem.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      color: "#666666",
                      fontSize: { xs: "1.05rem", sm: "1.15rem" },
                      fontWeight: 500,
                      mb: 3,
                    }}
                  >
                    {clickedItem.description}
                  </Typography>
                </Box>
              )}

              {/* All Destinations Section */}
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
                East Africa Safari Destinations
              </Typography>
              
              {destinations.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <Typography sx={{ color: "#666666" }} variant="body1">
                    No destinations available at the moment.
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                  {destinations.map((dest) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={dest.id}>
                      <DestinationCard
                        destination={dest}
                        isMobile={isMobile}
                        onClick={() => {
                          navigate(`/destination/${dest.id}`, {
                            state: { from: "category-detail" },
                          });
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Paper>
        </MotionBox>
      </Container>

    </Box>
  );
}

