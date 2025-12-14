import React from "react";
import { Box } from "@mui/material";
import TravelPackages from "../components/Home/TravelPackages";

export default function Packages() {
  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 0.75,
        px: 0,
        bgcolor: "#F5F1E8", // Light beige from palette
        background:
          "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "auto",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)", // Rust and medium brown
          zIndex: 0,
        },
      }}
    >
      <TravelPackages />
    </Box>
  );
}

