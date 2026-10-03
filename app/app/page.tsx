import { ArrowRight, CheckCircle2, Circle, Flame, GitBranch, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };

const focus = [
  { title: "Graph traversal", detail: "BFS + DFS · 6 problems left", progress: 72 },
  { title: "System design basics", detail: "HTTP, caching, databases", progress: 34 },
  { title: "Ship project evidence", detail: "Invoice AI Agent · deployed", progress: 86 }
];

const week: Array<{ title: string; tag: string; done: boolean }> = [
  { title: "Solve 4 graph problems", tag: "DSA", done: true },
  { title: "Write a one-page system design", tag: "CS foundations", done: false },
  { title: "Add metrics to a shipped project", tag: "Proof of work", done: false },
  { title: "Do one 30-minute mock interview", tag: "Interview", done: false }
];

export default function AppPage() {
  return <main className="section pt-12 md:pt-16">
    <div className="shell">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Your path</p><h1 className="mt-4 text-[44px] font-semibold leading-none tracking-[-0.055em] md:text-[64px]">Software Engineer</h1><p className="mt-3 text-muted">Internship target · May 2027 · steady pace</p></div><Link href="/app/tree" className="button-quiet"><GitBranch size={16} /> Open skill tree</Link></div>

      <div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_.6fr_.6fr]">
        <div className="rounded-card border border-line bg-surface p-6 md:p-7"><div className="flex items-start justify-between"><div><p className="text-xs font-medium uppercase tracking-[.1em] text-muted">Overall progress</p><p className="mt-5 text-[52px] font-semibold tracking-[-.06em]">62%</p></div><div className="flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-accent border-r-line text-sm font-semibold">62%</div></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-muted-surface"><div className="h-full w-[62%] rounded-full bg-accent" /></div><p className="mt-4 text-sm text-muted">31 of 50 recommended milestones have evidence.</p></div>
        <div className="rounded-card border border-line p-6"><Flame className="text-accent" size={20} /><p className="mt-8 text-3xl font-semibold tracking-[-.04em]">12 days</p><p className="mt-1 text-sm text-muted">active streak</p></div>
        <div className="rounded-card border border-line p-6"><TrendingUp className="text-accent" size={20} /><p className="mt-8 text-3xl font-semibold tracking-[-.04em]">+8%</p><p className="mt-1 text-sm text-muted">this week</p></div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <section className="rounded-card border border-line p-6 md:p-7"><div className="flex items-end justify-between"><div><p className="eyebrow">Current focus</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Close the gaps that matter.</h2></div><span className="text-xs text-muted">updated today</span></div><div className="mt-7 space-y-5">{focus.map((item) => <div key={item.title}><div className="flex items-center justify-between gap-4"><div><p className="font-medium">{item.title}</p><p className="mt-1 text-sm text-muted">{item.detail}</p></div><span className="text-xs font-medium text-muted">{item.progress}%</span></div><div className="mt-3 h-1.5 rounded-full bg-muted-surface"><div className="h-full rounded-full bg-accent" style={{ width: `${item.progress}%` }} /></div></div>)}</div></section>
        <section className="rounded-card border border-line bg-muted-surface p-6 md:p-7"><p className="eyebrow">Next move</p><h2 className="mt-4 text-[30px] font-semibold leading-[1.05] tracking-[-.04em]">Solve one graph problem before you leave.</h2><p className="mt-4 text-sm leading-6 text-muted">You are close to unlocking the next systems node. One focused session is more useful than another roadmap tab.</p><Link href="/app/tree" className="button-primary mt-7">Continue path <ArrowRight size={16} /></Link></section>
      </div>

      <section className="mt-4 rounded-card border border-line p-6 md:p-7"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="eyebrow">This week</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">A plan small enough to finish.</h2></div><span className="text-sm text-muted">4 tasks · ~4h 30m</span></div><div className="mt-7 grid gap-3 md:grid-cols-2">{week.map((item) => <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-line p-4"><div className="shrink-0">{item.done ? <CheckCircle2 className="text-accent" size={20} /> : <Circle className="text-quiet" size={20} />}</div><div className="min-w-0 flex-1"><p className={`font-medium ${item.done ? "line-through text-muted" : ""}`}>{item.title}</p><p className="mt-1 text-xs text-muted">{item.tag}</p></div></div>)}</div></section>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-xs text-muted"><span>Path recalculates as your evidence changes.</span><Link href="/app/settings" className="hover:text-ink">Settings</Link></div>
    </div>
  </main>;
}
