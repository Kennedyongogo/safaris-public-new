import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Container,
  Tooltip,
  Button,
  Fade,
  Slide,
} from "@mui/material";
import {
  CameraAlt,
  Terrain,
  Explore,
  ArrowForward,
  ContactSupport,
} from "@mui/icons-material";

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const images = [
    "/images/rhinoceros-1837164_1280.jpg",
    "/images/elephants-4275741_1280.jpg",
    "/images/lion-5751867_1280.jpg",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleBookSafari = () => {
    navigate("/plan");
  };

  const handleContactClick = () => {
    const section = document.getElementById("contact-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn("Contact section not found");
    }
  };

  return (
    <Box
      id="hero-section"
      sx={{
        position: "relative",
        height: { xs: "100vh", md: "100vh" },
        width: "100%",
        overflow: "hidden",
        marginTop: "-64px",
        backgroundColor: "#000", // prevent white flash during transitions
      }}
    >
      {/* Background Images */}
      {images.map((image, index) => (
        <Box
          key={image}
          component="img"
          src={image}
          alt="Akira Safaris hero"
          onError={() => console.warn("Hero image failed to load:", image)}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
            filter: "brightness(0.4) saturate(1.1)",
            opacity: currentImageIndex === index ? 1 : 0,
            zIndex: currentImageIndex === index ? 0 : -1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "opacity 1.5s ease-in-out",
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(33, 150, 243, 0.3) 0%, rgba(76, 175, 80, 0.2) 50%, rgba(255, 152, 0, 0.2) 100%)",
          zIndex: 1,
        }}
      />

      {/* Floating Particles Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "4px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "6px",
            height: "6px",
            background: "rgba(107, 78, 61, 0.8)", // Medium brown
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite reverse",
          },
        }}
      />

      {/* Content Overlay */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          zIndex: 3,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Fade in={isVisible} timeout={1000}>
          <Box
            sx={{
              maxWidth: "700px",
              animation: "slideInUp 1.2s ease-out",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3.5rem",
                  lg: "4rem",
                },
                fontWeight: 700,
                mb: 2,
                textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
                background: "linear-gradient(45deg, #E0D8C0 30%, #7B8D57 90%)", // Light beige to olive green
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}
            >
              Akira Safaris
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                textShadow: "3px 3px 6px rgba(0,0,0,0.35)",
                opacity: 0.97,
                fontWeight: 700,
                fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2rem" },
                color: "#6B7D47", // Richer olive to match title
                px: { xs: 0, sm: 0 }, // preserve padding feel if size grows
              }}
            >
              Discover the Wild Heart of Africa
            </Typography>

            {/* Enhanced Call-to-Action Button */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row" }, // stack on small, row on larger
                mb: { xs: 6, sm: 5, md: 4 },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForward />}
                onClick={handleBookSafari}
                sx={{
                  px: 2,
                  py: 0.75,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  background:
                    "linear-gradient(45deg, #B85C38 30%, #C97A5A 90%)", // Rust to light rust
                  boxShadow: "0 8px 32px rgba(184, 92, 56, 0.3)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "& .MuiButton-endIcon": {
                    marginLeft: 0.5,
                  },
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: "0 12px 40px rgba(184, 92, 56, 0.4)",
                    background:
                      "linear-gradient(45deg, #8B4225 30%, #B85C38 90%)", // Dark rust to rust
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
              >
                Book Your Safari
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ContactSupport />}
                onClick={handleContactClick}
                sx={{
                  px: 2,
                  py: 0.75,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  background:
                    "linear-gradient(45deg, #B85C38 30%, #C97A5A 90%)",
                  boxShadow: "0 8px 32px rgba(184, 92, 56, 0.3)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "& .MuiButton-endIcon": {
                    marginLeft: 0.5,
                  },
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: "0 12px 40px rgba(184, 92, 56, 0.4)",
                    background:
                      "linear-gradient(45deg, #8B4225 30%, #B85C38 90%)",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Box>
        </Fade>
      </Box>

      {/* Enhanced Feature Icons */}
      <Slide direction="up" in={isVisible} timeout={1500}>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 4,
            p: 2.5,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Tooltip title="Safari Tours" arrow>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "white",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                  "&:hover": {
                  transform: "translateY(-8px) scale(1.1)",
                  "& .icon": {
                    color: "#6B4E3D", // Medium brown
                    transform: "rotate(360deg)",
                  },
                },
              }}
            >
              <CameraAlt
                className="icon"
                sx={{ fontSize: 28, transition: "all 0.4s ease" }}
              />
              <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>
                Safari Tours
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Wildlife Viewing" arrow>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "white",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                  "&:hover": {
                  transform: "translateY(-8px) scale(1.1)",
                  "& .icon": {
                    color: "#6B7D47", // Olive green
                    transform: "rotate(360deg)",
                  },
                },
              }}
            >
              <Terrain
                className="icon"
                sx={{ fontSize: 28, transition: "all 0.4s ease" }}
              />
              <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>
                Wildlife Viewing
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Adventure Tours" arrow>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "white",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.1)",
                  "& .icon": {
                    color: "#ff9800",
                    transform: "rotate(360deg)",
                  },
                },
              }}
            >
              <Explore
                className="icon"
                sx={{ fontSize: 28, transition: "all 0.4s ease" }}
              />
              <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>
                Adventure Tours
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Slide>

      <style>
        {`
          @keyframes slideInUp {
            from { 
              opacity: 0;
              transform: translateY(60px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
              opacity: 0.6;
            }
            50% { 
              transform: translateY(-20px) rotate(180deg);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
}
