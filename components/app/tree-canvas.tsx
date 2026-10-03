"use client";

import "@xyflow/react/dist/style.css";
import { Background, Controls, ReactFlow, type Edge, type Node } from "@xyflow/react";
import { Check, Circle, ExternalLink, List, Map, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { nodesForGoal, type NodeStatus } from "@/lib/phase2-data";
import { getCompletedCount, getProgressPercent } from "@/lib/progress";
import { usePhase2 } from "@/components/app/phase2-provider";
import { SkillNode } from "@/components/app/skill-node";

const nodeTypes = { skill: SkillNode };

type ViewMode = "canvas" | "list";
export function TreeCanvas() {
  const { state, toggleNode } = usePhase2();
  const [view, setView] = useState<ViewMode>("canvas");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const definitions = nodesForGoal(state.goalId);
  const flowNodes = useMemo<Node[]>(() => definitions.map((node) => ({ id: node.id, type: "skill", position: node.position, data: { title: node.title, eyebrow: node.eyebrow, status: state.progress[node.id]?.status ?? "locked", progress: state.progress[node.id]?.status === "complete" ? "Complete" : node.rule } })), [definitions, state.progress]);
  const edges = useMemo<Edge[]>(() => definitions.flatMap((node) => node.parentIds.map((parentId) => ({ id: `${parentId}-${node.id}`, source: parentId, target: node.id, type: "smoothstep", style: { stroke: "var(--line-strong)", strokeWidth: 1.2 } }))), [definitions]);
  const selected = definitions.find((node) => node.id === selectedId) ?? definitions.find((node) => state.progress[node.id]?.status === "available") ?? definitions[0];
  const selectedStatus: NodeStatus = selected ? state.progress[selected.id]?.status ?? "locked" : "locked";
  const complete = getCompletedCount(state.goalId, state.progress);
  return <section>
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Skill tree / {getProgressPercent(state.goalId, state.progress)}% mapped</p><h2 className="mt-3 text-[26px] font-semibold tracking-[-.04em]">The work, in order.</h2><p className="mt-2 text-[13px] text-muted">{complete} of {definitions.length} nodes complete. Click a node to see the rule and resources.</p></div><div className="flex rounded-full border border-line p-1"><button onClick={() => setView("canvas")} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-medium ${view === "canvas" ? "bg-ink text-canvas" : "text-muted"}`}><Map size={14} /> Canvas</button><button onClick={() => setView("list")} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-medium ${view === "list" ? "bg-ink text-canvas" : "text-muted"}`}><List size={14} /> List</button></div></div>
    <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
      {view === "canvas" ? <div className="h-[540px] overflow-hidden rounded-shell border border-line bg-surface"><ReactFlow nodes={flowNodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.24 }} onNodeClick={(_, node) => setSelectedId(node.id)} nodesConnectable={false} nodesDraggable={false} zoomOnDoubleClick={false}><Background color="var(--line)" gap={32} size={1} /><Controls showInteractive={false} /></ReactFlow></div> : <div className="divide-y divide-line rounded-shell border border-line bg-surface">{definitions.map((node) => { const status = state.progress[node.id]?.status ?? "locked"; return <button key={node.id} onClick={() => setSelectedId(node.id)} className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted-surface ${selected?.id === node.id ? "bg-accent-soft" : ""}`}><span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${status === "complete" ? "border-accent bg-accent text-white" : status === "available" ? "border-accent text-accent" : "border-line text-quiet"}`}>{status === "complete" ? <Check size={14} /> : <Circle size={11} />}</span><span className="min-w-0"><span className="block text-[13px] font-semibold">{node.title}</span><span className="mt-1 block truncate text-[11px] text-muted">{node.rule}</span></span></button>; })}</div>}
      {selected && <aside className="rounded-shell border border-line bg-surface p-6"><div className="flex items-center justify-between"><span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.1em] text-accent">{selected.eyebrow}</span><Sparkles size={16} className="text-accent" /></div><h3 className="mt-6 text-[23px] font-semibold tracking-[-.04em]">{selected.title}</h3><p className="mt-3 text-[14px] leading-6 text-muted">{selected.description}</p><div className="mt-6 rounded-card border border-line bg-muted-surface p-4"><p className="text-[11px] font-semibold uppercase tracking-[.08em] text-muted">Progress rule</p><p className="mt-2 text-[13px] leading-5 text-ink">{selected.rule}</p></div><div className="mt-5"><p className="text-[11px] font-semibold uppercase tracking-[.08em] text-muted">Free resources</p><div className="mt-3 flex flex-wrap gap-2">{selected.resources.map((resource) => <span key={resource} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5 text-[11px] text-muted">{resource}<ExternalLink size={11} /></span>)}</div></div><button onClick={() => toggleNode(selected.id)} disabled={selectedStatus === "locked"} className={`mt-7 w-full ${selectedStatus === "complete" ? "button-quiet" : "button-primary"} disabled:cursor-not-allowed disabled:opacity-45`}>{selectedStatus === "complete" ? "Mark as in progress" : selectedStatus === "locked" ? "Locked until prerequisites" : "Mark complete"}</button></aside>}
    </div>
  </section>;
}
