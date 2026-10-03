import { errorMessage, fetchJson } from "@/lib/sync/http";
import type { ProviderSnapshot } from "@/lib/sync/types";

type GithubProfile = { public_repos: number; followers: number; following: number };
type GithubEvent = { type?: string; created_at?: string; payload?: { commits?: unknown[] } };

export async function syncGithub(handle: string): Promise<ProviderSnapshot> {
  const fetchedAt = new Date().toISOString();
  const sourceUrl = `https://github.com/${encodeURIComponent(handle)}`;
  try {
    const [profile, events] = await Promise.all([
      fetchJson<GithubProfile>(`https://api.github.com/users/${encodeURIComponent(handle)}`),
      fetchJson<GithubEvent[]>(`https://api.github.com/users/${encodeURIComponent(handle)}/events/public?per_page=100`)
    ]);
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recent = events.filter((event) => event.created_at && new Date(event.created_at).getTime() >= cutoff);
    const commits30d = recent.filter((event) => event.type === "PushEvent").reduce((count, event) => count + (event.payload?.commits?.length ?? 0), 0);
    const pullRequests30d = recent.filter((event) => event.type === "PullRequestEvent").length;
    const issues30d = recent.filter((event) => event.type === "IssuesEvent").length;
    return { provider: "github", handle, fetchedAt, sourceUrl, profile: { publicRepos: profile.public_repos, followers: profile.followers, following: profile.following }, activity: { commits30d, pullRequests30d, issues30d, acceptedSubmissions30d: 0, solved30d: 0, events30d: recent.length }, warnings: events.length >= 100 ? ["GitHub activity is capped at the provider's latest 100 public events."] : [] };
  } catch (error) {
    return { provider: "github", handle, fetchedAt, sourceUrl, profile: {}, activity: { commits30d: 0, pullRequests30d: 0, issues30d: 0, acceptedSubmissions30d: 0, solved30d: 0, events30d: 0 }, warnings: [`GitHub sync failed: ${errorMessage(error)}`] };
  }
}
