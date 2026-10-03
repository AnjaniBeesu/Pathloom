import { createHmac, timingSafeEqual } from "node:crypto";
import { fetchJson } from "@/lib/sync/http";

function decode(value: string) { return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as Record<string, unknown>; }
export async function verifyScheduledRequest(request: Request) {
  const cookie = request.headers.get("cookie")?.match(/(?:^|;\s*)app_session_id=([^;]+)/)?.[1];
  const secret = process.env.MANUS_JWT_SECRET;
  const projectId = process.env.MANUS_PROJECT_ID;
  if (!cookie || !secret || !projectId) return { ok: false as const, reason: "Missing scheduled authentication context" };
  const parts = cookie.split(".");
  if (parts.length !== 3) return { ok: false as const, reason: "Malformed scheduled token" };
  const [header, payload, signature] = parts;
  const expected = createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  if (expected.length !== signature.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return { ok: false as const, reason: "Invalid scheduled token signature" };
  const claims = decode(payload);
  if (claims.appId !== projectId || typeof claims.exp !== "number" || claims.exp <= Math.floor(Date.now() / 1000) || typeof claims.openId !== "string" || !claims.openId.startsWith("cron_")) return { ok: false as const, reason: "Invalid scheduled token claims" };
  const apiUrl = process.env.MANUS_OAUTH_API_URL;
  if (!apiUrl) return { ok: false as const, reason: "Missing scheduled identity service" };
  try {
    const identity = await fetchJson<{ openId?: string; projectId?: string; taskUid?: string }>(`${apiUrl}/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jwt_token: cookie, project_id: projectId }) });
    if (!identity.taskUid) return { ok: false as const, reason: "Scheduled identity has no task UID" };
    return { ok: true as const, taskUid: identity.taskUid };
  } catch { return { ok: false as const, reason: "Scheduled identity lookup failed" }; }
}
