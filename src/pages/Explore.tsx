
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DiscoveryCard from "@/components/DiscoveryCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { mockDiscoveries, categoryCount } from "@/data/mockDiscoveries";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Filter discoveries based on selected category and search query
  const filteredDiscoveries = mockDiscoveries.filter((discovery) => {
    const matchesCategory = selectedCategory ? discovery.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? discovery.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discovery.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discovery.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Explore AI Discoveries</h1>
        <p className="text-muted-foreground">
          Browse and search the latest AI research papers, tools, and models
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
        <div className="lg:col-span-1">
          <div className="space-y-8 sticky top-20">
            <div>
              <SearchBar onSearch={handleSearch} />
            </div>

            <CategoryFilter
              categories={categoryCount}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Sources</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  GitHub
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Hugging Face
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  ArXiv
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Time Range</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Last Week
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Last Month
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Last 3 Months
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {filteredDiscoveries.length} Results
              {selectedCategory && ` in ${selectedCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border rounded-md p-1">
                <option>Latest</option>
                <option>Popular</option>
                <option>Relevance</option>
              </select>
            </div>
          </div>

          {filteredDiscoveries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDiscoveries.map((discovery) => (
                <DiscoveryCard key={discovery.id} {...discovery} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}

          {filteredDiscoveries.length > 0 && (
            <div className="flex justify-center mt-10">
              <Button>Load More</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
