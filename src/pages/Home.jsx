import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/Home/HeroSection";
import AboutUsSection from "../components/Home/AboutUsSection";
import ServicesSection from "../components/Home/ServicesSection";
import ImageCarouselSection from "../components/Home/ImageCarouselSection";
import BackgroundImageSection from "../components/Home/BackgroundImageSection";
import CharityMap from "../components/Home/CharityMap";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <ImageCarouselSection />
      <BackgroundImageSection />
      
      {/* Charity Map Section */}
      <CharityMap />

      <Footer />
    </Box>
  );
}
