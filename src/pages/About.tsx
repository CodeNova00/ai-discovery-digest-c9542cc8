
import React from "react";
import { Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About AIgen</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connecting AI researchers, developers, and enthusiasts with the latest breakthroughs
          in artificial intelligence research and tools.
        </p>
      </section>

      {/* Mission */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            At AIgen, we're on a mission to make AI research more accessible, understandable, and
            actionable for everyone interested in artificial intelligence. We believe that by
            aggregating, summarizing, and analyzing the latest AI research and tools, we can
            help accelerate innovation and discovery in the field.
          </p>
          <p className="text-lg text-muted-foreground">
            Our platform is designed to save researchers, developers, students, and AI enthusiasts
            valuable time by providing concise summaries and insights, allowing them to focus on
            what matters most – applying and building upon these innovations.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 bg-muted rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">How AIgen Works</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-16 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">AI Data Collection</h3>
                <p className="text-muted-foreground">
                  We continuously monitor and collect data from leading AI sources like GitHub,
                  Hugging Face, and ArXiv to identify the latest developments in AI research,
                  models, and tools.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-16 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Smart Summarization</h3>
                <p className="text-muted-foreground">
                  Using advanced AI, we generate concise summaries of complex research papers
                  and tools, extracting key insights, methodologies, and results. We also
                  categorize and tag content for easy discovery.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-16 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Insights & Analytics</h3>
                <p className="text-muted-foreground">
                  We analyze trends and patterns in AI research to provide valuable insights
                  into the direction and pace of AI development across different domains and
                  applications.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-16 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Personalized Delivery</h3>
                <p className="text-muted-foreground">
                  Users can subscribe to customized email digests based on their interests,
                  ensuring they never miss important developments in their specific areas of
                  interest in AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold">Akshat Singh</h3>
                  <p className="text-muted-foreground mb-2">Co-Founder & AI Researcher</p>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold">Sejal Mishra</h3>
                  <p className="text-muted-foreground mb-2">Co-Founder & ML Engineer</p>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How often is AIgen updated with new content?</AccordionTrigger>
              <AccordionContent>
                AIgen is updated daily with the latest AI research papers, tools, and models from
                our monitored sources. Our automated systems continuously scan for new entries,
                ensuring you always have access to the most recent developments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I customize my email digest?</AccordionTrigger>
              <AccordionContent>
                After signing up, you can visit your profile settings to customize your email
                digest preferences. You can select specific categories, sources, and frequency
                (daily or weekly) to receive updates tailored to your interests.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is AIgen free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, AIgen offers a free tier that provides access to basic features including
                browsing recent discoveries and limited email digests. We also offer a Pro tier
                with additional features like advanced filtering, full archive access, and
                customizable alerts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How accurate are the AI-generated summaries?</AccordionTrigger>
              <AccordionContent>
                Our AI-generated summaries are designed to capture the key points and insights
                from research papers and tool documentation. While we strive for high accuracy,
                we always recommend referring to the original sources for critical research or
                implementation details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I suggest a source to be included in AIgen?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We welcome suggestions for additional sources to monitor. Please
                contact us through the form on our website with details about the source you'd
                like us to include, and our team will evaluate it for potential addition.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-gradient-blue-purple rounded-lg text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-8 opacity-90">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
          <Button variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
