import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { teamMembers } from "../data/teamMembers";

export default function Team() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // Typewriter animation state
  const [displayText, setDisplayText] = useState("A");
  const fullText = "Akira Safaris";
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(1); // Start at 1 since we begin with "A"
  const [highlightId, setHighlightId] = useState(null);

  // When coming back from detail, scroll to the originating card
  useEffect(() => {
    const targetId = location.state?.scrollToId;
    const highlight = location.state?.highlightId;
    if (!targetId) return;

    const scrollToCard = () => {
      const cardEl = document.querySelector(`[data-member-id="${targetId}"]`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setTimeout(scrollToCard, 100);
      }
    };

    requestAnimationFrame(scrollToCard);
    if (highlight) {
      setHighlightId(highlight);
    }
    // remove highlight after 2 seconds
    const clear = highlight ? setTimeout(() => setHighlightId(null), 2000) : null;
    // Clear state so it doesn't re-run on next renders
    navigate("/team", { replace: true, state: null });
    return () => {
      if (clear) clearTimeout(clear);
    };
  }, [location.state, navigate]);

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
        background: "linear-gradient(135deg, rgba(245, 241, 232, 0.9) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(232, 224, 209, 0.9) 100%)", // Beige tones
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
            border: "1px solid rgba(107, 78, 61, 0.2)", // Medium brown border
          }}
        >
          {/* Company Profile Section */}
          <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
            <Paper
              elevation={2}
              sx={{
                p: { xs: 1, sm: 1.25, md: 1.5 },
                borderRadius: { xs: 2, md: 3 },
                background: "linear-gradient(135deg, rgba(245, 241, 232, 0.5) 0%, rgba(255, 255, 255, 1) 100%)",
                border: "1px solid rgba(107, 78, 61, 0.2)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#3D2817",
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
                      backgroundColor: "#3D2817",
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
                variant="h4"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: "#6B4E3D",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  textAlign: "center",
                }}
              >
                YOUR JOURNEY, OUR STORY
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 500,
                  mb: 2,
                  color: "#B85C38",
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Crafting Authentic African Adventures
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 2.5,
                  color: "text.primary",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  lineHeight: 1.6,
                  textAlign: "center",
                  maxWidth: "900px",
                  mx: "auto",
                }}
              >
                At Akira Safaris, we don't sell tours—we design deeply personal journeys into East Africa's wild heart. Built on genuine hospitality and local expertise, our safaris are shaped by human connection, storytelling, and a lifelong love for Africa.
              </Typography>

              {/* Our Story Section */}
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#B85C38",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  }}
                >
                  Our Story
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    lineHeight: 1.6,
                  }}
                >
                  Akira Safaris began around shared meals, campfires, and Couchsurfing guests who asked to experience "the Africa we know." What started as simple road trips grew into expertly guided journeys through the Mara, Amboseli, and the Rift Valley. Today, that same warmth remains—only now, it's refined, responsible, and intentionally small-scale. You arrive as a guest and leave as family.
                </Typography>
              </Box>

              {/* What We Do Section */}
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#B85C38",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  }}
                >
                  What We Do
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Private, tailor-made safaris with dedicated vehicles and guides
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Bespoke itineraries—luxury camps, family travel, photography, wellness retreats
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Carbon-positive travel—110% footprint offset and 10 indigenous trees planted per guest
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Cultural immersion—Maasai traditions, fireside stories, and life beyond the game drive
                  </Typography>
                </Box>
              </Box>

              {/* Why Akira Safaris Section */}
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#B85C38",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  }}
                >
                  Why Akira Safaris
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Locally rooted—we live here; this is our home
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Truly bespoke—your pace, interests, and budget lead the way
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Boutique care—a personal concierge from planning to return
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Purpose-driven travel—fair wages, community support, plastic-free camps
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Endless discoveries—rare wildlife moments and hidden places most never see
                  </Typography>
                </Box>
              </Box>

              {/* Signature Experiences Section */}
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#B85C38",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  }}
                >
                  Signature Experiences
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Migration Detox Retreat – Phone-free Great Migration journey
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Classic Kenya Highlights – Mara, Nakuru & Amboseli in 7 days
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 0.75, color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Gorilla & Chimp Flex-Trek – Permit-guaranteed primate encounters
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ color: "text.primary", fontSize: { xs: "0.875rem", md: "1rem" }, lineHeight: 1.6 }}>
                    Photographic Safaris – Off-road access with professional image delivery
                  </Typography>
                </Box>
              </Box>

              {/* Our Commitment Section */}
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#B85C38",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  }}
                >
                  Our Commitment
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    lineHeight: 1.6,
                  }}
                >
                  Every Akira Safari is locally designed, ethically operated, and personally delivered. Your guide is more than a driver—they're your storyteller, cultural bridge, and trusted companion through Africa's most unforgettable landscapes.
                </Typography>
              </Box>

              {/* Ready to Start Section */}
              <Box
                sx={{
                  mt: 2.5,
                  p: { xs: 1, sm: 1.25, md: 1.5 },
                  background: "linear-gradient(135deg, rgba(184, 92, 56, 0.1) 0%, rgba(107, 78, 61, 0.05) 100%)",
                  borderRadius: { xs: 2, md: 3 },
                  border: "1px solid rgba(184, 92, 56, 0.2)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#3D2817",
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  }}
                >
                  🚀 Ready to Start?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    lineHeight: 1.6,
                    maxWidth: "700px",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  Tell us your dreams, fears, bucket-list shots and dietary quirks. We'll turn them into a day-by-day adventure that fits you—and the planet—perfectly.
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
              </Box>
            </Paper>
          </Box>

          {/* Meet Our Team Section */}
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4, md: 5 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#3D2817", // Dark brown from palette
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.125rem" },
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Get to know the passionate individuals who make Akira Safaris an
              unforgettable experience.
            </Typography>
          </Box>

          {/* Team Members Grid - 3 cards per row */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
            {teamMembers.map((member) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
                <Card
                  data-member-id={member.id}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    },
                    boxShadow:
                      highlightId && String(highlightId) === String(member.id)
                        ? "0 0 0 3px rgba(184, 92, 56, 0.6), 0 12px 40px rgba(184, 92, 56, 0.25)"
                        : undefined,
                    background:
                      highlightId && String(highlightId) === String(member.id)
                        ? "linear-gradient(180deg, rgba(184, 92, 56, 0.08) 0%, rgba(255,255,255,1) 60%)"
                        : "transparent",
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
                  }}
                >
                  {/* Profile Image */}
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "300px", sm: "350px", md: "400px" },
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    {member.image ? (
                      <Box
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <Box
                      sx={{
                        display: member.image ? "none" : "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        color: "#999",
                      }}
                    >
                      <PersonIcon sx={{ fontSize: "4rem", mb: 1 }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.9rem",
                          textAlign: "center",
                          fontWeight: 600,
                        }}
                      >
                        No Photo
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card Content - Purple/Lavender Background */}
                  <Box
                    sx={{
                      backgroundColor: "#F5F1E8", // Light beige from palette
                      p: { xs: 2, sm: 2.5, md: 3 },
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Top Section - Role, Name, Description */}
                    <Box>
                      {/* Role Label */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.875rem", md: "0.9375rem" },
                          color: "text.primary",
                          mb: 0.5,
                        }}
                      >
                        {member.role}
                      </Typography>

                      {/* Name */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          color: "text.primary",
                          fontSize: { xs: "1.25rem", md: "1.5rem" },
                        }}
                      >
                        {member.name}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", md: "0.9375rem" },
                          lineHeight: 1.6,
                          mb: 2,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {member.description}
                      </Typography>
                    </Box>

                    {/* Bottom Section - Social Icons and Button */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: "auto",
                      }}
                    >
                      {/* Social Media Icons */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#1877f2",
                            color: "#fff",
                            width: 32,
                            height: 32,
                            "&:hover": { backgroundColor: "#166fe5" },
                            "&:focus": { outline: "none" },
                            "&:focus-visible": { outline: "none", boxShadow: "none" },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add Facebook link here
                          }}
                        >
                          <FacebookIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#E4405F",
                            color: "#fff",
                            width: 32,
                            height: 32,
                            "&:hover": { backgroundColor: "#d73755" },
                            "&:focus": { outline: "none" },
                            "&:focus-visible": { outline: "none", boxShadow: "none" },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add Instagram link here
                          }}
                        >
                          <InstagramIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                      </Box>

                      {/* More About Button */}
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/team/${member.id}`);
                        }}
                        sx={{
                          backgroundColor: "#B85C38", // Burnt orange/rust
                          color: "#fff",
                          borderRadius: 2,
                          px: 2,
                          py: 0.75,
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
                          textTransform: "none",
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: "#8B4225", // Dark rust
                          },
                          "&:focus": {
                            outline: "none",
                          },
                          "&:focus-visible": {
                            outline: "none",
                            boxShadow: "none",
                          },
                        }}
                      >
                        More about {member.name.split(" ")[0]}
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

