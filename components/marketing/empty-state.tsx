import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, LockKeyhole } from "lucide-react";

export function EmptyState({ eyebrow, title, copy, href = "/how-it-works", label = "See how it works" }: { eyebrow: string; title: string; copy: string; href?: string; label?: string }) {
  return <main className="section min-h-[70vh]"><div className="shell max-w-[760px]"><div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-muted-surface text-accent"><LockKeyhole size={18} strokeWidth={1.5} /></div><p className="eyebrow mt-7">{eyebrow}</p><h1 className="headline mt-5">{title}</h1><p className="body-copy mt-6 max-w-[560px]">{copy}</p><Link href={href as Route} className="button-primary mt-8">{label} <ArrowRight size={16} /></Link></div></main>;
}
