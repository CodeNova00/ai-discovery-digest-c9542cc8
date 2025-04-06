
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Twitter, Mail, ArrowRight, MessagesSquare, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const AboutPage = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setContactForm(prev => ({ ...prev, [id]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Sending email to ranaakshat45@gmail.com with:", contactForm);
      
      // In a real implementation, this would send the data to your backend
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          About AIgen
        </h1>
        <p className="text-xl text-muted-foreground">
          Your gateway to the world of artificial intelligence research and innovation
        </p>
      </section>

      {/* Our Mission */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Mission</h2>
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg backdrop-blur-sm border">
          <p className="text-lg mb-4">
            AIgen was founded with a simple but powerful mission: to make AI research accessible to everyone. 
            We believe that the rapid pace of AI innovation should be accessible not just to specialists, 
            but to students, developers, and enthusiasts across the globe.
          </p>
          <p className="text-lg">
            By curating, summarizing, and contextualizing the latest AI breakthroughs, we're building 
            a platform that empowers users to stay informed and inspired by the cutting edge of 
            artificial intelligence—without needing to spend hours sifting through technical papers.
          </p>
        </div>
      </section>

      {/* How AIgen Works */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">How AIgen Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-primary">1</span>
              </div>
              <CardTitle className="text-xl">Collection</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                We aggregate research papers, models, and tools from top sources including ArXiv, 
                GitHub, and Hugging Face using advanced web scraping and APIs.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-primary">2</span>
              </div>
              <CardTitle className="text-xl">Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Our AI system processes and analyzes the content to generate concise summaries, 
                extract key points, and categorize each item by relevance and topic.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-primary">3</span>
              </div>
              <CardTitle className="text-xl">Delivery</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                The curated content is presented through our platform and delivered 
                via customizable email digests based on your preferences and interests.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <div className="h-60 overflow-hidden">
              <img 
                src="/lovable-uploads/434ee80a-9146-405c-bf35-e91f795c14da.png" 
                alt="Akshat Singh" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <CardHeader>
              <CardTitle>Akshat Singh</CardTitle>
              <CardDescription>Co-Founder & Lead Developer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                AI researcher and full-stack developer with a passion for making complex technologies accessible to everyone.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="h-60 overflow-hidden">
              <img 
                src="/lovable-uploads/2da56150-349c-4c09-9435-de2aae1cf816.png" 
                alt="Sejal Mishra" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <CardHeader>
              <CardTitle>Sejal Mishra</CardTitle>
              <CardDescription>Co-Founder & Research Lead</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                NLP specialist with experience in building AI-powered summarization systems and content curation algorithms.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How often is the content updated?</AccordionTrigger>
            <AccordionContent>
              Our platform scans and updates with new AI research papers, tools, and models daily. The digest email frequency can be customized to daily, weekly, or monthly according to your preferences.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Is AIgen free to use?</AccordionTrigger>
            <AccordionContent>
              AIgen offers both free and premium subscription tiers. The free plan provides access to basic features, while premium plans offer additional capabilities like unlimited AI summarization, custom digests, and priority support.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>How are the AI summaries generated?</AccordionTrigger>
            <AccordionContent>
              We use state-of-the-art natural language processing models to analyze and summarize content. Our system is designed to extract the most important information while preserving the core concepts and technical accuracy.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I customize what content I receive?</AccordionTrigger>
            <AccordionContent>
              Yes! You can customize your digest by selecting specific categories of interest (like NLP, Computer Vision, or Reinforcement Learning) and setting your preferred delivery frequency.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>Do you have an API?</AccordionTrigger>
            <AccordionContent>
              We're currently developing an API that will allow developers to integrate AIgen's data and summaries into their own applications. Join our waitlist to be notified when it becomes available.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Get in Touch */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Have questions or feedback? We'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input
                      id="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <input
                    id="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
              <CardDescription>
                Follow us on social media or join our community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="text-sm font-medium">GitHub</h3>
                    <p className="text-xs text-muted-foreground">
                      Follow our open source projects
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="text-sm font-medium">Twitter</h3>
                    <p className="text-xs text-muted-foreground">
                      Stay updated with the latest announcements
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon">
                    <MessagesSquare className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="text-sm font-medium">Discord Community</h3>
                    <p className="text-xs text-muted-foreground">
                      Join discussions with other AI enthusiasts
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Email Us Directly</h3>
                <a href="mailto:ranaakshat45@gmail.com" className="text-primary hover:underline">
                  ranaakshat45@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Bhopal, Madhya Pradesh, India
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Ready to dive into AI research?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 opacity-90">
              Join thousands of researchers, developers, and AI enthusiasts who are staying at the forefront of AI innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.location.href = "/explore"}
              >
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 hover:bg-white/20 border-white/20"
                onClick={() => window.location.href = "/digest"}
              >
                Subscribe to Digest
                <Heart className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AboutPage;
