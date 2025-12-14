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
  Paper,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "transparent",
        pt: { xs: 0.25, sm: 0.375, md: 0.5 },
        pb: 1,
        mt: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
          <Paper
          elevation={3}
          sx={{
            py: { xs: 1.5, sm: 2, md: 2.5 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "#FFFFFF",
            border: "1px solid rgba(107, 78, 61, 0.2)", // Medium brown border
            minHeight: "auto",
            height: "auto",
          }}
        >
          <Fade in timeout={1000}>
            <Box>
              <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 5 }}
                justifyContent="space-between"
              >
                <Grid item xs={5} sm={5} md={4}>
                  <Slide direction="up" in timeout={1200}>
                    <Box sx={{ textAlign: "left" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1, sm: 2 },
                          mb: { xs: 1, sm: 1.5 },
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
                            src="/IMG-20251210-WA0070.jpg"
                            alt="Akira Safaris Logo"
                            style={{
                              height: "32px",
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
                              "linear-gradient(45deg, #6B4E3D, #3D2817)", // Medium to dark brown
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
                            color: "#B85C38", // Burnt orange/rust
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
                            color: "text.primary",
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
                            color: "text.primary",
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
                          gap: { xs: 0.5, sm: 1 },
                        }}
                      >
                        <Chip
                          label="Wildlife"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #2D4A2D, #6B7D47)", // Dark forest green to olive
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(45, 74, 45, 0.4)",
                            },
                          }}
                        />
                        <Chip
                          label="Adventure"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #B85C38, #C97A5A)", // Rust to light rust
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(184, 92, 56, 0.4)",
                            },
                          }}
                        />
                        <Chip
                          label="Safari Tours"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #6B4E3D, #8B6F5E)", // Medium brown to lighter brown
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(107, 78, 61, 0.4)",
                            },
                          }}
                        />
                      </Box>

                      {/* Social Media Icons */}
                      <Typography
                        variant="h6"
                        sx={{
                          mb: { xs: 0.5, sm: 1 },
                          fontWeight: 600,
                          color: "text.primary",
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
                            icon: <Twitter />,
                            color: "#1da1f2",
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
                        ].map((social, index) => (
                          <IconButton
                            key={index}
                            aria-label={social.label}
                            sx={{
                              color: social.color,
                              background: "rgba(0,0,0,0.05)",
                              border: "1px solid rgba(0,0,0,0.1)",
                              transition:
                                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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

                <Grid item xs={7} sm={7} md={8}>
                  {/* Contact Us Column */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box sx={{ ml: "auto" }}>
                      <Slide direction="up" in timeout={1600}>
                        <Box
                          sx={{
                            textAlign: "right",
                            width: { xs: "100%", sm: "420px" },
                            maxWidth: "460px",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              mb: { xs: 1, sm: 1.5 },
                              fontWeight: 700,
                              background:
                                "linear-gradient(45deg, #6B4E3D, #3D2817)", // Medium to dark brown
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              fontSize: { xs: "1.3rem", sm: "1.5rem" },
                              textAlign: "right",
                            }}
                          >
                            Contact Us
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: { xs: 0.5, sm: 0.75 },
                              alignItems: "flex-end",
                            }}
                          >
                            {/* Physical Address */}
                            <Box
                              sx={{
                                p: { xs: 1, sm: 1.25 },
                                background: "rgba(0,0,0,0.03)",
                                border: "1px solid rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                                transition: "all 0.3s ease",
                                textAlign: "right",
                                "&:hover": {
                                  background: "rgba(0,0,0,0.05)",
                                  transform: "translateY(-1px)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 0.5, sm: 1 },
                                  mb: { xs: 0.25, sm: 0.5 },
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#6B7D47", // Olive green
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: 24, sm: 28 },
                                    height: { xs: 24, sm: 28 },
                                    borderRadius: "50%",
                                    background: "rgba(107, 125, 71, 0.1)",
                                  }}
                                >
                                  <LocationOn
                                    sx={{
                                      fontSize: { xs: "14px", sm: "16px" },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                  }}
                                >
                                  Physical Address
                                </Typography>
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.primary",
                                  lineHeight: 1.4,
                                  fontSize: { xs: "0.95rem", sm: "1rem" },
                                  textAlign: "right",
                                }}
                              >
                                Meghon Plaza, Bungoma Town,
                                <br />
                                along Moi Avenue
                              </Typography>
                            </Box>

                            {/* Postal Address */}
                            <Box
                              sx={{
                                p: { xs: 1, sm: 1.25 },
                                background: "rgba(0,0,0,0.03)",
                                border: "1px solid rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                                transition: "all 0.3s ease",
                                textAlign: "right",
                                "&:hover": {
                                  background: "rgba(0,0,0,0.05)",
                                  transform: "translateY(-1px)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 0.5, sm: 1 },
                                  mb: { xs: 0.25, sm: 0.5 },
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#B85C38", // Burnt orange/rust
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: 24, sm: 28 },
                                    height: { xs: 24, sm: 28 },
                                    borderRadius: "50%",
                                    background: "rgba(184, 92, 56, 0.1)",
                                  }}
                                >
                                  <LocationOn
                                    sx={{
                                      fontSize: { xs: "14px", sm: "16px" },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                  }}
                                >
                                  Postal Address
                                </Typography>
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.primary",
                                  lineHeight: 1.4,
                                  fontSize: { xs: "0.95rem", sm: "1rem" },
                                  textAlign: "right",
                                }}
                              >
                                P.O. Box 2072-50200
                              </Typography>
                            </Box>

                            {/* Contact Info */}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: { xs: 0.5, sm: 1 },
                                alignItems: "flex-end",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 0.5, sm: 1 },
                                  flexDirection: "row-reverse",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#6B4E3D", // Medium brown
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: 20, sm: 24 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: "50%",
                                    background: "rgba(107, 78, 61, 0.1)",
                                  }}
                                >
                                  <Phone
                                    sx={{
                                      fontSize: { xs: "12px", sm: "14px" },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                  }}
                                >
                                  +254 731 913293
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 0.5, sm: 1 },
                                  flexDirection: "row-reverse",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#B85C38", // Burnt orange/rust
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: 20, sm: 24 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: "50%",
                                    background: "rgba(184, 92, 56, 0.1)",
                                  }}
                                >
                                  <Email
                                    sx={{
                                      fontSize: { xs: "12px", sm: "14px" },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                  }}
                                >
                                  david@akirasafaris.co.ke
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Slide>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Copyright Section */}
              <Fade in timeout={2000}>
                <Box>
                  <Divider
                    sx={{
                      my: 1,
                      borderColor: "rgba(107, 78, 61, 0.2)", // Medium brown
                      "&::before, &::after": {
                        borderColor: "rgba(107, 78, 61, 0.1)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", sm: "row" },
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: { xs: 1, sm: 1.5 },
                      textAlign: "center",
                      py: 0.25,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.primary",
                        fontWeight: 500,
                        fontSize: { xs: "0.75rem", sm: "1rem" },
                      }}
                    >
                      © {new Date().getFullYear()} Akira Safaris. All rights
                      reserved.
                    </Typography>
                    <Box
                      sx={{
                        py: { xs: 0.25, sm: 0.4 },
                        px: { xs: 0.75, sm: 1 },
                        background: "rgba(128, 128, 128, 0.15)", // subtle grey
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(128, 128, 128, 0.35)",
                        borderRadius: "12px",
                        textAlign: "center",
                        minWidth: { xs: "auto", sm: "auto" },
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
                          color: "text.primary",
                          fontWeight: 700,
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
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
        </Paper>
      </Container>
    </Box>
  );
}
