import type { GoalId } from "@/lib/phase2-data";
import type { ProgressMap } from "@/lib/progress";

export type ProviderName = "github" | "leetcode" | "codeforces";
export type SyncStatus = "never" | "syncing" | "success" | "partial" | "error";

export type ProviderSnapshot = {
  provider: ProviderName;
  handle: string;
  fetchedAt: string;
  sourceUrl: string;
  profile: {
    publicRepos?: number;
    followers?: number;
    following?: number;
    solvedCount?: number;
    easySolved?: number;
    mediumSolved?: number;
    hardSolved?: number;
    rating?: number;
    maxRating?: number;
    contributions30d?: number;
  };
  activity: {
    commits30d: number;
    pullRequests30d: number;
    issues30d: number;
    acceptedSubmissions30d: number;
    solved30d: number;
    events30d: number;
  };
  warnings: string[];
};

export type SyncRuleEvidence = {
  nodeId: string;
  provider: ProviderName | "combined";
  evidenceCount: number;
  threshold: number;
  note: string;
  qualifies: boolean;
};

export type SyncRun = {
  id: string;
  startedAt: string;
  finishedAt?: string;
  status: Exclude<SyncStatus, "never" | "syncing">;
  providerCount: number;
  snapshotCount: number;
  evidenceCount: number;
  warnings: string[];
};

export type SyncState = {
  status: SyncStatus;
  lastSyncedAt?: string;
  lastError?: string;
  snapshots: ProviderSnapshot[];
  evidence: SyncRuleEvidence[];
  warnings: string[];
  runs: SyncRun[];
};

export type SyncResult = {
  goalId: GoalId;
  startedAt: string;
  finishedAt: string;
  status: Exclude<SyncStatus, "never" | "syncing">;
  snapshots: ProviderSnapshot[];
  evidence: SyncRuleEvidence[];
  progress: ProgressMap;
  warnings: string[];
  run: SyncRun;
};
