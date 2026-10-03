import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: ["/", "/u/"], disallow: ["/app", "/api", "/onboarding"] }], ...(site.url ? { sitemap: `${site.url}/sitemap.xml` } : {}) }; }
