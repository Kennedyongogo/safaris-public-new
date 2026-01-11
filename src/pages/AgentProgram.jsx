import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentApplicationDialog from "../components/AgentApplicationDialog";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  BusinessCenter,
  AttachMoney,
  WorkOutline,
  SupportAgent,
  School,
  AccessTime,
  TrendingUp,
  People,
  CheckCircle,
  ArrowForward,
  Star,
  CardTravel,
  Payment,
  Email,
} from "@mui/icons-material";

const MotionBox = motion(Box);

export default function AgentProgram() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const whyPartnerItems = [
    {
      icon: <AttachMoney />,
      title: "Exclusive Agent Rates",
      description: "Access our discounted rates and sell at market price to earn commission.",
    },
    {
      icon: <TrendingUp />,
      title: "High Commission",
      description: "Earn 10–20% per booking, with additional bonuses for hitting monthly targets.",
    },
    {
      icon: <AccessTime />,
      title: "Flexible & Remote",
      description: "Work from anywhere — no fixed hours, full control over your schedule.",
    },
    {
      icon: <SupportAgent />,
      title: "Support & Resources",
      description: "Dedicated agent manager, marketing materials, itineraries, and guides to help you close sales.",
    },
    {
      icon: <School />,
      title: "Training & Expertise",
      description: "Learn about our destinations, safari options, and insider tips to make selling easy.",
    },
  ];

  const whoCanJoin = [
    "Independent travel consultants and agencies",
    "Freelancers passionate about tourism and adventure travel",
    "Anyone with a global network interested in promoting Kenyan safaris",
  ];

  const howItWorksSteps = [
    {
      step: 1,
      icon: <Email />,
      title: "Apply",
      description: "Fill out the agent application form on our website.",
    },
    {
      step: 2,
      icon: <CardTravel />,
      title: "Get Access",
      description: "Receive your discounted agent rate sheet, marketing materials, and client tools.",
    },
    {
      step: 3,
      icon: <People />,
      title: "Promote & Sell",
      description: "Share Akira Safaris packages via your network.",
    },
    {
      step: 4,
      icon: <Payment />,
      title: "Earn",
      description: "Submit your bookings and get paid monthly via M-PESA, PayPal, or bank transfer.",
    },
  ];

  const agentBenefits = [
    "Direct support from our Operations Manager and Safari Guides",
    "Early access to new packages, deals, and seasonal specials",
    "Invitation to exclusive FAM trips to experience our safaris firsthand",
    "Recognition and rewards for top-performing agents",
  ];

  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 1.5,
        px: 0,
        bgcolor: "#f9f7f3",
        background:
          "linear-gradient(135deg, rgba(249, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(249, 247, 243, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
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
          pt: { xs: 0.75, sm: 0.75, md: 0.75 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              py: { xs: 2, sm: 3, md: 4 },
              px: { xs: 2, sm: 3, md: 4 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(139, 115, 85, 0.2)",
              backgroundImage:
                "linear-gradient(135deg, rgba(200, 169, 126, 0.03) 0%, rgba(255, 255, 255, 1) 50%, rgba(139, 115, 85, 0.03) 100%)",
            }}
          >
            {/* Hero Section */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                  fontWeight: 800,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  color: "#1a1a1a",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "120px", sm: "150px", md: "180px" },
                    height: "4px",
                    background: "linear-gradient(45deg, #1a1a1a, #c8a97e)",
                    borderRadius: "2px",
                  },
                }}
              >
                Akira Safaris – Agent & Partner Program
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mt: 2,
                  mb: 1,
                  fontWeight: 600,
                  fontSize: { xs: "1.3rem", sm: "1.6rem", md: "1.9rem" },
                  color: "#1a1a1a",
                }}
              >
                Become a Remote Sales Agent and Earn Commission by Sharing the Magic of Africa
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1.125rem", md: "1.3rem" },
                  color: "#666666",
                  maxWidth: "900px",
                  mx: "auto",
                  lineHeight: 1.7,
                  mb: 1.5,
                }}
              >
                Join our network of passionate agents around the world and help clients experience unforgettable safaris and adventures across East Africa. Whether you're a travel agent, tour consultant, or just someone who loves connecting people with unique experiences, Akira Safaris gives you the tools and support to earn while sharing our adventures.
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: "rgba(139, 115, 85, 0.2)" }} />

            {/* Why Partner with Us Section */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  color: "#1a1a1a",
                  textAlign: "center",
                }}
              >
                Why Partner with Us?
              </Typography>
              <Box>
                {whyPartnerItems.map((item, index) => (
                  <Box key={index} sx={{ width: "100%", mb: 3 }}>
                    <Card
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 40px rgba(200, 169, 126, 0.25)",
                        },
                        border: "1px solid rgba(139, 115, 85, 0.1)",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            color: "#c8a97e",
                            fontSize: "3rem",
                            mb: 2,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 1.5,
                            color: "#1a1a1a",
                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666666",
                            lineHeight: 1.6,
                            fontSize: { xs: "1rem", md: "1.125rem" },
                          }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2, borderColor: "rgba(139, 115, 85, 0.2)" }} />

            {/* Who Can Join Section */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  color: "#1a1a1a",
                  textAlign: "center",
                }}
              >
                Who Can Join
              </Typography>
              <List>
                {whoCanJoin.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.75 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircle sx={{ color: "#c8a97e", fontSize: "1.5rem" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{
                        fontSize: { xs: "1rem", md: "1.125rem" },
                        color: "text.primary",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider sx={{ my: 2, borderColor: "rgba(139, 115, 85, 0.2)" }} />

            {/* Commission Structure Section */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  color: "#1a1a1a",
                  textAlign: "center",
                }}
              >
                Commission Structure
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                  mb: 2,
                  width: "100%",
                }}
              >
                <Card
                  sx={{
                    flex: 1,
                    width: { xs: "100%", md: "50%" },
                    background: "linear-gradient(135deg, rgba(200, 169, 126, 0.1) 0%, rgba(139, 115, 85, 0.05) 100%)",
                    border: "1px solid rgba(200, 169, 126, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: "#c8a97e",
                        fontSize: { xs: "1.2rem", md: "1.4rem" },
                      }}
                    >
                      Base Rate
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#1a1a1a",
                      }}
                    >
                      10%
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666666", fontSize: { xs: "1rem", md: "1.125rem" } }}>
                      per confirmed booking
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    flex: 1,
                    width: { xs: "100%", md: "50%" },
                    background: "linear-gradient(135deg, rgba(200, 169, 126, 0.1) 0%, rgba(139, 115, 85, 0.05) 100%)",
                    border: "1px solid rgba(200, 169, 126, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: "#c8a97e",
                        fontSize: { xs: "1.2rem", md: "1.4rem" },
                      }}
                    >
                      High-Value Bookings
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#1a1a1a",
                      }}
                    >
                      +3% Extra
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666666", fontSize: { xs: "1rem", md: "1.125rem" } }}>
                      For packages over USD 1,000
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: "#1a1a1a",
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                }}
              >
                Tiered Incentives:
              </Typography>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f9f7f3" }}>
                      <TableCell sx={{ fontWeight: 700, color: "#1a1a1a", fontSize: { xs: "1rem", md: "1.125rem" } }}>
                        Monthly Bookings
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#1a1a1a", fontSize: { xs: "1rem", md: "1.125rem" } }}>
                        Bonus
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}>5 bookings/month</TableCell>
                      <TableCell sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}>
                        <Chip label="+2%" color="primary" sx={{ bgcolor: "#c8a97e", color: "#fff" }} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}>10 bookings/month</TableCell>
                      <TableCell sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}>
                        <Chip label="+5%" color="primary" sx={{ bgcolor: "#c8a97e", color: "#fff" }} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: "#1a1a1a",
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                }}
              >
                Examples:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                  width: "100%",
                }}
              >
                <Card
                  sx={{
                    flex: 1,
                    width: { xs: "100%", md: "50%" },
                    border: "1px solid rgba(139, 115, 85, 0.2)",
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.75, color: "#1a1a1a" }}>
                      A 3-day safari package sold at USD 500:
                    </Typography>
                    <List dense>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText
                          primary="Base commission:"
                          secondary="USD 50"
                          primaryTypographyProps={{ fontSize: { xs: "1.05rem", md: "1.1rem" } }}
                          secondaryTypographyProps={{ fontWeight: 600, color: "#c8a97e", fontSize: { xs: "1.1rem", md: "1.2rem" } }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText
                          primary="If you sold 5+ packages that month:"
                          secondary="USD 60"
                          primaryTypographyProps={{ fontSize: { xs: "1.05rem", md: "1.1rem" } }}
                          secondaryTypographyProps={{ fontWeight: 600, color: "#c8a97e", fontSize: { xs: "1.1rem", md: "1.2rem" } }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    flex: 1,
                    width: { xs: "100%", md: "50%" },
                    border: "1px solid rgba(139, 115, 85, 0.2)",
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.75, color: "#1a1a1a" }}>
                      For packages over USD 1,000:
                    </Typography>
                    <List dense>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText
                          primary="One high-value booking:"
                          secondary="USD 130"
                          primaryTypographyProps={{ fontSize: { xs: "1.05rem", md: "1.1rem" } }}
                          secondaryTypographyProps={{ fontWeight: 600, color: "#c8a97e", fontSize: { xs: "1.1rem", md: "1.2rem" } }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Divider sx={{ my: 2, borderColor: "rgba(139, 115, 85, 0.2)" }} />

            {/* How It Works Section */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  color: "#1a1a1a",
                  textAlign: "center",
                }}
              >
                How It Works
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  width: "100%",
                }}
              >
                {howItWorksSteps.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: { xs: "0 0 100%", md: "0 0 calc(50% - 12px)" },
                      minWidth: 0,
                    }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        position: "relative",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 40px rgba(200, 169, 126, 0.25)",
                        },
                        border: "1px solid rgba(139, 115, 85, 0.1)",
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            bgcolor: "#c8a97e",
                            color: "#fff",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                          }}
                        >
                          {step.step}
                        </Box>
                        <Box
                          sx={{
                            color: "#c8a97e",
                            fontSize: "3rem",
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "center",
                            mt: 1.5,
                          }}
                        >
                          {step.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: "#1a1a1a",
                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666666",
                            lineHeight: 1.6,
                            fontSize: { xs: "1rem", md: "1.125rem" },
                          }}
                        >
                          {step.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2, borderColor: "rgba(139, 115, 85, 0.2)" }} />

            {/* Agent Benefits Section */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  color: "#1a1a1a",
                  textAlign: "center",
                }}
              >
                Agent Benefits
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  width: "100%",
                }}
              >
                {agentBenefits.map((benefit, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: { xs: "0 0 100%", md: "0 0 calc(50% - 8px)" },
                      minWidth: 0,
                    }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        border: "1px solid rgba(107, 78, 61, 0.1)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateX(8px)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2, display: "flex", alignItems: "center" }}>
                        <Star sx={{ color: "#c8a97e", mr: 2, fontSize: "1.5rem" }} />
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: "0.95rem", md: "1.05rem" },
                            color: "text.primary",
                          }}
                        >
                          {benefit}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2, borderColor: "rgba(139, 115, 85, 0.2)" }} />

            {/* Call to Action Section */}
            <Box
              sx={{
                py: { xs: 1.5, sm: 2, md: 2.5 },
                px: { xs: 2, sm: 2.5, md: 3 },
                background: "linear-gradient(135deg, rgba(200, 169, 126, 0.1) 0%, rgba(139, 115, 85, 0.05) 100%)",
                border: "1px solid rgba(200, 169, 126, 0.3)",
                borderRadius: { xs: 2, md: 3 },
                textAlign: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  color: "#1a1a1a",
                }}
              >
                Ready to Join?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: "#666666",
                  maxWidth: "700px",
                  mx: "auto",
                  lineHeight: 1.7,
                  mb: 2,
                }}
              >
                Start earning commission while connecting clients to the best safari experiences in East Africa.
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => setDialogOpen(true)}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  fontWeight: 600,
                  borderRadius: "50px",
                  background: "#c8a97e",
                  boxShadow: "0 8px 32px rgba(200, 169, 126, 0.3)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: "0 12px 40px rgba(200, 169, 126, 0.4)",
                    background: "#8b7355",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
              >
                Apply Now
              </Button>
            </Box>
          </Paper>
        </MotionBox>
      </Container>
      <AgentApplicationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  );
}

