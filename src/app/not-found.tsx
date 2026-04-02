
import Link from 'next/link';
import { PackageX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 w-full">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-200">
        <PackageX className="w-12 h-12 text-slate-400" strokeWidth={1.5} />
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-brand-primary mb-4 tracking-tight">Error 404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6 font-sans">
        Carga no encontrada
      </h2>
      <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed text-balance">
        Lo sentimos, la ruta logística que intentas rastrear no ha sido programada o el manifiesto se ha traspapelado.
      </p>
      <Link 
        href="/"
        className="px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-[#00152b] transition-all duration-300 shadow-md hover:-translate-y-1"
      >
        Volver a la Terminal Principal
      </Link>
    </div>
  );
}
