import React, { useState } from 'react';
import { MINISTRIES } from '../data';
import { Ministry } from '../types';
import { Baby, Users, Music, BookOpen, Flower, Calendar, Award, ShieldAlert, ArrowRight, X } from 'lucide-react';

interface MinistriesProps {
  ministries?: Ministry[];
}

export default function Ministries({ ministries = MINISTRIES }: MinistriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModal, setActiveModal] = useState<Ministry | null>(null);

  // Categories mapping
  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: '0 - 11 años', label: 'Niños' },
    { id: '12 - 22 años', label: 'Jóvenes' },
    { id: 'Adultos y Jóvenes', label: 'Alabanza' },
    { id: 'General', label: 'Estudio Bíblico' },
    { id: 'Mujeres 18+ años', label: 'Damas' },
  ];

  const filteredMinistries = selectedCategory === 'todos' 
    ? ministries 
    : ministries.filter(m => m.ageGroup === selectedCategory || m.id === selectedCategory || m.name.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Match icon helper
  const renderIcon = (iconName: string) => {
    const props = { className: "h-6 w-6 text-church-secondary" };
    switch (iconName) {
      case 'Baby': return <Baby {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Music': return <Music {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Flower': return <Flower {...props} />;
      default: return <Users {...props} />;
    }
  };

  return (
    <div className="bg-church-50 text-church-900 font-sans min-h-screen py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-church-primary font-mono text-xs font-semibold tracking-widest uppercase">
          Vida de Iglesia
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-church-950 mt-3 mb-4">
          Nuestros Ministerios
        </h1>
        <p className="font-serif text-lg text-church-600 max-w-2xl mx-auto italic leading-relaxed">
          "Cada uno según el don que ha recibido, minístrelo a los otros..." • 1 Pedro 4:10
        </p>
      </section>

      {/* Interactive Category Filter Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-2.5 rounded-2xl border border-church-200 shadow-sm max-w-4xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4.5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-church-primary text-white border-b-2 border-church-primary/50 shadow-md shadow-church-primary/20'
                  : 'text-church-600 hover:text-church-950 hover:bg-church-100/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid List of Ministries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMinistries.map((ministry) => (
            <div 
              key={ministry.id}
              className="bg-white rounded-2xl border border-church-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-[220px] overflow-hidden bg-church-900">
                  <img 
                    src={ministry.image} 
                    alt={ministry.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-church-950 via-church-950/20 to-transparent"></div>
                  
                  {/* Floating Icon Indicator */}
                  <div className="absolute top-4 right-4 p-3 bg-church-950/80 backdrop-blur-md rounded-xl border border-church-800 shadow">
                    {renderIcon(ministry.iconName)}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2.5 py-1 bg-church-primary/95 text-white text-xxs font-bold tracking-wider uppercase rounded shadow">
                      Categoría: {ministry.ageGroup}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-church-950 group-hover:text-church-primary transition-colors mb-3">
                    {ministry.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-church-600 leading-relaxed line-clamp-3 mb-4">
                    {ministry.description}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-6 pt-0 border-t border-church-100">
                <div className="flex items-center justify-between text-xs py-3 text-church-500 font-mono">
                  <span>Horario:</span>
                  <span className="font-semibold text-church-800">{ministry.schedule}</span>
                </div>
                <button
                  onClick={() => setActiveModal(ministry)}
                  className="w-full py-3 mt-2 bg-church-950 hover:bg-church-primary text-church-50 hover:text-white rounded-xl font-sans text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Detalles e Inscripción</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MINISTRY DETAILS MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-church-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-church-200 w-full max-w-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            {/* Header with image background */}
            <div className="relative h-[240px] bg-church-900 shrink-0">
              <img 
                src={activeModal.image} 
                alt={activeModal.name}
                className="w-full h-full object-cover filter brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-church-950 via-church-950/35 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 bg-church-950/75 hover:bg-church-primary text-white rounded-xl border border-church-800 cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-2.5 py-1 bg-church-secondary text-church-950 text-xxs font-bold tracking-wider uppercase rounded shadow">
                  Grupo: {activeModal.ageGroup}
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-3">
                  {activeModal.name}
                </h2>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm">
              <div>
                <h4 className="font-display font-semibold text-church-950 uppercase tracking-wider text-xs mb-2">
                  Descripción General
                </h4>
                <p className="text-church-700 leading-relaxed text-sm">
                  {activeModal.description}
                </p>
              </div>

              {/* Info Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-church-100/50 p-4 rounded-xl border border-church-200/50 flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-church-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs text-church-400 font-mono uppercase font-semibold">Horario de Reunión:</span>
                    <span className="text-sm font-semibold text-church-800">{activeModal.schedule}</span>
                  </div>
                </div>

                <div className="bg-church-100/50 p-4 rounded-xl border border-church-200/50 flex items-start space-x-3">
                  <Award className="h-5 w-5 text-church-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs text-church-400 font-mono uppercase font-semibold">Coordinador:</span>
                    <span className="text-sm font-semibold text-church-800">{activeModal.leader}</span>
                  </div>
                </div>
              </div>

              {/* Registration Form Simulator */}
              <div className="border-t border-church-200 pt-6">
                <h4 className="font-display font-bold text-church-950 uppercase tracking-wider text-xs mb-4">
                  ¿Deseas Involucrarte o Recibir Información?
                </h4>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(`¡Inscripción simulada con éxito para el ministerio ${activeModal.name}! Un líder se pondrá en contacto pronto.`);
                    setActiveModal(null);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-church-600 mb-1">Nombre Completo</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full px-3.5 py-2 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                        placeholder="Ej. Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-church-600 mb-1">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full px-3.5 py-2 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-church-600 mb-1">Número de Teléfono</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full px-3.5 py-2 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                      placeholder="(901) 555-0100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-church-primary hover:bg-church-primary/90 text-white font-sans text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    Enviar Solicitud de Información
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
