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
        backgroundColor: "#F5F1E8", // Solid beige background to prevent rendering flicker
        position: "relative",
        overflow: "hidden",
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
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 0.75, sm: 0.75, md: 0.75 },
            pt: { xs: 0.75, sm: 1, md: 1 },
            pb: { xs: 0.75, sm: 1, md: 1 },
          }}
        >
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          justifyContent="center"
        >
          {/* Letter Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2, md: 2.5 },
                background: "#F5F5F5",
                borderRadius: 2,
                position: "relative",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                transform: { xs: "rotate(-2deg)", md: "rotate(-3deg)" },
                transition: "transform 0.3s ease",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "visible",
                "&:hover": {
                  transform: { xs: "rotate(-1deg)", md: "rotate(-2deg)" },
                },
                // Paper texture effect
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 0, 0, 0.02) 2px,
                    rgba(0, 0, 0, 0.02) 4px
                  )
                `,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "radial-gradient(circle at 50% 50%, rgba(200, 200, 200, 0.2) 0%, transparent 70%)",
                  pointerEvents: "none",
                  borderRadius: 2,
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#3D2817",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  position: "relative",
                  zIndex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                A Letter from Our Founders
              </Typography>

              <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1.5,
                    color: "#3D2817",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    lineHeight: 1.8,
                    fontWeight: 500,
                  }}
                >
                  Dear Traveler,
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    color: "#3D2817",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    lineHeight: 1.8,
                    fontWeight: 400,
                  }}
                >
                  You seem ready for something different—something real that goes beyond the average safari experience. For more than 16 years, we've opened our home to travelers from around the world, and that experience taught us something important: people aren't just looking for a checklist of sights. They're looking for insight, trust, and a sense of belonging.
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: "200px", sm: "250px", md: "300px" },
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    mb: 2,
                    mx: "auto",
                    maxWidth: { xs: "100%", md: "400px" },
                  }}
                >
                  <Box
                    component="img"
                    src="/FB_IMG_1768133643797.jpg"
                    alt="David, Hellene & Malyne - Founders of Akira Safaris"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
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
                        "linear-gradient(135deg, rgba(184, 92, 56, 0.1) 0%, rgba(107, 78, 61, 0.1) 100%)",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      color: "#6B4E3D",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#6B4E3D",
                      }}
                    >
                      David, Hellene & Malyne
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#6B4E3D",
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
                    mb: 2,
                    color: "#3D2817",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    lineHeight: 1.8,
                    fontWeight: 400,
                  }}
                >
                  We are David, Hellene, and Malyne—a family that co-founded Akira Safaris to extend our philosophy beyond our home. We design safaris that feel personal and seamless, from your first inquiry to the moment you return home. We go beyond guidebooks to reveal hidden gems—from vibrant local markets to quiet, off-the-beaten-path landscapes. You experience East Africa through the eyes of a friend, not a tourist.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: "#3D2817",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    lineHeight: 1.8,
                    fontWeight: 500,
                    fontStyle: "italic",
                  }}
                >
                  The wild is calling. Are you in?
                </Typography>

                {/* Signatures */}
                <Box
                  sx={{
                    mt: 2.5,
                    pt: 2,
                    borderTop: "1px solid rgba(107, 78, 61, 0.2)",
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
                    }}
                  >
                    <Box sx={{ flex: { xs: "1 1 auto", md: "1 1 auto" }, minWidth: { xs: "80px", md: "auto" } }}>
                      <Typography
                        sx={{
                          fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                          fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.75rem" },
                          color: "#6B4E3D",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        David
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B4E3D",
                          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                          fontWeight: 500,
                        }}
                      >
                        David
                      </Typography>
                    </Box>
                    <Box sx={{ flex: { xs: "1 1 auto", md: "1 1 auto" }, minWidth: { xs: "80px", md: "auto" } }}>
                      <Typography
                        sx={{
                          fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                          fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.75rem" },
                          color: "#6B4E3D",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        Hellene
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B4E3D",
                          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                          fontWeight: 500,
                        }}
                      >
                        Hellene A.
                      </Typography>
                    </Box>
                    <Box sx={{ flex: { xs: "1 1 auto", md: "1 1 auto" }, minWidth: { xs: "80px", md: "auto" } }}>
                      <Typography
                        sx={{
                          fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                          fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.75rem" },
                          color: "#6B4E3D",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        Malyne
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B4E3D",
                          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                          fontWeight: 500,
                        }}
                      >
                        Malyne Abigael
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: { xs: 2, md: 1 },
                      color: "#6B4E3D",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 600,
                      textAlign: { xs: "left", md: "center" },
                    }}
                  >
                    David, Hellene & Malyne
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        </Container>
      </Card>
    </Box>
  );
}

