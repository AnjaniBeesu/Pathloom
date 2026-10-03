"use client";

import { BarChart3, GitBranch, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phase2Provider } from "@/components/app/phase2-provider";

const items = [{ href: "/app", label: "Overview", icon: BarChart3 }, { href: "/app/tree", label: "Skill tree", icon: GitBranch }, { href: "/app/settings", label: "Settings", icon: Settings2 }];

function Navigation() {
  const pathname = usePathname();
  return <aside className="w-full shrink-0 lg:w-[220px]"><div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">{items.map((item) => { const active = pathname === item.href; return <Link key={item.href} href={item.href} className={`flex min-w-max items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${active ? "bg-accent-soft text-accent" : "text-muted hover:bg-muted-surface hover:text-ink"}`}><item.icon size={16} strokeWidth={1.6} />{item.label}</Link>; })}</div><div className="mt-6 hidden rounded-card border border-line p-4 lg:block"><p className="text-[11px] font-semibold uppercase tracking-[.1em] text-muted">Phase 2</p><p className="mt-2 text-[13px] leading-5 text-ink">Your path is private by default. Sharing comes later, when you choose it.</p></div></aside>;
}

export function AppShell({ children }: { children: React.ReactNode }) { return <Phase2Provider><main className="min-h-[calc(100vh-52px)] border-b border-line"><div className="shell py-7 md:py-10"><div className="mb-8 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">Your path / Phase 2</p><h1 className="mt-3 text-[32px] font-semibold tracking-[-.045em]">Make progress visible.</h1></div><p className="max-w-[340px] text-[13px] leading-5 text-muted">A private workspace for your goal, your evidence, and the next useful step.</p></div><div className="flex flex-col gap-8 lg:flex-row lg:gap-12"><Navigation /><div className="min-w-0 flex-1">{children}</div></div></div></main></Phase2Provider>; }
