import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
} from "@mui/material";

const CharityMap = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        pt: { xs: 0.5, sm: 0.75, md: 1 },
        pb: { xs: 1, sm: 1.5, md: 2 },
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
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              }}
            >
              Only the best in Africa
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 0.5, md: 0.75 },
                color: "text.primary",
                fontSize: { xs: "1.3rem", md: "1.3rem" },
                lineHeight: 1.7,
              }}
            >
              We work closely with the most renowned lodges in Africa to make your dream trip unforgettable.
            </Typography>
          </Box>

          {/* Lodge Partners Section */}
          <Box
            sx={{
              mt: { xs: 1.5, md: 2 },
              pt: { xs: 1.5, md: 2 },
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center",
                gap: { xs: 2, md: 3 },
                px: { xs: 1, md: 2 },
              }}
            >
              {[
                { 
                  name: "Lion Sands", 
                  subtitle: "GAME RESERVE",
                  logo: (
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontFamily: "'Brush Script MT', cursive",
                          fontSize: { xs: "1.5rem", md: "2rem" },
                          color: "#333",
                          fontWeight: 400,
                          lineHeight: 1.2,
                        }}
                      >
                        Lion Sands
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.6rem", md: "0.7rem" },
                          color: "#666",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          mt: 0.5,
                        }}
                      >
                        GAME RESERVE
                      </Typography>
                    </Box>
                  )
                },
                { 
                  name: "Abstract Lines",
                  subtitle: "",
                  logo: (
                    <Box
                      sx={{
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                        {[...Array(12)].map((_, i) => (
                          <line
                            key={i}
                            x1={20 + (i % 4) * 5}
                            y1={10 + Math.random() * 5}
                            x2={20 + (i % 4) * 5}
                            y2={50 - Math.random() * 5}
                            stroke="#000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        ))}
                      </svg>
                    </Box>
                  )
                },
                { 
                  name: "One&Only",
                  subtitle: "",
                  logo: (
                    <Typography
                      sx={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: { xs: "1.3rem", md: "1.6rem" },
                        color: "#333",
                        fontWeight: 400,
                        "& .ampersand": {
                          fontStyle: "italic",
                          fontSize: "1.2em",
                        },
                      }}
                    >
                      One<span className="ampersand">&</span>Only
                    </Typography>
                  )
                },
                { 
                  name: "&BEYOND",
                  subtitle: "",
                  logo: (
                    <Box sx={{ textAlign: "center" }}>
                      <svg
                        width={60}
                        height={40}
                        viewBox="0 0 60 40"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginBottom: "4px" }}
                      >
                        <path
                          d="M30 5 L35 15 L45 12 L38 20 L48 25 L35 22 L30 32 L25 22 L12 25 L22 20 L15 12 L25 15 Z"
                          fill="#000"
                          stroke="#000"
                          strokeWidth="1"
                        />
                      </svg>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
                          color: "#000",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        &BEYOND
                      </Typography>
                    </Box>
                  )
                },
                { 
                  name: "Londolozi",
                  subtitle: "",
                  logo: (
                    <Box sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          width: { xs: 50, md: 60 },
                          height: { xs: 50, md: 60 },
                          mx: "auto",
                          mb: 1,
                        }}
                      >
                        <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                          <g transform="translate(30,30)">
                            {[0, 90, 180, 270].map((angle, i) => (
                              <ellipse
                                key={i}
                                cx={0}
                                cy={-15}
                                rx="8"
                                ry="20"
                                fill="#000"
                                transform={`rotate(${angle})`}
                                opacity="0.8"
                              />
                            ))}
                          </g>
                        </svg>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "'Times New Roman', serif",
                          fontSize: { xs: "0.7rem", md: "0.85rem" },
                          color: "#333",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        LONDOLOZI
                      </Typography>
                    </Box>
                  )
                },
              ].map((lodge, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    flex: { xs: "1 1 calc(50% - 16px)", md: "0 1 auto" },
                    minWidth: { xs: "120px", md: "140px" },
                    maxWidth: { xs: "180px", md: "200px" },
                    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      opacity: 0.9,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      minHeight: { xs: 80, md: 100 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 1,
                    }}
                  >
                    {lodge.logo}
                  </Box>
                  {lodge.subtitle && (
                    <Typography
                      variant="caption"
                      sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        fontSize: { xs: "0.65rem", md: "0.75rem" },
                        display: "block",
                      }}
                    >
                      {lodge.subtitle}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          {/* View Camps and Lodges Button */}
          <Box
            sx={{
              mt: { xs: 1.5, md: 2 },
              pt: { xs: 1.5, md: 2 },
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/camp-lodges")}
              sx={{
                px: { xs: 4, md: 6 },
                py: { xs: 0.625, md: 0.75 },
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 600,
                textTransform: "none",
                borderRadius: { xs: 2, md: 3 },
                backgroundColor: "#5D4037",
                color: "white",
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
                "&:focus-visible": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&:hover": {
                  backgroundColor: "#4E342E",
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              View Camps and Lodges
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CharityMap;
