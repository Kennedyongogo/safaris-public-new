import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Alert,
  Button,
  Paper,
  CircularProgress,
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

const MotionBox = motion(Box);

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return path;
    return `/${path}`;
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/admin-users/public/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success || !data.data) {
          throw new Error(data.message || "Team member not found");
        }
        const m = data.data;
        setMember({
          id: m.id,
          name: m.full_name,
          full_name: m.full_name,
          position: m.position || m.role || "Team Member",
          description: m.description,
          image: buildImageUrl(m.profile_image),
          facebook_link: m.facebook_link,
          whatsapp_link: m.whatsapp_link,
          twitter_link: m.twitter_link,
          google_link: m.google_link,
        });
      } catch (err) {
        setError(err.message || "Failed to load team member");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleBack = () => {
    navigate("/team", { state: { scrollToId: id, highlightId: id } });
  };

  const handleSocialClick = (platform) => {
    const socialLink = member?.[`${platform}_link`];
    
    // Only open link if it exists, otherwise do nothing
    if (socialLink) {
      window.open(socialLink, "_blank");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          bgcolor: "#F5F1E8", // Light beige from palette
          background:
            "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
          position: "relative",
          overflow: "hidden",
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
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <CircularProgress sx={{ color: "#B85C38" }} />
        </Box>
      </Box>
    );
  }

  if (error || !member) {
    return (
      <Box
        sx={{
          pt: 0.75,
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
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            pt: { xs: 0.375, sm: 0.375, md: 0.375 },
            py: 2,
          }}
        >
          <Alert severity="error" sx={{ mb: 1.5 }}>
            {error || "Team member not found"}
          </Alert>
          <Button variant="outlined" onClick={handleBack}>
            <ArrowBack sx={{ mr: 1 }} />
            Back to Team
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        pt: 0.75,
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
        <Container 
          maxWidth="xl" 
          sx={{ 
            position: "relative",
            zIndex: 1,
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            pt: { xs: 0.375, sm: 0.375, md: 0.375 },
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back button outside card */}
            <Button
                variant="contained"
                startIcon={<ArrowBack />}
                onClick={handleBack}
                sx={{ 
                  mt: 0.5,
                  mb: 0.5,
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

            <Paper
              elevation={3}
              sx={{
                p: { xs: 1.5, sm: 2, md: 2.5 },
                borderRadius: { xs: 3, md: 4 },
                background: "#FFFFFF",
                border: "1px solid rgba(107, 78, 61, 0.2)", // Medium brown border
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
                    {member?.image ? (
                      <Box
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center 30%",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <Box
                      sx={{
                        display: member?.image ? "none" : "flex",
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
                    {member?.name}
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
                    {member?.position || "Team Member"}
                  </Typography>

                  {/* Description */}
                  {member?.description && (
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.8,
                        color: "text.primary",
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                        textAlign: "left",
                      }}
                    >
                      {member.description}
                    </Typography>
                  )}

                  {/* No description message */}
                  {!member?.description && (
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
                  background: "#FFFFFF",
                  border: "1px solid rgba(107, 78, 61, 0.2)", // Medium brown border
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
                  Connect with {member?.full_name || member?.name}
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
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
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
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
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
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
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
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
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
  );
}
