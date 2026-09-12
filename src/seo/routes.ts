import { breadcrumbJsonLd, graphJsonLd, webPageJsonLd } from './schema';
import { OG_IMAGE, SITE_URL, waLink } from './site';

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  h1: string;
  robots?: string;
  jsonLd: object;
  snapshot: string;
}

const HOME_H1 = 'Eventos en casa. Y menús para toda la semana.';
const EMPRESAS_H1 = 'Catering corporativo con protocolo, no con improvisación.';
const RECETAS_H1 = 'Técnica de autor, documentada.';
const PRIVACIDAD_H1 = 'Política de Privacidad';
const TERMINOS_H1 = 'Aviso Legal y Términos del Servicio';

function pageUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export const ROUTE_SEO: RouteSeo[] = [
  {
    path: '/',
    title: 'Maceiras | Catering Premium & Chef Privado a Domicilio en Santiago',
    description:
      'Maceiras: catering para cumpleaños y graduaciones, menús semanales o mensuales a domicilio, chef privado y servicio para empresas en Santiago (Vitacura, Las Condes, Lo Barnechea).',
    canonical: pageUrl('/'),
    ogImage: OG_IMAGE,
    h1: HOME_H1,
    jsonLd: graphJsonLd([
      webPageJsonLd({
        path: '/',
        title: 'Maceiras | Catering Premium & Chef Privado a Domicilio en Santiago',
        description:
          'Maceiras: catering para cumpleaños y graduaciones, menús semanales o mensuales a domicilio, chef privado y servicio para empresas en Santiago.',
      }),
      breadcrumbJsonLd([{ name: 'Inicio', path: '/' }]),
      {
        '@type': 'ItemList',
        name: 'Servicios Maceiras',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Eventos personales' },
          { '@type': 'ListItem', position: 2, name: 'Menús semanales y mensuales' },
          { '@type': 'ListItem', position: 3, name: 'Chef privado a domicilio' },
          { '@type': 'ListItem', position: 4, name: 'Catering para empresas' },
        ],
      },
    ]),
    snapshot: `
<main id="contenido">
  <header><p>Maceiras</p></header>
  <section>
    <p>Santiago · Catering y cocina en casa</p>
    <h1>${HOME_H1}</h1>
    <p>Cumpleaños, graduaciones y cenas privadas. También vamos a tu domicilio con los alimentos de la semana o del mes. Y catering para empresas.</p>
    <p><a href="${waLink()}">Cotizar por WhatsApp</a> · <a href="/?cotizar=1">Solicitar cotización</a></p>
  </section>
  <section>
    <h2>Servicios</h2>
    <h3>Eventos personales</h3>
    <p>Catering para cumpleaños, graduaciones, baby showers, aniversarios y reuniones en casa o en recinto.</p>
    <h3>Menús semanales y mensuales</h3>
    <p>Planificamos el menú, llevamos los alimentos a tu domicilio y dejamos las comidas de la semana o del mes listas.</p>
    <h3>Chef privado a domicilio</h3>
    <p>El chef llega a tu casa, cocina, sirve y deja todo impecable.</p>
    <h3>Empresas</h3>
    <p>Coffee breaks, lunches ejecutivos, cocktails de marca y cenas de directorio. Un interlocutor. Facturación empresa.</p>
    <p><a href="/empresas">Ver servicio empresas</a></p>
  </section>
  <section>
    <h2>Arma tu menú a la medida</h2>
    <p>Selecciona canapés, almuerzos o estaciones. Precio a cotizar. Envíe una cotización itemizada o escriba por WhatsApp.</p>
  </section>
  <section>
    <h2>Cómo trabajamos</h2>
    <ol>
      <li>Consulta inicial</li>
      <li>Diseño del menú</li>
      <li>Preparación y montaje</li>
      <li>La experiencia Maceiras</li>
    </ol>
  </section>
  <section>
    <h2>Solicite una propuesta</h2>
    <p>Completa el formulario. Respondemos en menos de 24 horas con una cotización a medida. WhatsApp ${waLink()}</p>
  </section>
</main>`.trim(),
  },
  {
    path: '/empresas',
    title: 'Catering corporativo en Santiago | Maceiras',
    description:
      'Coffee breaks, lunches ejecutivos, cocktails de marca y cenas de directorio en Santiago. Un interlocutor, cotización itemizada y facturación empresa.',
    canonical: pageUrl('/empresas'),
    ogImage: OG_IMAGE,
    h1: EMPRESAS_H1,
    jsonLd: graphJsonLd([
      webPageJsonLd({
        path: '/empresas',
        title: 'Catering corporativo en Santiago | Maceiras',
        description:
          'Coffee breaks, lunches ejecutivos, cocktails de marca y cenas de directorio en Santiago.',
      }),
      breadcrumbJsonLd([
        { name: 'Inicio', path: '/' },
        { name: 'Empresas', path: '/empresas' },
      ]),
      {
        '@type': 'Service',
        name: 'Catering corporativo Maceiras',
        serviceType: 'Catering para empresas',
        provider: { '@id': `${SITE_URL}/#negocio` },
        areaServed: 'Santiago, Chile',
        url: pageUrl('/empresas'),
      },
    ]),
    snapshot: `
<main id="contenido">
  <p>Empresas</p>
  <h1>${EMPRESAS_H1}</h1>
  <p>Coffee breaks, lunches ejecutivos, cocktails de marca y cenas de directorio. Un interlocutor, una cotización clara y un servicio que respeta la agenda de la empresa.</p>
  <p><a href="${waLink('Hola, quisiera una propuesta de catering corporativo.')}">Solicitar propuesta por WhatsApp</a></p>
  <h2>Formatos</h2>
  <ul>
    <li>Coffee break y desayunos ejecutivos (10 — 120 personas)</li>
    <li>Lunch ejecutivo (8 — 80 personas)</li>
    <li>Cocktail corporativo (20 — 150 personas)</li>
    <li>Directorio y cenas VIP (6 — 40 personas)</li>
  </ul>
  <h2>Cobertura</h2>
  <p>Oficinas y recintos en Vitacura, Las Condes, Lo Barnechea, Providencia, La Dehesa y Chicureo.</p>
</main>`.trim(),
  },
  {
    path: '/recetas',
    title: 'Recetas de autor | Maceiras Catering',
    description:
      'Guías paso a paso de Maceiras: Filete Wellington, carpaccio y técnica de autor. Cocínelas en casa o solicite al chef privado para su velada en Santiago.',
    canonical: pageUrl('/recetas'),
    ogImage: OG_IMAGE,
    h1: RECETAS_H1,
    jsonLd: graphJsonLd([
      webPageJsonLd({
        path: '/recetas',
        title: 'Recetas de autor | Maceiras Catering',
        description: 'Guías paso a paso de Maceiras. Cocínelas en casa o solicite al chef privado.',
      }),
      breadcrumbJsonLd([
        { name: 'Inicio', path: '/' },
        { name: 'Recetas', path: '/recetas' },
      ]),
      {
        '@type': 'ItemList',
        name: 'Recetas Maceiras',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Recipe',
              name: 'Filete Wellington Artesanal con Risotto de Setas',
              author: { '@type': 'Organization', name: 'Maceiras Catering & Chef Privado' },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Recipe',
              name: 'Carpaccio de Res con Emulsión de Oliva y Limón de Pica',
              author: { '@type': 'Organization', name: 'Maceiras Catering & Chef Privado' },
            },
          },
        ],
      },
    ]),
    snapshot: `
<main id="contenido">
  <p>Recetario</p>
  <h1>${RECETAS_H1}</h1>
  <p>Guías paso a paso de Maceiras. Cocínalas en casa o solicita al chef privado para tu velada.</p>
  <article>
    <h2>Filete Wellington Artesanal con Risotto de Setas</h2>
    <p>Técnica para sellar el corte de res, envolver en duxelles de champiñones y hojaldre crujiente.</p>
  </article>
  <article>
    <h2>Carpaccio de Res con Emulsión de Oliva y Limón de Pica</h2>
    <p>Láminas de filete de res con alcaparras, rúcula y queso madurado.</p>
  </article>
  <p><a href="${waLink('Hola, quisiera solicitar al chef privado una de sus recetas de autor.')}">Cotizar chef privado</a></p>
</main>`.trim(),
  },
  {
    path: '/privacidad',
    title: 'Política de Privacidad | Maceiras',
    description:
      'Cómo Maceiras Catering & Chef Privado trata los datos personales recabados en cotizaciones, conforme a la Ley N° 19.628 sobre Protección de la Vida Privada en Chile.',
    canonical: pageUrl('/privacidad'),
    ogImage: OG_IMAGE,
    h1: PRIVACIDAD_H1,
    jsonLd: graphJsonLd([
      webPageJsonLd({
        path: '/privacidad',
        title: 'Política de Privacidad | Maceiras',
        description: 'Tratamiento de datos personales de Maceiras conforme a la Ley N° 19.628.',
      }),
      breadcrumbJsonLd([
        { name: 'Inicio', path: '/' },
        { name: 'Privacidad', path: '/privacidad' },
      ]),
    ]),
    snapshot: `
<main id="contenido">
  <h1>${PRIVACIDAD_H1}</h1>
  <p>Maceiras Catering & Chef Privado trata los datos personales de clientes y comensales en Chile conforme a la Ley N° 19.628 sobre Protección de la Vida Privada.</p>
  <h2>Datos que recabamos</h2>
  <p>Nombre, correo, teléfono, ubicación del evento y preferencias culinarias, únicamente para confeccionar propuestas y coordinar el servicio.</p>
  <h2>Uso</h2>
  <p>Los datos no se venden ni se ceden a terceros con fines publicitarios. La comunicación se realiza por correo o WhatsApp oficial.</p>
  <h2>Derechos</h2>
  <p>Puede solicitar acceso, rectificación o eliminación escribiendo a maceiras.shop@gmail.com.</p>
</main>`.trim(),
  },
  {
    path: '/terminos',
    title: 'Aviso Legal y Términos | Maceiras',
    description:
      'Términos del servicio de Maceiras Catering & Chef Privado en Santiago: cotización, disponibilidad, propiedad intelectual y contacto oficial.',
    canonical: pageUrl('/terminos'),
    ogImage: OG_IMAGE,
    h1: TERMINOS_H1,
    jsonLd: graphJsonLd([
      webPageJsonLd({
        path: '/terminos',
        title: 'Aviso Legal y Términos | Maceiras',
        description: 'Términos del servicio de catering y chef privado de Maceiras en Santiago.',
      }),
      breadcrumbJsonLd([
        { name: 'Inicio', path: '/' },
        { name: 'Términos', path: '/terminos' },
      ]),
    ]),
    snapshot: `
<main id="contenido">
  <h1>${TERMINOS_H1}</h1>
  <p>Este sitio pertenece a Maceiras Catering & Chef Privado, marca dedicada a servicios gastronómicos, catering para eventos y chef a domicilio en Santiago de Chile.</p>
  <h2>Condiciones del servicio</h2>
  <p>Las propuestas enviadas por formulario o WhatsApp están sujetas a confirmación de disponibilidad. Cada menú se personaliza según alergias o restricciones notificadas. No operamos como tienda en línea ni procesamos pagos en este sitio.</p>
  <h2>Contacto</h2>
  <p>maceiras.shop@gmail.com · +56 9 3193 9017</p>
</main>`.trim(),
  },
];

export function getRouteSeo(pathname: string): RouteSeo {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const exact = ROUTE_SEO.find((r) => r.path === clean);
  if (exact) return exact;
  if (clean.startsWith('/recetas/')) {
    const recetas = ROUTE_SEO.find((r) => r.path === '/recetas')!;
    return {
      ...recetas,
      path: clean,
      canonical: pageUrl(clean),
      robots: 'index,follow',
    };
  }
  if (clean.startsWith('/admin')) {
    return {
      path: '/admin',
      title: 'Administración | Maceiras',
      description: 'Panel interno de Maceiras.',
      canonical: pageUrl('/admin'),
      ogImage: OG_IMAGE,
      h1: 'Administración',
      robots: 'noindex, nofollow',
      jsonLd: {},
      snapshot: '',
    };
  }
  return ROUTE_SEO[0];
}
