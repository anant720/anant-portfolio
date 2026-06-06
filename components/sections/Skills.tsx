'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Skill } from '@/lib/types';

const CATEGORIES = ['All', 'Cybersecurity', 'Full Stack', 'AI / ML', 'Cloud & DevOps', 'Languages'];

const CATEGORY_COLORS: Record<string, string> = {
  'Cybersecurity': 'text-red border-red/30 bg-red/5',
  'Full Stack': 'text-cyan border-cyan/30 bg-cyan/5',
  'AI / ML': 'text-yellow border-yellow/30 bg-yellow/5',
  'Cloud & DevOps': 'text-green border-green/30 bg-green/5',
  'Languages': 'text-muted border-muted/30 bg-muted/5',
};

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length > 0) acc[cat] = catSkills;
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <SectionWrapper id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title">Skills</div>
        <div className="section-line" />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 font-mono text-xs rounded border transition-all ${
                activeCategory === cat
                  ? 'border-green text-green bg-green/10'
                  : 'border-[var(--border)] text-muted hover:border-green/50 hover:text-green/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {activeCategory === 'All' ? (
          // Grouped view
          <div className="space-y-12">
            {Object.entries(grouped).map(([category, catSkills]) => (
              <div key={category}>
                <h3 className={`font-mono text-sm font-bold mb-6 inline-flex items-center gap-2 px-3 py-1 rounded border ${
                  CATEGORY_COLORS[category] ?? 'text-muted border-muted/30'
                }`}>
                  <span className="text-green">#</span> {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.map((skill, i) => (
                    <SkillItem key={skill.id} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Filtered grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((skill, i) => (
              <SkillItem key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

function SkillItem({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative p-4 bg-surface border border-[var(--border)] rounded hover:border-green/50 transition-all"
      data-tooltip={skill.used_in.length > 0 ? `Used in: ${skill.used_in.slice(0,3).join(', ')}` : undefined}
    >
      {skill.used_in.length > 0 && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--surface-2)] border border-green/50 text-green text-xs font-mono px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          Used in: {skill.used_in.slice(0, 3).join(', ')}
        </div>
      )}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm font-semibold text-text">{skill.name}</span>
        <span className="font-mono text-xs text-green">{skill.proficiency_level}%</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency_level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
