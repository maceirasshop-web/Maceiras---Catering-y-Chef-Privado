import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo } from '../seo/routes';
import { SITE_LANG, SITE_NAME, SITE_URL } from '../seo/site';

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(json: object) {
  const id = 'maceiras-jsonld';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
}

export function SeoHead() {
  const { pathname } = useLocation();
  const seo = getRouteSeo(pathname);

  useEffect(() => {
    document.documentElement.lang = SITE_LANG;
    document.title = seo.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: seo.description });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: seo.robots || 'index, follow',
    });
    upsertLink('canonical', seo.canonical);

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'es_CL' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: seo.description,
    });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: seo.ogImage });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: seo.description,
    });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.ogImage });

    if (seo.jsonLd && Object.keys(seo.jsonLd).length > 0) {
      upsertJsonLd(seo.jsonLd);
    }

    const existingOg = document.head.querySelector('meta[property="og:image"][content*="unsplash"]');
    if (existingOg) existingOg.remove();
  }, [pathname, seo]);

  return null;
}

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}
