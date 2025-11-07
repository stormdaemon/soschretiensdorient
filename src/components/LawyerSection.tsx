import { ScaleIcon } from '@heroicons/react/24/outline';

export function LawyerSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <ScaleIcon className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Notre Conseil Juridique
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un engagement au service de la défense des chrétiens
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Photo */}
              <div className="relative h-96 md:h-full">
                <img
                  src="https://www.valeursactuelles.com/assets/uploads/2019/10/170090_10150125055208013_4812989_o.jpg"
                  alt="Maître Frédéric Pichon"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenu */}
              <div className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Maître Frédéric Pichon
                </h3>
                <p className="text-lg text-red-600 font-semibold mb-6">
                  Avocat au Barreau de Paris
                </p>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    SOS Chrétiens d'Occident a l'honneur de travailler avec <strong>Maître Frédéric Pichon</strong>,
                    avocat au Barreau de Paris depuis 1998, dont le cabinet est spécialisé en droit pénal et droit du travail.
                  </p>

                  <p>
                    Profondément engagé dans la défense des valeurs catholiques, Maître Pichon est le fondateur
                    de l'association <strong>EUROPAE GENTES</strong> et co-fondateur du <strong>Collectif des avocats
                    contre la répression policière et idéologique</strong>.
                  </p>

                  <p>
                    Il s'est notamment illustré dans la défense des militants de <strong>La Manif pour Tous</strong> et
                    du <strong>Printemps Français</strong> lors de la lutte contre la loi Taubira, démontrant son engagement
                    indéfectible pour la liberté religieuse et les valeurs chrétiennes.
                  </p>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 italic">
                      "La défense des chrétiens et de leurs libertés fondamentales est un combat de tous les instants
                      qui nécessite un engagement personnel et professionnel sans faille."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
