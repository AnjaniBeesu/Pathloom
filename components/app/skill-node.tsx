"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { NodeStatus } from "@/lib/phase2-data";

type SkillNodeData = { title: string; eyebrow: string; status: NodeStatus; progress: string };
export function SkillNode({ data }: NodeProps) {
  const nodeData = data as unknown as SkillNodeData;
  return <div className={`relative min-w-[170px] rounded-[16px] border bg-surface px-4 py-3 shadow-sm transition-shadow ${nodeData.status === "complete" ? "border-accent/50 bg-accent-soft" : nodeData.status === "available" ? "border-accent shadow-[0_0_0_4px_var(--accent-soft)]" : "border-line opacity-65"}`}><Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-accent" /><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${nodeData.status === "complete" ? "bg-accent" : nodeData.status === "available" ? "border-2 border-accent bg-surface" : "bg-quiet/50"}`} /><span className="text-[13px] font-semibold tracking-[-.02em]">{nodeData.title}</span></div><p className="mt-1 pl-4 text-[10px] uppercase tracking-[.08em] text-muted">{nodeData.eyebrow}</p><p className="mt-2 pl-4 text-[11px] text-muted">{nodeData.progress}</p><Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-accent" /></div>;
}
