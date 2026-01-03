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
                Discover the breathtaking beauty of Kenya, Uganda, Tanzania, and Rwanda through our curated safari destinations, offering unforgettable adventures and authentic cultural experiences.
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
                              e.target.src = "/IMG-20251210-WA0070.jpg";
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
