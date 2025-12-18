import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Paper,
  Chip,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  LocationOn,
  Map as MapIcon,
  NaturePeople,
  Hotel,
  CalendarToday,
  CheckCircle,
} from "@mui/icons-material";

export default function CampLodgeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [lodge, setLodge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildImageUrl = (path) => {
    if (!path) return "/placeholder.jpg";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return path;
    return `/${path}`;
  };

  useEffect(() => {
    const fetchLodge = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if lodge data was passed via state (from list page)
        const fromState = location.state?.lodge;
        if (fromState?.id) {
          setLodge(fromState);
          setLoading(false);
          return;
        }

        // Fetch from API
        const response = await fetch(`/api/lodges/public/${id}`);
        const data = await response.json();

        if (!response.ok || !data.success || !data.data) {
          throw new Error(data.message || "Lodge not found");
        }

        // Normalize the data
        const normalizedLodge = {
          ...data.data,
          images: Array.isArray(data.data.images) && data.data.images.length > 0
            ? data.data.images
            : [data.data.image].filter(Boolean),
          campType: Array.isArray(data.data.campType) ? data.data.campType : [],
          openMonths: Array.isArray(data.data.openMonths) ? data.data.openMonths : [],
          image: data.data.images && data.data.images.length > 0 ? data.data.images[0] : data.data.image,
        };

        setLodge(normalizedLodge);
      } catch (err) {
        setError(err.message || "Failed to load lodge");
      } finally {
        setLoading(false);
      }
    };

    fetchLodge();
  }, [id, location.state]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !lodge) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: { xs: 2, sm: 3 },
            border: "1px solid rgba(107, 78, 61, 0.2)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Lodge not found
          </Typography>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "This lodge could not be found."}
          </Alert>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/camp-lodges")}
            sx={{
              backgroundColor: "#B85C38",
              color: "white",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#8B4225" },
            }}
          >
            Back to Camps & Lodges
          </Button>
        </Paper>
      </Container>
    );
  }

  const gallery = Array.isArray(lodge.images) && lodge.images.length > 0
    ? lodge.images
    : [lodge.image].filter(Boolean);

  const campTypes = lodge.campType || [];
  const openMonths = lodge.openMonths || [];

  return (
    <Box
      sx={{
        pt: 0.75,
        pb: 0.75,
        px: 0,
        bgcolor: "#F5F1E8",
        background:
          "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
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
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/camp-lodges")}
          sx={{
            mt: 0.5,
            mb: 0.5,
            backgroundColor: "#B85C38",
            color: "white",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#8B4225", color: "white" },
            outline: "none",
            "&:focus": { outline: "none", boxShadow: "none" },
            "&:focus-visible": { outline: "none", boxShadow: "none" },
          }}
        >
          Back to Camps & Lodges
        </Button>

        <Paper
          elevation={3}
          sx={{
            py: { xs: 0.75, sm: 1, md: 1.25 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "#FFFFFF",
            border: "1px solid rgba(107, 78, 61, 0.2)",
            overflow: "hidden",
          }}
        >
          {/* Hero Image */}
          <Box
            sx={{
              width: "100%",
              height: { xs: "240px", sm: "320px", md: "420px" },
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#f5f5f5",
              borderRadius: { xs: 2, md: 3 },
            }}
          >
            <Box
              component="img"
              src={buildImageUrl(lodge.image)}
              alt={lodge.name}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=600&fit=crop";
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background:
                  "linear-gradient(to top, rgba(61, 40, 23, 0.8), rgba(184, 92, 56, 0.25), transparent)",
                p: { xs: 1, sm: 1.5 },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {lodge.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.5 }}>
                <Chip
                  icon={<LocationOn />}
                  label={lodge.location}
                  sx={{
                    backgroundColor: "#B85C38",
                    color: "white",
                    "& .MuiChip-icon": { color: "white" },
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<MapIcon />}
                  label={lodge.destination}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: "#3D2817",
                    color: "#3D2817",
                    "& .MuiChip-icon": { color: "#3D2817" },
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
            {/* Quick facts */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 1.5,
              }}
            >
              {campTypes.map((type) => (
                <Chip
                  key={type}
                  icon={<Hotel />}
                  label={type}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: "#6B4E3D",
                    color: "#6B4E3D",
                    "& .MuiChip-icon": { color: "#B85C38" },
                  }}
                />
              ))}
              {openMonths.length > 0 && (
                <Chip
                  icon={<CalendarToday />}
                  label={`Open: ${openMonths.join(", ")}`}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: "#6B4E3D",
                    color: "#3D2817",
                    "& .MuiChip-icon": { color: "#6B4E3D" },
                  }}
                />
              )}
            </Box>

            {/* Description */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 0.75,
                color: "#3D2817",
                fontSize: { xs: "1.25rem", md: "1.4rem" },
              }}
            >
              About this camp
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "text.secondary",
                mb: 1.5,
                fontSize: { xs: "1rem", sm: "1.05rem" },
                fontWeight: 600,
              }}
            >
              {lodge.description}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 1.25, sm: 1.5 },
                    height: "100%",
                    border: "1px solid rgba(107, 78, 61, 0.2)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 0.75,
                      color: "#3D2817",
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                    }}
                  >
                    Why you’ll love it
                  </Typography>
                  {[
                    "Prime wildlife setting with year-round sightings.",
                    "Intimate camp size for a private, relaxed feel.",
                    "Guides experienced in photography and families.",
                  ].map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <CheckCircle sx={{ color: "#B85C38", fontSize: 18 }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontWeight: 600 }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 1.25, sm: 1.5 },
                    height: "100%",
                    border: "1px solid rgba(107, 78, 61, 0.2)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 0.75,
                      color: "#3D2817",
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                    }}
                  >
                    Experience highlights
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5 }}
                  >
                    Game drives, walks, sundowners, and stargazing are guest favorites. Ask for a private vehicle or a specialist photographic guide.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontWeight: 600 }}
                  >
                    Families can request flexible mealtimes and gentle drives; couples often book a private bush dinner.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2, borderColor: "rgba(107, 78, 61, 0.2)" }} />

            {/* Sample day & practicals */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 1.25, sm: 1.5 },
                    height: "100%",
                    border: "1px solid rgba(107, 78, 61, 0.2)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 0.75,
                      color: "#3D2817",
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                    }}
                  >
                    A day at camp
                  </Typography>
                  {[
                    "Dawn: Coffee, then game drive to catch predators and sunrise light.",
                    "Late morning: Bush breakfast or brunch back at camp, pool/siesta time.",
                    "Afternoon: Head out with sundowners; track cats, elephants, or a river crossing.",
                    "Evening: Night drive (where allowed) or stars by the fire after dinner.",
                  ].map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <CheckCircle sx={{ color: "#B85C38", fontSize: 18, mt: "2px" }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontWeight: 600 }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 1.25, sm: 1.5 },
                    height: "100%",
                    border: "1px solid rgba(107, 78, 61, 0.2)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 0.75,
                      color: "#3D2817",
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                    }}
                  >
                    Essentials
                  </Typography>
                  {[
                    "Access: Nearest airstrip within ~45–90 min by road; arranged transfers.",
                    "Rooms: En-suite tents/suites with decks; solar power and charging.",
                    "Dining: Chef-led, dietary needs welcomed; bush breakfasts/sundowners common.",
                    "For families & couples: Flexible mealtimes; private dinners on request.",
                    openMonths.length
                      ? `Best seasons: ${openMonths.join(", ")}`
                      : "Best seasons: year-round with peak wildlife in dry months.",
                  ].map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <CheckCircle sx={{ color: "#B85C38", fontSize: 18, mt: "2px" }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontWeight: 600 }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>

            {/* Amenities */}
            <Paper
              elevation={1}
              sx={{
                p: { xs: 1.25, sm: 1.5 },
                mb: 2,
                border: "1px solid rgba(107, 78, 61, 0.2)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 0.75,
                  color: "#3D2817",
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                }}
              >
                Amenities & comforts
              </Typography>
              <Grid container spacing={1}>
                {[
                  "Spacious tents/suites with en-suite bathrooms",
                  "Private decks with bush or river views",
                  "24/7 solar power with charging points",
                  "Laundry service",
                  "Plunge pool or shaded lounge (varies by camp)",
                  "Wi‑Fi in main area (where available) for light use",
                  "In-room coffee/tea and filtered water",
                  "On-site first-aid and radio/phone comms",
                ].map((item, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                      <CheckCircle sx={{ color: "#6B7D47", fontSize: 18, mt: "2px" }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontWeight: 600 }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Gallery */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#3D2817",
                fontSize: { xs: "1.1rem", md: "1.2rem" },
              }}
            >
              Gallery
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {gallery.slice(0, 6).map((img, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card
                    elevation={2}
                    sx={{
                      height: "100%",
                      overflow: "hidden",
                      border: "1px solid rgba(107, 78, 61, 0.15)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={buildImageUrl(img)}
                      alt={`${lodge.name} gallery ${idx + 1}`}
                      sx={{ height: 180, objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop";
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              size="large"
              startIcon={<NaturePeople />}
              onClick={() =>
                navigate("/plan", {
                  state: { from: "camp-lodge-detail", lodgeId: lodge.id },
                })
              }
              sx={{
                backgroundColor: "#B85C38",
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "1rem", md: "1.05rem" },
                px: 3,
                py: 1,
                "&:hover": { backgroundColor: "#8B4225" },
                outline: "none",
                "&:focus": { outline: "none", boxShadow: "none" },
                "&:focus-visible": { outline: "none", boxShadow: "none" },
              }}
            >
              Plan this stay
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}


