import { useState, useMemo } from "react";
import { useParams } from "wouter";
import { useArticles } from "@/hooks/use-articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { searchArticles } from "@/utils/search";

export default function Category() {
  const { category } = useParams();
  const { articles, categories, isLoading } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(12);

  const categoryInfo = categories.find(cat => cat.id === category);
  
  const categoryArticles = useMemo(() => {
    const filtered = articles.filter(article => 
      article.category.toLowerCase() === category?.toLowerCase()
    );
    
    if (!searchQuery) return filtered;
    return searchArticles(filtered, searchQuery);
  }, [articles, category, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + 12);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading articles...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground">The requested category does not exist.</p>
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
        {/* Category Header */}
        <div className="mb-12">
          <h1 
            className="text-4xl lg:text-5xl font-bold text-time-red mb-4" 
            style={{ fontFamily: "'Source Serif Pro', serif" }}
          >
            {categoryInfo.name.toUpperCase()}
          </h1>
          <p className="text-lg text-muted-foreground">
            Latest news and analysis in {categoryInfo.name.toLowerCase()}
          </p>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Search results for "{searchQuery}" in {categoryInfo.name}
            </p>
          )}
        </div>

        {/* Featured Article */}
        {categoryArticles.length > 0 && !searchQuery && (
          <div className="mb-12">
            <ArticleCard article={categoryArticles[0]} variant="featured" />
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categoryArticles
            .slice(searchQuery ? 0 : 1, visibleArticles)
            .map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant="large" 
              />
            ))}
        </div>

        {/* Load More Button */}
        {categoryArticles.length > visibleArticles && (
          <div className="text-center">
            <Button 
              onClick={loadMoreArticles}
              className="bg-time-red hover:bg-time-red/90"
              data-testid="load-more-button"
            >
              Load More Articles
            </Button>
          </div>
        )}

        {/* No Articles Message */}
        {categoryArticles.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No Articles Found</h2>
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No articles found for "${searchQuery}" in ${categoryInfo.name}`
                : `No articles available in ${categoryInfo.name} category yet.`
              }
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
