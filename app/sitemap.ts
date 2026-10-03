import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/how-it-works", "/roadmaps", "/roadmaps/software-engineer-intern", "/roadmaps/apm", "/about", "/contact", "/changelog", "/faq", "/privacy-policy", "/terms-and-conditions", "/cookie-policy", "/acceptable-use", "/disclaimer", "/data-deletion"];
  if (!site.url) return [];
  return paths.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date("2026-10-02"), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
