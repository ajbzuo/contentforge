import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useFeaturedArticles } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";

export default function FeaturedCarousel() {
  const { data: featuredArticles = [], isLoading } = useFeaturedArticles();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (featuredArticles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? featuredArticles.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  if (isLoading) {
    return (
      <section className="bg-time-light-gray py-8" aria-label="Featured articles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse bg-gray-300 rounded-lg h-96"></div>
        </div>
      </section>
    );
  }

  if (featuredArticles.length === 0) return null;

  return (
    <section className="bg-time-light-gray py-8" aria-label="Featured articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-lg bg-white">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              data-testid="carousel-container"
            >
              {featuredArticles.map((article) => (
                <div key={article.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-96">
                    <div className="order-2 lg:order-1 p-8 flex flex-col justify-center">
                      <div className="text-sm text-time-red font-semibold mb-2 uppercase tracking-wide">
                        {article.category}
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold font-serif text-time-dark mb-4 leading-tight">
                        {article.title}
                      </h2>
                      <p className="text-time-gray text-lg mb-6 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-time-gray mb-6">
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <time>{new Date(article.date).toLocaleDateString()}</time>
                      </div>
                      <Link href={`/article/${article.slug}`}>
                        <Button 
                          variant="ghost" 
                          className="inline-flex items-center text-time-red hover:text-red-700 font-semibold transition-colors duration-200 p-0 h-auto"
                          data-testid={`featured-article-link-${article.id}`}
                        >
                          Read Full Story
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                    <div className="order-1 lg:order-2">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg"
            aria-label="Previous article"
            onClick={previousSlide}
            data-testid="button-carousel-prev"
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg"
            aria-label="Next article"
            onClick={nextSlide}
            data-testid="button-carousel-next"
          >
            <ChevronRight size={20} />
          </Button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? "bg-time-red"
                    : "bg-white bg-opacity-60 hover:bg-opacity-100"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                data-testid={`carousel-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
