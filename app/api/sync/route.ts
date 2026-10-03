import { NextResponse } from "next/server";
import { runSync } from "@/lib/sync/engine";
import type { GoalId } from "@/lib/phase2-data";
import type { ConnectedAccounts } from "@/lib/phase2-store";
import type { ProgressMap } from "@/lib/progress";

const MAX_BODY_BYTES = 64 * 1024;
const MAX_PROGRESS_ENTRIES = 200;
const NO_STORE = { "Cache-Control": "no-store" };

function errorResponse(message: string, status: number) { return NextResponse.json({ error: message }, { status, headers: NO_STORE }); }
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function cleanHandle(value: unknown) { return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 100) : ""; }

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return errorResponse("Request is too large", 413);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return errorResponse("Expected JSON", 415);
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return errorResponse("Request is too large", 413);
    const body = JSON.parse(raw) as Record<string, unknown>;
    if (!isRecord(body)) return errorResponse("Invalid request body", 400);
    const goalId = body.goalId;
    if (goalId !== "swe-intern" && goalId !== "apm-intern") return errorResponse("Unsupported goal", 400);
    if (!isRecord(body.accounts) || !isRecord(body.progress)) return errorResponse("Accounts and progress are required", 400);
    if (Object.keys(body.progress).length > MAX_PROGRESS_ENTRIES) return errorResponse("Progress payload is too large", 413);
    const accounts: ConnectedAccounts = { github: cleanHandle(body.accounts.github), leetcode: cleanHandle(body.accounts.leetcode), codeforces: cleanHandle(body.accounts.codeforces) };
    const result = await runSync({ goalId: goalId as GoalId, accounts, progress: body.progress as ProgressMap });
    return NextResponse.json(result, { headers: NO_STORE });
  } catch {
    return errorResponse("Sync failed", 400);
  }
}
