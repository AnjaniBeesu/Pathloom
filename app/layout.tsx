import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Pathloom — know what to do next", template: "%s · Pathloom" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: "Pathloom — know what to do next", description: site.description, url: site.url },
  twitter: { card: "summary_large_image", title: "Pathloom — know what to do next", description: site.description },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><ThemeProvider attribute="class" defaultTheme="system" enableSystem>{<><SiteHeader />{children}<SiteFooter /><CookieConsent /></>}</ThemeProvider></body></html>;
}
