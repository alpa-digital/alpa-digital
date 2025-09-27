// Performance optimization utility
export const optimizeImage = (src: string, alt: string, width?: number, height?: number) => ({
  src,
  alt,
  loading: 'lazy' as const,
  width,
  height,
  decoding: 'async' as const,
});

// SEO utility functions
export const generateStructuredData = (type: string, data: any) => {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
};

export const addJsonLd = (data: any, id: string) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.innerHTML = JSON.stringify(data);
  document.head.appendChild(script);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload hero image
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = '/src/assets/new-phone-mockup.png';
  link.as = 'image';
  document.head.appendChild(link);
};