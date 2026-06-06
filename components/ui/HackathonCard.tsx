'use client';
import { motion } from 'framer-motion';
import { Hackathon } from '@/lib/types';

interface HackathonCardProps {
  item: Hackathon;
  index: number;
}

export default function HackathonCard({ item, index }: HackathonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="terminal-card"
    >
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">hackathon@{item.year}</span>
      </div>
      <div className="terminal-body space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-mono font-semibold text-text">{item.name}</h3>
            <p className="text-sm text-muted mt-1">Project: <span className="text-cyan">{item.project_name}</span></p>
          </div>
          <span
            className={`badge shrink-0 ${
              item.outcome === 'Won' ? 'badge-won' :
              item.outcome === 'Finalist' ? 'badge-finalist' : 'badge-participated'
            }`}
          >
            {item.outcome === 'Won' && '🏆 '}{item.outcome}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.skills.map((s) => (
            <span key={s} className="skill-badge text-xs">{s}</span>
          ))}
        </div>

        {item.teammates.length > 0 && (
          <div className="text-xs font-mono text-muted">
            <span className="text-green">Team:</span>{' '}
            {item.teammates.join(', ')}
          </div>
        )}

        {item.mentor && (
          <div className="text-xs font-mono text-muted">
            <span className="text-cyan">Mentor:</span> {item.mentor}
          </div>
        )}
      </div>
    </motion.div>
  );
}
