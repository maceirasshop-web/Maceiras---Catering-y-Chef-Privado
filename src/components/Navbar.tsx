import React, { useState, useEffect } from 'react';
import { ChefHat, Menu, X, ArrowUpRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle background styling
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'Cómo trabajamos', href: '#proceso' },
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        visible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled 
          ? 'bg-[#F5F2ED]/90 backdrop-blur-md border-b border-[#2A2A2A]/10 py-4 shadow-xs' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group"
          id="brand-logo"
        >
          <div className="w-9 h-9 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <ChefHat className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-widest uppercase text-[#2A2A2A] font-light">
              Maceiras
            </span>
            <span className="text-[9px] tracking-widest uppercase text-[#5A5A40] -mt-1 font-sans">
              Catering & Chef Privado
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] uppercase tracking-widest text-[#2A2A2A]/80 hover:text-[#D27D56] transition-colors duration-200 font-sans font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/56931939017?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20catering%20y%20chef%20privado."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#5A5A40] hover:text-[#D27D56] transition-colors px-3 py-2"
            title="Contacto por WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="font-medium">+56 9 3193 9017</span>
          </a>

          <button
            onClick={onOpenQuote}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:bg-[#D27D56] hover:shadow-md active:scale-95 cursor-pointer"
            id="nav-quote-btn"
          >
            <span>Solicitar cotización</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#2A2A2A] focus:outline-none"
          aria-label="Abrir menú"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F2ED] border-b border-[#2A2A2A]/10 px-6 py-8 flex flex-col gap-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-[#2A2A2A] font-serif hover:text-[#D27D56] py-1 border-b border-[#2A2A2A]/10"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full text-center py-3 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium"
            >
              Solicitar cotización
            </button>

            <a
              href="tel:+56931939017"
              className="flex items-center justify-center gap-2 py-2 text-xs text-[#5A5A40]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+56 9 3193 9017</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
