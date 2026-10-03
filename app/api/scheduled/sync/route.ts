import { NextResponse } from "next/server";
import { verifyScheduledRequest } from "@/lib/sync/cron-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { runSync } from "@/lib/sync/engine";
import type { GoalId } from "@/lib/phase2-data";
import type { ConnectedAccounts } from "@/lib/phase2-store";
import type { ProgressMap } from "@/lib/progress";

const NO_STORE = { "Cache-Control": "no-store" };
const json = (body: unknown, init?: ResponseInit) => NextResponse.json(body, { ...init, headers: { ...NO_STORE, ...(init?.headers ?? {}) } });

export async function POST(request: Request) {
  const auth = await verifyScheduledRequest(request);
  if (!auth.ok) return json({ error: "Unauthorized scheduled request" }, { status: 401 });
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return json({ accepted: true, taskUid: auth.taskUid, skipped: "Supabase is not configured" });
    const { data: target, error } = await supabase.from("sync_targets").select("user_id, goal_id, accounts_json, progress_json, last_synced_at").eq("task_uid", auth.taskUid).maybeSingle();
    if (error) return json({ error: "Unable to load sync target" }, { status: 500 });
    if (!target) return json({ accepted: true, taskUid: auth.taskUid, skipped: "No sync target registered" });
    if (target.last_synced_at && Date.now() - new Date(target.last_synced_at).getTime() < 90_000) return json({ accepted: true, taskUid: auth.taskUid, skipped: "Duplicate retry within the idempotency window" });
    const goalId = (target.goal_id === "apm-intern" ? "apm-intern" : "swe-intern") as GoalId;
    const result = await runSync({ goalId, accounts: target.accounts_json as ConnectedAccounts, progress: target.progress_json as ProgressMap });
    await supabase.from("sync_runs").insert({ task_uid: auth.taskUid, user_id: target.user_id, status: result.status, started_at: result.startedAt, finished_at: result.finishedAt, snapshots_json: result.snapshots, evidence_json: result.evidence, warnings_json: result.warnings });
    await supabase.from("sync_targets").update({ last_synced_at: result.finishedAt, updated_at: result.finishedAt }).eq("task_uid", auth.taskUid);
    return json({ accepted: true, taskUid: auth.taskUid, status: result.status, providers: result.snapshots.length, evidence: result.evidence.filter((item) => item.qualifies).length });
  } catch {
    return json({ error: "Scheduled sync failed" }, { status: 500 });
  }
}
