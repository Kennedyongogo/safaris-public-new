import React, { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Fade,
  Slide,
} from "@mui/material";
import {
  Construction,
  Home,
  Menu as MenuIcon,
  Close,
  VolunteerActivism,
  Psychology,
  Favorite,
  School,
  LocalHospital,
  Groups,
  RateReview,
  Explore,
  Cabin,
  Hotel,
  Article,
  BusinessCenter,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(false); // Start with background, only transparent when explicitly at top
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");
  const [isNavigating, setIsNavigating] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false); // Track if user has scrolled at least once
  const [isHeroVisible, setIsHeroVisible] = useState(false); // Track if hero section is visible

  const navItems = useMemo(
    () => [
      {
        label: "Explore",
        icon: <Explore />,
        sectionId: "hero-section",
        color: "#8b7355", // Secondary Brown
      },
      {
        label: "About Akira",
        icon: <Groups />,
        route: "/team",
        color: "#c8a97e", // Accent Gold
      },
      {
        label: "Agent Partnership",
        icon: <BusinessCenter />,
        route: "/agent-program",
        color: "#8b7355", // Secondary Brown
      },
      {
        label: "Blog",
        icon: <Article />,
        route: "/blog",
        color: "#c8a97e", // Accent Gold
      },
    ],
    []
  );

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsHeaderVisible(true);
  }, [location.pathname]);

  // Listen to hero section visibility events from HeroSection component
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsHeroVisible(false);
      setIsAtTop(false);
      return;
    }

    const handleHeroVisibility = (event) => {
      const { isVisible, scrollY } = event.detail;
      setIsHeroVisible(isVisible);
      setIsAtTop(isVisible);

      console.log("📡 Header received hero visibility event:", {
        isVisible,
        scrollY,
        isAtTop: isVisible,
      });
    };

    window.addEventListener("heroVisibilityChange", handleHeroVisibility);

    // Set initial state
    setIsHeroVisible(false);
    setIsAtTop(false);

    return () => {
      window.removeEventListener("heroVisibilityChange", handleHeroVisibility);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScrolled = scrollY > 0;

      // Track if user has scrolled at least once
      if (scrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      }

      // Update scrolled state
      setScrolled(newScrolled);

      // Update isAtTop based on scroll position
      // On small screens, when scrolling back up, ensure header becomes transparent at top
      if (location.pathname === "/") {
        const isAtVeryTop = scrollY <= 20;

        // Check if hero section is actually visible in viewport
        const heroElement = document.getElementById("hero-section");
        let heroIsVisibleInViewport = false;
        if (heroElement) {
          const rect = heroElement.getBoundingClientRect();
          // Hero is visible if it's in the viewport
          heroIsVisibleInViewport =
            rect.top < window.innerHeight && rect.bottom > 0;
        }

        // Priority: if at very top, always transparent
        // Otherwise, check if hero is visible (either from state or viewport check)
        const newIsAtTop = isAtVeryTop
          ? true
          : (isHeroVisible || heroIsVisibleInViewport) && scrollY <= 50;
        setIsAtTop(newIsAtTop);

        console.log("🔍 Scroll Debug:", {
          scrollY,
          newScrolled,
          isHeroVisible,
          heroIsVisibleInViewport,
          isAtVeryTop,
          newIsAtTop,
          hasScrolled,
          location: location.pathname,
        });
      }

      // Don't update active section if we're currently navigating (clicked a nav item)
      if (isNavigating) return;

      // Detect active section based on scroll position
      if (location.pathname === "/") {
        // Header disappears as soon as user starts scrolling down on homepage
        // Show header only when at the very top (with small threshold)
        const isAtTop = window.scrollY < 50;
        setIsHeaderVisible(isAtTop);

        // Get all sections in the order they appear on the page (exclude items with routes)
        const sectionIds = navItems
          .filter((item) => !item.route && item.sectionId)
          .map((item) => item.sectionId);
        const sections = sectionIds
          .map((id) => {
            const element = document.getElementById(id);
            return element
              ? {
                  id,
                  top: element.offsetTop,
                  bottom: element.offsetTop + element.offsetHeight,
                }
              : null;
          })
          .filter((section) => section !== null)
          .sort((a, b) => a.top - b.top); // Sort by position on page

        const scrollPosition = window.scrollY + 200; // Offset for header height

        // If at top, set hero section as active
        if (window.scrollY < 100) {
          setActiveSection("hero-section");
          return;
        }

        // Find the section that's currently in view
        // Check from bottom to top to get the most recent section passed
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (scrollPosition >= section.top - 100) {
            // Add some threshold
            setActiveSection(section.id);
            break;
          }
        }
      } else if (location.pathname === "/destinations") {
        // Set Destinations as active when on destinations page
        setActiveSection("mission-section");
        setIsHeaderVisible(true); // Always visible on other pages
      } else {
        setIsHeaderVisible(true); // Always visible on other pages
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, navItems, isNavigating, hasScrolled, isHeroVisible]);

  const isActive = (path) => location.pathname === path;

  // Split nav items for centered layout on home page
  const isHomePage = location.pathname === "/";
  const leftNavItems = isHomePage
    ? navItems.slice(0, Math.floor(navItems.length / 2))
    : [];
  const rightNavItems = isHomePage
    ? navItems.slice(Math.floor(navItems.length / 2))
    : navItems;

  // Check if header is transparent (only on home page when at absolute top)
  const isHeaderTransparent = isHomePage && isAtTop;

  // Debug logging for font size conditions
  useEffect(() => {
    console.log("📊 Header State Debug:", {
      isHomePage,
      isAtTop,
      isHeaderTransparent,
      isHeaderVisible,
      scrolled,
      shouldBeLarge: isHeaderTransparent && isHeaderVisible,
      location: location.pathname,
    });
  }, [
    isHomePage,
    isAtTop,
    isHeaderTransparent,
    isHeaderVisible,
    scrolled,
    location.pathname,
  ]);

  const handleNavigateToSection = (item) => {
    setMobileMenuOpen(false);

    // If item has a route, navigate to that route
    if (item.route) {
      navigate(item.route);
      return;
    }

    // Otherwise, handle section scrolling
    const sectionId = item.sectionId;
    setActiveSection(sectionId);
    setIsNavigating(true);

    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        // Ensure active section is set after scroll and re-enable scroll detection
        setTimeout(() => {
          setActiveSection(sectionId);
          setIsNavigating(false);
        }, 1000);
      } else {
        console.warn(`Section with id "${sectionId}" not found`);
        setIsNavigating(false);
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            setActiveSection(sectionId);
            setIsNavigating(false);
          }, 1000);
        } else {
          setIsNavigating(false);
        }
      }, 100);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor:
            location.pathname === "/" && isAtTop
              ? "transparent" // Transparent only when at absolute top on home page
              : "rgba(249, 247, 243, 0.95)", // Warm White with transparency otherwise
          backdropFilter:
            location.pathname === "/" && isAtTop ? "none" : "blur(20px)",
          boxShadow:
            location.pathname === "/" && isAtTop
              ? "none"
              : "0 8px 32px rgba(26, 26, 26, 0.12)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom:
            location.pathname === "/" && isAtTop
              ? "none"
              : "1px solid rgba(139, 115, 85, 0.2)",
          // Hide header when scrolling past hero section on home page
          transform:
            location.pathname === "/" && !isHeaderVisible
              ? "translateY(-100%)"
              : "translateY(0)",
          opacity: location.pathname === "/" && !isHeaderVisible ? 0 : 1,
          pointerEvents:
            location.pathname === "/" && !isHeaderVisible ? "none" : "auto",
          // Hide active underline when any nav button is hovered
          "&:has(button:hover) button[data-active='true']::after": {
            opacity: 0,
          },
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 1.5, md: 2 }, py: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: isHomePage ? "space-between" : "flex-start",
              position: "relative",
            }}
          >
            {/* Left Navigation Items (only on home page, large screens) */}
            {isHomePage && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 1,
                  alignItems: "center",
                  flex: isHeaderTransparent && isHeaderVisible ? "0 0 auto" : 1,
                  justifyContent: "flex-start",
                  maxWidth:
                    isHeaderTransparent && isHeaderVisible ? "auto" : "none",
                }}
              >
                {leftNavItems.map((item, index) => {
                  const isActiveItem = item.route
                    ? location.pathname === item.route
                    : activeSection === item.sectionId &&
                      location.pathname === "/";
                  return (
                    <Slide
                      direction="down"
                      in={true}
                      timeout={800 + index * 200}
                      key={item.label}
                    >
                      <Button
                        onClick={() => handleNavigateToSection(item)}
                        startIcon={item.icon}
                        disableRipple
                        data-active={isActiveItem}
                        sx={{
                          color:
                            isActiveItem && location.pathname !== "/"
                              ? item.color
                              : scrolled || location.pathname !== "/"
                                ? "text.primary"
                                : "white",
                          fontSize: {
                            md: "0.875rem",
                            lg: "0.925rem",
                            xl: "0.975rem",
                          },
                          fontWeight:
                            isActiveItem && location.pathname !== "/"
                              ? 700
                              : 600,
                          px: { md: 2, lg: 1.5, xl: 2 },
                          py: { md: 1.2, lg: 1, xl: 1.2 },
                          borderRadius: "25px",
                          textTransform: "uppercase",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          position: "relative",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          backgroundColor:
                            isActiveItem && location.pathname !== "/"
                              ? scrolled || location.pathname !== "/"
                                ? `${item.color}20`
                                : `${item.color}30`
                              : "transparent",
                          "&:focus": {
                            outline: "none",
                            backgroundColor:
                              isActiveItem && location.pathname !== "/"
                                ? scrolled || location.pathname !== "/"
                                  ? `${item.color}20`
                                  : `${item.color}30`
                                : "transparent",
                          },
                          "&:focus-visible": {
                            outline: "none",
                          },
                          "& .MuiButton-startIcon": {
                            marginRight: { md: 1, lg: 0.75, xl: 1 },
                            "& > *:nth-of-type(1)": {
                              fontSize: {
                                md: "1.1rem",
                                lg: "1rem",
                                xl: "1.1rem",
                              },
                              color:
                                isActiveItem && location.pathname !== "/"
                                  ? item.color
                                  : "inherit",
                            },
                          },
                          "&:hover": {
                            backgroundColor: "transparent",
                            transform: "none",
                            boxShadow: "none",
                            "& .icon": {
                              color: item.color,
                            },
                          },
                          "&:hover::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "60%",
                            height: "3px",
                            backgroundColor:
                              location.pathname === "/" ? "white" : item.color,
                            borderRadius: "2px 2px 0 0",
                            transition: "all 0.3s ease-out",
                            zIndex: 1,
                          },
                          "&::after":
                            isActiveItem && location.pathname === "/"
                              ? {
                                  content: '""',
                                  position: "absolute",
                                  bottom: 0,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  width: "60%",
                                  height: "3px",
                                  backgroundColor: "white",
                                  borderRadius: "2px 2px 0 0",
                                  transition: "opacity 0.3s ease-out",
                                  opacity: 1,
                                }
                              : isActiveItem && location.pathname !== "/"
                                ? {
                                    content: '""',
                                    position: "absolute",
                                    bottom: 0,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "60%",
                                    height: "3px",
                                    backgroundColor: item.color,
                                    borderRadius: "2px 2px 0 0",
                                  }
                                : {},
                          "& .icon": {
                            transition: "all 0.4s ease",
                            color:
                              isActiveItem && location.pathname !== "/"
                                ? item.color
                                : scrolled || location.pathname !== "/"
                                  ? item.color
                                  : "white",
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </Slide>
                  );
                })}
              </Box>
            )}

            {/* Enhanced Logo Section - Centered on home page, left-aligned on other pages */}
            <Fade in={true} timeout={1000}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform:
                      isHeaderTransparent && isHeaderVisible
                        ? "translateX(-50%) translateY(40px) scale(1.05)"
                        : "scale(1.05) translateY(-2px)",
                  },
                  position: isHomePage ? "absolute" : "relative",
                  left: isHomePage ? "50%" : "auto",
                  transform: isHomePage
                    ? isHeaderTransparent && isHeaderVisible
                      ? "translateX(-50%) translateY(40px)"
                      : "translateX(-50%)"
                    : "none",
                  zIndex: isHeaderTransparent && isHeaderVisible ? 1000 : 2, // Higher z-index to float over hero
                  mb:
                    isHeaderTransparent && isHeaderVisible
                      ? { xs: -2, md: -4 }
                      : 0, // Extend into hero section
                  animation:
                    isHeaderTransparent && isHeaderVisible
                      ? "floatHeader 3s ease-in-out infinite"
                      : "none",
                }}
                onClick={() => navigate("/")}
              >
                {!isHomePage && (
                  <img
                    src="/images/WhatsApp_Image_2025-12-14_at_10.56.47_AM-removebg-preview%20(1).png"
                    alt="Akira Safaris Logo"
                    style={{
                      height:
                        scrolled || location.pathname !== "/" ? "64px" : "72px",
                      maxHeight: "72px",
                      width: "auto",
                      transition: "all 0.4s ease",
                      filter:
                        scrolled || location.pathname !== "/"
                          ? "none"
                          : "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                    }}
                  />
                )}
                <Box
                  sx={{
                    ml: isHomePage ? 0 : { xs: 1.5, sm: 2 },
                    display: { xs: "block", sm: "block" },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight:
                        isHeaderTransparent && isHeaderVisible ? 900 : 700,
                      fontSize:
                        isHeaderTransparent && isHeaderVisible
                          ? {
                              xs: "1.2rem", // Reduced for small screens to fit in one row
                              sm: "2rem",
                              md: "3rem",
                              lg: "3.6rem",
                              xl: "4.2rem",
                            }
                          : { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                      // Black when header has background, gradient when transparent/floating
                      color:
                        isHeaderTransparent && isHeaderVisible
                          ? "transparent" // Will use gradient
                          : "#000000", // Black when inside header
                      lineHeight: 1.1,
                      // Exclude fontSize from transition to prevent visible resize - fontSize changes instantly
                      transition:
                        "color 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s cubic-bezier(0.4, 0, 0.2, 1), textShadow 0.5s cubic-bezier(0.4, 0, 0.2, 1), letterSpacing 0.5s cubic-bezier(0.4, 0, 0.2, 1), fontWeight 0.3s ease",
                      textShadow:
                        isHeaderTransparent && isHeaderVisible
                          ? "4px 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4), 0 0 60px rgba(224, 216, 192, 0.3)"
                          : "none",
                      // Only use gradient when transparent/floating, otherwise solid black
                      background:
                        isHeaderTransparent && isHeaderVisible
                          ? "linear-gradient(135deg, #c8a97e 0%, #f9f7f3 20%, #ffffff 40%, #f9f7f3 60%, #8b7355 80%, #1a1a1a 100%)"
                          : "none",
                      backgroundClip:
                        isHeaderTransparent && isHeaderVisible
                          ? "text"
                          : "unset",
                      WebkitBackgroundClip:
                        isHeaderTransparent && isHeaderVisible
                          ? "text"
                          : "unset",
                      WebkitTextFillColor:
                        isHeaderTransparent && isHeaderVisible
                          ? "transparent"
                          : "#000000",
                      letterSpacing:
                        isHeaderTransparent && isHeaderVisible
                          ? {
                              xs: "0.02em",
                              sm: "0.05em",
                              md: "0.08em",
                              lg: "0.1em",
                            }
                          : "0.02em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                  >
                    AKIRA SAFARIS
                  </Typography>
                </Box>
              </Box>
            </Fade>

            {/* Right Navigation Items */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
                flex: isHeaderTransparent && isHeaderVisible ? "0 0 auto" : 1,
                justifyContent: isHomePage ? "flex-end" : "flex-end",
                marginLeft: isHomePage ? 0 : "auto",
                maxWidth:
                  isHeaderTransparent && isHeaderVisible ? "auto" : "none",
              }}
            >
              {rightNavItems.map((item, index) => {
                const isActiveItem = item.route
                  ? location.pathname === item.route
                  : activeSection === item.sectionId &&
                    location.pathname === "/";
                // Adjust timeout to account for left nav items on home page
                const adjustedIndex = isHomePage
                  ? leftNavItems.length + index
                  : index;
                return (
                  <Slide
                    direction="down"
                    in={true}
                    timeout={800 + adjustedIndex * 200}
                    key={item.label}
                  >
                    <Button
                      onClick={() => handleNavigateToSection(item)}
                      startIcon={item.icon}
                      disableRipple
                      data-active={isActiveItem}
                      sx={{
                        color:
                          isActiveItem && location.pathname !== "/"
                            ? item.color
                            : scrolled || location.pathname !== "/"
                              ? "text.primary"
                              : "white",
                        fontSize: {
                          md: "0.875rem",
                          lg: "0.925rem",
                          xl: "0.975rem",
                        },
                        fontWeight:
                          isActiveItem && location.pathname !== "/" ? 700 : 600,
                        px: { md: 2, lg: 1.5, xl: 2 },
                        py: { md: 1.2, lg: 1, xl: 1.2 },
                        borderRadius: "25px",
                        textTransform: "uppercase",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        backgroundColor:
                          isActiveItem && location.pathname !== "/"
                            ? scrolled || location.pathname !== "/"
                              ? `${item.color}20`
                              : `${item.color}30`
                            : "transparent",
                        "&:focus": {
                          outline: "none",
                          backgroundColor:
                            isActiveItem && location.pathname !== "/"
                              ? scrolled || location.pathname !== "/"
                                ? `${item.color}20`
                                : `${item.color}30`
                              : "transparent",
                        },
                        "&:focus-visible": {
                          outline: "none",
                        },
                        "& .MuiButton-startIcon": {
                          marginRight: { md: 1, lg: 0.75, xl: 1 },
                          "& > *:nth-of-type(1)": {
                            fontSize: {
                              md: "1.1rem",
                              lg: "1rem",
                              xl: "1.1rem",
                            },
                            color:
                              isActiveItem && location.pathname !== "/"
                                ? item.color
                                : "inherit",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "transparent",
                          transform: "none",
                          boxShadow: "none",
                          "& .icon": {
                            color: item.color,
                          },
                        },
                        "&:hover::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "60%",
                          height: "3px",
                          backgroundColor:
                            location.pathname === "/" ? "white" : item.color,
                          borderRadius: "2px 2px 0 0",
                          transition: "all 0.3s ease-out",
                          zIndex: 1,
                        },
                        "&::after":
                          isActiveItem && location.pathname === "/"
                            ? {
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "60%",
                                height: "3px",
                                backgroundColor: "white",
                                borderRadius: "2px 2px 0 0",
                                transition: "opacity 0.3s ease-out",
                                opacity: 1,
                              }
                            : isActiveItem && location.pathname !== "/"
                              ? {
                                  content: '""',
                                  position: "absolute",
                                  bottom: 0,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  width: "60%",
                                  height: "3px",
                                  backgroundColor: item.color,
                                  borderRadius: "2px 2px 0 0",
                                }
                              : {},
                        "& .icon": {
                          transition: "all 0.4s ease",
                          color:
                            isActiveItem && location.pathname !== "/"
                              ? item.color
                              : scrolled || location.pathname !== "/"
                                ? item.color
                                : "white",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Slide>
                );
              })}
            </Box>

            {/* Enhanced Mobile Menu Button */}
            <Fade in={true} timeout={1200}>
              <IconButton
                disableRipple
                sx={{
                  display: { xs: "flex", md: "none" },
                  marginLeft: "auto",
                  color: mobileMenuOpen
                    ? "#8b7355" // Secondary Brown
                    : scrolled || location.pathname !== "/"
                      ? "#1a1a1a"
                      : "white",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: "12px",
                  backgroundColor: mobileMenuOpen
                    ? scrolled || location.pathname !== "/"
                      ? "rgba(139, 115, 85, 0.2)" // Secondary Brown with transparency
                      : "rgba(139, 115, 85, 0.3)"
                    : "transparent",
                  "&:focus": {
                    outline: "none",
                    backgroundColor: mobileMenuOpen
                      ? scrolled || location.pathname !== "/"
                        ? "rgba(139, 115, 85, 0.2)"
                        : "rgba(139, 115, 85, 0.3)"
                      : "transparent",
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    backgroundColor: mobileMenuOpen
                      ? scrolled || location.pathname !== "/"
                        ? "rgba(139, 115, 85, 0.25)"
                        : "rgba(139, 115, 85, 0.35)"
                      : scrolled || location.pathname !== "/"
                        ? "rgba(139, 115, 85, 0.1)"
                        : "rgba(255, 255, 255, 0.15)",
                    transform: mobileMenuOpen
                      ? "scale(1.05)"
                      : "rotate(90deg) scale(1.1)",
                    boxShadow:
                      scrolled || location.pathname !== "/"
                        ? "0 8px 25px rgba(139, 115, 85, 0.3)"
                        : "0 8px 25px rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
            </Fade>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Compact Mobile Dropdown */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "260px", sm: "300px" },
            marginRight: { xs: 2, sm: 3 }, // Add right margin so it doesn't appear cut by screen edge
            backgroundColor: "#f9f7f3", // Warm White
            backgroundImage:
              "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(139, 115, 85, 0.2)", // Secondary Brown border
            boxShadow: "0 8px 32px rgba(26, 26, 26, 0.12)",
            height: "auto", // shrink to content by default
            maxHeight: {
              xs: "calc(100vh - 72px)",
              sm: "calc(100vh - 80px)",
            }, // cap height on small screens
            top: { xs: "64px", sm: "72px" },
            overflowY: "auto", // always allow scroll if items overflow
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #8b7355, #1a1a1a)", // Secondary Brown to Primary Black
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Menu
            </Typography>
            <IconButton
              onClick={() => setMobileMenuOpen(false)}
              size="small"
              sx={{
                transition: "all 0.3s ease",
                borderRadius: "8px",
                "&:focus": { outline: "none" },
                "&:focus-visible": { outline: "none", boxShadow: "none" },
                "&:hover": {
                  transform: "rotate(90deg)",
                  backgroundColor: "rgba(139, 115, 85, 0.1)", // Secondary Brown
                },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1.5, borderColor: "rgba(139, 115, 85, 0.2)" }} />
          <List
            dense
            sx={{ py: 0, gap: 0.5, display: "flex", flexDirection: "column" }}
          >
            {navItems.map((item, index) => {
              const isActiveItem = item.route
                ? location.pathname === item.route
                : activeSection === item.sectionId && location.pathname === "/";
              return (
                <ListItem
                  dense
                  key={item.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateToSection(item);
                  }}
                  disableRipple
                  sx={{
                    cursor: "pointer",
                    borderRadius: "12px",
                    py: 1,
                    px: 1.5,
                    transition: "all 0.3s ease",
                    backgroundColor: isActiveItem
                      ? `${item.color}20`
                      : "transparent",
                    borderLeft: isActiveItem
                      ? `3px solid ${item.color}`
                      : "3px solid transparent",
                    "&:focus": {
                      outline: "none",
                      backgroundColor: isActiveItem
                        ? `${item.color}20`
                        : "transparent",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                    "&:hover": {
                      backgroundColor: `${item.color}15`,
                      transform: "translateX(8px)",
                      boxShadow: `0 4px 12px ${item.color}20`,
                      "& .icon": {
                        color: item.color,
                        transform: "rotate(180deg)",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActiveItem ? item.color : item.color,
                      minWidth: 32,
                      "& .icon": {
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      className: "icon",
                      fontSize: "small",
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      fontWeight: isActiveItem ? 700 : 600,
                      color: isActiveItem ? item.color : "text.primary",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Toolbar
        sx={{
          height: scrolled || location.pathname !== "/" ? "72px" : "80px",
          transition: "height 0.4s ease",
        }}
      />

      <style>
        {`
          @keyframes floatHeader {
            0%, 100% {
              transform: translateX(-50%) translateY(40px);
            }
            50% {
              transform: translateX(-50%) translateY(30px);
            }
          }
        `}
      </style>
    </>
  );
}
