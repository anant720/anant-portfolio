'use client';
import { useState, useEffect } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/track')
      .then((r) => r.json())
      .then((d) => setCount(d.total ?? null))
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="font-mono text-sm text-muted flex items-center gap-2">
      <span className="text-green">●</span>
      <span>
        <span className="text-text">{count.toLocaleString()}</span> visitors
      </span>
    </span>
  );
}
