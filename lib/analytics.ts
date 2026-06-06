'use client';

import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'ag_session_id';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = uuidv4();
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

function getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return 'mobile';
  return 'desktop';
}

export async function trackPageView(path: string): Promise<void> {
  try {
    const sessionId = getSessionId();
    if (!sessionId) return;

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        path,
        referrer: document.referrer || null,
        device_type: getDeviceType(),
        user_agent: navigator.userAgent,
      }),
    });
  } catch {
    // Silently fail — analytics should never break the page
  }
}
