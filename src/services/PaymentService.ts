
import { toast } from "sonner";

class PaymentService {
  private static STRIPE_CHECKOUT_URL = "https://book.stripe.com/test_14k5m05Mogl59Dq6oo";
  
  static async subscribeToFreePlan(): Promise<boolean> {
    try {
      // For free plan, we just need to update the user record
      // In a real implementation, this would be stored in your database
      
      toast.success("You've successfully subscribed to the Free plan!");
      return true;
    } catch (error) {
      console.error("Error subscribing to Free plan:", error);
      toast.error("Failed to subscribe to Free plan. Please try again.");
      return false;
    }
  }
  
  static async subscribeToProPlan(billingCycle: "monthly" | "annually"): Promise<void> {
    try {
      console.log(`Redirecting to Pro plan checkout for ${billingCycle} billing`);
      
      // In a real implementation, this would create a Stripe checkout session
      // and then redirect the user to that session URL
      
      // For demo purposes, we'll redirect to the provided Stripe test URL
      window.location.href = this.STRIPE_CHECKOUT_URL;
    } catch (error) {
      console.error("Error starting Pro subscription:", error);
      toast.error("Failed to start checkout process. Please try again.");
    }
  }
  
  static async subscribeToPlusPlan(billingCycle: "monthly" | "annually"): Promise<void> {
    try {
      console.log(`Redirecting to Pro+ plan checkout for ${billingCycle} billing`);
      
      // In a real implementation, this would create a Stripe checkout session
      // with different price IDs based on the plan and billing cycle
      
      // For demo purposes, we'll redirect to the provided Stripe test URL
      window.location.href = this.STRIPE_CHECKOUT_URL;
    } catch (error) {
      console.error("Error starting Pro+ subscription:", error);
      toast.error("Failed to start checkout process. Please try again.");
    }
  }
}

export default PaymentService;
