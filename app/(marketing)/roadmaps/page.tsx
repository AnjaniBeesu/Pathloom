import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { roadmapPages } from "@/lib/content";

export const metadata: Metadata = { title: "Career roadmaps", description: "Choose a career goal and see the skills, evidence, and weekly rhythm Pathloom can track.", alternates: { canonical: "/roadmaps" } };

export default function RoadmapsPage() {
  return <main><section className="section pb-20 md:pb-28"><div className="shell"><FadeIn><p className="eyebrow">Start with a direction</p><h1 className="headline mt-6 max-w-[740px]">A roadmap is a starting point. Your work makes it yours.</h1><p className="body-copy mt-6 max-w-[600px] text-[18px]">Pick a role, understand the order, and then let Pathloom turn the work into a living tree.</p></FadeIn></div></section><section className="border-t border-line"><div className="shell grid gap-4 py-16 md:grid-cols-2 md:py-24">{Object.entries(roadmapPages).map(([slug, roadmap], index) => <FadeIn key={slug} delay={index * 0.06}><Link href={`/roadmaps/${slug}`} className="group block rounded-shell border border-line p-7 transition-colors hover:bg-muted-surface md:p-9"><div className="flex items-start justify-between gap-4"><span className="text-[12px] font-medium text-accent">0{index + 1}</span><ArrowUpRight size={18} strokeWidth={1.5} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><h2 className="mt-20 text-[27px] font-semibold tracking-[-0.04em]">{roadmap.title}</h2><p className="mt-4 max-w-[390px] text-[15px] leading-6 text-muted">{roadmap.description}</p><div className="mt-8 border-t border-line pt-4 text-[12px] text-quiet">Typical focused cycle · {roadmap.weeks}</div></Link></FadeIn>)}</div></section></main>;
}
