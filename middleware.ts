import { next } from '@vercel/functions';

function unauthorized(): Response {
  return new Response('Autenticación requerida', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Maceiras Admin", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);
  if (bufA.length !== bufB.length) return false;
  let out = 0;
  for (let i = 0; i < bufA.length; i += 1) {
    out |= bufA[i] ^ bufB[i];
  }
  return out === 0;
}

export default function middleware(request: Request) {
  const user = process.env.ADMIN_USER || '';
  const pass = process.env.ADMIN_PASSWORD || '';

  if (!user || !pass) {
    return unauthorized();
  }

  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) {
    return unauthorized();
  }

  let decoded = '';
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(':');
  const givenUser = sep === -1 ? decoded : decoded.slice(0, sep);
  const givenPass = sep === -1 ? '' : decoded.slice(sep + 1);

  if (!timingSafeEqual(givenUser, user) || !timingSafeEqual(givenPass, pass)) {
    return unauthorized();
  }

  return next({
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
  runtime: 'nodejs',
};
