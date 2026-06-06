'use client';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import TerminalCard from '@/components/ui/TerminalCard';

const SOCIAL = [
  { label: 'github.com/anant720',       href: 'https://github.com/anant720',              prefix: 'gh' },
  { label: 'linkedin.com/in/anantsuthar', href: 'https://www.linkedin.com/in/anantsuthar',  prefix: 'li' },
  { label: 'Contra',                    href: 'https://contra.com',                       prefix: 'fr' },
  { label: 'Outlier AI',                href: 'https://outlier.ai',                       prefix: 'ai' },
];

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-[var(--surface)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title">About</div>
        <div className="section-line" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bio card */}
          <TerminalCard title="cat about.txt">
            <div className="space-y-4 font-mono text-sm">
              <p className="text-muted leading-relaxed">
                <span className="text-green">$</span>{' '}
                I'm a 3rd year B.Tech Cybersecurity student at{' '}
                <span className="text-cyan">MIT ADT University, Pune</span>, passionate about
                breaking things to understand how they work — and then building them better.
              </p>
              <p className="text-muted leading-relaxed">
                <span className="text-green">$</span>{' '}
                I spend my time competing in CTFs, building open-source security tools, and shipping
                full-stack applications. I ranked in the{' '}
                <span className="text-yellow">top 3.6% nationally</span> in JEE 2024 (96.4 percentile).
              </p>
              <p className="text-muted leading-relaxed">
                <span className="text-green">$</span>{' '}
                Currently seeking <span className="text-green">cybersecurity and full-stack internships</span>.
                Available for freelance work on Contra.
              </p>
            </div>
          </TerminalCard>

          {/* Info grid */}
          <div className="space-y-4">
            <TerminalCard title="whoami --verbose">
              <div className="space-y-3 font-mono text-sm">
                {[
                  { key: 'name',       val: 'Anant Suthar',                  color: 'text-green' },
                  { key: 'degree',     val: 'B.Tech Cybersecurity',           color: 'text-cyan' },
                  { key: 'university', val: 'MIT ADT University, Pune',       color: 'text-text' },
                  { key: 'batch',      val: '2024 – 2028',                    color: 'text-text' },
                  { key: 'location',   val: 'Rajasthan / Pune, India',        color: 'text-text' },
                  { key: 'jee',        val: '96.4 percentile (Top 3.6%)',     color: 'text-yellow' },
                  { key: 'status',     val: 'Open to internships',            color: 'text-green' },
                ].map(({ key, val, color }) => (
                  <div key={key} className="flex gap-3">
                    <span className="text-muted w-24 shrink-0">{key}</span>
                    <span className="text-muted">:</span>
                    <span className={color}>{val}</span>
                  </div>
                ))}
              </div>
            </TerminalCard>

            <TerminalCard title="ls ./profiles">
              <div className="grid grid-cols-2 gap-2">
                {SOCIAL.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border border-[var(--border)] rounded hover:border-green/50 hover:bg-green/5 transition-all group"
                  >
                    <span className="text-green text-xs font-bold">[{s.prefix}]</span>
                    <span className="text-xs text-muted group-hover:text-text transition-colors truncate">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </TerminalCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
