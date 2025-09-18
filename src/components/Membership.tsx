import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface MembershipPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const plans: MembershipPlan[] = [
  {
    name: 'Adhésion Découverte',
    price: 45,
    description: 'Pour rejoindre le réseau de veilleurs et suivre nos alertes terrain.',
    features: [
      'Veille hebdomadaire sur la christianophobie en France et à l’international',
      'Accès illimité à nos dossiers et fiches d’analyse',
      'Participation aux webinaires de prière et de sensibilisation',
      'Invitation à la réunion annuelle de présentation des actions',
    ],
  },
  {
    name: 'Adhésion Défenseur',
    price: 125,
    description: 'Pour soutenir activement nos missions d’enquête et de soutien aux victimes.',
    features: [
      'Tous les avantages Découverte',
      'Briefings trimestriels en direct avec l’équipe terrain',
      'Accès prioritaire aux formations de plaidoyer',
      'Rapport détaillé sur l’impact des missions financées',
      'Accompagnement pour organiser une veillée locale',
    ],
    highlighted: true,
  },
  {
    name: 'Adhésion Ambassadeur',
    price: 480,
    description: 'Pour co-construire nos actions stratégiques et porter notre plaidoyer.',
    features: [
      'Tous les avantages Défenseur',
      'Participation aux consultations stratégiques annuelles',
      'Rencontre privée avec la direction de l’association',
      'Suivi personnalisé des projets soutenus et accès VIP aux événements',
      'Mention (optionnelle) dans notre rapport d’impact annuel',
    ],
  },
];

const faqItems = [
  {
    question: "Comment est utilisée mon adhésion ?",
    answer:
      "Chaque adhésion finance la veille de la christianophobie, l’accompagnement des victimes et la production de contenus pédagogiques diffusés gratuitement.",
  },
  {
    question: "Puis-je changer de formule en cours d’année ?",
    answer:
      "Oui, il suffit de nous contacter pour passer à un niveau d’engagement supérieur ou inférieur. Nous ajusterons la cotisation au prorata.",
  },
  {
    question: "Les montants sont-ils déductibles des impôts ?",
    answer:
      "SOS Chrétiens d’Occident est une association reconnue d’intérêt général : vous recevez un reçu fiscal permettant de déduire 66 % de votre adhésion.",
  },
  {
    question: "Comment suivre concrètement l’impact ?",
    answer:
      "Nos membres reçoivent des rapports réguliers, des invitations à des rencontres en ligne et des accès privilégiés aux missions pour mesurer l’impact réel.",
  },
];

export const Membership: React.FC = () => {
  return (
    <section id="adhesion" className="py-20 bg-gray-50 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Amplifiez la défense des chrétiens menacés
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre adhésion finance les missions de terrain, la sensibilisation du public et le plaidoyer pour la liberté religieuse.
          </p>
        </div>

        {/* Plans tarifaires */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.highlighted ? 'ring-2 ring-red-600 scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm font-semibold">
                  Le plus populaire
                </div>
              )}
              
              <div className={`p-8 ${plan.highlighted ? 'pt-12' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}€
                  </span>
                  <span className="text-gray-600 ml-2">/an</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="#"
                  rel="nofollow noopener"
                  className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Rejoindre le programme
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tableau comparatif */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-20">
          <div className="px-8 py-6 bg-gray-50 border-b">
            <h3 className="text-2xl font-bold text-gray-900">
              Comparaison détaillée des plans
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-8 font-semibold text-gray-900">
                    Avantages
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Simple
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 bg-red-50">
                    Soutien
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Mécénat
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Veille hebdomadaire et ressources documentaires',
                  'Webinaires mensuels de sensibilisation',
                  'Briefings trimestriels avec nos équipes',
                  'Formations plaidoyer en priorité',
                  'Rapports détaillés sur l’impact des missions',
                  'Accompagnement pour événements locaux',
                  'Consultations stratégiques annuelles',
                  'Rencontre avec la direction',
                  'Accès VIP aux événements solidaires'
                ].map((feature, index) => {
                  const availability = [
                    [true, true, true],
                    [true, true, true],
                    [false, true, true],
                    [false, true, true],
                    [false, true, true],
                    [false, true, true],
                    [false, false, true],
                    [false, false, true],
                    [false, false, true],
                  ];
                  
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-8 text-gray-700">{feature}</td>
                      <td className="text-center py-4 px-4">
                        {availability[index][0] ? (
                          <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4 bg-red-50">
                        {availability[index][1] ? (
                          <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {availability[index][2] ? (
                          <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 bg-gray-50 border-b">
            <h3 className="text-2xl font-bold text-gray-900">
              Questions fréquentes
            </h3>
          </div>
          
          <div className="p-8">
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.question}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
