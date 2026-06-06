// ============================================================
// TYPE DEFINITIONS
// ============================================================

export interface Config {
  key: string;
  value: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency_level: number; // 1-100
  used_in: string[];
}

export interface Project {
  id: string;
  slug: string;
  github_repo: string;
  demo_url: string | null;
  featured: boolean;
  hackathon_won: string | null;
  achievement_metric: string | null;
  display_order: number;
  // From GitHub API
  github_data?: GitHubRepo;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  language: string | null;
  open_issues_count: number;
  topics: string[];
  homepage: string | null;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string; // internship, freelance, part-time
  start_date: string;
  end_date: string | null;
  bullets: string[];
  repo_url: string | null;
  display_order: number;
}

export interface Hackathon {
  id: string;
  name: string;
  year: number;
  outcome: 'Won' | 'Finalist' | 'Participated';
  project_name: string;
  skills: string[];
  teammates: string[];
  mentor: string | null;
  display_order: number;
}

export interface CTF {
  id: string;
  event_name: string;
  year: number;
  role: 'Player' | 'Organizer' | 'Author' | 'Co-organizer';
  notable: string[];
  skills_used: string[];
  display_order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date_earned: string | null;
  credential_url: string | null;
  status: 'Completed' | 'In Progress' | 'Planned';
  description?: string;
  display_order: number;
}

export interface Activity {
  id: string;
  title: string;
  org: string;
  description: string;
  year: number;
  display_order: number;
}

export interface PageView {
  id: string;
  session_id: string;
  path: string;
  referrer: string | null;
  country: string | null;
  device_type: 'mobile' | 'desktop' | 'tablet';
  user_agent: string | null;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface AnalyticsData {
  totalViews: number;
  uniqueSessions: number;
  viewsPerDay: { date: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  countryBreakdown: { country: string; count: number }[];
  deviceBreakdown: { device_type: string; count: number }[];
  recentVisitors: { 
    id: string;
    ip_address: string; 
    country: string; 
    path: string; 
    created_at: string; 
    device_type: string; 
    referrer: string; 
    user_agent: string;
  }[];
}

export interface QuickStats {
  jee_percentile: string;
  ctfs_competed: string;
  hackathons_won: string;
  projects_built: string;
  resume_url: string;
  visitor_count?: string;
}
