import { NextResponse } from "next/server";
import { runSync } from "@/lib/sync/engine";
import type { GoalId } from "@/lib/phase2-data";
import type { ConnectedAccounts } from "@/lib/phase2-store";
import type { ProgressMap } from "@/lib/progress";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { goalId?: GoalId; accounts?: Partial<ConnectedAccounts>; progress?: ProgressMap };
    const goalId = body.goalId === "apm-intern" ? "apm-intern" : "swe-intern";
    const accounts: ConnectedAccounts = { github: String(body.accounts?.github ?? "").slice(0, 100), leetcode: String(body.accounts?.leetcode ?? "").slice(0, 100), codeforces: String(body.accounts?.codeforces ?? "").slice(0, 100) };
    const result = await runSync({ goalId, accounts, progress: body.progress ?? {} });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Sync failed" }, { status: 400 });
  }
}
