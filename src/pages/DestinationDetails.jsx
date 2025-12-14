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

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine where user came from based on location state or referrer
  const cameFromDestinations = location.state?.from === "/destinations" || 
    document.referrer.includes("/destinations");

  useEffect(() => {
    // Using dummy data for now
    const foundDestination = dummyDestinations.find(
      (dest) => dest.id === parseInt(id)
    );
    if (foundDestination) {
      setDestination(foundDestination);
      setLoading(false);
    } else {
      setError("Destination not found");
      setLoading(false);
    }

    // Commented out API call - using dummy data
    // fetchDestinationDetails();
  }, [id]);

  // Commented out API fetch logic
  // const fetchDestinationDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`/api/destinations/${id}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch destination details");
  //     }
  //     const data = await response.json();
  //     if (data.success && data.data) {
  //       setDestination(data.data);
  //     } else {
  //       throw new Error("Destination not found");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching destination details:", err);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
              } else {
                // Navigate to home and scroll to destinations section
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
            {cameFromDestinations ? "Back to Destinations" : "Back to Home"}
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
                alt={destination.title}
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
                    <Chip
                      label={destination.wildlife}
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        backgroundColor: "#B85C38", // Burnt orange/rust
                        color: "white",
                      }}
                    />
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
    </Box>
  );
}

