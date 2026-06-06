'use client';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';

export default function Analytics() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return null;
}
