import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../../components/Seo';
import { getCanonicalUrl } from '../../lib/seo';

const MentionsLegales: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Seo
        title="Mentions légales | SOS Chrétiens d'Occident"
        description="Informations légales, coordonnées et obligations réglementaires de l’association SOS Chrétiens d'Occident."
        canonical={getCanonicalUrl('/mentions-legales')}
        keywords={["mentions légales", "SOS Chrétiens d'Occident", 'association catholique', 'informations légales']}
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentions légales de SOS Chrétiens d'Occident</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Retrouvez ici l’ensemble des informations officielles relatives à notre association catholique de défense des chrétiens persécutés.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Éditeur du site */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Éditeur du site</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Dénomination :</strong> PAROLE ET PARTAGE</p>
              <p><strong>Forme juridique :</strong> Association déclarée</p>
              <p><strong>Date de création :</strong> 13/08/2018</p>
              <p><strong>Directeur de publication :</strong> Responsable communication de SOS Chrétiens d'Occident</p>
            </div>
          </section>

          {/* Identification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Identification</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>SIREN :</strong> 841 890 692</p>
              <p><strong>SIRET du siège social :</strong> 841 890 692 00012</p>
              <p><strong>N° TVA Intracommunautaire :</strong> Pas de n° TVA valide connu</p>
              <p><strong>N° EORI :</strong> Pas de n° EORI valide</p>
            </div>
          </section>

          {/* Activité */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Activité</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Activité principale (NAF/APE) :</strong> Autres organisations fonctionnant par adhésion volontaire</p>
              <p><strong>Code NAF/APE :</strong> 94.99Z</p>
            </div>
          </section>

          {/* Adresse */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adresse</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Adresse postale :</strong></p>
              <p>1 RUE DE STOCKHOLM</p>
              <p>75008 PARIS</p>
            </div>
          </section>

          {/* Structure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Structure</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Effectif salarié :</strong> Non renseigné</p>
              <p><strong>Taille de la structure :</strong> Non renseigné</p>
            </div>
          </section>

          {/* Hébergement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hébergement</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                Ce site est hébergé par un prestataire européen respectant les normes de sécurité, de disponibilité et de protection des données
                imposées aux associations loi 1901.
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Propriété intellectuelle</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite 
                sauf autorisation écrite du directeur de la publication. Toute citation doit mentionner explicitement la source « SOS Chrétiens d'Occident ».
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation de responsabilité</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p>
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p>Pour toute question concernant ces mentions légales, vous pouvez nous contacter :</p>
              <p><strong>Email :</strong> catholicloungemusic@gmail.com</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default MentionsLegales;