import type { GoalId } from "@/lib/phase2-data";
import type { ProgressMap } from "@/lib/progress";
import type { ProviderSnapshot, SyncRuleEvidence } from "@/lib/sync/types";

function value(snapshot: ProviderSnapshot | undefined, selector: (snapshot: ProviderSnapshot) => number | undefined) { return snapshot ? selector(snapshot) ?? 0 : 0; }

export function deriveEvidence(goalId: GoalId, snapshots: ProviderSnapshot[]): SyncRuleEvidence[] {
  const github = snapshots.find((snapshot) => snapshot.provider === "github");
  const leetcode = snapshots.find((snapshot) => snapshot.provider === "leetcode");
  const codeforces = snapshots.find((snapshot) => snapshot.provider === "codeforces");
  const rules = goalId === "swe-intern" ? [
    ["swe-python", "github", value(github, (s) => s.activity.commits30d), 10, "10 GitHub commits in the last 30 days"],
    ["swe-arrays", "leetcode", value(leetcode, (s) => s.profile.solvedCount), 15, "15 solved LeetCode problems"],
    ["swe-hashmaps", "leetcode", value(leetcode, (s) => s.profile.solvedCount), 30, "30 solved LeetCode problems"],
    ["swe-graphs", "leetcode", value(leetcode, (s) => s.profile.solvedCount), 50, "50 solved LeetCode problems"],
    ["swe-project", "github", value(github, (s) => s.profile.publicRepos), 1, "At least one public GitHub repository"],
    ["swe-systems", "github", value(github, (s) => s.profile.publicRepos), 2, "At least two public GitHub repositories"]
  ] : [
    ["apm-research", "github", value(github, (s) => s.activity.issues30d), 3, "3 GitHub issues in the last 30 days"],
    ["apm-sense", "github", value(github, (s) => s.activity.events30d), 10, "10 public GitHub events in the last 30 days"],
    ["apm-analytics", "codeforces", value(codeforces, (s) => s.activity.solved30d), 10, "10 accepted Codeforces problems in the last 30 days"],
    ["apm-prototype", "github", value(github, (s) => s.profile.publicRepos), 1, "At least one public GitHub repository"]
  ];
  return rules.map(([nodeId, provider, evidenceCount, threshold, note]) => ({ nodeId: String(nodeId), provider: provider as "github" | "leetcode" | "codeforces", evidenceCount: Number(evidenceCount), threshold: Number(threshold), note: String(note), qualifies: Number(evidenceCount) >= Number(threshold) }));
}

export function applyEvidence(progress: ProgressMap, evidence: SyncRuleEvidence[]): ProgressMap {
  const next = { ...progress };
  for (const rule of evidence) {
    const current = next[rule.nodeId];
    if (!current) continue;
    if (rule.qualifies && current.status !== "complete") next[rule.nodeId] = { ...current, status: "complete", source: "sync", completedAt: current.completedAt ?? new Date().toISOString() };
  }
  return next;
}
