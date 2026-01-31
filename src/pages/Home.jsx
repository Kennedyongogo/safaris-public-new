import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import HeroSection from "../components/Home/HeroSection";
import InquirySection from "../components/Home/InquirySection";
import ServicesSection from "../components/Home/ServicesSection";
import ImageCarouselSection from "../components/Home/ImageCarouselSection";
import BackgroundImageSection from "../components/Home/BackgroundImageSection";
import LetterFromFounders from "../components/Home/LetterFromFounders";
import AccreditationsSection from "../components/Home/AccreditationsSection";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Helmet>
        <title>Akira Safaris | Kenya &amp; East Africa Safari Tours</title>
        <meta
          name="description"
          content="Akira Safaris crafts unforgettable Kenya and East Africa journeys with expert guides, wildlife adventures, and tailored itineraries for every traveler."
        />
      </Helmet>
      <HeroSection />
      <InquirySection />
      <ServicesSection />
      <LetterFromFounders />
      <ImageCarouselSection />
      <BackgroundImageSection />
      <Box sx={{ py: { xs: 2, md: 3 }, bgcolor: "#f9f7f3" }}>
        <Container maxWidth="xl">
          <Stack spacing={2} alignItems="center">
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#1a1a1a", textAlign: "center" }}
            >
              Explore More with Akira Safaris
            </Typography>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ width: "100%", justifyContent: "center" }}
            >
              <Button
                component={RouterLink}
                to="/east-africa-safaris"
                variant="contained"
                sx={{ bgcolor: "#8b7355", "&:hover": { bgcolor: "#6b4e3d" } }}
              >
                Safari Packages
              </Button>
              <Button
                component={RouterLink}
                to="/destinations"
                variant="outlined"
                sx={{ borderColor: "#8b7355", color: "#8b7355" }}
              >
                Destinations
              </Button>
              <Button
                component={RouterLink}
                to="/contact-us"
                variant="outlined"
                sx={{ borderColor: "#8b7355", color: "#8b7355" }}
              >
                Contact Us
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <AccreditationsSection />

      <Footer />
    </Box>
  );
}
