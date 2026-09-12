import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, Building2, Clock, FileText, Shield } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CORPORATE_FORMATS, CORPORATE_CAPABILITIES } from '../data/cateringData';
import { OptimizedImage } from './OptimizedImage';

interface EmpresasPageProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const EmpresasPage: React.FC<EmpresasPageProps> = ({
  onOpenQuote,
}) => {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans antialiased flex flex-col">
      <Navbar onOpenQuote={() => onOpenQuote('Eventos Corporativos & Ejecutivos')} />

      <main id="contenido" className="flex-1">
        <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 border-b border-[#0A0A0A]/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              <div className="lg:col-span-7 space-y-6">
                <span className="kicker">Empresas</span>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-medium tracking-[-0.04em] leading-[1.08]">
                  Catering corporativo con protocolo, no con improvisación.
                </h1>
                <p className="text-base sm:text-lg font-light text-[#5C5C5C] max-w-xl leading-relaxed">
                  Coffee breaks, lunches ejecutivos, cocktails de marca y cenas de directorio. Un interlocutor, una cotización clara y un servicio que respeta la agenda de la empresa.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => onOpenQuote('Eventos Corporativos & Ejecutivos')}
                    className="btn-primary"
                  >
                    <span>Solicitar propuesta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a href="#formatos" className="btn-outline">
                    Ver formatos
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 border border-[#0A0A0A]/10 rounded-3xl overflow-hidden">
                {[
                  { value: '24 h', label: 'Propuesta inicial' },
                  { value: '1', label: 'Interlocutor único' },
                  { value: 'RM', label: 'Santiago y oriente' },
                  { value: 'OC', label: 'Facturación empresa' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`p-6 sm:p-8 ${i % 2 === 0 ? 'border-r border-[#0A0A0A]/10' : ''} ${i < 2 ? 'border-b border-[#0A0A0A]/10' : ''}`}
                  >
                    <div className="text-3xl sm:text-4xl tracking-tight font-semibold">{stat.value}</div>
                    <div className="kicker mt-2 !text-[12px]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] sm:aspect-[5/4] overflow-hidden bg-[#EDEDEC] rounded-3xl">
                <OptimizedImage
                  src="/images/canape-de-roast-beef"
                  alt="Servicio de canapés para evento corporativo"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0A]/90 backdrop-blur-sm text-[#F7F7F5] px-5 py-3 flex items-center justify-between rounded-2xl">
                <span className="text-[13px] font-medium">Finger food ejecutivo</span>
                <span className="text-[12px] text-[#C4C4C4]">Maceiras · Santiago</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="kicker">Para equipos que no pueden fallar</span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] leading-tight">
                El evento de la empresa no es un ensayo.
              </h2>
              <p className="text-[#5C5C5C] font-light leading-relaxed">
                Trabajamos con directorios, áreas de marketing y oficinas de representación que necesitan gastronomía a la altura de la marca — y una operación que no genere fricción. Montaje, servicio y retiro se ejecutan con un brief, no con improvisación en sala.
              </p>
              <ul className="space-y-3">
                {[
                  'Brief único: fecha, pax, recinto, restricciones y tono de marca',
                  'Propuesta itemizada lista para orden de compra',
                  'Personal de servicio con protocolo de sala',
                  'Limpieza y desmontaje incluidos',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#0A0A0A]">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.75} />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="formatos" className="py-16 sm:py-24 border-t border-[#0A0A0A]/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
              <span className="kicker">Formatos</span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em]">
                Cuatro operaciones. Un mismo estándar.
              </h2>
            </div>

            <div className="border-t border-[#0A0A0A]/10">
              {CORPORATE_FORMATS.map((format, index) => (
                <motion.div
                  key={format.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 sm:py-10 border-b border-[#0A0A0A]/10 group"
                >
                  <div className="md:col-span-2 text-2xl font-semibold text-[#0A0A0A]/30 group-hover:text-[#0A0A0A] transition-colors">
                    {format.number}
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-snug">
                      {format.title}
                    </h3>
                    <p className="kicker mt-2 !text-[11px]">{format.capacity}</p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-sm text-[#5C5C5C] font-light leading-relaxed">
                      {format.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-white border-y border-[#0A0A0A]/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-2xl mb-12 space-y-3">
              <span className="kicker">Capacidades</span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em]">
                Lo que la empresa necesita, además de la comida.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CORPORATE_CAPABILITIES.map((item, i) => {
                const icons = [Clock, Shield, Building2, FileText];
                const Icon = icons[i] ?? Check;
                return (
                  <div key={item.title} className="bg-[#F7F7F5] p-8 sm:p-10 space-y-4 rounded-3xl border border-[#0A0A0A]/8">
                    <Icon className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
                    <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                    <p className="text-sm text-[#5C5C5C] font-light leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <span className="kicker">Cobertura</span>
              <h2 className="text-3xl font-medium tracking-[-0.03em]">Santiago y el sector oriente.</h2>
              <p className="text-[#5C5C5C] font-light leading-relaxed max-w-md">
                Oficinas, centros de eventos, residencias corporativas y recintos privados en Vitacura, Las Condes, Lo Barnechea, Providencia, La Dehesa y Chicureo. Otras comunas de la RM se evalúan en cotización.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 h-fit">
              {['Vitacura', 'Las Condes', 'Lo Barnechea', 'Providencia', 'La Dehesa', 'Chicureo'].map((comuna) => (
                <div key={comuna} className="bg-[#F7F7F5] px-5 py-4 text-sm tracking-tight rounded-2xl border border-[#0A0A0A]/8">
                  {comuna}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0A0A0A] text-[#F7F7F5] py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <span className="text-[13px] font-medium text-[#C4C4C4]">Siguiente paso</span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] leading-tight">
                Envíe el brief. Reciba una propuesta en menos de 24 horas.
              </h2>
              <p className="text-[#C4C4C4] font-normal text-sm leading-relaxed">
                Fecha, número de invitados, recinto y tipo de formato. Con eso armamos menú, equipo y cotización itemizada.
              </p>
            </div>
            <button
              onClick={() => onOpenQuote('Eventos Corporativos & Ejecutivos')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F7F7F5] text-[#0A0A0A] text-[14.5px] font-semibold tracking-[-0.01em] hover:bg-white transition-colors cursor-pointer rounded-full"
            >
              <span>Cotizar para empresa</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
