import { Article } from "@shared/schema";

export interface SEOData {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}

export const updatePageSEO = (seoData: SEOData) => {
  // Update title
  document.title = seoData.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', seoData.description);

  // Update OpenGraph tags
  updateOGTag('og:title', seoData.ogTitle || seoData.title);
  updateOGTag('og:description', seoData.ogDescription || seoData.description);
  
  if (seoData.ogUrl) {
    updateOGTag('og:url', seoData.ogUrl);
  }
  
  if (seoData.ogImage) {
    updateOGTag('og:image', seoData.ogImage);
  }
};

const updateOGTag = (property: string, content: string) => {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

export const getHomeSEO = (): SEOData => ({
  title: "TIME - Breaking News, Politics, World News, Technology and More",
  description: "Breaking news and analysis from TIME magazine covering politics, current events, business, entertainment, culture and more.",
  ogTitle: "TIME - Breaking News, Politics, World News, Technology and More",
  ogDescription: "Breaking news and analysis from TIME magazine covering politics, current events, business, entertainment, culture and more.",
  ogUrl: window.location.origin,
});

export const getCategorySEO = (category: string): SEOData => ({
  title: `${category} News - TIME Magazine`,
  description: `Latest ${category.toLowerCase()} news, analysis and commentary from TIME magazine. Stay informed with breaking ${category.toLowerCase()} stories.`,
  ogTitle: `${category} News - TIME Magazine`,
  ogDescription: `Latest ${category.toLowerCase()} news, analysis and commentary from TIME magazine.`,
  ogUrl: window.location.href,
});

export const getArticleSEO = (article: Article): SEOData => ({
  title: `${article.title} - TIME`,
  description: article.excerpt,
  ogTitle: article.title,
  ogDescription: article.excerpt,
  ogUrl: window.location.href,
  ogImage: article.imageUrl,
});
