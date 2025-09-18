import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../../components/Seo';
import { getCanonicalUrl } from '../../lib/seo';

const ConditionsUtilisation: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Seo
        title="Conditions d'utilisation | SOS Chrétiens d'Occident"
        description="Conditions d’utilisation du site de SOS Chrétiens d'Occident : modalités d’accès, responsabilités et bonnes pratiques pour les visiteurs."
        canonical={getCanonicalUrl('/conditions-utilisation')}
        keywords={["conditions d'utilisation", "SOS Chrétiens d'Occident", 'règles du site', 'responsabilités utilisateur']}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <DocumentTextIcon className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Conditions d'utilisation du site</h1>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Ce document précise les modalités de consultation du site de SOS Chrétiens d'Occident, vos engagements en tant qu’utilisateur
            et les responsabilités de l’association.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Acceptation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptation des conditions</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                En accédant et en utilisant le site SOS Chrétiens d'Occident, vous acceptez 
                d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas 
                ces conditions, veuillez ne pas utiliser ce site.
              </p>
              <p>
                Ces conditions peuvent être modifiées à tout moment. Il est de votre responsabilité 
                de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
              </p>
            </div>
          </section>

          {/* Description du service */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description du service</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                SOS Chrétiens d'Occident est un site web édité par l'association PAROLE ET PARTAGE, 
                qui a pour mission de défendre et promouvoir les valeurs chrétiennes en Occident.
              </p>
              <p>Le site propose :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Des articles et analyses sur l'actualité</li>
                <li>Des informations sur les activités de l'association</li>
                <li>La possibilité d'adhérer à l'association</li>
                <li>Un moyen de contact avec l'équipe</li>
              </ul>
            </div>
          </section>

          {/* Utilisation acceptable */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Utilisation acceptable</h2>
            <div className="space-y-4 text-gray-700">
              <p>En utilisant ce site, vous vous engagez à :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Respecter les lois et réglementations en vigueur</li>
                <li>Ne pas porter atteinte aux droits de tiers</li>
                <li>Ne pas diffuser de contenu illégal, diffamatoire ou offensant</li>
                <li>Ne pas tenter de compromettre la sécurité du site</li>
                <li>Ne pas utiliser le site à des fins commerciales non autorisées</li>
                <li>Respecter les droits de propriété intellectuelle</li>
              </ul>
            </div>
          </section>

          {/* Contenu utilisateur */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contenu utilisateur</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Si vous soumettez du contenu sur le site (commentaires, messages, etc.), 
                vous garantissez que :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vous détenez tous les droits nécessaires sur ce contenu</li>
                <li>Le contenu ne viole aucun droit de tiers</li>
                <li>Le contenu respecte nos valeurs et notre ligne éditoriale</li>
              </ul>
              <p>
                Nous nous réservons le droit de modérer, modifier ou supprimer tout contenu 
                qui ne respecterait pas ces conditions.
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Propriété intellectuelle</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Tous les contenus présents sur ce site (textes, images, logos, design, etc.) 
                sont protégés par les droits de propriété intellectuelle et appartiennent à 
                l'association PAROLE ET PARTAGE ou à ses partenaires.
              </p>
              <p>
                Toute reproduction, distribution, modification ou utilisation commerciale 
                de ces contenus est interdite sans autorisation écrite préalable.
              </p>
              <p>
                Vous pouvez partager nos articles en citant la source et en incluant 
                un lien vers le site original.
              </p>
            </div>
          </section>

          {/* Disponibilité du service */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disponibilité du service</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nous nous efforçons de maintenir le site accessible 24h/24 et 7j/7, 
                mais nous ne pouvons garantir une disponibilité continue.
              </p>
              <p>
                Le site peut être temporairement indisponible pour des raisons de maintenance, 
                de mise à jour ou de problèmes techniques indépendants de notre volonté.
              </p>
            </div>
          </section>

          {/* Limitation de responsabilité */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation de responsabilité</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                L'association PAROLE ET PARTAGE ne peut être tenue responsable :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
                <li>Des interruptions de service ou des dysfonctionnements techniques</li>
                <li>De la perte de données ou d'informations</li>
                <li>Des contenus publiés par des tiers</li>
                <li>Des liens vers des sites externes</li>
              </ul>
              <p>
                Les informations publiées sur le site sont fournies à titre informatif 
                et peuvent contenir des inexactitudes. Nous nous efforçons de maintenir 
                des informations exactes et à jour.
              </p>
            </div>
          </section>

          {/* Liens externes */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Liens externes</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Notre site peut contenir des liens vers des sites web externes. 
                Ces liens sont fournis pour votre commodité et ne constituent pas 
                une approbation du contenu de ces sites.
              </p>
              <p>
                Nous ne sommes pas responsables du contenu, des politiques de confidentialité 
                ou des pratiques des sites web externes.
              </p>
            </div>
          </section>

          {/* Données personnelles */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Données personnelles</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Le traitement de vos données personnelles est régi par notre 
                Politique de confidentialité, qui fait partie intégrante des présentes conditions.
              </p>
              <p>
                En utilisant le site, vous consentez au traitement de vos données 
                conformément à cette politique.
              </p>
            </div>
          </section>

          {/* Résiliation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Résiliation</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nous nous réservons le droit de suspendre ou de résilier votre accès 
                au site à tout moment, sans préavis, en cas de violation de ces conditions.
              </p>
              <p>
                Vous pouvez cesser d'utiliser le site à tout moment.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Droit applicable</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Les présentes conditions d'utilisation sont régies par le droit français. 
                Tout litige sera soumis à la compétence exclusive des tribunaux français.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <p><strong>Email :</strong> catholicloungemusic@gmail.com</p>
              <p><strong>Adresse :</strong> PAROLE ET PARTAGE, 1 RUE DE STOCKHOLM, 75008 PARIS</p>
              <p><strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default ConditionsUtilisation;
