import React from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
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
      <AccreditationsSection />

      <Footer />
    </Box>
  );
}
