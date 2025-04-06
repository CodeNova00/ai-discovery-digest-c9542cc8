
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Mail, Check } from "lucide-react";
import { categoryCount } from "@/data/mockDiscoveries";

const Digest = () => {
  const [email, setEmail] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("daily");
  const [submitted, setSubmitted] = useState(false);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    // In a real app, this would send the data to a server
    console.log("Subscription data:", { email, selectedCategories, frequency });
    
    toast.success("Successfully subscribed to the AI digest!");
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold">AI Research Digest</h1>
        <p className="text-xl text-muted-foreground">
          Subscribe to receive the latest AI discoveries directly in your inbox,
          customized to your interests and preferences.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {submitted ? (
          <Card className="text-center">
            <CardContent className="pt-10 pb-10">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-6">
                <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Subscription Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                You'll start receiving your AI digest at {email} based on your preferences.
              </p>
              <Button onClick={() => setSubmitted(false)}>Manage Preferences</Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Subscribe to AI Digest</CardTitle>
              <CardDescription>
                Customize your digest to receive updates on the topics that matter most to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Delivery Frequency</Label>
                  <Tabs defaultValue="daily" value={frequency} onValueChange={setFrequency} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="daily" className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        Receive a digest with the most important AI discoveries every day.
                      </p>
                    </TabsContent>
                    <TabsContent value="weekly" className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        Receive a comprehensive weekly roundup of all significant AI developments.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <Label>Categories of Interest</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(categoryCount).map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Sources</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="source-github" defaultChecked />
                      <label htmlFor="source-github" className="text-sm cursor-pointer">
                        GitHub
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="source-huggingface" defaultChecked />
                      <label htmlFor="source-huggingface" className="text-sm cursor-pointer">
                        Hugging Face
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="source-arxiv" defaultChecked />
                      <label htmlFor="source-arxiv" className="text-sm cursor-pointer">
                        ArXiv
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>
                <Mail className="mr-2 h-4 w-4" /> Subscribe to Digest
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="mt-16 space-y-8">
          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Sample Digest</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4 py-2">
                <h4 className="font-bold">GPT-4-Vision: Multimodal Capabilities for Analyzing Images</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  New model from OpenAI that can analyze and understand images, providing detailed descriptions and answering questions about visual content.
                </p>
                <div className="flex space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    #multimodal
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    #vision
                  </span>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <h4 className="font-bold">DALL-E 3: Improved Image Generation with Better Control</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Latest version of DALL-E with enhanced control over image composition, style consistency, and text rendering within generated images.
                </p>
                <div className="flex space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    #image-generation
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    #DALL-E
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Not sure if the digest is right for you?
            </p>
            <Button variant="outline" asChild>
              <a href="#sample-digest">View Full Sample Digest</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Digest;
