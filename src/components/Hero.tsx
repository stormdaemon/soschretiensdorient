import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import bannerImage from '../assets/banner.png';
import logoImage from '../assets/logo.png';

interface HeroProps {
  onScrollToArticles?: () => void;
  onJoinClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToArticles, onJoinClick }) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-var(--heaven-header-height,64px))] items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bannerImage}
          alt="Volontaires de SOS Chrétiens d'Occident en mission"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center space-y-2 px-4 text-center sm:space-y-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-2 sm:mb-4"
        >
          <img
            src={logoImage}
            alt="SOS Chrétiens d'Occident"
            className="mx-auto mb-3 h-16 w-16 drop-shadow-2xl sm:mb-5 sm:h-24 sm:w-24 lg:h-32 lg:w-32"
          />
        </motion.div>

        {/* Title */}
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-block text-[0.65rem] uppercase tracking-[0.22em] text-red-100/80 mb-3 sm:text-xs sm:tracking-[0.28em] sm:mb-4"
        >
          Association d'engagement chrétien
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[2.2rem] leading-tight font-bold text-white mb-5 sm:text-[2.5rem] lg:text-5xl"
        >
          SOS Chrétiens d'Occident
          <br className="hidden sm:block" />
          <span className="text-red-200">protège les croyants menacés</span>
        </motion.h1>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-sm text-red-100 leading-relaxed sm:text-lg lg:text-xl"
        >
          Association catholique de terrain, nous documentons la christianophobie, 
          soutenons les communautés fragilisées en France et à l'étranger et mobilisons 
          chacun pour défendre la liberté de culte.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <button
            onClick={onJoinClick}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-red-900 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-50 sm:px-6 sm:py-3 sm:text-base"
          >
            Adhérer dès aujourd'hui
          </button>
          <button
            onClick={onScrollToArticles}
            className="rounded-full border-2 border-white px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-red-900 sm:px-6 sm:py-3 sm:text-base"
          >
            Découvrir nos actions
          </button>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 sm:bottom-8"
      >
        <motion.button
          onClick={onScrollToArticles}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full border border-white/30 p-1.5 text-white transition-colors duration-300 hover:text-red-200 sm:p-2"
          aria-label="Faire défiler vers le bas"
        >
          <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
       <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl z-10" />
       <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl z-10" />
       <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/5 rounded-full blur-xl z-10" />
    </section>
  );
};

export default Hero;
