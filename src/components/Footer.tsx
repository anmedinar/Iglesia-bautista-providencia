import React from 'react';
import { Volume2, Globe, Building2, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
          {/* Column 1: Brand / Description (Spans 4 columns on desktop) */}
          <div className="col-span-2 md:col-span-4 space-y-6">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('inicio')} id="footer-logo">
              <span className="font-display text-xl font-bold tracking-wider text-white">IBP</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Desde las vidas son hechas nuevas a través del mensaje transformador de Jesucristo.
            </p>
            {/* Circular outline social icon buttons */}
            <div className="flex space-x-3 pt-2">
              <button 
                onClick={() => handleNavClick('sermones')}
                className="p-2 rounded-full border border-slate-700 hover:border-white hover:text-white transition-all text-slate-400 cursor-pointer"
                title="Sermones / Audio"
              >
                <Volume2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleNavClick('contacto')}
                className="p-2 rounded-full border border-slate-700 hover:border-white hover:text-white transition-all text-slate-400 cursor-pointer"
                title="Sitio Web / Ubicación"
              >
                <Globe className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleNavClick('ministerios')}
                className="p-2 rounded-full border border-slate-700 hover:border-white hover:text-white transition-all text-slate-400 cursor-pointer"
                title="Ubicaciones / Oficinas"
              >
                <Building2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Participa (Spans 2 columns on desktop) */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
              Participa
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleNavClick('contacto')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Soy Nuevo
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('nosotros')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Membresía
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('sermones')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Adoración
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('ministerios')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Grupos
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('ministerios')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Misiones
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Recursos (Spans 2 columns on desktop) */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
              Recursos
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleNavClick('sermones')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Sermones
                </button>
              </li>
              <li>
                <button onClick={() => alert('Blog: ¡Próximamente disponible!')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('eventos')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Eventos
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('donar')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Dar
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Más (Spans 2 columns on desktop) */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
              Más
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => alert('Política de Privacidad de IBP.')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Privacidad
                </button>
              </li>
              <li>
                <button onClick={() => alert('Términos de Servicio de IBP.')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Términos
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contacto')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Contacto
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contacto')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Ubicación
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('administrar')} className="text-church-secondary/90 hover:text-white transition-colors text-left cursor-pointer font-semibold">
                  🔒 Consola Admins
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="mt-16 pt-8 border-t border-slate-900 text-[11px] sm:text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Iglesia Bautista Providencia. Todos los derechos reservados.</p>
          <p className="font-mono hover:text-slate-300 transition-colors">11893 Macon Rd, Eads, TN 38028</p>
        </div>
      </div>
    </footer>
  );
}
