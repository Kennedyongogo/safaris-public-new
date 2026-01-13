import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  Card,
} from "@mui/material";
import { LocationOn, Email, Phone } from "@mui/icons-material";

export default function ContactSection() {
  return (
    <Box
      id="contact-section"
      sx={{
        position: "relative",
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 1, sm: 1.5, md: 2 },
        px: 0,
        background: "#FFFFFF",
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(139, 115, 85, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 0.75, sm: 1.5, md: 1.5 },
            pt: { xs: 0, sm: 0, md: 0 },
          }}
        >
          <Box
            sx={{
              py: { xs: 0.75, sm: 1, md: 1.25 },
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Stack spacing={{ xs: 2.5, md: 3.5 }}>
              <Stack
                spacing={1}
                alignItems="center"
                textAlign="center"
                sx={{ width: "100%" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: 2,
                    color: "#c8a97e",
                    fontWeight: 700,
                  }}
                >
                  Get in touch
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2.125rem" },
                  }}
                >
                  Plan your next adventure with us
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#1a1a1a",
                    lineHeight: 1.6,
                    maxWidth: 720,
                    fontSize: "1.3rem",
                  }}
                >
                  Tell us what you would like to experience and we will tailor a
                  safari that matches your travel style, group size, and dates.
                </Typography>

                <Grid container spacing={1.5} sx={{ width: "100%" }}>
                  {[
                    {
                      icon: <Phone sx={{ fontSize: 18 }} />,
                      label: "Call us",
                      value: "+254 731 913293",
                      color: "#8b7355",
                    },
                    {
                      icon: <Email sx={{ fontSize: 18 }} />,
                      label: "Email",
                      value: "info@akirasafaris.co.ke",
                      color: "#c8a97e",
                    },
                    {
                      icon: <LocationOn sx={{ fontSize: 18 }} />,
                      label: "Postal Address:",
                      value: "P.O. Box 42886–00100\nNairobi, Kenya",
                      color: "#8b7355",
                    },
                    {
                      icon: <Phone sx={{ fontSize: 18 }} />,
                      label: "Alternative Contacts:",
                      value:
                        "+254 721 913 293\n+254 726 913 872\n+254 739 611 948",
                      color: "#8b7355",
                    },
                  ].map((item) => (
                    <Grid size={{ xs: 6, md: 3 }} key={item.label} sx={{ display: "flex" }}>
                      <Stack
                        direction="column"
                        spacing={{ xs: 0.75, md: 0.5 }}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          p: { xs: 0.5, sm: 0.75, md: 0.75 },
                          borderRadius: 3,
                          background: `linear-gradient(135deg, ${item.color}12, ${item.color}28)`,
                          border: `1px solid ${item.color}33`,
                          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                          transition: "all 0.35s ease",
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                          "&:hover": {
                            transform: "translateY(-4px) scale(1.01)",
                            boxShadow: "0 16px 34px rgba(0,0,0,0.16)",
                            borderColor: `${item.color}66`,
                          },
                        }}
                      >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.85)",
                          color: item.color,
                          boxShadow: `0 6px 18px ${item.color}33`,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box sx={{ textAlign: "center", width: "100%" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 900,
                            color: "#1a1a1a",
                            letterSpacing: 0.15,
                            textAlign: "center",
                            fontSize: "1.05rem",
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1a1a1a",
                            lineHeight: 1.3,
                            fontWeight: 700,
                            textAlign: "center",
                            whiteSpace: "pre-line",
                            fontSize: "1rem",
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Card>
    </Box>
  );
}
