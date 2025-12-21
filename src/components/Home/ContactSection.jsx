import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
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
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0, sm: 0, md: 0 },
        }}
      >
        <Box
          sx={{
            py: { xs: 0.75, sm: 1, md: 1.25 },
            px: { xs: 1.25, sm: 1.25, md: 1.25 },
          }}
        >
          <Stack spacing={{ xs: 2.5, md: 3.5 }}>
            <Stack spacing={1} alignItems="center" textAlign="center">
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: 2,
                  color: "#6B7D47",
                  fontWeight: 700,
                }}
              >
                Get in touch
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#3D2817",
                  lineHeight: 1.2,
                }}
              >
                Plan your next adventure with us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  lineHeight: 1.6,
                  maxWidth: 720,
                  fontSize: "1.3rem",
                }}
              >
                Tell us what you would like to experience and we will tailor a
                safari that matches your travel style, group size, and dates.
              </Typography>

              <Stack
                spacing={1.5}
                direction={{ xs: "column", md: "row" }}
                sx={{ flexWrap: "wrap", justifyContent: "center" }}
              >
                {[
                  {
                    icon: <Phone sx={{ fontSize: 22 }} />,
                    label: "Call us",
                    value: "+254 731 913293",
                    color: "#6B4E3D",
                  },
                  {
                    icon: <Email sx={{ fontSize: 22 }} />,
                    label: "Email",
                    value: "info@akirasafaris.co.ke",
                    color: "#B85C38",
                  },
                  {
                    icon: <LocationOn sx={{ fontSize: 22 }} />,
                    label: "Visit",
                    value: "Nairobi, Kenya",
                    color: "#6B7D47",
                  },
                ].map((item) => (
                  <Stack
                    key={item.label}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{
                      p: { xs: 1.5, sm: 1.75 },
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${item.color}12, ${item.color}28)`,
                      border: `1px solid ${item.color}33`,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                      transition: "all 0.35s ease",
                      flex: { md: "1 1 0" },
                      minWidth: { md: 240 },
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.01)",
                        boxShadow: "0 16px 34px rgba(0,0,0,0.16)",
                        borderColor: `${item.color}66`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "14px",
                        background: "rgba(255,255,255,0.85)",
                        color: item.color,
                        boxShadow: `0 6px 18px ${item.color}33`,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          letterSpacing: 0.15,
                          textAlign: "center",
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          lineHeight: 1.6,
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Stack>

          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

