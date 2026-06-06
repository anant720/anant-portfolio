import { NextResponse } from 'next/server';

export async function GET() {
  // Redirect to the static PDF or update this to serve from Supabase storage
  return NextResponse.redirect(new URL('/resume.pdf', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'));
}
