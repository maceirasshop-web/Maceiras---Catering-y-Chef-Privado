import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminPanelModal } from './components/AdminPanelModal';

export default function App() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Dedicated URL Hash listener for #admin route
  useEffect(() => {
    const checkAdminRoute = () => {
      if (window.location.hash === '#admin' || window.location.pathname.endsWith('/admin')) {
        setIsAdminModalOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForQuote(serviceName);
    }
    const contactElement = document.getElementById('contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminModalOpen(false);
    if (window.location.hash === '#admin') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#2A2A2A] font-sans antialiased selection:bg-[#D27D56]/20 selection:text-[#2A2A2A] overflow-x-hidden w-full relative">
      {/* Clean Header Navbar */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with 3D Three.js Scene */}
        <HeroSection onOpenQuote={() => handleOpenQuote()} />

        {/* Servicios */}
        <ServicesSection onSelectServiceForQuote={(serviceTitle) => handleOpenQuote(serviceTitle)} />

        {/* Especialidades */}
        <SpecialtiesSection />

        {/* Cómo trabajamos */}
        <ProcessSection />

        {/* Opiniones de comensales */}
        <TestimonialsSection />

        {/* Formulario de Contacto */}
        <ContactSection initialServiceSelected={selectedServiceForQuote} />
      </main>

      {/* Footer con enlace discreto a #admin */}
      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* Floating WhatsApp Widget con animación suave y texto amigable */}
      <WhatsAppWidget />

      {/* Admin Panel Modal con URL dedicada #admin */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={handleCloseAdmin}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
