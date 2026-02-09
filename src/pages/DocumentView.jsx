import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

/**
 * View a public document (e.g. TRA license PDF) by slug.
 * Embeds the document in an iframe so the first load always shows the document,
 * avoiding the bad UX where opening the API URL in a new tab sometimes served
 * the SPA (header + black screen) and only showed the PDF after a hard refresh.
 * TRA license is password-protected; the PDF viewer will prompt for it.
 */
export default function DocumentView() {
  const { slug } = useParams();
  const isTraLicense = (slug || "").toLowerCase() === "tra-license";

  // Same-origin API URL: works with Vite proxy in dev and nginx in production
  const viewUrl = `/api/documents/public/slug/${encodeURIComponent(slug || "")}/view`;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "#1a1a1a",
        zIndex: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isTraLicense && (
        <Box
          sx={{
            flexShrink: 0,
            px: 2,
            py: 1,
            bgcolor: "rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
            This document is password-protected. When prompted by your PDF viewer, enter the password to open it.
          </Typography>
        </Box>
      )}
      <Box
        component="iframe"
        title="Document viewer"
        src={viewUrl}
        sx={{
          flex: 1,
          width: "100%",
          minHeight: 0,
          border: "none",
          display: "block",
        }}
      />
    </Box>
  );
}
