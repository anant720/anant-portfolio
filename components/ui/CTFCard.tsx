'use client';
import { motion } from 'framer-motion';
import { CTF } from '@/lib/types';

interface CTFCardProps {
  item: CTF;
  index: number;
}

const roleColors: Record<string, string> = {
  'Player': 'text-cyan border-cyan/30 bg-cyan/5',
  'Organizer': 'text-green border-green/30 bg-green/5',
  'Author': 'text-yellow border-yellow/30 bg-yellow/5',
  'Co-organizer': 'text-green border-green/30 bg-green/5',
};

export default function CTFCard({ item, index }: CTFCardProps) {
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
        <span className="terminal-title">ctf@{item.year}</span>
      </div>
      <div className="terminal-body space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono font-semibold text-text">{item.event_name}</h3>
          <span className={`badge shrink-0 ${roleColors[item.role] ?? 'badge-participated'}`}>
            {item.role}
          </span>
        </div>

        <ul className="space-y-2">
          {item.notable.map((n, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted">
              <span className="text-green shrink-0">›</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {item.skills_used.map((s) => (
            <span key={s} className="skill-badge text-xs">{s}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
