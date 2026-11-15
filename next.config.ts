import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Content Security Policy. Add analytics/booking domains here once confirmed
// (e.g. https://www.googletagmanager.com, https://app.cal.com).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://app.cal.com`, // Turnstile, Cal.com
  "style-src 'self' 'unsafe-inline' https://app.cal.com",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://app.cal.com",
  "frame-src 'self' https://challenges.cloudflare.com https://app.cal.com https://cal.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
  async redirects() {
    // 301 map from the old WordPress site. Confirm against Search Console before launch.
    return [
      { source: "/service", destination: "/services", permanent: true },
      { source: "/service/", destination: "/services", permanent: true },
      { source: "/web-design", destination: "/services/web-design", permanent: true },
      { source: "/website-management", destination: "/services/website-care-plans", permanent: true },
      { source: "/website-hosting", destination: "/services/website-care-plans", permanent: true },
      { source: "/branding", destination: "/services", permanent: true },
      { source: "/feed", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
