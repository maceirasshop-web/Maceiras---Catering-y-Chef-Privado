import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { MenuBuilderSection, SelectedItemState } from './components/MenuBuilderSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { RecipesSection } from './components/RecipesSection';
import { RecipesPage } from './components/RecipesPage';
import { RecipeDetailPage } from './components/RecipeDetailPage';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { EmpresasPage } from './components/EmpresasPage';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { LegalNoticeModal } from './components/LegalNoticeModal';

type AppRoute = 'home' | 'recetas' | 'receta_detail' | 'admin' | 'empresas';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [currentRecipeId, setCurrentRecipeId] = useState<string>('');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');
  const [selectedCatalogItems, setSelectedCatalogItems] = useState<SelectedItemState[]>([]);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const href = window.location.href.toLowerCase();

      if (hash.includes('admin') || path.includes('/admin') || href.includes('/admin')) {
        setCurrentRoute('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.includes('receta/') || path.includes('/receta/')) {
        let id = '';
        if (hash.includes('receta/')) {
          id = hash.split('receta/')[1];
        } else if (path.includes('/receta/')) {
          id = path.split('/receta/')[1];
        }
        setCurrentRecipeId(id);
        setCurrentRoute('receta_detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.includes('#/recetas') || hash === '#/recetas' || path.includes('/recetas')) {
        setCurrentRoute('recetas');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.includes('empresas') || path.includes('/empresas')) {
        setCurrentRoute('empresas');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('home');
        const raw = window.location.hash.replace('#', '').replace('/', '');
        const sectionId = raw.split('?')[0];
        if (sectionId && document.getElementById(sectionId)) {
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        } else if (!hash || hash === '#' || hash === '#/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (route: 'home' | 'recetas' | 'admin' | 'empresas', hashString?: string) => {
    if (hashString) {
      window.location.hash = hashString;
    } else if (route === 'recetas') {
      window.location.hash = '#/recetas';
    } else if (route === 'admin') {
      window.location.hash = '#/admin';
    } else if (route === 'empresas') {
      window.location.hash = '#/empresas';
    } else {
      window.location.hash = '#/';
    }
  };

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForQuote(serviceName);
    }
    if (currentRoute !== 'home') {
      window.location.hash = '#contacto';
      setCurrentRoute('home');
      setTimeout(() => {
        const contactElement = document.getElementById('contacto');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactElement = document.getElementById('contacto');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleProceedFromMenuBuilder = (items: SelectedItemState[]) => {
    setSelectedCatalogItems(items);
    handleOpenQuote('Menú Personalizado de Canapés / Banquete');
  };

  if (currentRoute === 'admin') {
    return (
      <AdminDashboardPage onNavigateHome={() => navigateTo('home', '#/')} />
    );
  }

  if (currentRoute === 'empresas') {
    return (
      <>
        <EmpresasPage
          onOpenQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
          onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
          onOpenLegal={() => setIsLegalModalOpen(true)}
        />
        <WhatsAppWidget />
        <PrivacyPolicyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
        <LegalNoticeModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
        />
      </>
    );
  }

  if (currentRoute === 'recetas') {
    return (
      <>
        <RecipesPage
          onNavigateHome={() => navigateTo('home', '#/')}
          onNavigateToRecipeDetail={(id) => navigateTo('home', `#/receta/${id}`)}
          onOpenQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
          onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
          onOpenLegal={() => setIsLegalModalOpen(true)}
        />
        <PrivacyPolicyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
        <LegalNoticeModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
        />
      </>
    );
  }

  if (currentRoute === 'receta_detail') {
    return (
      <>
        <RecipeDetailPage
          recipeId={currentRecipeId}
          onNavigateBack={() => navigateTo('recetas', '#/recetas')}
          onOpenQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
          onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
          onOpenLegal={() => setIsLegalModalOpen(true)}
        />
        <WhatsAppWidget />
        <PrivacyPolicyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
        <LegalNoticeModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans antialiased overflow-x-hidden w-full relative">
      <Navbar onOpenQuote={() => handleOpenQuote()} currentRoute="home" />

      <main>
        <HeroSection onOpenQuote={(serviceType) => handleOpenQuote(serviceType)} />
        <ServicesSection onSelectServiceForQuote={(serviceTitle) => handleOpenQuote(serviceTitle)} />

        <section className="bg-[#0A0A0A] text-[#F7F7F5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="font-display text-[12px] tracking-[0.22em] uppercase text-white/40">Empresas</span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-[-0.03em] leading-tight">
                Catering corporativo con protocolo de sala.
              </h2>
              <p className="text-white/50 font-light text-sm leading-relaxed">
                Coffee break, lunch ejecutivo, cocktail de marca y cenas de directorio. Un interlocutor. Facturación empresa.
              </p>
            </div>
            <a
              href="#/empresas"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#F7F7F5] text-[#0A0A0A] font-display text-[13px] font-semibold tracking-[0.16em] uppercase hover:bg-white transition-colors shrink-0"
            >
              Ver servicio empresas
            </a>
          </div>
        </section>

        <MenuBuilderSection onProceedToQuote={handleProceedFromMenuBuilder} />
        <SpecialtiesSection />
        <RecipesSection onSelectForQuote={(recipeTitle) => handleOpenQuote(`Menú especial: ${recipeTitle}`)} />
        <TestimonialsSection />
        <ContactSection
          initialServiceSelected={selectedServiceForQuote}
          selectedCatalogItems={selectedCatalogItems}
          onClearSelectedCatalogItems={() => setSelectedCatalogItems([])}
        />
      </main>

      <Footer
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenLegal={() => setIsLegalModalOpen(true)}
      />

      <WhatsAppWidget />

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <LegalNoticeModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />
    </div>
  );
}
