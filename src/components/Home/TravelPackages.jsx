import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Schedule,
  People,
  ArrowForward,
  AttachMoney,
  Star,
  Close,
  CheckCircle,
} from "@mui/icons-material";

const MotionBox = motion(Box);

// Dummy package data
const dummyPackages = [
  {
    id: 1,
    title: "Maasai Mara Classic Safari",
    description:
      "Experience the Great Migration and witness the Big Five in their natural habitat. Includes luxury accommodation, game drives, and cultural visits.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    duration: "5 Days / 4 Nights",
    price: "$2,500",
    pricePerPerson: "per person",
    groupSize: "2-6 People",
    rating: 4.8,
    highlights: ["Game Drives", "Hot Air Balloon", "Cultural Visits", "All Meals"],
    included: ["Accommodation", "Meals", "Transport", "Park Fees", "Guide"],
    type: "All-inclusive",
  },
  {
    id: 2,
    title: "Amboseli & Tsavo Adventure",
    description:
      "Discover elephants with Mount Kilimanjaro views and explore the vast Tsavo wilderness. Perfect for wildlife photography enthusiasts.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    duration: "4 Days / 3 Nights",
    price: "$1,800",
    pricePerPerson: "per person",
    groupSize: "2-8 People",
    rating: 4.7,
    highlights: ["Elephant Viewing", "Kilimanjaro Views", "Bird Watching", "Sunset Drives"],
    included: ["Accommodation", "Meals", "Transport", "Park Fees"],
    type: "Full board",
  },
  {
    id: 3,
    title: "Samburu Special Five Safari",
    description:
      "Explore northern Kenya's unique wildlife including Grevy's zebra, Somali ostrich, and reticulated giraffe. A truly unique safari experience.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    duration: "3 Days / 2 Nights",
    price: "$1,200",
    pricePerPerson: "per person",
    groupSize: "2-6 People",
    rating: 4.9,
    highlights: ["Special Five", "River Safaris", "Cultural Experiences", "Game Drives"],
    included: ["Accommodation", "Meals", "Transport", "Park Fees", "Guide"],
    type: "All-inclusive",
  },
  {
    id: 4,
    title: "Lake Nakuru & Naivasha Discovery",
    description:
      "Witness the pink flamingos at Lake Nakuru and enjoy boat rides at Lake Naivasha. A perfect blend of wildlife and scenic beauty.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    duration: "3 Days / 2 Nights",
    price: "$950",
    pricePerPerson: "per person",
    groupSize: "2-8 People",
    rating: 4.6,
    highlights: ["Flamingo Viewing", "Boat Rides", "Bird Watching", "Game Drives"],
    included: ["Accommodation", "Breakfast", "Transport", "Park Fees"],
    type: "Bed & breakfast",
  },
  {
    id: 5,
    title: "Luxury Big Five Safari",
    description:
      "Premium safari experience with luxury lodges, private game drives, and exclusive wildlife encounters. The ultimate African safari adventure.",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800",
    duration: "7 Days / 6 Nights",
    price: "$4,500",
    pricePerPerson: "per person",
    groupSize: "2-4 People",
    rating: 5.0,
    highlights: ["Luxury Lodges", "Private Drives", "Spa Services", "Fine Dining"],
    included: ["Luxury Accommodation", "All Meals", "Private Transport", "Park Fees", "Personal Guide"],
    type: "All-inclusive",
  },
  {
    id: 6,
    title: "Family Safari Adventure",
    description:
      "Kid-friendly safari package with educational activities, shorter game drives, and family-friendly accommodations. Perfect for families with children.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    duration: "4 Days / 3 Nights",
    price: "$1,500",
    pricePerPerson: "per person",
    groupSize: "4-8 People",
    rating: 4.8,
    highlights: ["Family Activities", "Educational Tours", "Safe Viewing", "Kid Meals"],
    included: ["Family Rooms", "All Meals", "Transport", "Park Fees", "Family Guide"],
    type: "Full board",
  },
];

const chipStyleByType = {
  "All-inclusive": {
    bg: "#E8F5E9",
    color: "#1B5E20",
    border: "1px solid #A5D6A7",
  },
  "Full board": {
    bg: "#E3F2FD",
    color: "#0D47A1",
    border: "1px solid #90CAF9",
  },
  "Half board": {
    bg: "#FFF3E0",
    color: "#E65100",
    border: "1px solid #FFCC80",
  },
  "Bed & breakfast": {
    bg: "#F3E5F5",
    color: "#6A1B9A",
    border: "1px solid #CE93D8",
  },
  "Custom packages": {
    bg: "#E0F7FA",
    color: "#006064",
    border: "1px solid #80DEEA",
  },
};

const TravelPackages = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [packages] = useState(dummyPackages);
  const [loading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleViewDetails = (packageId) => {
    const pkg = packages.find((p) => p.id === packageId);
    if (pkg) {
      setSelectedPackage(pkg);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPackage(null);
  };

  const handleBookNow = (packageId) => {
    navigate("/plan", { state: { packageId } });
  };

  const handleBookNowFromDialog = () => {
    if (selectedPackage) {
      handleCloseDialog();
      handleBookNow(selectedPackage.id);
    }
  };

  return (
    <Box
      sx={{
        pt: { xs: 0.25, sm: 0.375, md: 0.5 },
        pb: { xs: 0.5, sm: 0.75, md: 1 },
        position: "relative",
        zIndex: 1,
        background: "transparent",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0.375, sm: 0.5, md: 0.5 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            py: { xs: 1, sm: 1.25, md: 1.5 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "white",
            border: "1px solid #e0e0e0",
            minHeight: "auto",
            height: "auto",
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: { xs: 1, sm: 1.25, md: 1.5 }, textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: { xs: 0.5, md: 0.75 },
                color: "#5D4037",
                fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
              }}
            >
              Travel Packages
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 0.5, md: 0.75 },
                color: "text.primary",
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                lineHeight: 1.7,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Travel packages are bundled offerings that combine multiple services at a set price. 
              They simplify planning and often cost less than booking each part separately.
            </Typography>
          </Box>

          {/* Package Listings Section */}
          <Box
            sx={{
              mt: { xs: 2, md: 3 },
              mb: { xs: 2, md: 3 },
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : packages.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography color="text.secondary" variant="body1">
                  No packages available at the moment.
                </Typography>
              </Box>
            ) : (
              <>
                <Typography
                  variant="h3"
                  sx={{
                  fontWeight: 700,
                    mb: { xs: 2, md: 3 },
                    color: "#5D4037",
                  fontSize: { xs: "1.9rem", sm: "2.1rem", md: "2.35rem" },
                    textAlign: "center",
                  }}
                >
                  Our Safari Packages
                </Typography>
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2.5, md: 3 }}
                  justifyContent="center"
                >
                  {packages.map((pkg, index) => (
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                      }}
                      key={pkg.id}
                    >
                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
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
                          {/* Image Section */}
                          <Box
                            sx={{
                              position: "relative",
                              height: isMobile ? "200px" : "240px",
                              width: "100%",
                              overflow: "hidden",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            <Box
                              component="img"
                              src={pkg.image}
                              alt={pkg.title}
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
                            <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                              }}
                            >
                              <Star sx={{ fontSize: 16, color: "#FFA500" }} />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                  color: "#5D4037",
                                }}
                              >
                                {pkg.rating}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                              }}
                            >
                              <Chip
                                label={pkg.type}
                                size="small"
                                sx={{
                                  backgroundColor: chipStyleByType[pkg.type]?.bg || "#5D4037",
                                  color: chipStyleByType[pkg.type]?.color || "white",
                                  border: chipStyleByType[pkg.type]?.border || "none",
                                  fontWeight: 700,
                                  fontSize: "0.8rem",
                                  letterSpacing: 0.2,
                                }}
                              />
                            </Box>
                          </Box>

                          <CardContent
                            sx={{
                              flexGrow: 1,
                              p: { xs: 2, sm: 2.5 },
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {/* Title and Price */}
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
                                {pkg.title}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  gap: 0.5,
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontWeight: 700,
                                    color: "#5D4037",
                                    fontSize: { xs: "1.5rem", sm: "1.7rem" },
                                  }}
                                >
                                  {pkg.price}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.secondary",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  {pkg.pricePerPerson}
                                </Typography>
                              </Box>
                            </Box>

                            {/* Description */}
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
                              {pkg.description}
                            </Typography>

                            {/* Details */}
                            <Box sx={{ mb: 1.5 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.75,
                                  mb: 0.75,
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
                                  {pkg.duration}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.75,
                                }}
                              >
                                <People
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
                                  {pkg.groupSize}
                                </Typography>
                              </Box>
                            </Box>

                            {/* Highlights */}
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
                                {pkg.highlights.slice(0, 3).map((highlight, idx) => (
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

                            {/* Action Buttons */}
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
                                onClick={() => handleViewDetails(pkg.id)}
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
                                Details
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                fullWidth
                                onClick={() => handleBookNow(pkg.id)}
                                endIcon={<ArrowForward />}
                                sx={{
                                  backgroundColor: "#5D4037",
                                  color: "white",
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
                                    backgroundColor: "#4E342E",
                                  },
                                }}
                              >
                                Book Now
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </MotionBox>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>

          {/* Common Package Components Section */}
          <Box
            sx={{
              mt: { xs: 1.5, md: 2 },
              pt: { xs: 1.5, md: 2 },
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 1.5 },
                color: "#5D4037",
                fontSize: { xs: "1.9rem", sm: "2.1rem", md: "2.35rem" },
                textAlign: "center",
              }}
            >
              Common Package Components
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: { xs: 1.5, md: 2 },
                mt: { xs: 1.5, md: 2 },
              }}
            >
              {[
                {
                  title: "Accommodation",
                  description: "Hotels, lodges, camps, or resorts",
                  icon: "🏨",
                },
                {
                  title: "Transportation",
                  description: "Flights, transfers, ground transport, or car rentals",
                  icon: "✈️",
                },
                {
                  title: "Meals",
                  description: "Breakfast, half-board, full-board, or all-inclusive",
                  icon: "🍽️",
                },
                {
                  title: "Activities & Tours",
                  description: "Guided tours, safaris, excursions, entrance fees",
                  icon: "🎯",
                },
                {
                  title: "Services",
                  description: "Guides, travel insurance, visa assistance",
                  icon: "🛎️",
                },
              ].map((component, index) => (
                <Box
                  key={index}
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#fafafa",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 2,
                      borderColor: "#5D4037",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    {component.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 0.75,
                      color: "#5D4037",
                      fontSize: { xs: "1.15rem", md: "1.25rem" },
                      textAlign: "center",
                    }}
                  >
                    {component.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      fontWeight: 600,
                      textAlign: "center",
                      lineHeight: 1.6,
                    }}
                  >
                    {component.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Types of Packages Section */}
          <Box
            sx={{
              mt: { xs: 1.5, md: 2 },
              pt: { xs: 1.5, md: 2 },
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 1.5 },
                color: "#5D4037",
                fontSize: { xs: "1.9rem", sm: "2.1rem", md: "2.35rem" },
                textAlign: "center",
              }}
            >
              Types of Packages
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1.25, md: 1.5 },
                mt: { xs: 1.5, md: 2 },
              }}
            >
              {[
                {
                  type: "All-inclusive",
                  description: "Accommodation, meals, drinks, activities, and transfers",
                },
                {
                  type: "Full board",
                  description: "Accommodation, three meals daily, and some activities",
                },
                {
                  type: "Half board",
                  description: "Accommodation, breakfast, and dinner",
                },
                {
                  type: "Bed & breakfast",
                  description: "Accommodation and breakfast only",
                },
                {
                  type: "Custom packages",
                  description: "Tailored to specific needs and preferences",
                },
              ].map((packageType, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: { xs: 1.5, md: 2 },
                    p: { xs: 1.25, md: 1.5 },
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#fafafa",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "#5D4037",
                    },
                  }}
                >
                  <Box
                    sx={{
                      minWidth: { xs: 8, md: 10 },
                      minHeight: { xs: 8, md: 10 },
                      borderRadius: "50%",
                      backgroundColor: "#5D4037",
                      mt: { xs: 0.5, md: 0.75 },
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#5D4037",
                        fontSize: { xs: "1.15rem", md: "1.25rem" },
                      }}
                    >
                      {packageType.type}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        fontWeight: 600,
                        lineHeight: 1.6,
                      }}
                    >
                      {packageType.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Benefits for Clients Section */}
          <Box
            sx={{
              mt: { xs: 1.5, md: 2 },
              pt: { xs: 1.5, md: 2 },
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 1.5 },
                color: "#5D4037",
                fontSize: { xs: "1.9rem", sm: "2.1rem", md: "2.35rem" },
                textAlign: "center",
              }}
            >
              Benefits for Clients
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                },
                gap: { xs: 1.25, md: 1.5 },
                mt: { xs: 1.5, md: 2 },
              }}
            >
              {[
                {
                  benefit: "Convenience",
                  description: "One booking instead of multiple",
                  icon: "✅",
                },
                {
                  benefit: "Cost savings",
                  description: "Bundled pricing",
                  icon: "💰",
                },
                {
                  benefit: "Expert planning",
                  description: "Curated itineraries",
                  icon: "📋",
                },
                {
                  benefit: "Peace of mind",
                  description: "Support and coordination included",
                  icon: "🛡️",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: { xs: 1.25, md: 1.5 },
                    p: { xs: 1.25, md: 1.5 },
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#fafafa",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                      borderColor: "#5D4037",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                      lineHeight: 1,
                    }}
                  >
                    {item.icon}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#5D4037",
                        fontSize: { xs: "1.15rem", md: "1.25rem" },
                      }}
                    >
                      {item.benefit}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        fontWeight: 600,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Benefits for Companies Section */}
          <Box
            sx={{
              mt: { xs: 1.5, md: 2 },
              pt: { xs: 1.5, md: 2 },
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 1.5 },
                color: "#5D4037",
                fontSize: { xs: "1.9rem", sm: "2.1rem", md: "2.35rem" },
                textAlign: "center",
              }}
            >
              Benefits for Companies
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                },
                gap: { xs: 1.25, md: 1.5 },
                mt: { xs: 1.5, md: 2 },
              }}
            >
              {[
                {
                  benefit: "Higher revenue",
                  description: "Sell multiple services together",
                  icon: "📈",
                },
                {
                  benefit: "Better margins",
                  description: "Negotiated rates with suppliers",
                  icon: "💼",
                },
                {
                  benefit: "Customer loyalty",
                  description: "Easier repeat bookings",
                  icon: "❤️",
                },
                {
                  benefit: "Streamlined operations",
                  description: "Standardized offerings",
                  icon: "⚙️",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: { xs: 1.25, md: 1.5 },
                    p: { xs: 1.25, md: 1.5 },
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#fafafa",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                      borderColor: "#5D4037",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                      lineHeight: 1,
                    }}
                  >
                    {item.icon}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#5D4037",
                        fontSize: { xs: "1.15rem", md: "1.25rem" },
                      }}
                    >
                      {item.benefit}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        fontWeight: 600,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Safari Company Packages Section */}
          <Box
            sx={{
              mt: { xs: 1.5, md: 2 },
              pt: { xs: 1.5, md: 2 },
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 1.5 },
                color: "#5D4037",
                fontSize: { xs: "1.9rem", sm: "2.1rem", md: "2.35rem" },
                textAlign: "center",
              }}
            >
              Our Safari Packages Include
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: { xs: 1, md: 1.5 },
                mt: { xs: 1.5, md: 2 },
              }}
            >
              {[
                "Accommodation at camps/lodges",
                "Game drives and safari activities",
                "Meals and drinks",
                "Airport transfers",
                "Park entry fees",
                "Professional guides",
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 0.75, md: 1 },
                    borderRadius: 2,
                    border: "1px solid #5D4037",
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#5D4037",
                      color: "white",
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      fontWeight: 700,
                      color: "inherit",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

        </Paper>
      </Container>

      {/* Package Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 3 },
            maxHeight: { xs: "90vh", sm: "85vh" },
            m: { xs: 1, sm: 2 },
          },
        }}
      >
        {selectedPackage && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                pb: 2,
                borderBottom: "1px solid rgba(107, 78, 61, 0.2)",
              }}
            >
              <Box sx={{ flex: 1, pr: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Chip
                    label={selectedPackage.type}
                    size="small"
                    sx={{
                      backgroundColor: chipStyleByType[selectedPackage.type]?.bg || "#5D4037",
                      color: chipStyleByType[selectedPackage.type]?.color || "white",
                      border: chipStyleByType[selectedPackage.type]?.border || "none",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      letterSpacing: 0.2,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      ml: "auto",
                    }}
                  >
                    <Star sx={{ fontSize: 18, color: "#FFA500" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#5D4037",
                      }}
                    >
                      {selectedPackage.rating}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#5D4037",
                    fontSize: { xs: "1.45rem", sm: "1.7rem" },
                  }}
                >
                  {selectedPackage.title}
                </Typography>
              </Box>
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  color: "#6B4E3D",
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(184, 92, 56, 0.1)",
                  },
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                pt: 3,
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(107, 78, 61, 0.1)",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#6B4E3D",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#B85C38",
                  },
                },
              }}
            >
              {/* Package Image */}
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "200px", sm: "300px" },
                  borderRadius: 2,
                  overflow: "hidden",
                  mb: 3,
                }}
              >
                <Box
                  component="img"
                  src={selectedPackage.image}
                  alt={selectedPackage.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "/foundation-logo.png";
                  }}
                />
              </Box>

              {/* Price and Key Info */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  mb: 3,
                  gap: 2,
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#5D4037",
                        fontSize: { xs: "2rem", sm: "2.2rem" },
                      }}
                    >
                      {selectedPackage.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      {selectedPackage.pricePerPerson}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    <Schedule sx={{ fontSize: 18, color: "#5D4037" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "1rem",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      {selectedPackage.duration}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    <People sx={{ fontSize: 18, color: "#5D4037" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "1rem",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      {selectedPackage.groupSize}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "text.secondary",
                  lineHeight: 1.7,
                  fontSize: { xs: "1.05rem", sm: "1.1rem" },
                  fontWeight: 600,
                }}
              >
                {selectedPackage.description}
              </Typography>

              {/* Highlights */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#5D4037",
                    fontSize: { xs: "1.2rem", sm: "1.3rem" },
                  }}
                >
                  Highlights
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {selectedPackage.highlights.map((highlight, index) => (
                    <Chip
                      key={index}
                      label={highlight}
                      sx={{
                          backgroundColor: "#f5f5f5",
                          color: "#5D4037",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* What's Included */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#5D4037",
                    fontSize: { xs: "1.2rem", sm: "1.3rem" },
                  }}
                >
                  What's Included
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {selectedPackage.included.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <CheckCircle
                        sx={{
                          fontSize: 20,
                          color: "#5D4037",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "1rem",
                          color: "text.secondary",
                          fontWeight: 600,
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                px: 3,
                pb: 3,
                pt: 2,
                borderTop: "1px solid rgba(107, 78, 61, 0.2)",
                gap: 1,
              }}
            >
              <Button
                onClick={handleCloseDialog}
                variant="outlined"
                sx={{
                  borderColor: "#5D4037",
                  color: "#5D4037",
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
                    backgroundColor: "rgba(93, 64, 55, 0.05)",
                  },
                }}
              >
                Close
              </Button>
              <Button
                onClick={handleBookNowFromDialog}
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: "#5D4037",
                  color: "white",
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    backgroundColor: "#4E342E",
                  },
                }}
              >
                Book Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TravelPackages;

