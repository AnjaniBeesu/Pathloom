"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import { publicNav } from "@/lib/content";
import { PathloomMark } from "@/components/brand/pathloom-mark";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-xl">
      <div className="shell flex h-[52px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Pathloom home" onClick={() => setOpen(false)}>
          <PathloomMark className="h-6 w-6" />
          <span className="text-[15px] font-semibold tracking-[-0.03em]">Pathloom</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {publicNav.map((item) => <Link key={item.href} href={item.href as Route} className="text-[13px] text-muted transition-colors hover:text-ink">{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link href="/app" className="button-quiet min-h-9 px-4 text-[13px]">Sign in</Link>
          <Link href="/onboarding" className="button-primary min-h-9 px-4 text-[13px]">Get started <ArrowUpRight size={14} strokeWidth={1.7} /></Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" onClick={() => setOpen(!open)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
          </button>
        </div>
      </div>
      {open && <div className="border-t border-line bg-canvas px-5 pb-6 pt-4 md:hidden"><nav className="shell flex flex-col gap-1" aria-label="Mobile navigation">{publicNav.map((item) => <Link key={item.href} href={item.href as Route} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-[15px] text-muted hover:bg-muted-surface hover:text-ink">{item.label}</Link>)}<div className="mt-3 grid grid-cols-2 gap-2"><Link href="/app" onClick={() => setOpen(false)} className="button-quiet">Sign in</Link><Link href="/onboarding" onClick={() => setOpen(false)} className="button-primary">Get started</Link></div></nav></div>}
    </header>
  );
}
