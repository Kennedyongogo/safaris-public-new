import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { LocationOn, ArrowForward } from "@mui/icons-material";

const MotionBox = motion(Box);

const DestinationCard = ({ destination, isMobile, handleViewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = useMemo(() => {
    const list = [];
    if (destination.image) {
      list.push(destination.image);
    }
    if (Array.isArray(destination.gallery_images)) {
      list.push(...destination.gallery_images.filter((img) => img));
    }
    return list;
  }, [destination]);

  const hasMultipleImages = images.length > 1;
  const currentImageUrl = images.length > 0 ? images[currentImageIndex] : null;

  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <Card
      sx={{
        height: { xs: "430px", sm: "470px" },
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
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          height: "50%",
          flex: "0 0 50%",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        {currentImageUrl && !imageError ? (
          <Box
            component="img"
            src={currentImageUrl}
            alt={destination.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <Box
            component="img"
            src="/IMG-20251210-WA0070.jpg"
            alt={destination.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          flex: "1 1 50%",
          height: "50%",
          p: { xs: 1, sm: 1.25 },
          pb: { xs: 1.5, sm: 1.75 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ mb: { xs: 1, sm: 2 } }}>
          <Chip
            label="Safari Destination"
            color="primary"
            size="small"
            sx={{
              mb: { xs: 0.5, sm: 0.75 },
              backgroundColor: "#B85C38", // Burnt orange/rust
              color: "white",
            }}
          />
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: { xs: 0.25, sm: 0.35 },
              color: "text.primary",
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
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
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineClamp: 2,
            textOverflow: "ellipsis",
            lineHeight: 1.3,
            maxHeight: { xs: "2.6rem", sm: "2.6rem" },
            minHeight: { xs: "2.6rem", sm: "2.6rem" }, // keep card height stable
            flexGrow: 1,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            fontWeight: 700,
          }}
        >
          {destination.description}
        </Typography>

        <Box sx={{ mb: { xs: 0.25, sm: 0.5 }, mt: { xs: 0.2, sm: 0.4 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: { xs: 0.2, sm: 0.35 },
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
            onClick={() => handleViewDetails(destination.id)}
            sx={{
              borderColor: "#6B4E3D", // Medium brown
              color: "#6B4E3D",
              fontSize: "0.85rem",
              py: 0.75,
              mb: 0.25,
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
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
  );
};

export default function Destinations() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
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
        const buildFullImageUrl = (imagePath) => {
          if (!imagePath) return "";
          if (imagePath.startsWith("http")) return imagePath;
          return `/${imagePath}`;
        };

        const mappedDestinations = result.data.map((destination) => {
          let highlights = [];
          if (Array.isArray(destination.packages) && destination.packages.length > 0) {
            const firstCategory = destination.packages[0];
            if (firstCategory.packages && firstCategory.packages.length > 0) {
              const firstPackage = firstCategory.packages[0];
              highlights = Array.isArray(firstPackage.highlights)
                ? firstPackage.highlights.slice(0, 3)
                : [];
            }
          }

          return {
            id: destination.id,
            slug: destination.slug,
            title: destination.title,
            subtitle: destination.subtitle || "",
            description: destination.brief_description || "",
            image: buildFullImageUrl(destination.hero_image),
            gallery_images: Array.isArray(destination.gallery_images)
              ? destination.gallery_images.map((img) => buildFullImageUrl(img))
              : [],
            location: destination.location || "East Africa",
            duration: "Multiple packages available",
            highlights: highlights,
            packages: Array.isArray(destination.packages) ? destination.packages : [],
          };
        });
        setDestinations(mappedDestinations);
      } else {
        throw new Error(result.message || "Failed to fetch destinations");
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError(err.message || "Failed to load destinations");
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (destinationId) => {
    try {
      const response = await fetch(`/api/destinations/public/id/${destinationId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        navigate(`/destination/${destinationId}`, {
          state: { destination: result.data, from: "/destinations" },
        });
      } else {
        throw new Error(result.message || "Failed to fetch destination details");
      }
    } catch (error) {
      console.error("Error fetching destination details:", error);
      navigate(`/destination/${destinationId}`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          pt: 1.5,
          pb: 1.5,
          px: 0,
          bgcolor: "#F5F1E8",
          background:
            "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
      <Helmet>
        <title>Safari Destinations in Kenya &amp; East Africa | Akira Safaris</title>
        <meta
          name="description"
          content="Discover safari destinations across Kenya, Uganda, Tanzania, and Rwanda with Akira Safaris. Find wildlife highlights and trip ideas."
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
                  fontWeight: 800,
                  fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
                  background:
                    "linear-gradient(45deg, #6B4E3D, #B85C38, #3D2817)", // Medium brown, rust, dark brown
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
                All Destinations
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
                  color: "#3D2817", // Dark brown from palette
                }}
              >
                Discover the breathtaking beauty of Kenya, Uganda, Tanzania, and Rwanda through our curated safari destinations, offering unforgettable adventures and authentic cultural experiences.
              </Typography>
            </Box>

            {/* Destinations Grid */}
            {error ? (
              <Box textAlign="center" py={4}>
                <Typography color="text.secondary" variant="body1">
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
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <DestinationCard
                        destination={destination}
                        isMobile={isMobile}
                        handleViewDetails={handleViewDetails}
                      />
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}
