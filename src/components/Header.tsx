import React, { useState } from 'react';
import { Church, Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'ministerios', label: 'Ministerios' },
    { id: 'sermones', label: 'Media' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'donar', label: 'Dar' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Church Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('inicio')}
            id="header-logo"
          >
            <Church className="h-6 w-6 text-church-primary group-hover:text-church-secondary transition-colors" />
            <h1 className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-church-primary transition-colors">
              Iglesia Bautista Providencia
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative py-2 font-sans text-[15px] font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-church-primary font-semibold after:absolute after:bottom-0 after:left-1/4 after:right-1/4 after:h-[2px] after:bg-church-secondary'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            
            {/* Search Icon and Visit Button */}
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-150">
              <button 
                className="text-slate-400 hover:text-slate-600 p-1.5 transition-colors cursor-pointer"
                id="header-search-btn"
                onClick={() => alert('Búsqueda: Próximamente disponible en español.')}
              >
                <Search className="h-4 w-4" />
              </button>
              
              <button
                id="header-visit-btn"
                onClick={() => handleNavClick('contacto')}
                className="px-5 py-2.5 bg-church-primary hover:bg-church-primary/90 text-white font-sans text-xs font-bold tracking-wider rounded-md transition-all shadow-sm cursor-pointer uppercase"
              >
                Visítanos
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('contacto')}
              className="px-3 py-1.5 bg-church-primary text-white font-sans text-xs font-bold rounded-md uppercase"
            >
              Visítanos
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-gray-150 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-sans text-base font-medium transition-all ${
                activeTab === item.id
                  ? 'text-church-primary bg-slate-50 border-l-4 border-church-secondary'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
