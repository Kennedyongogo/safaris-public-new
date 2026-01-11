import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Paper,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBack from "@mui/icons-material/ArrowBack";

export default function Staff() {
  const navigate = useNavigate();
  const location = useLocation();
  const [members, setMembers] = useState([]);
  const [membersError, setMembersError] = useState(null);
  const [membersLoading, setMembersLoading] = useState(false);
  const [highlightId, setHighlightId] = useState(null);

  const buildImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return path;
    return `/${path}`;
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setMembersLoading(true);
        setMembersError(null);
        const res = await fetch("/api/admin-users/public?limit=100");
        const data = await res.json();
        if (!res.ok || !data.success || !Array.isArray(data.data)) {
          throw new Error(data.message || "Failed to load team");
        }
        const normalized = data.data.map((m) => ({
          id: m.id,
          name: m.full_name,
          role: m.position || m.role || "Team Member",
          description: m.description,
          image: buildImageUrl(m.profile_image),
        }));
        setMembers(normalized);
      } catch (err) {
        setMembersError(err.message || "Failed to load team");
      } finally {
        setMembersLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // When coming back from detail, scroll to the originating card
  useEffect(() => {
    const targetId = location.state?.scrollToId;
    const highlight = location.state?.highlightId;
    if (!targetId) return;

    const scrollToCard = () => {
      const cardEl = document.querySelector(`[data-member-id="${targetId}"]`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setTimeout(scrollToCard, 100);
      }
    };

    requestAnimationFrame(scrollToCard);
    if (highlight) {
      setHighlightId(highlight);
    }
    // remove highlight after 2 seconds
    const clear = highlight
      ? setTimeout(() => setHighlightId(null), 2000)
      : null;
    // Clear state so it doesn't re-run on next renders
    navigate("/staff", { replace: true, state: null });
    return () => {
      if (clear) clearTimeout(clear);
    };
  }, [location.state, navigate]);

  return (
    <Box
      sx={{
        pt: 0.75,
        pb: 0.75,
        px: 0,
        bgcolor: "#f9f7f3", // Warm White from palette
        background:
          "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(249, 247, 243, 0.95) 100%)",
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
            "radial-gradient(circle at 20% 80%, rgba(200, 169, 126, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 115, 85, 0.08) 0%, transparent 50%)", // Accent Gold and Secondary Brown
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
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/team")}
          sx={{
            mt: 0.5,
            mb: 0.5,
            backgroundColor: "#c8a97e", // Accent Gold
            color: "white",
            fontWeight: 600,
            outline: "none",
            "&:focus": { outline: "none", boxShadow: "none" },
            "&:focus-visible": { outline: "none", boxShadow: "none" },
            "&:hover": {
              backgroundColor: "#8b7355", // Secondary Brown
              color: "white",
            },
          }}
        >
          Back to Team
        </Button>

        <Paper
          elevation={3}
          sx={{
            py: { xs: 0.75, sm: 1, md: 1.25 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "#FFFFFF",
            border: "1px solid rgba(139, 115, 85, 0.2)", // Secondary Brown border
            minHeight: "auto",
            height: "auto",
            overflow: "hidden",
          }}
        >
          {/* Meet Our Team Section */}
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4, md: 5 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#1a1a1a", // Primary Black from palette
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.125rem" },
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Get to know the dedicated professionals who make Akira Safaris an
              unforgettable experience.
            </Typography>
          </Box>

          {/* Staff Members Grid - 4 cards per row */}
          {membersError && (
            <Typography
              variant="body1"
              sx={{ color: "error.main", textAlign: "center", mb: 2 }}
            >
              {membersError}
            </Typography>
          )}
          {!membersError && membersLoading && (
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", textAlign: "center", mb: 2 }}
            >
              Loading team...
            </Typography>
          )}
          {!membersError && !membersLoading && members.length === 0 && (
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", textAlign: "center", mb: 2 }}
            >
              Team coming soon.
            </Typography>
          )}
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
          >
            {members.map((member) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}>
                <Card
                  data-member-id={member.id}
                  sx={{
                    overflow: "hidden",
                    border: "1px solid rgba(139, 115, 85, 0.15)",
                    borderRadius: 3,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: "linear-gradient(to bottom, #FFFFFF 0%, #f9f7f3 100%)",
                    boxShadow:
                      highlightId && String(highlightId) === String(member.id)
                        ? "0 0 0 3px rgba(200, 169, 126, 0.6), 0 12px 40px rgba(200, 169, 126, 0.25)"
                        : "0 2px 8px rgba(26, 26, 26, 0.08)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 32px rgba(26, 26, 26, 0.15)",
                      borderColor: "rgba(200, 169, 126, 0.3)",
                    },
                  }}
                >
                  {/* Card Content */}
                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5, md: 2.5 },
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    {/* Circular Profile Image */}
                    <Box
                      sx={{
                        width: { xs: "120px", sm: "140px", md: "150px" },
                        height: { xs: "120px", sm: "140px", md: "150px" },
                        borderRadius: "50%",
                        overflow: "hidden",
                        backgroundColor: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        mb: 2,
                        border: "3px solid rgba(200, 169, 126, 0.2)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "rgba(200, 169, 126, 0.4)",
                          boxShadow: "0 6px 30px rgba(200, 169, 126, 0.2)",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {member.image ? (
                        <Box
                          component="img"
                          src={member.image}
                          alt={member.name}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
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
                          display: member.image ? "none" : "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          color: "#999",
                        }}
                      >
                        <PersonIcon sx={{ fontSize: "4rem" }} />
                      </Box>
                    </Box>

                    {/* Role Label */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        color: "#c8a97e",
                        mb: 0.5,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {member.role}
                    </Typography>

                    {/* Name */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "#1a1a1a",
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {member.name}
                    </Typography>

                    {/* More About Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/team/${member.id}`);
                      }}
                      sx={{
                        backgroundColor: "#c8a97e",
                        color: "#fff",
                        borderRadius: 2,
                        px: 2,
                        py: 0.75,
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        textTransform: "none",
                        fontWeight: 600,
                        mt: "auto",
                        boxShadow: "0 4px 12px rgba(200, 169, 126, 0.3)",
                        "&:hover": {
                          backgroundColor: "#8b7355",
                          boxShadow: "0 6px 20px rgba(200, 169, 126, 0.4)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                        "&:focus": {
                          outline: "none",
                        },
                        "&:focus-visible": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

