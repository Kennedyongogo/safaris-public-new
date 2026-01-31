import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MotionBox = motion(Box);

// Helper to build image URL
const buildImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `/${imagePath}`;
};

// Package Card Component with Image Transitions - Similar to DestinationDetails
const PackageCard = ({ package: pkg, onViewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images from package gallery - images are already processed in fetchAllPackages
  // The gallery array should already contain properly formatted URLs
  const images = (pkg.gallery && Array.isArray(pkg.gallery) && pkg.gallery.length > 0)
    ? pkg.gallery.filter(img => img && img !== '/') // Filter out empty/invalid images
    : [];
  
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
    <Tooltip
      title={`View ${pkg.title} Details`}
      placement="top"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: "0.9rem",
            fontWeight: 600,
            textAlign: "center",
            px: 1.5,
            py: 0.75,
            bgcolor: "#1a1a1a",
          },
        },
        arrow: {
          sx: {
            color: "#1a1a1a",
          },
        },
      }}
    >
      <Card
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid rgba(139, 115, 85, 0.15)",
          borderRadius: 3,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          background: "linear-gradient(to bottom, #FFFFFF 0%, #f9f7f3 100%)",
          boxShadow: "0 2px 8px rgba(26, 26, 26, 0.08)",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            borderColor: "rgba(200, 169, 126, 0.3)",
          },
        }}
        onClick={() => onViewDetails(pkg)}
      >
      {/* Image Section with Transitions */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "220px", md: "240px" },
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          flexShrink: 0,
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
                background: "linear-gradient(to top, rgba(26, 26, 26, 0.3), transparent)",
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

      <CardContent
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 2.5, md: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", md: "1.125rem" },
            color: "#1a1a1a",
            lineHeight: 1.3,
          }}
        >
          {pkg.title}
        </Typography>
      </CardContent>
      </Card>
    </Tooltip>
  );
};

export default function AllPackages() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Kenya");

  useEffect(() => {
    fetchAllPackages();
  }, []);

  const fetchAllPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/destinations/public");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Extract all packages from all destinations
        const packagesList = [];
        
        result.data.forEach((destination) => {
          if (Array.isArray(destination.packages)) {
            destination.packages.forEach((category) => {
              if (Array.isArray(category.packages)) {
                category.packages.forEach((pkg) => {
                  // Build gallery images array - same logic as DestinationDetails
                  // NO FALLBACK to destination images - packages have their own images
                  const buildFullImageUrl = (imagePath) => {
                    if (!imagePath) return "";
                    if (imagePath.startsWith("http")) return imagePath;
                    // Use relative path that gets proxied to the API server
                    return `/${imagePath}`;
                  };

                  // Get gallery images from package only - no fallback to destination
                  // The gallery should be an array of image paths from the database
                  let finalGallery = [];
                  if (Array.isArray(pkg.gallery) && pkg.gallery.length > 0) {
                    finalGallery = pkg.gallery
                      .map(img => {
                        // Handle both string paths and objects
                        const imagePath = typeof img === 'string' ? img : (img?.path || img?.url || '');
                        return buildFullImageUrl(imagePath);
                      })
                      .filter(img => img && img !== '/'); // Filter out empty strings and invalid paths
                  }
                  // If package has no gallery images, finalGallery remains empty []
                  // PackageCard will show ImageIcon placeholder for empty gallery

                  packagesList.push({
                    ...pkg,
                    destinationId: destination.id,
                    destinationTitle: destination.title,
                    destinationSlug: destination.slug,
                    categoryName: category.category_name,
                    gallery: finalGallery, // Full gallery array for transitions
                    image: finalGallery[0] || "", // First image as fallback
                  });
                });
              }
            });
          }
        });

        setAllPackages(packagesList);
      } else {
        throw new Error(result.message || "Failed to fetch destinations");
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      setAllPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (pkg) => {
    navigate("/package-detail", {
      state: {
        package: pkg,
        category: { category_name: pkg.categoryName },
        destination: {
          id: pkg.destinationId,
          title: pkg.destinationTitle,
          slug: pkg.destinationSlug,
        },
        destinationId: pkg.destinationId,
        returnPath: location.pathname,
      },
    });
  };

  const tabs = [
    { label: "Kenya Safari Packages", value: "Kenya" },
    { label: "Uganda Safari Packages", value: "Uganda" },
    { label: "Tanzania Safari Packages", value: "Tanzania" },
    { label: "Rwanda Safari Packages", value: "Rwanda" },
  ];

  const filteredPackages = allPackages.filter(
    (pkg) => pkg.destinationTitle === activeTab
  );


  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 1.5,
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
      <Helmet>
        <title>East Africa Safari Packages | Akira Safaris</title>
        <meta
          name="description"
          content="Browse East Africa safari packages from Akira Safaris across Kenya, Uganda, Tanzania, and Rwanda. Choose a trip that fits your travel style."
        />
      </Helmet>
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0.75, sm: 0.75, md: 0.75 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              py: { xs: 1.5, sm: 2, md: 2.5 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(139, 115, 85, 0.2)", // Secondary Brown border
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
                All Safari Packages
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
                  color: "#666666", // Neutral Gray
                }}
              >
                Explore our complete collection of safari packages across all destinations
              </Typography>
            </Box>

            <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
              <Tabs
                value={activeTab}
                onChange={(event, value) => setActiveTab(value)}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#8b7355",
                  },
                }}
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    sx={{
                      fontWeight: 700,
                      textTransform: "none",
                      color: "#6B4E3D",
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&.Mui-selected": {
                        color: "#8b7355",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Packages Grid - 4 cards per row */}
            <Grid
              container
              spacing={{ xs: 2, sm: 2.5, md: 3 }}
              sx={{
                alignItems: "stretch",
                "& > .MuiGrid-root": {
                  display: "flex",
                },
              }}
            >
              {loading && (
                <Grid 
                  size={{ xs: 12 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                    width: "100%",
                  }}
                >
                  <CircularProgress sx={{ color: "#c8a97e" }} />
                </Grid>
              )}
              {!loading && filteredPackages.length === 0 && (
                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      py: 4,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#666666", fontWeight: 600 }}
                    >
                      No packages available for this destination yet.
                    </Typography>
                  </Box>
                </Grid>
              )}
              {!loading &&
                filteredPackages.map((pkg, index) => (
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                  key={`${pkg.destinationId}-${pkg.categoryName}-${pkg.number}`}
                >
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    sx={{
                      height: "100%",
                      display: "flex",
                    }}
                  >
                    <PackageCard
                      package={pkg}
                      onViewDetails={handleViewDetails}
                    />
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}

