import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useArticlesByCategory } from "@/hooks/useArticles";
import { updatePageSEO, getCategorySEO } from "@/lib/seo";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ARTICLES_PER_PAGE = 12;

export default function Category() {
  const params = useParams();
  const category = params.name || "";
  const { data: articles = [], isLoading } = useArticlesByCategory(category);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (category) {
      const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      updatePageSEO(getCategorySEO(capitalizedCategory));
    }
  }, [category]);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 w-48 mb-8"></div>
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

  if (articles.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-serif text-time-dark mb-8 capitalize">
            {category} News
          </h1>
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No articles found in this category.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-serif text-time-dark mb-8 capitalize" data-testid="category-title">
          {category} News
        </h1>
        
        <p className="text-gray-600 mb-8" data-testid="category-count">
          {articles.length} article{articles.length !== 1 ? 's' : ''} in {category}
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12" data-testid="category-articles-grid">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2" data-testid="category-pagination">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              data-testid="button-category-prev-page"
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
                  data-testid={`button-category-page-${pageNum}`}
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
              data-testid="button-category-next-page"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
