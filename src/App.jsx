import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, LinearProgress, Box, Typography, CircularProgress } from "@mui/material";
import { theme } from "./theme";
import "./App.css";
import React, { useState, useEffect, Suspense, lazy } from "react";
import PublicHeader from "./components/Header/PublicHeader";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const TeamMemberDetail = lazy(() => import("./pages/TeamMemberDetail"));
const Team = lazy(() => import("./pages/Team"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Plan = lazy(() => import("./pages/Plan"));
const DestinationDetails = lazy(() => import("./pages/DestinationDetails"));
const Destinations = lazy(() => import("./pages/Destinations"));
const CampLodges = lazy(() => import("./pages/CampLodges"));
const CampLodgeDetail = lazy(() => import("./pages/CampLodgeDetail"));
const Tour = lazy(() => import("./pages/Tour"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PrivateRoute({ user, children }) {
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;
}

function App() {
  const [user, setUser] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true); // Drawer open by default

  return (
    <ThemeProvider theme={theme}>
      <Router style={{ margin: 0, padding: 0 }}>
        <ScrollToTop />
        <PublicHeader />
        <Suspense
          fallback={
            <Box
              sx={{
                position: "fixed",
                top: "72px", // Below header
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "#F5F1E8",
                background:
                  "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1399,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "radial-gradient(circle at 20% 80%, rgba(184, 92, 56, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 78, 61, 0.08) 0%, transparent 50%)",
                  zIndex: -1,
                },
              }}
            >
              <Box sx={{ mb: 3, position: "relative", zIndex: 1, textAlign: "center" }}>
                {/* Safari animal icon */}
                <Box
                  sx={{
                    fontSize: "3.5rem",
                    mb: 2,
                    animation: "bounce 2s ease-in-out infinite",
                  }}
                >
                  🦁
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#3D2817",
                    mb: 1,
                    textAlign: "center",
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                  }}
                >
                  Akira Safaris
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#B85C38",
                    textAlign: "center",
                    fontWeight: 500,
                    mb: 2,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                  }}
                >
                  Crafting Your African Adventure
                </Typography>

                {/* Animated progress dots */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
                  {[0, 1, 2].map((index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#B85C38",
                        animation: `pulse 1.5s ease-in-out infinite ${index * 0.2}s`,
                        boxShadow: "0 0 10px rgba(184, 92, 56, 0.3)",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: "#6B4E3D",
                  textAlign: "center",
                  fontWeight: 500,
                  position: "relative",
                  zIndex: 1,
                  mb: 2,
                  fontSize: "1.1rem",
                }}
              >
                Preparing your safari experience...
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#8B7355",
                  textAlign: "center",
                  fontWeight: 400,
                  position: "relative",
                  zIndex: 1,
                  opacity: 0.8,
                  maxWidth: "300px",
                  mx: "auto",
                }}
              >
                Loading destinations, wildlife, and unforgettable moments
              </Typography>
            </Box>
          }
        >
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <Home />
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <Team />
                  <Footer />
                </>
              }
            />
            <Route
              path="/team/:id"
              element={
                <>
                  <TeamMemberDetail />
                  <Footer />
                </>
              }
            />
            <Route
              path="/reviews"
              element={
                <>
                  <Reviews />
                  <Footer />
                </>
              }
            />
            <Route
              path="/plan"
              element={
                <>
                  <Plan />
                  <Footer />
                </>
              }
            />
            <Route
              path="/destinations"
              element={
                <>
                  <Destinations />
                  <Footer />
                </>
              }
            />
            <Route
              path="/destination/:id"
              element={
                <>
                  <DestinationDetails />
                  <Footer />
                </>
              }
            />
            <Route
              path="/camp-lodges"
              element={
                <>
                  <CampLodges />
                  <Footer />
                </>
              }
            />
            <Route
              path="/camp-lodges/:id"
              element={
                <>
                  <CampLodgeDetail />
                  <Footer />
                </>
              }
            />
            <Route
              path="/tour"
              element={
                <>
                  <Tour />
                  <Footer />
                </>
              }
            />
            <Route
              path="/blog"
              element={
                <>
                  <Blog />
                  <Footer />
                </>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <>
                  <BlogDetail />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Suspense>
        <Chatbot />
      </Router>
    </ThemeProvider>
  );
}

export default App;

// Global styles for loading animations
const styles = `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
