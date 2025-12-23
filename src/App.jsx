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
              <Box sx={{ mb: 3, position: "relative", zIndex: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#3D2817",
                    mb: 2,
                    textAlign: "center",
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
                  }}
                >
                  Crafting Your African Adventure
                </Typography>
              </Box>
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <CircularProgress
                  size={60}
                  thickness={4}
                  sx={{
                    color: "#B85C38",
                    mb: 2,
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "#6B4E3D",
                  textAlign: "center",
                  fontWeight: 500,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Loading your experience...
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
