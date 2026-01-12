import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/Home/HeroSection";
import InquirySection from "../components/Home/InquirySection";
import ServicesSection from "../components/Home/ServicesSection";
import ImageCarouselSection from "../components/Home/ImageCarouselSection";
import BackgroundImageSection from "../components/Home/BackgroundImageSection";
import LetterFromFounders from "../components/Home/LetterFromFounders";
import ContactSection from "../components/Home/ContactSection";
import AccreditationsSection from "../components/Home/AccreditationsSection";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeroSection />
      <InquirySection />
      <ServicesSection />
      <LetterFromFounders />
      <ImageCarouselSection />
      <BackgroundImageSection />
      <ContactSection />
      <AccreditationsSection />

      <Footer />
    </Box>
  );
}
