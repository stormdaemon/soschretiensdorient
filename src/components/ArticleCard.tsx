import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick, 
  className = '' 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Génération d'un gradient basé sur l'ID de l'article
  const getGradientFromId = (id: string) => {
    const gradients = [
      'from-red-600 to-red-800',
      'from-red-700 to-red-900',
      'from-red-500 to-red-700',
      'from-red-800 to-red-950',
      'from-red-600 to-red-900'
    ];
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return gradients[Math.abs(hash) % gradients.length];
  };

  return (
    <Link to={`/articles/${article.id}`}>
      <motion.article
        className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${className}`}
        onClick={onClick}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background coloré */}
        <div className="relative h-48 overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${getGradientFromId(article.id)} flex items-center justify-center transition-transform duration-300 hover:scale-105`}>
            <div className="text-center text-white px-4">
              <svg className="w-16 h-16 mx-auto mb-3 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h4 className="text-lg font-bold opacity-95 leading-tight line-clamp-2">
                {article.title}
              </h4>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex items-center flex-wrap gap-2">
          <TagIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Read more indicator */}
      <div className="px-6 pb-4">
        <div className="flex items-center text-red-600 font-medium text-sm group">
          <span>Lire l'article</span>
          <svg 
            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      </motion.article>
    </Link>
  );
};

export default ArticleCard;
