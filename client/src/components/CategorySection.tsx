import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";
import { Link } from "wouter";

interface CategorySectionProps {
  title: string;
  articles: Article[];
  categoryId: string;
  variant?: "default" | "grid" | "list";
}

export default function CategorySection({ 
  title, 
  articles, 
  categoryId, 
  variant = "grid" 
}: CategorySectionProps) {
  if (articles.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 
          className="text-2xl font-bold text-time-red" 
          style={{ fontFamily: "'Source Serif Pro', serif" }}
        >
          {title.toUpperCase()}
        </h2>
        <Link href={`/category/${categoryId}`}>
          <span 
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
            data-testid={`view-all-${categoryId}`}
          >
            View All
          </span>
        </Link>
      </div>
      
      {variant === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant="large" 
            />
          ))}
        </div>
      )}
      
      {variant === "default" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 4).map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant="default" 
            />
          ))}
        </div>
      )}
      
      {variant === "list" && (
        <div className="space-y-6">
          {articles.slice(0, 5).map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant="compact" 
            />
          ))}
        </div>
      )}
    </div>
  );
}
