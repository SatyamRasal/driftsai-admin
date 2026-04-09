import crypto from 'crypto';
import { cookies } from 'next/headers';
import { safeCompareStrings } from '@/lib/utils';

export const ADMIN_COOKIE = 'driftsai_admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set to a long random string.');
  }
  return secret;
}

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload: string) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createSessionToken(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const expires = Date.now() + COOKIE_MAX_AGE * 1000;
  const payload = JSON.stringify({ email: normalizedEmail, expires });
  const body = base64url(payload);
  const signature = sign(body);
  return `${body}.${signature}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  let expected = '';
  try {
    expected = sign(body);
  } catch {
    return null;
  }

  if (!safeCompareStrings(signature, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as { email?: unknown; expires?: unknown };
    if (typeof payload.email !== 'string' || typeof payload.expires !== 'number') return null;
    if (Date.now() > payload.expires) return null;
    return { email: payload.email, expires: payload.expires };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}

export function setAdminCookie(token: string) {
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearAdminCookie() {
  cookies().set(ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
