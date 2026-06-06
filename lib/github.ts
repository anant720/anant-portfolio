import { GitHubRepo } from './types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'anant720';

const headers: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'AnantPortfolio/1.0',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

export async function fetchGitHubRepo(repo: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.warn(`GitHub API returned ${res.status} for ${repo}`);
      return null;
    }

    const data = await res.json();
    return {
      name: data.name,
      description: data.description,
      html_url: data.html_url,
      stargazers_count: data.stargazers_count,
      forks_count: data.forks_count,
      pushed_at: data.pushed_at,
      language: data.language,
      open_issues_count: data.open_issues_count,
      topics: data.topics ?? [],
      homepage: data.homepage,
    };
  } catch (err) {
    console.error(`Failed to fetch GitHub repo ${repo}:`, err);
    return null;
  }
}

export async function fetchAllRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.map((r: any) => ({
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      pushed_at: r.pushed_at,
      language: r.language,
      open_issues_count: r.open_issues_count,
      topics: r.topics ?? [],
      homepage: r.homepage,
    }));
  } catch {
    return [];
  }
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}
