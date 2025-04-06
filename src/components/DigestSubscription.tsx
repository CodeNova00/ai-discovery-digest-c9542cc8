
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Mail } from "lucide-react";
import { toast } from "sonner";
import EmailService from "@/services/EmailService";
import { useAuth } from "@/hooks/useAuth";

interface DigestSubscriptionProps {
  defaultEmail?: string;
}

const DigestSubscription: React.FC<DigestSubscriptionProps> = ({ defaultEmail = "" }) => {
  const { isLoggedIn, user } = useAuth();
  const [email, setEmail] = useState(defaultEmail || (user?.email || ""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("weekly");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await EmailService.subscribeToDigest(email, {
        frequency,
        categories: ["NLP", "Computer Vision", "Reinforcement Learning"] // Default categories
      });
      
      if (success) {
        toast.success("You're now subscribed! Check your email for confirmation.");
        // In a real implementation, you would store this preference in your database
      }
    } catch (error) {
      console.error("Error subscribing to digest:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="shadow-lg border bg-card">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Stay Informed with AI Digest</CardTitle>
        <CardDescription>
          Get the latest AI developments delivered to your inbox
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Frequency</label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={frequency === "daily" ? "default" : "outline"}
                onClick={() => setFrequency("daily")}
                className="w-full"
              >
                Daily
              </Button>
              <Button
                type="button"
                variant={frequency === "weekly" ? "default" : "outline"}
                onClick={() => setFrequency("weekly")}
                className="w-full"
              >
                Weekly
              </Button>
              <Button
                type="button"
                variant={frequency === "monthly" ? "default" : "outline"}
                onClick={() => setFrequency("monthly")}
                className="w-full"
              >
                Monthly
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">What You'll Receive</label>
            <ul className="space-y-2">
              <li className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Summaries of the most important AI research papers</span>
              </li>
              <li className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Latest models and tools from top AI companies</span>
              </li>
              <li className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Trending GitHub repositories in the AI space</span>
              </li>
              <li className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Categorized by topic for easy navigation</span>
              </li>
            </ul>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          size="lg"
          disabled={isSubmitting}
          className="w-full"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe to AI Digest"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DigestSubscription;
