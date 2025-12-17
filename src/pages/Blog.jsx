import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Search,
  ArrowForward,
  CalendarToday,
  AccessTime,
  Tag,
} from "@mui/icons-material";

const MotionBox = motion(Box);

export default function Blog() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/blogs/public");
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load blogs");
        }
        const normalized = (data.data || []).map((post) => ({
          ...post,
          tags: Array.isArray(post.tags)
            ? post.tags
            : typeof post.tags === "string"
            ? post.tags.split(",").map((t) => t.trim()).filter(Boolean)
            : [],
          author: post.authorName || post.author || "Unknown",
          featuredImage: post.featuredImage || "/placeholder.jpg",
          readTime: post.readTime ? `${post.readTime} min` : "—",
        }));
        setBlogs(normalized);
      } catch (err) {
        setError(err.message || "Error loading blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, blogs]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  const handlePostClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredPosts = blogs.filter((post) => post.featured).slice(0, 2);

  const categories = useMemo(() => {
    // fixed list aligned with backend enum, always available in filter
    return ["All", "Wildlife", "Travel Tips", "Conservation", "Photography", "Guides", "Other"];
  }, []);

  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 1.5,
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
              py: { xs: 1.5, sm: 2, md: 2.5 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(107, 78, 61, 0.2)",
              minHeight: "auto",
              height: "auto",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                  background:
                    "linear-gradient(45deg, #6B4E3D, #B85C38, #3D2817)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "80px", sm: "100px", md: "120px" },
                    height: "4px",
                    background: "linear-gradient(45deg, #6B4E3D, #B85C38)",
                    borderRadius: "2px",
                  },
                }}
              >
                Safari Blog
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  fontWeight: 500,
                  fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                  color: "text.secondary",
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.7,
                }}
              >
                Discover amazing wildlife stories, travel tips, conservation
                efforts, and insider guides to make your African safari
                unforgettable.
              </Typography>
            </Box>

            {/* Search and Filter Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                fullWidth
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#6B4E3D" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#F5F1E8",
                    "& fieldset": {
                      borderColor: "rgba(107, 78, 61, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#6B4E3D",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6B4E3D",
                    },
                  },
                }}
              />
              <FormControl
                sx={{
                  minWidth: { xs: "100%", sm: "200px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#F5F1E8",
                    "& fieldset": {
                      borderColor: "rgba(107, 78, 61, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#6B4E3D",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6B4E3D",
                    },
                  },
                }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPage(1);
                  }}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Results Count */}
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
                fontWeight: 600,
              }}
            >
              {loading
                ? "Loading articles..."
                : filteredPosts.length === 0 && !error
                ? "No articles found"
                : `${filteredPosts.length} article${
                    filteredPosts.length !== 1 ? "s" : ""
                  } found`}
            </Typography>

              {/* Featured Posts Section */}
            {page === 1 && featuredPosts.length > 0 && (
              <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "#3D2817",
                  fontSize: { xs: "1.3rem", md: "1.5rem" },
                }}
              >
                Featured Articles
              </Typography>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {featuredPosts.map((post, index) => (
                  <Grid item xs={12} key={post.id} sx={{ width: "100%" }}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          width: "100%",
                          minHeight: { xs: 380, md: 260 },
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          alignItems: "stretch",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                          },
                        }}
                        onClick={() => handlePostClick(post.slug)}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: { xs: "100%", md: "360px" },
                            maxWidth: { md: "360px" },
                            minWidth: { md: "360px" },
                            height: { xs: "220px", md: "240px" },
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                          image={post.featuredImage}
                          alt={post.title}
                        />
                        <CardContent
                          sx={{
                            p: { xs: 2.5, md: 3 },
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <Chip
                            label={post.category}
                            size="small"
                            sx={{
                              mb: 1.5,
                              backgroundColor: "#B85C38",
                              color: "white",
                              fontWeight: 600,
                              alignSelf: "flex-start",
                            }}
                          />
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              mb: 1.5,
                              color: "#3D2817",
                              fontSize: { xs: "1.3rem", md: "1.5rem" },
                              lineHeight: 1.3,
                            }}
                          >
                            {post.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 2,
                              color: "text.secondary",
                              lineHeight: 1.6,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {post.excerpt}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 2,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <CalendarToday sx={{ fontSize: 16, color: "#6B4E3D" }} />
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", fontWeight: 600 }}
                              >
                                {new Date(post.publishDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <AccessTime sx={{ fontSize: 16, color: "#6B4E3D" }} />
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", fontWeight: 600 }}
                              >
                                {post.readTime}
                              </Typography>
                            </Box>
                          </Box>
                          <Button
                            endIcon={<ArrowForward />}
                            sx={{
                              color: "#6B4E3D",
                              fontWeight: 600,
                              alignSelf: "flex-start",
                              "&:focus": { outline: "none", boxShadow: "none" },
                              "&:focus-visible": { outline: "none", boxShadow: "none" },
                              "&:hover": {
                                backgroundColor: "rgba(107, 78, 61, 0.1)",
                              },
                            }}
                          >
                            Read More
                          </Button>
                        </CardContent>
                      </Card>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
              </Box>
            )}

              {/* All Posts Grid */}
            {error ? (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
                  {error}
                </Typography>
              </Box>
            ) : loading ? (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  Loading...
                </Typography>
              </Box>
            ) : filteredPosts.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
                  No articles found
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Try adjusting your search or filter criteria
                </Typography>
              </Box>
            ) : (
            <>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "#3D2817",
                  fontSize: { xs: "1.3rem", md: "1.5rem" },
                }}
              >
                {page === 1 ? "All Articles" : `Articles - Page ${page}`}
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {paginatedPosts.map((post, index) => (
                  <Grid item xs={12} key={post.id} sx={{ width: "100%" }}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card
                        sx={{
                          width: "100%",
                          minHeight: { xs: 380, md: 260 },
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          alignItems: "stretch",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                          },
                        }}
                        onClick={() => handlePostClick(post.slug)}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: { xs: "100%", md: "360px" },
                            maxWidth: { md: "360px" },
                            minWidth: { md: "360px" },
                            height: { xs: "220px", md: "240px" },
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                          image={post.featuredImage}
                          alt={post.title}
                        />
                        <CardContent sx={{ flexGrow: 1, p: 2.5, display: "flex", flexDirection: "column" }}>
                          <Box sx={{ mb: 1.5 }}>
                            <Chip
                              label={post.category}
                              size="small"
                              sx={{
                                mb: 1,
                                backgroundColor: "#B85C38",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                              alignSelf: "flex-start",
                              }}
                            />
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              color: "#3D2817",
                              fontSize: { xs: "1.1rem", md: "1.2rem" },
                              lineHeight: 1.3,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {post.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 2,
                              color: "text.secondary",
                              lineHeight: 1.6,
                              flexGrow: 1,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {post.excerpt}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 1.5,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Avatar
                                src={post.authorImage}
                                alt={post.author}
                                sx={{ width: 32, height: 32 }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", fontWeight: 600 }}
                              >
                                {post.author}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <AccessTime sx={{ fontSize: 14, color: "#6B4E3D" }} />
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", fontWeight: 600 }}
                              >
                                {post.readTime}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              mb: 1.5,
                              flexWrap: "wrap",
                            }}
                          >
                            <Tag sx={{ fontSize: 14, color: "#6B4E3D" }} />
                            {post.tags.slice(0, 2).map((tag, idx) => (
                              <Chip
                                key={idx}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: "0.65rem",
                                  height: "20px",
                                  borderColor: "rgba(107, 78, 61, 0.3)",
                                  color: "#6B4E3D",
                                }}
                              />
                            ))}
                          </Box>
                          <Button
                            endIcon={<ArrowForward />}
                            size="small"
                            sx={{
                              color: "#6B4E3D",
                              fontWeight: 600,
                              alignSelf: "flex-start",
                              "&:focus": { outline: "none", boxShadow: "none" },
                              "&:focus-visible": { outline: "none", boxShadow: "none" },
                              justifyContent: "flex-start",
                              px: 0,
                              "&:hover": {
                                backgroundColor: "transparent",
                                color: "#B85C38",
                              },
                            }}
                          >
                            Read Article
                          </Button>
                        </CardContent>
                      </Card>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size={isMobile ? "small" : "large"}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#6B4E3D",
                        fontWeight: 600,
                        "&:focus": { outline: "none", boxShadow: "none" },
                        "&:focus-visible": { outline: "none", boxShadow: "none" },
                        "&.Mui-selected": {
                          backgroundColor: "#6B4E3D",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#B85C38",
                          },
                          "&:focus": { outline: "none", boxShadow: "none" },
                          "&:focus-visible": { outline: "none", boxShadow: "none" },
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}


