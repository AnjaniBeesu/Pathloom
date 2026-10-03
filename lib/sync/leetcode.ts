import { errorMessage, fetchJson } from "@/lib/sync/http";
import type { ProviderSnapshot } from "@/lib/sync/types";

type LeetcodeResponse = { data?: { matchedUser?: { submitStats?: { acSubmissionNum?: Array<{ difficulty: string; count: number }> }; profile?: { ranking?: number }; } | null; recentSubmissionList?: Array<{ statusDisplay?: string }> } };
const query = `query userStats($username: String!) { matchedUser(username: $username) { submitStats { acSubmissionNum { difficulty count } } profile { ranking } } recentSubmissionList(username: $username) { statusDisplay } }`;

export async function syncLeetcode(handle: string): Promise<ProviderSnapshot> {
  const fetchedAt = new Date().toISOString();
  const sourceUrl = `https://leetcode.com/u/${encodeURIComponent(handle)}/`;
  try {
    const response = await fetchJson<LeetcodeResponse>("https://leetcode.com/graphql", { method: "POST", headers: { "Content-Type": "application/json", Referer: "https://leetcode.com/" }, body: JSON.stringify({ query, variables: { username: handle } }) });
    const user = response.data?.matchedUser;
    if (!user) throw new Error("LeetCode profile not found or unavailable");
    const stats = Object.fromEntries((user.submitStats?.acSubmissionNum ?? []).map((item) => [item.difficulty.toLowerCase(), item.count]));
    const recent = response.data?.recentSubmissionList ?? [];
    const accepted = recent.filter((item) => item.statusDisplay === "Accepted").length;
    return { provider: "leetcode", handle, fetchedAt, sourceUrl, profile: { solvedCount: Number(stats.all ?? 0), easySolved: Number(stats.easy ?? 0), mediumSolved: Number(stats.medium ?? 0), hardSolved: Number(stats.hard ?? 0) }, activity: { commits30d: 0, pullRequests30d: 0, issues30d: 0, acceptedSubmissions30d: accepted, solved30d: accepted, events30d: recent.length }, warnings: recent.length >= 20 ? ["LeetCode recent submissions are limited to the provider response window."] : [] };
  } catch (error) {
    return { provider: "leetcode", handle, fetchedAt, sourceUrl, profile: {}, activity: { commits30d: 0, pullRequests30d: 0, issues30d: 0, acceptedSubmissions30d: 0, solved30d: 0, events30d: 0 }, warnings: [`LeetCode sync failed: ${errorMessage(error)}`] };
  }
}
