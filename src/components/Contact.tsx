import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, MessageSquare, Heart, Compass, Send } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState<'oracion' | 'visita' | 'pregunta' | 'jovenes'>('pregunta');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Por favor, completa los campos requeridos (*).');
      return;
    }
    setIsSubmitted(true);
  };

  const getCustomSuccessMessage = () => {
    switch (subject) {
      case 'oracion':
        return '¡Petición de Oración recibida! El Pastor David Mendoza y nuestro ministerio intercesor clamarán fielmente por tu motivo esta misma semana. Dios te bendiga.';
      case 'visita':
        return '¡Solicitud de Visita recibida! Un hermano o líder pastoral se pondrá en contacto contigo en las próximas 48 horas para coordinar un tiempo de compañerismo.';
      case 'jovenes':
        return '¡Mensaje recibido! Los líderes del ministerio de Jóvenes Providencia te escribirán pronto para invitarte a nuestras reuniones de los viernes.';
      default:
        return '¡Mensaje enviado con éxito! Agradecemos tu comunicación. Nos pondremos en contacto contigo lo antes posible para responder tus dudas.';
    }
  };

  return (
    <div className="bg-church-50 text-church-900 font-sans min-h-screen py-12">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-church-primary font-mono text-xs font-semibold tracking-widest uppercase">
          Escríbenos o Visítanos
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-church-950 mt-3 mb-4">
          Contacto y Oración
        </h1>
        <p className="font-serif text-lg text-church-600 max-w-2xl mx-auto italic leading-relaxed">
          "Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá." • Mateo 7:7
        </p>
      </section>

      {/* 2. Main Layout Block */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info and Driving Guide */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-church-200/50 shadow-sm space-y-6">
              <h3 className="font-display text-lg font-bold text-church-950">
                Información de Contacto
              </h3>
              
              <ul className="space-y-5 text-sm sm:text-base">
                <li className="flex items-start space-x-4">
                  <div className="p-2.5 bg-church-primary/10 text-church-primary rounded-xl shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xxs font-extrabold text-church-400 uppercase tracking-wider">Dirección Física</span>
                    <span className="text-church-800 font-medium">11893 Macon Rd, Eads, TN 38028 (FBC Fisherville)</span>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="p-2.5 bg-church-primary/10 text-church-primary rounded-xl shrink-0 mt-0.5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xxs font-extrabold text-church-400 uppercase tracking-wider">Llámanos</span>
                    <span className="text-church-800 font-medium">(901) 555-7788</span>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="p-2.5 bg-church-primary/10 text-church-primary rounded-xl shrink-0 mt-0.5">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xxs font-extrabold text-church-400 uppercase tracking-wider">Correo Electrónico</span>
                    <span className="text-church-800 font-medium">contacto@ibprovidencia.org</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Styled directions card with SVG compass */}
            <div className="bg-church-900 text-church-100 p-6 sm:p-8 rounded-2xl border border-church-800 shadow-lg relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                <Compass className="h-48 w-48 text-church-secondary" />
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <Compass className="h-6 w-6 text-church-secondary" />
                <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-white">Guía de Navegación</h4>
              </div>
              <p className="text-xs sm:text-sm text-church-300 leading-relaxed font-sans">
                Nos reunimos en las instalaciones de <strong>First Baptist Church Fisherville</strong> en Eads, TN. El templo cuenta con un amplio estacionamiento gratuito y acceso especial para personas de movilidad reducida. ¡Si necesitas transporte o indicaciones especiales, escríbenos seleccionando la opción de contacto!
              </p>
            </div>
          </div>

          {/* Right: Interactive Contact & Prayer Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-church-200 rounded-3xl p-6 sm:p-8 shadow-md">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-church-950 mb-1">
                      ¿Cómo podemos servirte?
                    </h3>
                    <p className="text-xs text-church-500">
                      Llena este formulario con tus datos y envíanos tu mensaje o petición de oración. Los campos con (*) son requeridos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-church-600 mb-1">Tu Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Manuel González"
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-church-600 mb-1">Tu Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-church-600 mb-1">Número de Teléfono</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(901) 555-0199"
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-church-600 mb-1">Asunto / Motivo del Mensaje *</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value as any)}
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white font-medium text-church-800"
                      >
                        <option value="pregunta">Pregunta o Duda General</option>
                        <option value="oracion">Petición de Oración</option>
                        <option value="visita">Solicitar Visita Pastoral / Coordinación</option>
                        <option value="jovenes">Información de Jóvenes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-church-600 mb-1">Tu Mensaje o Motivo de Oración *</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escribe aquí con total libertad tu mensaje o motivo de oración. Trataremos tu información con absoluto respeto y confidencialidad."
                      className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-sm font-bold tracking-wider uppercase rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Enviar Mensaje</span>
                  </button>
                </form>
              ) : (
                // Success card on submission
                <div className="py-12 text-center space-y-6">
                  <div className="p-3.5 bg-emerald-100 text-emerald-800 rounded-full w-fit mx-auto shadow-md">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-church-950">
                      ¡Mensaje Recibido!
                    </h3>
                    <p className="text-sm text-church-700 max-w-md mx-auto leading-relaxed">
                      {getCustomSuccessMessage()}
                    </p>
                  </div>

                  <div className="border-t border-church-200 pt-6">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setMessage('');
                      }}
                      className="px-6 py-3 bg-church-950 hover:bg-church-primary text-white font-sans text-xs font-bold tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
                    >
                      Enviar Otro Mensaje
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
