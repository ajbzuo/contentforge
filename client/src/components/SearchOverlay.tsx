import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { Input } from "@/components/ui/input";

export default function SearchOverlay() {
  const { query, setQuery, searchResults, isOpen, closeSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" data-testid="search-overlay">
      <div className="bg-white p-6 max-w-2xl mx-auto mt-20 rounded-lg shadow-xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-time-dark">Search Articles</h3>
          <button
            className="text-time-gray hover:text-time-red"
            aria-label="Close search"
            onClick={closeSearch}
            data-testid="button-close-search"
          >
            <X size={20} />
          </button>
        </div>
        
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-time-red focus:border-transparent mb-4"
          data-testid="input-search"
        />

        {query && (
          <div className="flex-1 overflow-y-auto">
            <p className="text-sm text-gray-600 mb-4">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </p>
            
            {searchResults.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No articles found matching your search.
              </p>
            ) : (
              <div className="space-y-4">
                {searchResults.map((article) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.slug}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    onClick={closeSearch}
                    data-testid={`search-result-${article.id}`}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-20 h-16 object-cover rounded"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-time-dark mb-1 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="text-time-red font-semibold mr-2">
                            {article.category}
                          </span>
                          <span>{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
