import React, { lazy, Suspense, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { Footer } from '../components/Footer';
import { SelectedItemState } from '../components/MenuBuilderSection';

const MenuBuilderSection = lazy(() =>
  import('../components/MenuBuilderSection').then((m) => ({ default: m.MenuBuilderSection }))
);
const SpecialtiesSection = lazy(() =>
  import('../components/SpecialtiesSection').then((m) => ({ default: m.SpecialtiesSection }))
);
const RecipesSection = lazy(() =>
  import('../components/RecipesSection').then((m) => ({ default: m.RecipesSection }))
);
const ProcessSection = lazy(() =>
  import('../components/ProcessSection').then((m) => ({ default: m.ProcessSection }))
);
const ContactSection = lazy(() =>
  import('../components/ContactSection').then((m) => ({ default: m.ContactSection }))
);

function SectionFallback() {
  return <div className="min-h-[12rem] bg-[#F7F7F5]" aria-hidden="true" />;
}

interface HomePageProps {
  selectedServiceForQuote: string;
  selectedCatalogItems: SelectedItemState[];
  onOpenQuote: (serviceName?: string) => void;
  onProceedFromMenuBuilder: (items: SelectedItemState[]) => void;
  onClearSelectedCatalogItems: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  selectedServiceForQuote,
  selectedCatalogItems,
  onOpenQuote,
  onProceedFromMenuBuilder,
  onClearSelectedCatalogItems,
}) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const target =
      params.get('cotizar') === '1'
        ? 'contacto'
        : location.hash.replace('#', '').replace('/', '');
    if (!target) return;
    const t = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.hash, location.search]);

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans antialiased overflow-x-hidden w-full relative">
      <Navbar onOpenQuote={() => onOpenQuote()} />

      <main id="contenido">
        <HeroSection onOpenQuote={(serviceType) => onOpenQuote(serviceType)} />
        <ServicesSection onSelectServiceForQuote={(serviceTitle) => onOpenQuote(serviceTitle)} />

        <section className="bg-[#0A0A0A] text-[#F7F7F5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-[13px] font-medium text-[#C4C4C4]">Empresas</span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] leading-tight">
                Catering corporativo con protocolo de sala.
              </h2>
              <p className="text-[#C4C4C4] font-normal text-sm leading-relaxed">
                Coffee break, lunch ejecutivo, cocktail de marca y cenas de directorio. Un interlocutor. Facturación empresa.
              </p>
            </div>
            <Link
              to="/empresas"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F7F7F5] text-[#0A0A0A] text-[14.5px] font-semibold tracking-[-0.01em] hover:bg-white transition-colors shrink-0 rounded-full"
            >
              Ver servicio empresas
            </Link>
          </div>
        </section>

        <Suspense fallback={<SectionFallback />}>
          <MenuBuilderSection onProceedToQuote={onProceedFromMenuBuilder} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SpecialtiesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <RecipesSection onSelectForQuote={(recipeTitle) => onOpenQuote(`Menú especial: ${recipeTitle}`)} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection
            initialServiceSelected={selectedServiceForQuote}
            selectedCatalogItems={selectedCatalogItems}
            onClearSelectedCatalogItems={onClearSelectedCatalogItems}
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};
