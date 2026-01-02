import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Fade } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [countryToIdMap, setCountryToIdMap] = useState({});
  const images = [
    "/images/rhinoceros-1837164_1280.jpg",
    "/images/elephants-4275741_1280.jpg",
    "/images/lion-5751867_1280.jpg",
  ];

  // Preload all images for smooth transitions
  useEffect(() => {
    images.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch destinations and create country mapping
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations/public");
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Create mapping from button labels to destination IDs
            const mapping = {};

            result.data.forEach(destination => {
              // Map based on title or location
              if (destination.title) {
                // If title contains country name, map it
                const title = destination.title.toLowerCase();
                if (title.includes('kenya')) mapping['Kenya'] = destination.id;
                else if (title.includes('uganda')) mapping['Uganda'] = destination.id;
                else if (title.includes('tanzania')) mapping['Tanzania'] = destination.id;
                else if (title.includes('rwanda')) mapping['Rwanda'] = destination.id;
              }

              // Also try location field as fallback
              if (destination.location) {
                const location = destination.location.trim();
                if (location === 'East Africa' && !mapping['Kenya']) {
                  mapping['Kenya'] = destination.id; // Kenya is in East Africa
                }
              }
            });

            setCountryToIdMap(mapping);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch destinations for hero mapping:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleBookSafari = () => {
    navigate("/plan");
  };

  const handleCountryClick = (country) => {
    const destinationId = countryToIdMap[country];
    if (destinationId) {
      navigate(`/destination/${destinationId}`, { state: { from: "hero" } });
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
        marginTop: "-80px",
        backgroundColor: "#E0D8C0", // beige background covering full screen
      }}
    >
      {/* Background Images */}
      {images.map((image, index) => {
        const isActive = currentImageIndex === index;
        
        return (
          <Box
            key={`${image}-${index}`}
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
              filter: "brightness(0.7) saturate(1.1) contrast(1.1)",
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 1 : 0,
              top: 0,
              left: 0,
              transform: isActive
                ? "scale(1)"
                : "scale(1.01)",
              transition: "opacity 2.5s ease-in-out, transform 2.5s ease-in-out",
              willChange: "opacity, transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        );
      })}


      {/* Enhanced Floating Particles Animation */}
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
            background: "rgba(224, 216, 192, 0.7)", // Light beige
            borderRadius: "50%",
            boxShadow: "0 0 8px rgba(224, 216, 192, 0.5)",
            animation: "float 6s ease-in-out infinite",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "6px",
            height: "6px",
            background: "rgba(184, 92, 56, 0.6)", // Rust
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(184, 92, 56, 0.4)",
            animation: "float 8s ease-in-out infinite reverse",
          },
        }}
      />
      
      {/* Additional floating particles */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${20 + i * 25}%`,
            left: `${15 + i * 20}%`,
            width: "3px",
            height: "3px",
            background: "rgba(107, 125, 71, 0.5)", // Olive green
            borderRadius: "50%",
            boxShadow: "0 0 6px rgba(107, 125, 71, 0.3)",
            animation: `float ${7 + i * 2}s ease-in-out infinite ${i * 0.5}s`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Content Overlay */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          zIndex: 3,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "1400px",
          margin: "0 auto",
          textAlign: "center",
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
                  xs: "2.2rem",
                  sm: "2.8rem",
                  md: "3.8rem",
                  lg: "4.5rem",
                },
                fontWeight: 800,
                mb: 0.5,
                textShadow: "4px 4px 12px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.3)",
                background: "linear-gradient(135deg, #E0D8C0 0%, #F5F1E8 30%, #7B8D57 70%, #6B7D47 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
                letterSpacing: { xs: "0.02em", md: "0.03em" },
              }}
            >
              Akira Safaris
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                textShadow: "2px 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)",
                opacity: 0.98,
                fontWeight: 600,
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
                color: "#E8E0D1", // Light beige for better contrast
                px: { xs: 0, sm: 0 },
                letterSpacing: "0.02em",
              }}
            >
              Endless Discovery
            </Typography>
            

            {/* Call-to-action row with destinations */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1.25, sm: 2, md: 2.25 },
                flexWrap: { xs: "nowrap", lg: "nowrap" },
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 6, sm: 5, md: 4 },
              }}
            >

              {["Kenya", "Uganda", "Tanzania", "Rwanda"].map((country) => (
                <Box
                  key={country}
                  onClick={() => handleCountryClick(country)}
                  sx={{
                    px: 2,
                    py: 0.75,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: "50px",
                    whiteSpace: "nowrap",
                    width: { xs: "90%", sm: "auto" },
                    maxWidth: { xs: 320, sm: "none" },
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                    backdropFilter: "blur(6px)",
                    color: "#E0D8C0",
                    textAlign: "center",
                    letterSpacing: 0.3,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-3px) scale(1.05)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                      borderColor: "rgba(184, 92, 56, 0.6)",
                    },
                  }}
                >
                  {country}
                </Box>
              ))}
            </Box>

          </Box>
        </Fade>
      </Box>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "20px", md: "30px" },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          color: "#E0D8C0",
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
          }}
        >
          Explore
        </Typography>
        <Box
          sx={{
            width: "2px",
            height: "30px",
            background: "linear-gradient(to bottom, rgba(224, 216, 192, 0.8), rgba(224, 216, 192, 0.2))",
            borderRadius: "2px",
          }}
        />
      </Box>

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
          
          @keyframes bounce {
            0%, 100% { 
              transform: translateX(-50%) translateY(0);
            }
            50% { 
              transform: translateX(-50%) translateY(-10px);
            }
          }
        `}
      </style>
    </Box>
  );
}
