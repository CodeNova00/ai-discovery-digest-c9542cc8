
import React from "react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Record<string, number>;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          All Categories ({Object.values(categories).reduce((a, b) => a + b, 0)})
        </button>
        {Object.entries(categories).map(([category, count]) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {category} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
