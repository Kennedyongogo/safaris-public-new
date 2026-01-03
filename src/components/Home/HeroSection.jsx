import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Fade } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [countryToIdMap, setCountryToIdMap] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStartTime] = useState(Date.now());
  const [minLoadingTime] = useState(800); // Minimum 800ms to prevent flashing

  // Fetch videos from gallery
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Fetching videos from gallery API...');
        const response = await fetch('/api/gallery/public?all=true&type=video');
        const data = await response.json();
        console.log('Gallery API response:', data);

        if (data.success && data.data.items && data.data.items.length > 0) {
          console.log(`Found ${data.data.items.length} videos in gallery`);

          // Convert gallery items to video objects
          const videoItems = data.data.items.map(item => ({
            id: item.id,
            url: item.filePath.startsWith('http')
              ? item.filePath
              : `/${item.filePath.startsWith('/') ? item.filePath.slice(1) : item.filePath}`,
            title: item.title,
            altText: item.altText
          }));

          console.log('Video URLs:', videoItems.map(v => v.url));

          // Ensure we have at least 3 videos for rotation
          let finalVideos = [...videoItems];
          while (finalVideos.length < 3) {
            finalVideos = [...finalVideos, ...videoItems];
          }

          setVideos(finalVideos.slice(0, 3));
        } else {
          console.log('No videos found in gallery, using fallback');
          // Fallback to default videos if API fails or no videos available
          const fallbackVideos = [
            { id: 'fallback-1', url: '/videos/safari-fallback-1.mp4', title: 'Safari Adventure' },
            { id: 'fallback-2', url: '/videos/safari-fallback-2.mp4', title: 'Wildlife Journey' },
            { id: 'fallback-3', url: '/videos/safari-fallback-3.mp4', title: 'Nature Discovery' },
          ];
          setVideos(fallbackVideos);
        }
      } catch (error) {
        console.error('Failed to fetch hero videos:', error);
        // Fallback videos
        const fallbackVideos = [
          { id: 'fallback-1', url: '/videos/safari-fallback-1.mp4', title: 'Safari Adventure' },
          { id: 'fallback-2', url: '/videos/safari-fallback-2.mp4', title: 'Wildlife Journey' },
          { id: 'fallback-3', url: '/videos/safari-fallback-3.mp4', title: 'Nature Discovery' },
        ];
        setVideos(fallbackVideos);
      } finally {
        // Smart loading: ensure minimum display time but don't delay if loading took longer
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    // Only start rotation if we have videos
    if (videos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000); // Change video every 8 seconds (longer for videos)

    return () => clearInterval(interval);
  }, [videos]);

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
        background: "linear-gradient(135deg, #2D4A3E 0%, #4A6741 25%, #8B7355 50%, #B85C38 75%, #6B4E3D 100%)", // Rich safari gradient
      }}
    >
      {/* Loading State with Safari Theme */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 4,
            background: "linear-gradient(135deg, #2D4A3E 0%, #4A6741 25%, #8B7355 50%, #B85C38 75%, #6B4E3D 100%)",
          }}
        >
          {/* Safari Loading Animation */}
          <Box
            sx={{
              position: "relative",
              width: "120px",
              height: "120px",
              mb: 4,
            }}
          >
            {/* Central sun/compass */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "20px",
                height: "20px",
                background: "radial-gradient(circle, #FFD700 0%, #FFA500 100%)",
                borderRadius: "50%",
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />

            {/* Orbiting elements representing safari journey */}
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "8px",
                  height: "8px",
                  background: i % 2 === 0 ? "#8B7355" : "#4A6741",
                  borderRadius: "50%",
                  transformOrigin: "-40px 0px",
                  animation: `orbit ${3 + i * 0.5}s linear infinite`,
                  animationDelay: `${i * 0.3}s`,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    bottom: "-2px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "50%",
                  },
                }}
              />
            ))}
          </Box>

        </Box>
      )}

      {/* Background Videos */}
      {videos.length > 0 ? videos.map((video, index) => {
        const isActive = currentVideoIndex === index;

        return (
          <Box
            key={`${video.id}-${index}`}
            component="video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src={video.url}
            onError={(e) => {
              console.warn("Hero video failed to load:", video.url);
              // If video fails, try to play it after a delay for browsers that block autoplay
              setTimeout(() => {
                if (e.target && e.target.paused) {
                  e.target.play().catch(err => console.warn("Video play failed:", err));
                }
              }, 1000);
            }}
            onLoadedData={() => console.log("Video loaded successfully:", video.url)}
            onPlay={() => console.log("Video started playing:", video.url)}
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
      }) : (
        // Enhanced loading/placeholder state
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: loading
              ? "linear-gradient(135deg, #6B4E3D 0%, #B85C38 100%)"
              : "linear-gradient(135deg, #2D4A3E 0%, #4A6741 25%, #8B7355 50%, #B85C38 75%, #6B4E3D 100%)",
            opacity: 0.95,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
          }}
        >
          {loading ? (
            <>
              {/* Animated safari icon */}
              <Box
                sx={{
                  mb: 3,
                  fontSize: "3rem",
                  animation: "bounce 2s ease-in-out infinite",
                  color: "#E0D8C0",
                  textShadow: "0 0 20px rgba(184, 92, 56, 0.5)",
                }}
              >
                🦁
              </Box>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                  sx={{
                    color: "#E0D8C0",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                    mb: 1,
                    letterSpacing: "0.02em",
                  }}
                >
                  Akira Safaris
                </Typography>
                <Typography
                  sx={{
                    color: "#F5F1E8",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
                    opacity: 0.9,
                  }}
                >
                  Preparing Your Safari Adventure
                </Typography>
              </Box>

              {/* Animated progress dots */}
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                {[0, 1, 2].map((index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#E0D8C0",
                      animation: `pulse 1.5s ease-in-out infinite ${index * 0.2}s`,
                      boxShadow: "0 0 10px rgba(224, 216, 192, 0.5)",
                    }}
                  />
                ))}
              </Box>

              <Typography
                sx={{
                  color: "#E0D8C0",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  textAlign: "center",
                  opacity: 0.8,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                Loading wildlife experiences...
              </Typography>
            </>
          ) : (
            <>
              <Box
                sx={{
                  mb: 3,
                  fontSize: "2.5rem",
                  color: "#E0D8C0",
                  opacity: 0.7,
                }}
              >
                🎬
              </Box>

              <Typography
                sx={{
                  color: "#E0D8C0",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  textAlign: "center",
                  textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
                  mb: 2,
                }}
              >
                Safari Videos Coming Soon
              </Typography>

              <Typography
                sx={{
                  color: "#F5F1E8",
                  fontSize: "1rem",
                  fontWeight: 400,
                  textAlign: "center",
                  opacity: 0.8,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                  maxWidth: "400px",
                  lineHeight: 1.6,
                }}
              >
                We're curating the most breathtaking safari moments.
                Videos will appear here once uploaded to showcase your African adventures.
              </Typography>
            </>
          )}
        </Box>
      )}


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

          @keyframes pulse {
            0%, 100% {
              opacity: 0.4;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(40px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(40px) rotate(-360deg);
            }
          }

          @keyframes fadeInOut {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
}
