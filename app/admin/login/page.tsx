
import Link from 'next/link';
import { Button, Card, Input } from '@/components/ui';

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <section className="mx-auto grid min-h-[calc(100vh-120px)] max-w-6xl place-items-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Admin Access</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Drifts AI CRM</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Only authorized administrators may enter.</p>
        </div>
        {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">Invalid credentials. Try again.</div> : null}
        <form action="/api/admin/login" method="post" className="space-y-4">
          <div><label className="mb-1 block text-sm">Email</label><Input name="email" type="email" defaultValue="admin@driftsai.com" required /></div>
          <div><label className="mb-1 block text-sm">Password</label><Input name="password" type="password" required /></div>
          <Button className="w-full" type="submit">Enter dashboard</Button>
        </form>
        <p className="text-xs text-slate-500">This page is protected server-side and is not a frontend-only lock.</p>
        <Link href="/" className="inline-block text-sm text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">Back to site</Link>
      </Card>
    </section>
  );
}
