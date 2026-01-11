import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  Fade,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

export default function InquirySection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInquire = () => {
    navigate("/plan");
  };

  return (
    <Box
      sx={{
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 1, sm: 1.5, md: 2 },
        position: "relative",
        zIndex: 1,
        background: "#f9f7f3",
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(139, 115, 85, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
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
              py: { xs: 3, sm: 4, md: 5 },
              px: { xs: 2, sm: 3, md: 4 },
              textAlign: "center",
            }}
          >
            <Fade in={isVisible} timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: { xs: 2, md: 2.5 },
                    fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem", lg: "1.7rem" },
                    background: "linear-gradient(45deg, #1a1a1a, #c8a97e, #8b7355)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.2,
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}
                >
                  BEYOND A SINGLE STORY. BEYOND A SINGLE EXPERIENCE.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 2, md: 2.5 },
                    color: "#1a1a1a",
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                    fontWeight: 500,
                    lineHeight: 1.8,
                    maxWidth: "900px",
                    mx: "auto",
                  }}
                >
                  East Africa is more than a single story, it's a mosaic of cultures, wildlife, landscapes, and experiences.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 2, md: 2.5 },
                    color: "#1a1a1a",
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                    fontWeight: 500,
                    lineHeight: 1.8,
                    maxWidth: "900px",
                    mx: "auto",
                  }}
                >
                  At Akira Safaris, we connect travelers to journeys that deepen their understanding of East Africa's natural beauty and cultural heritage. Our team of travel experts brings a local lens to our craft, curating responsible and authentic safari experiences across Kenya, Tanzania, Uganda, and Rwanda.
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mb: { xs: 3, md: 4 },
                    fontWeight: 700,
                    fontSize: { xs: "0.95rem", sm: "1.3rem", md: "1.5rem" },
                    color: "#8b7355",
                    letterSpacing: { xs: "0.03em", sm: "0.05em", md: "0.05em" },
                    textTransform: "uppercase",
                  }}
                >
                  BEGIN DESIGNING YOUR ADVENTURE
                </Typography>

                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={handleInquire}
                  sx={{
                    px: { xs: 3, sm: 5, md: 6 },
                    py: { xs: 1.3, sm: 1.8, md: 2 },
                    fontSize: { xs: "0.85rem", sm: "1.1rem", md: "1.2rem" },
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: { xs: "0.05em", sm: "0.1em", md: "0.1em" },
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #8b7355 0%, #c8a97e 50%, #8b7355 100%)",
                    color: "white",
                    boxShadow: "0 8px 32px rgba(139, 115, 85, 0.3)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:focus": {
                      outline: "none",
                      boxShadow: "0 8px 32px rgba(139, 115, 85, 0.3)",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "0 8px 32px rgba(139, 115, 85, 0.3)",
                    },
                    "&:hover": {
                      transform: "translateY(-3px) scale(1.05)",
                      boxShadow: "0 12px 40px rgba(139, 115, 85, 0.4)",
                      background: "linear-gradient(135deg, #c8a97e 0%, #8b7355 50%, #c8a97e 100%)",
                    },
                  }}
                >
                  Inquire about adventure with Akira Safaris
                </Button>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Card>
    </Box>
  );
}

