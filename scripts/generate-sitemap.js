const fs = require("fs");
const path = require("path");

const SITE_URL = process.env.SITE_URL || "https://www.akirasafaris.com";
const API_BASE_URL = process.env.API_BASE_URL || SITE_URL;

const today = new Date().toISOString().split("T")[0];

const staticPages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about-us", changefreq: "monthly", priority: "0.8" },
  { loc: "/east-africa-safaris", changefreq: "weekly", priority: "0.9" },
  { loc: "/destinations", changefreq: "weekly", priority: "0.9" },
  { loc: "/blog", changefreq: "weekly", priority: "0.8" },
  { loc: "/contact-us", changefreq: "monthly", priority: "0.7" },
];

const toUrlTag = ({ loc, changefreq, priority, lastmod = today }) => `
  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const wrapSitemap = (urls) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

async function safeFetchJson(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Sitemap fetch failed: ${url} (${err.message})`);
    return null;
  }
}

async function buildDynamicUrls() {
  const dynamicUrls = [];

  const blogs = await safeFetchJson(`${API_BASE_URL}/api/blogs/public`);
  if (blogs?.success && Array.isArray(blogs.data)) {
    blogs.data.forEach((post) => {
      if (post?.slug) {
        dynamicUrls.push(
          toUrlTag({
            loc: `/blog/${post.slug}`,
            changefreq: "monthly",
            priority: "0.6",
          })
        );
      }
    });
  }

  const destinations = await safeFetchJson(`${API_BASE_URL}/api/destinations/public`);
  if (destinations?.success && Array.isArray(destinations.data)) {
    destinations.data.forEach((destination) => {
      if (destination?.id) {
        dynamicUrls.push(
          toUrlTag({
            loc: `/destination/${destination.id}`,
            changefreq: "weekly",
            priority: "0.7",
          })
        );
      }
    });
  }

  const packages = await safeFetchJson(`${API_BASE_URL}/api/packages/public?limit=500`);
  if (packages?.success && Array.isArray(packages.data)) {
    packages.data.forEach((pkg) => {
      if (pkg?.id) {
        dynamicUrls.push(
          toUrlTag({
            loc: `/package/${pkg.id}`,
            changefreq: "weekly",
            priority: "0.6",
          })
        );
      }
    });
  }

  return dynamicUrls;
}

async function generate() {
  const staticUrls = staticPages.map((page) => toUrlTag(page));
  const dynamicUrls = await buildDynamicUrls();
  const sitemap = wrapSitemap([...staticUrls, ...dynamicUrls]);

  const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outputPath, sitemap, "utf8");
  console.log(`Sitemap written to ${outputPath}`);
}

generate();
