'use client';
import { motion } from 'framer-motion';
import { Experience } from '@/lib/types';

interface TimelineEntryProps {
  item: Experience;
  index: number;
}

export default function TimelineEntry({ item, index }: TimelineEntryProps) {
  const isPresent = !item.end_date;
  const startYear = new Date(item.start_date).getFullYear();
  const endYear = item.end_date ? new Date(item.end_date).getFullYear() : 'Present';
  const startMonth = new Date(item.start_date).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const endMonth = item.end_date ? new Date(item.end_date).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }) : null;

  const typeColors: Record<string, string> = {
    internship: 'text-green border-green/30 bg-green/5',
    freelance: 'text-cyan border-cyan/30 bg-cyan/5',
    'ai-evaluation': 'text-yellow border-yellow/30 bg-yellow/5',
    'part-time': 'text-muted border-muted/30 bg-muted/5',
  };

  const typeLabel: Record<string, string> = {
    internship: 'Internship',
    freelance: 'Freelance',
    'ai-evaluation': 'AI Evaluation',
    'part-time': 'Part-Time',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="timeline-item pb-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-mono text-base font-semibold text-text">{item.role}</h3>
          <p className="text-muted text-sm">{item.company}</p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
          <span className={`badge text-xs ${typeColors[item.type] ?? typeColors['part-time']}`}>
            {typeLabel[item.type] ?? item.type}
          </span>
          <span className="font-mono text-xs text-muted">
            {startMonth} {startYear} — {endMonth ? `${endMonth} ${endYear}` : 'Present'}
            {isPresent && <span className="ml-2 text-green">● Active</span>}
          </span>
        </div>
      </div>

      <ul className="space-y-2 mb-3">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted">
            <span className="text-green shrink-0 mt-1">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {item.repo_url && (
        <a
          href={item.repo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan hover:text-green transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          {item.repo_url.toLowerCase().endsWith('.pdf') ? 'View Offer Letter' : 'View Repository'}
        </a>
      )}
    </motion.div>
  );
}
