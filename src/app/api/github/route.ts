import { NextResponse } from "next/server";

const GITHUB_USER = "3bud-ZC";

export const revalidate = 600; // ISR cache for 10 minutes

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "abud-platform",
    };

    // Optional: pass GITHUB_TOKEN env to lift rate limits (60 -> 5000/h)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 600 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub repos", status: res.status, repos: [] },
        { status: res.status }
      );
    }

    const raw: GithubRepo[] = await res.json();

    const repos = raw
      .filter((r) => !r.fork && !r.private && !r.archived)
      .map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        topics: r.topics || [],
        stars: r.stargazers_count,
        forks: r.forks_count,
        issues: r.open_issues_count,
        pushed_at: r.pushed_at,
        updated_at: r.updated_at,
        created_at: r.created_at,
      }))
      .sort((a, b) => {
        // Featured-ish: stars desc, then pushed_at desc
        if (b.stars !== a.stars) return b.stars - a.stars;
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      });

    return NextResponse.json({ user: GITHUB_USER, count: repos.length, repos });
  } catch (err) {
    return NextResponse.json(
      { error: "GitHub fetch failed", message: (err as Error).message, repos: [] },
      { status: 500 }
    );
  }
}
