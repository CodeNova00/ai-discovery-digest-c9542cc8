
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileUp, Link as LinkIcon, RefreshCw, Volume2, Copy, ArrowRight, FileText, X, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const Summarizer = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSummary, setHasSummary] = useState(false);
  const [activeTab, setActiveTab] = useState("url");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }
    
    const allowedTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Unsupported file type. Please upload PDF, TXT, DOC, or DOCX");
      return;
    }
    
    setFileName(file.name);
    setFileSize(file.size);
    
    // Simulate file upload progress
    setIsLoading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setHasSummary(true);
            toast.success("Summary generated from uploaded file!");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setFileName("");
    setFileSize(0);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("This is the generated summary text that would be copied to clipboard.");
    toast.success("Summary copied to clipboard");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">AI Content Summarizer</h1>
        <p className="text-xl text-muted-foreground">
          Convert lengthy research papers, articles, or documentation into concise, 
          easy-to-understand summaries powered by AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card className="h-fit shadow-md hover:shadow-lg transition-shadow">
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
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 transition-colors",
                    isDragging ? "border-primary bg-primary/5" : "border-border",
                    fileName ? "bg-muted/50" : ""
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!fileName ? (
                    <div className="text-center">
                      <FileUp className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supports PDF, TXT, DOC, DOCX (Max 10MB)
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".pdf,.txt,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <Button variant="secondary" onClick={handleBrowseFiles}>Browse Files</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{fileName}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(fileSize)}</p>
                        </div>
                        {isLoading ? (
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-destructive"
                            onClick={clearFile}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                      {isLoading && (
                        <div className="space-y-2">
                          <Progress value={uploadProgress} className="h-2" />
                          <p className="text-xs text-center text-muted-foreground">
                            {uploadProgress < 100 ? 'Uploading...' : 'Analyzing document...'}
                          </p>
                        </div>
                      )}
                      {!isLoading && (
                        <Button 
                          className="w-full" 
                          onClick={handleSubmit}
                        >
                          Summarize Document
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="h-fit shadow-md hover:shadow-lg transition-shadow">
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
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(
                        "This research introduces a novel approach to transformer architecture optimization that reduces computational requirements by 40% while maintaining performance metrics. The key innovation is a sparse attention mechanism that dynamically allocates computational resources based on input complexity."
                      );
                      window.speechSynthesis.speak(utterance);
                      toast.success("Audio playback started");
                    }}
                  >
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
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => {
                  setHasSummary(false);
                  setTimeout(() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setHasSummary(true);
                      toast.success("Summary regenerated!");
                    }, 1500);
                  }, 10);
                }}
              >
                Regenerate
              </Button>
              <Button
                onClick={() => {
                  const summaryText = "This research introduces a novel approach to transformer architecture optimization that reduces computational requirements by 40% while maintaining performance metrics. The key innovation is a sparse attention mechanism that dynamically allocates computational resources based on input complexity.\n\nKey Points:\n- 40% reduction in computational requirements\n- Sparse attention mechanism that adapts to input complexity\n- Performance comparable to standard transformer models\n- Applicable to various NLP tasks including translation and summarization\n- Tested on multiple benchmark datasets with consistent results";
                  
                  const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.setAttribute('href', url);
                  link.setAttribute('download', 'ai-summary.txt');
                  link.style.visibility = 'hidden';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  
                  toast.success("Summary exported successfully");
                }}
              >
                Export Summary
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {hasSummary && (
        <div className="max-w-6xl mx-auto mt-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Suggested Prompts</CardTitle>
              <CardDescription>
                Use these prompts to dive deeper into specific aspects of the content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-between"
                  onClick={() => toast.info("Generating technical details...")}
                >
                  Explain the technical details <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-between"
                  onClick={() => toast.info("Comparing with other approaches...")}
                >
                  Compare with other approaches <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-between"
                  onClick={() => toast.info("Analyzing limitations and challenges...")}
                >
                  Highlight limitations and challenges <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-between"
                  onClick={() => toast.info("Suggesting potential applications...")}
                >
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
