'use client';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Activity } from '@/lib/types';

interface ActivitiesProps {
  activities: Activity[];
}

export default function Activities({ activities }: ActivitiesProps) {
  return (
    <SectionWrapper id="activities">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title">Clubs & Activities</div>
        <div className="section-line" />
        <div className="space-y-4">
          {activities.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-4 p-5 bg-surface border border-[var(--border)] rounded hover:border-green/40 transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded bg-green/10 border border-green/30 flex items-center justify-center">
                <span className="text-green font-mono text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-mono font-semibold text-text">{a.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan">{a.org}</span>
                    <span className="text-xs font-mono text-muted">{a.year}</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
