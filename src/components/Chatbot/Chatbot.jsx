import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Floating WhatsApp entry point (replace href with the real link later).
const Chatbot = () => {
  const placeholderLink = "https://wa.me/"; // TODO: update with the actual WhatsApp link/number

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1001,
      }}
    >
      <Tooltip title="Chat on WhatsApp">
        <IconButton
          component="a"
          href={placeholderLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "#25D366",
            color: "#fff",
            boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#1EBE57",
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Chatbot;

