import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

// Dummy destination data - same as in ServicesSection
const dummyDestinations = [
  {
    id: 1,
    title: "Maasai Mara National Reserve",
    description:
      "Experience the Great Migration and witness the Big Five in their natural habitat. Home to over 1.5 million wildebeest, zebras, and gazelles.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    location: "Narok County, Kenya",
    duration: "3-5 Days",
    bestTime: "July - October",
    wildlife: "Big Five, Great Migration",
    highlights: ["Game Drives", "Hot Air Balloon Safari", "Cultural Visits"],
  },
  {
    id: 2,
    title: "Amboseli National Park",
    description:
      "Famous for its large elephant herds and stunning views of Mount Kilimanjaro. A photographer's paradise with diverse wildlife and breathtaking landscapes.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    location: "Kajiado County, Kenya",
    duration: "2-4 Days",
    bestTime: "June - September",
    wildlife: "Elephants, Lions, Cheetahs",
    highlights: [
      "Elephant Viewing",
      "Mount Kilimanjaro Views",
      "Bird Watching",
    ],
  },
  {
    id: 3,
    title: "Samburu National Reserve",
    description:
      "Discover unique wildlife species found only in northern Kenya, including the Grevy's zebra, Somali ostrich, and reticulated giraffe.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    location: "Samburu County, Kenya",
    duration: "3-4 Days",
    bestTime: "January - March, July - October",
    wildlife: "Grevy's Zebra, Reticulated Giraffe",
    highlights: ["Special Five", "River Safaris", "Cultural Experiences"],
  },
];

export default function Destinations() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // Using dummy data for now
    setDestinations(dummyDestinations);
    setLoading(false);

    // Commented out API call - using dummy data
    // fetchDestinations();
  }, []);

  // Commented out API fetch logic
  // const fetchDestinations = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("/api/destinations");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch destinations");
  //     }
  //     const data = await response.json();
  //     if (data.success && data.data) {
  //       setDestinations(data.data);
  //     } else {
  //       setDestinations([]);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching destinations:", err);
  //     setDestinations([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleViewDetails = (destinationId) => {
    navigate(`/destination/${destinationId}`, {
      state: { from: "/destinations" },
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
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
                Explore all our safari destinations across Kenya
              </Typography>
            </Box>

            {/* Destinations Grid */}
            {destinations.length === 0 ? (
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
                      md: 4,
                    }}
                    key={destination.id}
                  >
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
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
                              sx={{
                                mb: { xs: 1, sm: 1.5 },
                                backgroundColor: "#B85C38", // Burnt orange/rust
                                color: "white",
                              }}
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
                              textOverflow: "ellipsis",
                              lineHeight: 1.5,
                              minHeight: { xs: "3.6rem", sm: "4.5rem" }, // keep card height stable
                              flexGrow: 1,
                              fontSize: { xs: "0.95rem", sm: "1.05rem" },
                              fontWeight: 700,
                            }}
                          >
                            {destination.description}
                          </Typography>

                          <Box sx={{ mb: { xs: 0.5, sm: 1 }, mt: { xs: 0.25, sm: 0.5 } }}>
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
                                fontSize: "0.875rem",
                                py: 1,
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
