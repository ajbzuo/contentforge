import { useState, useMemo } from "react";
import { Article } from "@shared/schema";
import { useArticles } from "./useArticles";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: articles = [] } = useArticles();

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.author.toLowerCase().includes(lowercaseQuery)
    );
  }, [articles, query]);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  return {
    query,
    setQuery,
    searchResults,
    isOpen,
    openSearch,
    closeSearch,
  };
};
