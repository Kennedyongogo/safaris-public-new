import React from "react";
import {
  Box,
  Container,
  Grid,
  
  Typography,
  Link,
  IconButton,
  Chip,
  Divider,
  Fade,
  Slide,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";

// Custom X icon for Twitter/X rebrand
const XIcon = ({ sx, ...props }) => (
  <Box
    component="svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    sx={{
      width: 24,
      height: 24,
      ...sx,
    }}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </Box>
);

// Custom TikTok icon
const TikTokIcon = ({ sx, ...props }) => (
  <Box
    component="svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    sx={{
      width: 24,
      height: 24,
      ...sx,
    }}
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </Box>
);

// Custom YouTube icon
const YouTubeIcon = ({ sx, ...props }) => (
  <Box
    component="svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    sx={{
      width: 24,
      height: 24,
      ...sx,
    }}
    {...props}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </Box>
);

export default function Footer() {
  const handleSocialClick = (label) => {
    if (label === "Facebook") {
      window.open("https://www.facebook.com/akirasafaris/", "_blank", "noopener,noreferrer");
    } else if (label === "Twitter") {
      window.open("https://x.com/AkiraSafaris", "_blank", "noopener,noreferrer");
    } else if (label === "Instagram") {
      window.open("https://www.instagram.com/akirasafaris/?hl=en", "_blank", "noopener,noreferrer");
    } else if (label === "LinkedIn") {
      window.open("https://www.linkedin.com/in/david-odongo-78876637/", "_blank", "noopener,noreferrer");
    } else if (label === "TikTok") {
      window.open("https://www.tiktok.com/tag/akirasafari", "_blank", "noopener,noreferrer");
    } else if (label === "YouTube") {
      window.open("https://www.youtube.com/channel/UCV_RwQsbXHwO3gzYQKsXw7Q", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        background: "#f9f7f3",
        pt: { xs: 0, sm: 0, md: 0 },
        pb: 0.4,
        mt: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 0.75, sm: 0.75, md: 0.75 },
          pt: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
          <Box
            sx={{
              py: { xs: 0.75, sm: 0.875, md: 1 },
              px: { xs: 0.75, sm: 0.75, md: 0.75 },
            }}
          >
          <Fade in timeout={1000}>
            <Box>
              <Grid
                container
                spacing={{ xs: 1, sm: 1.5, md: 2 }}
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={12} md={4}>
                  <Slide direction="up" in timeout={1200}>
                    <Box sx={{ textAlign: "left" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 0.75, sm: 1.5 },
                          mb: { xs: 0.5, sm: 0.75 },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: "-4px",
                              left: "-4px",
                              right: "-4px",
                              bottom: "-4px",
                              background:
                                "linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                              borderRadius: "50%",
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                            },
                            "&:hover::before": {
                              opacity: 1,
                            },
                          }}
                        >
                          <img
                            src="/images/WhatsApp_Image_2025-12-14_at_10.56.47_AM-removebg-preview%20(1).png"
                            alt="Akira Safaris Logo"
                            style={{
                              height: "44px",
                              maxHeight: "48px",
                              width: "auto",
                              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            background:
                              "linear-gradient(45deg, #8b7355, #1a1a1a)", // Secondary Brown to Primary Black
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: { xs: "1.1rem", sm: "1.5rem" },
                          }}
                        >
                          Akira Safaris
                        </Typography>
                      </Box>

                      <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: { xs: 0.5, sm: 1 },
                            fontWeight: 600,
                            color: "#c8a97e", // Accent Gold
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                          }}
                        >
                          Experience the Magic of Africa.
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 0.5,
                            lineHeight: 1.6,
                            color: "#1a1a1a",
                            fontSize: { xs: "1.1rem", sm: "1.2rem" },
                          }}
                        >
                          Akira Safaris opens the door to Africa's awe-inspiring
                          beauty,
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: { xs: 1, sm: 1.5 },
                            lineHeight: 1.6,
                            color: "#1a1a1a",
                            fontSize: { xs: "1.1rem", sm: "1.2rem" },
                          }}
                        >
                          wonders, and hidden treasures. Creating transformative
                          journeys across this extraordinary continent.
                        </Typography>
                      </Box>

                      {/* Mission Chips */}
                      <Box
                        sx={{
                          mb: { xs: 1, sm: 2 },
                          display: "flex",
                          flexWrap: "wrap",
                          gap: { xs: 0.25, sm: 0.5 },
                        }}
                      >
                        <Chip
                          label="Wildlife"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #8b7355, #c8a97e)", // Secondary Brown to Accent Gold
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(139, 115, 85, 0.4)",
                            },
                          }}
                        />
                        <Chip
                          label="Adventure"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #c8a97e, #8b7355)", // Accent Gold to Secondary Brown
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(200, 169, 126, 0.4)",
                            },
                          }}
                        />
                        <Chip
                          label="Safari Tours"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #8b7355, #c8a97e)", // Secondary Brown to Accent Gold
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(139, 115, 85, 0.4)",
                            },
                          }}
                        />
                      </Box>

                      {/* Social Media Icons - mobile/tablet */}
                      <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: { xs: 0.5, sm: 1 },
                            fontWeight: 600,
                            color: "#1a1a1a",
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                          }}
                        >
                          Follow Us
                        </Typography>
                        <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
                          {[
                            {
                              icon: <Facebook />,
                              color: "#1877f2",
                              label: "Facebook",
                            },
                            {
                              icon: <XIcon />,
                              color: "#000000",
                              label: "Twitter",
                            },
                            {
                              icon: <Instagram />,
                              color: "#e4405f",
                              label: "Instagram",
                            },
                            {
                              icon: <LinkedIn />,
                              color: "#0077b5",
                              label: "LinkedIn",
                            },
                            {
                              icon: <TikTokIcon />,
                              color: "#000000",
                              label: "TikTok",
                            },
                            {
                              icon: <YouTubeIcon />,
                              color: "#FF0000",
                              label: "YouTube",
                            },
                          ].map((social, index) => (
                            <IconButton
                              key={index}
                              aria-label={social.label}
                              onClick={() => handleSocialClick(social.label)}
                              sx={{
                                color: social.color,
                                background: "rgba(0,0,0,0.05)",
                                border: "1px solid rgba(0,0,0,0.1)",
                                transition:
                                  "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                outline: "none",
                                "&:focus": {
                                  outline: "none",
                                },
                                "&:focus-visible": {
                                  outline: "none",
                                },
                                "&:hover": {
                                  background: social.color,
                                  color: "white",
                                  transform: "translateY(-3px) scale(1.1)",
                                  boxShadow: `0 8px 25px ${social.color}40`,
                                },
                              }}
                            >
                              {social.icon}
                            </IconButton>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Slide>
                </Grid>

                {/* Social media right column on desktop */}
                <Grid item xs={12} sm={12} md={4} sx={{ display: { xs: "none", md: "flex" } }}>
                  <Slide direction="up" in timeout={1600}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        textAlign: "right",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          background:
                            "linear-gradient(45deg, #8b7355, #1a1a1a)", // Secondary Brown to Primary Black
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: { xs: "1.1rem", sm: "1.4rem" },
                        }}
                      >
                        Follow Us
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {[
                          {
                            icon: <Facebook />,
                            color: "#1877f2",
                            label: "Facebook",
                          },
                          {
                            icon: <XIcon />,
                            color: "#000000",
                            label: "Twitter",
                          },
                          {
                            icon: <Instagram />,
                            color: "#e4405f",
                            label: "Instagram",
                          },
                          {
                            icon: <LinkedIn />,
                            color: "#0077b5",
                            label: "LinkedIn",
                          },
                          {
                            icon: <TikTokIcon />,
                            color: "#000000",
                            label: "TikTok",
                          },
                          {
                            icon: <YouTubeIcon />,
                            color: "#FF0000",
                            label: "YouTube",
                          },
                        ].map((social, index) => (
                          <IconButton
                            key={index}
                            aria-label={social.label}
                            onClick={() => handleSocialClick(social.label)}
                            sx={{
                              color: social.color,
                              background: "rgba(0,0,0,0.05)",
                              border: "1px solid rgba(0,0,0,0.1)",
                              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              outline: "none",
                              "&:focus": {
                                outline: "none",
                              },
                              "&:focus-visible": {
                                outline: "none",
                              },
                              "&:hover": {
                                background: social.color,
                                color: "white",
                                transform: "translateY(-3px) scale(1.1)",
                                boxShadow: `0 8px 25px ${social.color}40`,
                              },
                            }}
                          >
                            {social.icon}
                          </IconButton>
                        ))}
                      </Box>
                    </Box>
                  </Slide>
                </Grid>

                {/* Contact column removed */}
              </Grid>

              {/* Copyright Section */}
              <Fade in timeout={2000}>
                <Box>
                  <Divider
                    sx={{
                      my: 1,
                      borderColor: "rgba(139, 115, 85, 0.2)", // Secondary Brown
                      "&::before, &::after": {
                        borderColor: "rgba(139, 115, 85, 0.1)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: { xs: 0.75, sm: 0.875 },
                      textAlign: "center",
                      pt: 0.15,
                      pb: 0.05,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#1a1a1a",
                        fontWeight: 500,
                        fontSize: { xs: "0.85rem", sm: "0.95rem" },
                      }}
                    >
                      © {new Date().getFullYear()} Akira Safaris. All rights
                      reserved.
                    </Typography>
                    <Box
                      sx={{
                        py: { xs: 0.15, sm: 0.18 },
                        px: { xs: 0.45, sm: 0.5 },
                        background: "rgba(128, 128, 128, 0.15)", // subtle grey
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(128, 128, 128, 0.35)",
                        borderRadius: "12px",
                        textAlign: "center",
                        minWidth: "auto",
                        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          background: "rgba(128, 128, 128, 0.25)",
                          boxShadow: "0 10px 32px rgba(0, 0, 0, 0.16)",
                          backdropFilter: "blur(14px)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#1a1a1a",
                          fontWeight: 700,
                          fontSize: { xs: "0.78rem", sm: "0.9rem" },
                        }}
                      >
                        developed by Carlvyne Technologies ltd
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
}
