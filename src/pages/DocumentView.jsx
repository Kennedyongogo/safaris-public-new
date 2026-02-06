import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

/**
 * View a public document (e.g. TRA license PDF) by slug.
 * Embeds the document in an iframe so the first load always shows the document,
 * avoiding the bad UX where opening the API URL in a new tab sometimes served
 * the SPA (header + black screen) and only showed the PDF after a hard refresh.
 */
export default function DocumentView() {
  const { slug } = useParams();

  // Same-origin API URL: works with Vite proxy in dev and nginx in production
  const viewUrl = `/api/documents/public/slug/${encodeURIComponent(slug || "")}/view`;

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 56, sm: 64 }, // Below app header
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "#1a1a1a",
        zIndex: 0,
      }}
    >
      <Box
        component="iframe"
        title="Document viewer"
        src={viewUrl}
        sx={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </Box>
  );
}
