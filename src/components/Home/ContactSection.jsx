import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { LocationOn, Email, Phone, Send } from "@mui/icons-material";

export default function ContactSection() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Contact form submission", formValues);
  };

  return (
    <Box
      id="contact-section"
      sx={{
        position: "relative",
        pt: { xs: 0.5, sm: 0.75, md: 1 },
        pb: { xs: 1, sm: 1.5, md: 2 },
        px: 0,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0.75, sm: 0.75, md: 0.75 },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            py: { xs: 0.75, sm: 1, md: 1.25 },
            px: { xs: 1.25, sm: 1.25, md: 1.25 },
            borderRadius: { xs: 3, md: 4 },
            border: "1px solid #e0e0e0",
            background: "white",
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
                    value: "david@akirasafaris.co.ke",
                    color: "#B85C38",
                  },
                  {
                    icon: <LocationOn sx={{ fontSize: 22 }} />,
                    label: "Visit",
                    value: "Meghon Plaza, Bungoma Town, along Moi Avenue",
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
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Stack>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.25, md: 2.75 },
                borderRadius: 3,
                border: "1px solid rgba(107, 78, 61, 0.18)",
                background: "linear-gradient(135deg, #fff, #f7f3ec)",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: 800,
                  color: "#3D2817",
                  textAlign: "center",
                }}
              >
                Send us a message
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
              >
                Share a few details and we will respond with itinerary ideas and
                next steps.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formValues.name}
                  onChange={handleChange("name")}
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formValues.email}
                  onChange={handleChange("email")}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  minRows={4}
                  value={formValues.message}
                  onChange={handleChange("message")}
                />

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<Send />}
                  sx={{
                    alignSelf: "center",
                    px: 3,
                    py: 1.25,
                    fontWeight: 700,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(45deg, #B85C38 30%, #C97A5A 90%)",
                    boxShadow: "0 10px 30px rgba(184, 92, 56, 0.35)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #8B4225 30%, #B85C38 90%)",
                      boxShadow: "0 12px 36px rgba(139, 66, 37, 0.35)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

