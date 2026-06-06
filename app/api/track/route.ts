import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';


// GET: return total visitor count (public)
export async function GET() {
  try {
    const supabase = createServiceClient();
    const { count } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({ total: count ?? 0 });
  } catch {
    return NextResponse.json({ total: 0 });
  }
}

// POST: record a page view
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session_id, path, referrer, device_type, user_agent } = body;

    if (!session_id || !path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get country from Vercel's geo headers
    const country =
      req.headers.get('x-vercel-ip-country') ??
      req.headers.get('cf-ipcountry') ??
      null;

    const ip_address =
      req.headers.get('x-forwarded-for')?.split(',')[0] ??
      req.headers.get('x-real-ip') ??
      req.ip ??
      null;

    const supabase = createServiceClient();
    await supabase.from('page_views').insert({
      session_id,
      path,
      referrer: referrer ?? null,
      country,
      device_type: device_type ?? 'desktop',
      user_agent: user_agent ?? null,
      ip_address,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Track error:', err);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
