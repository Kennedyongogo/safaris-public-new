import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Image Carousel Component
const ImageCarousel = ({ images, alt, height = 240 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          height,
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No image available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        height,
        overflow: "hidden",
        cursor: "pointer",
        "&:hover .carousel-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`${alt} - Image ${index + 1}`}
          className="carousel-image"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === currentImageIndex ? 1 : 0,
            transition: "opacity 0.5s ease-in-out, transform 0.3s ease",
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop";
          }}
        />
      ))}

      {/* Image indicators */}
      {images.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 0.5,
            zIndex: 2,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: index === currentImageIndex ? "#B85C38" : "rgba(255, 255, 255, 0.7)",
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LocationOn,
  FilterList,
  ArrowForward,
  Close,
  Map as MapIcon,
  SatelliteAlt,
  Terrain,
} from "@mui/icons-material";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import XYZ from "ol/source/XYZ";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";

const MotionBox = motion(Box);

// Map Tooltip Component
const MapTooltip = ({ lodge, position }) => {
  if (!lodge) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        left: position.containerX + position.x + 15,
        top: position.containerY + position.y - 10,
        backgroundColor: "rgba(61, 40, 23, 0.95)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "0.875rem",
        fontWeight: 600,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        pointerEvents: "none",
        zIndex: 10000,
        whiteSpace: "nowrap",
        border: "1px solid rgba(184, 92, 56, 0.5)",
        "&::before": {
          content: '""',
          position: "absolute",
          left: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: "6px solid transparent",
          borderBottom: "6px solid transparent",
          borderRight: "8px solid rgba(61, 40, 23, 0.95)",
        },
      }}
    >
      {lodge.name}
    </Box>
  );
};

// Will be populated from API

const destinations = ["Tanzania", "Kenya", "Uganda"];
const campTypes = ["Remote", "Family Friendly", "Romantic", "Private", "Spa & Wellness"];
const chipStyleByType = {
  Remote: {
    bg: "#E8F5E9",
    color: "#2E7D32",
    border: "1px solid #A5D6A7",
  },
  "Family Friendly": {
    bg: "#E3F2FD",
    color: "#1565C0",
    border: "1px solid #90CAF9",
  },
  Romantic: {
    bg: "#FCE4EC",
    color: "#AD1457",
    border: "1px solid #F48FB1",
  },
  Private: {
    bg: "#EDE7F6",
    color: "#5E35B1",
    border: "1px solid #B39DDB",
  },
  "Spa & Wellness": {
    bg: "#FFF3E0",
    color: "#EF6C00",
    border: "1px solid #FFCC80",
  },
};
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CampLodges() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedCampTypes, setSelectedCampTypes] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [baseLayer, setBaseLayer] = useState("osm");
  const [lodges, setLodges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorLayerRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [hoveredLodge, setHoveredLodge] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);

  const handleDestinationChange = (destination) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination)
        ? prev.filter((d) => d !== destination)
        : [...prev, destination]
    );
  };

  const handleCampTypeChange = (type) => {
    setSelectedCampTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleMonthChange = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    );
  };

  const clearAllFilters = () => {
    setSelectedDestinations([]);
    setSelectedCampTypes([]);
    setSelectedMonths([]);
  };

  const filteredLodges = useMemo(() => {
    return lodges.filter((lodge) => {
      const matchesDestination =
        selectedDestinations.length === 0 || selectedDestinations.includes(lodge.destination);
      const matchesCampType =
        selectedCampTypes.length === 0 ||
        selectedCampTypes.some((type) => lodge.campType.includes(type));
      const matchesMonth =
        selectedMonths.length === 0 ||
        selectedMonths.some((month) => lodge.openMonths.includes(month));
      return matchesDestination && matchesCampType && matchesMonth;
    });
  }, [lodges, selectedDestinations, selectedCampTypes, selectedMonths]);

  const hasActiveFilters =
    selectedDestinations.length > 0 ||
    selectedCampTypes.length > 0 ||
    selectedMonths.length > 0;

  // Fetch lodges from API
  useEffect(() => {
    const fetchLodges = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/lodges/public");
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load lodges");
        }

        // Transform API data to match expected structure
        const normalizedLodges = (data.data || []).map((lodge) => ({
          ...lodge,
          // Ensure images array exists and has at least one image
          images: Array.isArray(lodge.images) && lodge.images.length > 0 ? lodge.images : [lodge.image].filter(Boolean),
          // Ensure campType is array
          campType: Array.isArray(lodge.campType) ? lodge.campType : [],
          // Ensure openMonths is array
          openMonths: Array.isArray(lodge.openMonths) ? lodge.openMonths : [],
          // Use first image as the main image if available
          image: lodge.images && lodge.images.length > 0 ? lodge.images[0] : lodge.image,
        }));

        setLodges(normalizedLodges);
      } catch (err) {
        setError(err.message || "Failed to load lodges");
        console.error("Error fetching lodges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLodges();
  }, []);

  const handleViewDetails = (lodge) => {
    navigate(`/camp-lodges/${lodge.id}`, { state: { lodge } });
  };

  // Initialize map
  useEffect(() => {
    if (!showMap || !mapRef.current) return;

    // Cleanup existing map
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
      visible: true,
      title: "osm",
      opacity: 1,
      zIndex: 0,
    });

    const satelliteLayer = new TileLayer({
      source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        maxZoom: 20,
        attributions: "© Google Maps",
        preload: 4,
        crossOrigin: "anonymous",
      }),
      visible: false,
      title: "satellite",
      opacity: 1,
      zIndex: 0,
    });

    const terrainLayer = new TileLayer({
      source: new XYZ({
        url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
        maxZoom: 24,
        preload: 4,
        crossOrigin: "anonymous",
      }),
      visible: false,
      title: "terrain",
      opacity: 1,
      zIndex: 0,
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      visible: true,
    });
    vectorLayerRef.current = vectorLayer;

    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer, satelliteLayer, terrainLayer, vectorLayer],
      view: new View({
        center: fromLonLat([35, -1.5]), // Center on East Africa
        zoom: 6,
      }),
      controls: defaultControls().extend([new ScaleLine()]),
    });

    // Add click interaction
    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (feature) {
        const properties = feature.get("properties");
        if (properties?.type === "lodge") {
          // Scroll to the lodge card in the grid
          const lodgeId = properties.id;
          const element = document.getElementById(`lodge-${lodgeId}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            // Highlight the card briefly
            element.style.transition = "box-shadow 0.3s";
            element.style.boxShadow = "0 0 20px rgba(184, 92, 56, 0.6)";
            setTimeout(() => {
              element.style.boxShadow = "";
            }, 2000);
          }
        }
      }
    });

    // Add hover interaction for cursor change and tooltip
    map.on("pointermove", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      map.getTarget().style.cursor = feature ? "pointer" : "";

      if (feature) {
        const properties = feature.get("properties");
        if (properties?.type === "lodge") {
          setHoveredLodge(properties);
          // Position tooltip relative to map container
          const mapRect = mapContainerRef.current?.getBoundingClientRect();
          if (mapRect) {
            setTooltipPosition({
              x: event.pixel[0],
              y: event.pixel[1],
              containerX: mapRect.left,
              containerY: mapRect.top
            });
          }
        } else {
          setHoveredLodge(null);
        }
      } else {
        setHoveredLodge(null);
      }
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
  }, [showMap]);

  // Update base layer
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    const layers = mapInstance.current.getLayers();
    layers.forEach((layer) => {
      const layerTitle = layer.get("title");
      if (
        layerTitle === "osm" ||
        layerTitle === "satellite" ||
        layerTitle === "terrain"
      ) {
        layer.setVisible(layerTitle === baseLayer);
      }
    });
  }, [baseLayer, mapInitialized]);

  // Create markers for filtered lodges
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized || !showMap) return;
    const vectorSource = vectorLayerRef.current.getSource();
    vectorSource.clear();

    const markers = filteredLodges
      .filter((lodge) => lodge.longitude && lodge.latitude)
      .map((lodge) => {
        const lon = parseFloat(lodge.longitude);
        const lat = parseFloat(lodge.latitude);

        if (isNaN(lon) || isNaN(lat)) return null;

        const feature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          properties: {
            ...lodge,
            type: "lodge",
          },
        });

        const svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#B85C38" stroke="white" stroke-width="2"/>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" stroke-width="1.5" fill="none"/>
          </svg>
        `;

        feature.setStyle(
          new Style({
            image: new Icon({
              src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgIcon)}`,
              scale: 1,
              anchor: [0.5, 0.5],
            }),
          })
        );
        return feature;
      })
      .filter((marker) => marker !== null);

    vectorSource.addFeatures(markers);

    // Fit map to show all markers
    if (markers.length > 0) {
      const extent = vectorSource.getExtent();
      if (extent && extent[0] !== Infinity) {
        mapInstance.current.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          duration: 1000,
        });
      }
    }
  }, [filteredLodges, mapInitialized, showMap]);

  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 1.5,
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
            "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)",
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
          pt: { xs: 0.75, sm: 0.75, md: 0.75 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              py: { xs: 1.5, sm: 2, md: 2.5 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(107, 78, 61, 0.2)",
              minHeight: "auto",
              height: "auto",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  mb: 0.5,
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                  background:
                    "linear-gradient(45deg, #6B4E3D, #B85C38, #3D2817)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "60px", sm: "70px", md: "80px" },
                    height: "4px",
                    background: "linear-gradient(45deg, #6B4E3D, #B85C38)",
                    borderRadius: "2px",
                  },
                }}
              >
                Camps & Lodges
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 1.5,
                  maxWidth: { xs: "100%", sm: "800px", md: "900px" },
                  mx: "auto",
                  px: { xs: 1, sm: 0 },
                  fontWeight: 500,
                  fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
                  lineHeight: 1.6,
                  color: "text.primary",
                }}
              >
                Every guest who stays with Akira Safaris can be assured that all our camps are situated in the very best locations within carefully considered prime game-viewing areas.
              </Typography>

              {/* Filter and Map Buttons */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1.5, flexWrap: "wrap" }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setFilterOpen(true)}
                  sx={{
                    borderColor: "#6B4E3D",
                    color: "#6B4E3D",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                    "&:hover": {
                      borderColor: "#B85C38",
                      backgroundColor: "rgba(184, 92, 56, 0.1)",
                    },
                  }}
                >
                  Filters
                </Button>
                <Button
                  size="small"
                  variant={showMap ? "contained" : "outlined"}
                  startIcon={showMap ? <LocationOn /> : <MapIcon />}
                  onClick={() => setShowMap(!showMap)}
                  sx={{
                    borderColor: "#6B4E3D",
                    backgroundColor: showMap ? "#6B4E3D" : "transparent",
                    color: showMap ? "white" : "#6B4E3D",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                    "&:hover": {
                      borderColor: "#B85C38",
                      backgroundColor: showMap ? "#B85C38" : "rgba(184, 92, 56, 0.1)",
                    },
                  }}
                >
                  {showMap ? "Show List" : "Show on Map"}
                </Button>
                {hasActiveFilters && (
                  <Button
                    size="small"
                    variant="text"
                    onClick={clearAllFilters}
                    sx={{
                      color: "#B85C38",
                      fontWeight: 600,
                      px: 1.25,
                      py: 0.4,
                      outline: "none",
                      "&:focus": {
                        outline: "none",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(184, 92, 56, 0.1)",
                      },
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </Box>
            </Box>

            {/* Map Section */}
            {showMap && (
              <Box sx={{ mb: 3 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    border: "1px solid rgba(107, 78, 61, 0.2)",
                  }}
                >
                  {/* Map Controls */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      mb: 1,
                      px: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => setBaseLayer("osm")}
                        sx={{
                          backgroundColor: baseLayer === "osm" ? "#6B4E3D" : "transparent",
                          color: baseLayer === "osm" ? "white" : "#6B4E3D",
                          outline: "none",
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": {
                            backgroundColor: baseLayer === "osm" ? "#B85C38" : "rgba(107, 78, 61, 0.1)",
                          },
                        }}
                      >
                        <MapIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setBaseLayer("satellite")}
                        sx={{
                          backgroundColor: baseLayer === "satellite" ? "#6B4E3D" : "transparent",
                          color: baseLayer === "satellite" ? "white" : "#6B4E3D",
                          outline: "none",
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": {
                            backgroundColor: baseLayer === "satellite" ? "#B85C38" : "rgba(107, 78, 61, 0.1)",
                          },
                        }}
                      >
                        <SatelliteAlt fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setBaseLayer("terrain")}
                        sx={{
                          backgroundColor: baseLayer === "terrain" ? "#6B4E3D" : "transparent",
                          color: baseLayer === "terrain" ? "white" : "#6B4E3D",
                          outline: "none",
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": {
                            backgroundColor: baseLayer === "terrain" ? "#B85C38" : "rgba(107, 78, 61, 0.1)",
                          },
                        }}
                      >
                        <Terrain fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  {/* Map Container */}
                  <Box
                    ref={(el) => {
                      mapRef.current = el;
                      mapContainerRef.current = el;
                    }}
                    sx={{
                      width: "100%",
                      height: { xs: "400px", sm: "500px", md: "600px" },
                      borderRadius: 1,
                      overflow: "hidden",
                      border: "1px solid rgba(107, 78, 61, 0.2)",
                      position: "relative",
                    }}
                  />
                </Paper>

                {/* Map Tooltip */}
                <MapTooltip lodge={hoveredLodge} position={tooltipPosition} />
              </Box>
            )}

            {/* Results Count */}
            {!showMap && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                {loading
                  ? "Loading camps and lodges..."
                  : error
                  ? "Error loading camps and lodges"
                  : filteredLodges.length === 0
                  ? "No camps or lodges found"
                  : `${filteredLodges.length} camp${filteredLodges.length !== 1 ? "s" : ""} and lodge${filteredLodges.length !== 1 ? "s" : ""} found`}
              </Typography>
            )}

            {/* Lodges Grid - 3 cards per row */}
            {!showMap && (
              <>
                {loading ? (
                  <Box textAlign="center" py={8}>
                    <CircularProgress sx={{ color: "#6B4E3D" }} />
                    <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                      Loading camps and lodges...
                    </Typography>
                  </Box>
                ) : error ? (
                  <Box textAlign="center" py={4}>
                    <Typography color="error" variant="body1">
                      {error}
                    </Typography>
                  </Box>
                ) : filteredLodges.length === 0 ? (
                  <Box textAlign="center" py={4}>
                    <Typography color="text.secondary" variant="body1">
                      No camps or lodges found matching your filters.
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} justifyContent="center">
                    {filteredLodges.map((lodge, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lodge.id}>
                    <Box id={`lodge-${lodge.id}`}>
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
                        <ImageCarousel
                          images={lodge.images || [lodge.image].filter(Boolean)}
                          alt={lodge.name}
                          height={240}
                        />
                        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              color: "#3D2817",
                              fontSize: { xs: "1.2rem", sm: "1.35rem" },
                            }}
                          >
                            {lodge.name}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
                            <LocationOn sx={{ fontSize: 16, color: "#6B4E3D" }} />
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                fontSize: { xs: "0.95rem", sm: "1.05rem" },
                                fontWeight: 600,
                              }}
                            >
                              {lodge.location}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              mb: 2,
                              fontSize: { xs: "0.95rem", sm: "1.05rem" },
                              fontWeight: 600,
                              lineHeight: 1.6,
                              flexGrow: 1,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {lodge.description}
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                            {lodge.campType.slice(0, 2).map((type) => (
                              /* color chips by camp type */
                              <Chip
                                key={type}
                                label={type}
                                size="small"
                                sx={{
                                  backgroundColor: chipStyleByType[type]?.bg || "rgba(107, 78, 61, 0.1)",
                                  color: chipStyleByType[type]?.color || "#6B4E3D",
                                  border: chipStyleByType[type]?.border || "1px solid rgba(107, 78, 61, 0.3)",
                                  fontSize: "0.8rem",
                                  fontWeight: 700,
                                  height: "22px",
                                  letterSpacing: 0.2,
                                }}
                              />
                            ))}
                          </Box>
                          <Button
                            variant="outlined"
                            size="small"
                            endIcon={<ArrowForward />}
                            fullWidth
                            onClick={() => handleViewDetails(lodge)}
                            sx={{
                              borderColor: "#6B4E3D",
                              color: "#6B4E3D",
                              fontWeight: 600,
                              outline: "none",
                              "&:focus": { outline: "none", boxShadow: "none" },
                              "&:focus-visible": { outline: "none", boxShadow: "none" },
                              "&:hover": {
                                borderColor: "#B85C38",
                                backgroundColor: "rgba(184, 92, 56, 0.1)",
                              },
                            }}
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </MotionBox>
                    </Box>
                  </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </Paper>
        </MotionBox>
      </Container>

      {/* Filter Popup Dialog */}
      <Dialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 3 },
            maxHeight: { xs: "90vh", sm: "85vh" },
            m: { xs: 1, sm: 2 },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
            borderBottom: "1px solid rgba(107, 78, 61, 0.2)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#3D2817",
            }}
          >
            Filters
          </Typography>
          <IconButton
            onClick={() => setFilterOpen(false)}
            sx={{
              color: "#6B4E3D",
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&:hover": {
                backgroundColor: "rgba(184, 92, 56, 0.1)",
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 3,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(107, 78, 61, 0.1)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#6B4E3D",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#B85C38",
              },
            },
          }}
        >
          {/* Destinations Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: "#3D2817",
                  fontSize: { xs: "1.05rem", sm: "1.1rem" },
              }}
            >
              Destinations
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: "wrap",
                gap: { xs: 1, sm: 1.5 },
              }}
            >
              {destinations.map((destination) => (
                <FormControlLabel
                  key={destination}
                  control={
                    <Checkbox
                      checked={selectedDestinations.includes(destination)}
                      onChange={() => handleDestinationChange(destination)}
                      sx={{
                        color: "#6B4E3D",
                        "&.Mui-checked": {
                          color: "#6B4E3D",
                        },
                      }}
                    />
                  }
                  label={destination}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2, borderColor: "rgba(107, 78, 61, 0.2)" }} />

          {/* Camp Type Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: "#3D2817",
                  fontSize: { xs: "1.05rem", sm: "1.1rem" },
              }}
            >
              Camp Type
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: "wrap",
                gap: { xs: 1, sm: 1.5 },
              }}
            >
              {campTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={selectedCampTypes.includes(type)}
                      onChange={() => handleCampTypeChange(type)}
                      sx={{
                        color: "#6B4E3D",
                        "&.Mui-checked": {
                          color: "#6B4E3D",
                        },
                      }}
                    />
                  }
                  label={type}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2, borderColor: "rgba(107, 78, 61, 0.2)" }} />

          {/* Open Months Filter */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: "#3D2817",
                  fontSize: { xs: "1.05rem", sm: "1.1rem" },
              }}
            >
              Open Months
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                },
                gap: { xs: 1, sm: 1.5 },
                maxHeight: { xs: "200px", sm: "250px" },
                overflowY: "auto",
                pr: 1,
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(107, 78, 61, 0.1)",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#6B4E3D",
                  borderRadius: "3px",
                  "&:hover": {
                    backgroundColor: "#B85C38",
                  },
                },
              }}
            >
              {months.map((month) => (
                <FormControlLabel
                  key={month}
                  control={
                    <Checkbox
                      checked={selectedMonths.includes(month)}
                      onChange={() => handleMonthChange(month)}
                      sx={{
                        color: "#6B4E3D",
                        "&.Mui-checked": {
                          color: "#6B4E3D",
                        },
                      }}
                    />
                  }
                  label={month}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                    fontSize: { xs: "0.9rem", sm: "0.975rem" },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            pt: 1,
            borderTop: "1px solid rgba(107, 78, 61, 0.2)",
          }}
        >
          <Button
            onClick={clearAllFilters}
            sx={{
              color: "#6B4E3D",
              fontWeight: 600,
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&:hover": {
                backgroundColor: "rgba(184, 92, 56, 0.1)",
              },
            }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            onClick={() => setFilterOpen(false)}
            sx={{
              backgroundColor: "#B85C38",
              color: "white",
              fontWeight: 600,
              px: 3,
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&:hover": {
                backgroundColor: "#8B4225",
              },
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

