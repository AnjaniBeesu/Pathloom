"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { nodesForGoal, type GoalId } from "@/lib/phase2-data";
import { createInitialState, normalizeState, PHASE2_STORAGE_KEY, withNodeProgress, type Phase2State } from "@/lib/phase2-store";

type Phase2ContextValue = { state: Phase2State; hydrated: boolean; setGoal: (goalId: GoalId) => void; setDeadline: (deadline: string) => void; setProfile: (profile: Partial<Phase2State>) => void; setAccount: (provider: "github" | "leetcode" | "codeforces", handle: string) => void; toggleNode: (nodeId: string) => void; reset: () => void; exportState: () => void };
const Phase2Context = createContext<Phase2ContextValue | null>(null);

export function Phase2Provider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Phase2State>(() => createInitialState());
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { const saved = window.localStorage.getItem(PHASE2_STORAGE_KEY); if (saved) { try { setState(normalizeState(JSON.parse(saved) as Partial<Phase2State>)); } catch { window.localStorage.removeItem(PHASE2_STORAGE_KEY); } } setHydrated(true); }, []);
  useEffect(() => { if (hydrated) window.localStorage.setItem(PHASE2_STORAGE_KEY, JSON.stringify(state)); }, [hydrated, state]);
  const value = useMemo<Phase2ContextValue>(() => ({ state, hydrated, setGoal: (goalId) => setState((current) => ({ ...createInitialState(goalId, false), deadline: current.deadline, displayName: current.displayName, username: current.username, accounts: current.accounts })), setDeadline: (deadline) => setState((current) => ({ ...current, deadline, updatedAt: new Date().toISOString() })), setProfile: (profile) => setState((current) => normalizeState({ ...current, ...profile })), setAccount: (provider, handle) => setState((current) => normalizeState({ ...current, accounts: { ...current.accounts, [provider]: handle } })), toggleNode: (nodeId) => setState((current) => { const node = nodesForGoal(current.goalId).find((item) => item.id === nodeId); if (!node) return current; const existing = current.progress[nodeId]; if (existing?.status === "locked") return current; const nextStatus = existing?.status === "complete" ? "available" : "complete"; return withNodeProgress(current, nodeId, { status: nextStatus, completedAt: nextStatus === "complete" ? new Date().toISOString() : undefined }); }), reset: () => setState(createInitialState()), exportState: () => { const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "pathloom-progress.json"; anchor.click(); URL.revokeObjectURL(url); } }), [hydrated, state]);
  return <Phase2Context.Provider value={value}>{children}</Phase2Context.Provider>;
}

export function usePhase2() { const value = useContext(Phase2Context); if (!value) throw new Error("usePhase2 must be used within Phase2Provider"); return value; }
