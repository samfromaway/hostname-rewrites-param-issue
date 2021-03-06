import { NextRequest, NextResponse } from 'next/server';

// this _middleware file does not work with query params.
// I get this one time warning in the server's console as well https://nextjs.org/docs/messages/deleting-query-params-in-middlewares
// what happens is the query params will be undefined.
// example url http://localhost:3000/booking?startDate=2022-04-14

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // @ts-ignore
  const redirectTo404 = () => NextResponse.rewrite(new URL('/404', req.url));

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents.
  if (pathname.startsWith(`/_sites`)) {
    return redirectTo404();
  }

  const excludeCheck =
    !pathname.includes('.') && // exclude all files in the public folder
    !pathname.startsWith('/api'); // exclude all API routes

  if (excludeCheck || pathname.includes('.html')) {
    const hostname = req.headers.get('host');

    const currentHost = process.env.DEV_ONLY_BRAND_URL || hostname;

    return NextResponse.rewrite(
      new URL(`/_sites/${currentHost}${pathname}`, req.url)
    );
  }
}
