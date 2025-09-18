import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import articlesData from '../data/articles.json';
import { Footer } from '../components/Footer';
import { Seo } from '../components/Seo';
import { Article } from '../types';
import { getCanonicalUrl, SITE_URL } from '../lib/seo';

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const articles = articlesData as Article[];
  const article = articles.find((a) => a.id === id);

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

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Seo
          title="Article introuvable | SOS Chrétiens d'Occident"
          description="L’article que vous tentez d’ouvrir n’existe plus ou a été déplacé sur SOS Chrétiens d'Occident."
          canonical={getCanonicalUrl('/articles')}
          noIndex
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">Le contenu que vous cherchez n’est plus disponible ou a été déplacé.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Utilisation du contenu enrichi s'il existe, sinon contenu de base
  const getArticleContent = (article: Article) => {
    if (article.content && article.content.length > 0) {
      return article.content;
    }
    
    // Contenu de fallback si pas de contenu enrichi
    return [
      `Cette enquête illustre la pression croissante exercée sur les communautés chrétiennes. ${article.summary}`,
      `SOS Chrétiens d'Occident appelle à une vigilance accrue des pouvoirs publics et des fidèles afin de protéger la liberté religieuse et de soutenir les victimes.`
    ];
  };
  
  const articleContent = getArticleContent(article);
  const canonicalUrl = getCanonicalUrl(`/articles/${article.id}`);
  const keywords = Array.from(new Set([...(article.tags ?? []), 'christianophobie', "SOS Chrétiens d'Occident"]));

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={`${article.title} | SOS Chrétiens d'Occident`}
        description={article.summary}
        keywords={keywords}
        canonical={canonicalUrl}
        openGraph={{
          title: `${article.title} | SOS Chrétiens d'Occident`,
          description: article.summary,
          type: 'article',
          url: canonicalUrl,
          image: `${SITE_URL}/logo.png`,
          siteName: "SOS Chrétiens d'Occident",
          locale: 'fr_FR',
        }}
        twitter={{
          card: 'summary_large_image',
          title: article.title,
          description: article.summary,
          image: `${SITE_URL}/logo.png`,
        }}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.summary,
          datePublished: article.publishedAt,
          author: {
            '@type': 'Organization',
            name: article.author || "SOS Chrétiens d'Occident",
          },
          publisher: {
            '@type': 'Organization',
            name: "SOS Chrétiens d'Occident",
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/logo.png`,
            },
          },
          mainEntityOfPage: canonicalUrl,
        }}
      />
      {/* Header avec navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-28 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Retour aux articles
          </Link>
        </div>
      </header>

      {/* Contenu de l'article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête de l'article */}
        <header className="mb-12">
          <div className="mt-4 flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center text-gray-600 text-sm">
            <span className="font-medium">SOS Chrétiens d'Occident</span>
            <span className="mx-2">•</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{article.readTime || '5 min de lecture'}</span>
          </div>
        </header>

        {/* Corps de l'article */}
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Background coloré au lieu d'une image */}
          <div className="mb-8">
            <div className={`w-full h-64 bg-gradient-to-br ${getGradientFromId(article.id)} rounded-lg shadow-lg flex items-center justify-center`}>
              <div className="text-center text-white px-6">
                <svg className="w-20 h-20 mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h2 className="text-2xl font-bold opacity-95 leading-tight">
                  {article.title}
                </h2>
              </div>
            </div>
          </div>
          
          {/* Contenu enrichi */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contexte et enjeux</h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {article.summary}
            </p>
          </div>
          
          {articleContent.map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg" dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
          
          {/* Lien vers l'article source */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Source originale</h3>
            <p className="text-gray-600 mb-4">
              Cet article est basé sur des informations provenant de sources fiables. 
              Consultez l'article original pour plus de détails.
            </p>
            <a 
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              Lire l'article source
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Call-to-action en fin d'article */}
        <div className="mt-16 p-8 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Rejoignez notre mission
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Ensemble, défendons les valeurs chrétiennes et luttons contre la christianophobie 
              en Occident et dans le monde.
            </p>
            <Link 
              to="/#adhesion" 
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
            >
              Nous rejoindre
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
