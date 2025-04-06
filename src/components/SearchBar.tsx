
import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for AI discoveries...",
  className
}) => {
  const [query, setQuery] = useState("");
  const [isAIAssisted, setIsAIAssisted] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleAIAssist = () => {
    setIsAIAssisted(!isAIAssisted);
    if (!isAIAssisted) {
      // Simulate AI-suggested search terms
      const aiSuggestions = [
        "Latest transformer models",
        "Computer vision breakthroughs",
        "NLP advancements 2025",
        "Multimodal learning papers",
        "Efficient ML deployment"
      ];
      setSuggestions(aiSuggestions);
      setShowSuggestions(true);
      toast.success("AI search assistance activated");
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="relative flex w-full">
        <Input
          type="text"
          placeholder={placeholder}
          className="w-full pr-24 pl-10 h-12 rounded-full border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (isAIAssisted && e.target.value.length > 2) {
              setShowSuggestions(true);
            } else {
              setShowSuggestions(false);
            }
          }}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-1">
          <Button
            type="button"
            variant={isAIAssisted ? "default" : "ghost"}
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={handleAIAssist}
            title="AI-assisted search"
          >
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="rounded-full px-4 h-10"
          >
            Search
          </Button>
        </div>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-background border rounded-lg shadow-lg py-2 animate-in fade-in">
          <div className="text-xs text-muted-foreground px-3 pb-1 mb-1 border-b">
            AI Suggestions
          </div>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Sparkles className="h-3 w-3 text-primary mr-2" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
