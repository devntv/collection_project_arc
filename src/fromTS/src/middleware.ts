import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  const timeMiddleWare = +new Date();
  const url = req.nextUrl.clone();
  const { pathname } = url;

  url.pathname = pathname?.toLocaleLowerCase();
  const response = NextResponse.rewrite(url);
  response.headers.set('x-time-middleware', `${+new Date() - +new Date()}`);
  return response;
}
export const config = {
  matcher: ['/product/:path*'],
};
