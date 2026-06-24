import React, { useState } from 'react';
import { Play, MapPin, Clock, Phone, ExternalLink, Mail, CheckCircle2, Heart } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showSermonModal, setShowSermonModal] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-slate-800 font-sans antialiased">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[75vh] flex items-center justify-start overflow-hidden bg-slate-950" id="hero-banner">
        {/* Backdrop image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1600&h=900" 
            alt="Skyline at Sunset"
            className="w-full h-full object-cover opacity-45 filter brightness-90 contrast-105 scale-100 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlay to match image */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left text-white py-20 lg:py-32 w-full">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Donde las vidas son<br />
              transformadas
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-slate-200/90 font-light mb-8 leading-relaxed max-w-xl">
              Acompáñanos cada domingo a las 9:30 AM y 11:00 AM para adorar juntos en comunidad.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-visit-button"
                onClick={() => handleNavClick('contacto')}
                className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-sans text-xs sm:text-sm font-bold tracking-wider rounded-md transition-all shadow-md cursor-pointer uppercase"
              >
                Visítanos
              </button>
              
              <button
                id="hero-live-button"
                onClick={() => setShowLiveModal(true)}
                className="px-5 py-3 bg-transparent hover:bg-white/10 text-white font-sans text-xs sm:text-sm font-bold tracking-wider rounded-md border border-white transition-all flex items-center space-x-2 cursor-pointer uppercase"
              >
                <div className="p-1 bg-white/20 rounded-full">
                  <Play className="h-3 w-3 fill-current text-white" />
                </div>
                <span>Ver en Vivo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Small floating action/card button in bottom right of hero */}
        <div className="absolute bottom-6 right-6 z-10 hidden sm:block">
          <button 
            onClick={() => handleNavClick('donar')}
            className="p-3.5 bg-church-secondary hover:bg-church-secondary/90 text-slate-900 rounded-lg shadow-lg hover:scale-105 transition-all cursor-pointer"
            title="Dar Ofrenda"
          >
            <Heart className="h-5 w-5 fill-slate-900" />
          </button>
        </div>
      </section>

      {/* 2. NUEVO AQUÍ SECTION */}
      <section className="py-16 bg-slate-50 border-b border-gray-100" id="welcome-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Navy Blue Text Box */}
            <div className="md:col-span-6 bg-church-primary rounded-lg p-8 sm:p-12 text-white flex flex-col justify-between shadow-md">
              <div className="space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  ¿Nuevo aquí?
                </h2>
                <p className="font-sans text-sm sm:text-base text-church-secondary italic font-light tracking-wide">
                  Hemos reservado un lugar para ti.
                </p>
                <p className="font-sans text-slate-200 text-xs sm:text-sm leading-relaxed pt-2">
                  Entendemos que visitar una iglesia por primera vez puede ser intimidante. Queremos que te sientas como en casa desde el momento en que llegas.
                </p>
              </div>
              <div className="pt-8">
                <button
                  id="welcome-saber-mas"
                  onClick={() => handleNavClick('nosotros')}
                  className="font-sans text-xs sm:text-sm font-bold tracking-wider text-white hover:text-church-secondary uppercase flex items-center space-x-1 group transition-colors cursor-pointer"
                >
                  <span>Saber Más</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Welcoming Image */}
            <div className="md:col-span-6 rounded-lg overflow-hidden shadow-md relative min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800&h=500" 
                alt="Comunidad reuniéndose"
                className="w-full h-full object-cover filter contrast-100 saturate-100 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENCUENTRA COMUNIDAD SECTION */}
      <section className="py-20 bg-white" id="community-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Encuentra comunidad en Providencia
          </h2>
          {/* Subtle gold line bar underneath */}
          <div className="w-16 h-1 bg-church-secondary mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Domingos Card */}
            <div 
              id="com-card-domingos"
              onClick={() => handleNavClick('sermones')}
              className="group relative h-[250px] sm:h-[300px] rounded-lg overflow-hidden cursor-pointer shadow-md"
            >
              <img 
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=600&h=450" 
                alt="Domingos en la Iglesia"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/50 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-lg sm:text-xl font-bold text-white tracking-widest uppercase border-b border-white/0 group-hover:border-white/80 pb-1 transition-all">
                  DOMINGOS
                </span>
              </div>
            </div>

            {/* Entre Semana Card */}
            <div 
              id="com-card-entre-semana"
              onClick={() => handleNavClick('ministerios')}
              className="group relative h-[250px] sm:h-[300px] rounded-lg overflow-hidden cursor-pointer shadow-md"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=450" 
                alt="Estudios entre semana"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/50 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-lg sm:text-xl font-bold text-white tracking-widest uppercase border-b border-white/0 group-hover:border-white/80 pb-1 transition-all">
                  ENTRE SEMANA
                </span>
              </div>
            </div>

            {/* Eventos Card */}
            <div 
              id="com-card-eventos"
              onClick={() => handleNavClick('eventos')}
              className="group relative h-[250px] sm:h-[300px] rounded-lg overflow-hidden cursor-pointer shadow-md"
            >
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600&h=450" 
                alt="Eventos y compañerismo"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/50 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-lg sm:text-xl font-bold text-white tracking-widest uppercase border-b border-white/0 group-hover:border-white/80 pb-1 transition-all">
                  EVENTOS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ÚLTIMO MENSAJE SECTION */}
      <section className="py-16 bg-slate-50 border-t border-b border-gray-100" id="latest-message-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 rounded-lg overflow-hidden shadow-lg border border-gray-150">
            {/* Left block: Deep Slate Navy info */}
            <div className="md:col-span-6 bg-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-church-secondary font-sans text-xs font-bold tracking-widest uppercase block">
                  ÚLTIMO MENSAJE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                  La esperanza que trasciende
                </h3>
                <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
                  ¿Te perdiste el servicio del domingo pasado? Escucha el mensaje reciente de la Palabra de Dios mientras adoramos juntos.
                </p>
              </div>
              
              <div className="pt-8">
                <button
                  id="sermon-listen-now"
                  onClick={() => handleNavClick('sermones')}
                  className="px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-slate-900 font-sans text-xs font-bold tracking-wider uppercase rounded transition-all cursor-pointer border border-white/20 hover:border-white"
                >
                  Escuchar Ahora
                </button>
              </div>
            </div>

            {/* Right block: Open Bible graphic with play overlay */}
            <div 
              className="md:col-span-6 relative bg-slate-950 min-h-[300px] cursor-pointer group overflow-hidden"
              onClick={() => setShowSermonModal(true)}
              id="latest-message-media-panel"
            >
              <img 
                src="https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?auto=format&fit=crop&q=80&w=800&h=500" 
                alt="Open Bible on stand with candles"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Glowing decorative altar/candles look overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              
              {/* Play Button Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-5 bg-white/95 rounded-full shadow-xl text-slate-900 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6 fill-current text-slate-900 ml-0.5" />
                </div>
              </div>
              
              {/* Floating bible text label in the image screen */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-sm p-3 rounded text-center text-white text-[10px] sm:text-xs font-serif font-light tracking-wide border border-white/10 opacity-80">
                "Lámpara es a mis pies tu palabra, y lumbrera a mi camino." • Salmo 119:105
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NUESTROS MINISTERIOS SECTION */}
      <section className="py-20 bg-white" id="ministries-landing-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-gray-100 pb-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Nuestros Ministerios
              </h2>
              <p className="font-sans text-sm text-slate-500 mt-1.5">
                Hay un lugar para cada miembro de tu familia en Providencia.
              </p>
            </div>
            <div>
              <button
                id="landing-ver-ministerios"
                onClick={() => handleNavClick('ministerios')}
                className="font-sans text-xs font-bold tracking-wider text-church-primary hover:text-church-secondary uppercase flex items-center space-x-1 group transition-colors cursor-pointer"
              >
                <span>Ver Todos los Ministerios</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ministry 1: Adultos */}
            <div 
              className="bg-white rounded-lg overflow-hidden border border-gray-150 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleNavClick('ministerios')}
            >
              <div>
                <div className="h-[160px] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=400&h=250" 
                    alt="Ministerio de Adultos"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-church-primary transition-colors mb-2">
                    Adultos
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Crecimiento espiritual y discipulado para todas las etapas de la vida adulta.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2">
                <span className="font-sans text-xxs font-bold tracking-wider text-church-primary uppercase group-hover:text-church-secondary transition-colors">
                  Leer Más →
                </span>
              </div>
            </div>

            {/* Ministry 2: Jóvenes */}
            <div 
              className="bg-white rounded-lg overflow-hidden border border-gray-150 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleNavClick('ministerios')}
            >
              <div>
                <div className="h-[160px] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400&h=250" 
                    alt="Jóvenes Providencia"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-church-primary transition-colors mb-2">
                    Jóvenes
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Un espacio vibrante para que los estudiantes descubran su fe y propósito.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2">
                <span className="font-sans text-xxs font-bold tracking-wider text-church-primary uppercase group-hover:text-church-secondary transition-colors">
                  Leer Más →
                </span>
              </div>
            </div>

            {/* Ministry 3: Niños */}
            <div 
              className="bg-white rounded-lg overflow-hidden border border-gray-150 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleNavClick('ministerios')}
            >
              <div>
                <div className="h-[160px] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400&h=250" 
                    alt="Niños Semillitas"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-church-primary transition-colors mb-2">
                    Niños
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Ambientes seguros y divertidos donde los más pequeños aprenden sobre Jesús.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2">
                <span className="font-sans text-xxs font-bold tracking-wider text-church-primary uppercase group-hover:text-church-secondary transition-colors">
                  Leer Más →
                </span>
              </div>
            </div>

            {/* Ministry 4: Misiones */}
            <div 
              className="bg-white rounded-lg overflow-hidden border border-gray-150 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleNavClick('ministerios')}
            >
              <div>
                <div className="h-[160px] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=400&h=250" 
                    alt="Misiones"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-church-primary transition-colors mb-2">
                    Misiones
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Llevando el mensaje del evangelio a nuestra ciudad y hasta lo último de la tierra.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2">
                <span className="font-sans text-xxs font-bold tracking-wider text-church-primary uppercase group-hover:text-church-secondary transition-colors">
                  Leer Más →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NUESTRA UBICACIÓN SECTION */}
      <section className="py-16 bg-slate-50 border-t border-b border-gray-100" id="location-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Location Info Card */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-church-secondary font-sans text-xs font-bold tracking-widest uppercase block">
                  NUESTRA UBICACIÓN
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2 mb-3">
                  Nos reunimos en FBC Fisherville
                </h3>
                <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Estamos agradecidos de compartir las instalaciones de First Baptist Church Fisherville. Ven y acompáñanos este domingo.
                </p>
              </div>

              {/* Info Matrix */}
              <div className="space-y-4 pt-2">
                {/* Row 1: Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-slate-200 text-slate-700 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-xxs font-bold tracking-wider text-slate-400 uppercase font-sans">DIRECCIÓN</span>
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">11893 Macon Rd, Eads, TN 38028</span>
                  </div>
                </div>

                {/* Row 2: Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-slate-200 text-slate-700 rounded-lg shrink-0 mt-0.5">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-xxs font-bold tracking-wider text-slate-400 uppercase font-sans">HORARIO DE SERVICIO</span>
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">Domingos: 9:30 AM &amp; 11:00 AM</span>
                  </div>
                </div>

                {/* Row 3: Contact */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-slate-200 text-slate-700 rounded-lg shrink-0 mt-0.5">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-xxs font-bold tracking-wider text-slate-400 uppercase font-sans">CONTACTO</span>
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">(901) 883-4253</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  id="google-maps-link"
                  href="https://maps.google.com/?q=11893+Macon+Rd,+Eads,+TN+38028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-xs font-bold tracking-wider rounded-md uppercase transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Obtener Direcciones</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Styled Map Graphic */}
            <div className="lg:col-span-7 bg-white rounded-lg shadow-md border border-gray-150 overflow-hidden relative min-h-[350px] flex items-center justify-center">
              {/* Beautiful, stylized vector-like map graphic recreating the mockup's light blue styled map */}
              <div className="absolute inset-0 bg-[#add5e6]/20 flex items-center justify-center select-none overflow-hidden" id="custom-vector-map">
                {/* SVG representing streets and river contours */}
                <svg className="absolute inset-0 w-full h-full opacity-65" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Rivers / Lakes contours */}
                  <path d="M 0 350 Q 150 320 250 340 T 500 310 T 800 330" stroke="#c0e1eb" strokeWidth="22" fill="none" strokeLinecap="round" />
                  <path d="M 450 320 Q 550 280 620 290 T 800 240" stroke="#c0e1eb" strokeWidth="14" fill="none" strokeLinecap="round" />
                  
                  {/* Route Grid overlays */}
                  {/* Yellow highway route Macon Rd */}
                  <path d="M 0 200 C 300 200, 500 210, 800 240" stroke="#fed85c" strokeWidth="6" fill="none" />
                  {/* Secondary route lines */}
                  <path d="M 400 0 C 400 150, 410 250, 420 400" stroke="#ffffff" strokeWidth="4" fill="none" />
                  <path d="M 150 0 C 220 120, 310 240, 420 400" stroke="#ffffff" strokeWidth="3" fill="none" />
                  <path d="M 400 205 C 500 160, 680 80, 800 40" stroke="#fed85c" strokeWidth="5" fill="none" />
                  <path d="M 0 80 C 180 120, 310 160, 800 180" stroke="#ffffff" strokeWidth="2" fill="none" />
                  <path d="M 600 0 C 580 180, 520 280, 450 400" stroke="#ffffff" strokeWidth="2.5" fill="none" />

                  {/* Red/Amber route highlights to map FBC Fisherville */}
                  <circle cx="410" cy="205" r="30" fill="#fed85c" fillOpacity="0.2" />
                  <circle cx="410" cy="205" r="12" fill="#e53e3e" fillOpacity="0.15" className="animate-ping" />
                  <circle cx="410" cy="205" r="5" fill="#e53e3e" />
                </svg>

                {/* Styled Map Location Label Details */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-white/95 backdrop-blur-sm border border-gray-150 px-4 py-3 rounded-lg shadow-lg text-center max-w-[240px] pointer-events-none relative">
                    <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">FBC FISHERVILLE</span>
                    <span className="block text-xs text-slate-800 font-bold mt-1 leading-snug">11893 Macon Rd, Eads, TN 38028</span>
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-church-primary text-white text-[9px] font-bold rounded">UBICACIÓN</span>
                    {/* Little pin caret indicator under the floating card */}
                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-150"></div>
                  </div>
                </div>

                {/* Left/Bottom HUD Panel like in the mockup */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-2.5 rounded shadow-md border border-gray-200 pointer-events-none max-w-[200px]">
                  <div className="w-5 h-1 bg-slate-400 rounded-full mb-1.5"></div>
                  <span className="text-[10px] sm:text-xs font-sans font-medium text-slate-600">Encuéntranos aquí cada domingo.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LIVE TRANSMISSION MODAL */}
      {showLiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-xl overflow-hidden relative">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto text-red-600 animate-pulse">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">Transmisión en Vivo</h3>
                <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Nuestros servicios dominicales se transmiten en vivo todos los domingos a las 11:00 AM.
                </p>
              </div>

              {/* Status Alert Banner */}
              <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-church-primary shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 space-y-1">
                  <span className="font-bold block">Horario Próximo:</span>
                  <span>Este domingo a las 11:00 AM (Central Time). Te invitamos a unirte de manera presencial en nuestro campus de Eads o sintonizarnos en vivo aquí.</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowLiveModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans text-xs font-bold tracking-wider uppercase rounded cursor-pointer transition-colors"
                >
                  Cerrar
                </button>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 py-2.5 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-xs font-bold tracking-wider uppercase rounded cursor-pointer transition-colors text-center block"
                >
                  Ir a YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. SERMON PLAYBACK MODAL */}
      {showSermonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden relative">
            {/* Header frame */}
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white border-b border-slate-800">
              <span className="font-sans text-xxs font-bold tracking-wider text-church-secondary uppercase">Reproductor del Último Sermón</span>
              <button 
                onClick={() => setShowSermonModal(false)}
                className="text-slate-400 hover:text-white font-sans text-xs cursor-pointer"
              >
                Cerrar ✕
              </button>
            </div>
            {/* Video stand-in simulator */}
            <div className="relative bg-slate-950 aspect-video flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?auto=format&fit=crop&q=80&w=800&h=450" 
                alt="Bible reading"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 text-center space-y-4 p-6 bg-slate-950/80 rounded border border-white/10 max-w-sm">
                <p className="font-display font-bold text-white text-sm sm:text-base">"La esperanza que trasciende"</p>
                <p className="font-sans text-xs text-slate-400">Pastor David Mendoza • Romanos 8:18-25</p>
                
                {/* Audio bar simulation */}
                <div className="w-full bg-slate-800 h-1.5 rounded overflow-hidden">
                  <div className="bg-church-secondary w-[45%] h-full animate-pulse"></div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                  <span>18:12</span>
                  <span>41:00</span>
                </div>
              </div>
            </div>
            {/* Summary Block */}
            <div className="p-6 space-y-4">
              <h4 className="font-display font-bold text-slate-900 text-sm uppercase">Acerca de este sermón:</h4>
              <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed">
                Este mensaje expone la esperanza gloriosa que poseemos en Cristo Jesús en medio de las tribulaciones presentes, recordándonos que los sufrimientos del tiempo presente no son comparables con la gloria venidera que en nosotros ha de manifestarse.
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setShowSermonModal(false);
                    handleNavClick('sermones');
                  }}
                  className="px-5 py-2.5 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-xs font-bold tracking-wider uppercase rounded transition-colors"
                >
                  Ver Notas de Estudio Completas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
