'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import TerminalCard from '@/components/ui/TerminalCard';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/anant720',
    handle: '@anant720',
    color: 'hover:border-green/50 hover:text-green',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anantsuthar',
    handle: 'Anant Suthar',
    color: 'hover:border-cyan/50 hover:text-cyan',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917976150636',
    handle: '+91 7976150636',
    color: 'hover:border-green/50 hover:text-green',
  },
  {
    label: 'Email 1',
    href: 'mailto:nntsuthar@gmail.com',
    handle: 'nntsuthar@gmail.com',
    color: 'hover:border-red/50 hover:text-red',
  },
  {
    label: 'Email 2',
    href: 'mailto:anantjangid@outlook.com',
    handle: 'anantjangid@outlook.com',
    color: 'hover:border-yellow/50 hover:text-yellow',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Unknown error');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message ?? 'Something went wrong');
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title">Contact</div>
        <div className="section-line" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <TerminalCard title="anant@portfolio:~$ send_message">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="text-green text-4xl">✓</div>
                  <p className="font-mono text-green">Message transmitted successfully.</p>
                  <p className="text-muted text-sm font-mono">I'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-secondary text-xs py-2 px-4 mt-4"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="block font-mono text-xs text-muted">
                      <span className="text-green">$</span> name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="input-terminal"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-xs text-muted">
                      <span className="text-green">$</span> email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="input-terminal"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-xs text-muted">
                      <span className="text-green">$</span> message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What's on your mind?"
                      className="input-terminal resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3 border border-red/30 bg-red/5 rounded font-mono text-xs text-red">
                      Error: {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="animate-spin">⟳</span> Transmitting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </TerminalCard>
          </div>

          {/* Sidebar: social + resume */}
          <div className="lg:col-span-2 space-y-4">
            <TerminalCard title="ls ./links">
              <div className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label.startsWith('Email') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 border border-[var(--border)] rounded transition-all ${link.color}`}
                  >
                    <span className="font-mono text-xs text-muted group-hover:text-inherit">{link.label}</span>
                    <span className="font-mono text-xs">{link.handle}</span>
                  </a>
                ))}
              </div>
            </TerminalCard>

            <TerminalCard title="cat availability.txt">
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                  <span className="text-green text-xs">Open to opportunities</span>
                </div>
                <p className="text-muted text-xs leading-relaxed">
                  Actively seeking <span className="text-green">cybersecurity</span> and{' '}
                  <span className="text-cyan">full-stack</span> internships.
                  Response time: &lt; 24 hours.
                </p>
                <a
                  href="/resume.pdf"
                  download
                  className="btn-secondary w-full justify-center text-xs py-2 mt-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </TerminalCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
