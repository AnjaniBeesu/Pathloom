import { ArrowRight, Check, GitBranch, ListChecks, Share2, Target } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { SkillTreePreview } from "@/components/marketing/skill-tree-preview";
import { site } from "@/lib/content";

export const metadata = { title: "Know what to do next", description: site.description, alternates: { canonical: "/" } };

const steps = [
  { icon: Target, number: "01", title: "Choose a destination", copy: "Set the role you want, the date it matters, and the kind of work you want to be known for." },
  { icon: GitBranch, number: "02", title: "Connect the work", copy: "Bring together your public coding activity, projects, and the manual milestones that matter." },
  { icon: ListChecks, number: "03", title: "Follow the next step", copy: "See what is complete, what is missing, and a weekly plan that changes when your pace does." }
];

export default function HomePage() {
  const jsonLd = [{ "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url }, { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url }, { "@context": "https://schema.org", "@type": "SoftwareApplication", name: site.name, applicationCategory: "EducationalApplication", operatingSystem: "Web" }];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="section pb-20 pt-24 md:pb-28 md:pt-36"><div className="shell"><FadeIn className="max-w-[860px]"><p className="eyebrow">A living career skill-tree</p><h1 className="display mt-7 max-w-[800px]">Know what to do next.</h1><p className="body-copy mt-7 max-w-[610px] text-[18px] md:text-[20px]">Pathloom turns a career goal into a living plan that moves with your work.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/onboarding" className="button-primary">Map my path <ArrowRight size={16} /></Link><Link href="/how-it-works" className="button-quiet">See how it works</Link></div></FadeIn><FadeIn delay={0.1} className="mt-20 md:mt-28"><SkillTreePreview /></FadeIn><div className="mt-5 flex items-center justify-between text-[11px] text-quiet"><span>Preview of a real Pathloom path</span><span className="hidden sm:inline">Built for focused practice, not passive browsing</span></div></div></section>
    <section className="border-y border-line"><div className="shell grid gap-14 py-20 md:grid-cols-[1.1fr_.9fr] md:items-end md:py-28"><FadeIn><p className="eyebrow">Not another roadmap poster</p><h2 className="headline mt-6 max-w-[620px]">A plan that knows what you have already done.</h2></FadeIn><FadeIn delay={0.08}><p className="body-copy max-w-[430px]">Roadmaps are useful once. Your preparation is not a straight line. Pathloom tracks the work you actually do, spots the missing pieces, and keeps the next step small enough to start.</p></FadeIn></div></section>
    <section className="section"><div className="shell"><FadeIn><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">The loop</p><h2 className="headline mt-5 max-w-[600px]">Less scattered prep. More visible progress.</h2></div><p className="max-w-[300px] text-sm leading-6 text-muted">Start with a role. Build evidence. Let the tree move with you.</p></div></FadeIn><div className="mt-16 grid gap-4 md:grid-cols-3">{steps.map((step, index) => <FadeIn key={step.number} delay={index * 0.06}><div className="h-full rounded-card border border-line p-6 md:p-7"><div className="flex items-center justify-between"><step.icon size={20} strokeWidth={1.45} className="text-accent" /><span className="text-[11px] font-medium text-quiet">{step.number}</span></div><h3 className="mt-16 text-[20px] font-semibold tracking-[-0.03em]">{step.title}</h3><p className="mt-3 text-[14px] leading-6 text-muted">{step.copy}</p></div></FadeIn>)}</div></div></section>
    <section className="section pt-0"><div className="shell"><FadeIn><div className="rounded-shell border border-line bg-muted-surface p-7 sm:p-10 md:flex md:items-center md:justify-between md:p-14"><div><p className="eyebrow">Start with the question</p><h2 className="mt-4 max-w-[560px] text-[32px] font-semibold leading-[1.05] tracking-[-0.045em] md:text-[44px]">What would make your next application feel earned?</h2></div><Link href="/onboarding" className="button-primary mt-8 shrink-0 md:mt-0">Build my path <ArrowRight size={16} /></Link></div></FadeIn></div></section>
    <section className="sr-only" aria-label="Pathloom promise"><p><Check /> Live tracking, a weekly plan, and a public progress card when you choose to share.</p><Share2 aria-hidden="true" /></section>
  </main>;
}
