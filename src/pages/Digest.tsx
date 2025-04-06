
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Check, AlertCircle, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { mockDiscoveries } from "@/data/mockDiscoveries";
import { useAuth } from "@/hooks/useAuth";

const Digest = () => {
  const { isLoggedIn, user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.displayName || "");
  const [frequency, setFrequency] = useState("weekly");
  const [categories, setCategories] = useState<string[]>(["NLP", "CV"]);
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  const categoryOptions = [
    { id: "NLP", label: "Natural Language Processing" },
    { id: "CV", label: "Computer Vision" },
    { id: "Multimodal", label: "Multimodal Learning" },
    { id: "RL", label: "Reinforcement Learning" },
    { id: "MLOps", label: "MLOps & Deployment" },
    { id: "Ethics", label: "AI Ethics & Safety" },
  ];
  
  const handleCategoryChange = (category: string) => {
    setCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (categories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      toast.success("Successfully subscribed to AI Digest!");
    }, 1500);
  };
  
  // Sample digest items based on mockDiscoveries
  const digestItems = mockDiscoveries.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          AI Research Digest
        </h1>
        <p className="text-xl text-muted-foreground">
          Stay updated with the latest AI research and developments delivered straight to your inbox
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle>Preview Digest</CardTitle>
              <CardDescription>
                See what our AI digest looks like
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 bg-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">AIgen Weekly Digest</h3>
                  <span className="text-xs text-muted-foreground">April 6, 2025</span>
                </div>
                
                <p className="text-sm">
                  Hello there,<br /><br />
                  Here are this week's top AI breakthroughs and discoveries curated for you.
                </p>
                
                <div className="space-y-4 mt-4">
                  {digestItems.map((item, i) => (
                    <div key={i} className="border-t pt-3">
                      <h4 className="font-medium text-primary">{item.title}</h4>
                      <p className="text-sm my-1">{item.summary.substring(0, 100)}...</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href="#" 
                        className="text-xs text-primary flex items-center mt-2 hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          toast.info(`Viewing source for ${item.title}`);
                        }}
                      >
                        Read more <ArrowRight className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground border-t pt-4 mt-4">
                  <p>
                    You're receiving this email because you subscribed to AIgen Digest.
                    <br />
                    To unsubscribe or change your preferences, click <a href="#" className="text-primary hover:underline">here</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {subscribed ? (
            <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-center">Subscription Successful!</CardTitle>
                <CardDescription className="text-center">
                  You've been added to our digest list
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p>
                  Thank you for subscribing to the AIgen Digest. Your first digest will be delivered on the next scheduled date.
                </p>
                <div className="bg-muted p-4 rounded-md inline-block mx-auto">
                  <div className="flex items-center mb-2">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">{email}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="capitalize">{frequency} digest</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {categories.map((category) => (
                      <span key={category} className="text-xs bg-background px-2 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSubscribed(false)}
                >
                  Edit Subscription
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Subscribe to Digest</CardTitle>
                <CardDescription>
                  Customize your AI research digest
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <div className="flex flex-col gap-2">
                      <Tabs value={frequency} onValueChange={setFrequency}>
                        <TabsList className="grid grid-cols-3">
                          <TabsTrigger value="daily">Daily</TabsTrigger>
                          <TabsTrigger value="weekly">Weekly</TabsTrigger>
                          <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryOptions.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={category.id} 
                            checked={categories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                          />
                          <label 
                            htmlFor={category.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Tell us about your research interests..."
                      className="resize-none"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Subscribe Now"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center">Why Subscribe?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Save Time</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Get curated summaries of the most important AI developments without sifting through hundreds of papers.
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Personalized</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Receive updates only on the topics you care about with our customizable category filters.
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Never Miss Out</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Stay at the forefront of AI innovation with regular updates delivered directly to your inbox.
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center mt-12">
          <h3 className="text-xl font-bold mb-2">Join 10,000+ AI enthusiasts</h3>
          <p className="text-muted-foreground mb-4">
            Researchers, developers, and students who rely on our digest to stay informed.
          </p>
          <Button 
            size="lg" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Digest;
