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
} from "@mui/material";
import { LocationOn, CalendarToday } from "@mui/icons-material";

// Testimonial cards data - one for each background image
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "An absolutely incredible safari experience! The guides were knowledgeable and the wildlife sightings were breathtaking.",
    date: "March 15, 2024",
    destination: "Maasai Mara National Reserve",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment: "The best vacation of my life! Every moment was perfectly organized and the landscapes were stunning.",
    date: "February 28, 2024",
    destination: "Amboseli National Park",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Emma Williams",
    rating: 4.5,
    comment: "Amazing wildlife encounters and excellent service. Highly recommend for anyone wanting to experience Africa.",
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
];

export default function BackgroundImageSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery images for background
  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await fetch('/api/gallery/public?all=true&type=image');
        const data = await response.json();

        if (data.success && data.data.items.length > 0) {
          // Convert gallery items to image URLs
          const imageUrls = data.data.items.map(item => {
            // Build full image URL from filePath
            if (item.filePath.startsWith('http')) {
              return item.filePath;
            } else {
              return `/${item.filePath.startsWith('/') ? item.filePath.slice(1) : item.filePath}`;
            }
          });

          // Ensure we have at least 5 images for the background rotation
          // Duplicate images if necessary to reach minimum count
          const minImages = 5;
          let finalImages = [...imageUrls];
          while (finalImages.length < minImages) {
            finalImages = [...finalImages, ...imageUrls];
          }

          setBackgroundImages(finalImages.slice(0, minImages));
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
        console.error('Failed to fetch background images:', error);
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

  useEffect(() => {
    // Only start the rotation if we have images
    if (backgroundImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages]);

  return (
    <Box
      sx={{
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 0.5, sm: 0.75, md: 1 },
        position: "relative",
        zIndex: 1,
        backgroundColor: "#F5F1E8", // Solid beige background to prevent rendering flicker
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(107, 78, 61, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
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
          {backgroundImages.length > 0 ? backgroundImages.map((imageUrl, index) => (
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
                opacity: index === currentImageIndex ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=600&fit=crop";
              }}
            />
          )) : (
            // Loading placeholder - solid background until images load
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #6B4E3D 0%, #B85C38 100%)",
                opacity: 0.8,
              }}
            />
          )}
        </Box>
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            pt: { xs: 0, sm: 0, md: 0 },
            position: "relative",
            zIndex: 1,
          }}
        >
        <Box
          sx={{
            minHeight: { xs: "400px", sm: "500px", md: "600px" },
            position: "relative",
          }}
        >

          {/* Single Testimonial Card Overlay - Centered and Transitioning */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: { xs: "400px", sm: "500px", md: "600px" },
              p: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Box
                key={testimonial.id}
                sx={{
                  position: "absolute",
                  width: { xs: "100%", sm: "90%", md: "600px" },
                  maxWidth: "600px",
                  opacity: index === currentImageIndex ? 1 : 0,
                  transform:
                    index === currentImageIndex
                      ? "translateY(0) scale(1)"
                      : "translateY(20px) scale(0.95)",
                  transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                  pointerEvents: index === currentImageIndex ? "auto" : "none",
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
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{
                          width: { xs: 56, md: 64 },
                          height: { xs: 56, md: 64 },
                          mr: 2,
                        }}
                      >
                        {testimonial.name.charAt(0)}
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
                          {testimonial.name}
                        </Typography>
                        <Rating
                          value={testimonial.rating}
                          readOnly
                          precision={0.5}
                          size="medium"
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: "#B85C38", // Burnt orange/rust
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Comment */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        mb: 2.5,
                        fontSize: { xs: "1.4rem", md: "1.4rem" },
                        lineHeight: 1.7,
                        fontStyle: "italic",
                      }}
                    >
                      "{testimonial.comment}"
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
                            color: "text.secondary",
                            fontWeight: 500,
                          }}
                        >
                          {testimonial.destination}
                        </Typography>
                      </Box>
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
                            color: "text.secondary",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: "0.8125rem", md: "0.875rem" },
                            color: "text.secondary",
                          }}
                        >
                          {testimonial.date}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
        </Container>
      </Card>
    </Box>
  );
}

