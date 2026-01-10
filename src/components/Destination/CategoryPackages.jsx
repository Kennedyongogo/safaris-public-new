import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack, Image as ImageIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

// Package Card Component with Image Transitions - Compact & Beautiful Design
const PackageCard = ({ package: pkg, categoryName, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = pkg.gallery || [];
  const hasMultipleImages = images.length > 1;

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
      sx={{
        overflow: "hidden",
        border: "1px solid rgba(107, 78, 61, 0.15)",
        borderRadius: 3,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "linear-gradient(to bottom, #FFFFFF 0%, #F9F7F4 100%)",
        boxShadow: "0 2px 8px rgba(61, 40, 23, 0.08)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 32px rgba(61, 40, 23, 0.15)",
          borderColor: "rgba(184, 92, 56, 0.3)",
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
                    console.error(`Failed to load package image: ${image}`);
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
                background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
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
            color: "#3D2817",
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
            color: "text.secondary",
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
                      backgroundColor: "#B85C38",
                      mt: 0.75,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
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
              borderTop: "1px solid rgba(107, 78, 61, 0.1)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#6B4E3D",
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
                  <Box component="span" sx={{ color: "#B85C38", mr: 0.5 }}>
                    From:
                  </Box>
                  {pkg.pricing_tiers[0].price_range}
                </>
              )}
            </Typography>
          </Box>
        )}

        {/* View Details Hint */}
        <Box
          sx={{
            mt: 1.25,
            pt: 1.25,
            borderTop: "1px solid rgba(107, 78, 61, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#B85C38",
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            View Details
          </Typography>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#B85C38",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: "6px solid white",
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                ml: 0.5,
              }}
            />
          </Box>
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

  // Get category and destination data from location state
  const category = location.state?.category;
  const destination = location.state?.destination;
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
    setSelectedPackage(pkg);
    setDialogImageIndex(0);
    setPackageDialogOpen(true);
  };

  const handleClosePackageDialog = () => {
    setPackageDialogOpen(false);
    setSelectedPackage(null);
    setDialogImageIndex(0);
  };

  const handleBackToCategories = () => {
    // Navigate back to destination details page
    if (destinationId) {
      navigate(`/destination/${destinationId}`);
    } else {
      navigate(-1);
    }
  };

  if (!category) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Category not found
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToCategories}
          variant="contained"
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
        bgcolor: "#F5F1E8",
        background:
          "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
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
              mb: 2,
              backgroundColor: "#6B4E3D",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#5D4037",
              },
            }}
          >
            Back to Categories
          </Button>

          {/* Category Header */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#3D2817",
                fontSize: { xs: "1rem", sm: "2.2rem", md: "2.6rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {category.category_name}
            </Typography>
            {category.packages && category.packages.length > 0 && (
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
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
              {category.packages.map((pkg, pkgIndex) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pkgIndex}>
                  <PackageCard
                    package={pkg}
                    categoryName={category.category_name}
                    onClick={handlePackageClick}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">
              No packages available in this category.
            </Alert>
          )}
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
            border: "1px solid rgba(107, 78, 61, 0.2)",
          },
        }}
      >
        {selectedPackage && (
          <>
            <DialogTitle
              sx={{
                pb: 1,
                background: "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderBottom: "1px solid rgba(107, 78, 61, 0.1)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#3D2817",
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
                      border: "1px solid rgba(107, 78, 61, 0.2)",
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
                    color: "text.primary",
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
                        color: "#6B4E3D",
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
                            color: "text.secondary",
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
                        color: "#6B4E3D",
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
                          color: "text.primary",
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
                background: "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                borderTop: "1px solid rgba(107, 78, 61, 0.1)",
              }}
            >
              <Button
                onClick={handleClosePackageDialog}
                variant="outlined"
                sx={{
                  borderColor: "#6B4E3D",
                  color: "#6B4E3D",
                  "&:hover": {
                    borderColor: "#5D4037",
                    backgroundColor: "#6B4E3D",
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

