import { Ship, Plane, Truck, FileText, Warehouse, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Transporte Marítimo",
    description: "Carga FCL/LCL, rutas globales y gestión de contenedores.",
    icon: Ship,
    href: "#",
  },
  {
    title: "Transporte Aéreo",
    description: "Envíos urgentes, carga consolidada y manejo de mercancías sensibles.",
    icon: Plane,
    href: "#",
  },
  {
    title: "Transporte Terrestre",
    description: "Distribución nacional e internacional con seguimiento en tiempo real.",
    icon: Truck,
    href: "#",
  },
  {
    title: "Agenciamiento Aduanero",
    description: "Asesoría experta en normativas y liberación rápida de mercancías.",
    icon: FileText,
    href: "#",
  },
  {
    title: "Almacenaje y Distribución",
    description: "Gestión de inventarios y logística de última milla.",
    icon: Warehouse,
    href: "#",
  }
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="w-full py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
            Soluciones Logísticas Integrales
          </h2>
          <p className="text-lg text-slate-600">
            Ofrecemos una gama completa de servicios diseñados para optimizar tu cadena de suministro, garantizando seguridad, rapidez y eficiencia en cada etapa del proceso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="w-16 h-16 bg-brand-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 transition-colors">
                  <Icon className="w-8 h-8 text-brand-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href={service.href} 
                  className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-[#00152b] transition-colors group/link mt-auto w-fit"
                >
                  Más información
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
