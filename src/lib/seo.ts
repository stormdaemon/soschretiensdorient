export const SITE_URL = 'https://soschretiensdoccident.fr';

export const getCanonicalUrl = (path = '/') => {
  if (typeof window !== 'undefined') {
    const url = new URL(path, window.location.origin);
    return url.toString();
  }

  return new URL(path, SITE_URL).toString();
};
