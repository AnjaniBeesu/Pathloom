const nodes = [
  { label: "Python", detail: "3 repos", state: "done", x: "12%", y: "40%" },
  { label: "Arrays", detail: "15 solved", state: "done", x: "35%", y: "23%" },
  { label: "Graphs", detail: "10 tagged", state: "current", x: "58%", y: "40%" },
  { label: "Projects", detail: "2 shipped", state: "done", x: "80%", y: "20%" },
  { label: "Interviews", detail: "next up", state: "locked", x: "80%", y: "68%" },
  { label: "Systems", detail: "after graphs", state: "locked", x: "35%", y: "75%" }
];

export function SkillTreePreview() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-7">
        <div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Your path</p><p className="mt-1 text-sm font-medium">SWE intern · May 2027</p></div>
        <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-[11px] text-muted">Progress</p><p className="text-sm font-semibold">62%</p></div><div className="h-9 w-9 rounded-full border-[3px] border-accent border-r-line" aria-label="62 percent complete" /></div>
      </div>
      <div className="relative h-[360px] bg-[radial-gradient(circle_at_center,var(--accent-soft),transparent_34%)] sm:h-[440px]">
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M16 45 C24 45 28 26 39 26 S52 43 61 43 S71 25 84 25" fill="none" stroke="var(--line-strong)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
          <path d="M16 45 C27 45 26 76 39 76 S52 47 61 43 S70 68 84 68" fill="none" stroke="var(--line-strong)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
          <path d="M16 45 C28 45 28 26 39 26 S52 43 61 43" fill="none" stroke="var(--accent)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
        </svg>
        {nodes.map((node) => <div key={node.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: node.x, top: node.y }}><div className={`relative min-w-[106px] rounded-[14px] border px-3 py-2.5 backdrop-blur-sm sm:min-w-[132px] sm:px-4 ${node.state === "done" ? "border-accent/30 bg-accent-soft" : node.state === "current" ? "border-accent bg-surface shadow-[0_0_0_5px_var(--accent-soft)]" : "border-line bg-surface/80 opacity-60"}`}><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${node.state === "done" ? "bg-accent" : node.state === "current" ? "border-2 border-accent bg-surface" : "bg-quiet/50"}`} /><span className="text-[12px] font-semibold sm:text-[13px]">{node.label}</span></div><p className="mt-1 pl-4 text-[10px] text-muted sm:text-[11px]">{node.detail}</p></div></div>)}
        <div className="absolute bottom-5 left-5 rounded-full border border-line bg-surface/90 px-3 py-2 text-[11px] text-muted backdrop-blur sm:bottom-7 sm:left-7"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />Current focus: Graph traversal</div>
        <div className="absolute bottom-5 right-5 flex gap-1.5 sm:bottom-7 sm:right-7"><button className="rounded-full border border-line bg-surface/90 px-3 py-2 text-[11px] text-muted" aria-label="Zoom out">−</button><button className="rounded-full border border-line bg-surface/90 px-3 py-2 text-[11px] text-muted" aria-label="Zoom in">+</button></div>
      </div>
    </div>
  );
}
