import React, { useState } from 'react';
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

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForQuote(serviceName);
    }
    const contactElement = document.getElementById('contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#2A2A2A] font-sans antialiased selection:bg-[#D27D56]/20 selection:text-[#2A2A2A]">
      {/* Fixed Navbar */}
      <Navbar 
        onOpenQuote={() => handleOpenQuote()} 
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

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

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}
