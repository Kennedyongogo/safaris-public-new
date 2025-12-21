import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Groups } from "@mui/icons-material";

const MotionBox = motion(Box);

export default function AboutUsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const handleMeetTeam = () => {
    navigate("/team");
  };

  return (
    <Box
      id="about-section"
      sx={{
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 1, sm: 1.5, md: 2 },
        position: "relative",
        zIndex: 1,
        background: "#FFFFFF",
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
            py: { xs: 1, sm: 1.25, md: 1.5 },
            px: { xs: 1.25, sm: 1.25, md: 1.5 },
          }}
        >
          <Grid container spacing={2}>
            {/* Left Column - Image */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "240px", md: "320px" },
                  borderRadius: { xs: 2, md: 3 },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src="/images/safari-about.jpg"
                  alt="Safari scene with leopards"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // Fallback to a placeholder or default image
                    e.target.src =
                      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop";
                  }}
                />
              </Box>
            </Grid>

            {/* Right Column - Text and Button */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: { xs: "auto", md: "100%" },
                  p: { xs: 1.25, md: 1.75 },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 950,
                    mb: { xs: 1, md: 1.25 },
                    color: "#5D4037", // Dark brown
                    fontSize: { xs: "1.4rem", sm: "1.45rem", md: "1.5rem" },
                  }}
                >
                  About Us
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 1.25, md: 1.5 },
                    color: "text.primary",
                    fontSize: { xs: "1.2rem", md: "1.2rem" },
                    fontWeight: 750,
                    lineHeight: 1.6,
                  }}
                >
                  Akira Safaris was born around camp-fires and living-room couches when Couchsurfing guests asked us to "show us the Africa you know." Weekend road-trips to the Mara and Amboseli turned into a calling: craft personal, expert-led journeys built on authentic human connection. Today we are that same hospitality, scaled boutique, 100 % private, carbon-positive. Every safari uses a dedicated vehicle and guide, is timed for secret water-holes and sundowner hills, and plants ten indigenous trees in your
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<Groups />}
                  onClick={handleMeetTeam}
                  sx={{
                    alignSelf: { xs: "stretch", sm: "flex-start" },
                    px: 2.5,
                    py: 0.75,
                    borderRadius: 2,
                    backgroundColor: "#B85C38", // Burnt orange/rust
                    color: "white",
                    fontWeight: 800,
                    fontSize: { xs: "1.1rem", md: "1.15rem" },
                    textTransform: "none",
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:hover": {
                      backgroundColor: "#8B4225", // Dark rust
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(184, 92, 56, 0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
