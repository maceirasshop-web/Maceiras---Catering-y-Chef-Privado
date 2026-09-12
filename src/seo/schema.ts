import { AREA_SERVED, EMAIL, OG_IMAGE, SITE_NAME, SITE_URL, WHATSAPP_NUMBER, waLink } from './site';

export function businessJsonLd() {
  return {
    '@type': ['FoodEstablishment', 'CateringBusiness'],
    '@id': `${SITE_URL}/#negocio`,
    name: SITE_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    description:
      'Catering para cumpleaños y graduaciones, menús semanales o mensuales a domicilio, chef privado y servicio para empresas en Santiago (Vitacura, Las Condes, Lo Barnechea).',
    telephone: `+${WHATSAPP_NUMBER}`,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    areaServed: AREA_SERVED.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    servesCuisine: ['Catering', 'Chef privado a domicilio', 'Cocina para eventos'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: `+${WHATSAPP_NUMBER}`,
      email: EMAIL,
      url: waLink(),
      availableLanguage: ['es'],
      areaServed: 'CL',
    },
  };
}

export function webPageJsonLd(opts: {
  path: string;
  title: string;
  description: string;
}) {
  const url = `${SITE_URL}${opts.path === '/' ? '/' : opts.path}`;
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: 'es-CL',
    isPartOf: { '@id': `${SITE_URL}/#sitio` },
    about: { '@id': `${SITE_URL}/#negocio` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
    })),
  };
}

export function graphJsonLd(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#sitio`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'es-CL',
        publisher: { '@id': `${SITE_URL}/#negocio` },
      },
      businessJsonLd(),
      ...nodes,
    ],
  };
}
