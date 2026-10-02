"use client";

import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { PathloomMark } from "@/components/brand/pathloom-mark";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteFooter() {
  const reopenCookies = () => window.dispatchEvent(new Event("pathloom:cookie-settings"));
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="shell py-16 md:py-20">
        <div className="mb-16 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div><Link href="/" className="flex items-center gap-2.5"><PathloomMark className="h-6 w-6" /><span className="text-[15px] font-semibold tracking-[-0.03em]">Pathloom</span></Link><p className="mt-4 max-w-xs text-[14px] leading-6 text-muted">A living path from today&apos;s practice to your next role.</p></div>
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-[13px] sm:grid-cols-4">
          <div><p className="mb-4 font-medium text-ink">Product</p><div className="flex flex-col gap-3 text-muted"><Link href="/how-it-works" className="hover:text-ink">How it works</Link><Link href="/roadmaps" className="hover:text-ink">Roadmaps</Link><Link href="/app" className="hover:text-ink">Dashboard</Link></div></div>
          <div><p className="mb-4 font-medium text-ink">Resources</p><div className="flex flex-col gap-3 text-muted"><Link href="/faq" className="hover:text-ink">FAQ</Link><Link href="/changelog" className="hover:text-ink">Changelog</Link><Link href="/about" className="hover:text-ink">About</Link></div></div>
          <div><p className="mb-4 font-medium text-ink">Legal</p><div className="flex flex-col gap-3 text-muted"><Link href="/privacy-policy" className="hover:text-ink">Privacy</Link><Link href="/terms-and-conditions" className="hover:text-ink">Terms</Link><button onClick={reopenCookies} className="text-left hover:text-ink">Cookie settings</button></div></div>
          <div><p className="mb-4 font-medium text-ink">Contact</p><div className="flex flex-col gap-3 text-muted"><Link href="/contact" className="inline-flex items-center gap-2 hover:text-ink"><Mail size={14} /> Say hello</Link><a href="https://github.com" className="inline-flex items-center gap-2 hover:text-ink"><Github size={14} /> GitHub</a></div></div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-5 text-[12px] text-quiet sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Pathloom. Made in India.</span><span>Plan with evidence, not noise.</span></div>
      </div>
    </footer>
  );
}
