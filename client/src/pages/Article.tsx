import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useArticleBySlug } from "@/hooks/useArticles";
import { updatePageSEO, getArticleSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { Link } from "wouter";

export default function Article() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const slug = params.slug || "";
  const { data: article, isLoading, error } = useArticleBySlug(slug);

  useEffect(() => {
    if (article) {
      updatePageSEO(getArticleSEO(article));
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 w-24 mb-6"></div>
            <div className="h-12 bg-gray-300 w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button className="bg-time-red hover:bg-time-red/90">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-6 text-time-gray hover:text-time-red"
            data-testid="button-back-home"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="text-sm text-time-red font-semibold mb-3 uppercase tracking-wide">
            <Link 
              href={`/category/${article.category.toLowerCase()}`}
              className="hover:underline"
              data-testid="article-category-link"
            >
              {article.category}
            </Link>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold font-serif text-time-dark mb-6 leading-tight" data-testid="article-title">
            {article.title}
          </h1>

          <p className="text-xl text-time-gray leading-relaxed mb-6" data-testid="article-excerpt">
            {article.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-time-gray border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span data-testid="article-author">By {article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <time data-testid="article-date">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span data-testid="article-read-time">{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto rounded-lg shadow-lg"
            loading="eager"
            data-testid="article-image"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none" data-testid="article-content">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8 mt-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              This article was published on {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} in the {article.category} section.
            </p>
            <Link href={`/category/${article.category.toLowerCase()}`}>
              <Button variant="outline" data-testid="button-more-category">
                More {article.category} News
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
