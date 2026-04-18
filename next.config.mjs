/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Our subsidiary logos in /public/logos are trusted, static SVGs.
    // next/image disables SVG by default for security — we opt-in with a
    // strict CSP so any inline script inside an SVG cannot execute.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
