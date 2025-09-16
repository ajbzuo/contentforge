import { useState, useEffect } from "react";
import { useArticles } from "@/hooks/useArticles";
import { updatePageSEO, getHomeSEO } from "@/lib/seo";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ARTICLES_PER_PAGE = 9;

export default function Home() {
  const { data: articles = [], isLoading } = useArticles();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    updatePageSEO(getHomeSEO());
  }, []);

  const filteredArticles = articles.filter(article => {
    if (activeCategory === "all") return !article.featured;
    return article.category.toLowerCase() === activeCategory && !article.featured;
  });

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-96 mb-8"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-300 rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <FeaturedCarousel />

      {/* Latest Articles Section */}
      <section className="py-12" aria-label="Latest articles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-serif text-time-dark">Latest Stories</h2>
            <CategoryFilter 
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" data-testid="articles-grid">
            {currentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2" data-testid="pagination">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                data-testid="button-prev-page"
              >
                <ChevronLeft size={16} />
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    className={currentPage === pageNum ? "bg-time-red hover:bg-time-red/90" : ""}
                    data-testid={`button-page-${pageNum}`}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                data-testid="button-next-page"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-time-red py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-white mb-4">Stay Informed with TIME</h2>
          <p className="text-xl text-red-100 mb-8">Get breaking news, analysis, and exclusive content delivered to your inbox.</p>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-time-dark placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-time-red focus:outline-none"
              required
              aria-label="Email address"
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              className="px-8 py-3 bg-white text-time-red font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              data-testid="button-newsletter-submit"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm text-red-100 mt-4">
            By subscribing, you agree to our{" "}
            <a href="#" className="underline hover:no-underline">Privacy Policy</a> and{" "}
            <a href="#" className="underline hover:no-underline">Terms of Service</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
