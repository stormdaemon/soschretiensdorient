import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../../components/Seo';
import { getCanonicalUrl } from '../../lib/seo';

const PolitiqueConfidentialite: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Seo
        title="Politique de confidentialité | SOS Chrétiens d'Occident"
        description="Découvrez comment SOS Chrétiens d'Occident collecte, sécurise et utilise vos données personnelles dans le respect du RGPD."
        canonical={getCanonicalUrl('/politique-confidentialite')}
        keywords={['politique de confidentialité', "SOS Chrétiens d'Occident", 'données personnelles', 'RGPD']}
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
            <ShieldCheckIcon className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Politique de confidentialité</h1>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Cette politique explique comment SOS Chrétiens d'Occident traite et sécurise les informations confiées par ses membres, donateurs et visiteurs.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                L'association PAROLE ET PARTAGE, éditrice du site SOS Chrétiens d'Occident, 
                s'engage à protéger la confidentialité et la sécurité des données personnelles 
                de ses utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p>
                Cette politique de confidentialité vous informe sur la manière dont nous collectons, 
                utilisons, stockons et protégeons vos données personnelles.
              </p>
            </div>
          </section>

          {/* Responsable du traitement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Responsable du traitement</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Association :</strong> PAROLE ET PARTAGE</p>
              <p><strong>SIREN :</strong> 841 890 692</p>
              <p><strong>Adresse :</strong> 1 RUE DE STOCKHOLM, 75008 PARIS</p>
              <p><strong>Contact :</strong> catholicloungemusic@gmail.com</p>
            </div>
          </section>

          {/* Données collectées */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Données collectées</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-medium text-gray-900">Données de navigation</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Adresse IP</li>
                <li>Type de navigateur et version</li>
                <li>Pages visitées et durée de visite</li>
                <li>Référent (site d'où vous venez)</li>
                <li>Système d'exploitation</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6">Données de contact (si vous nous contactez)</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Message et contenu des échanges</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6">Données d'adhésion (si vous adhérez)</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Informations d'identité</li>
                <li>Coordonnées postales</li>
                <li>Informations de paiement (traitées par des prestataires sécurisés)</li>
              </ul>
            </div>
          </section>

          {/* Finalités du traitement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Finalités du traitement</h2>
            <div className="space-y-4 text-gray-700">
              <p>Nous utilisons vos données personnelles pour :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Assurer le fonctionnement et l'amélioration du site</li>
                <li>Répondre à vos demandes de contact</li>
                <li>Gérer les adhésions à l'association</li>
                <li>Vous informer de nos activités (avec votre consentement)</li>
                <li>Respecter nos obligations légales</li>
                <li>Analyser l'audience du site (données anonymisées)</li>
              </ul>
            </div>
          </section>

          {/* Base légale */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base légale du traitement</h2>
            <div className="space-y-4 text-gray-700">
              <p>Le traitement de vos données repose sur :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Intérêt légitime :</strong> pour le fonctionnement du site et l'analyse d'audience</li>
                <li><strong>Exécution d'un contrat :</strong> pour la gestion des adhésions</li>
                <li><strong>Consentement :</strong> pour l'envoi d'informations par email</li>
                <li><strong>Obligation légale :</strong> pour la conservation de certaines données</li>
              </ul>
            </div>
          </section>

          {/* Conservation des données */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conservation des données</h2>
            <div className="space-y-4 text-gray-700">
              <p>Nous conservons vos données personnelles pendant :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                <li><strong>Données de contact :</strong> 3 ans après le dernier échange</li>
                <li><strong>Données d'adhésion :</strong> durée de l'adhésion + 5 ans (obligations comptables)</li>
              </ul>
            </div>
          </section>

          {/* Vos droits */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vos droits</h2>
            <div className="space-y-4 text-gray-700">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Droit d'accès :</strong> connaître les données que nous détenons sur vous</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : <strong>catholicloungemusic@gmail.com</strong>
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Notre site utilise des cookies techniques nécessaires au fonctionnement du site. 
                Ces cookies ne nécessitent pas votre consentement.
              </p>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies, 
                mais cela peut affecter le fonctionnement du site.
              </p>
            </div>
          </section>

          {/* Sécurité */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sécurité</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données personnelles contre la perte, l'utilisation abusive, 
                l'accès non autorisé, la divulgation, l'altération ou la destruction.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Cette politique de confidentialité peut être modifiée. 
                Toute modification sera publiée sur cette page avec la date de mise à jour.
              </p>
              <p><strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Pour toute question concernant cette politique de confidentialité 
                ou le traitement de vos données personnelles :
              </p>
              <p><strong>Email :</strong> catholicloungemusic@gmail.com</p>
              <p>
                Vous avez également le droit de déposer une plainte auprès de la CNIL 
                (Commission Nationale de l'Informatique et des Libertés) si vous estimez 
                que le traitement de vos données personnelles constitue une violation du RGPD.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;