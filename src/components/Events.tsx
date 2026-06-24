import React, { useState } from 'react';
import { EVENTS } from '../data';
import { Event } from '../types';
import { Calendar, Clock, MapPin, Tag, CheckCircle2, Ticket, X, Users, MessageSquare } from 'lucide-react';

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeTab, setActiveTab] = useState<'lista' | 'horario'>('lista');
  const [rsvpEvent, setRsvpEvent] = useState<Event | null>(null);
  const [ticketDetails, setTicketDetails] = useState<{ name: string; email: string; phone: string; guests: number; code: string } | null>(null);

  // Filtered list
  const filteredEvents = selectedCategory === 'todos'
    ? EVENTS
    : EVENTS.filter(e => e.category === selectedCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'culto': return 'bg-church-primary/10 border-church-primary/35 text-church-primary';
      case 'estudio': return 'bg-amber-100 border-amber-300 text-amber-800';
      case 'jovenes': return 'bg-indigo-100 border-indigo-300 text-indigo-800';
      case 'comunidad': return 'bg-emerald-100 border-emerald-300 text-emerald-800';
      case 'especial': return 'bg-rose-100 border-rose-300 text-rose-800';
      default: return 'bg-church-950/5 border-church-200 text-church-800';
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const name = (target.elements.namedItem('name') as HTMLInputElement).value;
    const email = (target.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (target.elements.namedItem('phone') as HTMLInputElement).value;
    const guests = parseInt((target.elements.namedItem('guests') as HTMLSelectElement).value, 10);
    const code = 'IBP-' + Math.floor(100000 + Math.random() * 900000);

    setTicketDetails({ name, email, phone, guests, code });
  };

  return (
    <div className="bg-church-50 text-church-900 font-sans min-h-screen py-12">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-church-primary font-mono text-xs font-semibold tracking-widest uppercase">
          Mantente Informado
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-church-950 mt-3 mb-4">
          Eventos y Convocatorias
        </h1>
        <p className="font-serif text-lg text-church-600 max-w-2xl mx-auto italic leading-relaxed">
          "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía..." • Salmo 133:1
        </p>
      </section>

      {/* 2. Visual Toggle between Upcoming list and Weekly Schedule */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex justify-center">
        <div className="bg-white border border-church-200 rounded-2xl p-1.5 flex shadow-sm w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('lista')}
            className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-sans text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'lista'
                ? 'bg-church-primary text-white shadow shadow-church-primary/20'
                : 'text-church-600 hover:text-church-950 hover:bg-church-100/50'
            }`}
          >
            Próximos Eventos Especiales
          </button>
          <button
            onClick={() => setActiveTab('horario')}
            className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-sans text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'horario'
                ? 'bg-church-primary text-white shadow shadow-church-primary/20'
                : 'text-church-600 hover:text-church-950 hover:bg-church-100/50'
            }`}
          >
            Horario de Cultos Semanales
          </button>
        </div>
      </section>

      {/* LIST OF EVENTS TAB */}
      {activeTab === 'lista' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
          {/* Category Quick Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'culto', label: 'Cultos Adoración' },
              { id: 'estudio', label: 'Estudios Bíblicos' },
              { id: 'jovenes', label: 'Jóvenes' },
              { id: 'comunidad', label: 'Comunidad / Ayuda' },
              { id: 'especial', label: 'Eventos Especiales' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 border rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-church-950 text-white border-church-950'
                    : 'bg-white text-church-600 border-church-200 hover:border-church-400 hover:text-church-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {filteredEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white border border-church-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-all"
              >
                {/* Visual Calendar Date Header */}
                <div className="sm:w-32 shrink-0 flex flex-col items-center justify-center bg-church-100/50 rounded-xl p-4 border border-church-200 text-center h-28 sm:h-32">
                  <span className="font-mono text-xs uppercase font-extrabold tracking-widest text-church-primary">
                    {new Date(event.date).toLocaleDateString('es', { month: 'short' })}
                  </span>
                  <span className="font-display text-3xl sm:text-4xl font-bold text-church-950 mt-1">
                    {new Date(event.date).getDate() + 1}
                  </span>
                  <span className="font-mono text-xxs uppercase font-semibold text-church-500 tracking-wider mt-1">
                    {new Date(event.date).toLocaleDateString('es', { weekday: 'short' })}
                  </span>
                </div>

                {/* Event text details */}
                <div className="flex-1 space-y-3">
                  <span className={`inline-block px-2.5 py-0.5 border text-xxs font-bold tracking-wider uppercase rounded ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                  
                  <h3 className="font-display text-lg sm:text-xl font-bold text-church-950">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-church-600 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-church-500 font-mono pt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-church-secondary shrink-0" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-church-secondary shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </span>
                  </div>
                </div>

                {/* RSVP / Registration Simulator Button */}
                <div className="sm:self-center shrink-0 border-t sm:border-t-0 border-church-100 pt-4 sm:pt-0">
                  <button
                    onClick={() => {
                      setRsvpEvent(event);
                      setTicketDetails(null);
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Inscribirse</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WEEKLY SCHEDULE TAB */}
      {activeTab === 'horario' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white border border-church-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="border-b border-church-100 pb-4 text-center sm:text-left">
              <h2 className="font-display text-2xl font-bold text-church-950">
                Horario de Actividades Periódicas
              </h2>
              <p className="text-sm text-church-500 mt-1">
                La iglesia mantiene reuniones de manera semanal. ¡Siempre hay un lugar para ti!
              </p>
            </div>

            <div className="space-y-6">
              {/* Domingo */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start border-b border-church-100 pb-5">
                <div className="sm:col-span-3">
                  <span className="px-3.5 py-1.5 bg-church-primary text-white text-xs font-bold tracking-widest uppercase rounded-lg inline-block">
                    DOMINGO
                  </span>
                </div>
                <div className="sm:col-span-9 space-y-3">
                  <div>
                    <h4 className="font-display font-bold text-sm text-church-950">9:45 AM — Escuela Dominical</h4>
                    <p className="text-xs text-church-500 mt-0.5">Clases formativas y teológicas para niños, jóvenes y grupos de adultos.</p>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-church-primary">11:00 AM — Culto General de Adoración</h4>
                    <p className="text-xs text-church-500 mt-0.5">Nuestra reunión principal como familia de fe para cantar, orar y escuchar la Palabra.</p>
                  </div>
                </div>
              </div>

              {/* Miércoles */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start border-b border-church-100 pb-5">
                <div className="sm:col-span-3">
                  <span className="px-3.5 py-1.5 bg-church-secondary text-church-950 text-xs font-bold tracking-widest uppercase rounded-lg inline-block">
                    MIÉRCOLES
                  </span>
                </div>
                <div className="sm:col-span-9">
                  <h4 className="font-display font-bold text-sm text-church-950">7:00 PM — Estudio Bíblico y Oración</h4>
                  <p className="text-xs text-church-500 mt-0.5">Profundización de las Escrituras de forma interactiva y tiempo de clamor mutuo.</p>
                </div>
              </div>

              {/* Jueves */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start border-b border-church-100 pb-5">
                <div className="sm:col-span-3">
                  <span className="px-3.5 py-1.5 bg-church-900 text-church-100 text-xs font-bold tracking-widest uppercase rounded-lg inline-block">
                    JUEVES
                  </span>
                </div>
                <div className="sm:col-span-9">
                  <h4 className="font-display font-bold text-sm text-church-950">7:30 PM — Ensayos de Alabanza</h4>
                  <p className="text-xs text-church-500 mt-0.5">Tiempo de preparación espiritual y musical para el coro y el grupo instrumental.</p>
                </div>
              </div>

              {/* Viernes */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start pb-2">
                <div className="sm:col-span-3">
                  <span className="px-3.5 py-1.5 bg-church-primary/20 text-church-primary text-xs font-bold tracking-widest uppercase rounded-lg inline-block">
                    VIERNES
                  </span>
                </div>
                <div className="sm:col-span-9">
                  <h4 className="font-display font-bold text-sm text-church-950">7:00 PM — Reunión de Jóvenes</h4>
                  <p className="text-xs text-church-500 mt-0.5">Dinámicas, música y prédicas prácticas enfocadas en las realidades de la juventud cristiana.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RSVP POPUP MODAL */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-church-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-church-200 w-full max-w-lg overflow-hidden relative p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => {
                setRsvpEvent(null);
                setTicketDetails(null);
              }}
              className="absolute top-4 right-4 p-2 text-church-400 hover:text-church-950 hover:bg-church-100 rounded-xl cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {!ticketDetails ? (
              // STEP 1: Registration Form
              <div className="space-y-6">
                <div>
                  <span className="text-church-primary font-mono text-xxs font-bold uppercase tracking-widest">Inscripción Evento</span>
                  <h3 className="font-display text-xl font-bold text-church-950 mt-1">
                    {rsvpEvent.title}
                  </h3>
                  <p className="text-xs text-church-500 font-mono mt-1 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-church-secondary" />
                    {rsvpEvent.date} • {rsvpEvent.time}
                  </p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-church-600 mb-1">Nombre Completo</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Ej. Carolina Mendoza"
                      className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-church-600 mb-1">Correo Electrónico</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="ejemplo@correo.com"
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-church-600 mb-1">Teléfono</label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="(901) 555-4321"
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-church-600 mb-1">¿Cuántas personas te acompañan?</label>
                    <select
                      name="guests"
                      className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white font-medium"
                    >
                      <option value="0">Solo yo (0 invitados)</option>
                      <option value="1">1 persona adicional</option>
                      <option value="2">2 personas adicionales</option>
                      <option value="3">3 personas adicionales</option>
                      <option value="4">4+ personas adicionales</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    Confirmar Inscripción Gratuitamente
                  </button>
                </form>
              </div>
            ) : (
              // STEP 2: Beautiful Confirmed Ticket Printout
              <div className="space-y-6 text-center">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full w-fit mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-church-950">
                    ¡Inscripción Confirmada!
                  </h3>
                  <p className="text-xs text-church-500 mt-1">
                    Tu pase de ingreso ha sido generado con éxito. Hemos enviado una copia digital a tu correo.
                  </p>
                </div>

                {/* Printable Ticket Box */}
                <div className="border-2 border-dashed border-church-200 rounded-2xl p-5 bg-church-100/30 text-left relative overflow-hidden">
                  <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-white border border-church-200 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-white border border-church-200 -translate-y-1/2"></div>
                  
                  <div className="border-b border-church-200 pb-3 mb-3 flex justify-between items-center text-xs">
                    <span className="font-display font-bold text-church-950">IGLESIA BAUTISTA PROVIDENCIA</span>
                    <span className="font-mono text-church-primary font-bold">{ticketDetails.code}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-base font-bold text-church-900">{rsvpEvent.title}</h4>
                    <div className="text-[11px] font-mono text-church-600 space-y-1">
                      <p><strong>Fecha:</strong> {rsvpEvent.date} ({rsvpEvent.time})</p>
                      <p><strong>Inscrito:</strong> {ticketDetails.name}</p>
                      <p><strong>Contacto:</strong> {ticketDetails.email}</p>
                      <p><strong>Invitados:</strong> +{ticketDetails.guests} acompañantes</p>
                    </div>
                  </div>

                  <div className="border-t border-church-200 mt-4 pt-3 flex items-center justify-between">
                    <span className="text-[10px] text-church-400 font-serif italic">Presenta este código al ingresar</span>
                    <Ticket className="h-5 w-5 text-church-secondary" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setRsvpEvent(null);
                      setTicketDetails(null);
                    }}
                    className="flex-1 py-3 bg-church-950 text-white font-sans text-xs font-bold tracking-wider uppercase rounded-xl cursor-pointer"
                  >
                    Cerrar Ventana
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-3 border border-church-200 text-church-700 hover:bg-church-100 font-sans text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Imprimir
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
