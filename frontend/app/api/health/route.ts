import { getHealth } from '@mavens/backend';
import { NextResponse } from 'next/server';

/**
 * Thin adapter: HTTP in, HTTP out. All logic lives in @mavens/backend.
 *
 * This is the only API route in V1, and it is the template for any future one.
 * If business logic ever starts accumulating in a file like this, that is the
 * signal the frontend/backend separation is eroding — move it into the backend
 * package instead.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(getHealth(), {
    // Never cached: a cached health check reports the state of the past.
    headers: { 'Cache-Control': 'no-store' },
  });
}
