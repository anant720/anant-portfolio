'use client';
import { motion } from 'framer-motion';
import MatrixRain from '@/components/ui/MatrixRain';
import TypewriterText from '@/components/ui/TypewriterText';
import GlitchText from '@/components/ui/GlitchText';
import { QuickStats } from '@/lib/types';

const ROLES = [
  'Cybersecurity Analyst',
  'Full Stack Developer',
  'CTF Player',
  'Hackathon Winner',
  'Open Source Builder',
];

interface HeroProps {
  stats: QuickStats;
}

export default function Hero({ stats }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid"
      style={{ backgroundSize: '50px 50px' }}
    >
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Hero gradient overlay */}
      <div className="hero-gradient absolute inset-0 pointer-events-none" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.8) 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Terminal prompt line */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-[var(--border)] rounded font-mono text-sm">
            <span className="text-green">▶</span>
            <TypewriterText
              lines={['anant@portfolio:~$ whoami', 'anant@portfolio:~$ ls -la ./skills']}
              typingSpeed={70}
              deletingSpeed={30}
              pauseDuration={3000}
              loop={true}
              className="text-green"
            />
          </div>
        </motion.div>

        {/* Name — glitch effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlitchText
            text="Anant Suthar"
            tag="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 neon-green"
          />
        </motion.div>

        {/* Role typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-muted font-mono text-lg sm:text-xl">//</span>
          <TypewriterText
            lines={ROLES}
            typingSpeed={60}
            deletingSpeed={30}
            pauseDuration={2200}
            loop={true}
            className="text-lg sm:text-xl md:text-2xl text-cyan font-semibold"
          />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-4 mb-10"
        >
          {[
            { label: 'JEE Percentile', value: `${stats.jee_percentile}%ile` },
            { label: 'CTFs', value: `${stats.ctfs_competed}+` },
            { label: 'Hackathons Won', value: stats.hackathons_won },
            { label: 'Projects', value: `${stats.projects_built}+` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-5 py-3 bg-surface border border-[var(--border)] rounded hover:border-green/50 transition-colors"
            >
              <span className="text-green font-mono font-bold text-xl">{stat.value}</span>
              <span className="text-muted text-xs font-mono">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <a href="#projects" className="btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            View Projects
          </a>
          <a
            href={stats.resume_url ?? '/resume.pdf'}
            download
            className="btn-secondary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
          <a href="#contact" className="btn-ghost">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Me
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-muted">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <svg className="w-4 h-4 text-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
