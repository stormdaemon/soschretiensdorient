import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, MapIcon, HomeIcon, DocumentTextIcon, UserGroupIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../../components/Seo';
import { getCanonicalUrl } from '../../lib/seo';

const PlanSite: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const siteStructure = [
    {
      title: 'Accueil',
      icon: HomeIcon,
      href: '/',
      description: 'Page d\'accueil du site',
      sections: [
        { name: 'Hero - Présentation', href: '#hero' },
        { name: 'Articles récents', href: '#articles' },
        { name: 'Adhésion', href: '#membership' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Articles',
      icon: DocumentTextIcon,
      href: '/#articles',
      description: 'Dernières analyses et veilles christianophobie',
      sections: [
        { name: 'Article en vedette', href: '/#articles' },
        { name: 'Navigation par pastilles', href: '/#articles' }
      ]
    },
    {
      title: 'Adhésion',
      icon: UserGroupIcon,
      href: '#membership',
      description: 'Rejoindre notre association',
      sections: [
        { name: 'Formulaire d\'adhésion', href: '#membership' },
        { name: 'Avantages membres', href: '#membership' }
      ]
    },
    {
      title: 'Contact',
      icon: EnvelopeIcon,
      href: '#contact',
      description: 'Nous contacter',
      sections: [
        { name: 'Formulaire de contact', href: '#contact' },
        { name: 'Informations de contact', href: '#contact' }
      ]
    }
  ];

  const legalPages = [
    {
      title: 'Mentions légales',
      href: '/mentions-legales',
      description: 'Informations légales sur l\'association'
    },
    {
      title: 'Politique de confidentialité',
      href: '/politique-confidentialite',
      description: 'Protection de vos données personnelles'
    },
    {
      title: 'Conditions d\'utilisation',
      href: '/conditions-utilisation',
      description: 'Règles d\'utilisation du site'
    },
    {
      title: 'Plan du site',
      href: '/plan-site',
      description: 'Architecture et navigation du site'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Seo
        title="Plan du site | SOS Chrétiens d'Occident"
        description="Plan du site de SOS Chrétiens d'Occident : accédez rapidement aux articles, aux informations d’adhésion et aux ressources légales."
        canonical={getCanonicalUrl('/plan-site')}
        keywords={['plan du site', "SOS Chrétiens d'Occident", 'navigation', 'structure du site']}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={goBack}
            className="flex items-center text-red-600 hover:text-red-700 mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Retour
          </button>
          <div className="flex items-center mb-4">
            <MapIcon className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Plan du site</h1>
          </div>
          <p className="text-lg text-gray-600">
            Architecture et navigation du site SOS Chrétiens d'Occident
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pages principales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <HomeIcon className="w-6 h-6 text-red-600 mr-2" />
              Pages principales
            </h2>
            
            <div className="space-y-6">
              {siteStructure.map((page, index) => {
                const IconComponent = page.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="border-l-4 border-red-600 pl-4"
                  >
                    <div className="flex items-center mb-2">
                      <IconComponent className="w-5 h-5 text-red-600 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        <a 
                          href={page.href} 
                          className="hover:text-red-600 transition-colors"
                        >
                          {page.title}
                        </a>
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{page.description}</p>
                    
                    <ul className="space-y-1">
                      {page.sections.map((section, sectionIndex) => (
                        <li key={sectionIndex}>
                          <a 
                            href={section.href}
                            className="text-sm text-gray-500 hover:text-red-600 transition-colors block py-1"
                          >
                            → {section.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Pages légales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <DocumentTextIcon className="w-6 h-6 text-red-600 mr-2" />
              Pages légales
            </h2>
            
            <div className="space-y-4">
              {legalPages.map((page, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <a 
                      href={page.href} 
                      className="hover:text-red-600 transition-colors"
                    >
                      {page.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 text-sm">{page.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Informations supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Informations sur le site</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">4</div>
              <div className="text-sm text-gray-600">Pages principales</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">4</div>
              <div className="text-sm text-gray-600">Pages légales</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Accessible</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Navigation</h3>
            <p className="text-blue-800 text-sm">
              Ce site est conçu pour être facilement navigable. Utilisez le menu principal 
              pour accéder aux différentes sections, ou les liens du footer pour les pages légales. 
              Toutes les pages sont accessibles en quelques clics depuis l'accueil.
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-medium text-green-900 mb-2">Accessibilité</h3>
            <p className="text-green-800 text-sm">
              Le site respecte les standards d'accessibilité web (WCAG 2.1) et est optimisé 
              pour tous les appareils (ordinateurs, tablettes, smartphones). 
              Les contenus sont structurés pour faciliter la navigation au clavier et avec les lecteurs d'écran.
            </p>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="bg-red-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-900 mb-2">Besoin d'aide ?</h3>
            <p className="text-red-800 text-sm mb-4">
              Si vous ne trouvez pas ce que vous cherchez ou si vous avez des questions 
              sur la navigation du site, n'hésitez pas à nous contacter.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              Nous contacter
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanSite;