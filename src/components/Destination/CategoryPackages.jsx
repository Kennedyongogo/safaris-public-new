import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack, Image as ImageIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

// Package Card Component with Image Transitions - Compact & Beautiful Design
const PackageCard = ({ package: pkg, categoryName, onClick, onInquire, destination, isHighlighted }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);

  const images = pkg.gallery || [];
  const hasMultipleImages = images.length > 1;

  // Scroll into view and highlight when component mounts if highlighted
  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [isHighlighted]);

  // Auto-transition images if there are multiple
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <Card
      ref={cardRef}
      sx={{
        overflow: "hidden",
        border: isHighlighted 
          ? "3px solid #c8a97e" 
          : "1px solid rgba(139, 115, 85, 0.15)",
        borderRadius: 3,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: isHighlighted
          ? "linear-gradient(to bottom, #fff9f0 0%, #f9f7f3 100%)"
          : "linear-gradient(to bottom, #FFFFFF 0%, #f9f7f3 100%)",
        boxShadow: isHighlighted
          ? "0 8px 24px rgba(200, 169, 126, 0.25)"
          : "0 2px 8px rgba(26, 26, 26, 0.08)",
        animation: isHighlighted ? "highlightPulse 2s ease-in-out" : "none",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 32px rgba(26, 26, 26, 0.15)",
          borderColor: "rgba(200, 169, 126, 0.3)",
        },
        "@keyframes highlightPulse": {
          "0%, 100%": {
            boxShadow: "0 8px 24px rgba(200, 169, 126, 0.25)",
          },
          "50%": {
            boxShadow: "0 12px 32px rgba(200, 169, 126, 0.4)",
          },
        },
      }}
      onClick={() => onClick(pkg)}
    >
      {/* Image Section - Compact */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "220px", md: "240px" },
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        {images.length > 0 ? (
          <>
            {images.map((image, imgIndex) => {
              const isActive = imgIndex === currentImageIndex;
              return (
                <Box
                  key={imgIndex}
                  component="img"
                  src={image}
                  alt={`${pkg.title} - Image ${imgIndex + 1}`}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.6s ease-in-out",
                  }}
                  onError={(e) => {
                    e.target.src = "/IMG-20251210-WA0070.jpg";
                  }}
                />
              );
            })}
            {hasMultipleImages && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 0.75,
                  zIndex: 3,
                }}
              >
                {images.map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      width: currentImageIndex === idx ? 24 : 8,
                      height: 8,
                      borderRadius: "4px",
                      backgroundColor:
                        currentImageIndex === idx
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(255, 255, 255, 0.4)",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                ))}
              </Box>
            )}
            {/* Gradient overlay for better text readability */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background: "linear-gradient(to top, rgba(26, 26, 26, 0.3), transparent)",
                pointerEvents: "none",
              }}
            />
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <ImageIcon sx={{ fontSize: 48, color: "rgba(0,0,0,0.2)" }} />
          </Box>
        )}
      </Box>

      {/* Content Section - Compact */}
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, pb: { xs: 1.5, sm: 2 } }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 0.75,
            color: "#1a1a1a",
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {pkg.title}
        </Typography>

        {/* Description - Truncated */}
        <Typography
          variant="body2"
          sx={{
            color: "#666666",
            lineHeight: 1.5,
            fontSize: { xs: "0.875rem", sm: "0.9rem" },
            mb: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.7em",
          }}
        >
          {pkg.short_description}
        </Typography>

        {/* Highlights - Compact with icons */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <Box sx={{ mb: 1.25 }}>
            <Box
              component="ul"
              sx={{
                pl: 0,
                mb: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {pkg.highlights.slice(0, 2).map((highlight, idx) => (
                <Box
                  key={idx}
                  component="li"
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 0.75,
                  }}
                >
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: "#c8a97e",
                      mt: 0.75,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666666",
                      lineHeight: 1.4,
                      fontSize: { xs: "0.8rem", sm: "0.85rem" },
                      fontWeight: 500,
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {highlight}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Pricing - Compact */}
        {pkg.pricing_tiers && pkg.pricing_tiers.length > 0 && (
          <Box
            sx={{
              mt: "auto",
              pt: 1,
              borderTop: "1px solid rgba(139, 115, 85, 0.1)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#8b7355",
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                fontWeight: 600,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {pkg.pricing_tiers[0]?.tier && (
                <>
                  <Box component="span" sx={{ color: "#c8a97e", mr: 0.5 }}>
                    From:
                  </Box>
                  {pkg.pricing_tiers[0].price_range}
                </>
              )}
            </Typography>
          </Box>
        )}

        {/* View Details and Inquire Buttons */}
        <Box
          sx={{
            mt: 1.25,
            pt: 1.25,
            borderTop: "1px solid rgba(139, 115, 85, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#c8a97e",
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              cursor: "pointer",
              "&:hover": {
                color: "#8b7355",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClick(pkg);
            }}
          >
            View Details
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (onInquire) {
                onInquire(pkg);
              }
            }}
            sx={{
              backgroundColor: "#c8a97e",
              color: "white",
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              px: { xs: 1.5, sm: 2 },
              py: 0.5,
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "#8b7355",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Inquire
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function CategoryPackages() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const [dialogImageIndex, setDialogImageIndex] = useState(0);
  const [highlightedPackageId, setHighlightedPackageId] = useState(null);

  // Get category and destination data from location state
  const category = location.state?.category;
  const destination = location.state?.destination;

  // Check if we're returning from package inquiry and should highlight a package
  useEffect(() => {
    const state = location.state;
    if (state?.highlightPackageId) {
      setHighlightedPackageId(state.highlightPackageId);
      // Remove highlight after 3 seconds
      const timer = setTimeout(() => {
        setHighlightedPackageId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  const destinationId = location.state?.destinationId;

  // Auto-transition images in dialog if there are multiple
  useEffect(() => {
    if (!packageDialogOpen || !selectedPackage || !selectedPackage.gallery || selectedPackage.gallery.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setDialogImageIndex((prev) => (prev + 1) % selectedPackage.gallery.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [packageDialogOpen, selectedPackage]);

  const handlePackageClick = (pkg) => {
    // Navigate to PackageDetail page instead of opening dialog
    navigate("/package-detail", {
      state: {
        package: pkg,
        category: category,
        destination: destination,
        destinationId: destinationId,
        returnPath: location.pathname,
      },
    });
  };

  const handleClosePackageDialog = () => {
    setPackageDialogOpen(false);
    setSelectedPackage(null);
    setDialogImageIndex(0);
  };

  const handleInquire = (pkg) => {
    // Create unique identifier for the package
    const packageId = `${category?.category_name || 'unknown'}-${pkg.number || 'unknown'}`;
    
    // Navigate to dedicated package inquiry page with package details
    navigate("/package-inquiry", { 
      state: { 
        package: pkg,
        destination: destination,
        category: category, // Pass the full category object, not just the name
        categoryName: category?.category_name, // Also pass name for convenience
        packageId: packageId, // Pass the unique ID
        returnPath: location.pathname, // Store the return path
        destinationId: destinationId, // Pass destination ID
      } 
    });
  };

  const handleBackToCategories = () => {
    // Navigate back to destination details page
    if (destinationId) {
      navigate(`/destination/${destinationId}`);
    } else {
      navigate(-1);
    }
  };

  // Check if category is valid (must have packages array)
  if (!category || !category.packages || !Array.isArray(category.packages)) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Category not found or invalid. Please navigate from a destination page.
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToCategories}
          variant="contained"
          sx={{
            backgroundColor: "#c8a97e",
            "&:hover": {
              backgroundColor: "#8b7355",
            },
          }}
        >
          Back to Destination
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        pt: 0.75,
        pb: 0.75,
        px: 0,
        bgcolor: "#f9f7f3",
        background:
          "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(249, 247, 243, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(200, 169, 126, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 115, 85, 0.08) 0%, transparent 50%)",
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
          pt: { xs: 0.375, sm: 0.375, md: 0.375 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBackToCategories}
            sx={{
              mt: 0.5,
              mb: 0.5,
              backgroundColor: "#c8a97e",
              color: "white",
              fontWeight: 600,
              outline: "none",
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:focus-visible": { outline: "none", boxShadow: "none" },
              "&:hover": {
                backgroundColor: "#8b7355",
              },
            }}
          >
            Back to Categories
          </Button>

          {/* Main Card Container - Like PackageInquiry */}
          <Paper
            elevation={3}
            sx={{
              py: { xs: 0.75, sm: 1, md: 1.25 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(139, 115, 85, 0.2)",
              overflow: "hidden",
            }}
          >
            {/* Category Header */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#1a1a1a",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                }}
              >
                {category.category_name}
              </Typography>
              {category.packages && category.packages.length > 0 && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "#666666",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    fontWeight: 500,
                  }}
                >
                  {category.packages.length} {category.packages.length === 1 ? "Package" : "Packages"} Available
                </Typography>
              )}
            </Box>

            {/* Packages Grid */}
            {category.packages && category.packages.length > 0 ? (
              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                {category.packages.map((pkg, pkgIndex) => {
                  const packageId = `${category.category_name}-${pkg.number || pkgIndex}`;
                  const isHighlighted = highlightedPackageId === packageId;
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pkgIndex}>
                      <PackageCard
                        package={pkg}
                        categoryName={category.category_name}
                        onClick={handlePackageClick}
                        onInquire={handleInquire}
                        destination={destination}
                        isHighlighted={isHighlighted}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Alert severity="info">
                No packages available in this category.
              </Alert>
            )}
          </Paper>
        </MotionBox>
      </Container>

      {/* Package Detail Dialog */}
      <Dialog
        open={packageDialogOpen}
        onClose={handleClosePackageDialog}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            border: "1px solid rgba(139, 115, 85, 0.2)",
          },
        }}
      >
        {selectedPackage && (
          <>
            <DialogTitle
              sx={{
                pb: 1,
                background: "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderBottom: "1px solid rgba(139, 115, 85, 0.1)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1a1a1a",
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                }}
              >
                {selectedPackage.title}
              </Typography>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                {/* Main Image with Transitions */}
                {selectedPackage.gallery && selectedPackage.gallery.length > 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "250px", md: "350px" },
                      borderRadius: 2,
                      border: "1px solid rgba(139, 115, 85, 0.2)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      mb: 3,
                      position: "relative",
                    }}
                  >
                    {selectedPackage.gallery.map((image, imgIndex) => {
                      const isActive = imgIndex === dialogImageIndex;
                      return (
                        <Box
                          key={imgIndex}
                          component="img"
                          src={image}
                          alt={`${selectedPackage.title} - Image ${imgIndex + 1}`}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: isActive ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out",
                            display: "block",
                          }}
                          onError={(e) => {
                            e.target.src = "/IMG-20251210-WA0070.jpg";
                          }}
                        />
                      );
                    })}

                    {/* Image Indicators */}
                    {selectedPackage.gallery.length > 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          left: "50%",
                          transform: "translateX(-50%)",
                          display: "flex",
                          gap: 0.5,
                          zIndex: 3,
                        }}
                      >
                        {selectedPackage.gallery.map((_, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              width: dialogImageIndex === idx ? 20 : 6,
                              height: 6,
                              borderRadius: "3px",
                              backgroundColor:
                                dialogImageIndex === idx
                                  ? "white"
                                  : "rgba(255, 255, 255, 0.5)",
                              transition: "all 0.3s ease",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                )}

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#1a1a1a",
                    lineHeight: 1.7,
                    fontSize: { xs: "1.05rem", md: "1.15rem" },
                    fontWeight: 500,
                    mb: 2,
                  }}
                >
                  {selectedPackage.short_description}
                </Typography>

                {/* Highlights */}
                {selectedPackage.highlights && selectedPackage.highlights.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#8b7355",
                        mb: 1,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                      }}
                    >
                      Highlights:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {selectedPackage.highlights.map((highlight, idx) => (
                        <Typography
                          key={idx}
                          component="li"
                          variant="body2"
                          sx={{
                            mb: 0.5,
                            color: "#666666",
                            lineHeight: 1.6,
                            fontSize: { xs: "1rem", md: "1.05rem" },
                            fontWeight: 500,
                          }}
                        >
                          {highlight}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Pricing */}
                {selectedPackage.pricing_tiers && selectedPackage.pricing_tiers.length > 0 && (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#8b7355",
                        mb: 1,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                      }}
                    >
                      Indicative Pricing (2026 Rates):
                    </Typography>
                    {selectedPackage.pricing_tiers.map((tier, idx) => (
                      <Typography
                        key={idx}
                        variant="body1"
                        sx={{
                          mb: 0.75,
                          color: "#1a1a1a",
                          fontSize: { xs: "1rem", md: "1.05rem" },
                          fontWeight: 600,
                        }}
                      >
                        <strong>{tier.tier}:</strong> {tier.price_range}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                p: { xs: 2, md: 3 },
                pt: 0,
                background: "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderTop: "1px solid rgba(139, 115, 85, 0.1)",
              }}
            >
              <Button
                onClick={handleClosePackageDialog}
                variant="outlined"
                sx={{
                  borderColor: "#8b7355",
                  color: "#8b7355",
                  outline: "none",
                  "&:focus": { outline: "none", boxShadow: "none" },
                  "&:focus-visible": { outline: "none", boxShadow: "none" },
                  "&:hover": {
                    borderColor: "#c8a97e",
                    backgroundColor: "#8b7355",
                    color: "white",
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

