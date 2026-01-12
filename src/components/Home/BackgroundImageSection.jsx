import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Rating,
  Avatar,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { LocationOn, CalendarToday, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function BackgroundImageSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      return dateString;
    }
  };

  // Fetch reviews from the database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews/approved?limit=100");
        const data = await res.json();

        if (res.ok && data.success) {
          setReviews(data.data || []);
        } else {
          console.error("Failed to load reviews:", data.message);
          setReviews([]);
        }
      } catch (err) {
        console.error("Error loading reviews:", err);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  // Fetch gallery images for background
  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await fetch("/api/gallery/public?all=true&type=image");
        const data = await response.json();

        if (data.success && data.data.items.length > 0) {
          // Convert gallery items to image URLs
          const imageUrls = data.data.items.map((item) => {
            // Build full image URL from filePath
            if (item.filePath.startsWith("http")) {
              return item.filePath;
            } else {
              return `/${item.filePath.startsWith("/") ? item.filePath.slice(1) : item.filePath}`;
            }
          });

          setBackgroundImages(imageUrls);
        } else {
          // Fallback to some default images if API fails or no items
          setBackgroundImages([
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop&q=90",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=90",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop&q=90",
            "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1920&h=1080&fit=crop&q=90",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=90",
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch background images:", error);
        // Fallback to default images
        setBackgroundImages([
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop&q=90",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=90",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop&q=90",
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1920&h=1080&fit=crop&q=90",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=90",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBackgroundImages();
  }, []);

  // Rotate reviews independently
  useEffect(() => {
    // Only start the rotation if we have reviews
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [reviews]);

  // Rotate background images independently
  useEffect(() => {
    // Only start the rotation if we have background images
    if (backgroundImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 4000); // Change background image every 4 seconds

    return () => clearInterval(interval);
  }, [backgroundImages]);

  return (
    <Box
      data-section="reviews"
      id="reviews-section"
      sx={{
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 0.5, sm: 0.75, md: 1 },
        position: "relative",
        zIndex: 1,
        backgroundColor: "#f9f7f3", // Warm White background
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(139, 115, 85, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: { xs: "visible", sm: "hidden" },
        }}
      >
        {/* Full Width Background Images */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          {backgroundImages.length > 0 ? (
            backgroundImages.map((imageUrl, index) => (
              <Box
                key={`${imageUrl}-${index}`}
                component="img"
                src={imageUrl}
                alt={`Background ${index + 1}`}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: index === currentBackgroundIndex ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=600&fit=crop";
                }}
              />
            ))
          ) : (
            // Loading placeholder - solid background until images load
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #8b7355 0%, #c8a97e 100%)",
                opacity: 0.8,
              }}
            />
          )}
        </Box>
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            pt: { xs: 1, sm: 0, md: 0 },
            pb: { xs: 1, sm: 0, md: 0 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              minHeight: { xs: "250px", sm: "300px", md: "350px" },
              position: "relative",
              overflow: { xs: "visible", sm: "hidden" },
            }}
          >
            {/* Vintage Style Heading for Reviews */}
            <Box
              sx={{
                textAlign: "center",
                mb: { xs: 1, sm: 1.5, md: 2 },
                position: "relative",
                py: { xs: 1, sm: 1.5, md: 2 },
                zIndex: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    "'Brush Script MT', 'Lucida Handwriting', 'Dancing Script', cursive",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                  fontWeight: 900,
                  color: "#1a1a1a", // Primary Black
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                  display: "inline-block",
                  position: "relative",
                  textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)",
                }}
              >
                Akira Safaris Reviews
              </Typography>
            </Box>

            {/* Single Testimonial Card Overlay - Centered and Transitioning */}
            {reviews.length > 0 && (
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: { xs: "250px", sm: "300px", md: "350px" },
                  p: { xs: 1.5, sm: 2, md: 3 },
                }}
              >
                {reviews.map((review, index) => (
                  <Box
                    key={review.id}
                    sx={{
                      position: { xs: "relative", sm: "absolute" },
                      width: { xs: "100%", sm: "90%", md: "600px" },
                      maxWidth: "600px",
                      mx: { xs: "auto", sm: 0 },
                      mb: { xs: index === currentReviewIndex ? 0 : 0, sm: 0 },
                      opacity: index === currentReviewIndex ? 1 : 0,
                      transform:
                        index === currentReviewIndex
                          ? "translateY(0) scale(1)"
                          : "translateY(20px) scale(0.95)",
                      transition:
                        "opacity 1s ease-in-out, transform 1s ease-in-out",
                      pointerEvents:
                        index === currentReviewIndex ? "auto" : "none",
                      zIndex: index === currentReviewIndex ? 2 : 1,
                    }}
                  >
                    <Card
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 3,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
                        {/* User Info */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2.5,
                          }}
                        >
                          <Avatar
                            alt={review.name}
                            sx={{
                              width: { xs: 56, md: 64 },
                              height: { xs: 56, md: 64 },
                              mr: 2,
                            }}
                          >
                            {review.name.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                fontSize: { xs: "1.4rem", md: "1.4rem" },
                                mb: 0.5,
                              }}
                            >
                              {review.name}
                            </Typography>
                            <Rating
                              value={review.rating}
                              readOnly
                              precision={0.5}
                              size="medium"
                              sx={{
                                "& .MuiRating-iconFilled": {
                                  color: "#c8a97e", // Accent Gold
                                },
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Comment */}
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#666666",
                            mb: 2.5,
                            fontSize: { xs: "1.4rem", md: "1.4rem" },
                            lineHeight: 1.7,
                            fontStyle: "italic",
                          }}
                        >
                          "{review.comment}"
                        </Typography>

                        {/* Destination and Date */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                            pt: 2,
                            borderTop: "1px solid rgba(0,0,0,0.1)",
                          }}
                        >
                          {review.location && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <LocationOn
                                sx={{
                                  fontSize: { xs: 18, md: 20 },
                                  color: "primary.main",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: { xs: "0.8125rem", md: "0.875rem" },
                                  color: "#666666",
                                  fontWeight: 500,
                                }}
                              >
                                {review.location}
                              </Typography>
                            </Box>
                          )}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CalendarToday
                              sx={{
                                fontSize: { xs: 18, md: 20 },
                                color: "#666666",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: { xs: "0.8125rem", md: "0.875rem" },
                                color: "#666666",
                              }}
                            >
                              {formatDate(review.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            )}

            {/* View All Button - Centered below review card */}
            {reviews.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: { xs: 2, sm: 2.5, md: 3 },
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/reviews")}
                  sx={{
                    backgroundColor: "#c8a97e", // Accent Gold
                    color: "#FFFFFF",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                    px: { xs: 2, sm: 2.5, md: 3 },
                    py: { xs: 0.75, sm: 1, md: 1.25 },
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#8b7355", // Secondary Brown
                      color: "#FFFFFF",
                    },
                    "&:focus": {
                      outline: "none",
                      backgroundColor: "#c8a97e",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      backgroundColor: "#c8a97e",
                    },
                    boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                  }}
                >
                  View All
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Card>
    </Box>
  );
}
