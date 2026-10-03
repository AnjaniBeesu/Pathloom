import { nodesForGoal, type GoalId } from "@/lib/phase2-data";
import { normalizeProgress, type NodeProgress, type ProgressMap } from "@/lib/progress";
import { emptySyncState } from "@/lib/sync/engine";
import type { SyncState } from "@/lib/sync/types";

export const PHASE2_STORAGE_KEY = "pathloom-phase2-state";
export type ConnectedAccounts = { github: string; leetcode: string; codeforces: string };
export type Phase2State = { goalId: GoalId; deadline: string; displayName: string; username: string; isPublic: boolean; accounts: ConnectedAccounts; progress: ProgressMap; sync: SyncState; createdAt: string; updatedAt: string };

export function createInitialState(goalId: GoalId = "swe-intern", sample = true): Phase2State { const progress: ProgressMap = {}; for (const node of nodesForGoal(goalId)) progress[node.id] = { status: "locked" }; if (sample) { const roots = nodesForGoal(goalId).filter((node) => node.parentIds.length === 0).slice(0, 1); const firstChild = nodesForGoal(goalId).find((node) => node.parentIds.includes(roots[0]?.id ?? "")); if (roots[0]) progress[roots[0].id] = { status: "complete", source: "manual", completedAt: new Date().toISOString() }; if (firstChild) progress[firstChild.id] = { status: "complete", source: "manual", completedAt: new Date().toISOString() }; } return { goalId, deadline: "2027-05-31", displayName: "", username: "", isPublic: false, accounts: { github: "", leetcode: "", codeforces: "" }, progress: normalizeProgress(goalId, progress), sync: emptySyncState(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; }
export function normalizeState(input: Partial<Phase2State>): Phase2State { const base = createInitialState(input.goalId ?? "swe-intern", false); return { ...base, ...input, accounts: { ...base.accounts, ...(input.accounts ?? {}) }, sync: { ...base.sync, ...(input.sync ?? {}) }, progress: normalizeProgress(input.goalId ?? base.goalId, input.progress ?? base.progress), updatedAt: new Date().toISOString() }; }
export function withNodeProgress(state: Phase2State, nodeId: string, nodeProgress: NodeProgress): Phase2State { return normalizeState({ ...state, progress: { ...state.progress, [nodeId]: nodeProgress } }); }
