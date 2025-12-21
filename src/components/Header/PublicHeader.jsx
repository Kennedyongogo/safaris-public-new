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
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");
  const [isNavigating, setIsNavigating] = useState(false);

  const navItems = useMemo(
    () => [
      {
        label: "Home",
        icon: <Home />,
        sectionId: "hero-section",
        color: "#6B4E3D", // Medium brown
      },
      {
        label: "About Us",
        icon: <Groups />,
        route: "/team",
        color: "#B85C38", // Burnt orange/rust
      },
      {
        label: "Itineraries",
        icon: <Explore />,
        route: "/tour",
        color: "#B85C38", // Burnt orange/rust
      },
      {
        label: "Camp & Lodges",
        icon: <Cabin />,
        route: "/camp-lodges",
        color: "#6B7D47", // Olive green
      },
      {
        label: "Start Planning",
        icon: <LocalHospital />,
        route: "/plan",
        color: "#B85C38", // Burnt orange/rust
      },
      {
        label: "Reviews",
        icon: <RateReview />,
        route: "/reviews",
        color: "#2D4A2D", // Dark forest green
      },
      {
        label: "Blog",
        icon: <Article />,
        route: "/blog",
        color: "#6B4E3D", // Medium brown
      },
    ],
    []
  );

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Don't update active section if we're currently navigating (clicked a nav item)
      if (isNavigating) return;

      // Detect active section based on scroll position
      if (location.pathname === "/") {
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, navItems, isNavigating]);

  const isActive = (path) => location.pathname === path;

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
          backgroundColor: scrolled
            ? "rgba(245, 241, 232, 0.95)" // Light beige with transparency when scrolled
            : "transparent", // Completely transparent when on hero section
          backdropFilter: scrolled ? "blur(20px)" : "none", // No blur on hero section
          boxShadow: scrolled
            ? "0 8px 32px rgba(61, 40, 23, 0.12)"
            : "none", // No shadow on hero section
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom: scrolled
            ? "1px solid rgba(107, 78, 61, 0.2)" // Medium brown border when scrolled
            : "none", // No border on hero section
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Enhanced Logo Section */}
            <Fade in={true} timeout={1000}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "scale(1.05) translateY(-2px)",
                  },
                }}
                onClick={() => navigate("/")}
              >
                <img
                  src="/images/WhatsApp_Image_2025-12-14_at_10.56.47_AM-removebg-preview%20(1).png"
                  alt="Akira Safaris Logo"
                  style={{
                    height: scrolled ? "64px" : "72px",
                    maxHeight: "72px",
                    width: "auto",
                    transition: "height 0.4s ease",
                    filter: scrolled
                      ? "none"
                      : "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  }}
                />
                <Box
                  sx={{
                    ml: { xs: 1.2, sm: 2 },
                    display: { xs: "block", sm: "block" },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                      color: scrolled ? "primary.main" : "white",
                      lineHeight: 1.2,
                      transition: "all 0.3s ease",
                      textShadow: scrolled
                        ? "none"
                        : "2px 2px 4px rgba(0,0,0,0.3)",
                      background: scrolled
                        ? "linear-gradient(45deg, #6B4E3D, #3D2817)" // Medium to dark brown
                        : "linear-gradient(45deg, #ffffff, #F5F1E8)", // White to light beige
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Akira Safaris
                  </Typography>
                </Box>
              </Box>
            </Fade>

            {/* Enhanced Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {navItems.map((item, index) => {
                const isActiveItem =
                  item.route
                    ? location.pathname === item.route
                    : activeSection === item.sectionId && location.pathname === "/";
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
                      sx={{
                        color: isActiveItem
                          ? item.color
                          : scrolled
                            ? "text.primary"
                            : "white",
                        fontSize: {
                          md: "0.875rem",
                          lg: "0.925rem",
                          xl: "0.975rem",
                        },
                        fontWeight: isActiveItem ? 700 : 600,
                        px: { md: 2, lg: 1.5, xl: 2 },
                        py: { md: 1.2, lg: 1, xl: 1.2 },
                        borderRadius: "25px",
                        textTransform: "uppercase",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        backgroundColor: isActiveItem
                          ? scrolled
                            ? `${item.color}20`
                            : `${item.color}30`
                          : "transparent",
                        "&:focus": {
                          outline: "none",
                          backgroundColor: isActiveItem
                            ? scrolled
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
                            color: isActiveItem ? item.color : "inherit",
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
                        "&:hover::after": !isActiveItem
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
                              transition: "all 0.3s ease-out",
                            }
                          : {},
                        "&::after": isActiveItem
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
                          color: isActiveItem
                            ? item.color
                            : scrolled
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
                  color: mobileMenuOpen
                    ? "#6B4E3D" // Medium brown
                    : scrolled
                      ? "primary.main"
                      : "white",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: "12px",
                  backgroundColor: mobileMenuOpen
                    ? scrolled
                      ? "rgba(107, 78, 61, 0.2)" // Medium brown with transparency
                      : "rgba(107, 78, 61, 0.3)"
                    : "transparent",
                  "&:focus": {
                    outline: "none",
                    backgroundColor: mobileMenuOpen
                      ? scrolled
                        ? "rgba(107, 78, 61, 0.2)"
                        : "rgba(107, 78, 61, 0.3)"
                      : "transparent",
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    backgroundColor: mobileMenuOpen
                      ? scrolled
                        ? "rgba(107, 78, 61, 0.25)"
                        : "rgba(107, 78, 61, 0.35)"
                      : scrolled
                        ? "rgba(107, 78, 61, 0.1)"
                        : "rgba(255, 255, 255, 0.15)",
                    transform: mobileMenuOpen
                      ? "scale(1.05)"
                      : "rotate(90deg) scale(1.1)",
                    boxShadow: scrolled
                      ? "0 8px 25px rgba(107, 78, 61, 0.3)"
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
            backgroundColor: "background.default", // Light beige
            backgroundImage:
              "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(107, 78, 61, 0.2)", // Medium brown border
            boxShadow: "0 8px 32px rgba(61, 40, 23, 0.12)",
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
                background: "linear-gradient(45deg, #6B4E3D, #3D2817)", // Medium to dark brown
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
                    backgroundColor: "rgba(107, 78, 61, 0.1)", // Medium brown
                  },
                }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1.5, borderColor: "rgba(107, 78, 61, 0.2)" }} />
          <List dense sx={{ py: 0, gap: 0.5, display: "flex", flexDirection: "column" }}>
            {navItems.map((item, index) => {
              const isActiveItem =
                item.route
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
          height: scrolled ? "72px" : "80px",
          transition: "height 0.4s ease",
        }}
      />
    </>
  );
}
