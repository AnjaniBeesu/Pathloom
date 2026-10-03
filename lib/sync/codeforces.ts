import { errorMessage, fetchJson } from "@/lib/sync/http";
import type { ProviderSnapshot } from "@/lib/sync/types";

type CodeforcesUser = { rating?: number; maxRating?: number };
type CodeforcesSubmission = { creationTimeSeconds?: number; verdict?: string; problem?: { contestId?: number; index?: string } };
type CodeforcesResponse<T> = { status: string; result: T };

export async function syncCodeforces(handle: string): Promise<ProviderSnapshot> {
  const fetchedAt = new Date().toISOString();
  const sourceUrl = `https://codeforces.com/profile/${encodeURIComponent(handle)}`;
  try {
    const [userResponse, submissionResponse] = await Promise.all([
      fetchJson<CodeforcesResponse<CodeforcesUser[]>>(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`),
      fetchJson<CodeforcesResponse<CodeforcesSubmission[]>>(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=100`)
    ]);
    const user = userResponse.result[0] ?? {};
    const cutoff = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;
    const recent = submissionResponse.result.filter((item) => (item.creationTimeSeconds ?? 0) >= cutoff);
    const accepted = recent.filter((item) => item.verdict === "OK");
    const uniqueSolved = new Set(accepted.map((item) => `${item.problem?.contestId ?? ""}-${item.problem?.index ?? ""}`)).size;
    return { provider: "codeforces", handle, fetchedAt, sourceUrl, profile: { rating: user.rating, maxRating: user.maxRating }, activity: { commits30d: 0, pullRequests30d: 0, issues30d: 0, acceptedSubmissions30d: accepted.length, solved30d: uniqueSolved, events30d: recent.length }, warnings: submissionResponse.result.length >= 100 ? ["Codeforces activity is capped at the latest 100 submissions."] : [] };
  } catch (error) {
    return { provider: "codeforces", handle, fetchedAt, sourceUrl, profile: {}, activity: { commits30d: 0, pullRequests30d: 0, issues30d: 0, acceptedSubmissions30d: 0, solved30d: 0, events30d: 0 }, warnings: [`Codeforces sync failed: ${errorMessage(error)}`] };
  }
}
