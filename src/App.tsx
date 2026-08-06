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
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { LegalNoticeModal } from './components/LegalNoticeModal';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'recetas' | 'receta_detail' | 'admin'>('home');
  const [currentRecipeId, setCurrentRecipeId] = useState<string>('');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');
  const [selectedCatalogItems, setSelectedCatalogItems] = useState<SelectedItemState[]>([]);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);

  // Router listener for URL hashes (#/recetas, #/receta/x, #/admin) and paths (/recetas, /admin)
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash === '#admin' || hash === '#/admin' || path.endsWith('/admin')) {
        setCurrentRoute('admin');
      } else if (hash.startsWith('#/receta/') || hash.startsWith('#receta/')) {
        const id = hash.replace('#/receta/', '').replace('#receta/', '');
        setCurrentRecipeId(id);
        setCurrentRoute('receta_detail');
      } else if (hash === '#recetas' || hash === '#/recetas' || path.endsWith('/recetas')) {
        setCurrentRoute('recetas');
      } else {
        setCurrentRoute('home');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (route: 'home' | 'recetas' | 'admin', hashString?: string) => {
    if (hashString) {
      window.location.hash = hashString;
    } else if (route === 'recetas') {
      window.location.hash = '#/recetas';
    } else if (route === 'admin') {
      window.location.hash = '#/admin';
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

  // ROUTE 1: FULL PAGE ADMIN SUITE (/admin)
  if (currentRoute === 'admin') {
    return (
      <AdminDashboardPage onNavigateHome={() => navigateTo('home', '#/')} />
    );
  }

  // ROUTE 2: DEDICATED RECIPES CATALOG PAGE (/recetas)
  if (currentRoute === 'recetas') {
    return (
      <RecipesPage
        onNavigateHome={() => navigateTo('home', '#/')}
        onNavigateToRecipeDetail={(id) => navigateTo('home', `#/receta/${id}`)}
        onOpenQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenLegal={() => setIsLegalModalOpen(true)}
      />
    );
  }

  // ROUTE 3: DEDICATED RECIPE DETAIL PAGE (/receta/:id)
  if (currentRoute === 'receta_detail') {
    return (
      <RecipeDetailPage
        recipeId={currentRecipeId}
        onNavigateBack={() => navigateTo('recetas', '#/recetas')}
        onOpenQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenLegal={() => setIsLegalModalOpen(true)}
      />
    );
  }

  // ROUTE 4: MAIN LANDING PAGE (PORTADA PRINCIPAL)
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2937] font-sans antialiased selection:bg-[#E07A5F]/20 selection:text-[#1F2937] overflow-x-hidden w-full relative">
      {/* Clean Header Navbar */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section con 2 botones de acción: Cotizar Evento y Chef Privado */}
        <HeroSection onOpenQuote={(serviceType) => handleOpenQuote(serviceType)} />

        {/* Servicios */}
        <ServicesSection onSelectServiceForQuote={(serviceTitle) => handleOpenQuote(serviceTitle)} />

        {/* Cotizador Interactivo: Arma tu Menú (Canapés, Almuerzos, Estaciones) */}
        <MenuBuilderSection onProceedToQuote={handleProceedFromMenuBuilder} />

        {/* Especialidades */}
        <SpecialtiesSection />

        {/* Sección de Recetas Gourmet con paso a paso */}
        <RecipesSection onSelectForQuote={(recipeTitle) => handleOpenQuote(`Menú especial: ${recipeTitle}`)} />

        {/* Cómo trabajamos */}
        <ProcessSection />

        {/* Opiniones de comensales */}
        <TestimonialsSection />

        {/* Formulario de Contacto */}
        <ContactSection
          initialServiceSelected={selectedServiceForQuote}
          selectedCatalogItems={selectedCatalogItems}
          onClearSelectedCatalogItems={() => setSelectedCatalogItems([])}
        />
      </main>

      {/* Footer con enlaces a legales */}
      <Footer 
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenLegal={() => setIsLegalModalOpen(true)}
      />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Modales Legales */}
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
