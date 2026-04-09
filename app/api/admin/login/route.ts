import { NextResponse } from 'next/server';
import { createSessionToken } from '@/lib/session';

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const email = String(form.get('email') || '').trim().toLowerCase();
    const password = String(form.get('password') || '');
    const expectedEmail = getEnv('ADMIN_EMAIL').trim().toLowerCase();
    const expectedPassword = getEnv('ADMIN_PASSWORD');

    const isValid = email === expectedEmail && password === expectedPassword;
    if (!isValid) {
      return NextResponse.redirect(new URL('/admin/login?error=1', req.url));
    }

    const token = createSessionToken(email);
    const response = NextResponse.redirect(new URL('/admin', req.url));
    response.cookies.set({
      name: 'driftsai_admin_session',
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch (error) {
    console.error('Admin login failed:', error);
    return NextResponse.json({ error: 'Admin login is unavailable.' }, { status: 500 });
  }
}
