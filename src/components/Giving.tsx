import React, { useState } from 'react';
import { Heart, CreditCard, ShieldCheck, CheckCircle2, Ticket, Printer, RefreshCw } from 'lucide-react';

interface GivingProps {
  givingSettings?: {
    titulo: string;
    subtitulo: string;
    verso: string;
    motivation: string;
    diezmoDesc: string;
    misionesDesc: string;
    construccionDesc: string;
  };
}

export default function Giving({ givingSettings }: GivingProps) {
  const [selectedFund, setSelectedFund] = useState<'diezmo' | 'misiones' | 'construccion'>('diezmo');
  const [amount, setAmount] = useState<number>(35);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentStep, setPaymentStep] = useState<'formulario' | 'procesando' | 'completado'>('formulario');
  
  // Donor details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [receiptCode, setReceiptCode] = useState('');

  const displayTitle = givingSettings?.titulo || "Diezmos y Ofrendas";
  const displaySubtitle = givingSettings?.subtitulo || "Adorando con Nuestras Ofrendas";
  const displayVerso = givingSettings?.verso || '"Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." • 2 Corintios 9:7';
  const displayMotivation = givingSettings?.motivation || 'Creemos que el dar ofrendas y diezmos es un acto sagrado de adoración y obediencia que expresa gratitud por la providencia soberana de Dios. Sostiene el ministerio pastoral local, cuida de los necesitados y expande el Evangelio de Jesucristo globalmente.';
  const displayDiezmoDesc = givingSettings?.diezmoDesc || 'Sostiene el presupuesto operacional, sueldos ministeriales y actividades de la congregación.';
  const displayMisionesDesc = givingSettings?.misionesDesc || 'Destinado directamente a sostener obreros y misioneros en el campo y plantar nuevas iglesias.';
  const displayConstruccionDesc = givingSettings?.construccionDesc || 'Destinado exclusivamente al mantenimiento del templo físico y proyectos de ampliación.';

  const preSets = [15, 35, 75, 150, 300];

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    } else {
      setAmount(0);
    }
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert('Por favor selecciona o ingresa un monto válido para ofrendar.');
      return;
    }

    setPaymentStep('procesando');

    // Simulate payment gateway delay
    setTimeout(() => {
      const code = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
      setReceiptCode(code);
      setPaymentStep('completado');
    }, 1800);
  };

  const handleReset = () => {
    setPaymentStep('formulario');
    setDonorName('');
    setDonorEmail('');
    setDonorPhone('');
    setAmount(35);
    setCustomAmount('');
  };

  const getFundLabel = (fund: string) => {
    switch (fund) {
      case 'diezmo': return 'Diezmo General de la Iglesia';
      case 'misiones': return 'Misiones Mundiales y Plantación';
      case 'construccion': return 'Fondo de Mantenimiento y Edificio';
      default: return 'Diezmo General';
    }
  };

  return (
    <div className="bg-church-50 text-church-900 font-sans min-h-screen py-12">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
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

      {/* 2. Primary Portal Frame */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Biblical Motivation & Security */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-church-200/50 shadow-sm space-y-4">
              <h3 className="font-display text-base font-bold text-church-950 uppercase tracking-wider">
                La Mayordomía Bíblica
              </h3>
              <p className="text-xs sm:text-sm text-church-600 leading-relaxed">
                {displayMotivation}
              </p>
              <div className="pt-3 border-t border-church-100 flex items-center gap-3.5 text-xs text-church-700">
                <ShieldCheck className="h-6 w-6 text-church-primary shrink-0" />
                <span>Transacciones encriptadas de forma segura (SSL de 256 bits).</span>
              </div>
            </div>

            {/* Fund Selection Explanation info box */}
            <div className="bg-church-100/50 p-6 rounded-2xl border border-church-200/60">
              <h4 className="font-display font-semibold text-xs text-church-900 tracking-wider uppercase mb-2">Destino de los Fondos</h4>
              <ul className="space-y-2.5 text-xs text-church-600 list-disc list-inside">
                <li><strong>Diezmo General:</strong> {displayDiezmoDesc}</li>
                <li><strong>Misiones:</strong> {displayMisionesDesc}</li>
                <li><strong>Fondo Construcción:</strong> {displayConstruccionDesc}</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Giving Interactive Module */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-church-200 rounded-3xl p-6 sm:p-8 shadow-md">
              
              {/* STEP A: FORMULARIO */}
              {paymentStep === 'formulario' && (
                <form onSubmit={handleSubmitDonation} className="space-y-6">
                  {/* 1. Select Fund Designation */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-church-900 uppercase tracking-wider">
                      1. Selecciona el Fondo Destinatario
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedFund('diezmo')}
                        className={`px-3 py-3 border text-xs font-bold rounded-xl text-center transition-all cursor-pointer ${
                          selectedFund === 'diezmo'
                            ? 'bg-church-primary/10 border-church-primary text-church-primary ring-2 ring-church-primary/10'
                            : 'bg-white border-church-200 hover:border-church-400 text-church-700'
                        }`}
                      >
                        Diezmo General
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedFund('misiones')}
                        className={`px-3 py-3 border text-xs font-bold rounded-xl text-center transition-all cursor-pointer ${
                          selectedFund === 'misiones'
                            ? 'bg-church-primary/10 border-church-primary text-church-primary ring-2 ring-church-primary/10'
                            : 'bg-white border-church-200 hover:border-church-400 text-church-700'
                        }`}
                      >
                        Misiones
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedFund('construccion')}
                        className={`px-3 py-3 border text-xs font-bold rounded-xl text-center transition-all cursor-pointer ${
                          selectedFund === 'construccion'
                            ? 'bg-church-primary/10 border-church-primary text-church-primary ring-2 ring-church-primary/10'
                            : 'bg-white border-church-200 hover:border-church-400 text-church-700'
                        }`}
                      >
                        Edificio
                      </button>
                    </div>
                  </div>

                  {/* 2. Amount Picker */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-church-900 uppercase tracking-wider">
                      2. Elige el Monto a Ofrendar ($ USD)
                    </label>
                    
                    <div className="flex flex-wrap gap-2">
                      {preSets.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleAmountSelect(val)}
                          className={`px-4.5 py-3 border text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                            amount === val && customAmount === ''
                              ? 'bg-church-950 border-church-950 text-white'
                              : 'bg-white border-church-200 hover:border-church-400 text-church-700'
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-3 text-church-400 font-bold text-sm">$</span>
                      <input
                        type="number"
                        min="1"
                        step="any"
                        placeholder="Ingresa otro monto personalizado"
                        value={customAmount}
                        onChange={handleCustomChange}
                        className="w-full pl-8 pr-4 py-3 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white font-semibold"
                      />
                    </div>
                  </div>

                  {/* 3. Personal Information */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-church-900 uppercase tracking-wider">
                      3. Datos Personales
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Nombre Completo"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Correo Electrónico"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                      />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Teléfono (Opcional)"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
                    />
                  </div>

                  {/* 4. Payment Details */}
                  <div className="space-y-3 border-t border-church-100 pt-5">
                    <label className="block text-xs font-semibold text-church-900 uppercase tracking-wider">
                      4. Información de Pago
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-3 text-church-400 h-5 w-5" />
                      <input
                        type="text"
                        required
                        placeholder="Número de Tarjeta (16 dígitos)"
                        pattern="[0-9\s]{13,19}"
                        className="w-full pl-11 pr-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white text-center font-mono"
                      />
                      <input
                        type="text"
                        required
                        placeholder="CVV"
                        maxLength={4}
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white text-center font-mono"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Cód. Postal"
                        className="w-full px-4 py-2.5 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white text-center font-mono"
                      />
                    </div>
                  </div>

                  {/* Total indicator and submission button */}
                  <div className="bg-church-100/40 p-4 rounded-xl border border-church-200/50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-church-700">Total a Ofrendar:</span>
                    <span className="text-xl font-display font-extrabold text-church-primary">${amount.toFixed(2)} USD</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-sm font-bold tracking-wider uppercase rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Heart className="h-4 w-4 fill-current text-church-200" />
                    <span>Ofrendar ${amount.toFixed(2)} Seguro</span>
                  </button>
                </form>
              )}

              {/* STEP B: PROCESANDO */}
              {paymentStep === 'procesando' && (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                  <RefreshCw className="h-10 w-10 text-church-primary animate-spin" />
                  <h3 className="font-display text-lg font-bold text-church-950">
                    Procesando Transacción de Forma Segura
                  </h3>
                  <p className="text-xs text-church-500 max-w-sm">
                    Por favor no recargues ni cierres esta pestaña. Nos estamos comunicando de manera encriptada con el servidor bancario...
                  </p>
                </div>
              )}

              {/* STEP C: COMPLETADO (Receipt generated) */}
              {paymentStep === 'completado' && (
                <div className="space-y-6 text-center">
                  <div className="p-3.5 bg-emerald-100 text-emerald-800 rounded-full w-fit mx-auto shadow-md">
                    <CheckCircle2 className="h-10 w-10 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-church-950">
                      ¡Ofrenda Recibida con Éxito!
                    </h3>
                    <p className="text-xs text-church-500 max-w-sm mx-auto mt-1">
                      Agradecemos profundamente tu generosidad. Tu aporte es fundamental para seguir expandiendo el Reino de Dios en Memphis.
                    </p>
                  </div>

                  {/* PDF Receipt Frame */}
                  <div className="border border-church-200 rounded-2xl p-6 bg-church-100/20 text-left relative overflow-hidden font-mono text-xs text-church-700 space-y-4">
                    {/* Visual notches */}
                    <div className="absolute top-1/2 -left-3 h-5 w-5 rounded-full bg-white border border-church-200 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-3 h-5 w-5 rounded-full bg-white border border-church-200 -translate-y-1/2"></div>

                    <div className="border-b border-church-200 pb-3 flex justify-between items-center text-[10px] font-bold text-church-950">
                      <span>COMPROBANTE DE DONACIÓN</span>
                      <span>{receiptCode}</span>
                    </div>

                    <div className="space-y-2">
                      <p className="font-display font-semibold text-xs text-church-900">IGLESIA BAUTISTA PROVIDENCIA</p>
                      <p><strong>Ubicación:</strong> 11893 Macon Rd, Eads, TN 38028</p>
                      <p><strong>Fecha/Hora:</strong> {new Date().toLocaleString('es')}</p>
                      <p><strong>Donante:</strong> {donorName}</p>
                      <p><strong>Correo:</strong> {donorEmail}</p>
                      <p><strong>Monto Recibido:</strong> ${amount.toFixed(2)} USD</p>
                      <p><strong>Destinado a:</strong> {getFundLabel(selectedFund)}</p>
                    </div>

                    <div className="border-t border-church-200/60 pt-3 text-[10px] text-church-500 italic text-center">
                      "Cada uno dé como propuso en su corazón... Dios ama al dador alegre" • 2 Co 9:7
                      <br />
                      <span className="font-semibold text-[9px] mt-1 block">Esta donación es deducible de impuestos bajo la sección 501(c)(3)</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 bg-church-primary text-white font-sans text-xs font-bold tracking-wider uppercase rounded-xl cursor-pointer"
                    >
                      Hacer otra ofrenda
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-3 border border-church-200 hover:bg-church-100 text-church-800 font-sans text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Imprimir Recibo</span>
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
