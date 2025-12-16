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

// Package data with detailed itineraries
const packagesWithItineraries = [
  {
    id: 1,
    title: "Classic Kenya Safari Adventure",
    description:
      "Experience the best of Kenya's wildlife and landscapes. This comprehensive safari takes you through Maasai Mara, Lake Nakuru, and Amboseli for an unforgettable adventure.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    duration: "8 Days / 7 Nights",
    price: "$2,500",
    pricePerPerson: "per person",
    groupSize: "2-6 People",
    rating: 4.8,
    highlights: ["Big Five Safari", "Great Migration", "Hot Air Balloon", "Cultural Visits", "All Meals"],
    included: ["Accommodation", "Meals", "Transport", "Park Fees", "Guide"],
    type: "All-inclusive",
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
        accommodation: "4-star hotel in Nairobi city center",
        meals: "Dinner included",
        transportation: "Airport pickup in air-conditioned vehicle",
        highlights: ["Welcome briefing", "City orientation", "Rest after long flight"],
        tips: "Arrive well-rested and ready for your safari adventure. Exchange currency at the airport or hotel.",
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
        accommodation: "Luxury tented camp in the heart of Maasai Mara",
        meals: "All meals included (breakfast, lunch, dinner)",
        transportation: "4x4 safari vehicle with pop-up roof for game viewing",
        highlights: ["Big Five sightings", "Great Migration (seasonal)", "Hot air balloon safari (optional)", "Maasai cultural visit"],
        wildlife: "Lions, elephants, cheetahs, leopards, rhinos, wildebeest, zebras, giraffes, hippos, crocodiles",
        tips: "Best time: July-October for migration. Bring binoculars, camera, and warm layers for early morning drives.",
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
        accommodation: "Lodge overlooking Lake Nakuru",
        meals: "Breakfast, lunch, and dinner included",
        transportation: "4x4 safari vehicle",
        highlights: ["Pink flamingo spectacle", "Rhino sanctuary", "Baboon cliff viewpoint", "Over 400 bird species"],
        wildlife: "Black and white rhinos, flamingos, pelicans, waterbucks, buffaloes, baboons, leopards",
        tips: "Perfect for bird enthusiasts. The pink lake is most vibrant during dry season. Bring a good camera for bird photography.",
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
        accommodation: "Luxury safari lodge with Kilimanjaro views",
        meals: "All meals included with bush breakfast option",
        transportation: "4x4 safari vehicle",
        highlights: ["Mount Kilimanjaro backdrop", "Large elephant herds", "Maasai village visit", "Observation Hill"],
        wildlife: "Elephants, lions, cheetahs, hyenas, wildebeest, zebras, giraffes, buffaloes, hippos",
        tips: "Best views of Kilimanjaro at sunrise and sunset. Clear weather is essential for mountain views. Great for elephant photography.",
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
        accommodation: "N/A - Departure day",
        meals: "Breakfast included",
        transportation: "Transfer to Jomo Kenyatta International Airport",
        highlights: ["Giraffe Centre visit (optional)", "Karen Blixen Museum (optional)", "Souvenir shopping", "Farewell"],
        tips: "Allow 3 hours before flight departure. Optional activities depend on flight schedule. Don't forget to check out of your accommodation.",
      },
    ],
  },
  {
    id: 2,
    title: "Amboseli & Tsavo Adventure",
    description:
      "Discover elephants with Mount Kilimanjaro views and explore the vast Tsavo wilderness. Perfect for wildlife photography enthusiasts.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    duration: "4 Days / 3 Nights",
    price: "$1,800",
    pricePerPerson: "per person",
    groupSize: "2-8 People",
    rating: 4.7,
    highlights: ["Elephant Viewing", "Kilimanjaro Views", "Bird Watching", "Sunset Drives"],
    included: ["Accommodation", "Meals", "Transport", "Park Fees"],
    type: "Full board",
    route: [
      {
        stage: 1,
        name: "Nairobi to Amboseli",
        description: "Depart from Nairobi and drive to Amboseli National Park, arriving in time for lunch. Afternoon game drive with spectacular views of Mount Kilimanjaro.",
        coordinates: [37.2500, -2.6500], // Amboseli
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Road Transfer", "Afternoon Game Drive", "Kilimanjaro Views"],
        accommodation: "Luxury safari lodge with Kilimanjaro views",
        meals: "Lunch and dinner included",
        transportation: "4x4 safari vehicle",
        highlights: ["Mount Kilimanjaro backdrop", "Elephant herds", "First game drive"],
        tips: "Best views of Kilimanjaro at sunrise and sunset. Clear weather is essential.",
      },
      {
        stage: 2,
        name: "Amboseli National Park",
        description: "Full day in Amboseli with morning and afternoon game drives. Experience large elephant herds against the backdrop of Africa's highest peak.",
        coordinates: [37.2500, -2.6500], // Amboseli
        images: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
        ],
        duration: "2 Days",
        activities: ["Morning Game Drive", "Afternoon Game Drive", "Elephant Viewing", "Photography"],
        accommodation: "Luxury safari lodge",
        meals: "All meals included",
        transportation: "4x4 safari vehicle",
        highlights: ["Elephant photography", "Kilimanjaro sunrise", "Observation Hill", "Maasai village visit"],
        wildlife: "Elephants, lions, cheetahs, hyenas, wildebeest, zebras, giraffes, buffaloes",
        tips: "Early morning drives offer the best lighting for photography. Bring a telephoto lens.",
      },
      {
        stage: 3,
        name: "Tsavo East National Park",
        description: "Transfer to Tsavo East, one of Kenya's largest parks. Game drives in search of the famous red elephants and diverse wildlife.",
        coordinates: [38.7500, -2.9833], // Tsavo East
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Game Drive", "Wildlife Viewing", "Photography", "Sunset Viewing"],
        accommodation: "Safari lodge in Tsavo East",
        meals: "All meals included",
        transportation: "4x4 safari vehicle",
        highlights: ["Red elephants", "Diverse landscapes", "Bird watching", "Sunset photography"],
        wildlife: "Red elephants, lions, leopards, buffaloes, giraffes, zebras, cheetahs, hyenas",
        tips: "Tsavo is hot and dry. Stay hydrated and wear light clothing. The red elephants are unique to this region.",
      },
    ],
  },
  {
    id: 3,
    title: "Samburu Special Five Safari",
    description:
      "Explore northern Kenya's unique wildlife including Grevy's zebra, Somali ostrich, and reticulated giraffe. A truly unique safari experience.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    duration: "3 Days / 2 Nights",
    price: "$1,200",
    pricePerPerson: "per person",
    groupSize: "2-6 People",
    rating: 4.9,
    highlights: ["Special Five", "River Safaris", "Cultural Experiences", "Game Drives"],
    included: ["Accommodation", "Meals", "Transport", "Park Fees", "Guide"],
    type: "All-inclusive",
    route: [
      {
        stage: 1,
        name: "Nairobi to Samburu",
        description: "Drive north to Samburu National Reserve, crossing the equator. Arrive in time for lunch and afternoon game drive in search of the Special Five.",
        coordinates: [37.5167, 0.5167], // Samburu
        images: [
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        ],
        duration: "1 Day",
        activities: ["Road Transfer", "Equator Crossing", "Afternoon Game Drive"],
        accommodation: "Luxury tented camp by Ewaso Nyiro River",
        meals: "Lunch and dinner included",
        transportation: "4x4 safari vehicle",
        highlights: ["Equator crossing", "First Special Five sightings", "River views"],
        tips: "The drive is scenic but long. Bring snacks and stay comfortable.",
      },
      {
        stage: 2,
        name: "Samburu National Reserve",
        description: "Full day exploring Samburu in search of the Special Five: Grevy's zebra, Somali ostrich, reticulated giraffe, gerenuk, and Beisa oryx.",
        coordinates: [37.5167, 0.5167], // Samburu
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
        ],
        duration: "2 Days",
        activities: ["Game Drives", "Special Five Tracking", "River Safari", "Cultural Visit"],
        accommodation: "Luxury tented camp",
        meals: "All meals included",
        transportation: "4x4 safari vehicle",
        highlights: ["Special Five wildlife", "Samburu culture", "River activities", "Desert landscapes"],
        wildlife: "Grevy's zebra, Somali ostrich, reticulated giraffe, gerenuk, Beisa oryx, elephants, lions, leopards",
        tips: "Samburu is hot and arid. The Special Five are unique to this region. Early morning and late afternoon are best for wildlife viewing.",
      },
    ],
  },
  {
    id: 4,
    title: "Tanzania Northern Circuit Safari",
    description:
      "Explore Tanzania's most iconic national parks and witness the Great Migration. Experience Serengeti, Ngorongoro Crater, and Tarangire.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    duration: "10 Days / 9 Nights",
    price: "$3,200",
    pricePerPerson: "per person",
    groupSize: "2-6 People",
    rating: 4.9,
    highlights: ["Great Migration", "Big Five", "Ngorongoro Crater", "Serengeti"],
    included: ["Accommodation", "Meals", "Transport", "Park Fees", "Guide"],
    type: "All-inclusive",
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
        accommodation: "Luxury lodge in Arusha",
        meals: "Dinner included",
        transportation: "Airport pickup in air-conditioned vehicle",
        highlights: ["Welcome briefing", "Lodge orientation", "Rest after flight"],
        tips: "Arusha is at a higher altitude. Take it easy on arrival to acclimatize.",
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
        accommodation: "Luxury tented camp in Tarangire",
        meals: "All meals included",
        transportation: "4x4 safari vehicle",
        highlights: ["Massive elephant herds", "Ancient baobab trees", "Over 550 bird species", "Tarangire River"],
        wildlife: "Elephants, lions, leopards, buffaloes, giraffes, zebras, wildebeest, over 550 bird species",
        tips: "Best viewing during dry season (June-October). The baobab trees make for stunning photography.",
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
        accommodation: "Luxury tented camp in central Serengeti",
        meals: "All meals included",
        transportation: "4x4 safari vehicle with pop-up roof",
        highlights: ["Great Migration spectacle", "Big Five sightings", "Endless plains", "Hot air balloon (optional)"],
        wildlife: "Lions, elephants, leopards, rhinos, buffaloes, cheetahs, wildebeest, zebras, giraffes, hyenas",
        tips: "Migration location varies by season. Your guide will track the herds. Early morning drives are best for predator activity.",
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
        accommodation: "Luxury lodge on crater rim",
        meals: "All meals included with picnic lunch in crater",
        transportation: "4x4 safari vehicle",
        highlights: ["UNESCO World Heritage Site", "Black rhino sightings", "Big Five in one day", "Crater floor picnic"],
        wildlife: "Black rhinos, lions, elephants, leopards, buffaloes, hippos, zebras, wildebeest, hyenas, flamingos",
        tips: "The crater rim can be cold in the morning. Bring warm layers. The crater floor is warmer and perfect for game viewing.",
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
        accommodation: "Lodge near Lake Manyara",
        meals: "All meals included",
        transportation: "4x4 safari vehicle",
        highlights: ["Tree-climbing lions", "Flamingo flocks", "Groundwater forest", "Diverse habitats"],
        wildlife: "Tree-climbing lions, elephants, hippos, flamingos, baboons, blue monkeys, over 400 bird species",
        tips: "Lake Manyara is compact but diverse. The tree-climbing lions are a unique sight. Best viewing in the morning.",
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
        accommodation: "N/A - Departure day",
        meals: "Breakfast included",
        transportation: "Transfer to Kilimanjaro International Airport",
        highlights: ["Farewell", "Souvenir shopping (optional)", "Airport transfer"],
        tips: "Allow 3 hours before flight departure. Optional souvenir shopping in Arusha if time permits.",
      },
    ],
  },
];

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
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedStage, setSelectedStage] = useState(0);
  const [viewMode, setViewMode] = useState("packages"); // "packages" or "itinerary"

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorSourceRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);

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
        if (selectedPackage && selectedPackage.route[stageIndex]) {
          const stageData = selectedPackage.route[stageIndex];
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
    if (!mapInitialized || !vectorSourceRef.current || !mapInstance.current || !selectedPackage) return;

    const vectorSource = vectorSourceRef.current;
    vectorSource.clear();

    const route = selectedPackage.route;
    if (route.length === 0) return;

    const routeCoordinates = route.map((stage) => fromLonLat(stage.coordinates));
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
      const point = new Point(fromLonLat(stage.coordinates));
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

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedStage(0);
    setViewMode("itinerary");
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
    if (mapInstance.current && selectedPackage?.route[stageIndex]) {
      const stage = selectedPackage.route[stageIndex];
      const view = mapInstance.current.getView();
      view.animate({
        center: fromLonLat(stage.coordinates),
        zoom: 8,
        duration: 1000,
      });
    }
  };

  const handleNextStage = () => {
    if (selectedPackage && selectedStage < selectedPackage.route.length - 1) {
      handleStageChange(selectedStage + 1);
    }
  };

  const handlePreviousStage = () => {
    if (selectedStage > 0) {
      handleStageChange(selectedStage - 1);
    }
  };

  const handleBookNow = (packageId) => {
    navigate("/plan", { state: { packageId } });
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
          {viewMode === "packages" ? (
            <>
              {/* Header Section */}
              <Box sx={{ mb: { xs: 1, sm: 1.25, md: 1.5 }, textAlign: "center" }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 0.5, md: 0.75 },
                    color: "#5D4037",
                    fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  }}
                >
                  Travel Packages
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 0.5, md: 0.75 },
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
              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} justifyContent="center">
                {packagesWithItineraries.map((pkg, index) => (
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
                          cursor: "pointer",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                          },
                        }}
                        onClick={() => handlePackageSelect(pkg)}
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
                              e.target.src = "/foundation-logo.png";
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
                                "&:hover": {
                                  borderColor: "#4E342E",
                                  backgroundColor: "#5D4037",
                                  color: "white",
                                },
                              }}
                            >
                              View Itinerary
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              fullWidth
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookNow(pkg.id);
                              }}
                              endIcon={<ArrowForward />}
                              sx={{
                                backgroundColor: "#5D4037",
                                color: "white",
                                fontSize: "0.95rem",
                                fontWeight: 700,
                                py: 0.75,
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
          ) : (
            <>
              {/* Back Button */}
              <Button
                startIcon={<ArrowBack />}
                onClick={handleBackToPackages}
                sx={{
                  mb: 2,
                  color: "#5D4037",
                  "&:hover": {
                    backgroundColor: "rgba(93, 64, 55, 0.1)",
                  },
                }}
              >
                Back to Packages
              </Button>

              {/* Package Header */}
              <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 0.5, md: 0.75 },
                    color: "#5D4037",
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                  }}
                >
                  {selectedPackage?.title}
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
                      {selectedPackage?.price} {selectedPackage?.pricePerPerson}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Schedule sx={{ color: "#5D4037" }} />
                    <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {selectedPackage?.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <People sx={{ color: "#5D4037" }} />
                    <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {selectedPackage?.groupSize}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => handleBookNow(selectedPackage?.id)}
                  sx={{
                    backgroundColor: "#5D4037",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#4E342E",
                    },
                  }}
                >
                  Book This Package
                </Button>
              </Box>

              {/* Timeline Navigation */}
              <Box sx={{ mt: 3, mb: 3 }}>
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
                  {selectedPackage?.route.map((stage, index) => (
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
                      "&:hover": {
                        borderColor: "#4E342E",
                        backgroundColor: "rgba(93, 64, 55, 0.04)",
                      },
                    }}
                  >
                    Previous Stage
                  </Button>

                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                    Stage {selectedStage + 1} of {selectedPackage?.route.length}
                  </Typography>

                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={handleNextStage}
                    disabled={selectedStage === (selectedPackage?.route.length || 0) - 1}
                    sx={{
                      backgroundColor: "#5D4037",
                      color: "white",
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
              {selectedPackage?.route[selectedStage] && (
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
                            {selectedPackage.route[selectedStage].images.map((image, index) => (
                              <ImageListItem key={index}>
                                <Box
                                  component="img"
                                  src={image}
                                  alt={`${selectedPackage.route[selectedStage].name} - Image ${index + 1}`}
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
                              Stage {selectedPackage.route[selectedStage].stage}: {selectedPackage.route[selectedStage].name}
                            </Typography>
                          </Box>

                          <Box sx={{ my: 2, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                            <Divider />
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                            <AccessTime sx={{ color: "text.secondary", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                              Duration: {selectedPackage.route[selectedStage].duration}
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
                            {selectedPackage.route[selectedStage].description}
                          </Typography>

                          <Box sx={{ my: 2, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                            <Divider />
                          </Box>

                          {selectedPackage.route[selectedStage].accommodation && (
                            <>
                              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1.5 }}>
                                <Hotel sx={{ color: "#5D4037", fontSize: 24, mt: 0.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037", mb: 0.5 }}>
                                    Accommodation
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selectedPackage.route[selectedStage].accommodation}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ my: 1.5, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                                <Divider />
                              </Box>
                            </>
                          )}

                          {selectedPackage.route[selectedStage].meals && (
                            <>
                              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1.5 }}>
                                <Restaurant sx={{ color: "#5D4037", fontSize: 24, mt: 0.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037", mb: 0.5 }}>
                                    Meals Included
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selectedPackage.route[selectedStage].meals}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ my: 1.5, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                                <Divider />
                              </Box>
                            </>
                          )}

                          {selectedPackage.route[selectedStage].highlights && (
                            <>
                              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#5D4037" }}>
                                Key Highlights
                              </Typography>
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                                {selectedPackage.route[selectedStage].highlights.map((highlight, idx) => (
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

                          {selectedPackage.route[selectedStage].wildlife && (
                            <>
                              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1.5 }}>
                                <CameraAlt sx={{ color: "#5D4037", fontSize: 24, mt: 0.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037", mb: 0.5 }}>
                                    Wildlife to Spot
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selectedPackage.route[selectedStage].wildlife}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ my: 1.5, ml: { xs: 0, md: "calc(-50% - 12px - 32px)" }, mr: { xs: 0, md: -4 }, width: { xs: "100%", md: "calc(200% + 24px + 64px)" } }}>
                                <Divider />
                              </Box>
                            </>
                          )}

                          {selectedPackage.route[selectedStage].transportation && (
                            <>
                              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1.5 }}>
                                <DirectionsCar sx={{ color: "#5D4037", fontSize: 24, mt: 0.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#5D4037", mb: 0.5 }}>
                                    Transportation
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selectedPackage.route[selectedStage].transportation}
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
                            {selectedPackage.route[selectedStage].activities.map((activity, index) => (
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
                      {selectedPackage.route[selectedStage].tips && (
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
                              {selectedPackage.route[selectedStage].tips}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PackagesWithItinerary;

