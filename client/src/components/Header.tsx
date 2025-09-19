import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { categories } from "@shared/schema";
import { useSearch } from "@/hooks/useSearch";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { openSearch } = useSearch();
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActiveLink = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" data-testid="link-home">
                <div className="text-time-red font-bold text-3xl tracking-tight font-serif">
                  TIME
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
              <Link 
                href="/" 
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink("/") 
                    ? "text-time-red" 
                    : "text-time-dark hover:text-time-red"
                }`}
                data-testid="link-home-nav"
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className={`font-medium transition-colors duration-200 ${
                    isActiveLink(`/category/${category.toLowerCase()}`)
                      ? "text-time-red"
                      : "text-time-dark hover:text-time-red"
                  }`}
                  data-testid={`link-${category.toLowerCase()}`}
                >
                  {category}
                </Link>
              ))}
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                className="text-time-gray hover:text-time-red transition-colors duration-200"
                aria-label="Search"
                onClick={openSearch}
                data-testid="button-search"
              >
                <Search size={20} />
              </button>
              {isMobile && (
                <button
                  className="text-time-gray hover:text-time-red transition-colors duration-200"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  onClick={toggleMobileMenu}
                  data-testid="button-mobile-menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200" data-testid="mobile-menu">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/"
              className={`block font-medium ${
                isActiveLink("/") ? "text-time-red" : "text-time-dark hover:text-time-red"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="link-home-mobile"
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className={`block font-medium ${
                  isActiveLink(`/category/${category.toLowerCase()}`)
                    ? "text-time-red"
                    : "text-time-dark hover:text-time-red"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-${category.toLowerCase()}-mobile`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
