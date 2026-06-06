import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { AnalyticsData } from '@/lib/types';

export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';

async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return false;

  const cookieStore = await cookies();
  const authCookie = cookieStore.get('sys_ctrl_auth');

  if (authCookie && authCookie.value === adminSecret) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();

    // Total views
    const { count: totalViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    // Unique sessions
    const { data: sessions } = await supabase
      .from('page_views')
      .select('session_id');
    const uniqueSessions = new Set(sessions?.map((s) => s.session_id) ?? []).size;

    // Views per day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { data: rawViews } = await supabase
      .from('page_views')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString());

    const viewsByDay: Record<string, number> = {};
    for (const v of rawViews ?? []) {
      const day = v.created_at.slice(0, 10);
      viewsByDay[day] = (viewsByDay[day] ?? 0) + 1;
    }
    // Fill in missing days
    const viewsPerDay = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      viewsPerDay.push({ date: key, count: viewsByDay[key] ?? 0 });
    }

    // Top referrers
    const { data: refData } = await supabase
      .from('page_views')
      .select('referrer')
      .not('referrer', 'is', null);

    const refCounts: Record<string, number> = {};
    for (const r of refData ?? []) {
      const ref = r.referrer ?? 'Direct';
      try {
        const url = new URL(ref);
        const domain = url.hostname;
        refCounts[domain] = (refCounts[domain] ?? 0) + 1;
      } catch {
        refCounts['Direct'] = (refCounts['Direct'] ?? 0) + 1;
      }
    }
    const topReferrers = Object.entries(refCounts)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Country breakdown
    const { data: countryData } = await supabase
      .from('page_views')
      .select('country');

    const countryCounts: Record<string, number> = {};
    for (const c of countryData ?? []) {
      const country = c.country ?? 'Unknown';
      countryCounts[country] = (countryCounts[country] ?? 0) + 1;
    }
    const countryBreakdown = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Device breakdown
    const { data: deviceData } = await supabase
      .from('page_views')
      .select('device_type');

    const deviceCounts: Record<string, number> = {};
    for (const d of deviceData ?? []) {
      const device = d.device_type ?? 'unknown';
      deviceCounts[device] = (deviceCounts[device] ?? 0) + 1;
    }
    const deviceBreakdown = Object.entries(deviceCounts)
      .map(([device_type, count]) => ({ device_type, count }));

    // Recent visitors table
    const { data: recentData } = await supabase
      .from('page_views')
      .select('id, ip_address, country, path, created_at, device_type, referrer, user_agent')
      .order('created_at', { ascending: false })
      .limit(100);

    const recentVisitors = recentData ?? [];

    const analytics: AnalyticsData = {
      totalViews: totalViews ?? 0,
      uniqueSessions,
      viewsPerDay,
      topReferrers,
      countryBreakdown,
      deviceBreakdown,
      recentVisitors,
    };

    return NextResponse.json(analytics);
  } catch (err: any) {
    console.error('Analytics error:', err);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
