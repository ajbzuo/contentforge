import { useState, useMemo } from "react";
import { useArticles } from "@/hooks/use-articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingNews from "@/components/BreakingNews";
import FeaturedSection from "@/components/FeaturedSection";
import CategorySection from "@/components/CategorySection";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { searchArticles } from "@/utils/search";

export default function Home() {
  const { articles, categories, breakingNews, isLoading } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(8);

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return articles;
    return searchArticles(articles, searchQuery);
  }, [articles, searchQuery]);

  const categorizedArticles = useMemo(() => {
    const grouped: Record<string, typeof articles> = {};
    filteredArticles.forEach((article) => {
      const category = article.category.toLowerCase();
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(article);
    });
    return grouped;
  }, [filteredArticles]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + 8);
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

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      <BreakingNews news={breakingNews} />
      
      <main>
        {!searchQuery && (
          <>
            {/* Featured Section */}
            <FeaturedSection articles={filteredArticles} />
            
            {/* Category Sections */}
            <section className="bg-muted py-12">
              <div className="container mx-auto px-4">
                {/* Politics Section */}
                {categorizedArticles.politics && (
                  <CategorySection 
                    title="Politics"
                    articles={categorizedArticles.politics}
                    categoryId="politics"
                    variant="grid"
                  />
                )}
                
                {/* Business Section */}
                {categorizedArticles.business && (
                  <CategorySection 
                    title="Business"
                    articles={categorizedArticles.business}
                    categoryId="business"
                    variant="default"
                  />
                )}
                
                {/* Technology Section */}
                {categorizedArticles.technology && (
                  <CategorySection 
                    title="Technology"
                    articles={categorizedArticles.technology}
                    categoryId="technology"
                    variant="grid"
                  />
                )}
                
                {/* Culture Section */}
                {categorizedArticles.culture && (
                  <CategorySection 
                    title="Culture"
                    articles={categorizedArticles.culture}
                    categoryId="culture"
                    variant="default"
                  />
                )}
                
                {/* World Section */}
                {categorizedArticles.world && (
                  <CategorySection 
                    title="World"
                    articles={categorizedArticles.world}
                    categoryId="world"
                    variant="grid"
                  />
                )}
              </div>
            </section>
          </>
        )}
        
        {/* More Stories / Search Results */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 
              className="text-2xl font-bold" 
              style={{ fontFamily: "'Source Serif Pro', serif" }}
            >
              {searchQuery ? `Search Results for "${searchQuery}"` : "MORE STORIES"}
            </h2>
            {!searchQuery && filteredArticles.length > visibleArticles && (
              <Button 
                onClick={loadMoreArticles}
                className="bg-time-red hover:bg-time-red/90"
                data-testid="load-more-button"
              >
                Load More
              </Button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArticles
              .slice(searchQuery ? 0 : 4, searchQuery ? undefined : visibleArticles)
              .map((article) => (
                <div key={article.id} className="border-b border-border pb-6 mb-6">
                  <ArticleCard article={article} variant="compact" />
                </div>
              ))}
          </div>
          
          {searchQuery && filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found for "{searchQuery}"</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
