import { NextRequest, NextResponse } from 'next/server';

const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpe?g)$).*)'],
};

export function middleware(req: NextRequest) {
  // Implement your middleware logic here
  return NextResponse.next();
}

export default config;