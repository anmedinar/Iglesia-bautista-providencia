import React, { useState } from 'react';
import { 
  Lock, Shield, Settings, Save, RotateCcw, Plus, Trash2, Edit3, 
  Check, FileText, Users, Play, HelpCircle, Heart, Image as ImageIcon,
  ChevronRight, LogOut, Info, AlertTriangle
} from 'lucide-react';
import { DoctrinalPoint, Leader, Ministry, Sermon } from '../types';

interface AdminPanelProps {
  doctrines: DoctrinalPoint[];
  saveDoctrines: (data: DoctrinalPoint[]) => void;
  leaders: Leader[];
  saveLeaders: (data: Leader[]) => void;
  ministries: Ministry[];
  saveMinistries: (data: Ministry[]) => void;
  sermons: Sermon[];
  saveSermons: (data: Sermon[]) => void;
  aboutSettings: {
    mision: string;
    vision: string;
    titulo: string;
    subtitulo: string;
    verso: string;
  };
  saveAboutSettings: (data: any) => void;
  givingSettings: {
    titulo: string;
    subtitulo: string;
    verso: string;
    motivation: string;
    diezmoDesc: string;
    misionesDesc: string;
    construccionDesc: string;
  };
  saveGivingSettings: (data: any) => void;
  resetAllToDefault: () => void;
}

type AdminSection = 'nosotros' | 'ministerios' | 'media' | 'dar';

export default function AdminPanel({
  doctrines, saveDoctrines,
  leaders, saveLeaders,
  ministries, saveMinistries,
  sermons, saveSermons,
  aboutSettings, saveAboutSettings,
  givingSettings, saveGivingSettings,
  resetAllToDefault
}: AdminPanelProps) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ibp_admin_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Navigation state
  const [activeSection, setActiveSection] = useState<AdminSection>('nosotros');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Editing items state
  const [selectedDoctrineId, setSelectedDoctrineId] = useState<string | null>(null);
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [selectedMinistryId, setSelectedMinistryId] = useState<string | null>(null);
  const [selectedSermonId, setSelectedSermonId] = useState<string | null>(null);

  // Temporary edit states
  const [doctrineForm, setDoctrineForm] = useState<Partial<DoctrinalPoint>>({});
  const [leaderForm, setLeaderForm] = useState<Partial<Leader>>({});
  const [ministryForm, setMinistryForm] = useState<Partial<Ministry>>({});
  const [sermonForm, setSermonForm] = useState<Partial<Sermon>>({});

  // General settings edit states
  const [tempAboutSettings, setTempAboutSettings] = useState(aboutSettings);
  const [tempGivingSettings, setTempGivingSettings] = useState(givingSettings);

  const triggerNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'providencia' || password === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('ibp_admin_authenticated', 'true');
      setLoginError('');
      triggerNotification('Sesión administrativa iniciada correctamente');
    } else {
      setLoginError('Contraseña incorrecta. Pista: providencia');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ibp_admin_authenticated');
    setPassword('');
  };

  // Doctrines actions
  const selectDoctrine = (doc: DoctrinalPoint) => {
    setSelectedDoctrineId(doc.id);
    setDoctrineForm(doc);
  };

  const startNewDoctrine = () => {
    setSelectedDoctrineId('NEW');
    setDoctrineForm({
      id: 'doc-' + Date.now(),
      title: '',
      description: '',
      scriptureRef: ''
    });
  };

  const handleSaveDoctrine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctrineForm.title || !doctrineForm.description) {
      triggerNotification('El título y la descripción son requeridos', 'error');
      return;
    }

    let updated: DoctrinalPoint[];
    if (selectedDoctrineId === 'NEW') {
      updated = [...doctrines, doctrineForm as DoctrinalPoint];
    } else {
      updated = doctrines.map(d => d.id === selectedDoctrineId ? { ...d, ...doctrineForm } as DoctrinalPoint : d);
    }

    saveDoctrines(updated);
    setSelectedDoctrineId(null);
    setDoctrineForm({});
    triggerNotification('Pilar doctrinal guardado correctamente');
  };

  const handleDeleteDoctrine = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este pilar doctrinal?')) {
      const updated = doctrines.filter(d => d.id !== id);
      saveDoctrines(updated);
      if (selectedDoctrineId === id) {
        setSelectedDoctrineId(null);
        setDoctrineForm({});
      }
      triggerNotification('Pilar doctrinal eliminado');
    }
  };

  // Leaders actions
  const selectLeader = (ldr: Leader) => {
    setSelectedLeaderId(ldr.id);
    setLeaderForm(ldr);
  };

  const startNewLeader = () => {
    setSelectedLeaderId('NEW');
    setLeaderForm({
      id: 'ldr-' + Date.now(),
      name: '',
      role: '',
      bio: '',
      email: '',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400&h=500'
    });
  };

  const handleSaveLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderForm.name || !leaderForm.role) {
      triggerNotification('El nombre y el cargo son requeridos', 'error');
      return;
    }

    let updated: Leader[];
    if (selectedLeaderId === 'NEW') {
      updated = [...leaders, leaderForm as Leader];
    } else {
      updated = leaders.map(l => l.id === selectedLeaderId ? { ...l, ...leaderForm } as Leader : l);
    }

    saveLeaders(updated);
    setSelectedLeaderId(null);
    setLeaderForm({});
    triggerNotification('Servidor/Pastor guardado correctamente');
  };

  const handleDeleteLeader = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este líder de la lista?')) {
      const updated = leaders.filter(l => l.id !== id);
      saveLeaders(updated);
      if (selectedLeaderId === id) {
        setSelectedLeaderId(null);
        setLeaderForm({});
      }
      triggerNotification('Líder eliminado');
    }
  };

  // Ministries actions
  const selectMinistry = (min: Ministry) => {
    setSelectedMinistryId(min.id);
    setMinistryForm(min);
  };

  const startNewMinistry = () => {
    setSelectedMinistryId('NEW');
    setMinistryForm({
      id: 'min-' + Date.now(),
      name: '',
      description: '',
      ageGroup: 'General',
      leader: '',
      schedule: '',
      iconName: 'Users',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800&h=500'
    });
  };

  const handleSaveMinistry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ministryForm.name || !ministryForm.description) {
      triggerNotification('El nombre y la descripción son requeridos', 'error');
      return;
    }

    let updated: Ministry[];
    if (selectedMinistryId === 'NEW') {
      updated = [...ministries, ministryForm as Ministry];
    } else {
      updated = ministries.map(m => m.id === selectedMinistryId ? { ...m, ...ministryForm } as Ministry : m);
    }

    saveMinistries(updated);
    setSelectedMinistryId(null);
    setMinistryForm({});
    triggerNotification('Ministerio guardado correctamente');
  };

  const handleDeleteMinistry = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este ministerio?')) {
      const updated = ministries.filter(m => m.id !== id);
      saveMinistries(updated);
      if (selectedMinistryId === id) {
        setSelectedMinistryId(null);
        setMinistryForm({});
      }
      triggerNotification('Ministerio eliminado');
    }
  };

  // Sermons actions
  const selectSermon = (srm: Sermon) => {
    setSelectedSermonId(srm.id);
    setSermonForm(srm);
  };

  const startNewSermon = () => {
    setSelectedSermonId('NEW');
    setSermonForm({
      id: 'srm-' + Date.now(),
      title: '',
      speaker: 'Pastor David Mendoza',
      date: new Date().toISOString().split('T')[0],
      series: 'Romanos: Viviendo por la Gracia',
      book: 'Romanos',
      scripture: '',
      duration: '40:00',
      summary: '',
      notes: ''
    });
  };

  const handleSaveSermon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sermonForm.title || !sermonForm.scripture) {
      triggerNotification('El título y la referencia bíblica son obligatorios', 'error');
      return;
    }

    let updated: Sermon[];
    if (selectedSermonId === 'NEW') {
      updated = [sermonForm as Sermon, ...sermons]; // Prepend new sermons
    } else {
      updated = sermons.map(s => s.id === selectedSermonId ? { ...s, ...sermonForm } as Sermon : s);
    }

    saveSermons(updated);
    setSelectedSermonId(null);
    setSermonForm({});
    triggerNotification('Sermón guardado correctamente');
  };

  const handleDeleteSermon = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este sermón de la base de datos?')) {
      const updated = sermons.filter(s => s.id !== id);
      saveSermons(updated);
      if (selectedSermonId === id) {
        setSelectedSermonId(null);
        setSermonForm({});
      }
      triggerNotification('Sermón eliminado');
    }
  };

  // Save General Page Settings
  const handleSaveGeneralAbout = (e: React.FormEvent) => {
    e.preventDefault();
    saveAboutSettings(tempAboutSettings);
    triggerNotification('Textos generales de "Nosotros" actualizados correctamente');
  };

  const handleSaveGeneralGiving = (e: React.FormEvent) => {
    e.preventDefault();
    saveGivingSettings(tempGivingSettings);
    triggerNotification('Información y fondos de "Dar" actualizados correctamente');
  };

  const handleFullReset = () => {
    if (confirm('¿Estás seguro de que deseas restablecer TODOS los datos del sitio? Esto revertirá todos tus cambios a los textos de fábrica y las imágenes por defecto.')) {
      resetAllToDefault();
      // Reload states
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  // Render Lock Screen if not authorized
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-church-50 px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl border border-church-200 shadow-xl overflow-hidden">
          <div className="bg-church-primary text-white p-8 text-center relative">
            <div className="absolute top-4 right-4 bg-church-secondary text-church-950 p-1.5 rounded-lg">
              <Shield className="h-5 w-5" />
            </div>
            <div className="p-4 bg-white/10 rounded-full w-fit mx-auto mb-4">
              <Lock className="h-8 w-8 text-church-secondary" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Acceso Administrativo</h1>
            <p className="font-sans text-xs text-church-200/90 mt-1">
              Área restringida para colaboradores, pastores y administradores de la Iglesia Providencia.
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xxs font-extrabold text-church-600 uppercase tracking-wider">
                Contraseña de Acceso
              </label>
              <input
                type="password"
                required
                placeholder="Ingresa la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none bg-church-50 text-sm font-semibold"
              />
              <p className="text-[10px] text-church-400 font-sans italic mt-1">
                Pista: utiliza la contraseña <strong className="text-church-600 font-semibold">providencia</strong> o <strong className="text-church-600 font-semibold">1234</strong> para acceder a los simuladores de edición.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Ingresar al Panel</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-church-50 text-church-900 font-sans min-h-screen py-8" id="admin-dashboard">
      {/* Dynamic Status Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-xl shadow-2xl border flex items-center space-x-3 text-xs sm:text-sm font-bold transition-all duration-300 transform translate-y-0 ${
          notification.type === 'success' 
            ? 'bg-church-950 text-white border-church-primary' 
            : 'bg-red-900 text-white border-red-500'
        }`}>
          <Check className="h-4.5 w-4.5 text-church-secondary" />
          <span>{notification.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Workspace Upper Header */}
        <header className="bg-white rounded-2xl border border-church-200 p-5 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5 text-center sm:text-left">
            <div className="p-3 bg-church-primary/10 text-church-primary rounded-xl shrink-0">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <h1 className="font-display text-lg sm:text-xl font-extrabold text-church-950">Consola del Colaborador</h1>
                <span className="px-2 py-0.5 bg-church-secondary text-church-950 text-[9px] font-extrabold rounded-md uppercase tracking-wider">Admins / Staff</span>
              </div>
              <p className="text-xxs sm:text-xs text-church-500 font-sans mt-0.5">
                Modifica y actualiza en tiempo real los pilares, servidores, ministerios, sermones y fondos de la Iglesia Bautista Providencia.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleFullReset}
              className="px-3.5 py-2 border border-red-200 hover:bg-red-50 text-red-700 font-sans text-xxs font-bold tracking-wider uppercase rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Restablecer contenido a los valores de fábrica"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restablecer Todo</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-church-900 hover:bg-church-950 text-white font-sans text-xxs font-bold tracking-wider uppercase rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {/* Dense split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Menu Sidebar - Styled navigation buttons */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="bg-white rounded-2xl border border-church-200 p-4 shadow-sm">
              <span className="block text-[10px] font-extrabold text-church-400 uppercase tracking-wider mb-3">Secciones del Sitio</span>
              <nav className="space-y-1.5">
                {[
                  { id: 'nosotros', label: 'Nosotros', desc: 'Identidad, fe y servidores', icon: Users },
                  { id: 'ministerios', label: 'Ministerios', desc: 'Actividades y edades', icon: HelpCircle },
                  { id: 'media', label: 'Media (Sermones)', desc: 'Audios, notas y bosquejos', icon: Play },
                  { id: 'dar', label: 'Dar (Ofrendas)', desc: 'Motivaciones y cuentas', icon: Heart }
                ].map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setActiveSection(sec.id as AdminSection);
                        setSelectedDoctrineId(null);
                        setSelectedLeaderId(null);
                        setSelectedMinistryId(null);
                        setSelectedSermonId(null);
                      }}
                      className={`w-full p-3.5 rounded-xl text-left flex items-center space-x-3.5 transition-all cursor-pointer border ${
                        isActive 
                          ? 'bg-church-primary text-white border-church-primary shadow' 
                          : 'bg-white text-church-700 border-transparent hover:bg-church-50 hover:text-church-950'
                      }`}
                    >
                      <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-church-secondary' : 'text-church-400'}`} />
                      <div className="leading-tight">
                        <span className="block text-xs font-bold">{sec.label}</span>
                        <span className={`text-[9px] block ${isActive ? 'text-church-200' : 'text-church-400'}`}>{sec.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Informative tips widget */}
              <div className="mt-6 p-3.5 bg-church-50 border border-church-200/50 rounded-xl space-y-2">
                <div className="flex items-center space-x-1.5 text-church-800">
                  <Info className="h-3.5 w-3.5 text-church-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Persistencia Local</span>
                </div>
                <p className="text-[10px] text-church-500 leading-relaxed font-sans">
                  Tus modificaciones se guardan de forma segura en tu navegador actual. Al presionar "Guardar", se propagarán de inmediato en todas las pantallas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Area - Workspaces */}
          <div className="lg:col-span-9 flex flex-col justify-stretch">
            <div className="bg-white rounded-2xl border border-church-200 shadow-sm p-6 flex-grow">

              {/* 1. NOSOTROS WORKSPACE */}
              {activeSection === 'nosotros' && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h2 className="font-display text-base font-extrabold text-church-950 uppercase tracking-wide border-b border-church-100 pb-2">
                      Ajustes Generales de Identidad ("Nosotros")
                    </h2>
                    <form onSubmit={handleSaveGeneralAbout} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 md:col-span-1">
                        <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Título de Página</label>
                        <input
                          type="text"
                          value={tempAboutSettings.titulo}
                          onChange={(e) => setTempAboutSettings({ ...tempAboutSettings, titulo: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-semibold focus:outline-none focus:ring-1 focus:ring-church-primary"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-1">
                        <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Subtítulo de la Página</label>
                        <input
                          type="text"
                          value={tempAboutSettings.subtitulo}
                          onChange={(e) => setTempAboutSettings({ ...tempAboutSettings, subtitulo: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-semibold focus:outline-none focus:ring-1 focus:ring-church-primary"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Versículo o Cita Superior</label>
                        <input
                          type="text"
                          value={tempAboutSettings.verso}
                          onChange={(e) => setTempAboutSettings({ ...tempAboutSettings, verso: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-semibold focus:outline-none focus:ring-1 focus:ring-church-primary"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Misión de la Iglesia</label>
                        <textarea
                          rows={3}
                          value={tempAboutSettings.mision}
                          onChange={(e) => setTempAboutSettings({ ...tempAboutSettings, mision: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-medium focus:outline-none focus:ring-1 focus:ring-church-primary"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Visión de la Iglesia</label>
                        <textarea
                          rows={3}
                          value={tempAboutSettings.vision}
                          onChange={(e) => setTempAboutSettings({ ...tempAboutSettings, vision: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-medium focus:outline-none focus:ring-1 focus:ring-church-primary"
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-xs font-bold uppercase rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm"
                        >
                          <Save className="h-3.5 w-3.5" />
                          <span>Guardar Textos de Nosotros</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Leaders & Doctrines Lists (Dual split container for higher density) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-church-150 pt-6">
                    
                    {/* Column A: Pillars of Faith (Doctrines) */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xs font-extrabold text-church-950 uppercase tracking-wide">
                          Pilares Doctrinales
                        </h3>
                        <button
                          onClick={startNewDoctrine}
                          className="px-2 py-1 bg-church-50 hover:bg-church-100 text-church-primary rounded border border-church-200 font-sans text-xxs font-bold uppercase flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Añadir</span>
                        </button>
                      </div>

                      {/* Dense list of Doctrines */}
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {doctrines.map((doc) => (
                          <div 
                            key={doc.id} 
                            onClick={() => selectDoctrine(doc)}
                            className={`p-3 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              selectedDoctrineId === doc.id 
                                ? 'bg-church-primary/5 border-church-primary ring-1 ring-church-primary/15' 
                                : 'bg-white hover:bg-church-50 border-church-200'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <span className="font-bold text-church-950 block truncate">{doc.title}</span>
                              <span className="font-serif text-[10px] text-church-500 block truncate italic">{doc.scriptureRef}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={() => selectDoctrine(doc)}
                                className="p-1 text-church-500 hover:text-church-900 rounded"
                                title="Editar"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteDoctrine(doc.id)}
                                className="p-1 text-red-500 hover:text-red-700 rounded"
                                title="Eliminar"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Inline doctrine form when active */}
                      {selectedDoctrineId && (
                        <form onSubmit={handleSaveDoctrine} className="p-4 bg-church-100/40 rounded-xl border border-church-200 space-y-3">
                          <span className="block text-[10px] font-bold text-church-800 uppercase tracking-wider">
                            {selectedDoctrineId === 'NEW' ? 'Nuevo Pilar' : 'Modificar Pilar'}
                          </span>
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              required
                              placeholder="Título del Pilar Doctrinal"
                              value={doctrineForm.title || ''}
                              onChange={(e) => setDoctrineForm({ ...doctrineForm, title: e.target.value })}
                              className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                            />
                            <input
                              type="text"
                              required
                              placeholder="Base o Fundamento Bíblico (e.g. Hechos 2:42)"
                              value={doctrineForm.scriptureRef || ''}
                              onChange={(e) => setDoctrineForm({ ...doctrineForm, scriptureRef: e.target.value })}
                              className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                            />
                            <textarea
                              rows={3}
                              required
                              placeholder="Escribe la explicación teológica resumida..."
                              value={doctrineForm.description || ''}
                              onChange={(e) => setDoctrineForm({ ...doctrineForm, description: e.target.value })}
                              className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                            />
                          </div>
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => { setSelectedDoctrineId(null); setDoctrineForm({}); }}
                              className="px-3 py-1.5 bg-white border border-church-200 text-church-600 rounded font-sans text-xxs font-bold uppercase cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 bg-church-primary text-white rounded font-sans text-xxs font-bold uppercase flex items-center space-x-1 cursor-pointer"
                            >
                              <Save className="h-3 w-3" />
                              <span>Guardar</span>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    {/* Column B: Servants & Leadership */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xs font-extrabold text-church-950 uppercase tracking-wide">
                          Pastores y Servidores
                        </h3>
                        <button
                          onClick={startNewLeader}
                          className="px-2 py-1 bg-church-50 hover:bg-church-100 text-church-primary rounded border border-church-200 font-sans text-xxs font-bold uppercase flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Añadir</span>
                        </button>
                      </div>

                      {/* Dense list of Leaders */}
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {leaders.map((ldr) => (
                          <div 
                            key={ldr.id} 
                            onClick={() => selectLeader(ldr)}
                            className={`p-3 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              selectedLeaderId === ldr.id 
                                ? 'bg-church-primary/5 border-church-primary ring-1 ring-church-primary/15' 
                                : 'bg-white hover:bg-church-50 border-church-200'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <span className="font-bold text-church-950 block truncate">{ldr.name}</span>
                              <span className="text-[10px] text-church-500 block truncate">{ldr.role}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={() => selectLeader(ldr)}
                                className="p-1 text-church-500 hover:text-church-900 rounded"
                                title="Editar"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteLeader(ldr.id)}
                                className="p-1 text-red-500 hover:text-red-700 rounded"
                                title="Eliminar"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Inline leader form when active */}
                      {selectedLeaderId && (
                        <form onSubmit={handleSaveLeader} className="p-4 bg-church-100/40 rounded-xl border border-church-200 space-y-3">
                          <span className="block text-[10px] font-bold text-church-800 uppercase tracking-wider">
                            {selectedLeaderId === 'NEW' ? 'Nuevo Servidor' : 'Modificar Servidor'}
                          </span>
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              required
                              placeholder="Nombre Completo"
                              value={leaderForm.name || ''}
                              onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                              className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                            />
                            <input
                              type="text"
                              required
                              placeholder="Cargo o Rol (e.g. Pastor de Jóvenes)"
                              value={leaderForm.role || ''}
                              onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                              className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                            />
                            <input
                              type="email"
                              placeholder="Correo Electrónico de Contacto"
                              value={leaderForm.email || ''}
                              onChange={(e) => setLeaderForm({ ...leaderForm, email: e.target.value })}
                              className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Enlace URL a la Foto de Perfil"
                              value={leaderForm.image || ''}
                              onChange={(e) => setLeaderForm({ ...leaderForm, image: e.target.value })}
                              className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none text-[10px] font-mono"
                            />
                            <textarea
                              rows={3}
                              placeholder="Escribe una breve biografía sobre su trayectoria y familia..."
                              value={leaderForm.bio || ''}
                              onChange={(e) => setLeaderForm({ ...leaderForm, bio: e.target.value })}
                              className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                            />
                          </div>
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => { setSelectedLeaderId(null); setLeaderForm({}); }}
                              className="px-3 py-1.5 bg-white border border-church-200 text-church-600 rounded font-sans text-xxs font-bold uppercase cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 bg-church-primary text-white rounded font-sans text-xxs font-bold uppercase flex items-center space-x-1 cursor-pointer"
                            >
                              <Save className="h-3 w-3" />
                              <span>Guardar</span>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. MINISTERIOS WORKSPACE */}
              {activeSection === 'ministerios' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-church-100 pb-3">
                    <div>
                      <h2 className="font-display text-base font-extrabold text-church-950 uppercase tracking-wide">
                        Gestor de Ministerios
                      </h2>
                      <p className="text-xxs text-church-500 font-sans mt-0.5">
                        Agrega o actualiza las actividades semanales de los niños, jóvenes, damas y grupos de oración.
                      </p>
                    </div>
                    <button
                      onClick={startNewMinistry}
                      className="px-3 py-2 bg-church-primary hover:bg-church-primary/95 text-white rounded-lg font-sans text-xxs font-bold uppercase flex items-center space-x-1 cursor-pointer shadow-sm"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Nuevo Ministerio</span>
                    </button>
                  </div>

                  {/* Split horizontal manager */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* List (Left Col) */}
                    <div className="md:col-span-5 space-y-2">
                      <span className="block text-[10px] font-extrabold text-church-400 uppercase tracking-wider mb-1">Ministerios Existentes</span>
                      <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                        {ministries.map((min) => (
                          <div
                            key={min.id}
                            onClick={() => selectMinistry(min)}
                            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              selectedMinistryId === min.id
                                ? 'bg-church-primary/5 border-church-primary ring-1 ring-church-primary/10'
                                : 'bg-white hover:bg-church-50 border-church-200 shadow-sm'
                            }`}
                          >
                            <div className="truncate pr-3">
                              <span className="font-bold text-church-950 block truncate">{min.name}</span>
                              <span className="text-[10px] text-church-400 block truncate">{min.schedule} • {min.ageGroup}</span>
                            </div>
                            <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => selectMinistry(min)}
                                className="p-1.5 text-church-500 hover:text-church-900 rounded"
                                title="Editar"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteMinistry(min.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 rounded"
                                title="Eliminar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form (Right Col) */}
                    <div className="md:col-span-7">
                      {selectedMinistryId ? (
                        <form onSubmit={handleSaveMinistry} className="bg-church-50 p-5 rounded-2xl border border-church-200/80 space-y-4">
                          <div className="flex items-center justify-between border-b border-church-100 pb-2">
                            <span className="text-xs font-extrabold text-church-950 uppercase tracking-wider flex items-center space-x-1.5">
                              <span className="w-1.5 h-3 bg-church-secondary rounded-full"></span>
                              <span>{selectedMinistryId === 'NEW' ? 'Nuevo Ministerio' : 'Editar Datos de Ministerio'}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => { setSelectedMinistryId(null); setMinistryForm({}); }}
                              className="text-church-400 hover:text-church-700 text-xs uppercase font-sans font-bold text-[9px]"
                            >
                              Cerrar ×
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="space-y-1 sm:col-span-2">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Nombre del Ministerio</label>
                              <input
                                type="text"
                                required
                                value={ministryForm.name || ''}
                                onChange={(e) => setMinistryForm({ ...ministryForm, name: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Grupo de Edad / Público</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. 0 - 11 años o General"
                                value={ministryForm.ageGroup || ''}
                                onChange={(e) => setMinistryForm({ ...ministryForm, ageGroup: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Líder o Coordinador</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. María Mendoza"
                                value={ministryForm.leader || ''}
                                onChange={(e) => setMinistryForm({ ...ministryForm, leader: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Horario de Reunión</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Viernes, 7:00 PM"
                                value={ministryForm.schedule || ''}
                                onChange={(e) => setMinistryForm({ ...ministryForm, schedule: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Icono Visual</label>
                              <select
                                value={ministryForm.iconName || 'Users'}
                                onChange={(e) => setMinistryForm({ ...ministryForm, iconName: e.target.value })}
                                className="w-full px-3 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none font-semibold"
                              >
                                <option value="Baby">👶 Niños (Baby)</option>
                                <option value="Users">👥 Jóvenes/Grupos (Users)</option>
                                <option value="Music">🎵 Adoración (Music)</option>
                                <option value="BookOpen">📖 Estudios (BookOpen)</option>
                                <option value="Flower">🌸 Mujeres (Flower)</option>
                              </select>
                            </div>
                            <div className="space-y-1 sm:col-span-2">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Enlace de Imagen</label>
                              <input
                                type="text"
                                value={ministryForm.image || ''}
                                onChange={(e) => setMinistryForm({ ...ministryForm, image: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-[10px] bg-white focus:outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1 sm:col-span-2">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Breve Descripción</label>
                              <textarea
                                rows={4}
                                required
                                value={ministryForm.description || ''}
                                onChange={(e) => setMinistryForm({ ...ministryForm, description: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => { setSelectedMinistryId(null); setMinistryForm({}); }}
                              className="px-4 py-2 border border-church-200 bg-white hover:bg-church-100 text-church-700 rounded-xl font-sans text-xs font-bold uppercase cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-church-primary hover:bg-church-primary/95 text-white rounded-xl font-sans text-xs font-bold uppercase flex items-center space-x-1 cursor-pointer"
                            >
                              <Save className="h-3.5 w-3.5" />
                              <span>Guardar</span>
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="border-2 border-dashed border-church-200 rounded-2xl p-12 text-center text-church-400 space-y-3">
                          <div className="p-3 bg-church-50 rounded-full w-fit mx-auto text-church-300">
                            <HelpCircle className="h-8 w-8" />
                          </div>
                          <p className="text-xs font-bold uppercase tracking-wider text-church-500">Formulario Desactivado</p>
                          <p className="text-[10px] text-church-400 max-w-xs mx-auto leading-normal">
                            Selecciona un ministerio de la lista izquierda para editar sus parámetros o presiona "+ Nuevo Ministerio" para agregar una nueva actividad.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MEDIA (SERMONES) WORKSPACE */}
              {activeSection === 'media' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-church-100 pb-3">
                    <div>
                      <h2 className="font-display text-base font-extrabold text-church-950 uppercase tracking-wide">
                        Biblioteca de Predicaciones (Sermones)
                      </h2>
                      <p className="text-xxs text-church-500 font-sans mt-0.5">
                        Agrega los audios dominicales recientes, pasajes de la Biblia, bosquejos de estudio y duración.
                      </p>
                    </div>
                    <button
                      onClick={startNewSermon}
                      className="px-3 py-2 bg-church-primary hover:bg-church-primary/95 text-white rounded-lg font-sans text-xxs font-bold uppercase flex items-center space-x-1 cursor-pointer shadow-sm"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Nuevo Sermón</span>
                    </button>
                  </div>

                  {/* Split horizontal manager */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* List (Left Col) */}
                    <div className="md:col-span-4 space-y-2">
                      <span className="block text-[10px] font-extrabold text-church-400 uppercase tracking-wider mb-1">Últimos Sermones</span>
                      <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                        {sermons.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => selectSermon(s)}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              selectedSermonId === s.id
                                ? 'bg-church-primary/5 border-church-primary ring-1 ring-church-primary/10'
                                : 'bg-white hover:bg-church-50 border-church-200 shadow-sm'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <span className="font-bold text-church-950 block truncate">{s.title}</span>
                              <span className="text-[9px] text-church-400 block truncate">{s.scripture} • {s.date}</span>
                            </div>
                            <div className="flex items-center space-x-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => selectSermon(s)}
                                className="p-1 text-church-500 hover:text-church-900 rounded"
                                title="Editar"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSermon(s.id)}
                                className="p-1 text-red-500 hover:text-red-700 rounded"
                                title="Eliminar"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form (Right Col) */}
                    <div className="md:col-span-8">
                      {selectedSermonId ? (
                        <form onSubmit={handleSaveSermon} className="bg-church-50 p-5 rounded-2xl border border-church-200/80 space-y-4">
                          <div className="flex items-center justify-between border-b border-church-100 pb-2">
                            <span className="text-xs font-extrabold text-church-950 uppercase tracking-wider flex items-center space-x-1.5">
                              <span className="w-1.5 h-3 bg-church-secondary rounded-full"></span>
                              <span>{selectedSermonId === 'NEW' ? 'Nuevo Sermón de la Palabra' : 'Editar Información del Sermón'}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => { setSelectedSermonId(null); setSermonForm({}); }}
                              className="text-church-400 hover:text-church-700 text-xs uppercase font-sans font-bold text-[9px]"
                            >
                              Cerrar ×
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div className="space-y-1 sm:col-span-3">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Título del Sermón</label>
                              <input
                                type="text"
                                required
                                value={sermonForm.title || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Expositor / Predicador</label>
                              <input
                                type="text"
                                required
                                value={sermonForm.speaker || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Pasaje de la Escritura</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Romanos 8:18-25"
                                value={sermonForm.scripture || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, scripture: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Fecha de Exposición</label>
                              <input
                                type="date"
                                required
                                value={sermonForm.date || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, date: e.target.value })}
                                className="w-full px-3 py-1.5 border border-church-200 rounded-lg text-xs bg-white focus:outline-none font-semibold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Serie de Sermones</label>
                              <input
                                type="text"
                                placeholder="e.g. Hechos"
                                value={sermonForm.series || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, series: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Libro Bíblico</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Romanos"
                                value={sermonForm.book || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, book: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Duración (MM:SS)</label>
                              <input
                                type="text"
                                placeholder="e.g. 42:15"
                                value={sermonForm.duration || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, duration: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1 sm:col-span-3">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Resumen Corto (Párrafo Inicial)</label>
                              <textarea
                                rows={2}
                                required
                                value={sermonForm.summary || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, summary: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1 sm:col-span-3">
                              <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Bosquejo Detallado / Notas de Estudio</label>
                              <textarea
                                rows={6}
                                placeholder="Escribe el bosquejo de puntos del sermón..."
                                value={sermonForm.notes || ''}
                                onChange={(e) => setSermonForm({ ...sermonForm, notes: e.target.value })}
                                className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-[11px] bg-white focus:outline-none font-mono"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => { setSelectedSermonId(null); setSermonForm({}); }}
                              className="px-4 py-2 border border-church-200 bg-white hover:bg-church-100 text-church-700 rounded-xl font-sans text-xs font-bold uppercase cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-church-primary hover:bg-church-primary/95 text-white rounded-xl font-sans text-xs font-bold uppercase flex items-center space-x-1 cursor-pointer"
                            >
                              <Save className="h-3.5 w-3.5" />
                              <span>Guardar Sermón</span>
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="border-2 border-dashed border-church-200 rounded-2xl p-12 text-center text-church-400 space-y-3">
                          <div className="p-3 bg-church-50 rounded-full w-fit mx-auto text-church-300">
                            <Play className="h-8 w-8" />
                          </div>
                          <p className="text-xs font-bold uppercase tracking-wider text-church-500">Sermonera Inactiva</p>
                          <p className="text-[10px] text-church-400 max-w-xs mx-auto leading-normal">
                            Selecciona un sermón de la lista izquierda para editar sus notas o presiona "+ Nuevo Sermón" para registrar la predicación de un domingo reciente.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. DAR WORKSPACE */}
              {activeSection === 'dar' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="font-display text-base font-extrabold text-church-950 uppercase tracking-wide border-b border-church-100 pb-2 flex items-center space-x-1.5">
                      <Heart className="h-5 w-5 text-church-primary" />
                      <span>Configuración de Diezmos, Ofrendas y Fondos</span>
                    </h2>
                    
                    <form onSubmit={handleSaveGeneralGiving} className="mt-6 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Título del Banner Principal</label>
                          <input
                            type="text"
                            value={tempGivingSettings.titulo}
                            onChange={(e) => setTempGivingSettings({ ...tempGivingSettings, titulo: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-semibold focus:outline-none focus:ring-1 focus:ring-church-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Subtítulo Superior</label>
                          <input
                            type="text"
                            value={tempGivingSettings.subtitulo}
                            onChange={(e) => setTempGivingSettings({ ...tempGivingSettings, subtitulo: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-semibold focus:outline-none focus:ring-1 focus:ring-church-primary"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Versículo Bíblico Sostenedor</label>
                          <input
                            type="text"
                            value={tempGivingSettings.verso}
                            onChange={(e) => setTempGivingSettings({ ...tempGivingSettings, verso: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-semibold focus:outline-none focus:ring-1 focus:ring-church-primary"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="block text-[10px] font-bold text-church-600 uppercase tracking-wider">Motivación Teológica e Institucional (Mayordomía)</label>
                          <textarea
                            rows={3}
                            value={tempGivingSettings.motivation}
                            onChange={(e) => setTempGivingSettings({ ...tempGivingSettings, motivation: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-church-200 rounded-lg text-xs bg-church-50 font-medium focus:outline-none focus:ring-1 focus:ring-church-primary"
                          />
                        </div>
                      </div>

                      <div className="border-t border-church-150 pt-5 space-y-4">
                        <span className="block text-xs font-extrabold text-church-950 uppercase tracking-wider">
                          Destinatario y Definición de los Fondos Activos
                        </span>

                        <div className="space-y-3.5">
                          <div className="space-y-1 bg-church-50 p-3.5 rounded-xl border border-church-200/60">
                            <label className="block text-[10px] font-bold text-church-700 uppercase tracking-wider">A. Fondo: Diezmo General de la Iglesia</label>
                            <input
                              type="text"
                              value={tempGivingSettings.diezmoDesc}
                              onChange={(e) => setTempGivingSettings({ ...tempGivingSettings, diezmoDesc: e.target.value })}
                              className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-church-primary"
                            />
                          </div>

                          <div className="space-y-1 bg-church-50 p-3.5 rounded-xl border border-church-200/60">
                            <label className="block text-[10px] font-bold text-church-700 uppercase tracking-wider">B. Fondo: Misiones Mundiales y Plantación</label>
                            <input
                              type="text"
                              value={tempGivingSettings.misionesDesc}
                              onChange={(e) => setTempGivingSettings({ ...tempGivingSettings, misionesDesc: e.target.value })}
                              className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-church-primary"
                            />
                          </div>

                          <div className="space-y-1 bg-church-50 p-3.5 rounded-xl border border-church-200/60">
                            <label className="block text-[10px] font-bold text-church-700 uppercase tracking-wider">C. Fondo: Construcción, Mantenimiento y Edificio</label>
                            <input
                              type="text"
                              value={tempGivingSettings.construccionDesc}
                              onChange={(e) => setTempGivingSettings({ ...tempGivingSettings, construccionDesc: e.target.value })}
                              className="w-full px-3.5 py-2 border border-church-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-church-primary"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end border-t border-church-150 pt-4">
                        <button
                          type="submit"
                          className="px-5 py-3 bg-church-primary hover:bg-church-primary/95 text-white font-sans text-xs font-bold uppercase rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow"
                        >
                          <Save className="h-4 w-4 text-church-secondary" />
                          <span>Guardar Ajustes de Dar</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
