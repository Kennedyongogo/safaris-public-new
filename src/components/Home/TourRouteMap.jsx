import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  IconButton,
  Chip,
  Grid,
  ImageList,
  ImageListItem,
  Divider,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from "@mui/material";
import {
  Close,
  LocationOn,
  AccessTime,
  CheckCircle,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon, Stroke, Fill, Circle as CircleStyle, Text } from "ol/style";

// Tour Experience Data - Two Complete Tours
const tourExperiences = [
  {
    id: 1,
    title: "Classic Kenya Safari Adventure",
    duration: "8 Days / 7 Nights",
    description: "Experience the best of Kenya's wildlife and landscapes",
    route: [
      {
        stage: 1,
        name: "Nairobi Arrival",
        description: "Welcome to Kenya! Arrive at Jomo Kenyatta International Airport where you'll be greeted by our representative. Transfer to your hotel in Nairobi for overnight stay and briefing about your safari adventure.",
        coordinates: [36.8219, -1.2921], // Nairobi
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Airport Transfer", "Hotel Check-in", "Safari Briefing"],
      },
      {
        stage: 2,
        name: "Maasai Mara National Reserve",
        description: "Journey to the world-famous Maasai Mara, home to the Big Five and the Great Migration. Enjoy morning and afternoon game drives in search of lions, elephants, cheetahs, and the spectacular wildebeest migration.",
        coordinates: [35.4167, -1.4167], // Maasai Mara
        images: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
        ],
        duration: "3 Days",
        activities: ["Game Drives", "Big Five Safari", "Wildlife Photography", "Sunset Viewing"],
      },
      {
        stage: 3,
        name: "Lake Nakuru National Park",
        description: "Visit the famous pink lake, home to thousands of flamingos and over 400 bird species. This alkaline lake is also a sanctuary for both black and white rhinos, making it a prime location for rhino spotting.",
        coordinates: [36.0833, -0.3667], // Lake Nakuru
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Flamingo Watching", "Rhino Tracking", "Bird Watching", "Game Drive"],
      },
      {
        stage: 4,
        name: "Amboseli National Park",
        description: "Experience breathtaking views of Mount Kilimanjaro while observing large herds of elephants. Amboseli is renowned for its elephant population and offers some of the best opportunities to see these majestic creatures up close.",
        coordinates: [37.2500, -2.6500], // Amboseli
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        ],
        duration: "2 Days",
        activities: ["Elephant Viewing", "Kilimanjaro Views", "Game Drives", "Cultural Visits"],
      },
      {
        stage: 5,
        name: "Nairobi Departure",
        description: "After breakfast, transfer back to Nairobi. Visit the Giraffe Centre or Karen Blixen Museum if time permits, then proceed to the airport for your departure flight, taking with you unforgettable memories of Kenya.",
        coordinates: [36.8219, -1.2921], // Nairobi
        images: [
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Hotel Check-out", "Optional City Tour", "Airport Transfer"],
      },
    ],
  },
  {
    id: 2,
    title: "Tanzania Northern Circuit Safari",
    duration: "10 Days / 9 Nights",
    description: "Explore Tanzania's most iconic national parks and witness the Great Migration",
    route: [
      {
        stage: 1,
        name: "Arusha Arrival",
        description: "Arrive at Kilimanjaro International Airport and transfer to Arusha, the gateway to Tanzania's northern safari circuit. Check into your lodge and enjoy a welcome dinner while your guide briefs you on the adventure ahead.",
        coordinates: [36.6833, -3.3667], // Arusha
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Airport Transfer", "Lodge Check-in", "Welcome Briefing"],
      },
      {
        stage: 2,
        name: "Tarangire National Park",
        description: "Drive to Tarangire, famous for its massive elephant herds and ancient baobab trees. The park is home to over 550 bird species and offers excellent game viewing opportunities, especially during the dry season when animals gather around the Tarangire River.",
        coordinates: [36.0000, -3.8333], // Tarangire
        images: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
        ],
        duration: "2 Days",
        activities: ["Game Drives", "Elephant Watching", "Bird Watching", "Baobab Photography"],
      },
      {
        stage: 3,
        name: "Serengeti National Park",
        description: "Enter the legendary Serengeti, one of the world's most famous wildlife sanctuaries. Witness the Great Migration of over 1.5 million wildebeest and zebras. Experience thrilling game drives in search of the Big Five and enjoy the vast, endless plains that define the Serengeti.",
        coordinates: [34.8333, -2.3333], // Serengeti
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
        ],
        duration: "3 Days",
        activities: ["Great Migration Viewing", "Big Five Safari", "Game Drives", "Hot Air Balloon Safari (Optional)"],
      },
      {
        stage: 4,
        name: "Ngorongoro Crater",
        description: "Descend into the Ngorongoro Crater, a UNESCO World Heritage Site and one of Africa's most spectacular natural wonders. This collapsed volcano is home to an incredible density of wildlife, including the rare black rhino, making it one of the best places in Africa to see the Big Five in a single day.",
        coordinates: [35.5833, -3.1667], // Ngorongoro
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        ],
        duration: "2 Days",
        activities: ["Crater Descent", "Big Five Safari", "Rhino Tracking", "Picnic Lunch in Crater"],
      },
      {
        stage: 5,
        name: "Lake Manyara National Park",
        description: "Visit Lake Manyara, known for its tree-climbing lions and large flocks of flamingos. The park's diverse habitats range from the alkaline lake to the groundwater forest, providing opportunities to see a wide variety of wildlife in a compact area.",
        coordinates: [35.8333, -3.5000], // Lake Manyara
        images: [
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Game Drive", "Tree-Climbing Lions", "Flamingo Watching", "Forest Walk"],
      },
      {
        stage: 6,
        name: "Arusha Departure",
        description: "After breakfast, enjoy a leisurely morning before transferring back to Arusha or Kilimanjaro Airport for your departure flight. Reflect on the incredible wildlife encounters and breathtaking landscapes you've experienced.",
        coordinates: [36.6833, -3.3667], // Arusha
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Lodge Check-out", "Airport Transfer"],
      },
    ],
  },
];

const TourRouteMap = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTour, setSelectedTour] = useState(0);
  const [selectedStage, setSelectedStage] = useState(0);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorSourceRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const popupOverlayRef = useRef(null);

  const currentTour = tourExperiences[selectedTour];

  const handleTourChange = (event, newValue) => {
    setSelectedTour(newValue);
    setSelectedStage(0); // Reset to first stage when changing tours
    setPopupData(null);
    setPopupPosition(null);
  };

  const handleStageChange = (stageIndex) => {
    setSelectedStage(stageIndex);
    setPopupData(null);
    setPopupPosition(null);
    
    // Center map on selected stage
    if (mapInstance.current && currentTour.route[stageIndex]) {
      const stage = currentTour.route[stageIndex];
      const view = mapInstance.current.getView();
      view.animate({
        center: fromLonLat(stage.coordinates),
        zoom: 8,
        duration: 1000,
      });
    }
  };

  const handleNextStage = () => {
    if (selectedStage < currentTour.route.length - 1) {
      handleStageChange(selectedStage + 1);
    }
  };

  const handlePreviousStage = () => {
    if (selectedStage > 0) {
      handleStageChange(selectedStage - 1);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;

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
        center: fromLonLat([36, -2]), // Center on East Africa
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
        const stageData = feature.get("stageData");
        const stageIndex = feature.get("stageIndex");
        
        setSelectedStage(stageIndex);
        setPopupData(stageData);
        
        // Convert map coordinates to pixel coordinates for popup positioning
        const pixel = map.getPixelFromCoordinate(
          feature.getGeometry().getCoordinates()
        );
        setPopupPosition({ x: pixel[0], y: pixel[1] });
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
  }, []);

  // Update Map when tour changes
  useEffect(() => {
    if (!mapInitialized || !vectorSourceRef.current || !mapInstance.current) return;

    const vectorSource = vectorSourceRef.current;
    vectorSource.clear();

    const route = currentTour.route;
    if (route.length === 0) return;

    // Create route line connecting all stages
    const routeCoordinates = route.map((stage) => fromLonLat(stage.coordinates));
    const routeLine = new LineString(routeCoordinates);
    const routeFeature = new Feature({
      geometry: routeLine,
      type: "route",
    });

    // Style for route line
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

    // Add markers for each stage
    route.forEach((stage, index) => {
      const point = new Point(fromLonLat(stage.coordinates));
      const feature = new Feature({
        geometry: point,
        type: "stage",
        stageIndex: index,
        stageData: stage,
      });

      // Create custom marker style with stage number
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

    // Fit map to show entire route
    const extent = vectorSource.getExtent();
    if (extent && extent[0] !== Infinity) {
      mapInstance.current.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
        maxZoom: 8,
      });
    }
  }, [currentTour, mapInitialized, selectedStage]);

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
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0.75, sm: 0.75, md: 0.75 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            py: { xs: 1, sm: 1.25, md: 1.5 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "white",
            border: "1px solid #e0e0e0",
            minHeight: "auto",
            height: "auto",
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: { xs: 1, sm: 1.25, md: 1.5 }, textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: { xs: 0.5, md: 0.75 },
                color: "#5D4037",
                fontSize: { xs: "2rem", sm: "2.55rem", md: "2.85rem" },
              }}
            >
              Explore Our Tour Routes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 0.5, md: 0.75 },
                color: "text.primary",
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                lineHeight: 1.7,
              }}
            >
              Discover detailed routes, experiences, and images from start to finish
            </Typography>
          </Box>

          {/* Tour Selection Tabs */}
          <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <Tabs
              value={selectedTour}
              onChange={handleTourChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  minHeight: { xs: 48, md: 64 },
                  "&:focus": { outline: "none" },
                  "&.Mui-focusVisible": { outline: "none" },
                },
                "& .Mui-selected": {
                  color: "#5D4037",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#5D4037",
                },
              }}
            >
              {tourExperiences.map((tour) => (
                <Tab
                  key={tour.id}
                  disableRipple
                  disableFocusRipple
                  label={
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "1.05rem", md: "1.1rem" },
                        }}
                      >
                        {tour.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: { xs: "0.85rem", md: "0.9rem" },
                          color: "text.secondary",
                        }}
                      >
                        {tour.duration}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>

          {/* Tour Info Display */}
          <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "#5D4037",
                fontSize: { xs: "1.45rem", md: "1.7rem" },
              }}
            >
              {currentTour.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.1rem" },
                mb: 2,
              }}
            >
              {currentTour.description}
            </Typography>

            {/* Timeline Navigation */}
            <Box sx={{ mt: 3 }}>
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
              <Stepper
                activeStep={selectedStage}
                orientation={isMobile ? "vertical" : "horizontal"}
                sx={{
                  "& .MuiStepLabel-root": {
                    "& .MuiStepLabel-label": {
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      fontWeight: 500,
                    },
                  },
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
                {currentTour.route.map((stage, index) => (
                  <Step key={index}>
                    <StepButton
                      onClick={() => handleStageChange(index)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(93, 64, 55, 0.04)",
                        },
                      }}
                    >
                      <StepLabel>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: index === selectedStage ? 700 : 500,
                              color:
                                index === selectedStage ? "#5D4037" : "text.secondary",
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

              {/* Navigation Buttons */}
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
                  disableRipple
                  disableFocusRipple
                  sx={{
                    borderColor: "#5D4037",
                    color: "#5D4037",
                    px: { xs: 1.25, sm: 2 },
                    py: { xs: 0.45, sm: 0.65 },
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    whiteSpace: "nowrap",
                    minWidth: 0,
                    "&:hover": {
                      borderColor: "#4E342E",
                      backgroundColor: "rgba(93, 64, 55, 0.04)",
                    },
                    "&:disabled": {
                      borderColor: "#e0e0e0",
                      color: "#bdbdbd",
                    },
                    "&:focus": { outline: "none" },
                    "&.Mui-focusVisible": { outline: "none" },
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Previous Stage
                </Button>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                  fontWeight: 600,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  Stage {selectedStage + 1} of {currentTour.route.length}
                </Typography>

                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={handleNextStage}
                  disabled={selectedStage === currentTour.route.length - 1}
                  disableRipple
                  disableFocusRipple
                  sx={{
                    backgroundColor: "#5D4037",
                    color: "white",
                    px: { xs: 1.25, sm: 2 },
                    py: { xs: 0.45, sm: 0.65 },
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    whiteSpace: "nowrap",
                    minWidth: 0,
                    "&:hover": {
                      backgroundColor: "#4E342E",
                    },
                    "&:disabled": {
                      backgroundColor: "#e0e0e0",
                      color: "#bdbdbd",
                    },
                    "&:focus": { outline: "none" },
                    "&.Mui-focusVisible": { outline: "none" },
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Next Stage
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Map Container */}
          <Box
            sx={{
              mb: { xs: 2, md: 3 },
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
                ref={popupOverlayRef}
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
          {currentTour.route[selectedStage] && (
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
                    {/* Left Column - Images */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#5D4037",
                          fontSize: { xs: "1.3rem", md: "1.45rem" },
                        }}
                      >
                        Experience Images
                      </Typography>
                      <ImageList
                        cols={2}
                        rowHeight={160}
                        sx={{
                          m: 0,
                          mb: 2,
                        }}
                      >
                        {currentTour.route[selectedStage].images.map(
                          (image, index) => (
                            <ImageListItem key={index}>
                              <Box
                                component="img"
                                src={image}
                                alt={`${currentTour.route[selectedStage].name} - Image ${index + 1}`}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: 1,
                                  cursor: "pointer",
                                  transition: "transform 0.3s ease",
                                  "&:hover": {
                                    transform: "scale(1.05)",
                                  },
                                }}
                                onError={(e) => {
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop";
                                }}
                              />
                            </ImageListItem>
                          )
                        )}
                      </ImageList>
                    </Grid>

                    {/* Right Column - Details */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <LocationOn
                          sx={{
                            color: "#5D4037",
                            fontSize: 28,
                            mr: 1,
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "#5D4037",
                              fontSize: { xs: "1.45rem", md: "1.7rem" },
                            }}
                          >
                            Stage {currentTour.route[selectedStage].stage}:{" "}
                            {currentTour.route[selectedStage].name}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          gap: 1,
                        }}
                      >
                        <AccessTime
                          sx={{
                            color: "text.secondary",
                            fontSize: 20,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 600,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                          }}
                        >
                          Duration: {currentTour.route[selectedStage].duration}
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
                        {currentTour.route[selectedStage].description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          color: "#5D4037",
                          fontSize: { xs: "1.2rem", md: "1.3rem" },
                        }}
                      >
                        Activities & Highlights
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        {currentTour.route[selectedStage].activities.map(
                          (activity, index) => (
                            <Chip
                              key={index}
                              icon={<CheckCircle sx={{ fontSize: 16 }} />}
                              label={activity}
                              sx={{
                                bgcolor: "#f5f5f5",
                                color: "#5D4037",
                                border: "1px solid #e0e0e0",
                              fontWeight: 700,
                              fontSize: { xs: "0.9rem", md: "1rem" },
                                "&:hover": {
                                  bgcolor: "#e8e8e8",
                                },
                              }}
                            />
                          )
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default TourRouteMap;

