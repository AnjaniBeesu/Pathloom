/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  `connect-src 'self' https:${isProduction ? "" : " ws: wss:"}`,
  "frame-src 'self' https:",
  "frame-ancestors *",
  "base-uri 'self'",
  "form-action 'self' https://github.com",
  "object-src 'none'"
].join("; ");

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        { key: "Origin-Agent-Cluster", value: "?1" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        ...(isProduction ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : [])
      ]
    }];
  }
};

export default nextConfig;
