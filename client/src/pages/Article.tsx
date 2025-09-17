import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { useArticles } from "@/hooks/use-articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Article() {
  const { id } = useParams();
  const { articles, isLoading } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const article = articles.find(a => a.id === parseInt(id || "0"));
  const relatedArticles = articles
    .filter(a => a.id !== article?.id && a.category === article?.category)
    .slice(0, 3);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Article link has been copied to clipboard",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - TIME`;
      
      // Add meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = article.excerpt;
        document.head.appendChild(meta);
      }
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading article...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link href="/">
              <Button data-testid="back-to-home">Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4" data-testid="back-button">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-time-red uppercase tracking-wide">
              {article.category}
            </span>
            <h1 
              className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight" 
              style={{ fontFamily: "'Source Serif Pro', serif" }}
            >
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {article.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <time>{formatDate(article.publishDate)}</time>
              </div>
              {article.readTime && (
                <span>{article.readTime} min read</span>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className="ml-auto"
                data-testid="share-button"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-foreground">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="border-t border-border pt-12">
              <h2 
                className="text-2xl font-bold mb-8" 
                style={{ fontFamily: "'Source Serif Pro', serif" }}
              >
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard 
                    key={relatedArticle.id} 
                    article={relatedArticle} 
                    variant="default" 
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
