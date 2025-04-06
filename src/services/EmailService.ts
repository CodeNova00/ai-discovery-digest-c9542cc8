
import { toast } from "sonner";

class EmailService {
  private static RESEND_API_KEY = "re_aFQy1Ggq_8WR19y4maWq8n7BEpsntsazo";
  
  static async subscribeToDigest(email: string, preferences?: { 
    frequency?: "daily" | "weekly" | "monthly",
    categories?: string[]
  }): Promise<boolean> {
    try {
      console.log(`Subscribing ${email} to digest with preferences:`, preferences);
      
      // In a real implementation, this would be an API call to your backend
      // which would then use the Resend API to manage subscriptions
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("API Key used:", this.RESEND_API_KEY);
      
      // Return success
      toast.success("You're now subscribed! Check your email for confirmation.");
      return true;
    } catch (error) {
      console.error("Error subscribing to digest:", error);
      toast.error("Failed to subscribe. Please try again later.");
      return false;
    }
  }
  
  static async sendContactEmail(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
    try {
      console.log("Sending contact email with data:", formData);
      
      // In a real implementation, this would send to your backend
      // which would then use Resend API to send the email
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // The email would be sent to ranaakshat45@gmail.com
      console.log("Email would be sent to: ranaakshat45@gmail.com");
      console.log("API Key used:", this.RESEND_API_KEY);
      
      // Return success
      return true;
    } catch (error) {
      console.error("Error sending contact email:", error);
      return false;
    }
  }
}

export default EmailService;
