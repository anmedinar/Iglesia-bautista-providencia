import React, { useState } from 'react';
import { DOCTRINES, LEADERS } from '../data';
import { DoctrinalPoint, Leader } from '../types';
import { Mail, BookOpen, Quote, ChevronDown, ChevronUp, Star } from 'lucide-react';

interface AboutProps {
  aboutSettings?: {
    mision: string;
    vision: string;
    titulo: string;
    subtitulo: string;
    verso: string;
  };
  doctrines?: DoctrinalPoint[];
  leaders?: Leader[];
}

export default function About({ aboutSettings, doctrines = DOCTRINES, leaders = LEADERS }: AboutProps) {
  const [expandedDoctrine, setExpandedDoctrine] = useState<string | null>(null);

  const displayTitle = aboutSettings?.titulo || "Nuestra Identidad y Fe";
  const displaySubtitle = aboutSettings?.subtitulo || "Quiénes Somos";
  const displayVerso = aboutSettings?.verso || '"Un solo Señor, una sola fe, un solo bautismo, un solo Dios y Padre de todos..." • Efesios 4:5-6';
  const displayMision = aboutSettings?.mision || 'Exaltar la gloria de Dios mediante la proclamación fiel de Jesucristo, la edificación doctrinal y el discipulado bíblico de la iglesia local, y la obediencia gozosa al mandato de hacer discípulos en Memphis y hasta lo último de la tierra.';
  const displayVision = aboutSettings?.vision || 'Ver una congregación hispana vibrante, madura y saturada del Evangelio, que refleje el amor de Cristo, sostenga con firmeza la suficiencia de la Escritura en una sociedad secularizada, y actúe como un faro de esperanza y renovación familiar en nuestra ciudad.';

  const toggleDoctrine = (id: string) => {
    if (expandedDoctrine === id) {
      setExpandedDoctrine(null);
    } else {
      setExpandedDoctrine(id);
    }
  };

  return (
    <div className="bg-church-50 text-church-900 font-sans min-h-screen py-12" id="about-page">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-church-primary font-mono text-xs font-semibold tracking-widest uppercase">
          {displaySubtitle}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-church-950 mt-3 mb-4">
          {displayTitle}
        </h1>
        <p className="font-serif text-lg text-church-600 max-w-2xl mx-auto italic leading-relaxed">
          {displayVerso}
        </p>
      </section>

      {/* 2. Misión y Visión Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Misión Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-church-200/50 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-church-primary"></div>
            <div className="p-3 bg-church-primary/10 text-church-primary rounded-xl w-fit mb-6">
              <Quote className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-church-950 mb-4">
              Nuestra Misión
            </h2>
            <p className="text-church-700 text-sm sm:text-base leading-relaxed">
              {displayMision}
            </p>
          </div>

          {/* Visión Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-church-200/50 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-church-secondary"></div>
            <div className="p-3 bg-church-secondary/10 text-church-secondary rounded-xl w-fit mb-6">
              <Star className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-church-950 mb-4">
              Nuestra Visión
            </h2>
            <p className="text-church-700 text-sm sm:text-base leading-relaxed">
              {displayVision}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Doctrinal Statement Accordions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <span className="text-church-primary font-mono text-xs font-semibold tracking-widest uppercase">
            Lo que confesamos
          </span>
          <h2 className="font-display text-3xl font-bold text-church-950 mt-2 mb-4">
            Declaración Doctrinal
          </h2>
          <p className="text-sm text-church-600 max-w-xl mx-auto">
            Sostenemos las doctrinas históricas de la fe cristiana bautista reformada. Presiona cada pilar para explorar la base de nuestra fe.
          </p>
        </div>

        <div className="space-y-4">
          {doctrines.map((doc) => {
            const isExpanded = expandedDoctrine === doc.id;
            return (
              <div 
                key={doc.id}
                className="bg-white rounded-xl border border-church-200/60 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleDoctrine(doc.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-church-100/30 transition-colors focus:outline-none"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-church-950/5 text-church-primary rounded-lg">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <span className="font-display text-base sm:text-lg font-bold text-church-950">
                      {doc.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-church-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-church-500" />
                  )}
                </button>

                {/* Animated collapse section */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-church-100 bg-church-100/10">
                    <p className="text-church-700 text-sm sm:text-base leading-relaxed mb-4">
                      {doc.description}
                    </p>
                    <div className="p-3.5 bg-church-200/40 rounded-xl border border-church-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-church-primary uppercase tracking-wider">
                        Fundamento Bíblico:
                      </span>
                      <span className="font-sans text-xs sm:text-sm text-church-800 font-semibold italic text-right">
                        {doc.scriptureRef}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Leadership Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-16">
          <span className="text-church-primary font-mono text-xs font-semibold tracking-widest uppercase">
            Pastores y Servidores
          </span>
          <h2 className="font-display text-3xl font-bold text-church-950 mt-2 mb-4">
            Nuestro Liderazgo
          </h2>
          <p className="text-sm text-church-600 max-w-xl mx-auto">
            Damos gracias a Dios por los siervos llamados a apacentar, guiar y administrar las labores espirituales en nuestra comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div 
              key={leader.id}
              className="bg-white rounded-2xl border border-church-200/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-[320px] overflow-hidden bg-church-900">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-church-950 via-church-950/20 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-church-50">
                    <span className="px-2.5 py-1 bg-church-secondary text-church-950 text-xxs font-bold tracking-wider uppercase rounded-md shadow">
                      {leader.role}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-church-950 group-hover:text-church-primary transition-colors mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-church-600 leading-relaxed font-sans">
                    {leader.bio}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <a 
                  href={`mailto:${leader.email}`}
                  className="w-full py-3 bg-church-100 hover:bg-church-primary hover:text-white rounded-xl border border-church-200/80 hover:border-church-primary text-church-800 font-sans text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contactar</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
