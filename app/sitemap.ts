import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/data';
import { getSiteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [current, upcoming] = await Promise.all([getProducts('current'), getProducts('upcoming')]);
  const base = getSiteUrl();
  const updatedAt = new Date();

  return [
    { url: `${base}/`, lastModified: updatedAt },
    { url: `${base}/products`, lastModified: updatedAt },
    { url: `${base}/upcoming`, lastModified: updatedAt },
    { url: `${base}/inquire`, lastModified: updatedAt },
    { url: `${base}/support`, lastModified: updatedAt },
    { url: `${base}/privacy`, lastModified: updatedAt },
    { url: `${base}/terms`, lastModified: updatedAt },
    { url: `${base}/cookies`, lastModified: updatedAt },
    ...current.map((product) => ({ url: `${base}/products/${product.slug}`, lastModified: new Date(product.updated_at) })),
    ...upcoming.map((product) => ({ url: `${base}/upcoming/${product.slug}`, lastModified: new Date(product.updated_at) })),
  ];
}
