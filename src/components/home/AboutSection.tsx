'use client';

import { motion } from 'framer-motion';
import { Target, Clock, ShieldCheck, CheckCircle2, Shield } from 'lucide-react';

const bullets = [
  {
    icon: Target,
    title: 'Experiencia Comprobada',
    description: 'Años liderando rutas complejas.',
  },
  {
    icon: Clock,
    title: 'Atención Personalizada',
    description: 'Seguimiento 24/7 para cada embarque.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad Garantizada',
    description: 'Protocolos rigurosos para el cuidado de tu carga.',
  },
];

const certifications = [
  { name: 'ISO 9001', icon: CheckCircle2 },
  { name: 'Certificación OEA', icon: Shield },
  { name: 'Agente IATA', icon: CheckCircle2 },
  { name: 'Socio BASC', icon: Shield },
];

export default function AboutSection() {
  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-primary leading-tight">
              Más que logística, <br className="hidden md:block" />somos tu socio estratégico
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed text-balance">
              Con años de experiencia en el mercado chileno e internacional, en <span className="font-semibold text-brand-primary">Confidence Line Logistics</span> nos especializamos en simplificar la complejidad del comercio exterior. Nos mueve la eficiencia, la seguridad y el compromiso inquebrantable con el éxito de tu negocio.
            </p>
            
            <div className="space-y-6 pt-4">
              {bullets.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                        <Icon className="w-6 h-6 text-brand-primary" strokeWidth={2} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Image Right */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-full min-h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" 
              alt="Puerto logístico al amanecer con grúas y contenedores" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay to give it a slightly corporate feel */}
            <div className="absolute inset-0 bg-[#001f3f]/10 mix-blend-multiply rounded-2xl"></div>
          </motion.div>
        </div>

        {/* Certifications Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-10 border-t border-slate-200"
        >
          <div className="flex flex-col items-center justify-center space-y-8">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest text-center">
              Nuestros estándares internacionales
            </p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20">
              {certifications.map((cert, idx) => {
                const Icon = cert.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 group cursor-pointer grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <Icon className="w-8 h-8 text-[#001f3f]" strokeWidth={1.5} />
                    <span className="font-bold text-xl text-[#001f3f]">
                      {cert.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
