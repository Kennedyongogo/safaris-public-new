import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function LetterFromFounders() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 0.5, sm: 0.75, md: 1 },
        px: 0,
        backgroundColor: "#f9f7f3", // Warm White background
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.5, sm: 0.5, md: 0.5 },
          borderRadius: { xs: 3, md: 4 },
          border: "1px solid rgba(139, 115, 85, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "visible",
          backgroundImage: "url('/images/elephants-4275741_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 0.5, sm: 0.5, md: 0.25 },
            pt: { xs: 0.5, sm: 0.75, md: 0.75 },
            pb: { xs: 0.5, sm: 0.75, md: 0.75 },
            overflow: "visible",
            width: "100%",
          }}
        >
        <Grid
          container
          spacing={{ xs: 1.5, md: 2 }}
          alignItems="flex-start"
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Letter Content */}
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{
              p: { xs: 2, sm: 2.5, md: 2 },
              overflow: "visible",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1, sm: 1.25, md: 1.5 },
                background: "#FAF8F3", // Warmer, more realistic paper color
                borderRadius: 2,
                position: "relative",
                boxShadow: `
                  0 2px 8px rgba(0, 0, 0, 0.1),
                  0 8px 24px rgba(0, 0, 0, 0.12),
                  inset 0 1px 0 rgba(255, 255, 255, 0.6),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                transform: { xs: "rotate(-2deg)", md: "rotate(-3deg)" },
                transition: "transform 0.3s ease",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "visible",
                "&:hover": {
                  transform: { xs: "rotate(-1deg)", md: "rotate(-2deg)" },
                  boxShadow: `
                    0 4px 12px rgba(0, 0, 0, 0.12),
                    0 12px 32px rgba(0, 0, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.6),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                  `,
                },
                // Realistic paper texture with multiple layers
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 1px,
                    rgba(0, 0, 0, 0.015) 1px,
                    rgba(0, 0, 0, 0.015) 2px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 1px,
                    rgba(0, 0, 0, 0.01) 1px,
                    rgba(0, 0, 0, 0.01) 2px
                  ),
                  radial-gradient(circle at 20% 30%, rgba(250, 248, 243, 0.8) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(245, 242, 235, 0.6) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(255, 253, 248, 0.4) 0%, rgba(250, 247, 240, 0.4) 100%)
                `,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(circle at 30% 40%, rgba(200, 180, 150, 0.08) 0%, transparent 40%),
                    radial-gradient(circle at 70% 60%, rgba(220, 200, 170, 0.06) 0%, transparent 40%),
                    linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 20%, transparent 80%, rgba(240, 235, 225, 0.1) 100%)
                  `,
                  pointerEvents: "none",
                  borderRadius: 2,
                  opacity: 0.7,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(0, 0, 0, 0.008) 10px,
                      rgba(0, 0, 0, 0.008) 11px
                    )
                  `,
                  pointerEvents: "none",
                  borderRadius: 2,
                  opacity: 0.5,
                },
                // Subtle edge aging effect
                border: "1px solid rgba(200, 180, 150, 0.15)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#1a1a1a",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  position: "relative",
                  zIndex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.05), 0 0.5px 1px rgba(0, 0, 0, 0.03)",
                }}
              >
                A Letter from Our Founders
              </Typography>

              <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    color: "#1a1a1a",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.6,
                    fontWeight: 500,
                    position: "relative",
                    zIndex: 1,
                    textShadow: "0 0.5px 1px rgba(0, 0, 0, 0.03)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Dear Traveler,
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 1.25,
                    color: "#1a1a1a",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.6,
                    fontWeight: 400,
                    position: "relative",
                    zIndex: 1,
                    textShadow: "0 0.5px 1px rgba(0, 0, 0, 0.03)",
                    letterSpacing: "0.01em",
                  }}
                >
                  You might be ready for something a little different. Something real. The kind of journey that goes beyond ticking boxes on a safari checklist. For more than 16 years, we've opened our home to travelers from all over the world, and along the way we learned something simple but important. People aren't just looking for sights. They're looking for trust, insight, and a sense of belonging.
                </Typography>

                {/* Image inside letter - only visible on small screens */}
                <Box
                  sx={{
                    display: { xs: "block", md: "none" },
                    position: "relative",
                    width: "100%",
                    height: { xs: "150px", sm: "180px" },
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    mb: 1.25,
                    mx: "auto",
                  }}
                >
                  <Box
                    component="img"
                    src="/FB_IMG_1768133643797.jpg"
                    alt="David & Hellene - Founders of Akira Safaris"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = "flex";
                      }
                    }}
                  />
                  <Box
                    sx={{
                      display: "none",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, rgba(200, 169, 126, 0.1) 0%, rgba(139, 115, 85, 0.1) 100%)",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      color: "#8b7355",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#8b7355",
                      }}
                    >
                      David & Hellene
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#8b7355",
                        fontStyle: "italic",
                      }}
                    >
                      Founders of Akira Safaris
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 1.25,
                    color: "#1a1a1a",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.6,
                    fontWeight: 400,
                    position: "relative",
                    zIndex: 1,
                    textShadow: "0 0.5px 1px rgba(0, 0, 0, 0.03)",
                    letterSpacing: "0.01em",
                  }}
                >
                  We are David and Hellene, a family who co-founded Akira Safaris to extend that same spirit beyond our home. We design safaris that feel personal and seamless, from your first inquiry to the moment you return home. We go beyond guidebooks to uncover hidden gems, from vibrant local markets to quiet, off-the-beaten-path landscapes. You experience East Africa through the eyes of a friend, not as a tourist.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 1.5,
                    color: "#1a1a1a",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.6,
                    fontWeight: 500,
                    fontStyle: "italic",
                    position: "relative",
                    zIndex: 1,
                    textShadow: "0 0.5px 1px rgba(0, 0, 0, 0.03)",
                    letterSpacing: "0.01em",
                  }}
                >
                  The wild is calling. Are you in?
                </Typography>

                {/* Signatures */}
                <Box
                  sx={{
                    mt: 1.5,
                    pt: 1.25,
                    borderTop: "1px solid rgba(139, 115, 85, 0.2)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: { xs: 1.5, sm: 2, md: 4 },
                      alignItems: "flex-end",
                      mb: 0,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ minWidth: { xs: "80px", md: "auto" } }}>
                      <Typography
                        sx={{
                          fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                          fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.75rem" },
                          color: "#8b7355",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        David
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#8b7355",
                          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                          fontWeight: 500,
                        }}
                      >
                        David
                      </Typography>
                    </Box>
                    <Box sx={{ minWidth: { xs: "80px", md: "auto" } }}>
                      <Typography
                        sx={{
                          fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                          fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.75rem" },
                          color: "#8b7355",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        Hellene
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#8b7355",
                          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                          fontWeight: 500,
                        }}
                      >
                        Hellene A.
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: { xs: 2, md: 1 },
                      color: "#8b7355",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    David & Hellene
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Image Frame - Right Side - only visible on large screens */}
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{
              display: { xs: "none", md: "block" },
              p: { xs: 2, sm: 2.5, md: 2 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "500px",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Box
                component="img"
                src="/FB_IMG_1768133643797.jpg"
                alt="David & Hellene - Founders of Akira Safaris"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = "flex";
                  }
                }}
              />
              <Box
                sx={{
                  display: "none",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, rgba(200, 169, 126, 0.1) 0%, rgba(139, 115, 85, 0.1) 100%)",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  color: "#8b7355",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#8b7355",
                  }}
                >
                  David & Hellene
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#8b7355",
                    fontStyle: "italic",
                  }}
                >
                  Founders of Akira Safaris
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        </Container>
      </Card>
    </Box>
  );
}

