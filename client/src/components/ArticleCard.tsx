import { Link } from "wouter";
import { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <Link href={`/article/${article.slug}`} className="block" data-testid={`article-card-${article.id}`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-6">
        <div className="text-xs text-time-red font-semibold mb-2 uppercase tracking-wide">
          {article.category}
        </div>
        <h3 className="text-xl font-bold font-serif text-time-dark mb-3 leading-tight hover:text-time-red transition-colors duration-200">
          <Link href={`/article/${article.slug}`} data-testid={`article-title-${article.id}`}>
            {article.title}
          </Link>
        </h3>
        <p className="text-time-gray mb-4 leading-relaxed" data-testid={`article-excerpt-${article.id}`}>
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-time-gray">
          <div className="flex items-center">
            <span data-testid={`article-author-${article.id}`}>{article.author}</span>
            <span className="mx-2">•</span>
            <time data-testid={`article-date-${article.id}`}>
              {new Date(article.date).toLocaleDateString()}
            </time>
          </div>
          <span className="text-xs" data-testid={`article-read-time-${article.id}`}>
            {article.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
