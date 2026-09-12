import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/cateringData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="opiniones" className="py-24 bg-[#F7F7F5] relative border-t border-[#0A0A0A]/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-12 sm:mb-16 space-y-3">
          <span className="kicker">Opiniones</span>
          <h2 className="text-3xl sm:text-4xl text-[#0A0A0A] font-medium tracking-[-0.03em]">
            Lo que dicen quienes nos contrataron
          </h2>
          <p className="text-xs text-[#5C5C5C] md:hidden flex items-center gap-1">
            <span>Desliza para ver más</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 md:gap-5 scrollbar-none">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="bg-white p-7 sm:p-8 border border-[#0A0A0A]/10 flex flex-col justify-between space-y-6 shrink-0 w-[85vw] max-w-[340px] md:w-auto md:max-w-none snap-center rounded-3xl"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#0A0A0A]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#0A0A0A] leading-relaxed font-light">
                  “{testimonial.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/8 flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-[#0A0A0A]">{testimonial.client}</div>
                  <div className="text-[#5C5C5C] text-[11px]">{testimonial.role}</div>
                </div>
                <div className="flex items-center gap-1 text-[#5C5C5C] border border-[#0A0A0A]/10 px-2.5 py-1 text-[11px] rounded-full">
                  <MapPin className="w-3 h-3" />
                  <span>{testimonial.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
