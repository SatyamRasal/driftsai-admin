import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteShell } from '@/components/site-shell';
import { getSiteSettings } from '@/lib/data';
import { getSiteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = getSiteUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: settings.brand_name,
      template: `%s — ${settings.brand_name}`,
    },
    description: settings.seo_description,
    icons: settings.favicon_url ? [{ rel: 'icon', url: settings.favicon_url }] : undefined,
    openGraph: {
      title: settings.seo_title,
      description: settings.seo_description,
      url: baseUrl,
      siteName: settings.brand_name,
      images: settings.og_image_url ? [settings.og_image_url] : undefined,
      type: 'website',
    },
    twitter: {
      card: settings.og_image_url ? 'summary_large_image' : 'summary',
      title: settings.seo_title,
      description: settings.seo_description,
      images: settings.og_image_url ? [settings.og_image_url] : undefined,
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme={settings.theme}>
          <SiteShell settings={settings}>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
