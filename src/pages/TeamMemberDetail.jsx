import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Alert,
  Button,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Person,
  ArrowBack,
  Share,
  Facebook,
  WhatsApp,
  Twitter,
  Google,
} from "@mui/icons-material";
import { teamMembers } from "../data/teamMembers";

const MotionBox = motion(Box);

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const teamMember = teamMembers.find((member) => String(member.id) === String(id));

  const handleBack = () => {
    navigate("/team", { state: { scrollToId: id, highlightId: id } });
  };

  const handleSocialClick = (platform) => {
    const socialLink = teamMember?.[`${platform}_link`];
    
    // Only open link if it exists, otherwise do nothing
    if (socialLink) {
      window.open(socialLink, "_blank");
    }
  };

  if (!teamMember) {
    return (
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Alert severity="error" sx={{ mb: 1.5 }}>
          Team member not found
        </Alert>
        <Button variant="outlined" onClick={handleBack}>
          <ArrowBack sx={{ mr: 1 }} />
          Back to Team
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Global background styles */}
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          html {
            height: 100%;
            overflow-y: scroll;
            scroll-behavior: smooth;
          }
          html, body, #root {
            background: #f8f9fa !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body {
            min-height: 100%;
            overflow-x: hidden;
          }
          #root {
            min-height: 100vh;
          }
        `}
      </style>
      
      <Box 
        sx={{ 
          minHeight: "auto", 
          position: "relative",
          zIndex: 1,
          background: "transparent",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 1.5, md: 2 }, px: { xs: 0.25, sm: 0.375 }, position: "relative", zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back button outside card */}
            <Box sx={{ mb: 1.5 }}>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                onClick={handleBack}
                sx={{ 
                  background: "linear-gradient(45deg, #B85C38 30%, #C97A5A 90%)",
                  color: "white",
                  fontWeight: 600,
                  px: 2.25,
                  py: 0.6,
                  "&:hover": {
                    background: "linear-gradient(45deg, #8B4225 30%, #B85C38 90%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(184, 92, 56, 0.3)",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Back to Team
              </Button>
            </Box>

            <Paper
              elevation={3}
              sx={{
                p: { xs: 1.5, sm: 2, md: 2.5 },
                borderRadius: { xs: 3, md: 4 },
                background: "#ffffff",
                border: "1px solid #e0e0e0",
              }}
            >
              {/* Header Section */}
              <Box sx={{ mb: 2 }}>
                {/* Profile Picture - Full Width */}
                <Box sx={{ mb: 0 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: 400, sm: 500, md: 600 },
                      borderRadius: { xs: 3, md: 4 },
                      overflow: "hidden",
                      border: "6px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: "-3px",
                        borderRadius: { xs: 3, md: 4 },
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        zIndex: -1,
                      }
                    }}
                  >
                    {teamMember.image ? (
                      <Box
                        component="img"
                        src={teamMember.image}
                        alt={teamMember.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <Box
                      sx={{
                        display: teamMember.image ? "none" : "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        color: "white",
                      }}
                    >
                      <Person sx={{ fontSize: { xs: "5rem", sm: "6.5rem", md: "8rem" }, mb: 1 }} />
                      <Typography variant="h4" sx={{ fontWeight: 600, fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.7rem" } }}>
                        No Photo Available
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Profile Information - No Card, Left Aligned */}
                <Box>
                  {/* Name */}
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{ 
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.85rem" },
                      textAlign: "left",
                      mb: 0,
                    }}
                  >
                    {teamMember.name}
                  </Typography>

                  {/* Position */}
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#4caf50",
                      fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
                      fontWeight: 600,
                      textAlign: "left",
                      mb: 1.5,
                    }}
                  >
                    {teamMember.position || "Team Member"}
                  </Typography>

                  {/* Description */}
                  {teamMember.description && (
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.8,
                        color: "text.primary",
                        fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                        textAlign: "left",
                      }}
                    >
                      {teamMember.description}
                    </Typography>
                  )}

                  {/* No description message */}
                  {!teamMember.description && (
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.8,
                        color: "text.secondary",
                        fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                        textAlign: "left",
                        fontStyle: "italic",
                      }}
                    >
                      More information about this team member will be available soon.
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Share Section */}
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 1.5, sm: 2 }, 
                  borderRadius: { xs: 3, md: 4 },
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "#667eea",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.45rem" },
                  }}
                >
                  <Share sx={{ fontSize: { xs: "1.2rem", md: "1.35rem" } }} />
                  Connect with {teamMember?.full_name}
                </Typography>
                
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    startIcon={<Facebook />}
                    onClick={() => handleSocialClick("facebook")}
                    sx={{
                      backgroundColor: "#1877f2",
                      "&:hover": { backgroundColor: "#166fe5" },
                      px: 1.5,
                      py: 0.75,
                      minWidth: 100,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                    }}
                  >
                    Facebook
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<WhatsApp />}
                    onClick={() => handleSocialClick("whatsapp")}
                    sx={{
                      backgroundColor: "#25d366",
                      "&:hover": { backgroundColor: "#22c55e" },
                      px: 1.5,
                      py: 0.75,
                      minWidth: 100,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                    }}
                  >
                    WhatsApp
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<Twitter />}
                    onClick={() => handleSocialClick("twitter")}
                    sx={{
                      backgroundColor: "#1da1f2",
                      "&:hover": { backgroundColor: "#1a91da" },
                      px: 1.5,
                      py: 0.75,
                      minWidth: 100,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                    }}
                  >
                    X
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<Google />}
                    onClick={() => handleSocialClick("google")}
                    sx={{
                      backgroundColor: "#db4437",
                      "&:hover": { backgroundColor: "#c23321" },
                      px: 1.5,
                      py: 0.75,
                      minWidth: 100,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                    }}
                  >
                    Google
                  </Button>
                </Box>
              </Paper>
            </Paper>

          </MotionBox>
        </Container>
      </Box>
    </>
  );
}
