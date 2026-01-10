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

  // Detect when hero section is visible and notify header
  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.2;
          const scrollY = window.scrollY;
          const isAtTop = scrollY <= 20;
          
          // Dispatch custom event to notify header
          const event = new CustomEvent('heroVisibilityChange', {
            detail: {
              isVisible: isVisible && isAtTop,
              intersectionRatio: entry.intersectionRatio,
              scrollY: scrollY
            }
          });
          window.dispatchEvent(event);
          
          console.log('🎬 Hero Section Visibility:', {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            isVisible,
            scrollY,
            isAtTop,
            shouldBeTransparent: isVisible && isAtTop
          });
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0],
        rootMargin: '0px'
      }
    );

    observer.observe(heroSection);

    // Check initial state
    setTimeout(() => {
      const rect = heroSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      const isAtTop = window.scrollY <= 20;
      const event = new CustomEvent('heroVisibilityChange', {
        detail: {
          isVisible: isInView && isAtTop,
          intersectionRatio: isInView ? 1 : 0,
          scrollY: window.scrollY
        }
      });
      window.dispatchEvent(event);
      
      console.log('🎬 Initial Hero Check:', {
        rectTop: rect.top,
        rectBottom: rect.bottom,
        windowHeight: window.innerHeight,
        scrollY: window.scrollY,
        isInView,
        isAtTop,
        shouldBeTransparent: isInView && isAtTop
      });
    }, 200);

    return () => {
      observer.disconnect();
    };
  }, []);

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

            // Define country names in various formats for matching
            const countryVariations = {
              'Kenya': ['kenya', 'kenyan'],
              'Tanzania': ['tanzania', 'tanzanian'],
              'Uganda': ['uganda', 'ugandan'],
              'Rwanda': ['rwanda', 'rwandan']
            };

            result.data.forEach(destination => {
              // First, try exact match on title (case-insensitive)
              if (destination.title) {
                const title = destination.title.toLowerCase().trim();
                
                // Check for exact matches first (most reliable)
                Object.keys(countryVariations).forEach(country => {
                  if (title === country.toLowerCase()) {
                    mapping[country] = destination.id;
                  }
                });

                // Then check for partial matches if exact match not found
                Object.keys(countryVariations).forEach(country => {
                  if (!mapping[country]) {
                    countryVariations[country].forEach(variation => {
                      if (title.includes(variation)) {
                        mapping[country] = destination.id;
                      }
                    });
                  }
                });
              }

              // Also check slug field (most reliable for exact matching)
              if (destination.slug) {
                const slug = destination.slug.toLowerCase().trim();
                Object.keys(countryVariations).forEach(country => {
                  if (slug === country.toLowerCase() || slug.includes(country.toLowerCase())) {
                    if (!mapping[country]) {
                      mapping[country] = destination.id;
                    }
                  }
                });
              }
            });

            console.log('Country to Destination ID mapping:', mapping);
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
    } else {
      console.warn(`No destination found for country: ${country}`);
      // Fallback: navigate to destinations page or show a message
      // You could also navigate to a general destinations page
      navigate("/#mission-section"); // Scroll to destinations section
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
        backgroundImage: "url('/images/lion-5751867_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
            backgroundImage: "url('/images/lion-5751867_1280.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
          }}
        >
          {!loading && (
            <>
              <Box
                sx={{
                  mb: 3,
                  fontSize: "2.5rem",
                  color: "#E0D8C0",
                  opacity: 0.7,
                  zIndex: 2,
                  position: "relative",
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
                  zIndex: 2,
                  position: "relative",
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
                  zIndex: 2,
                  position: "relative",
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
                textTransform: "uppercase",
              }}
            >
              Endless Discovery
            </Typography>
            <Typography
              sx={{
                mb: 2,
                textShadow: "2px 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)",
                opacity: 0.95,
                fontWeight: 800,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                color: "#E8E0D1", // Light beige for better contrast
                px: { xs: 0, sm: 0 },
                letterSpacing: "0.05em",
                lineHeight: 1.6,
                textTransform: "uppercase",
              }}
            >
              east africa Explore africa FROM EVERY PERSPECTIVE.
            </Typography>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() => {
                const element = document.getElementById("mission-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  // Fallback: navigate to home and then scroll
                  navigate("/");
                  setTimeout(() => {
                    const el = document.getElementById("mission-section");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }, 100);
                }
              }}
              sx={{
                mt: 1,
                px: { xs: 3, sm: 4, md: 5 },
                py: { xs: 1.2, sm: 1.5, md: 1.8 },
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                borderRadius: "50px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#E0D8C0",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:focus": {
                  outline: "none",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                },
                "&:focus-visible": {
                  outline: "none",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                },
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.25)",
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                  borderColor: "rgba(184, 92, 56, 0.6)",
                },
              }}
            >
              explore east africa
            </Button>

          </Box>
        </Fade>
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
