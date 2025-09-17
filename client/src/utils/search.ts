import { Article } from "@/types/article";

export function searchArticles(articles: Article[], query: string): Article[] {
  if (!query.trim()) return articles;

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return articles.filter(article => {
    const searchableText = [
      article.title,
      article.excerpt,
      article.content,
      article.author,
      article.category,
      ...(article.tags || [])
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  }).sort((a, b) => {
    // Sort by relevance - articles with query in title should appear first
    const aInTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
    const bInTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
    
    if (aInTitle !== bInTitle) {
      return bInTitle - aInTitle;
    }
    
    // Then sort by recency
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
}

export function highlightSearchTerms(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
