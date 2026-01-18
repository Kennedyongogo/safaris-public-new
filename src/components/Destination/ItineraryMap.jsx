import React, { useEffect, useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import { Map as MapIcon, SatelliteAlt, Terrain } from "@mui/icons-material";

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icon with day number
const createDayMarker = (dayNumber) => {
  return L.divIcon({
    className: "custom-day-marker",
    html: `<div style="
      background-color: #6B4E3D;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      cursor: pointer;
    ">${dayNumber}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Arrow icon for showing route direction
const createArrowIcon = (bearing) => {
  const rotation = bearing || 0;
  return L.divIcon({
    className: "direction-arrow",
    html: `<div style="
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid #6B4E3D;
      transform: rotate(${rotation}deg);
      transform-origin: center bottom;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      opacity: 0.8;
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Calculate bearing (direction) between two points in degrees
const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const lat1Rad = lat1 * (Math.PI / 180);
  const lat2Rad = lat2 * (Math.PI / 180);
  
  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  
  const bearing = Math.atan2(y, x) * (180 / Math.PI);
  return (bearing + 360) % 360; // Normalize to 0-360
};

// Get a point along a line at a given percentage (0-1)
const getPointAlongLine = (start, end, percentage) => {
  const lat = start[0] + (end[0] - start[0]) * percentage;
  const lng = start[1] + (end[1] - start[1]) * percentage;
  return [lat, lng];
};

// Component to fit map bounds
function MapBounds({ bounds, boundsKey }) {
  const map = useMap();
  const hasFittedBounds = useRef(false);
  const lastBoundsKey = useRef(null);

  useEffect(() => {
    if (bounds && bounds.length > 0 && boundsKey !== lastBoundsKey.current) {
      hasFittedBounds.current = false;
      lastBoundsKey.current = boundsKey;
    }
  }, [bounds, boundsKey]);

  useEffect(() => {
    if (bounds && bounds.length > 0 && !hasFittedBounds.current) {
      try {
        const latLngBounds = L.latLngBounds(bounds);
        map.fitBounds(latLngBounds, { padding: [20, 20], maxZoom: 12 });
        hasFittedBounds.current = true;
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    }
  }, [bounds, map]);

  return null;
}

// Component to update tile layer dynamically
function DynamicTileLayer({ mapType }) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    // Remove existing tile layer
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    // Create new tile layer based on mapType
    let tileLayer;
    
    if (mapType === "satellite") {
      tileLayer = L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        attribution: "© Google Maps",
      });
    } else if (mapType === "terrain") {
      tileLayer = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
      });
    } else {
      // OSM (default)
      tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
    }

    tileLayer.addTo(map);
    layerRef.current = tileLayer;

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, mapType]);

  return null;
}

// Calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Format distance for display
const formatDistance = (distanceInKm) => {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)}m`;
  }
  return `${distanceInKm.toFixed(1)}km`;
};

const ItineraryMap = ({ itinerary, height = 300 }) => {
  const [mapType, setMapType] = useState("osm"); // "osm", "satellite", "terrain"

  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return null;
  }

  // Memoize the bounds calculation to prevent re-centering on every render
  const { allCoordinates, routeSegments, markers } = useMemo(() => {
    const coords = [];
    const segments = [];
    const marks = [];

    itinerary.forEach((day, index) => {
      if (!day.start_location || !day.start_location.latitude || !day.start_location.longitude) {
        return; // Skip if no start location
      }

      const startCoord = [day.start_location.latitude, day.start_location.longitude];
      
      // Check if day has end location that's different from start
      const hasEndLocation =
        day.end_location &&
        day.end_location.latitude &&
        day.end_location.longitude &&
        (day.end_location.latitude !== day.start_location.latitude ||
          day.end_location.longitude !== day.start_location.longitude);

      const endCoord = hasEndLocation
        ? [day.end_location.latitude, day.end_location.longitude]
        : null;

      // Add coordinates to bounds
      coords.push(startCoord);
      if (hasEndLocation && endCoord) {
        coords.push(endCoord);
      }

      // Calculate distance if end location exists
      let distance = null;
      if (hasEndLocation && endCoord) {
        distance = calculateDistance(
          startCoord[0],
          startCoord[1],
          endCoord[0],
          endCoord[1]
        );
      }

      // Add marker at START location with day number
      marks.push({
        position: startCoord,
        day: day.day,
        description: day.description,
        isStart: true,
        distance: distance,
      });

      // Add marker at END location with same day number (if end exists and is different)
      if (hasEndLocation && endCoord) {
        marks.push({
          position: endCoord,
          day: day.day,
          description: day.description,
          isStart: false,
          distance: distance,
        });

        // Draw route within the day (from start to end)
        segments.push({
          coordinates: [startCoord, endCoord],
          day: day.day,
          isDayRoute: true,
        });
      }

      // Connect consecutive days: current day's end (or start if no end) → next day's start
      if (index < itinerary.length - 1) {
        const nextDay = itinerary[index + 1];
        if (
          nextDay.start_location &&
          nextDay.start_location.latitude &&
          nextDay.start_location.longitude
        ) {
          const nextStartCoord = [
            nextDay.start_location.latitude,
            nextDay.start_location.longitude,
          ];
          
          // Use end location if exists, otherwise use start location
          const currentDayEnd = endCoord || startCoord;
          
          // Only draw connecting line if next day's start is different from current day's end/start
          if (
            nextStartCoord[0] !== currentDayEnd[0] ||
            nextStartCoord[1] !== currentDayEnd[1]
          ) {
            segments.push({
              coordinates: [currentDayEnd, nextStartCoord],
              day: `Day ${day.day} to ${nextDay.day}`,
              isDayRoute: false,
            });
          }
        }
      }
    });

    return { allCoordinates: coords, routeSegments: segments, markers: marks };
  }, [itinerary]); // Only recalculate when itinerary changes

  // Default center if no coordinates
  const defaultCenter = [-1.2921, 36.8219]; // Nairobi
  const mapCenter =
    allCoordinates.length > 0
      ? allCoordinates[Math.floor(allCoordinates.length / 2)]
      : defaultCenter;

  return (
    <Box sx={{ width: "100%", height, borderRadius: 1, overflow: "hidden", border: "1px solid #e0e0e0", position: "relative" }}>
      {/* Map type switcher */}
      <Paper
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          display: "flex",
          gap: 0.5,
          p: 0.5,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: 1,
        }}
      >
        <IconButton
          size="small"
          onClick={() => setMapType("osm")}
          sx={{
            backgroundColor: mapType === "osm" ? "#6B4E3D" : "transparent",
            color: mapType === "osm" ? "white" : "#6B4E3D",
            width: 40,
            height: 40,
            borderRadius: 2,
            outline: "none !important",
            "&:focus": { outline: "none !important", boxShadow: "none !important" },
            "&:focus-visible": { outline: "none !important", boxShadow: "none !important" },
            "&:active": { outline: "none !important" },
            "&:hover": {
              backgroundColor: mapType === "osm" ? "#B85C38" : "rgba(107, 78, 61, 0.1)",
            },
          }}
          title="Standard Map"
        >
          <MapIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setMapType("satellite")}
          sx={{
            backgroundColor: mapType === "satellite" ? "#6B4E3D" : "transparent",
            color: mapType === "satellite" ? "white" : "#6B4E3D",
            width: 40,
            height: 40,
            borderRadius: 2,
            outline: "none !important",
            "&:focus": { outline: "none !important", boxShadow: "none !important" },
            "&:focus-visible": { outline: "none !important", boxShadow: "none !important" },
            "&:active": { outline: "none !important" },
            "&:hover": {
              backgroundColor: mapType === "satellite" ? "#B85C38" : "rgba(107, 78, 61, 0.1)",
            },
          }}
          title="Satellite View"
        >
          <SatelliteAlt fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setMapType("terrain")}
          sx={{
            backgroundColor: mapType === "terrain" ? "#6B4E3D" : "transparent",
            color: mapType === "terrain" ? "white" : "#6B4E3D",
            width: 40,
            height: 40,
            borderRadius: 2,
            outline: "none !important",
            "&:focus": { outline: "none !important", boxShadow: "none !important" },
            "&:focus-visible": { outline: "none !important", boxShadow: "none !important" },
            "&:active": { outline: "none !important" },
            "&:hover": {
              backgroundColor: mapType === "terrain" ? "#B85C38" : "rgba(107, 78, 61, 0.1)",
            },
          }}
          title="Terrain View"
        >
          <Terrain fontSize="small" />
        </IconButton>
      </Paper>

      <MapContainer
        center={mapCenter}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <DynamicTileLayer mapType={mapType} />

        {/* Draw route segments with direction arrows */}
        {routeSegments.map((segment, idx) => {
          const [start, end] = segment.coordinates;
          const bearing = calculateBearing(start[0], start[1], end[0], end[1]);
          
          // Calculate points along the route for arrows (at 25%, 50%, 75%)
          const arrowPositions = [0.25, 0.5, 0.75].map((percent) => ({
            position: getPointAlongLine(start, end, percent),
            bearing: bearing,
          }));

          return (
            <React.Fragment key={`route-${idx}`}>
              <Polyline
                positions={segment.coordinates}
                color="#6B4E3D"
                weight={3}
                opacity={0.7}
                dashArray={segment.isDayRoute ? "" : "5, 5"}
              />
              {/* Add directional arrows along the route */}
              {arrowPositions.map((arrow, arrowIdx) => (
                <Marker
                  key={`arrow-${idx}-${arrowIdx}`}
                  position={arrow.position}
                  icon={createArrowIcon(arrow.bearing)}
                  interactive={false}
                  zIndexOffset={500}
                />
              ))}
            </React.Fragment>
          );
        })}

        {/* Add markers for each day */}
        {markers.map((marker, idx) => {
          const locationType = marker.isStart ? "Start" : "End";
          
          return (
            <Marker 
              key={`marker-${idx}`} 
              position={marker.position} 
              icon={createDayMarker(marker.day)}
            >
              <Popup>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Day {marker.day} ({locationType})
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {marker.description || "No description"}
                  </Typography>
                  {marker.distance !== null && marker.distance !== undefined && (
                    <Typography variant="body2" sx={{ color: "#6B4E3D", fontWeight: 600, mt: 0.5 }}>
                      📍 Distance: {formatDistance(marker.distance)}
                    </Typography>
                  )}
                  <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
                    {marker.position[0].toFixed(6)}, {marker.position[1].toFixed(6)}
                  </Typography>
                </Box>
              </Popup>
            </Marker>
          );
        })}

        {/* Fit bounds to show all markers - only once on initial mount */}
        {allCoordinates.length > 0 && <MapBounds bounds={allCoordinates} boundsKey={JSON.stringify(allCoordinates)} />}
      </MapContainer>
    </Box>
  );
};

export default ItineraryMap;
