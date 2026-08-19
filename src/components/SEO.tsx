import { useEffect } from 'react';
import { candidateConfig } from '../config/candidate.js';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  useEffect(() => {
    // Page Title
    const fullTitle = `${title} | ${candidateConfig.name} - ${candidateConfig.targetRole}`;
    document.title = fullTitle;

    // Meta Description
    const metaDesc = description || candidateConfig.hero.subtitle;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', metaDesc);

    // Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', fullTitle);
    if (!ogTitle.parentNode) document.head.appendChild(ogTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    ogDesc.setAttribute('content', metaDesc);
    if (!ogDesc.parentNode) document.head.appendChild(ogDesc);

    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', image || 'https://via.placeholder.com/1200x630.png?text=Mariana+Souza+2026');
    if (!ogImage.parentNode) document.head.appendChild(ogImage);

    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', url || window.location.href);
    if (!ogUrl.parentNode) document.head.appendChild(ogUrl);

    // Twitter Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]') || document.createElement('meta');
    twTitle.setAttribute('name', 'twitter:title');
    twTitle.setAttribute('content', fullTitle);
    if (!twTitle.parentNode) document.head.appendChild(twTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]') || document.createElement('meta');
    twDesc.setAttribute('name', 'twitter:description');
    twDesc.setAttribute('content', metaDesc);
    if (!twDesc.parentNode) document.head.appendChild(twDesc);

  }, [title, description, image, url]);

  return null;
}
