
import React from 'react';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: 'website' | 'article';
}

export const SEOMeta: React.FC<SEOMetaProps> = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  type = 'website' 
}) => {
  React.useEffect(() => {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', description);

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', keywords || 'teste de digitação, speed test, ppm');

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || window.location.href);

    // social tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

  }, [title, description, keywords, canonical]);

  return null;
};

export const JSONLD: React.FC<{ data: any }> = ({ data }) => {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
};
