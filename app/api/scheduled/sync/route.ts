import { NextResponse } from "next/server";
import { verifyScheduledRequest } from "@/lib/sync/cron-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { runSync } from "@/lib/sync/engine";
import type { GoalId } from "@/lib/phase2-data";

export async function POST(request: Request) {
  const auth = await verifyScheduledRequest(request);
  if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ accepted: true, taskUid: auth.taskUid, skipped: "Supabase is not configured" });
  const { data: target, error } = await supabase.from("sync_targets").select("user_id, goal_id, accounts_json, progress_json, last_synced_at").eq("task_uid", auth.taskUid).maybeSingle();
  if (error) return NextResponse.json({ error: "Unable to load sync target" }, { status: 500 });
  if (!target) return NextResponse.json({ accepted: true, taskUid: auth.taskUid, skipped: "No sync target registered" });
  if (target.last_synced_at && Date.now() - new Date(target.last_synced_at).getTime() < 90_000) return NextResponse.json({ accepted: true, taskUid: auth.taskUid, skipped: "Duplicate retry within the idempotency window" });
  const result = await runSync({ goalId: (target.goal_id === "apm-intern" ? "apm-intern" : "swe-intern") as GoalId, accounts: target.accounts_json, progress: target.progress_json });
  await supabase.from("sync_runs").insert({ task_uid: auth.taskUid, user_id: target.user_id, status: result.status, started_at: result.startedAt, finished_at: result.finishedAt, snapshots_json: result.snapshots, evidence_json: result.evidence, warnings_json: result.warnings });
  await supabase.from("sync_targets").update({ last_synced_at: result.finishedAt, updated_at: result.finishedAt }).eq("task_uid", auth.taskUid);
  return NextResponse.json({ accepted: true, taskUid: auth.taskUid, status: result.status, providers: result.snapshots.length, evidence: result.evidence.filter((item) => item.qualifies).length });
}
