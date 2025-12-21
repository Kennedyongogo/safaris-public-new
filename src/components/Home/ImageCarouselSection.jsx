import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Safari and wildlife images
const carouselImages = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
];

export default function ImageCarouselSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselImages.length;
        
        // Scroll to the next image
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const firstChild = container.firstElementChild;
          
          if (firstChild) {
            const imageWidth = firstChild.offsetWidth;
            const gap = parseInt(window.getComputedStyle(container).gap) || 0;
            const scrollAmount = nextIndex * (imageWidth + gap);
            
            container.scrollTo({
              left: scrollAmount,
              behavior: "smooth",
            });
          }
        }
        
        return nextIndex;
      });
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 0.5, sm: 0.75, md: 1 },
        position: "relative",
        zIndex: 1,
        background: "#FFFFFF",
      }}
    >
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
            pt: { xs: 0.5, sm: 0.75, md: 1 },
            pb: { xs: 1.5, sm: 2, md: 2.5 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
          }}
        >
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              overflowY: "hidden",
              gap: { xs: 1.5, sm: 2, md: 2.5 },
              scrollBehavior: "smooth",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(107, 78, 61, 0.3) transparent", // Medium brown
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(107, 78, 61, 0.1)",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(107, 78, 61, 0.3)", // Medium brown
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "rgba(107, 78, 61, 0.5)",
                },
              },
            }}
          >
            {carouselImages.map((imageUrl, index) => (
              <Box
                key={index}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "280px", sm: "320px", md: "400px" },
                  height: { xs: "200px", sm: "240px", md: "300px" },
                  borderRadius: { xs: 2, md: 3 },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={imageUrl}
                  alt={`Safari image ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop";
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

