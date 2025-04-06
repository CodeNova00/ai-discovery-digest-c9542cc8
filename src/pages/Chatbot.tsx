
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Chatbot = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 text-center mb-8">
        <h1 className="text-3xl font-bold">AI Research Assistant</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get answers to your AI research questions, explanations of complex concepts, 
          and help finding relevant papers and tools.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto overflow-hidden">
        <CardHeader className="bg-gradient-blue-purple text-white text-center py-6">
          <h2 className="text-2xl font-bold">Chat with AIgen Assistant</h2>
          <p className="text-sm opacity-90">
            Powered by advanced AI models to assist with your research needs
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/trUKho81CWVamoQtWJLUO"
            width="100%"
            style={{ height: "700px" }}
            frameBorder="0"
            title="AIgen Chatbot"
          ></iframe>
        </CardContent>
      </Card>

      <div className="mt-12 space-y-8 max-w-3xl mx-auto">
        <div>
          <h3 className="text-xl font-bold mb-3">What can the AI assistant help with?</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Explaining complex AI concepts and terminology</li>
            <li>Finding relevant research papers based on your interests</li>
            <li>Recommending AI tools and libraries for specific tasks</li>
            <li>Summarizing research findings and technical papers</li>
            <li>Providing explanations of AI algorithms and models</li>
            <li>Answering questions about latest AI trends and developments</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Tips for effective interaction</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Be specific in your questions for more accurate responses</li>
            <li>Ask for clarification if you don't understand something</li>
            <li>Use technical terms when appropriate for more precise answers</li>
            <li>Request examples if you need practical applications</li>
            <li>Break down complex questions into smaller, focused queries</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
