
import React, { useState } from "react";
import { Check, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import PaymentService from "@/services/PaymentService";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  period: string;
  features: PlanFeature[];
  badge?: string;
  popular?: boolean;
}

const Subscription = () => {
  const { user, isLoggedIn } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [processing, setProcessing] = useState(false);

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      description: "Basic access to AI discoveries and summaries",
      price: "₹0",
      priceValue: 0,
      period: "/month",
      features: [
        { name: "View latest AI discoveries", included: true },
        { name: "Basic search functionality", included: true },
        { name: "Limited trend analytics", included: true },
        { name: "Weekly digest (5 items)", included: true },
        { name: "AI summarization (2/day)", included: true },
        { name: "Community access", included: true },
        { name: "Full analytics & insights", included: false },
        { name: "Advanced search filters", included: false },
        { name: "Custom email digests", included: false },
        { name: "Unlimited AI summarization", included: false },
        { name: "Priority support", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Enhanced features for AI enthusiasts",
      price: billingCycle === "monthly" ? "₹149" : "₹1,490",
      priceValue: billingCycle === "monthly" ? 149 : 1490,
      period: billingCycle === "monthly" ? "/month" : "/year",
      features: [
        { name: "View latest AI discoveries", included: true },
        { name: "Basic search functionality", included: true },
        { name: "Limited trend analytics", included: true },
        { name: "Weekly digest (5 items)", included: true },
        { name: "AI summarization (2/day)", included: true },
        { name: "Community access", included: true },
        { name: "Full analytics & insights", included: true },
        { name: "Advanced search filters", included: true },
        { name: "Custom email digests", included: true },
        { name: "Unlimited AI summarization", included: false },
        { name: "Priority support", included: false },
      ],
      popular: true,
      badge: "Most Popular",
    },
    {
      id: "pro-plus",
      name: "Pro+",
      description: "Ultimate package for AI researchers",
      price: billingCycle === "monthly" ? "₹399" : "₹3,990",
      priceValue: billingCycle === "monthly" ? 399 : 3990,
      period: billingCycle === "monthly" ? "/month" : "/year",
      features: [
        { name: "View latest AI discoveries", included: true },
        { name: "Basic search functionality", included: true },
        { name: "Limited trend analytics", included: true },
        { name: "Weekly digest (5 items)", included: true },
        { name: "AI summarization (2/day)", included: true },
        { name: "Community access", included: true },
        { name: "Full analytics & insights", included: true },
        { name: "Advanced search filters", included: true },
        { name: "Custom email digests", included: true },
        { name: "Unlimited AI summarization", included: true },
        { name: "Priority support", included: true },
      ],
    },
  ];
  
  const handleSubscription = async (planId: string) => {
    if (!isLoggedIn) {
      toast.error("Please login to subscribe");
      return;
    }
    
    setProcessing(true);
    
    try {
      if (planId === "free") {
        await PaymentService.subscribeToFreePlan();
      } else if (planId === "pro") {
        await PaymentService.subscribeToProPlan(billingCycle);
      } else if (planId === "pro-plus") {
        await PaymentService.subscribeToPlusPlan(billingCycle);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("An error occurred during subscription. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const getButtonText = (planId: string) => {
    if (user?.subscriptionTier === planId) {
      return "Current Plan";
    }
    
    if (planId === "free") {
      return "Start for Free";
    }
    
    return "Subscribe";
  };

  const calculateSavings = (plan: Plan) => {
    if (billingCycle === "annually") {
      const monthlyCost = plan.id === "pro" ? 149 : 399;
      const yearlyCost = plan.priceValue;
      const monthlyCostForYear = monthlyCost * 12;
      const savings = monthlyCostForYear - yearlyCost;
      const savingsPercentage = Math.round((savings / monthlyCostForYear) * 100);
      
      return `Save ${savingsPercentage}%`;
    }
    
    return null;
  };

  return (
    <div className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-xl text-muted-foreground">
          Unlock the full potential of AIgen with a plan that fits your needs
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <Tabs 
          value={billingCycle} 
          onValueChange={(v) => setBillingCycle(v as "monthly" | "annually")}
          className="w-full max-w-xs"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annually">
              <span className="flex items-center">
                Annually
                <Badge className="ml-2 bg-green-500 text-[10px] px-1.5 py-0 h-4">-20%</Badge>
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}
          >
            {plan.badge && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-gradient-to-r from-primary to-purple-600 px-3 py-1">
                  {plan.badge}
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                {calculateSavings(plan) && (
                  <Badge variant="outline" className="mt-2 text-green-500 border-green-500">
                    {calculateSavings(plan)}
                  </Badge>
                )}
              </div>
              
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className={`mt-0.5 ${feature.included ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {feature.included ? <Check className="h-4 w-4" /> : <span className="block h-4 w-4" />}
                    </div>
                    <span className={feature.included ? '' : 'text-muted-foreground line-through'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full"
                variant={plan.popular ? "default" : plan.id === "free" ? "outline" : "secondary"}
                disabled={user?.subscriptionTier === plan.id || processing}
                onClick={() => handleSubscription(plan.id)}
              >
                {processing ? (
                  <span className="flex items-center">
                    <Zap className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  getButtonText(plan.id)
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted rounded-lg p-8 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Payment Methods</h2>
          <p className="text-muted-foreground">We accept various payment methods for your convenience</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background rounded-lg p-4 flex items-center justify-center h-16">
            <CreditCard className="h-8 w-8 mr-2" />
            <span>Credit Card</span>
          </div>
          <div className="bg-background rounded-lg p-4 flex items-center justify-center h-16">
            <span className="font-bold mr-1">G</span>
            <span>Google Pay</span>
          </div>
          <div className="bg-background rounded-lg p-4 flex items-center justify-center h-16">
            <span className="font-bold text-primary mr-1">P</span>
            <span>PayPal</span>
          </div>
          <div className="bg-background rounded-lg p-4 flex items-center justify-center h-16">
            <span className="font-bold mr-1">UPI</span>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>All plans include a 7-day free trial. Cancel anytime before the trial ends and you won't be charged.</p>
          <p className="mt-2">Have questions? <a href="#" className="text-primary underline">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
