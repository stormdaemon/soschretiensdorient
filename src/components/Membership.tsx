import React from 'react';

export const Membership: React.FC = () => {
  return (
    <section id="adhesion" className="py-20 bg-gray-50 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Amplifiez la défense des chrétiens menacés
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre adhésion finance les missions de terrain, la sensibilisation du public et le plaidoyer pour la liberté religieuse.
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-8">
            Composant Membership simplifié - Version de test
          </p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Adhérer maintenant
          </button>
        </div>
      </div>
    </section>
  );
};
