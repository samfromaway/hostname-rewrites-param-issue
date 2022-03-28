// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
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
    // rewrite to the current hostname under the pages/sites folder
    // the main logic component will happen in pages/sites/[site]/index.tsx
    url.pathname = `/_sites/${currentHost}${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}
