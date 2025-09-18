import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon, ChevronDownIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Article } from '../types';
import { SITE_URL } from '../lib/seo';

interface ArticleFeedProps {
  articles: Article[];
  className?: string;
}

export const ArticleFeed: React.FC<ArticleFeedProps> = ({ articles, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);

  // --- Navigation
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < articles.length - 1 ? prev + 1 : prev));
  }, [articles.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < articles.length) setCurrentIndex(index);
  }, [articles.length]);

  // --- Keyboard nav
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
        case ' ':
          event.preventDefault();
          goToNext();
          break;
        case 'ArrowUp':
          event.preventDefault();
          goToPrevious();
          break;
        case 'Home':
          event.preventDefault();
          goToIndex(0);
          break;
        case 'End':
          event.preventDefault();
          goToIndex(articles.length - 1);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, goToIndex, articles.length]);

  // --- Touch (flick uniquement)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = () => {
    const deltaY = touchStartY.current - touchEndY.current;
    const deltaTime = Date.now() - touchStartTime.current;
    const minSwipeDistance = 60;
    const maxSwipeTime = 450;

    if (Math.abs(deltaY) > minSwipeDistance && deltaTime < maxSwipeTime) {
      if (deltaY > 0) goToNext();
      else goToPrevious();
    }

    touchStartY.current = 0;
    touchEndY.current = 0;
    touchStartTime.current = 0;
  };

  // --- Share
  const shareArticle = async (article: Article) => {
    const internalUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/articles/${article.id}`
      : `${SITE_URL}/articles/${article.id}`;
    const shareUrl = internalUrl;

    const navAny = navigator as any;
    if (navAny.share) {
      try {
        await navAny.share({
          title: article.title,
          text: article.summary,
          url: shareUrl
        });
      } catch {
        // cancel
      }
    } else if (navigator.clipboard && shareUrl) {
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch {
        // noop
      }
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const getGradientFromId = (id: string) => {
    const gradients = [
      'from-red-600 to-red-800',
      'from-red-700 to-red-900',
      'from-red-500 to-red-700',
      'from-red-800 to-red-950',
      'from-red-600 to-red-900'
    ];
    const hash = id
      .split('')
      .reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);
    return gradients[Math.abs(hash) % gradients.length];
  };

  if (!articles || articles.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-svh bg-gray-100 ${className}`}>
        <p className="text-gray-500 text-lg text-center px-6">
          Les enquêtes de SOS Chrétiens d'Occident seront publiées ici très prochainement.
        </p>
      </div>
    );
  }

  const current = articles[currentIndex];

  return (
    <div
      className={`article-feed ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.section
          key={currentIndex}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full"
        >
          {/* Wrapper intrinsèque */}
          <div className="sm:min-h-svh sm:flex sm:items-stretch">
            <div className="w-full mx-auto max-w-5xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
              {/* --- CARTE --- */}
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${getGradientFromId(current.id)}`}>
                {/* Overlay lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none" />

                {/* CONTENU dans le cadre */}
                <div className="relative z-10 text-white px-4 sm:px-8 md:px-12 lg:px-16 pt-6 pb-1 sm:py-10 md:py-12 flex flex-col gap-6 min-h-0 sm:min-h-[60svh]">
                  {/* Header / Main */}
                  <div>
                    <p className="text-red-200/90 text-sm sm:text-base mb-3 sm:mb-4">
                      {formatDate(current.publishedAt)}
                    </p>

                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                      {current.title}
                    </h2>

                    {current.summary && (
                      <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-gray-100/90 max-w-3xl">
                        {current.summary}
                      </p>
                    )}

                    {Array.isArray(current.tags) && current.tags.length > 0 && (
                      <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5">
                        {current.tags.map((tag, i) => (
                          <span
                            key={`${tag}-${i}`}
                            className="bg-red-600/80 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <a
                        href={`/articles/${current.id}`}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center"
                      >
                        Lire l'enquête complète
                      </a>

                      <button
                        onClick={() => shareArticle(current)}
                        className="border-2 border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
                        aria-label="Partager l'alerte"
                      >
                        <ShareIcon className="w-5 h-5" />
                        Partager l'alerte
                      </button>
                    </div>

                    {/* Bouton mobile “Passer à la suite” (dernier article) */}
                    {currentIndex === articles.length - 1 && (
                      <div className="mt-4 sm:mt-6 md:hidden">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (typeof window !== 'undefined') {
                              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                            }
                          }}
                          className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
                          aria-label="Accéder à l'analyse suivante"
                        >
                          <ChevronDownIcon className="w-5 h-5" />
                          Voir l'analyse suivante
                        </a>
                      </div>
                    )}
                  </div>

                  {/* FOOTER dans le cadre : fil d'Ariane + flèches */}
                  <div className="mt-4 sm:mt-auto pt-2 sm:pt-4 pb-0 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* Fil d’Ariane (wrap si beaucoup d’articles) */}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                        {articles.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => goToIndex(i)}
                            className={`h-2 w-2 rounded-full transition-all ${
                              i === currentIndex
                                ? 'bg-white scale-125 shadow-sm'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Aller à l'article ${i + 1}`}
                          />
                        ))}
                      </div>

                      {/* Flèches de navigation (toujours DANS le cadre) */}
                      <div className="flex justify-center sm:justify-end gap-3">
                        <button
                          onClick={goToPrevious}
                          disabled={currentIndex === 0}
                          className="bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
                          aria-label="Article précédent"
                        >
                          <ChevronUpIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={goToNext}
                          disabled={currentIndex === articles.length - 1}
                          className="bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
                          aria-label="Article suivant"
                        >
                          <ChevronDownIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* /FOOTER */}
                </div>
                {/* /CONTENU */}
              </div>
              {/* /CARTE */}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default ArticleFeed;
