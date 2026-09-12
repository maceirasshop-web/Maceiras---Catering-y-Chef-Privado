import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { waLink } from '../seo/site';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 12);

      if (currentScrollY > lastScrollY && currentScrollY > 80 && !mobileMenuOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const navLinks = [
    { name: 'Servicios', to: '/#servicios' },
    { name: 'Empresas', to: '/empresas' },
    { name: 'Arma tu menú', to: '/#arma-tu-menu' },
    { name: 'Recetas', to: '/recetas' },
    { name: 'Proceso', to: '/#proceso' },
    { name: 'Contacto', to: '/#contacto' },
  ];

  const isActive = (to: string) => {
    if (to === '/empresas') return currentRoute === '/empresas';
    if (to === '/recetas') return currentRoute.startsWith('/recetas');
    return false;
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        visible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled || mobileMenuOpen
          ? 'bg-[#F7F7F5]/92 backdrop-blur-md border-b border-[#0A0A0A]/8 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link
          to="/"
          className="text-[1.35rem] sm:text-[1.45rem] font-semibold tracking-[-0.03em] text-[#0A0A0A]"
          id="brand-logo"
        >
          Maceiras
        </Link>

        <nav className="hidden lg:flex items-center gap-7" id="desktop-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`text-[14px] font-medium transition-colors duration-200 ${
                isActive(link.to)
                  ? 'text-[#0A0A0A]'
                  : 'text-[#0A0A0A]/55 hover:text-[#0A0A0A]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 text-[13px] text-[#5C5C5C] hover:text-[#0A0A0A] transition-colors px-2 py-2"
            title="Contacto por WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="font-medium">+56 9 3193 9017</span>
          </a>

          <button
            onClick={onOpenQuote}
            className="btn-primary !py-2.5 !px-5"
            id="nav-quote-btn"
          >
            <span>Cotizar</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#0A0A0A] rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F7F5] border-t border-[#0A0A0A]/8 px-6 py-8 flex flex-col gap-6">
          <nav className="flex flex-col" id="mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#0A0A0A] py-3 border-b border-[#0A0A0A]/8"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="btn-primary w-full"
            >
              Solicitar cotización
            </button>

            <a
              href="tel:+56931939017"
              className="flex items-center justify-center gap-2 py-2 text-sm text-[#5C5C5C]"
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
