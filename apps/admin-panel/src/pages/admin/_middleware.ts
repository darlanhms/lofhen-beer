import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest): Promise<Response> {
  const url = req.nextUrl.clone();

  const raw = await fetch(`${process.env.API_URL}/users/current-user`, {
    headers: req.headers,
  });

  const data = await raw.json();

  if (!data) {
    return NextResponse.redirect(`${url.origin}/login`);
  }

  return NextResponse.next();
}
