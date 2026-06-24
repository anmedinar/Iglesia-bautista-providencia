import React, { useState, useEffect, useRef } from 'react';
import { SERMONS } from '../data';
import { Sermon } from '../types';
import { Search, Play, Pause, BookOpen, Clock, Calendar, ChevronDown, ChevronUp, Volume2, VolumeX, ListRestart } from 'lucide-react';

interface SermonsProps {
  sermons?: Sermon[];
}

export default function Sermons({ sermons = SERMONS }: SermonsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState('todos');
  const [selectedSeries, setSelectedSeries] = useState('todos');
  const [expandedSermonId, setExpandedSermonId] = useState<string | null>(null);

  // Audio Player State
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const playerInterval = useRef<NodeJS.Timeout | null>(null);

  // Convert duration string "MM:SS" to seconds
  const durationToSeconds = (durationStr: string): number => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 1800; // default 30 mins
  };

  const activeDurationSec = activeSermon ? durationToSeconds(activeSermon.duration) : 0;

  // Format seconds to MM:SS
  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Audio simulation ticker
  useEffect(() => {
    if (isPlaying && activeSermon) {
      playerInterval.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (playerInterval.current) clearInterval(playerInterval.current);
    }

    return () => {
      if (playerInterval.current) clearInterval(playerInterval.current);
    };
  }, [isPlaying, activeSermon, activeDurationSec]);

  const handlePlaySermon = (sermon: Sermon) => {
    if (activeSermon?.id === sermon.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSermon(sermon);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value, 10));
  };

  // Extract unique books and series for dropdowns
  const uniqueBooks = Array.from(new Set(sermons.map((s) => s.book)));
  const uniqueSeries = Array.from(new Set(sermons.map((s) => s.series)));

  // Filter logic
  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch = 
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.scripture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBook = selectedBook === 'todos' || sermon.book === selectedBook;
    const matchesSeries = selectedSeries === 'todos' || sermon.series === selectedSeries;

    return matchesSearch && matchesBook && matchesSeries;
  });

  return (
    <div className="bg-church-50 text-church-900 font-sans min-h-screen py-12 pb-36">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-church-primary font-mono text-xs font-semibold tracking-widest uppercase">
          Predicación Expositiva
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-church-950 mt-3 mb-4">
          Sermones y Recursos
        </h1>
        <p className="font-serif text-lg text-church-600 max-w-2xl mx-auto italic leading-relaxed">
          "Así que la fe es por el oír, y el oír, por la palabra de Dios." • Romanos 10:17
        </p>
      </section>

      {/* 2. Interactive Search & Filter Controls */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-2xl border border-church-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="relative md:col-span-5">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-church-400" />
            <input
              type="text"
              placeholder="Buscar por pasaje, título, expositor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white"
            />
          </div>

          {/* Book Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full px-4 py-3 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white font-medium"
            >
              <option value="todos">Libros Bíblicos (Todos)</option>
              {uniqueBooks.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Series Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="w-full px-4 py-3 border border-church-200 rounded-xl focus:ring-2 focus:ring-church-primary focus:outline-none text-sm bg-white font-medium"
            >
              <option value="todos">Serie de Sermones (Todas)</option>
              {uniqueSeries.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 3. Sermons Listing Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {filteredSermons.length > 0 ? (
          filteredSermons.map((sermon) => {
            const isExpanded = expandedSermonId === sermon.id;
            const isPlayingThis = activeSermon?.id === sermon.id && isPlaying;

            return (
              <div 
                key={sermon.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                  activeSermon?.id === sermon.id ? 'border-church-secondary/60 ring-2 ring-church-secondary/10' : 'border-church-200/60'
                }`}
              >
                {/* Sermon Primary Row */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    {/* Series Tag */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 bg-church-primary/10 border border-church-primary/25 text-church-primary text-xxs font-bold tracking-wider uppercase rounded">
                        Serie: {sermon.series}
                      </span>
                      <span className="px-2.5 py-1 bg-church-950/5 text-church-800 text-xxs font-mono uppercase rounded">
                        {sermon.book}
                      </span>
                    </div>

                    {/* Title & Scripture */}
                    <h3 className="font-display text-xl font-bold text-church-950">
                      {sermon.title}
                    </h3>
                    <p className="font-serif text-sm text-church-primary font-semibold flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      <span>{sermon.scripture}</span>
                    </p>

                    {/* Meta information row */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-church-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-church-secondary" />
                        {sermon.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-church-secondary" />
                        {sermon.duration} mins
                      </span>
                      <span className="font-semibold text-church-700">
                        Por: {sermon.speaker}
                      </span>
                    </div>
                  </div>

                  {/* Play & Notes Action column */}
                  <div className="flex sm:flex-col items-center gap-3 w-full sm:w-auto self-stretch justify-end sm:justify-center border-t sm:border-t-0 border-church-100 pt-4 sm:pt-0">
                    <button
                      onClick={() => handlePlaySermon(sermon)}
                      className={`px-5 py-3 w-full sm:w-44 rounded-xl font-sans text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                        isPlayingThis 
                          ? 'bg-church-secondary text-church-950 shadow shadow-church-secondary/20'
                          : 'bg-church-primary hover:bg-church-primary/95 text-white'
                      }`}
                    >
                      {isPlayingThis ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span>{isPlayingThis ? 'Pausar' : 'Escuchar'}</span>
                    </button>

                    <button
                      onClick={() => setExpandedSermonId(isExpanded ? null : sermon.id)}
                      className="px-4 py-3 rounded-xl border border-church-200 hover:border-church-primary text-church-700 hover:text-church-primary font-sans text-xs font-bold tracking-wide flex items-center justify-center space-x-1 transition-all cursor-pointer bg-white"
                    >
                      <span>Notas de Estudio</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Study Notes/Summary Panel */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-church-100 bg-church-100/10 space-y-6">
                    <div>
                      <h4 className="font-display font-semibold text-church-950 uppercase tracking-wider text-xs mb-2">
                        Resumen Teológico
                      </h4>
                      <p className="text-church-700 leading-relaxed text-sm">
                        {sermon.summary}
                      </p>
                    </div>

                    <div className="border-t border-church-200/50 pt-5">
                      <h4 className="font-display font-semibold text-church-950 uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-church-primary" />
                        <span>Bosquejo de Predicación</span>
                      </h4>
                      <pre className="font-sans text-xs sm:text-sm text-church-800 leading-relaxed bg-white border border-church-200/50 rounded-xl p-5 overflow-x-auto whitespace-pre-wrap">
                        {sermon.notes}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-church-200 p-12 text-center">
            <p className="text-church-500 font-serif italic text-base">
              No se encontraron sermones que coincidan con los criterios de búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBook('todos');
                setSelectedSeries('todos');
              }}
              className="mt-4 px-4 py-2 bg-church-primary text-white font-sans text-xs font-semibold rounded-lg flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              <ListRestart className="h-4 w-4" />
              <span>Limpiar Filtros</span>
            </button>
          </div>
        )}
      </section>

      {/* 4. PERSISTENT FLOATING AUDIO PLAYER WIDGET */}
      {activeSermon && (
        <div className="fixed bottom-0 inset-x-0 bg-church-950/95 backdrop-blur-md border-t border-church-800 text-church-100 z-40 py-4 sm:py-5 shadow-2xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Metadata */}
            <div className="flex items-center space-x-4 w-full md:w-1/4">
              <div className="p-2.5 bg-church-primary/30 rounded-xl border border-church-primary/50 text-church-secondary shrink-0 hidden sm:block relative overflow-hidden">
                <BookOpen className="h-5 w-5" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-church-primary/10 animate-pulse"></div>
                )}
              </div>
              <div className="truncate">
                <h4 className="font-display font-bold text-church-50 text-xs sm:text-sm truncate">
                  {activeSermon.title}
                </h4>
                <p className="text-xxs sm:text-xs text-church-400 truncate">
                  {activeSermon.speaker} • {activeSermon.scripture}
                </p>
              </div>
            </div>

            {/* Center: Play Controls & Progress timeline slider */}
            <div className="flex flex-col items-center gap-2 w-full md:w-2/4">
              <div className="flex items-center space-x-4">
                {/* Simulated skip back */}
                <button 
                  onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
                  className="p-1.5 rounded-lg text-church-400 hover:text-white hover:bg-church-900 text-xs font-mono"
                  title="Retroceder 15s"
                >
                  -15s
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-church-primary hover:bg-church-primary/90 text-white rounded-full hover:scale-105 transition-all cursor-pointer shadow-lg"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                </button>
                {/* Simulated skip forward */}
                <button 
                  onClick={() => setCurrentTime(Math.min(activeDurationSec, currentTime + 15))}
                  className="p-1.5 rounded-lg text-church-400 hover:text-white hover:bg-church-900 text-xs font-mono"
                  title="Adelantar 15s"
                >
                  +15s
                </button>
              </div>

              {/* Progress seeker bar */}
              <div className="flex items-center space-x-3 w-full">
                <span className="font-mono text-[10px] text-church-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={activeDurationSec}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-church-800 rounded-lg appearance-none cursor-pointer accent-church-secondary focus:outline-none"
                />
                <span className="font-mono text-[10px] text-church-400 w-10 text-left">
                  {formatTime(activeDurationSec)}
                </span>
              </div>
            </div>

            {/* Right: Sound equalizer and controls */}
            <div className="flex items-center justify-end space-x-4 w-full md:w-1/4">
              {/* Animated wave Equalizer */}
              <div className="flex items-end justify-center space-x-0.5 h-6 w-12" title={isPlaying ? 'Reproduciendo audio...' : 'Pausado'}>
                {[1, 2, 3, 4, 5].map((bar) => {
                  const animStyle = isPlaying 
                    ? { animationDelay: `${bar * 150}ms`, animationDuration: `${600 + (bar * 100)}ms` } 
                    : { height: '3px' };
                  return (
                    <div
                      key={bar}
                      style={animStyle}
                      className={`w-1 bg-church-secondary rounded-full transition-all duration-300 ${
                        isPlaying ? 'animate-bounce h-full' : ''
                      }`}
                    ></div>
                  );
                })}
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg text-church-400 hover:text-white hover:bg-church-900 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
