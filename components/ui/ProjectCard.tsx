'use client';
import { motion } from 'framer-motion';
import { GitHubRepo, Project } from '@/lib/types';
import { formatRelativeDate } from '@/lib/github';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const TECH_COLORS: Record<string, string> = {
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'JavaScript': '#f1e05a',
  'React': '#61dafb',
  'Next.js': '#ffffff',
  'FastAPI': '#009688',
  'Docker': '#2496ed',
  'default': '#00ff88',
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const gh = project.github_data;
  const topics = gh?.topics ?? [];
  const stars = gh?.stargazers_count ?? 0;
  const forks = gh?.forks_count ?? 0;
  const pushed = gh?.pushed_at ? formatRelativeDate(gh.pushed_at) : 'unknown';
  const lang = gh?.language ?? 'Unknown';
  const langColor = TECH_COLORS[lang] ?? TECH_COLORS.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="terminal-card group relative flex flex-col h-full"
    >
      {project.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="badge badge-won text-xs">Featured</span>
        </div>
      )}
      {project.hackathon_won && (
        <div className="absolute top-3 right-3 z-10">
          <span className="badge badge-won text-xs">🏆 {project.hackathon_won}</span>
        </div>
      )}

      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title font-mono text-green">{gh?.name ?? project.slug}</span>
      </div>

      <div className="terminal-body flex flex-col flex-1 gap-4">
        {/* Description */}
        <p className="text-muted text-sm leading-relaxed">
          {gh?.description ?? 'No description available.'}
        </p>

        {/* Achievement metric */}
        {project.achievement_metric && (
          <div className="flex items-start gap-2 p-3 rounded border border-green/20 bg-green/5">
            <span className="text-green text-xs mt-0.5">▶</span>
            <span className="text-green text-xs font-mono">{project.achievement_metric}</span>
          </div>
        )}

        {/* Topics / tech stack */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topics.slice(0, 6).map((t) => (
              <span key={t} className="skill-badge text-xs">{t}</span>
            ))}
          </div>
        )}

        {/* Stats bar */}
        <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1">
              <span style={{ color: langColor }}>●</span> {lang}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
              </svg>
              {stars}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
              </svg>
              {forks}
            </span>
          </div>
          <span className="text-xs text-muted">Updated {pushed}</span>
        </div>

        {/* Action links */}
        <div className="flex gap-3">
          <a
            href={gh?.html_url ?? `https://github.com/anant720/${project.github_repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-2 px-4 flex-1 justify-center"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            Source
          </a>
          {(project.demo_url || gh?.homepage) && (
            <a
              href={project.demo_url ?? gh?.homepage ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-4 flex-1 justify-center"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
