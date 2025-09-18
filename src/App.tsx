import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { ArticleFeed } from './components/ArticleFeed';
import { Membership } from './components/Membership';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MembershipModal } from './components/MembershipModal';
import { Seo } from './components/Seo';
import { HeavenRadioHeader } from './components/HeavenRadioHeader';
import { ArticlePage } from './pages/ArticlePage';
import MentionsLegales from './pages/legal/MentionsLegales';
import PolitiqueConfidentialite from './pages/legal/PolitiqueConfidentialite';
import ConditionsUtilisation from './pages/legal/ConditionsUtilisation';
import PlanSite from './pages/legal/PlanSite';
import articlesData from './data/articles.json';
import { getCanonicalUrl, SITE_URL } from './lib/seo';

function HomePage() {
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);

  const openMembershipModal = () => {
    setIsMembershipModalOpen(true);
  };

  const closeMembershipModal = () => {
    setIsMembershipModalOpen(false);
  };

  const scrollToArticles = () => {
    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="SOS Chrétiens d'Occident | Association catholique contre la christianophobie"
        description="SOS Chrétiens d'Occident documente les attaques anti-chrétiennes, accompagne les victimes et mobilise les catholiques pour défendre la liberté religieuse en France et dans le monde."
        keywords={[
          'christianophobie',
          'SOS Chrétiens d\'Occident',
          'association catholique',
          'liberté religieuse',
          'persécution des chrétiens',
        ]}
        canonical={getCanonicalUrl('/')}
        openGraph={{
          title: "SOS Chrétiens d'Occident | Association catholique contre la christianophobie",
          description:
            "Documenter la christianophobie, soutenir les communautés persécutées et mobiliser les catholiques en France et dans le monde.",
          type: 'website',
          url: getCanonicalUrl('/'),
          image: `${SITE_URL}/logo.png`,
          siteName: "SOS Chrétiens d'Occident",
          locale: 'fr_FR',
        }}
        twitter={{
          card: 'summary_large_image',
          title: "SOS Chrétiens d'Occident",
          description:
            "Association catholique engagée contre la christianophobie et pour la défense des chrétiens persécutés.",
          image: `${SITE_URL}/logo.png`,
        }}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'NGO',
            name: "SOS Chrétiens d'Occident",
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            contactPoint: [
              {
                '@type': 'ContactPoint',
                email: 'catholicloungemusic@gmail.com',
                contactType: 'Service adhérents',
                areaServed: 'FR',
                availableLanguage: ['fr'],
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: "SOS Chrétiens d'Occident",
            url: SITE_URL,
          },
        ]}
      />
      {/* Hero Section */}
      <Hero onJoinClick={openMembershipModal} onScrollToArticles={scrollToArticles} />
      
      {/* Articles Section */}
      <section
        id="articles"
        className="py-20"
        style={{ scrollMarginTop: 'var(--heaven-header-height, 112px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Actualités de la défense des chrétiens
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Enquêtes, reportages et analyses exclusives sur la christianophobie, 
              la liberté religieuse et l'engagement des communautés catholiques.
            </p>
          </div>
          <ArticleFeed articles={articlesData} />
        </div>
      </section>

      {/* Membership Section */}
      <Membership />

      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
      
      {/* Membership Modal */}
      <MembershipModal 
        isOpen={isMembershipModalOpen} 
        onClose={closeMembershipModal} 
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <HeavenRadioHeader />
      <div style={{ paddingTop: 'var(--heaven-header-height, 112px)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
          <Route path="/plan-site" element={<PlanSite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
