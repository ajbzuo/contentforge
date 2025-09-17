import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const categories = [
  { id: "all", label: "HOME", path: "/" },
  { id: "politics", label: "POLITICS", path: "/category/politics" },
  { id: "business", label: "BUSINESS", path: "/category/business" },
  { id: "technology", label: "TECHNOLOGY", path: "/category/technology" },
  { id: "culture", label: "CULTURE", path: "/category/culture" },
  { id: "world", label: "WORLD", path: "/category/world" },
];

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 
                className="text-4xl font-bold cursor-pointer text-time-red hover:text-time-red/80 transition-colors" 
                style={{ fontFamily: "'Source Serif Pro', serif" }}
                data-testid="logo-time"
              >
                TIME
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link key={category.id} href={category.path}>
                <span 
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    location === category.path 
                      ? "text-time-red" 
                      : "text-foreground hover:text-time-red"
                  }`}
                  data-testid={`nav-${category.id}`}
                >
                  {category.label}
                </span>
              </Link>
            ))}
          </nav>
          
          {/* Search & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-64 pr-10"
                data-testid="search-input"
              />
              <Search className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
            </form>
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" data-testid="mobile-menu-trigger">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pr-10"
                      data-testid="mobile-search-input"
                    />
                    <Search className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                  </form>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {categories.map((category) => (
                      <Link key={category.id} href={category.path}>
                        <span 
                          className={`text-lg font-medium transition-colors cursor-pointer block ${
                            location === category.path 
                              ? "text-time-red" 
                              : "text-foreground hover:text-time-red"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-nav-${category.id}`}
                        >
                          {category.label}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
