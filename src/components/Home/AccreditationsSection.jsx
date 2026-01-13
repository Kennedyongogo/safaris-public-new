import React from "react";
import { Box, Container, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function AccreditationsSection() {
  // Accreditation logos data
  // Note: You'll need to add the actual logo images to your public/images folder
  const accreditations = [
    {
      name: "SafariBookings.com",
      image: "/acredited/safari-bookings-removebg-preview.png",
      url: "https://www.safaribookings.com/reviews/p6185",
      alt: "SafariBookings.com - Trusted Safari Booking Platform",
    },
    {
      name: "Tripadvisor",
      image: "/acredited/tripavisor_logo-removebg-preview.png",
      url: "https://www.tripadvisor.com/Attraction_Review-g294207-d25259315-Reviews-AKIRA_SAFARIS-Nairobi.html",
      alt: "Tripadvisor - Travel Reviews and Recommendations",
    },
    {
      name: "Magical Kenya",
      image: "/acredited/magical-removebg-preview.png",
      url: "https://www.magicalkenya.com",
      alt: "Magical Kenya - Official Kenya Tourism Board",
    },
    {
      name: "TRA - Tourism Regulatory Authority",
      image: "/acredited/tra-removebg-preview.png",
      url: "https://www.tourismauthority.go.ke",
      alt: "Tourism Regulatory Authority - Licensed Operator",
    },
    {
      name: "Kenya Wildlife Service",
      image: "/acredited/kenya-wildlife-service_0-removebg-preview.png",
      url: "https://www.kws.go.ke",
      alt: "Kenya Wildlife Service - Wildlife Conservation",
    },
    {
      name: "Amref Flying Doctors",
      image: "/acredited/Amref_Health_Africa_logo-removebg-preview.png",
      url: "https://amref.org",
      alt: "Amref Flying Doctors - Medical Emergency Services",
    },
  ];

  return (
    <Box
      sx={{
        pt: { xs: 0, sm: 0, md: 0 },
        pb: { xs: 0.5, sm: 0.75, md: 1 },
        position: "relative",
        zIndex: 1,
        backgroundColor: "#f9f7f3", // Warm White background
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(139, 115, 85, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: { xs: "visible", sm: "hidden" },
        }}
      >
        <Container maxWidth="xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{
              py: { xs: 4, sm: 5, md: 6 },
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#1a1a1a",
                  fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.75rem" },
                  whiteSpace: "nowrap",
                }}
              >
                OUR ACCREDITATIONS & BOOKING SECURITY
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666666",
                  fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.25rem" },
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.7,
                }}
              >
                Akira Safaris is licensed by the Kenya Tourism
                Regulatory Authority (TRA) and is also affiliated with multiple
                booking platforms.
              </Typography>
            </Box>

            {/* Logos Grid - 2 per row on small screens, single row on large */}
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                justifyContent: { xs: "space-between", sm: "center" },
                alignItems: "center",
                gap: { xs: 1, sm: 2, md: 3 },
                px: { xs: 1, sm: 2, md: 3 },
                overflowX: { xs: "visible", sm: "visible" },
              }}
            >
              {accreditations.map((accreditation, index) => (
                <MotionBox
                  key={index}
                  component="a"
                  href={accreditation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: { xs: "0 0 calc(50% - 4px)", sm: "0 0 auto" },
                    width: { xs: "calc(50% - 4px)", sm: "auto" },
                    minWidth: { xs: "calc(50% - 4px)", sm: "120px", md: "140px" },
                    maxWidth: { xs: "calc(50% - 4px)", sm: "150px", md: "180px" },
                    height: { xs: "60px", sm: "80px", md: "100px" },
                    padding: { xs: 0.5, sm: 1, md: 1.5 },
                    boxSizing: "border-box",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Box
                    component="img"
                    src={accreditation.image}
                    alt={accreditation.alt}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      filter: "grayscale(0%)",
                      transition: "filter 0.3s ease",
                      "&:hover": {
                        filter: "grayscale(0%)",
                      },
                    }}
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = "none";
                      const parent = e.target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div style="text-align: center; color: #666; font-size: 0.85rem;">${accreditation.name}</div>`;
                      }
                    }}
                  />
                </MotionBox>
              ))}
            </Box>
          </MotionBox>
        </Container>
      </Card>
    </Box>
  );
}

