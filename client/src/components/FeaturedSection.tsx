import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

interface FeaturedSectionProps {
  articles: Article[];
}

export default function FeaturedSection({ articles }: FeaturedSectionProps) {
  const featuredArticle = articles.find(article => article.featured) || articles[0];
  const secondaryArticles = articles
    .filter(article => article.id !== featuredArticle?.id)
    .slice(0, 3);

  if (!featuredArticle) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Main Featured Article */}
        <div className="lg:col-span-1">
          <ArticleCard article={featuredArticle} variant="featured" />
        </div>
        
        {/* Secondary Featured Articles */}
        <div className="space-y-6">
          {secondaryArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant="compact" 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
