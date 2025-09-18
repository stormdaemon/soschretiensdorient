import React, { useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

const STREAM_URL = 'https://play.radioking.io/heavenradio';

export const HeavenRadioHeader: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(70);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof Audio === 'undefined') return;

    const audio = new Audio(STREAM_URL);
    audio.preload = 'none';
    audio.volume = volume / 100;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => setError("Flux indisponible pour le moment");

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Erreur de lecture du flux Heaven Radio:', err);
      setError('Lecture impossible. Réessayez.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setVolume(value);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-red-900/20 bg-gradient-to-r from-red-900 via-red-800 to-red-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-red-100">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-200 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-100" />
              </span>
              <span className="text-xs uppercase tracking-[0.35em] text-red-200/80">Live</span>
            </div>
            <div className="flex items-center gap-2">
              <MusicalNoteIcon className="h-5 w-5 text-red-100" aria-hidden="true" />
              <p className="text-sm font-semibold text-white sm:text-base">Heaven Radio • Partenaire</p>
            </div>
            <p className="text-xs sm:text-sm text-red-100/80">100% Louange et Adoration</p>
          </div>

          <div className="flex flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlayback}
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-white shadow-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-red-800"
                aria-label={isPlaying ? 'Mettre Heaven Radio en pause' : 'Écouter Heaven Radio'}
              >
                {isLoading ? (
                  <svg className="h-5 w-5 animate-spin text-red-50" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                ) : isPlaying ? (
                  <PauseIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlayIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>

              <div className="flex items-center gap-2 text-red-100">
                <SpeakerWaveIcon className="h-4 w-4" aria-hidden="true" />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-red-200/40 accent-red-100"
                  aria-label="Volume Heaven Radio"
                />
              </div>

              <a
                href={STREAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-xs font-medium text-red-100 transition hover:text-white sm:inline"
              >
                Ouvrir dans une nouvelle fenêtre
              </a>
            </div>

            {error && (
              <p className="text-xs text-red-100/90 sm:text-sm" role="status">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeavenRadioHeader;
