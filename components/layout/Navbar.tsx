'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '#about',          label: 'about' },
  { href: '#skills',         label: 'skills' },
  { href: '#projects',       label: 'projects' },
  { href: '#experience',     label: 'experience' },
  { href: '#hackathons',     label: 'hackathons' },
  { href: '#ctfs',           label: 'ctfs' },
  { href: '#certifications', label: 'certs' },
  { href: '#contact',        label: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Update active section
      const sections = NAV_ITEMS.map((n) => n.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-sm font-bold flex items-center gap-2 hover:text-green transition-colors"
          >
            <span className="text-green">anant</span>
            <span className="text-muted">@</span>
            <span className="text-cyan">0x01</span>
            <span className="cursor-blink" style={{ width: '8px', height: '16px', marginLeft: '2px' }} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 font-mono text-xs transition-all duration-200 rounded-sm
                  ${active === item.href.slice(1)
                    ? 'text-green bg-green/10 border border-green/30'
                    : 'text-muted hover:text-green hover:bg-green/5'
                  }`}
              >
                <span className="text-muted/50">./</span>{item.label}
              </a>
            ))}
            <a
              href="/api/resume"
              className="ml-3 btn-primary text-xs py-1.5 px-3"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-muted hover:text-green transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-[var(--border)] bg-[var(--surface)]"
        >
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-2 font-mono text-sm text-muted hover:text-green hover:bg-green/5 rounded transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-green/50">$ </span>{item.label}
              </a>
            ))}
            <a href="/api/resume" className="block mt-3 btn-primary text-sm justify-center">
              Resume
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
