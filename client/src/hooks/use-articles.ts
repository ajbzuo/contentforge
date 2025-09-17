import { useState, useEffect } from "react";
import { Article, Category, ArticlesData } from "@/types/article";
import articlesData from "@/data/articles.json";

interface UseArticlesReturn {
  articles: Article[];
  categories: Category[];
  breakingNews: string[];
  isLoading: boolean;
  error: string | null;
}

export function useArticles(): UseArticlesReturn {
  const [data, setData] = useState<ArticlesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        // Simulate a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setData(articlesData as ArticlesData);
        setError(null);
      } catch (err) {
        setError("Failed to load articles");
        console.error("Error loading articles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return {
    articles: data?.articles || [],
    categories: data?.categories || [],
    breakingNews: data?.breakingNews || [],
    isLoading,
    error,
  };
}

export function useArticle(id: number) {
  const { articles, isLoading, error } = useArticles();
  
  const article = articles.find(a => a.id === id);
  
  return {
    article,
    isLoading,
    error: error || (!article && !isLoading ? "Article not found" : null),
  };
}
