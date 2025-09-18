import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Accueil', href: '#hero' },
      { name: 'Articles', href: '#articles' },
      { name: 'Nous rejoindre', href: '#membership' },
      { name: 'Contact', href: '#contact' }
    ],
    legal: [
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { name: 'Conditions d\'utilisation', href: '/conditions-utilisation' },
      { name: 'Plan du site', href: '/plan-site' }
    ],
    social: [
      { name: 'Twitter', href: '#', icon: '𝕏' },
      { name: 'Facebook', href: '#', icon: '📘' },
      { name: 'LinkedIn', href: '#', icon: '💼' },
      { name: 'Telegram', href: '#', icon: '✈️' }
    ]
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      text: 'catholicloungemusic@gmail.com',
      href: 'mailto:catholicloungemusic@gmail.com'
    },
    {
      icon: PhoneIcon,
      text: '+33 1 23 45 67 89',
      href: 'tel:+33123456789'
    },
    {
      icon: MapPinIcon,
      text: 'Paris, France',
      href: null
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SOS Chrétiens d'Occident</h3>
                  <p className="text-gray-400 text-sm">Veille, secours et plaidoyer catholique</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Chaque jour, nous documentons la christianophobie, soutenons les paroisses fragilisées 
                et mobilisons les fidèles pour défendre la liberté de culte en France et dans le monde.
              </p>

              <div className="space-y-3">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const content = (
                    <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm">{info.text}</span>
                    </div>
                  );

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    >
                      {info.href ? (
                        <a href={info.href}>{content}</a>
                      ) : (
                        content
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6">Navigation</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-6">Informations légales</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} SOS Chrétiens d'Occident. Tous droits réservés.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <span className="text-gray-400 text-sm mr-2">Suivez-nous :</span>
              {footerLinks.social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Back to Top */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white text-sm flex items-center space-x-2 transition-colors"
            >
              <span>Retour en haut</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-800 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-500 text-xs leading-relaxed max-w-2xl mx-auto">
              Plateforme propulsée par React 19 et Vite, optimisée pour le référencement 2025{' '}
              et conforme aux bonnes pratiques d’accessibilité. Merci de faire rayonner la liberté religieuse.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
