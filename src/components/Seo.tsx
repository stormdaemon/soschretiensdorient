import { useEffect } from 'react';

type OpenGraphConfig = {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  image?: string;
  siteName?: string;
  locale?: string;
};

type TwitterCardConfig = {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
  creator?: string;
};

export interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noIndex?: boolean;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterCardConfig;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const joinKeywords = (keywords?: string[]) =>
  keywords?.map((keyword) => keyword.trim()).filter(Boolean).join(', ');

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  canonical,
  noIndex,
  openGraph,
  twitter,
  structuredData,
}) => {
  const keywordsContent = joinKeywords(keywords);
  const ogString = JSON.stringify(openGraph ?? {});
  const twitterString = JSON.stringify(twitter ?? {});
  const structuredString = JSON.stringify(structuredData ?? null);

  useEffect(() => {
    const managedNodes: Element[] = [];
    const previousContent: Array<{ element: Element; attribute: string; value: string | null }>= [];

    const upsertMeta = (attribute: 'name' | 'property', value: string, content: string) => {
      const selector = `meta[${attribute}="${value}"]`;
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        element.setAttribute('data-managed', 'seo');
        document.head.appendChild(element);
        managedNodes.push(element);
      } else if (!managedNodes.includes(element)) {
        previousContent.push({ element, attribute: 'content', value: element.getAttribute('content') });
      }

      element.setAttribute('content', content);
    };

    const upsertLink = (rel: string, href: string) => {
      const selector = `link[rel="${rel}"]`;
      let element = document.head.querySelector(selector) as HTMLLinkElement | null;

      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('data-managed', 'seo');
        document.head.appendChild(element);
        managedNodes.push(element);
      } else if (!managedNodes.includes(element)) {
        previousContent.push({ element, attribute: 'href', value: element.getAttribute('href') });
      }

      element.setAttribute('href', href);
    };

    const applyStructuredData = (data: Record<string, unknown> | Record<string, unknown>[]) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-managed', 'seo');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      managedNodes.push(script);
    };

    const previousTitle = document.title;
    if (title) {
      document.title = title;
    }

    upsertMeta('name', 'description', description);

    if (keywordsContent) {
      upsertMeta('name', 'keywords', keywordsContent);
    }

    if (typeof canonical === 'string' && canonical.length > 0) {
      upsertLink('canonical', canonical);
    }

    if (noIndex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      upsertMeta('name', 'robots', 'index, follow');
    }

    if (openGraph) {
      if (openGraph.title) upsertMeta('property', 'og:title', openGraph.title);
      if (openGraph.description) upsertMeta('property', 'og:description', openGraph.description);
      if (openGraph.type) upsertMeta('property', 'og:type', openGraph.type);
      if (openGraph.url) upsertMeta('property', 'og:url', openGraph.url);
      if (openGraph.image) upsertMeta('property', 'og:image', openGraph.image);
      if (openGraph.siteName) upsertMeta('property', 'og:site_name', openGraph.siteName);
      if (openGraph.locale) upsertMeta('property', 'og:locale', openGraph.locale);
    }

    if (twitter) {
      const twitterCard = twitter.card ?? 'summary_large_image';
      upsertMeta('name', 'twitter:card', twitterCard);
      if (twitter.title) upsertMeta('name', 'twitter:title', twitter.title);
      if (twitter.description) upsertMeta('name', 'twitter:description', twitter.description);
      if (twitter.image) upsertMeta('name', 'twitter:image', twitter.image);
      if (twitter.creator) upsertMeta('name', 'twitter:creator', twitter.creator);
    }

    if (structuredData) {
      applyStructuredData(structuredData);
    }

    return () => {
      document.title = previousTitle;
      managedNodes.forEach((node) => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });

      previousContent.forEach(({ element, attribute, value }) => {
        if (value === null) {
          element.removeAttribute(attribute);
        } else {
          element.setAttribute(attribute, value);
        }
      });
    };
  }, [title, description, keywordsContent, canonical, noIndex, ogString, twitterString, structuredString]);

  return null;
};

export default Seo;
