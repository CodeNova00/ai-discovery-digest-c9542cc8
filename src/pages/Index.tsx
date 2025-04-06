
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LineChart, 
  Brain, 
  Sparkles, 
  SearchCheck, 
  Mail, 
  Zap,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DiscoveryCard from "@/components/DiscoveryCard";
import { mockDiscoveries } from "@/data/mockDiscoveries";
import SearchBar from "@/components/SearchBar";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query}`);
    // In a real app, this would trigger a search through the discoveries
  };

  const featuredDiscoveries = mockDiscoveries.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold">
            Discover the Latest <span className="gradient-text">AI Innovations</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Your go-to platform for discovering, summarizing, and tracking
            the latest AI tools, research papers, and models.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button size="lg" asChild>
              <Link to="/explore">Start Exploring</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/digest">Subscribe to Digest</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Discoveries */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Discoveries</h2>
          <Button variant="ghost" asChild>
            <Link to="/explore" className="flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDiscoveries.map((discovery) => (
            <DiscoveryCard key={discovery.id} {...discovery} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted rounded-lg my-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AIgen provides a comprehensive platform for AI researchers, developers,
            enthusiasts, and students to stay updated with the rapidly evolving AI landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Summarization</h3>
                <p className="text-muted-foreground">
                  Concise AI-generated summaries for research papers, models, and tools.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Analytics & Trends</h3>
                <p className="text-muted-foreground">
                  Visual insights into AI trends, popular categories, and publication activity.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Email Digest</h3>
                <p className="text-muted-foreground">
                  Customizable email digests with the latest discoveries delivered to your inbox.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <SearchCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Advanced Search</h3>
                <p className="text-muted-foreground">
                  Powerful search and filtering capabilities to find exactly what you're looking for.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Summarizer Tool</h3>
                <p className="text-muted-foreground">
                  Convert lengthy content into concise summaries with our AI-powered tool.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Assistant</h3>
                <p className="text-muted-foreground">
                  Interactive AI chatbot to answer your questions about AI research and tools.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 my-12 text-center bg-gradient-blue-purple rounded-lg">
        <div className="max-w-3xl mx-auto px-4 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss the Latest AI Breakthroughs
          </h2>
          <p className="text-xl mb-8">
            Join thousands of AI enthusiasts and stay at the forefront of AI innovation.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/digest">Subscribe to AI Digest</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
