import type { GoalId } from "@/lib/phase2-data";
import { normalizeProgress, type ProgressMap } from "@/lib/progress";
import { syncCodeforces } from "@/lib/sync/codeforces";
import { syncGithub } from "@/lib/sync/github";
import { syncLeetcode } from "@/lib/sync/leetcode";
import { applyEvidence, deriveEvidence } from "@/lib/sync/rules";
import type { ConnectedAccounts } from "@/lib/phase2-store";
import type { ProviderName, SyncResult } from "@/lib/sync/types";

export async function runSync(input: { goalId: GoalId; accounts: ConnectedAccounts; progress: ProgressMap }): Promise<SyncResult> {
  const startedAt = new Date().toISOString();
  const tasks: Array<Promise<Awaited<ReturnType<typeof syncGithub>>>> = [];
  const providers: ProviderName[] = [];
  if (input.accounts.github.trim()) { providers.push("github"); tasks.push(syncGithub(input.accounts.github.trim())); }
  if (input.accounts.leetcode.trim()) { providers.push("leetcode"); tasks.push(syncLeetcode(input.accounts.leetcode.trim())); }
  if (input.accounts.codeforces.trim()) { providers.push("codeforces"); tasks.push(syncCodeforces(input.accounts.codeforces.trim())); }
  const snapshots = await Promise.all(tasks);
  const evidence = deriveEvidence(input.goalId, snapshots);
  const progress = normalizeProgress(input.goalId, applyEvidence(input.progress, evidence));
  const warnings = snapshots.flatMap((snapshot) => snapshot.warnings);
  const finishedAt = new Date().toISOString();
  const status = providers.length === 0 ? "partial" : warnings.length === snapshots.length ? "error" : warnings.length ? "partial" : "success";
  const run = { id: `sync_${Date.now()}`, startedAt, finishedAt, status: status as "success" | "partial" | "error", providerCount: providers.length, snapshotCount: snapshots.length, evidenceCount: evidence.filter((item) => item.qualifies).length, warnings };
  return { goalId: input.goalId, startedAt, finishedAt, status, snapshots, evidence, progress, warnings, run };
}

export function emptySyncState() { return { status: "never" as const, snapshots: [], evidence: [], warnings: [], runs: [] }; }
