import Link from "next/link";
import { Ship, Mail, Phone, MapPin, Globe, MessageCircle, AtSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Ship size={32} className="text-white" />
              <span className="font-bold text-xl text-white tracking-tight">LogiTrust Global</span>
            </Link>
            <p className="text-sm mt-2">
              Soluciones logísticas mundiales seguras, eficientes y confiables para tu negocio.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="hover:text-white transition-colors"><Globe size={20} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><MessageCircle size={20} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><AtSign size={20} /></Link>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Servicios</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="#servicios" className="hover:text-white transition-colors">Transporte Marítimo</Link></li>
              <li><Link href="#servicios" className="hover:text-white transition-colors">Transporte Aéreo</Link></li>
              <li><Link href="#servicios" className="hover:text-white transition-colors">Transporte Terrestre</Link></li>
              <li><Link href="#servicios" className="hover:text-white transition-colors">Agenciamiento Aduanero</Link></li>
              <li><Link href="#servicios" className="hover:text-white transition-colors">Almacenaje y Distribución</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contacto</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-brand-secondary" />
                <span>Av. Logística 1234, Ciudad Empresarial, Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-secondary" />
                <span>+56 9 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-secondary" />
                <span>info@logitrustglobal.com</span>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legales</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} LogiTrust Global. Todos los derechos reservados.</p>
          <p>Website by Antigravity</p>
        </div>
      </div>
    </footer>
  );
}
