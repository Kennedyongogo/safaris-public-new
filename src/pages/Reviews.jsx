import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Rating,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { LocationOn, CalendarToday, Send } from "@mui/icons-material";

const MotionBox = motion(Box);

// Hardcoded reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "An absolutely incredible safari experience! The guides were knowledgeable and the wildlife sightings were breathtaking. Every moment was perfectly organized.",
    date: "March 15, 2024",
    destination: "Maasai Mara National Reserve",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment: "The best vacation of my life! Every moment was perfectly organized and the landscapes were stunning. Highly recommend to everyone!",
    date: "February 28, 2024",
    destination: "Amboseli National Park",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Emma Williams",
    rating: 4.5,
    comment: "Amazing wildlife encounters and excellent service. Highly recommend for anyone wanting to experience Africa's natural beauty.",
    date: "January 20, 2024",
    destination: "Samburu National Reserve",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    comment: "Unforgettable moments watching the Big Five in their natural habitat. The photography opportunities were incredible!",
    date: "December 10, 2023",
    destination: "Tsavo National Park",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    rating: 4.5,
    comment: "A truly magical experience! The sunrise game drives and sunset views were absolutely spectacular.",
    date: "November 22, 2023",
    destination: "Lake Nakuru National Park",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    id: 6,
    name: "James Wilson",
    rating: 5,
    comment: "Outstanding service from start to finish. The team made sure we saw everything we wanted and more!",
    date: "October 15, 2023",
    destination: "Maasai Mara National Reserve",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 7,
    name: "Maria Garcia",
    rating: 4.5,
    comment: "Beautiful landscapes and amazing wildlife. The guides were professional and very knowledgeable about the area.",
    date: "September 8, 2023",
    destination: "Amboseli National Park",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop",
  },
  {
    id: 8,
    name: "Robert Brown",
    rating: 5,
    comment: "Exceeded all expectations! The attention to detail and personalized service made this trip unforgettable.",
    date: "August 20, 2023",
    destination: "Samburu National Reserve",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  },
];

export default function Reviews() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    comment: "",
    rating: 0,
    recommend: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Review submitted:", formData);
      setLoading(false);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        comment: "",
        rating: 0,
        recommend: false,
      });
      // You can add a success message here
    }, 1000);
  };

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
                Customer Reviews
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
                Read what our guests have to say about their safari experiences
              </Typography>
            </Box>

            {/* Reviews Grid - 4 cards per row */}
            <Grid
              container
              spacing={{ xs: 2, sm: 2.5, md: 3 }}
              justifyContent="center"
            >
              {reviews.map((review, index) => (
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                  key={review.id}
                >
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: { xs: "auto", sm: "320px", md: "340px" },
                        minHeight: { xs: "280px", sm: "320px", md: "340px" },
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
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          p: { xs: 2, sm: 2.5, md: 3 },
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        {/* User Info */}
                        <Box
                          sx={{
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: { xs: "1rem", md: "1.125rem" },
                              mb: 0.5,
                            }}
                          >
                            {review.name}
                          </Typography>
                          <Rating
                            value={review.rating}
                            readOnly
                            precision={0.5}
                            size="small"
                            sx={{
                            "& .MuiRating-iconFilled": {
                                color: "#B85C38", // Burnt orange/rust
                            },
                            }}
                          />
                        </Box>

                        {/* Comment */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            mb: 2,
                            fontSize: { xs: "0.95rem", md: "1rem" },
                            lineHeight: 1.6,
                            fontStyle: "italic",
                            fontWeight: 600,
                            flexGrow: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          "{review.comment}"
                        </Typography>

                        {/* Destination and Date */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            pt: 1.5,
                            borderTop: "1px solid rgba(0,0,0,0.1)",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <LocationOn
                              sx={{
                                fontSize: { xs: 16, md: 18 },
                                color: "#6B4E3D", // Medium brown
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: { xs: "0.85rem", md: "0.95rem" },
                                color: "text.secondary",
                                fontWeight: 600,
                              }}
                            >
                              {review.destination}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <CalendarToday
                              sx={{
                                fontSize: { xs: 16, md: 18 },
                                color: "text.secondary",
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: { xs: "0.85rem", md: "0.95rem" },
                                color: "text.secondary",
                                fontWeight: 600,
                              }}
                            >
                              {review.date}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>

            {/* Review Submission Form */}
            <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: { xs: 3, md: 4 },
                  background: "linear-gradient(135deg, rgba(255, 250, 240, 0.98) 0%, rgba(255, 255, 255, 1) 100%)",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                    color: "#3D2817", // Dark brown from palette
                    textAlign: "center",
                  }}
                >
                  Share Your Experience
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: "text.secondary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    textAlign: "center",
                  }}
                >
                  We'd love to hear about your safari adventure!
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                    {/* Name */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    {/* Phone */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    {/* Location */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>Location You Visited</InputLabel>
                        <Select
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          label="Location You Visited"
                          sx={{
                            backgroundColor: "white",
                            borderRadius: 2,
                          }}
                        >
                          <MenuItem value="Maasai Mara National Reserve">Maasai Mara National Reserve</MenuItem>
                          <MenuItem value="Amboseli National Park">Amboseli National Park</MenuItem>
                          <MenuItem value="Samburu National Reserve">Samburu National Reserve</MenuItem>
                          <MenuItem value="Tsavo National Park">Tsavo National Park</MenuItem>
                          <MenuItem value="Lake Nakuru National Park">Lake Nakuru National Park</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Star Rating */}
                    <Grid size={{ xs: 12 }}>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 1,
                            fontWeight: 500,
                            color: "text.primary",
                          }}
                        >
                          Your Rating *
                        </Typography>
                        <Rating
                          value={formData.rating}
                          onChange={(event, newValue) => {
                            handleInputChange("rating", newValue);
                          }}
                          size="large"
                          sx={{
                            "& .MuiRating-iconFilled": {
                                color: "#B85C38", // Burnt orange/rust
                            },
                          }}
                        />
                      </Box>
                    </Grid>

                    {/* Comment */}
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Your Review Comment"
                        multiline
                        rows={4}
                        required
                        value={formData.comment}
                        onChange={(e) => handleInputChange("comment", e.target.value)}
                        placeholder="Share your experience with us..."
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    {/* Recommend Checkbox */}
                    <Grid size={{ xs: 12 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.recommend}
                            onChange={(e) => handleInputChange("recommend", e.target.checked)}
                            sx={{
                            color: "#B85C38", // Burnt orange/rust
                            "&.Mui-checked": {
                              color: "#B85C38",
                            },
                            }}
                          />
                        }
                        label={
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 500,
                              color: "text.primary",
                            }}
                          >
                            Would you recommend us to your friends?
                          </Typography>
                        }
                      />
                    </Grid>

                    {/* Submit Button */}
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                          disabled={loading || !formData.name || !formData.email || !formData.comment || formData.rating === 0}
                          sx={{
                            backgroundColor: "#B85C38", // Burnt orange/rust
                            color: "white",
                            px: { xs: 4, sm: 5, md: 6 },
                            py: { xs: 1.25, sm: 1.5 },
                            borderRadius: 3,
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            fontWeight: 600,
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(184, 92, 56, 0.3)",
                            "&:hover": {
                              backgroundColor: "#8B4225", // Dark rust
                              boxShadow: "0 6px 16px rgba(184, 92, 56, 0.4)",
                              transform: "translateY(-2px)",
                            },
                            "&:disabled": {
                              backgroundColor: "#ccc",
                              color: "white",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {loading ? "Submitting..." : "Submit Review"}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}

