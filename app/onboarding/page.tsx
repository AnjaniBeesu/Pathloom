"use client";

import { ArrowLeft, ArrowRight, Check, Github, Target, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const roles = [
  { id: "swe", title: "Software Engineer", detail: "DSA, CS foundations, projects", icon: "</>" },
  { id: "pm", title: "APM / Product", detail: "Product sense, analytics, execution", icon: "◈" },
  { id: "ai", title: "AI Engineer", detail: "LLMs, RAG, agents, production AI", icon: "✦" },
  { id: "data", title: "Data / ML", detail: "Python, statistics, models", icon: "⌁" }
];
const timelines = ["3 months", "6 months", "9 months", "12 months"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("swe");
  const [timeline, setTimeline] = useState("6 months");
  const [github, setGithub] = useState("");
  const selectedRole = useMemo(() => roles.find((item) => item.id === role) ?? roles[0], [role]);

  return (
    <main className="min-h-[calc(100vh-72px)] py-14 md:py-24">
      <div className="shell max-w-[920px]">
        <div className="mb-10 flex items-center justify-between">
          <div><p className="eyebrow">Build your path</p><p className="mt-2 text-sm text-muted">{step} of 3 · takes about 60 seconds</p></div>
          <div className="flex gap-1.5" aria-label={`Step ${step} of 3`}>{[1,2,3].map((item) => <span key={item} className={`h-1.5 w-12 rounded-full ${item <= step ? "bg-accent" : "bg-line"}`} />)}</div>
        </div>

        <div className="grid gap-10 md:grid-cols-[1fr_280px] md:items-start">
          <section className="rounded-[28px] border border-line bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-10">
            {step === 1 && <>
              <Target className="text-accent" size={25} strokeWidth={1.6} />
              <h1 className="mt-7 text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] md:text-[52px]">Where are you trying to go?</h1>
              <p className="mt-4 max-w-[560px] text-muted leading-7">Pick the role that matters next. Pathloom will turn it into a skill tree instead of dumping a hundred things on your screen.</p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">{roles.map((item) => <button key={item.id} onClick={() => setRole(item.id)} className={`rounded-2xl border p-5 text-left transition ${role === item.id ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong hover:bg-muted-surface"}`}><div className="flex items-start justify-between"><span className="text-lg font-semibold">{item.icon}</span>{role === item.id && <Check size={17} className="text-accent" />}</div><p className="mt-8 font-semibold">{item.title}</p><p className="mt-1 text-sm text-muted">{item.detail}</p></button>)}</div>
            </>}

            {step === 2 && <>
              <Trophy className="text-accent" size={25} strokeWidth={1.6} />
              <h1 className="mt-7 text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] md:text-[52px]">When does it matter?</h1>
              <p className="mt-4 max-w-[560px] text-muted leading-7">Your deadline controls the intensity. We would rather give you a realistic next move than a perfect-looking 40-week roadmap.</p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">{timelines.map((item) => <button key={item} onClick={() => setTimeline(item)} className={`rounded-2xl border p-5 text-left ${timeline === item ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong hover:bg-muted-surface"}`}><div className="flex items-center justify-between"><span className="font-semibold">{item}</span>{timeline === item && <Check size={17} className="text-accent" />}</div><p className="mt-2 text-sm text-muted">{item === "3 months" ? "Sprint mode" : item === "12 months" ? "Long runway" : "Steady progress"}</p></button>)}</div>
            </>}

            {step === 3 && <>
              <Github className="text-accent" size={25} strokeWidth={1.6} />
              <h1 className="mt-7 text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] md:text-[52px]">Bring your work with you.</h1>
              <p className="mt-4 max-w-[560px] text-muted leading-7">Connect GitHub now or skip it. Your path should start from what you have actually built, not from zero.</p>
              <label className="mt-9 block text-sm font-medium">GitHub username <span className="text-quiet">(optional)</span></label>
              <div className="mt-2 flex items-center rounded-xl border border-line bg-muted-surface px-4 focus-within:border-accent"><span className="text-muted">github.com/</span><input value={github} onChange={(event) => setGithub(event.target.value.replace(/[^a-zA-Z0-9-]/g, ""))} placeholder="yourusername" className="min-w-0 flex-1 bg-transparent px-1 py-3.5 outline-none" /></div>
              <div className="mt-6 rounded-2xl border border-line p-4 text-sm text-muted"><Zap size={16} className="mb-2 text-accent" />We&apos;ll use public activity to suggest evidence for relevant skills. Nothing is connected until you choose to continue.</div>
            </>}

            <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
              {step > 1 ? <button onClick={() => setStep(step - 1)} className="button-quiet"><ArrowLeft size={16} /> Back</button> : <Link href="/" className="button-quiet">Cancel</Link>}
              {step < 3 ? <button onClick={() => setStep(step + 1)} className="button-primary">Continue <ArrowRight size={16} /></button> : <Link href="/app" className="button-primary">Generate my path <ArrowRight size={16} /></Link>}
            </div>
          </section>

          <aside className="hidden rounded-[24px] border border-line p-6 md:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Your setup</p>
            <div className="mt-6 space-y-5"><div><p className="text-xs text-muted">Destination</p><p className="mt-1 font-medium">{selectedRole.title}</p></div><div><p className="text-xs text-muted">Timeline</p><p className="mt-1 font-medium">{timeline}</p></div><div><p className="text-xs text-muted">Starting point</p><p className="mt-1 font-medium">{github ? `@${github}` : "Not connected yet"}</p></div></div>
            <div className="mt-10 border-t border-line pt-5 text-sm leading-6 text-muted">No streaks. No guilt. Just a smaller next step based on where you are.</div>
          </aside>
        </div>
      </div>
    </main>
  );
}
