import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, LinearProgress } from "@mui/material";
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
            <LinearProgress
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1400,
                "& .MuiLinearProgress-bar": {
                  transition: "transform 0.2s ease",
                },
              }}
            />
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
