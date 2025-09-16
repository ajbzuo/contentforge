import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import articlesData from "@/data/articles.json";

const articles = articlesData as Article[];

export const useArticles = () => {
  return useQuery({
    queryKey: ['/api/articles'],
    queryFn: () => Promise.resolve(articles),
    staleTime: Infinity,
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['/api/articles', slug],
    queryFn: () => {
      const article = articles.find(a => a.slug === slug);
      if (!article) {
        throw new Error('Article not found');
      }
      return Promise.resolve(article);
    },
    enabled: !!slug,
  });
};

export const useArticlesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['/api/articles', 'category', category],
    queryFn: () => {
      const filteredArticles = category === 'all' 
        ? articles 
        : articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
      return Promise.resolve(filteredArticles);
    },
    enabled: !!category,
  });
};

export const useFeaturedArticles = () => {
  return useQuery({
    queryKey: ['/api/articles', 'featured'],
    queryFn: () => Promise.resolve(articles.filter(a => a.featured)),
    staleTime: Infinity,
  });
};
