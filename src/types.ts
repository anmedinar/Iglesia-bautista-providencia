export interface DoctrinalPoint {
  id: string;
  title: string;
  description: string;
  scriptureRef: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  image: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  leader: string;
  schedule: string;
  iconName: string;
  image: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  book: string;
  scripture: string;
  audioUrl?: string;
  videoUrl?: string;
  duration: string;
  notes: string;
  summary: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  category: 'culto' | 'estudio' | 'jovenes' | 'comunidad' | 'especial';
}
