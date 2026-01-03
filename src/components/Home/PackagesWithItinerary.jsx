import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  ImageList,
  ImageListItem,
  Divider,
  IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LocationOn,
  AccessTime,
  CheckCircle,
  ArrowBack,
  ArrowForward,
  Hotel,
  Restaurant,
  DirectionsCar,
  CameraAlt,
  Info,
  Schedule,
  People,
  Star,
  AttachMoney,
  Close,
} from "@mui/icons-material";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke, Fill, Circle as CircleStyle, Text } from "ol/style";

const MotionBox = motion(Box);

// Package data will be fetched from API

const chipStyleByType = {
  "All-inclusive": {
    bg: "#E8F5E9",
    color: "#1B5E20",
    border: "1px solid #A5D6A7",
  },
  "Full board": {
    bg: "#E3F2FD",
    color: "#0D47A1",
    border: "1px solid #90CAF9",
  },
  "Half board": {
    bg: "#FFF3E0",
    color: "#E65100",
    border: "1px solid #FFCC80",
  },
  "Bed & breakfast": {
    bg: "#F3E5F5",
    color: "#6A1B9A",
    border: "1px solid #CE93D8",
  },
};

const PackagesWithItinerary = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedStage, setSelectedStage] = useState(0);
  const [viewMode, setViewMode] = useState("packages"); // "packages" or "itinerary"
  const [loadingPackage, setLoadingPackage] = useState(null); // Track which package is being loaded

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorSourceRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/packages/public?limit=50'); // Get more packages
        const result = await response.json();

        if (result.success) {
          setPackages(result.data);
        } else {
          throw new Error(result.message || 'Failed to load packages');
        }
      } catch (err) {
        setError(err.message || 'Failed to load packages');
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || viewMode !== "itinerary") return;

    if (mapInstance.current) {
      mapInstance.current.setTarget(undefined);
      mapInstance.current = null;
      setMapInitialized(false);
    }

    const osmLayer = new TileLayer({
      source: new OSM({
        preload: 4,
        crossOrigin: "anonymous",
      }),
    });

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: fromLonLat([36, -2]),
        zoom: 6,
      }),
      controls: defaultControls().extend([new ScaleLine()]),
    });

    // Add click interaction for markers
    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (feature && feature.get("type") === "stage") {
        const stageIndex = feature.get("stageIndex");
        if (selectedPackage && selectedPackage.routeStages && selectedPackage.routeStages[stageIndex]) {
          const stageData = selectedPackage.routeStages[stageIndex];
          setSelectedStage(stageIndex);
          setPopupData(stageData);

          // Convert map coordinates to pixel coordinates for popup positioning
          const pixel = map.getPixelFromCoordinate(
            feature.getGeometry().getCoordinates()
          );
          setPopupPosition({ x: pixel[0], y: pixel[1] });
        }
      } else {
        setPopupData(null);
        setPopupPosition(null);
      }
    });

    // Add hover interaction for cursor change
    map.on("pointermove", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );
      map.getTarget().style.cursor = feature && feature.get("type") === "stage" ? "pointer" : "";
    });

    mapInstance.current = map;
    setMapInitialized(true);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
        setMapInitialized(false);
      }
    };
  }, [viewMode]);

  // Update Map when package/stage changes
  useEffect(() => {
    if (!mapInitialized || !vectorSourceRef.current || !mapInstance.current || !selectedPackage || !selectedPackage.routeStages) return;

    const vectorSource = vectorSourceRef.current;
    vectorSource.clear();

    const route = selectedPackage.routeStages;
    if (route.length === 0) return;

    const routeCoordinates = route.map((stage) => fromLonLat([parseFloat(stage.longitude), parseFloat(stage.latitude)]));
    const routeLine = new LineString(routeCoordinates);
    const routeFeature = new Feature({
      geometry: routeLine,
      type: "route",
    });

    routeFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "#5D4037",
          width: 3,
          lineDash: [10, 5],
        }),
      })
    );

    vectorSource.addFeature(routeFeature);

    route.forEach((stage, index) => {
      const point = new Point(fromLonLat([parseFloat(stage.longitude), parseFloat(stage.latitude)]));
      const feature = new Feature({
        geometry: point,
        type: "stage",
        stageIndex: index,
      });

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 12,
            fill: new Fill({
              color: index === selectedStage ? "#B85C38" : "#5D4037",
            }),
            stroke: new Stroke({
              color: "#ffffff",
              width: 2,
            }),
          }),
          text: new Text({
            text: `${index + 1}`,
            fill: new Fill({
              color: "#ffffff",
            }),
            font: "bold 12px sans-serif",
            offsetY: 2,
          }),
        })
      );

      vectorSource.addFeature(feature);
    });

    const extent = vectorSource.getExtent();
    if (extent && extent[0] !== Infinity) {
      mapInstance.current.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
        maxZoom: 8,
      });
    }
  }, [selectedPackage, selectedStage, mapInitialized]);

  const handlePackageSelect = async (pkg) => {
    // Prevent multiple clicks on the same package
    if (loadingPackage === pkg.id) return;

    try {
      setLoadingPackage(pkg.id);

      // Immediately switch to itinerary view for better UX
      setSelectedPackage(pkg);
      setSelectedStage(0);
      setViewMode("itinerary");

      // If we already have route stages, we're done
      if (pkg.routeStages && pkg.routeStages.length > 0) {
        setLoadingPackage(null);
        return;
      }

      // Otherwise, fetch the detailed package with route stages
      const response = await fetch(`/api/packages/public/${pkg.id}`);
      const result = await response.json();

      if (result.success) {
        // The API returns the complete package with routeStages included
        setSelectedPackage(result.data);
        // selectedStage and viewMode are already set
      } else {
        throw new Error(result.message || 'Failed to load package details');
      }
    } catch (err) {
      console.error('Error fetching package details:', err);
      // If API fails, keep the basic package data but set routeStages to empty array
      setSelectedPackage({
        ...pkg,
        routeStages: []
      });
    } finally {
      setLoadingPackage(null);
    }
  };

  const handleBackToPackages = () => {
    setViewMode("packages");
    setSelectedPackage(null);
    setSelectedStage(0);
  };

  const handleStageChange = (stageIndex) => {
    setSelectedStage(stageIndex);
    setPopupData(null);
    setPopupPosition(null);
    if (mapInstance.current && selectedPackage?.routeStages?.[stageIndex]) {
      const stage = selectedPackage.routeStages[stageIndex];
      const view = mapInstance.current.getView();
      view.animate({
        center: fromLonLat([parseFloat(stage.longitude), parseFloat(stage.latitude)]),
        zoom: 8,
        duration: 1000,
      });
    }
  };

  const handleNextStage = () => {
    if (selectedPackage?.routeStages && selectedStage < selectedPackage.routeStages.length - 1) {
      handleStageChange(selectedStage + 1);
    }
  };

  const handlePreviousStage = () => {
    if (selectedStage > 0) {
      handleStageChange(selectedStage - 1);
    }
  };

  const handleBookNow = (pkg) => {
    // Use package ID for booking
    navigate("/plan", { state: { packageId: pkg.id } });
  };

  return (
    <Box
      sx={{
        pt: { xs: 0.5, sm: 0.75, md: 1 },
        pb: { xs: 0.5, sm: 0.75, md: 0.75 },
        position: "relative",
        zIndex: 1,
        background: "transparent",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 0.75, sm: 0.75, md: 0.75 },
          pt: { xs: 0.375, sm: 0.375, md: 0.375 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            py: { xs: 0.5, sm: 0.625, md: 0.75 },
            px: { xs: 0.75, sm: 0.75, md: 0.75 },
            borderRadius: { xs: 3, md: 4 },
            background: "white",
            border: "1px solid #e0e0e0",
            minHeight: "auto",
            height: "auto",
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" py={8}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="error" gutterBottom>
                Failed to load packages
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {error}
              </Typography>
            </Box>
          ) : viewMode === "packages" ? (
            <>
              {/* Header Section */}
              <Box sx={{ mb: { xs: 0.5, sm: 0.625, md: 0.75 }, textAlign: "center" }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 0.25, md: 0.375 },
                    color: "#5D4037",
                    fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  }}
                >
                  Travel Packages
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 0.25, md: 0.375 },
                    color: "text.primary",
                    fontSize: { xs: "1.05rem", md: "1.15rem" },
                    lineHeight: 1.7,
                    maxWidth: "800px",
                    mx: "auto",
                  }}
                >
                  Select a package to view its detailed itinerary, route map, and day-by-day experiences
                </Typography>
              </Box>

              {/* Package Cards */}
              <Grid container spacing={{ xs: 1, sm: 1.25, md: 1.5 }} justifyContent="center">
                {packages.map((pkg, index) => (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}
                    key={pkg.id}
                  >
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            height: isMobile ? "200px" : "240px",
                            width: "100%",
                            overflow: "hidden",
                            backgroundColor: "#f5f5f5",
                          }}
                        >
                          <Box
                            component="img"
                            src={pkg.image}
                            alt={pkg.title}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                            onError={(e) => {
                              e.target.src = "/IMG-20251210-WA0070.jpg";
                            }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                            }}
                          >
                            <Star sx={{ fontSize: 16, color: "#FFA500" }} />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "#5D4037",
                              }}
                            >
                              {pkg.rating}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              left: 12,
                            }}
                          >
                            <Chip
                              label={pkg.type}
                              size="small"
                              sx={{
                                backgroundColor: chipStyleByType[pkg.type]?.bg || "#5D4037",
                                color: chipStyleByType[pkg.type]?.color || "white",
                                border: chipStyleByType[pkg.type]?.border || "none",
                                fontWeight: 700,
                                fontSize: "0.8rem",
                                letterSpacing: 0.2,
                              }}
                            />
                          </Box>
                        </Box>

                        <CardContent
                          sx={{
                            flexGrow: 1,
                            p: { xs: 2, sm: 2.5 },
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box sx={{ mb: 1.5 }}>
                            <Typography
                              variant="h6"
                              component="h3"
                              sx={{
                                fontWeight: 700,
                                mb: 1,
                                color: "text.primary",
                                fontSize: { xs: "1.2rem", sm: "1.35rem" },
                              }}
                            >
                              {pkg.title}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: 0.5,
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 700,
                                  color: "#5D4037",
                                  fontSize: { xs: "1.5rem", sm: "1.7rem" },
                                }}
                              >
                                {pkg.price}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  fontSize: "0.85rem",
                                  fontWeight: 600,
                                }}
                              >
                                {pkg.pricePerPerson}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 1.5,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              lineHeight: 1.5,
                              fontSize: { xs: "0.95rem", sm: "1.05rem" },
                              fontWeight: 600,
                            }}
                          >
                            {pkg.description}
                          </Typography>

                          <Box sx={{ mb: 1.5 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.75,
                                mb: 0.75,
                              }}
                            >
                              <Schedule
                                sx={{
                                  fontSize: { xs: 14, sm: 16 },
                                  color: "#5D4037",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                                  color: "text.secondary",
                                  fontWeight: 600,
                                }}
                              >
                                {pkg.duration}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.75,
                              }}
                            >
                              <People
                                sx={{
                                  fontSize: { xs: 14, sm: 16 },
                                  color: "#5D4037",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                                  color: "text.secondary",
                                  fontWeight: 600,
                                }}
                              >
                                {pkg.groupSize}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mb: 2, flexGrow: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                color: "#5D4037",
                                mb: 0.5,
                                display: "block",
                              }}
                            >
                              Highlights:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                                <Chip
                                  key={idx}
                                  label={highlight}
                                  size="small"
                                  sx={{
                                    fontSize: "0.8rem",
                                    height: "22px",
                                    backgroundColor: "#f5f5f5",
                                    color: "#5D4037",
                                    fontWeight: 700,
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              mt: "auto",
                            }}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              fullWidth
                              disabled={loadingPackage === pkg.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePackageSelect(pkg);
                              }}
                              sx={{
                                borderColor: "#5D4037",
                                color: "#5D4037",
                                fontSize: "0.95rem",
                                fontWeight: 700,
                                py: 0.75,
                                outline: "none",
                                "&:focus": {
                                  outline: "none",
                                },
                                "&:focus-visible": {
                                  outline: "none",
                                  boxShadow: "none",
                                },
                                "&:hover": {
                                  borderColor: "#4E342E",
                                  backgroundColor: "#5D4037",
                                  color: "white",
                                },
                              }}
                            >
                              {loadingPackage === pkg.id ? "Loading..." : "View Itinerary"}
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              fullWidth
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookNow(pkg);
                              }}
                              endIcon={<ArrowForward />}
                              sx={{
                                backgroundColor: "#5D4037",
                                color: "white",
                                fontSize: "0.95rem",
                                fontWeight: 700,
                                py: 0.75,
                                outline: "none",
                                "&:focus": {
                                  outline: "none",
                                },
                                "&:focus-visible": {
                                  outline: "none",
                                  boxShadow: "none",
                                },
                                "&:hover": {
                                  backgroundColor: "#4E342E",
                                },
                              }}
                            >
                              Book Now
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : selectedPackage ? (
            <>
              {/* Back Button */}
              <Button
                startIcon={<ArrowBack />}
                onClick={handleBackToPackages}
                sx={{
                  mb: 2,
                  color: "#5D4037",
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(93, 64, 55, 0.1)",
                  },
                }}
              >
                Back to Packages
              </Button>

              {/* Package Header */}
              <Box sx={{ mb: { xs: 1, md: 1.5 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 0.5, md: 0.75 },
                    color: "#5D4037",
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                  }}
                >
                  {selectedPackage.title}
                  {loadingPackage === selectedPackage.id && (
                    <Typography component="span" sx={{ ml: 2, fontSize: "0.8em", color: "text.secondary" }}>
                      (Loading details...)
                    </Typography>
                  )}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AttachMoney sx={{ color: "#5D4037" }} />
                    <Typography variant="h6" sx={{ color: "#5D4037", fontWeight: 700 }}>
                      {selectedPackage.price} {selectedPackage.pricePerPerson}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Schedule sx={{ color: "#5D4037" }} />
                    <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {selectedPackage.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <People sx={{ color: "#5D4037" }} />
                    <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {selectedPackage.groupSize}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => handleBookNow(selectedPackage)}
                  sx={{
                    backgroundColor: "#5D4037",
                    color: "white",
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:hover": {
                      backgroundColor: "#4E342E",
                    },
                  }}
                >
                  Book This Package
                </Button>
              </Box>

              {/* Timeline Navigation */}
              <Box sx={{ mt: 1.5, mb: 1.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "#5D4037",
                    fontSize: { xs: "1.2rem", md: "1.3rem" },
                  }}
                >
                  Tour Timeline
                </Typography>

                {selectedPackage?.routeStages && Array.isArray(selectedPackage.routeStages) && selectedPackage.routeStages.length > 0 ? (
                  <Stepper
                    activeStep={selectedStage}
                    orientation={isMobile ? "vertical" : "horizontal"}
                    sx={{
                      "& .MuiStepIcon-root": {
                        color: "#d0d0d0",
                        "&.Mui-active": {
                          color: "#5D4037",
                        },
                        "&.Mui-completed": {
                          color: "#B85C38",
                        },
                      },
                    }}
                  >
                      {selectedPackage.routeStages.map((stage, index) => (
                        <Step key={index}>
                          <StepButton onClick={() => handleStageChange(index)}>
                            <StepLabel>
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: index === selectedStage ? 700 : 500,
                                    color: index === selectedStage ? "#5D4037" : "text.secondary",
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                  }}
                                >
                                  {stage.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "text.secondary",
                                    fontSize: { xs: "0.8rem", sm: "0.85rem" },
                                  }}
                                >
                                  {stage.duration}
                                </Typography>
                              </Box>
                            </StepLabel>
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                  ) : (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <CircularProgress size={24} sx={{ mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        Loading itinerary details...
                      </Typography>
                    </Box>
                  )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={handlePreviousStage}
                    disabled={selectedStage === 0}
                    sx={{
                      borderColor: "#5D4037",
                      color: "#5D4037",
                      whiteSpace: "nowrap",
                      outline: "none",
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:hover": {
                        borderColor: "#4E342E",
                        backgroundColor: "rgba(93, 64, 55, 0.04)",
                      },
                    }}
                  >
                    Previous Stage
                  </Button>

                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600, whiteSpace: "nowrap" }}>
                    Stage {selectedStage + 1} of {selectedPackage?.routeStages?.length || 0}
                  </Typography>

                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={handleNextStage}
                    disabled={selectedStage === ((selectedPackage?.routeStages?.length || 0) - 1)}
                    sx={{
                      backgroundColor: "#5D4037",
                      color: "white",
                      whiteSpace: "nowrap",
                      outline: "none",
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:hover": {
                        backgroundColor: "#4E342E",
                      },
                    }}
                  >
                    Next Stage
                  </Button>
                </Box>
              </Box>

              {/* Map Container */}
              <Box
                sx={{
                  mb: { xs: 1, md: 1.5 },
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                  boxShadow: 2,
                  position: "relative",
                }}
              >
                <Box
                  ref={mapRef}
                  sx={{
                    width: "100%",
                    height: { xs: "300px", sm: "400px", md: "500px" },
                  }}
                />
                
                {/* Popup Overlay */}
                {popupData && popupPosition && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: `${popupPosition.x}px`,
                      top: `${popupPosition.y}px`,
                      transform: "translate(-50%, -100%)",
                      marginTop: "-10px",
                      zIndex: 1000,
                      pointerEvents: "auto",
                      maxWidth: { xs: "280px", sm: "320px" },
                    }}
                  >
                    <Card
                      sx={{
                        boxShadow: 4,
                        borderRadius: 2,
                        position: "relative",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          setPopupData(null);
                          setPopupPosition(null);
                        }}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          zIndex: 1001,
                          bgcolor: "rgba(255, 255, 255, 0.9)",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 1)",
                          },
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                      
                      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <LocationOn
                            sx={{
                              color: "#5D4037",
                              fontSize: 20,
                              mr: 0.5,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              fontSize: { xs: "1.15rem", sm: "1.25rem" },
                              color: "#5D4037",
                            }}
                          >
                            Stage {popupData.stage}: {popupData.name}
                          </Typography>
                        </Box>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.95rem", sm: "1.05rem" },
                            mb: 1.5,
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {popupData.description}
                        </Typography>
                        
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
                          <Chip
                            label={popupData.duration}
                            size="small"
                            sx={{
                              bgcolor: "#5D4037",
                              color: "white",
                              fontSize: "0.85rem",
                              height: "20px",
                            }}
                          />
                        </Box>
                        
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 1,
                            pt: 1,
                            borderTop: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.75rem",
                              fontStyle: "italic",
                            }}
                          >
                            Click to view full details
                          </Typography>
                        </Box>
                      </CardContent>
                      
                      {/* Arrow pointing to marker */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "-8px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 0,
                          height: 0,
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderTop: "8px solid white",
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                        }}
                      />
                    </Card>
                  </Box>
                )}
              </Box>

              {/* Stage Details Panel */}
              {selectedPackage?.routeStages && selectedPackage.routeStages.length > 0 && selectedPackage.routeStages[selectedStage] && (
                <Box
                  sx={{
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                    bgcolor: "white",
                  }}
                >
                  <Card elevation={0}>
                    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              color: "#5D4037",
                              fontSize: { xs: "1.3rem", md: "1.45rem" },
                            }}
                          >
                            What to Expect
                          </Typography>
                          <ImageList cols={2} rowHeight={160} sx={{ m: 0, mb: 2 }}>
                            {selectedPackage.routeStages[selectedStage].images.map((image, index) => (
                              <ImageListItem key={index}>
                                <Box
                                  component="img"
                                  src={image}
                                  alt={`${selectedPackage.routeStages[selectedStage].name} - Image ${index + 1}`}
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 1,
                                  }}
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <LocationOn sx={{ color: "#5D4037", fontSize: 28, mr: 1 }} />
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 700,
                                color: "#5D4037",
                                fontSize: { xs: "1.45rem", md: "1.7rem" },
                              }}
                            >
                              Stage {selectedPackage.routeStages[selectedStage].stage}: {selectedPackage.routeStages[selectedStage].name}
                            </Typography>
                          </Box>

                          <Box sx={{ my: 2, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                            <Divider />
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                            <AccessTime sx={{ color: "text.secondary", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                              Duration: {selectedPackage.routeStages[selectedStage].duration}
                            </Typography>
                          </Box>

                          <Typography
                            variant="body1"
                            sx={{
                              color: "text.primary",
                              mb: 3,
                              lineHeight: 1.8,
                              fontSize: { xs: "1.05rem", md: "1.15rem" },
                            }}
                          >
                            {selectedPackage.routeStages[selectedStage].description}
                          </Typography>

                          <Box sx={{ my: 2, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                            <Divider />
                          </Box>

                          {selectedPackage.routeStages[selectedStage].accommodation && (
                            <>
                              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1.5 }}>
                                <Hotel sx={{ color: "#5D4037", fontSize: 24, mt: 0.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037", mb: 0.5 }}>
                                    Accommodation
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selectedPackage.routeStages[selectedStage].accommodation}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ my: 1.5, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                                <Divider />
                              </Box>
                            </>
                          )}

                          {selectedPackage.routeStages[selectedStage].meals && (
                            <>
                              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1.5 }}>
                                <Restaurant sx={{ color: "#5D4037", fontSize: 24, mt: 0.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037", mb: 0.5 }}>
                                    Meals Included
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selectedPackage.routeStages[selectedStage].meals}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ my: 1.5, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                                <Divider />
                              </Box>
                            </>
                          )}

                          {selectedPackage.routeStages[selectedStage].highlights && (
                            <>
                              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#5D4037" }}>
                                Key Highlights
                              </Typography>
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                                {selectedPackage.routeStages[selectedStage].highlights.map((highlight, idx) => (
                                  <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                    <CheckCircle sx={{ color: "#6B7D47", fontSize: 20, mt: 0.25 }} />
                                    <Typography variant="body2">{highlight}</Typography>
                                  </Box>
                                ))}
                              </Box>
                              <Box sx={{ my: 1.5, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                                <Divider />
                              </Box>
                            </>
                          )}

                          {selectedPackage.routeStages[selectedStage].wildlife && (
                            <>
                              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1.5 }}>
                                <CameraAlt sx={{ color: "#5D4037", fontSize: 24, mt: 0.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037", mb: 0.5 }}>
                                    Wildlife to Spot
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selectedPackage.routeStages[selectedStage].wildlife}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ my: 1.5, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                                <Divider />
                              </Box>
                            </>
                          )}

                          {selectedPackage.routeStages[selectedStage].transportation && (
                            <>
                              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1.5 }}>
                                <DirectionsCar sx={{ color: "#5D4037", fontSize: 24, mt: 0.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037", mb: 0.5 }}>
                                    Transportation
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selectedPackage.routeStages[selectedStage].transportation}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ my: 1.5, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                                <Divider />
                              </Box>
                            </>
                          )}

                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#5D4037" }}>
                            Activities & Experiences
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {selectedPackage.routeStages[selectedStage].activities.map((activity, index) => (
                              <Chip
                                key={index}
                                icon={<CheckCircle sx={{ fontSize: 16 }} />}
                                label={activity}
                                sx={{
                                  bgcolor: "#f5f5f5",
                                  color: "#5D4037",
                                  border: "1px solid #e0e0e0",
                                  fontWeight: 700,
                                }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Travel Tips - Full Width and Centered */}
                      {selectedPackage.routeStages[selectedStage].tips && (
                        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                          <Box
                            sx={{
                              bgcolor: "#F5F1E8",
                              borderRadius: 2,
                              p: { xs: 2, sm: 3 },
                              border: "1px solid rgba(107, 78, 61, 0.2)",
                              maxWidth: { xs: "100%", sm: "600px", md: "700px" },
                              width: "100%",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1 }}>
                              <Info sx={{ color: "#B85C38", fontSize: 24, mt: 0.25 }} />
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037" }}>
                                Travel Tips & Recommendations
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: "text.primary", lineHeight: 1.7, pl: 4.5 }}>
                              {selectedPackage.routeStages[selectedStage].tips}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No Package Selected
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please select a package to view its itinerary.
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PackagesWithItinerary;

