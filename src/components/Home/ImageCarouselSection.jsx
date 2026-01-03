import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Card,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function ImageCarouselSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  // Fetch gallery items (images and videos)
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch('/api/gallery/public?all=true');
        const data = await response.json();

        if (data.success && data.data.items.length > 0) {
          // Convert gallery items to media objects with type information
          const mediaItems = data.data.items.map(item => ({
            id: item.id,
            type: item.type,
            url: item.filePath.startsWith('http')
              ? item.filePath
              : `http://localhost:4000/${item.filePath.startsWith('/') ? item.filePath.slice(1) : item.filePath}`,
            altText: item.altText || item.title,
            title: item.title
          }));

          // Duplicate items to create a longer carousel (minimum 15 items)
          const duplicatedItems = [];
          while (duplicatedItems.length < 15) {
            duplicatedItems.push(...mediaItems);
          }
          setCarouselItems(duplicatedItems.slice(0, 15));
        } else {
          // Fallback to some default images if API fails or no items
          setCarouselItems([
            { id: 'fallback-1', type: 'image', url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop", altText: "Safari scene" },
            { id: 'fallback-2', type: 'image', url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", altText: "Wildlife" },
            { id: 'fallback-3', type: 'image', url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop", altText: "Nature" },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch gallery items:', error);
        // Fallback to default images
        setCarouselItems([
          { id: 'fallback-1', type: 'image', url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop", altText: "Safari scene" },
          { id: 'fallback-2', type: 'image', url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", altText: "Wildlife" },
          { id: 'fallback-3', type: 'image', url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop", altText: "Nature" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  useEffect(() => {
    // Only start the carousel if we have items
    if (carouselItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselItems.length;

        // Scroll to the next item
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
  }, [carouselItems]); // Depend on carouselItems to restart interval when items load

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
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(107, 78, 61, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
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
            {carouselItems.length > 0 ? carouselItems.map((item, index) => (
              <Box
                key={`${item.id}-${index}`}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "280px", sm: "320px", md: "400px" },
                  height: { xs: "200px", sm: "240px", md: "300px" },
                  borderRadius: { xs: 2, md: 3 },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {item.type === 'video' ? (
                  <Box
                    component="video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      // Fallback to image if video fails
                      e.target.style.display = 'none';
                      const fallbackImg = document.createElement('img');
                      fallbackImg.src = "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop";
                      fallbackImg.alt = item.altText || `Safari media ${index + 1}`;
                      fallbackImg.style.width = '100%';
                      fallbackImg.style.height = '100%';
                      fallbackImg.style.objectFit = 'cover';
                      e.target.parentNode.appendChild(fallbackImg);
                    }}
                  >
                    <source src={item.url} type="video/mp4" />
                    {/* Fallback image for browsers that don't support video */}
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop"
                      alt={item.altText || `Safari media ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={item.url}
                    alt={item.altText || `Safari image ${index + 1}`}
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
                )}
              </Box>
            )) : (
              // Loading/placeholder state
              Array.from({ length: 5 }).map((_, index) => (
                <Box
                  key={`placeholder-${index}`}
                  sx={{
                    flex: "0 0 auto",
                    width: { xs: "280px", sm: "320px", md: "400px" },
                    height: { xs: "200px", sm: "240px", md: "300px" },
                    borderRadius: { xs: 2, md: 3 },
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "rgba(107, 78, 61, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      border: "3px solid rgba(107, 78, 61, 0.3)",
                      borderTop: "3px solid rgba(107, 78, 61, 0.6)",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                </Box>
              ))
            )}
          </Box>
        </Box>
        </Container>
      </Card>
    </Box>
  );
}

