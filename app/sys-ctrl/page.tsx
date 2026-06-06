'use client';
import { useState, useEffect } from 'react';
import { AnalyticsData } from '@/lib/types';

export const dynamic = 'force-dynamic';

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/sys-ctrl/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret })
    });
    
    if (res.ok) {
      onLogin();
    } else {
      setError('Invalid secret. Access denied.');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="terminal-card">
          <div className="terminal-header">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">admin@portfolio:~$ sudo login</span>
          </div>
          <div className="terminal-body space-y-6">
            <div className="space-y-2 font-mono text-sm">
              <p className="text-muted">Authentication required.</p>
              <p className="text-green">Enter admin secret to continue.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  <span className="text-green">$</span> secret
                </label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-terminal"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red font-mono text-xs">{error}</p>
              )}
              <button type="submit" className="btn-primary w-full justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Authenticate
              </button>
            </form>
          </div>
        </div>
        <p className="text-center font-mono text-xs text-muted mt-4">
          <a href="/" className="hover:text-green transition-colors">← Back to portfolio</a>
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, color = 'green' }: { label: string; value: string | number; color?: string }) {
  const colorMap: Record<string, string> = {
    green: 'text-green border-green/30',
    cyan: 'text-cyan border-cyan/30',
    yellow: 'text-yellow border-yellow/30',
    red: 'text-red border-red/30',
  };

  return (
    <div className={`p-5 bg-surface border rounded ${colorMap[color] ?? colorMap.green}`}>
      <p className="font-mono text-xs text-muted mb-2">{label}</p>
      <p className={`font-mono text-3xl font-bold ${colorMap[color]?.split(' ')[0] ?? 'text-green'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
}

function MiniBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-muted w-32 truncate shrink-0">{label}</span>
      <div className="flex-1 progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-xs text-green w-8 text-right">{value}</span>
    </div>
  );
}

function LineChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const height = 80;
  const width = 100;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d.count / max) * height;
    return `${x},${y}`;
  });

  return (
    <div className="w-full h-24 relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <polyline
          points={[...points, `${width},${height}`, `0,${height}`].join(' ')}
          fill="url(#lineGrad)"
          stroke="none"
        />
        {/* Line */}
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="#00ff88"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/sys-ctrl/analytics')
      .then((r) => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        onLogout();
      });
  }, [onLogout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="font-mono text-green animate-pulse">Loading analytics...</div>
      </div>
    );
  }

  if (!data) return null;

  const maxRef = Math.max(...(data.topReferrers.map((r) => r.count) ?? [1]));
  const maxCountry = Math.max(...(data.countryBreakdown.map((c) => c.count) ?? [1]));

  return (
    <div className="min-h-screen bg-bg py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-mono text-2xl font-bold text-green">
              <span className="text-muted">//</span> Admin Dashboard
            </h1>
            <p className="font-mono text-xs text-muted mt-1">
              anant@portfolio:~$ analytics --verbose
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={async () => {
                await fetch('/api/sys-ctrl/auth', { method: 'DELETE' });
                onLogout();
              }}
              className="btn-secondary text-xs py-2 px-4"
            >
              Logout
            </button>
            <a href="/" className="btn-primary text-xs py-2 px-4">← Portfolio</a>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Page Views" value={data.totalViews} color="green" />
          <StatCard label="Unique Sessions" value={data.uniqueSessions} color="cyan" />
          <StatCard label="Countries" value={data.countryBreakdown.length} color="yellow" />
          <StatCard label="Avg Daily Views" value={Math.round(data.totalViews / 30)} color="red" />
        </div>

        {/* Line chart */}
        <div className="terminal-card">
          <div className="terminal-header">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">views_per_day.chart — last 30 days</span>
          </div>
          <div className="terminal-body">
            <LineChart data={data.viewsPerDay} />
            <div className="flex justify-between mt-2">
              <span className="font-mono text-xs text-muted">{data.viewsPerDay[0]?.date}</span>
              <span className="font-mono text-xs text-muted">{data.viewsPerDay[29]?.date}</span>
            </div>
          </div>
        </div>

        {/* Breakdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top referrers */}
          <div className="terminal-card">
            <div className="terminal-header">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">top_referrers.log</span>
            </div>
            <div className="terminal-body space-y-3">
              {data.topReferrers.length === 0 ? (
                <p className="font-mono text-xs text-muted">No referrer data yet.</p>
              ) : (
                data.topReferrers.map((r) => (
                  <MiniBar key={r.referrer} label={r.referrer} value={r.count} max={maxRef} />
                ))
              )}
            </div>
          </div>

          {/* Countries */}
          <div className="terminal-card">
            <div className="terminal-header">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">country_breakdown.log</span>
            </div>
            <div className="terminal-body space-y-3">
              {data.countryBreakdown.length === 0 ? (
                <p className="font-mono text-xs text-muted">No country data yet.</p>
              ) : (
                data.countryBreakdown.map((c) => (
                  <MiniBar key={c.country} label={c.country} value={c.count} max={maxCountry} />
                ))
              )}
            </div>
          </div>

          {/* Devices */}
          <div className="terminal-card">
            <div className="terminal-header">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">device_breakdown.log</span>
            </div>
            <div className="terminal-body space-y-4">
              {data.deviceBreakdown.map((d) => {
                const total = data.deviceBreakdown.reduce((s, x) => s + x.count, 0);
                const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
                return (
                  <div key={d.device_type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted capitalize">{d.device_type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 progress-bar">
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="font-mono text-xs text-green w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })}
              {data.deviceBreakdown.length === 0 && (
                <p className="font-mono text-xs text-muted">No device data yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Visitors Table */}
        <div className="terminal-card overflow-hidden">
          <div className="terminal-header">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">recent_visitors.db</span>
          </div>
          <div className="terminal-body p-0 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-green/5 text-green border-b border-[var(--border)]">
                <tr>
                  <th className="p-3 font-normal whitespace-nowrap">Time</th>
                  <th className="p-3 font-normal whitespace-nowrap">IP Address</th>
                  <th className="p-3 font-normal whitespace-nowrap">Location</th>
                  <th className="p-3 font-normal whitespace-nowrap">Path</th>
                  <th className="p-3 font-normal whitespace-nowrap">Device</th>
                  <th className="p-3 font-normal whitespace-nowrap">Referrer</th>
                  <th className="p-3 font-normal whitespace-nowrap">User Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {data.recentVisitors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-muted">No visitors logged yet.</td>
                  </tr>
                ) : (
                  data.recentVisitors.map((v) => (
                    <tr key={v.id} className="hover:bg-[var(--surface)] transition-colors">
                      <td className="p-3 text-muted whitespace-nowrap">
                        {new Date(v.created_at).toLocaleString()}
                      </td>
                      <td className="p-3 text-cyan whitespace-nowrap">{v.ip_address || 'Unknown'}</td>
                      <td className="p-3 text-yellow whitespace-nowrap">{v.country || 'Unknown'}</td>
                      <td className="p-3 text-text whitespace-nowrap">{v.path}</td>
                      <td className="p-3 text-muted whitespace-nowrap capitalize">{v.device_type}</td>
                      <td className="p-3 text-muted whitespace-nowrap max-w-[150px] truncate" title={v.referrer || 'Direct'}>
                        {v.referrer || 'Direct'}
                      </td>
                      <td className="p-3 text-muted max-w-[200px] truncate" title={v.user_agent || 'Unknown'}>
                        {v.user_agent || 'Unknown'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <p className="font-mono text-xs text-muted text-center">
          Data refreshes on page load · No personal data stored · Anonymous sessions only
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // We start in a checking state. The Dashboard component will automatically attempt 
  // to fetch analytics using the HTTP-only cookie. If it fails with 401, it logs the user out.
  // Wait, actually since this is a client component, we'll assume logged out initially, 
  // but if they already have the cookie, they shouldn't need to login again.
  // Let's just render the dashboard, and if it throws 401, it will revert to LoginScreen.

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Attempt a quick ping to see if we have a valid session
    fetch('/api/sys-ctrl/analytics')
      .then((r) => {
        if (r.ok) {
          setIsAuthenticated(true);
        }
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  if (checking) return <div className="min-h-screen bg-bg flex items-center justify-center font-mono text-green">Checking secure session...</div>;

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
}
