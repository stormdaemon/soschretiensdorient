import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  onScrollToArticles?: () => void;
  onJoinClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToArticles, onJoinClick }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/banner.png"
          alt="Volontaires de SOS Chrétiens d'Occident en mission"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src="/src/assets/logo.png"
            alt="SOS Chrétiens d'Occident"
            className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl"
          />
        </motion.div>

        {/* Title */}
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-red-100/80 mb-5"
        >
          Association d'engagement chrétien
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
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
          className="text-xl sm:text-2xl text-red-100 mb-8 leading-relaxed max-w-3xl mx-auto"
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
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button
            onClick={onJoinClick}
            className="bg-white text-red-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Adhérer dès aujourd'hui
          </button>
          <button
            onClick={onScrollToArticles}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-900 transition-all duration-300 transform hover:scale-105"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={onScrollToArticles}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white hover:text-red-200 transition-colors duration-300 p-2"
          aria-label="Faire défiler vers le bas"
        >
          <ChevronDownIcon className="w-8 h-8" />
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
