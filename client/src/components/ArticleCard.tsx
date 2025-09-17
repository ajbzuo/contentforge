import { Link } from "wouter";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact" | "large";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (variant === "featured") {
    return (
      <Link href={`/article/${article.id}`}>
        <article className="cursor-pointer group" data-testid={`article-featured-${article.id}`}>
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-80 object-cover rounded-lg mb-4 group-hover:opacity-95 transition-opacity"
          />
          <span className="text-xs font-semibold text-time-red uppercase tracking-wide">
            {article.category}
          </span>
          <h2 
            className="text-3xl lg:text-4xl font-bold mt-2 mb-3 leading-tight group-hover:text-time-red transition-colors" 
            style={{ fontFamily: "'Source Serif Pro', serif" }}
          >
            {article.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <time>{formatDate(article.publishDate)}</time>
            {article.readTime && (
              <>
                <span className="mx-2">•</span>
                <span>{article.readTime} min read</span>
              </>
            )}
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/article/${article.id}`}>
        <article className="flex gap-4 cursor-pointer group" data-testid={`article-compact-${article.id}`}>
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-32 h-24 object-cover rounded flex-shrink-0 group-hover:opacity-95 transition-opacity"
          />
          <div>
            <span className="text-xs font-semibold text-time-red uppercase tracking-wide">
              {article.category}
            </span>
            <h3 
              className="font-bold text-lg mb-2 leading-tight group-hover:text-time-red transition-colors" 
              style={{ fontFamily: "'Source Serif Pro', serif" }}
            >
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {article.excerpt.substring(0, 120)}...
            </p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <time>{formatDate(article.publishDate)}</time>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "large") {
    return (
      <Link href={`/article/${article.id}`}>
        <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group" data-testid={`article-large-${article.id}`}>
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-48 object-cover group-hover:opacity-95 transition-opacity"
          />
          <div className="p-6">
            <span className="text-xs font-semibold text-time-red uppercase tracking-wide">
              {article.category}
            </span>
            <h3 
              className="font-bold text-xl mb-3 leading-tight group-hover:text-time-red transition-colors" 
              style={{ fontFamily: "'Source Serif Pro', serif" }}
            >
              {article.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <time>{formatDate(article.publishDate)}</time>
              {article.readTime && (
                <>
                  <span className="mx-2">•</span>
                  <span>{article.readTime} min read</span>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/article/${article.id}`}>
      <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group" data-testid={`article-default-${article.id}`}>
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-40 object-cover group-hover:opacity-95 transition-opacity"
        />
        <div className="p-4">
          <span className="text-xs font-semibold text-time-red uppercase tracking-wide">
            {article.category}
          </span>
          <h3 
            className="font-bold text-lg mb-2 leading-tight group-hover:text-time-red transition-colors" 
            style={{ fontFamily: "'Source Serif Pro', serif" }}
          >
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {article.excerpt.substring(0, 100)}...
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <time>{formatDate(article.publishDate)}</time>
            {article.readTime && (
              <>
                <span className="mx-2">•</span>
                <span>{article.readTime} min read</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
