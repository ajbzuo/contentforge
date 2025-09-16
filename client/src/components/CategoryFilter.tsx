import { categories } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="hidden md:flex space-x-4">
      <Button
        variant={activeCategory === "all" ? "default" : "ghost"}
        size="sm"
        className={`rounded-full ${
          activeCategory === "all"
            ? "bg-time-red hover:bg-time-red/90 text-white"
            : "text-time-gray hover:text-time-red"
        }`}
        onClick={() => onCategoryChange("all")}
        data-testid="filter-all"
      >
        All
      </Button>
      {categories.slice(0, 4).map((category) => (
        <Button
          key={category}
          variant="ghost"
          size="sm"
          className={`rounded-full ${
            activeCategory === category.toLowerCase()
              ? "bg-time-red hover:bg-time-red/90 text-white"
              : "text-time-gray hover:text-time-red"
          }`}
          onClick={() => onCategoryChange(category.toLowerCase())}
          data-testid={`filter-${category.toLowerCase()}`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
