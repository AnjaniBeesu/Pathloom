import { goalById, nodesForGoal, type GoalId } from "@/lib/phase2-data";

export type PublicProfilePayload = {
  v: 1;
  username: string;
  displayName: string;
  goalId: GoalId;
  deadline?: string;
  completedNodeIds: string[];
  sharedAt: string;
  expiresAt: string;
};

export function publicProfileDescription(payload: PublicProfilePayload) {
  const goal = goalById(payload.goalId);
  const completed = payload.completedNodeIds.length;
  return `${payload.displayName || payload.username} is building toward ${goal.title} with ${completed} visible milestone${completed === 1 ? "" : "s"} on Pathloom.`;
}

export function validatePublicPayload(input: unknown, usernameFromPath: string): PublicProfilePayload | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Partial<PublicProfilePayload>;
  const username = typeof value.username === "string" ? value.username.trim().toLowerCase() : "";
  const displayName = typeof value.displayName === "string" ? value.displayName.trim().slice(0, 80) : "";
  const goalId = value.goalId === "apm-intern" ? "apm-intern" : value.goalId === "swe-intern" ? "swe-intern" : null;
  if (!goalId || username !== usernameFromPath.toLowerCase() || !/^[a-z0-9][a-z0-9_-]{2,31}$/.test(username)) return null;
  const validNodeIds = new Set(nodesForGoal(goalId).map((node) => node.id));
  const completedNodeIds = Array.isArray(value.completedNodeIds) ? [...new Set(value.completedNodeIds.filter((id): id is string => typeof id === "string" && validNodeIds.has(id)))].slice(0, 40) : [];
  const deadline = typeof value.deadline === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.deadline) ? value.deadline : undefined;
  const sharedAt = typeof value.sharedAt === "string" && !Number.isNaN(Date.parse(value.sharedAt)) ? value.sharedAt : new Date().toISOString();
  const expiresAt = typeof value.expiresAt === "string" && !Number.isNaN(Date.parse(value.expiresAt)) ? value.expiresAt : new Date(Date.parse(sharedAt) + 30 * 24 * 60 * 60 * 1000).toISOString();
  if (Date.parse(expiresAt) <= Date.now()) return null;
  return { v: 1, username, displayName, goalId, deadline, completedNodeIds, sharedAt, expiresAt };
}

export function decodePublicPayload(token: string | undefined, username: string) {
  if (!token || token.length > 16000) return null;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    return validatePublicPayload(JSON.parse(decoded), username);
  } catch { return null; }
}

export function encodePublicPayload(payload: PublicProfilePayload) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

export function publicPayloadFromState(input: { username: string; displayName: string; goalId: GoalId; deadline?: string; isPublic: boolean; progress: Record<string, { status: string }> }): PublicProfilePayload | null {
  if (!input.isPublic) return null;
  const username = input.username.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9_-]{2,31}$/.test(username)) return null;
  const sharedAt = new Date();
  return { v: 1, username, displayName: input.displayName.trim().slice(0, 80), goalId: input.goalId, deadline: input.deadline, completedNodeIds: nodesForGoal(input.goalId).filter((node) => input.progress[node.id]?.status === "complete").map((node) => node.id), sharedAt: sharedAt.toISOString(), expiresAt: new Date(sharedAt.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString() };
}

export function encodePublicPayloadForBrowser(payload: PublicProfilePayload) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
