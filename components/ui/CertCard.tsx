'use client';
import { motion } from 'framer-motion';
import { Certification } from '@/lib/types';

const ISSUER_ICONS: Record<string, string> = {
  'Google / Coursera': '🔵',
  'IBM / Coursera': '🔷',
  'TryHackMe': '🔴',
  'CompTIA': '🟡',
  'Splunk': '🟠',
};

interface CertCardProps {
  item: Certification;
  index: number;
}

export default function CertCard({ item, index }: CertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="terminal-card"
    >
      <div className="terminal-body flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{ISSUER_ICONS[item.issuer] ?? '📜'}</span>
            <div>
              <p className="text-xs font-mono text-muted">{item.issuer}</p>
              <h3 className="font-mono text-sm font-semibold text-text leading-tight mt-0.5">{item.name}</h3>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`badge ${
            item.status === 'Completed' ? 'badge-completed' :
            item.status === 'In Progress' ? 'badge-in-progress' : 'badge-planned'
          }`}>
            {item.status === 'Completed' && '✓ '}
            {item.status === 'In Progress' && '⟳ '}
            {item.status === 'Planned' && '○ '}
            {item.status}
          </span>
          {item.date_earned && (
            <span className="text-xs font-mono text-muted">
              {new Date(item.date_earned).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-muted leading-relaxed border-t border-[var(--border)] pt-2 mt-1">
            {item.description}
          </p>
        )}

        {item.credential_url && item.status === 'Completed' && (
          <a
            href={item.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-cyan hover:text-green transition-colors mt-1"
          >
            View Credential →
          </a>
        )}
      </div>
    </motion.div>
  );
}
