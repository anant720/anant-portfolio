'use client';
import { ReactNode } from 'react';

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function TerminalCard({ title, children, className = '', noPadding = false }: TerminalCardProps) {
  return (
    <div className={`terminal-card ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        {title && <span className="terminal-title">{title}</span>}
      </div>
      <div className={noPadding ? '' : 'terminal-body'}>
        {children}
      </div>
    </div>
  );
}
