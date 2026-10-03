"use client";

import { ArrowLeft, Check, Lock, Minus, Plus, Target } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const nodes = [
  { id: "python", title: "Programming fluency", detail: "Python · JavaScript · debugging", state: "done", x: 8, y: 42 },
  { id: "dsa", title: "Core DSA", detail: "Arrays · strings · hash maps", state: "done", x: 28, y: 22 },
  { id: "graphs", title: "Graph traversal", detail: "BFS · DFS · shortest path", state: "current", x: 50, y: 42 },
  { id: "cs", title: "CS foundations", detail: "SQL · OS · networking", state: "next", x: 73, y: 22 },
  { id: "projects", title: "Proof of work", detail: "2 shipped projects", state: "done", x: 73, y: 64 },
  { id: "systems", title: "System design", detail: "Caching · queues · APIs", state: "locked", x: 28, y: 74 },
  { id: "interview", title: "Interview ready", detail: "Mock loops · stories", state: "locked", x: 92, y: 43 }
];

export default function TreePage() {
  const [scale, setScale] = useState(1);
  const [selected, setSelected] = useState("graphs");
  const active = nodes.find((node) => node.id === selected) ?? nodes[2];

  return <main className="section pt-12 md:pt-16"><div className="shell">
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Link href="/app" className="mb-5 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"><ArrowLeft size={15} /> Dashboard</Link><p className="eyebrow">Skill tree</p><h1 className="mt-4 text-[44px] font-semibold leading-none tracking-[-.055em] md:text-[62px]">See the whole path.</h1><p className="mt-4 max-w-[590px] text-muted leading-7">Every node is a piece of evidence. Complete the prerequisites, build proof, and unlock the next branch.</p></div><div className="rounded-full border border-line px-4 py-2 text-xs text-muted">31 / 50 milestones</div></div>

    <div className="mt-10 overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-4"><div className="flex items-center gap-2 text-sm font-medium"><Target size={16} className="text-accent" /> SWE intern · May 2027</div><div className="flex gap-1.5"><button onClick={() => setScale(Math.max(.75, scale - .1))} className="rounded-full border border-line p-2 text-muted hover:bg-muted-surface" aria-label="Zoom out"><Minus size={14} /></button><button onClick={() => setScale(Math.min(1.25, scale + .1))} className="rounded-full border border-line p-2 text-muted hover:bg-muted-surface" aria-label="Zoom in"><Plus size={14} /></button></div></div>
      <div className="relative h-[560px] overflow-auto bg-[radial-gradient(circle_at_50%_45%,var(--accent-soft),transparent_32%)]">
        <div className="absolute inset-0 min-w-[900px]" style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg,var(--line) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M10 45 C18 45 20 25 30 25 S42 44 52 44 S64 25 75 25" fill="none" stroke="var(--line-strong)" strokeWidth=".32" vectorEffect="non-scaling-stroke" />
            <path d="M30 25 C30 55 32 72 30 76" fill="none" stroke="var(--line-strong)" strokeWidth=".32" vectorEffect="non-scaling-stroke" />
            <path d="M52 44 C60 44 65 64 75 64 S84 43 93 43" fill="none" stroke="var(--line-strong)" strokeWidth=".32" vectorEffect="non-scaling-stroke" />
            <path d="M10 45 C18 45 20 25 30 25 S42 44 52 44" fill="none" stroke="var(--accent)" strokeWidth=".75" vectorEffect="non-scaling-stroke" />
          </svg>
          {nodes.map((node) => <button key={node.id} onClick={() => setSelected(node.id)} className={`absolute w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-4 text-left transition hover:-translate-y-[calc(50%+2px)] ${selected === node.id ? "border-accent bg-surface shadow-[0_0_0_5px_var(--accent-soft)]" : node.state === "done" ? "border-accent/30 bg-accent-soft" : node.state === "locked" ? "border-line bg-surface/70 opacity-65" : "border-line bg-surface"}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}><div className="flex items-center justify-between"><span className={`flex h-6 w-6 items-center justify-center rounded-full ${node.state === "done" ? "bg-accent text-white" : node.state === "locked" ? "bg-muted-surface text-quiet" : "border border-accent text-accent"}`}>{node.state === "done" ? <Check size={13} /> : node.state === "locked" ? <Lock size={11} /> : <span className="h-2 w-2 rounded-full bg-accent" />}</span><span className="text-[10px] uppercase tracking-[.1em] text-muted">{node.state}</span></div><p className="mt-4 text-[13px] font-semibold">{node.title}</p><p className="mt-1 text-[11px] leading-4 text-muted">{node.detail}</p></button>)}
        </div>
      </div>
    </div>

    <div className="mt-4 grid gap-4 md:grid-cols-[1fr_280px]"><section className="rounded-card border border-line p-6"><p className="eyebrow">Selected node</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">{active.title}</h2><p className="mt-2 text-sm leading-6 text-muted">{active.detail}. This node is currently <span className="font-medium text-ink">{active.state}</span> on your path.</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs text-accent">Evidence: 12 items</span><span className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">6 recommended</span></div></section><div className="rounded-card border border-line bg-muted-surface p-6"><p className="text-xs font-semibold uppercase tracking-[.1em] text-muted">Next unlock</p><p className="mt-4 font-medium">System design basics</p><p className="mt-2 text-sm leading-6 text-muted">Finish Graph traversal to open this branch.</p></div></div>
  </div></main>;
}
