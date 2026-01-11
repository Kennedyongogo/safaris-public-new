import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";

export default function Team() {
  const navigate = useNavigate();
  const location = useLocation();

  // Typewriter animation state
  const [displayText, setDisplayText] = useState("A");
  const fullText = "Akira Safaris";
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(1); // Start at 1 since we begin with "A"
  const [highlightId, setHighlightId] = useState(null);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100; // Faster when deleting
    const pauseTime = isDeleting ? 500 : 2000; // Pause before deleting, shorter pause before typing

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < fullText.length) {
        // Typing
        setDisplayText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === fullText.length) {
        // Finished typing, wait then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex > 1) {
        // Deleting down to "A" (stop at index 1, which is just "A")
        setDisplayText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 1) {
        // Finished deleting to "A", wait then start typing again
        setIsDeleting(false);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, fullText]);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 200px)",
        py: { xs: 0.75, sm: 0.75, md: 0.75 },
        fontSize: "1.3rem",
        "& .MuiTypography-root": { fontSize: "1.3rem" },
        "& .MuiButton-root": { fontSize: "1.3rem" },
        background:
          "linear-gradient(135deg, rgba(249, 247, 243, 0.9) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(249, 247, 243, 0.9) 100%)", // Warm White tones
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 1.5, sm: 1.5, md: 1.5 }, mt: 0.75, mb: 0.75 }}
      >
        <Paper
          elevation={3}
          sx={{
            pt: { xs: 0.75, sm: 1, md: 1.25 },
            pb: { xs: 1.5, sm: 2, md: 2.5 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "#FFFFFF",
            border: "1px solid rgba(139, 115, 85, 0.2)", // Secondary Brown border
          }}
        >
          {/* Company Profile Section */}
          <Box
            sx={{
              p: { xs: 1, sm: 1.25, md: 1.5 },
            }}
          >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 0.25,
                  color: "#1a1a1a",
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  textAlign: "center",
                  minHeight: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {displayText}
                {displayText.length > 0 && (
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: "2px",
                      height: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      backgroundColor: "#1a1a1a",
                      marginLeft: "2px",
                      animation: "blink 1s infinite",
                      "@keyframes blink": {
                        "0%, 50%": { opacity: 1 },
                        "51%, 100%": { opacity: 0 },
                      },
                    }}
                  />
                )}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 1.5,
                  color: "text.primary",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  lineHeight: 1.6,
                  textAlign: "left",
                }}
              >
                Welcome to Akira Safaris, your gateway to authentic adventure in East Africa. We are a family-run company built on a simple belief: the most memorable journeys are shaped through genuine human connection and deep respect for local cultures and wild places.
              </Typography>

              {/* Our Story Section */}
              <Box 
                sx={{ 
                  mb: 1.5,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 2, md: 4 },
                  alignItems: { xs: "flex-start", md: "flex-start" },
                  justifyContent: { md: "space-between" },
                }}
              >
                <Box
                  sx={{
                    flex: { xs: "1 1 100%", md: "0 0 auto" },
                    display: { xs: "block", md: "block" },
                    width: { xs: "100%", md: "250px" },
                    minWidth: { xs: "auto", md: "250px" },
                    maxWidth: { xs: "100%", md: "250px" },
                    mt: { xs: 0, md: -2 },
                    alignSelf: { xs: "center", md: "flex-start" },
                    flexShrink: 0,
                    ml: { xs: 0, md: "auto" },
                    order: { xs: -1, md: 1 },
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 2,
                      background: "linear-gradient(135deg, rgba(200, 169, 126, 0.15) 0%, rgba(139, 115, 85, 0.1) 100%)",
                      border: "2px solid rgba(200, 169, 126, 0.3)",
                      borderRadius: 3,
                      transform: { xs: "rotate(2deg)", md: "rotate(5deg)" },
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: { xs: "rotate(1deg) scale(1.02)", md: "rotate(3deg) scale(1.02)" },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="/FB_IMG_1767444543346.jpg"
                      alt="Akira Safaris"
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 2,
                        mb: 1.5,
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      onClick={() => navigate("/staff")}
                      size="small"
                      sx={{
                        mt: 1,
                        backgroundColor: "#c8a97e",
                        color: "#fff",
                        borderRadius: 2,
                        px: 1.5,
                        py: 0.5,
                        fontSize: { xs: "0.75rem", md: "0.75rem" },
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                        "&:hover": {
                          backgroundColor: "#8b7355",
                          boxShadow: "0 4px 12px rgba(200, 169, 126, 0.4)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                        "&:focus": {
                          outline: "none",
                          boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                        },
                        "&:focus-visible": {
                          outline: "none",
                          boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                        },
                        "&:active": {
                          outline: "none",
                          boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                        },
                      }}
                    >
                      Meet Our Team
                    </Button>
                  </Paper>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    lineHeight: 1.6,
                    textAlign: "left",
                    flex: { xs: "1 1 100%", md: "0 1 auto" },
                    maxWidth: { md: "calc(100% - 280px)" },
                    pr: { md: 0 },
                    order: { xs: 1, md: 0 },
                  }}
                >
                  Our story is rooted in a lifelong passion for sharing the true spirit of Kenya. For more than 16 years, we have opened our home to travelers from around the world. That experience taught us something important. People are not just looking for a checklist of sights. They are looking for insight, trust, and a sense of belonging. Akira Safaris was founded to extend that philosophy beyond our home, with family at the center of everything we do.
                </Typography>
              </Box>

              {/* Meet Our Family Section */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 0.75,
                    color: "#c8a97e",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                    textAlign: "center",
                  }}
                >
                  Meet Our Family
                </Typography>
                <Box 
                  sx={{ 
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 2, md: 3 },
                    alignItems: { xs: "flex-start", md: "flex-start" },
                  }}
                >
                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", md: "0 0 auto" },
                      display: { xs: "block", md: "block" },
                      width: { xs: "100%", md: "250px" },
                      minWidth: { xs: "auto", md: "200px" },
                      maxWidth: { xs: "100%", md: "250px" },
                      alignSelf: { xs: "center", md: "flex-start" },
                      order: { xs: -1, md: 0 },
                    }}
                  >
                    <Paper
                      elevation={4}
                      sx={{
                        p: 2,
                        background: "linear-gradient(135deg, rgba(139, 115, 85, 0.15) 0%, rgba(200, 169, 126, 0.1) 100%)",
                        border: "2px solid rgba(139, 115, 85, 0.3)",
                        borderRadius: 3,
                        transform: { xs: "rotate(-2deg)", md: "rotate(-5deg)" },
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: { xs: "rotate(-1deg) scale(1.02)", md: "rotate(-3deg) scale(1.02)" },
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src="/FB_IMG_1768133663752.jpg"
                        alt="Akira Safaris Team"
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 2,
                          mb: 1.5,
                          objectFit: "cover",
                        }}
                      />
                      <Button
                        onClick={() => navigate("/staff")}
                        size="small"
                        sx={{
                          mt: 1,
                          backgroundColor: "#c8a97e",
                          color: "#fff",
                          borderRadius: 2,
                          px: 1.5,
                          py: 0.5,
                          fontSize: { md: "0.75rem" },
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                          "&:hover": {
                            backgroundColor: "#8b7355",
                            boxShadow: "0 4px 12px rgba(200, 169, 126, 0.4)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                          "&:focus": {
                            outline: "none",
                            boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                          },
                          "&:focus-visible": {
                            outline: "none",
                            boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                          },
                          "&:active": {
                            outline: "none",
                            boxShadow: "0 2px 8px rgba(200, 169, 126, 0.3)",
                          },
                        }}
                      >
                        Meet Our Team
                      </Button>
                    </Paper>
                  </Box>
                  <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 60%" }, order: { xs: 1, md: 0 } }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: "text.primary",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        lineHeight: 1.6,
                        textAlign: "left",
                      }}
                    >
                      Akira Safaris is proudly co-founded and operated by David, his wife Hellene A., and their daughter Malyne Abigael. We are not just running a business. We are sharing our East Africa.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.primary",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        lineHeight: 1.6,
                        textAlign: "left",
                      }}
                    >
                      David brings vision and deep local understanding. Hellene ensures warmth, comfort, and care in every detail. Malyne adds a modern, globally connected perspective. Together, we design safaris that feel personal, thoughtful, and seamless, from your first inquiry to the moment you return home.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Our Commitment to You Section */}
              <Box sx={{ mb: 0.75 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 0.75,
                    color: "#c8a97e",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                    textAlign: "center",
                  }}
                >
                  Our Commitment to You
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 2, md: 3 },
                    alignItems: { xs: "flex-start", md: "flex-start" },
                  }}
                >
                  <Box
                    component="ul"
                    sx={{
                      textAlign: "left",
                      mb: 0,
                      listStyle: "none",
                      pl: 0,
                      pr: 0,
                      ml: 0,
                      mr: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: { xs: "1 1 100%", md: "1 1 60%" },
                      order: { xs: 1, md: 0 },
                    }}
                  >
                    <Typography
                      component="li"
                      variant="body1"
                      sx={{
                        mb: 0.75,
                        color: "text.primary",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        lineHeight: 1.6,
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        "&::before": {
                          content: '"•"',
                          color: "#c8a97e",
                          fontWeight: "bold",
                          display: "inline-block",
                          width: "1em",
                          marginRight: "0.5em",
                        },
                      }}
                    >
                      <strong>Tailor-Made Itineraries</strong>
                      <br />
                      We design private or small-group journeys across Kenya, Tanzania, Uganda, and Rwanda, shaped around your interests, pace, and travel style.
                    </Typography>
                    <Typography
                      component="li"
                      variant="body1"
                      sx={{
                        mb: 0.75,
                        color: "text.primary",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        lineHeight: 1.6,
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        "&::before": {
                          content: '"•"',
                          color: "#c8a97e",
                          fontWeight: "bold",
                          display: "inline-block",
                          width: "1em",
                          marginRight: "0.5em",
                        },
                      }}
                    >
                      <strong>Access & Authenticity</strong>
                      <br />
                      We go beyond the guidebooks to reveal hidden gems, from vibrant local markets to quiet, off-the-beaten-path landscapes. You experience East Africa through the eyes of a friend, not a tourist.
                    </Typography>
                    <Typography
                      component="li"
                      variant="body1"
                      sx={{
                        color: "text.primary",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        lineHeight: 1.6,
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        "&::before": {
                          content: '"•"',
                          color: "#c8a97e",
                          fontWeight: "bold",
                          display: "inline-block",
                          width: "1em",
                          marginRight: "0.5em",
                        },
                      }}
                    >
                      <strong>Seamless Planning</strong>
                      <br />
                      From honest advice to on-the-ground support, we guide you every step of the way so you can travel with confidence and ease.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", md: "0 0 auto" },
                      display: { xs: "block", md: "block" },
                      width: { xs: "100%", md: "250px" },
                      minWidth: { xs: "auto", md: "200px" },
                      maxWidth: { xs: "100%", md: "250px" },
                      alignSelf: { xs: "center", md: "flex-start" },
                      order: { xs: -1, md: 1 },
                    }}
                  >
                    <Paper
                      elevation={4}
                      sx={{
                        p: 2,
                        background: "linear-gradient(135deg, rgba(139, 115, 85, 0.15) 0%, rgba(200, 169, 126, 0.1) 100%)",
                        border: "2px solid rgba(139, 115, 85, 0.3)",
                        borderRadius: 3,
                        transform: { xs: "rotate(2deg)", md: "rotate(5deg)" },
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: { xs: "rotate(1deg) scale(1.02)", md: "rotate(3deg) scale(1.02)" },
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src="/20230325142541_IMG_0003@-2042003499.jpg"
                        alt="Akira Safaris Journey"
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 2,
                          mb: 1.5,
                          objectFit: "cover",
                        }}
                      />
                      <Button
                        onClick={() => navigate("/staff")}
                        size="small"
                        sx={{
                          mt: 1,
                          backgroundColor: "#8b7355",
                          color: "#fff",
                          borderRadius: 2,
                          px: 1.5,
                          py: 0.5,
                          fontSize: { md: "0.75rem" },
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: "0 2px 8px rgba(139, 115, 85, 0.3)",
                          "&:hover": {
                            backgroundColor: "#c8a97e",
                            boxShadow: "0 4px 12px rgba(139, 115, 85, 0.4)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                          "&:focus": {
                            outline: "none",
                            boxShadow: "0 2px 8px rgba(139, 115, 85, 0.3)",
                          },
                          "&:focus-visible": {
                            outline: "none",
                            boxShadow: "0 2px 8px rgba(139, 115, 85, 0.3)",
                          },
                          "&:active": {
                            outline: "none",
                            boxShadow: "0 2px 8px rgba(139, 115, 85, 0.3)",
                          },
                        }}
                      >
                        Meet Our Team
                      </Button>
                    </Paper>
                  </Box>
                </Box>
              </Box>

              {/* Closing Paragraph */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    lineHeight: 1.6,
                    textAlign: "center",
                    maxWidth: "900px",
                    mx: "auto",
                    fontStyle: "italic",
                  }}
                >
                  For us, every itinerary is more than a trip. It is an invitation to discover, connect, and create stories that last a lifetime. We would be honored to help you write yours.
                </Typography>
              </Box>

              {/* Start Your Journey Section */}
              <Box
                sx={{
                  mt: 1.25,
                  p: { xs: 0.5, sm: 0.625, md: 0.75 },
                  background:
                    "linear-gradient(135deg, rgba(200, 169, 126, 0.1) 0%, rgba(139, 115, 85, 0.05) 100%)",
                  borderRadius: { xs: 2, md: 3 },
                  border: "1px solid rgba(200, 169, 126, 0.2)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 0.75,
                    color: "#1a1a1a",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  }}
                >
                  Start Your Journey
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    lineHeight: 1.6,
                    maxWidth: "700px",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  Contact us to begin planning your personalized East African safari with our family.
                </Typography>
                 <Button
                   variant="contained"
                   size="large"
                   endIcon={<ArrowForward />}
                   onClick={() => navigate("/plan")}
                   sx={{
                     px: 2,
                     py: 0.75,
                     fontSize: "1.1rem",
                     fontWeight: 600,
                     borderRadius: "50px",
                     background: "#c8a97e",
                     boxShadow: "0 8px 32px rgba(200, 169, 126, 0.3)",
                     transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                     "& .MuiButton-endIcon": {
                       marginLeft: 0.5,
                     },
                     "&:hover": {
                       transform: "translateY(-3px) scale(1.05)",
                       boxShadow: "0 12px 40px rgba(200, 169, 126, 0.4)",
                       background: "#8b7355",
                     },
                     "&:focus": {
                       outline: "none",
                       boxShadow: "0 8px 32px rgba(200, 169, 126, 0.3)",
                     },
                     "&:focus-visible": {
                       outline: "none",
                       boxShadow: "0 8px 32px rgba(200, 169, 126, 0.3)",
                     },
                     "&:active": {
                       outline: "none",
                       boxShadow: "0 8px 32px rgba(200, 169, 126, 0.3)",
                     },
                   }}
                 >
                   Contact Us
                 </Button>
              </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
