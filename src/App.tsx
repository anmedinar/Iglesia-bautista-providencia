import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Ministries from './components/Ministries';
import Sermons from './components/Sermons';
import Events from './components/Events';
import Giving from './components/Giving';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

import { DOCTRINES, LEADERS, MINISTRIES, SERMONS, EVENTS } from './data';
import { DoctrinalPoint, Leader, Ministry, Sermon, Event } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');

  // --- Dynamic State Setup ---
  const [doctrines, setDoctrines] = useState<DoctrinalPoint[]>(() => {
    const saved = localStorage.getItem('ibp_doctrines');
    return saved ? JSON.parse(saved) : DOCTRINES;
  });

  const [leaders, setLeaders] = useState<Leader[]>(() => {
    const saved = localStorage.getItem('ibp_leaders');
    return saved ? JSON.parse(saved) : LEADERS;
  });

  const [ministries, setMinistries] = useState<Ministry[]>(() => {
    const saved = localStorage.getItem('ibp_ministries');
    return saved ? JSON.parse(saved) : MINISTRIES;
  });

  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const saved = localStorage.getItem('ibp_sermons');
    return saved ? JSON.parse(saved) : SERMONS;
  });

  // General settings (mission, vision, identities)
  const [aboutSettings, setAboutSettings] = useState(() => {
    const saved = localStorage.getItem('ibp_about_settings');
    return saved ? JSON.parse(saved) : {
      mision: 'Exaltar la gloria de Dios mediante la proclamación fiel de Jesucristo, la edificación doctrinal y el discipulado bíblico de la iglesia local, y la obediencia gozosa al mandato de hacer discípulos en Memphis y hasta lo último de la tierra.',
      vision: 'Ver una congregación hispana vibrante, madura y saturada del Evangelio, que refleje el amor de Cristo, sostenga con firmeza la suficiencia de la Escritura en una sociedad secularizada, y actúe como un faro de esperanza y renovación familiar en nuestra ciudad.',
      titulo: 'Nuestra Identidad y Fe',
      subtitulo: 'Quiénes Somos',
      verso: '"Un solo Señor, una sola fe, un solo bautismo, un solo Dios y Padre de todos..." • Efesios 4:5-6'
    };
  });

  // Giving Settings (Mayordomía, fund descriptions)
  const [givingSettings, setGivingSettings] = useState(() => {
    const saved = localStorage.getItem('ibp_giving_settings');
    return saved ? JSON.parse(saved) : {
      titulo: 'Diezmos y Ofrendas',
      subtitulo: 'Adorando con Nuestras Ofrendas',
      verso: '"Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." • 2 Corintios 9:7',
      motivation: 'Creemos que el dar ofrendas y diezmos es un acto sagrado de adoración y obediencia que expresa gratitud por la providencia soberana de Dios. Sostiene el ministerio pastoral local, cuida de los necesitados y expande el Evangelio de Jesucristo globalmente.',
      diezmoDesc: 'Sostiene el presupuesto operacional, sueldos ministeriales y actividades de la congregación.',
      misionesDesc: 'Destinado directamente a sostener obreros y misioneros en el campo y plantar nuevas iglesias.',
      construccionDesc: 'Destinado exclusivamente al mantenimiento del templo físico y proyectos de ampliación.'
    };
  });

  // --- Saver Actions ---
  const saveDoctrines = (data: DoctrinalPoint[]) => {
    setDoctrines(data);
    localStorage.setItem('ibp_doctrines', JSON.stringify(data));
  };

  const saveLeaders = (data: Leader[]) => {
    setLeaders(data);
    localStorage.setItem('ibp_leaders', JSON.stringify(data));
  };

  const saveMinistries = (data: Ministry[]) => {
    setMinistries(data);
    localStorage.setItem('ibp_ministries', JSON.stringify(data));
  };

  const saveSermons = (data: Sermon[]) => {
    setSermons(data);
    localStorage.setItem('ibp_sermons', JSON.stringify(data));
  };

  const saveAboutSettings = (data: any) => {
    setAboutSettings(data);
    localStorage.setItem('ibp_about_settings', JSON.stringify(data));
  };

  const saveGivingSettings = (data: any) => {
    setGivingSettings(data);
    localStorage.setItem('ibp_giving_settings', JSON.stringify(data));
  };

  // Restores all dynamic entries to local defaults
  const resetAllToDefault = () => {
    localStorage.removeItem('ibp_doctrines');
    localStorage.removeItem('ibp_leaders');
    localStorage.removeItem('ibp_ministries');
    localStorage.removeItem('ibp_sermons');
    localStorage.removeItem('ibp_about_settings');
    localStorage.removeItem('ibp_giving_settings');
    localStorage.removeItem('ibp_admin_authenticated');
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'inicio':
        return <Hero setActiveTab={setActiveTab} />;
      case 'nosotros':
        return <About doctrines={doctrines} leaders={leaders} aboutSettings={aboutSettings} />;
      case 'ministerios':
        return <Ministries ministries={ministries} />;
      case 'sermones':
        return <Sermons sermons={sermons} />;
      case 'eventos':
        return <Events />;
      case 'donar':
        return <Giving givingSettings={givingSettings} />;
      case 'contacto':
        return <Contact />;
      case 'administrar':
        return (
          <AdminPanel
            doctrines={doctrines}
            saveDoctrines={saveDoctrines}
            leaders={leaders}
            saveLeaders={saveLeaders}
            ministries={ministries}
            saveMinistries={saveMinistries}
            sermons={sermons}
            saveSermons={saveSermons}
            aboutSettings={aboutSettings}
            saveAboutSettings={saveAboutSettings}
            givingSettings={givingSettings}
            saveGivingSettings={saveGivingSettings}
            resetAllToDefault={resetAllToDefault}
          />
        );
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-church-50 text-church-900 font-sans selection:bg-church-primary/10 selection:text-church-primary antialiased">
      {/* Shared Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderActiveSection()}
      </main>

      {/* Shared Information Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
