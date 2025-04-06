
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  LineChart, 
  Brain, 
  Sparkles, 
  SearchCheck, 
  Mail, 
  Zap,
  ChevronRight,
  ArrowRight,
  Star,
  PlusCircle,
  BarChart4,
  Lightbulb,
  FileText,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DiscoveryCard from "@/components/DiscoveryCard";
import { mockDiscoveries } from "@/data/mockDiscoveries";
import SearchBar from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsShowcaseVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }
    
    return () => {
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current);
      }
    };
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query}`);
    
    if (query) {
      toast.success(`Searching for "${query}"...`);
      setTimeout(() => {
        window.location.href = `/explore?q=${encodeURIComponent(query)}`;
      }, 1000);
    }
  };

  const featuredDiscoveries = mockDiscoveries.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1] opacity-20">
          <div className="w-full h-full bg-grid"></div>
        </div>
        
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="/lovable-uploads/af3c3252-cefa-4ccf-8477-6edcddba246c.png"
              alt="AIgen Logo"
              className="h-20 w-20 animate-float"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Discover the Latest <span className="gradient-text">AI Innovations</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Your go-to platform for discovering, summarizing, and tracking
            the latest AI tools, research papers, and models.
          </p>
          
          <div className="max-w-xl mx-auto home-search-bar">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button size="lg" className="ai-glow" asChild>
              <Link to="/explore">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="ai-glow" asChild>
              <Link to="/digest">
                Subscribe to Digest
                <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="pt-8 flex justify-center space-x-8 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">5000+</div>
              <div className="text-sm">Research Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">1200+</div>
              <div className="text-sm">AI Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">800+</div>
              <div className="text-sm">Tools & Libraries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Discoveries */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold gradient-text">Featured Discoveries</h2>
            <p className="text-muted-foreground mt-2">
              Explore the latest breakthroughs in AI research and development
            </p>
          </div>
          <Button variant="ghost" className="group" asChild>
            <Link to="/explore" className="flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-16 my-12 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Everything You Need in One Place
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AIgen provides a comprehensive platform for AI researchers, developers,
            enthusiasts, and students to stay updated with the rapidly evolving AI landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="ai-glow">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Summarization</h3>
                <p className="text-muted-foreground">
                  Concise AI-generated summaries for research papers, models, and tools.
                </p>
                <Button variant="ghost" size="sm" className="group" asChild>
                  <Link to="/summarizer" className="flex items-center">
                    Try it <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="ai-glow">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Analytics & Trends</h3>
                <p className="text-muted-foreground">
                  Visual insights into AI trends, popular categories, and publication activity.
                </p>
                <Button variant="ghost" size="sm" className="group" asChild>
                  <Link to="/insights" className="flex items-center">
                    View insights <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="ai-glow">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Email Digest</h3>
                <p className="text-muted-foreground">
                  Customizable email digests with the latest discoveries delivered to your inbox.
                </p>
                <Button variant="ghost" size="sm" className="group" asChild>
                  <Link to="/digest" className="flex items-center">
                    Subscribe <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="ai-glow">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <SearchCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Advanced Search</h3>
                <p className="text-muted-foreground">
                  Powerful search and filtering capabilities to find exactly what you're looking for.
                </p>
                <Button variant="ghost" size="sm" className="group" asChild>
                  <Link to="/explore" className="flex items-center">
                    Try searching <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="ai-glow">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Summarizer Tool</h3>
                <p className="text-muted-foreground">
                  Convert lengthy content into concise summaries with our AI-powered tool.
                </p>
                <Button variant="ghost" size="sm" className="group" asChild>
                  <Link to="/summarizer" className="flex items-center">
                    Summarize now <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="ai-glow">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Assistant</h3>
                <p className="text-muted-foreground">
                  Interactive AI chatbot to answer your questions about AI research and tools.
                </p>
                <Button variant="ghost" size="sm" className="group" asChild>
                  <Link to="/chatbot" className="flex items-center">
                    Chat now <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Platform Showcase */}
      <section 
        ref={showcaseRef}
        className="py-16 my-12"
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Why Choose AIgen?
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            AI Research Made <span className="gradient-text">Simple</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Designed for researchers, students, and developers who want to stay at the forefront of AI innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className={`space-y-6 transition-all duration-700 ${isShowcaseVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-muted-foreground">
                  Our platform automatically scans and curates the latest AI research from top sources, ensuring you never miss important breakthroughs.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  AI-generated summaries distill lengthy research papers into concise, easy-to-understand points, saving you hours of reading time.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart4 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Track Trends</h3>
                <p className="text-muted-foreground">
                  Visualize AI research trends and identify emerging areas with our analytics tools and interactive charts.
                </p>
              </div>
            </div>
          </div>
          
          <div className={`space-y-6 transition-all duration-700 delay-300 ${isShowcaseVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Personalized Experience</h3>
                <p className="text-muted-foreground">
                  Customize your feed and digest based on your research interests and preferred categories.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Premium Features</h3>
                <p className="text-muted-foreground">
                  Access advanced tools like unlimited summaries, custom digests, and priority support with our Pro and Pro+ plans.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <PlusCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Growing Platform</h3>
                <p className="text-muted-foreground">
                  We're continuously adding new features and expanding our coverage to provide the most comprehensive AI research platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 my-12 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_80%)] z-0"></div>
        
        <div className="max-w-3xl mx-auto px-4 text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Never Miss the Latest AI Breakthroughs
          </h2>
          <p className="text-xl mb-8 text-center text-white/90">
            Join thousands of AI enthusiasts and stay at the forefront of AI innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              asChild
              className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
            >
              <Link to="/digest">Subscribe to AI Digest</Link>
            </Button>
            
            {!isLoggedIn && (
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                <Link to="/login">Create Free Account</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
