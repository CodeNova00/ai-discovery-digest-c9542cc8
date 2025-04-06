
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileUp, Link as LinkIcon, RefreshCw, Volume2, Copy, ArrowRight } from "lucide-react";

const Summarizer = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSummary, setHasSummary] = useState(false);
  const [activeTab, setActiveTab] = useState("url");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url && activeTab === "url") {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setHasSummary(true);
      toast.success("Summary generated successfully!");
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("This is the generated summary text that would be copied to clipboard.");
    toast.success("Summary copied to clipboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold">AI Content Summarizer</h1>
        <p className="text-xl text-muted-foreground">
          Convert lengthy research papers, articles, or documentation into concise, 
          easy-to-understand summaries powered by AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>
              Enter a URL or upload a document to generate a summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="url" className="space-y-4 pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter URL of paper or article"
                        className="pl-10"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing
                        </>
                      ) : (
                        "Summarize"
                      )}
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Examples: 
                    <button 
                      type="button" 
                      className="text-primary hover:underline ml-1"
                      onClick={() => setUrl("https://arxiv.org/abs/2203.02155")}
                    >
                      ArXiv Paper
                    </button>, 
                    <button 
                      type="button" 
                      className="text-primary hover:underline ml-1"
                      onClick={() => setUrl("https://github.com/openai/gpt-4")}
                    >
                      GitHub Repo
                    </button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="upload" className="space-y-4 pt-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <FileUp className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Supports PDF, TXT, DOC, DOCX (Max 10MB)
                  </p>
                  <Button variant="secondary">Browse Files</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              AI-generated summary with key points and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasSummary ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-bold">Main Summary</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <p>
                      This research introduces a novel approach to transformer architecture optimization 
                      that reduces computational requirements by 40% while maintaining performance metrics. 
                      The key innovation is a sparse attention mechanism that dynamically allocates 
                      computational resources based on input complexity.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold">Key Points</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>40% reduction in computational requirements</li>
                    <li>Sparse attention mechanism that adapts to input complexity</li>
                    <li>Performance comparable to standard transformer models</li>
                    <li>Applicable to various NLP tasks including translation and summarization</li>
                    <li>Tested on multiple benchmark datasets with consistent results</li>
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                  <Button variant="outline">
                    <Volume2 className="mr-2 h-4 w-4" /> Listen
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground text-center">
                <div>
                  <p className="mb-2">Your summary will appear here</p>
                  <p className="text-sm">Enter a URL or upload a document to get started</p>
                </div>
              </div>
            )}
          </CardContent>
          {hasSummary && (
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="ghost" className="text-sm">Regenerate</Button>
              <Button>Export Summary</Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {hasSummary && (
        <div className="max-w-6xl mx-auto mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Prompts</CardTitle>
              <CardDescription>
                Use these prompts to dive deeper into specific aspects of the content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-between">
                  Explain the technical details <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="justify-between">
                  Compare with other approaches <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="justify-between">
                  Highlight limitations and challenges <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="justify-between">
                  Suggest potential applications <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="space-y-2">
            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
              1
            </div>
            <h3 className="font-bold">Input Content</h3>
            <p className="text-sm text-muted-foreground">
              Enter a URL or upload a document containing the content you want to summarize
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
              2
            </div>
            <h3 className="font-bold">AI Processing</h3>
            <p className="text-sm text-muted-foreground">
              Our advanced AI model analyzes the content and extracts the most important information
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
              3
            </div>
            <h3 className="font-bold">Get Summary</h3>
            <p className="text-sm text-muted-foreground">
              Review the concise summary and key points, with options to listen, copy, or export
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
