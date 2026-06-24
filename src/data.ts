import { DoctrinalPoint, Leader, Ministry, Sermon, Event } from './types';

export const DOCTRINES: DoctrinalPoint[] = [
  {
    id: 'la-biblia',
    title: 'Las Sagradas Escrituras',
    description: 'Creemos que la Biblia es la Palabra inspirada de Dios, inerrante en sus manuscritos originales, la revelación completa de Su voluntad para la salvación de los hombres y la autoridad divina final para toda la fe y vida cristiana.',
    scriptureRef: '2 Timoteo 3:16-17, 2 Pedro 1:20-21'
  },
  {
    id: 'la-trinidad',
    title: 'El Dios Triuno',
    description: 'Creemos en un solo Dios, Creador de todas las cosas, infinitamente perfecto y eternamente existente en tres personas: Padre, Hijo y Espíritu Santo, co-iguales en poder y gloria.',
    scriptureRef: 'Mateo 28:19, 2 Corintios 13:14'
  },
  {
    id: 'jesucristo',
    title: 'La Persona de Jesucristo',
    description: 'Creemos que Jesucristo es verdadero Dios y verdadero hombre, concebido por el Espíritu Santo y nacido de la virgen María. Murió en la cruz como sacrificio sustitutivo por nuestros pecados, resucitó corporalmente de entre los muertos y ascendió a los cielos, donde está a la diestra del Padre como nuestro Sumo Sacerdote y Abogado.',
    scriptureRef: 'Juan 1:1, 14, Filipenses 2:5-11, 1 Corintios 15:3-4'
  },
  {
    id: 'la-salvacion',
    title: 'La Salvación por Gracia',
    description: 'Creemos que la salvación es un don gratuito de Dios, recibido únicamente por medio de la fe personal en Jesucristo y Su obra redentora en la cruz. No es por obras humanas o rituales religiosos, sino por la gracia regeneradora del Espíritu Santo.',
    scriptureRef: 'Efesios 2:8-9, Tito 3:5, Romanos 10:9-10'
  },
  {
    id: 'la-iglesia',
    title: 'La Iglesia Local',
    description: 'Creemos que la Iglesia universal es el cuerpo de Cristo, compuesto por todos los creyentes verdaderos. La iglesia local es una congregación de creyentes bautizados, asociados por un pacto en la fe y el compañerismo del Evangelio, que se reúnen para la adoración, edificación y el cumplimiento de la Gran Comisión.',
    scriptureRef: 'Mateo 28:19-20, Hechos 2:41-42, Efesios 1:22-23'
  },
  {
    id: 'el-retorno',
    title: 'La Segunda Venida',
    description: 'Creemos en el retorno personal, corporal e inminente de nuestro Señor Jesucristo. Esta esperanza bienaventurada tiene un efecto purificador en la vida de cada creyente y nos impulsa a la evangelización.',
    scriptureRef: 'Hechos 1:11, 1 Tesalonicenses 4:13-18, Tito 2:13'
  }
];

export const LEADERS: Leader[] = [
  {
    id: 'pastor-david',
    name: 'Pastor David Mendoza',
    role: 'Pastor Principal',
    bio: 'El Pastor David ha servido en el ministerio pastoral por más de 15 años. Apasionado por la exposición fiel de la Palabra de Dios y el discipulado bíblico. Junto a su esposa María, fundó la Iglesia Bautista Providencia con el deseo de ver vidas transformadas por el Evangelio en Memphis.',
    email: 'david.mendoza@ibprovidencia.org',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=500' // Real portrait placeholder
  },
  {
    id: 'diacono-alejandro',
    name: 'Diác. Alejandro Ruiz',
    role: 'Líder de Educación Bíblica y Administración',
    bio: 'Alejandro sirve con gozo coordinando las escuelas dominicales y los estudios de crecimiento. Su anhelo es ver a cada miembro de la iglesia madurar en su conocimiento de la teología bíblica y vivir vidas fructíferas de servicio cristiano práctico.',
    email: 'alejandro.ruiz@ibprovidencia.org',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500'
  },
  {
    id: 'directora-maria',
    name: 'María Mendoza',
    role: 'Coordinadora de Niños y Familias',
    bio: 'María lidera con amor e ingenio el ministerio infantil. Su enfoque es guiar a las familias a educar a sus hijos en el temor del Señor, proveyendo un entorno seguro, divertido y profundamente bíblico para los más pequeños.',
    email: 'maria.mendoza@ibprovidencia.org',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500'
  }
];

export const MINISTRIES: Ministry[] = [
  {
    id: 'semillitas',
    name: 'Ministerio de Niños (Semillitas de Fe)',
    description: 'Un espacio dinámico y seguro donde los niños desde infantes hasta 11 años aprenden las grandes verdades de la Biblia a través de lecciones creativas, manualidades, cantos y dinámicas grupales.',
    ageGroup: '0 - 11 años',
    leader: 'María Mendoza',
    schedule: 'Domingos, 11:30 AM (Durante el Culto)',
    iconName: 'Baby',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'jovenes',
    name: 'Jóvenes Providencia',
    description: 'Nuestra comunidad de adolescentes y jóvenes que buscan crecer en su relación con Dios, enfrentar los desafíos de la juventud con principios bíblicos y desarrollar amistades sanas en un ambiente alegre.',
    ageGroup: '12 - 22 años',
    leader: 'Héctor & Sofía Martínez',
    schedule: 'Viernes, 7:00 PM',
    iconName: 'Users',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'alabanza',
    name: 'Ministerio de Alabanza',
    description: 'Buscamos glorificar a Dios dirigiendo a la congregación en una adoración reverente, ferviente y bíblicamente fiel, combinando himnos históricos ricos en doctrina y cantos contemporáneos de edificación.',
    ageGroup: 'Adultos y Jóvenes',
    leader: 'David Mendoza Jr.',
    schedule: 'Ensayos Jueves, 7:30 PM',
    iconName: 'Music',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'discipulado',
    name: 'Estudios Bíblicos y Oración',
    description: 'Nuestros grupos en hogares y en el templo para profundizar en el estudio expositivo de los libros de la Biblia, compartir peticiones de oración y apoyarnos mutuamente en amor fraternal.',
    ageGroup: 'General',
    leader: 'Diác. Alejandro Ruiz',
    schedule: 'Miércoles, 7:00 PM',
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'damas',
    name: 'Damas de Fe',
    description: 'Reuniones dedicadas a la edificación de las mujeres de la congregación, enfocándose en la piedad bíblica, la feminidad conforme al diseño de Dios y el servicio en la iglesia y el hogar.',
    ageGroup: 'Mujeres 18+ años',
    leader: 'Hna. Elizabeth Ruiz',
    schedule: 'Último Sábado del Mes, 9:00 AM',
    iconName: 'Flower',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800&h=500'
  }
];

export const SERMONS: Sermon[] = [
  {
    id: 'rom-8-1',
    title: 'Ninguna Condenación en Cristo',
    speaker: 'Pastor David Mendoza',
    date: '2026-06-21',
    series: 'Romanos: Viviendo por la Gracia',
    book: 'Romanos',
    scripture: 'Romanos 8:1-4',
    duration: '42:15',
    summary: 'En este sermón, el Pastor David expone el glorioso fundamento del Evangelio: que ya no hay condenación para los que están unidos a Cristo Jesús por la fe, habiendo sido librados del poder del pecado y de la muerte.',
    notes: `Bosquejo del Sermón:
1. El veredicto glorioso: "Ninguna condenación" (v. 1)
   a. Basado en nuestra unión vital con Cristo.
   b. Un veredicto definitivo e irrevocable.
2. El agente de liberación: La ley del Espíritu de vida (v. 2)
   a. Rompe el dominio esclavo del pecado.
   b. Otorga poder y libertad para obedecer.
3. El logro que la ley no pudo realizar: El sacrificio perfecto (v. 3-4)
   a. La debilidad de la carne frente a los mandamientos.
   b. Dios envió a Su Hijo en semejanza de carne de pecado como expiación.
   c. La justicia requerida por la ley se cumple en nosotros al andar según el Espíritu.`
  },
  {
    id: 'col-1-15',
    title: 'La Supremacía del Hijo de Dios',
    speaker: 'Pastor David Mendoza',
    date: '2026-06-14',
    series: 'Cristo Sobre Todo: Colosenses',
    book: 'Colosenses',
    scripture: 'Colosenses 1:15-20',
    duration: '38:50',
    summary: 'Un estudio profundo acerca del carácter excelso y preeminente de Cristo, quien es la imagen exacta del Dios invisible, el soberano absoluto sobre toda la creación y la cabeza de la Iglesia.',
    notes: `Bosquejo del Sermón:
1. Cristo es Soberano sobre la Creación (v. 15-17)
   a. La imagen del Dios invisible (v. 15a).
   b. El primogénito de toda creación (v. 15b).
   c. El Agente, el Medio y el Fin de la creación (v. 16).
   d. El Sostenedor eterno de todas las cosas (v. 17).
2. Cristo es Soberano sobre la Redención (v. 18-20)
   a. La Cabeza del cuerpo que es la Iglesia (v. 18a).
   b. El principio y primogénito de los muertos para preeminencia (v. 18b).
   c. En Él habita toda plenitud divina (v. 19).
   d. El Pacificador que reconcilió todas las cosas mediante Su sangre en la cruz (v. 20).`
  },
  {
    id: 'snt-1-2',
    title: 'El Propósito del Sufrimiento y las Pruebas',
    speaker: 'Diác. Alejandro Ruiz',
    date: '2026-06-07',
    series: 'Santiago: Una Fe que Funciona',
    book: 'Santiago',
    scripture: 'Santiago 1:2-8',
    duration: '45:10',
    summary: 'Alejandro nos guía por el llamado de Santiago a considerar como gozo supremo las diversas pruebas que atravesamos, sabiendo que producen paciencia madura y fe refinada.',
    notes: `Bosquejo del Sermón:
1. La Actitud ante la Prueba: Sumo Gozo (v. 2)
   a. No un gozo emocional pasivo, sino una decisión de fe racional.
   b. "Diversas pruebas" indica que vienen en múltiples formas y tiempos.
2. El Proceso de la Prueba: Paciencia Madura (v. 3-4)
   a. La prueba produce paciencia (resistencia bajo presión).
   b. La paciencia debe terminar su obra completa para hacernos perfectos y cabales.
3. La Provisión en la Prueba: Sabiduría Divina (v. 5-8)
   a. El que tenga falta de sabiduría, pídala a Dios, quien da abundantemente.
   b. Debe pedirse con fe sincera, sin dudar.
   c. La advertencia contra la mente vacilante e inestable.`
  },
  {
    id: 'mat-28-18',
    title: 'Nuestra Misión Colectiva: Hacer Discípulos',
    speaker: 'Pastor David Mendoza',
    date: '2026-05-31',
    series: 'Mensajes Especiales',
    book: 'Mateo',
    scripture: 'Mateo 28:18-20',
    duration: '41:00',
    summary: 'La Gran Comisión no es una sugerencia opcional, sino el mandato supremo de Cristo para la iglesia de hacer discípulos de todas las naciones bautizándolos y enseñándoles Su Palabra.',
    notes: `Bosquejo del Sermón:
1. La Autoridad del Mandato: Todo Poder en el Cielo y la Tierra (v. 18)
   a. Descansa en la soberanía cósmica de Cristo resucitado.
2. El Núcleo del Mandato: Hacer Discípulos (v. 19-20a)
   a. Mientras van por el mundo (estilo de vida cotidiano).
   b. Bautizándolos en el nombre del Padre, del Hijo y del Espíritu Santo.
   c. Enseñándoles a guardar todas las cosas ordenadas.
3. El Aliento del Mandato: La Presencia Permanente (v. 20b)
   a. "He aquí yo estoy con vosotros todos los días hasta el fin del mundo".`
  }
];

export const EVENTS: Event[] = [
  {
    id: 'culto-dom',
    title: 'Culto de Adoración Dominical',
    description: 'Nuestra reunión principal como familia de fe para cantar alabanzas al Dios Vivo, orar juntos y escuchar la exposición sistemática de la Palabra de Dios. ¡Todos son bienvenidos!',
    date: '2026-06-28', // Próximo domingo
    time: '11:00 AM - 12:30 PM',
    location: 'FBC Fisherville - 11893 Macon Rd, Eads, TN 38028',
    category: 'culto'
  },
  {
    id: 'estudio-mie',
    title: 'Estudio Bíblico y Reunión de Oración',
    description: 'Nos reunimos a mitad de semana para profundizar de manera interactiva en las Escrituras y unirnos en un clamor ferviente por las necesidades de nuestra iglesia, familias y comunidad.',
    date: '2026-06-24', // Próximo miércoles
    time: '7:00 PM - 8:15 PM',
    location: 'Salón de Conferencias & Zoom',
    category: 'estudio'
  },
  {
    id: 'jovenes-vie',
    title: 'Viernes de Jóvenes Providencia',
    description: 'Un tiempo divertido, interactivo y lleno de compañerismo para todos nuestros jóvenes de secundaria y universidad. ¡Trae a un amigo para compartir juegos, música y reflexiones bíblicas de impacto!',
    date: '2026-06-26', // Próximo viernes
    time: '7:00 PM - 9:00 PM',
    location: 'Salón Juvenil',
    category: 'jovenes'
  },
  {
    id: 'conferencia-fam',
    title: 'Conferencia Familiar: Hogares sobre la Roca',
    description: 'Un evento especial de fin de semana enfocado en fortalecer los matrimonios y la crianza de hijos según el modelo bíblico. Contaremos con exposiciones especiales, talleres y un almuerzo de compañerismo.',
    date: '2026-07-11', // Julio
    time: '9:00 AM - 3:00 PM',
    location: 'Gimnasio & Capilla',
    category: 'especial'
  },
  {
    id: 'servicio-com',
    title: 'Proyecto de Amor: Canastas de Alimentos para el Vecindario',
    description: 'Reuniremos provisiones básicas para armar y distribuir canastas de alimentos y folletos del Evangelio a familias necesitadas de nuestra comunidad circundante. ¡Inscríbete para ser voluntario!',
    date: '2026-07-18', // Julio
    time: '8:30 AM - 12:30 PM',
    location: 'Estacionamiento de la Iglesia',
    category: 'comunidad'
  }
];
