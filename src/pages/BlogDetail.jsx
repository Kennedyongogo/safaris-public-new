import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowBack,
  CalendarToday,
  AccessTime,
  Share,
  Facebook,
  Twitter,
  LinkedIn,
  ArrowForward,
  Person,
} from "@mui/icons-material";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);
  const hasIncrementedView = useRef(false);
  const prevSlugRef = useRef(null);

  const buildImageUrl = (path) => {
    if (!path) return "/placeholder.jpg";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return path;
    return `/${path}`;
  };

  useEffect(() => {
    // reset guard on slug change
    if (prevSlugRef.current !== slug) {
      hasIncrementedView.current = false;
      prevSlugRef.current = slug;
    }
    if (hasIncrementedView.current) return;
    hasIncrementedView.current = true;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        setPost(null);
        setRelatedPosts([]);

        const res = await fetch(`/api/blogs/public/${slug}`);
        const data = await res.json();
        if (!res.ok || !data.success || !data.data) {
          throw new Error(data.message || "Blog post not found");
        }

        const normalized = {
          ...data.data,
          tags: Array.isArray(data.data.tags)
            ? data.data.tags
            : typeof data.data.tags === "string"
            ? data.data.tags.split(",").map((t) => t.trim()).filter(Boolean)
            : [],
          author: data.data.authorName || data.data.author || "Unknown",
          authorImage: buildImageUrl(data.data.authorImage),
          featuredImage: buildImageUrl(data.data.featuredImage),
          readTime: data.data.readTime ? `${data.data.readTime} min` : "—",
          likes: data.data.likes ?? 0,
          views: data.data.views ?? 0,
        };

        setPost(normalized);

        // fetch related (same category, exclude current)
        const relRes = await fetch("/api/blogs/public");
        const relData = await relRes.json();
        if (relRes.ok && relData.success && Array.isArray(relData.data)) {
          const relNormalized = relData.data
            .filter(
              (p) =>
                p.slug !== normalized.slug &&
                p.category === normalized.category
            )
            .slice(0, 3)
            .map((p) => ({
              ...p,
              tags: Array.isArray(p.tags)
                ? p.tags
                : typeof p.tags === "string"
                ? p.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : [],
              author: p.authorName || p.author || "Unknown",
              authorImage: buildImageUrl(p.authorImage),
              featuredImage: buildImageUrl(p.featuredImage),
              readTime: p.readTime ? `${p.readTime} min` : "—",
            }));
          setRelatedPosts(relNormalized);
        }

        // increment view count (best-effort)
        try {
          const viewRes = await fetch(`/api/blogs/public/${slug}/view`, { method: "POST" });
          const viewData = await viewRes.json();
          if (viewRes.ok && viewData.success && viewData.data?.views !== undefined) {
            setPost((prev) => (prev ? { ...prev, views: viewData.data.views } : prev));
          } else {
            // fallback increment locally
            setPost((prev) => (prev ? { ...prev, views: (prev.views ?? 0) + 1 } : prev));
          }
        } catch (_) {
          setPost((prev) => (prev ? { ...prev, views: (prev.views ?? 0) + 1 } : prev));
        }
      } catch (err) {
        setError(err.message || "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post?.title || "";
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const handleLike = async () => {
    if (!post) return;
    // optimistic like for snappy UX
    setPost((prev) =>
      prev ? { ...prev, likes: (prev.likes ?? 0) + 1 } : prev
    );
    try {
      setLikeLoading(true);
      const res = await fetch(`/api/blogs/public/${post?.slug}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success && data.data?.likes !== undefined) {
        setPost((prev) => (prev ? { ...prev, likes: data.data.likes } : prev));
      } else {
        setPost((prev) => (prev ? { ...prev, likes: (prev.likes ?? 0) + 1 } : prev));
      }
    } catch (_) {
      setPost((prev) => (prev ? { ...prev, likes: (prev.likes ?? 0) + 1 } : prev));
    } finally {
      setLikeLoading(false);
    }
  };

  const formatMarkdown = (content) => {
    const lines = content.split("\n");
    const elements = [];
    let listItems = [];
    let keyIndex = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <Box key={`list-${keyIndex++}`} component="ul" sx={{ mb: 2, pl: 3 }}>
            {listItems.map((item, idx) => (
              <Typography
                key={idx}
                variant="body1"
                component="li"
                sx={{
                  mb: 0.5,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: { xs: "1.05rem", md: "1.1rem" },
                  fontWeight: 500,
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        );
        listItems = [];
      }
    };

    lines.forEach((line) => {
      if (line.trim() === "") {
        flushList();
        elements.push(<Box key={`empty-${keyIndex++}`} sx={{ mb: 1.5 }} />);
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <Typography
            key={`heading-${keyIndex++}`}
            variant="h5"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: 700,
              color: "#3D2817",
              fontSize: { xs: "1.4rem", md: "1.6rem" },
            }}
          >
            {line.replace("## ", "")}
          </Typography>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        flushList();
        elements.push(
          <Typography
            key={`bold-${keyIndex++}`}
            variant="body1"
            component="strong"
            sx={{
              fontWeight: 700,
              color: "#3D2817",
              display: "block",
              mb: 1.5,
              fontSize: { xs: "1.05rem", md: "1.1rem" },
            }}
          >
            {line.replace(/\*\*/g, "")}
          </Typography>
        );
      } else if (line.startsWith("- ")) {
        listItems.push(line.replace("- ", ""));
      } else {
        flushList();
        elements.push(
          <Typography
            key={`para-${keyIndex++}`}
            variant="body1"
            sx={{
              mb: 1.5,
              color: "text.secondary",
              lineHeight: 1.8,
              fontSize: { xs: "1.05rem", md: "1.1rem" },
              fontWeight: 500,
            }}
          >
            {line}
          </Typography>
        );
      }
    });

    flushList();
    return elements;
  };

  // Show basic loading indicator only if no post data at all
  const showLoading = loading && !post;

  if (error && !post) {
    return (
      <Box
        sx={{
          pt: 0.75,
          pb: 0.75,
          px: 0,
          bgcolor: "#F5F1E8",
          background:
            "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(232, 224, 209, 0.95) 100%)",
        }}
      >
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Blog post not found"}
          </Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/blog")}
            variant="contained"
            sx={{
              backgroundColor: "#6B4E3D",
              "&:hover": {
                backgroundColor: "#B85C38",
              },
            }}
          >
            Back to Blog
          </Button>
        </Container>
      </Box>
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
          <Box sx={{ mb: 0.75, mt: 0.75, display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/blog")}
              sx={{
                backgroundColor: "#B85C38",
                color: "white",
                fontWeight: 600,
                outline: "none",
                "&:focus": { outline: "none", boxShadow: "none" },
                "&:focus-visible": { outline: "none", boxShadow: "none" },
                "&:hover": {
                  backgroundColor: "#8B4225",
                },
              }}
            >
              Back to Blog
            </Button>
            {showLoading && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "#B85C38" }} />
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                  Loading post...
                </Typography>
              </Box>
            )}
          </Box>

          <Paper
            elevation={3}
            sx={{
              py: { xs: 0.75, sm: 1, md: 1.25 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(107, 78, 61, 0.2)",
              overflow: "hidden",
            }}
          >
            {/* Hero Image */}
            <Box
              sx={{
                width: "100%",
                height: { xs: "300px", sm: "400px", md: "500px" },
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={post?.featuredImage || "/placeholder.jpg"}
                alt={post?.title || "Blog Post"}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Article Content */}
            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              {/* Category and Meta */}
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={post?.category || "Article"}
                  sx={{
                    mb: 2,
                    backgroundColor: "#B85C38",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    px: 1,
                  }}
                />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  color: "#3D2817",
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                  lineHeight: 1.2,
                }}
              >
                {post?.title || "Loading..."}
              </Typography>

                {/* Author and Date Info */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                    pb: 2,
                    borderBottom: "1px solid rgba(107, 78, 61, 0.2)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      src={post?.authorImage}
                      alt={post?.author || "Author"}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "#3D2817",
                          fontSize: "0.95rem",
                        }}
                      >
                        {post?.author || "Loading..."}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <CalendarToday
                          sx={{ fontSize: 14, color: "#6B4E3D" }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          {post?.publishDate ? new Date(post.publishDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          ) : "Loading..."}
                        </Typography>
                        <AccessTime
                          sx={{ fontSize: 14, color: "#6B4E3D", ml: 1 }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          {post?.readTime || "—"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Share Buttons */}
                  <Box sx={{ ml: "auto", display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        alignItems: "center",
                        color: "text.secondary",
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Share:
                    </Typography>
                    <IconButton
                      onClick={() => handleShare("facebook")}
                      sx={{
                        color: "#1877F2",
                        outline: "none",
                        "&:focus": { outline: "none" },
                        "&:focus-visible": { outline: "none" },
                        "&:hover": { backgroundColor: "rgba(24, 119, 242, 0.1)" },
                      }}
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton
                      onClick={() => handleShare("twitter")}
                      sx={{
                        color: "#1DA1F2",
                        outline: "none",
                        "&:focus": { outline: "none" },
                        "&:focus-visible": { outline: "none" },
                        "&:hover": { backgroundColor: "rgba(29, 161, 242, 0.1)" },
                      }}
                    >
                      <Twitter />
                    </IconButton>
                    <IconButton
                      onClick={() => handleShare("linkedin")}
                      sx={{
                        color: "#0077B5",
                        outline: "none",
                        "&:focus": { outline: "none" },
                        "&:focus-visible": { outline: "none" },
                        "&:hover": { backgroundColor: "rgba(0, 119, 181, 0.1)" },
                      }}
                    >
                      <LinkedIn />
                    </IconButton>
                    <MotionButton
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      onClick={handleLike}
                      disabled={likeLoading}
                    disableRipple
                    disableFocusRipple
                      key={post?.likes}
                      whileTap={{ scale: 0.94 }}
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      sx={{
                        borderColor: "#6B4E3D",
                        color: "#6B4E3D",
                        fontWeight: 700,
                        ml: { xs: 0, sm: 1 },
                        "&:hover": { borderColor: "#B85C38", backgroundColor: "rgba(107, 78, 61, 0.08)" },
                        "&:focus": { outline: "none" },
                        "&:focus-visible": { outline: "none" },
                      }}
                    >
                      {`👍 ${post?.likes ?? 0}`}
                    </MotionButton>
                  </Box>
                </Box>
              </Box>

              {/* Article Content */}
              <Box
                sx={{
                  mb: 4,
                  "& p": {
                    mb: 2,
                    color: "text.secondary",
                    lineHeight: 1.8,
                    fontSize: { xs: "1.05rem", md: "1.1rem" },
                    fontWeight: 500,
                  },
                  "& h2": {
                    mt: 4,
                    mb: 2,
                    fontWeight: 700,
                    color: "#3D2817",
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                  },
                  "& ul": {
                    mb: 2,
                    pl: 3,
                  },
                  "& li": {
                    mb: 1,
                    color: "text.secondary",
                    lineHeight: 1.8,
                  },
                  "& strong": {
                    fontWeight: 700,
                    color: "#3D2817",
                  },
                }}
              >
                {post?.content ? formatMarkdown(post.content) : (
                  <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                    Loading content...
                  </Typography>
                )}
              </Box>

              {/* Tags */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#3D2817",
                    fontSize: "1.2rem",
                  }}
                >
                  Tags
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {post?.tags?.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      variant="outlined"
                      sx={{
                        borderColor: "rgba(107, 78, 61, 0.3)",
                        color: "#6B4E3D",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "rgba(107, 78, 61, 0.1)",
                        },
                      }}
                    />
                  )) || (
                    <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                      Loading tags...
                    </Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Related Posts */}
              {(relatedPosts?.length > 0) && (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: "#3D2817",
                      fontSize: { xs: "1.4rem", md: "1.6rem" },
                    }}
                  >
                    Related Articles
                  </Typography>
                  <Grid container spacing={3}>
                    {relatedPosts.map((relatedPost, index) => (
                      <Grid item xs={12} sm={12} md={12} key={relatedPost.id} sx={{ width: "100%" }}>
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
                            onClick={() => navigate(`/blog/${relatedPost.slug}`)}
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
                              image={relatedPost.featuredImage}
                              alt={relatedPost.title}
                            />
                            <CardContent
                              sx={{
                                p: 2.5,
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                              }}
                            >
                              <Chip
                                label={relatedPost.category}
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
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  mb: 1,
                                  color: "#3D2817",
                                  fontSize: "1.1rem",
                                  lineHeight: 1.3,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {relatedPost.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 2,
                                  color: "text.secondary",
                                  lineHeight: 1.6,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {relatedPost.excerpt}
                              </Typography>
                              <Button
                                endIcon={<ArrowForward />}
                                sx={{
                                  color: "#6B4E3D",
                                  fontWeight: 600,
                                  alignSelf: "flex-start",
                                  justifyContent: "flex-start",
                                  px: 0,
                                  "&:focus": { outline: "none", boxShadow: "none" },
                                  "&:focus-visible": { outline: "none", boxShadow: "none" },
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                    color: "#B85C38",
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

              {/* Call to Action */}
              <Box
                sx={{
                  mt: 5,
                  p: 3,
                  background:
                    "linear-gradient(135deg, #B85C38, #C97A5A)",
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "white",
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                  }}
                >
                  Ready to Experience Your Own Safari Adventure?
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/plan")}
                  sx={{
                    backgroundColor: "white",
                    color: "#3D2817",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    outline: "none",
                    "&:focus": { outline: "none", boxShadow: "none" },
                    "&:focus-visible": { outline: "none", boxShadow: "none" },
                    "&:hover": {
                      backgroundColor: "#F5F1E8",
                      color: "#3D2817",
                    },
                  }}
                >
                  Plan Your Safari
                </Button>
              </Box>
            </Box>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}
