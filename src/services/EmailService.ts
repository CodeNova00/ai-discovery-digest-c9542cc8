
import { toast } from "sonner";

class EmailService {
  private static RESEND_API_KEY = "re_aFQy1Ggq_8WR19y4maWq8n7BEpsntsazo";
  private static RECIPIENT_EMAIL = "ranaakshat45@gmail.com";
  
  /**
   * Subscribe a user to the AI digest with optional preferences
   */
  static async subscribeToDigest(email: string, preferences?: { 
    frequency?: "daily" | "weekly" | "monthly",
    categories?: string[]
  }): Promise<boolean> {
    try {
      console.log(`Subscribing ${email} to digest with preferences:`, preferences);
      
      // In a production environment, we would send this to a backend API
      // that would use Resend to actually send the email
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a production environment, this would be done on the backend
      const htmlContent = this.generateSubscriptionConfirmationEmail(email, preferences);
      
      // Log what would be sent in a real implementation
      console.log("API Key used:", this.RESEND_API_KEY);
      console.log("Would send confirmation email with content:", htmlContent);
      
      // In a real implementation, we would also add the subscriber to a database
      console.log("Would add subscriber to database:", { email, preferences, status: "active" });
      
      // Show success message
      toast.success("You're now subscribed! Check your email for confirmation.");
      return true;
    } catch (error) {
      console.error("Error subscribing to digest:", error);
      toast.error("Failed to subscribe. Please try again later.");
      return false;
    }
  }
  
  /**
   * Send a contact email to the site administrators
   */
  static async sendContactEmail(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
    try {
      console.log("Sending contact email with data:", formData);
      
      // In a production environment, we would send this to a backend API
      // that would use Resend to actually send the email
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a production environment, this would be done on the backend
      const htmlContent = this.generateContactEmailContent(formData);
      
      // Log what would be sent in a real implementation
      console.log("API Key used:", this.RESEND_API_KEY);
      console.log("Would send contact email to:", this.RECIPIENT_EMAIL);
      console.log("With content:", htmlContent);
      
      // Show success message to the user
      toast.success("Your message has been sent! We'll get back to you soon.");
      return true;
    } catch (error) {
      console.error("Error sending contact email:", error);
      toast.error("Failed to send message. Please try again later.");
      return false;
    }
  }
  
  /**
   * Send AI digest email to subscribers
   */
  static async sendDigestEmail(subscribers: string[], digestData: any): Promise<boolean> {
    try {
      console.log(`Sending AI digest to ${subscribers.length} subscribers`);
      
      // In a production environment, we would send this to a backend API
      // that would use Resend to actually send emails to each subscriber
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a production environment, this would be done on the backend
      const htmlContent = this.generateDigestEmailContent(digestData);
      
      // Log what would be sent in a real implementation
      console.log("API Key used:", this.RESEND_API_KEY);
      console.log("Would send digest email to:", subscribers);
      console.log("With content:", htmlContent);
      
      return true;
    } catch (error) {
      console.error("Error sending digest emails:", error);
      return false;
    }
  }
  
  /**
   * Generate HTML content for subscription confirmation email
   */
  private static generateSubscriptionConfirmationEmail(email: string, preferences?: { 
    frequency?: "daily" | "weekly" | "monthly",
    categories?: string[]
  }): string {
    const frequency = preferences?.frequency || "weekly";
    const categories = preferences?.categories?.join(", ") || "All categories";
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { width: 120px; height: auto; }
          h1 { color: #8b5cf6; }
          .content { margin-bottom: 30px; }
          .footer { font-size: 12px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
          .button { display: inline-block; background-color: #8b5cf6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://yourdomain.com/logo.png" alt="AIgen Logo" class="logo">
            <h1>Welcome to AIgen Digest!</h1>
          </div>
          
          <div class="content">
            <p>Hello,</p>
            <p>Thank you for subscribing to AIgen Digest! You'll now receive updates on the latest AI research, tools, and innovations delivered right to your inbox.</p>
            
            <p><strong>Your subscription details:</strong></p>
            <ul>
              <li>Email: ${email}</li>
              <li>Frequency: ${frequency}</li>
              <li>Categories: ${categories}</li>
            </ul>
            
            <p>Your first digest will arrive soon. In the meantime, you can explore our platform to discover the latest AI innovations.</p>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="https://yourdomain.com/explore" class="button">Explore AI Discoveries</a>
            </p>
          </div>
          
          <div class="footer">
            <p>© 2025 AIgen. All rights reserved.</p>
            <p>If you didn't subscribe to AIgen Digest, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  /**
   * Generate HTML content for contact email
   */
  private static generateContactEmailContent(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { margin-bottom: 20px; }
          h1 { color: #8b5cf6; }
          .content { margin-bottom: 30px; }
          .message { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
          .footer { font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          
          <div class="content">
            <p><strong>From:</strong> ${formData.name} (${formData.email})</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <div class="message">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div class="footer">
            <p>This message was sent from the contact form on AIgen website.</p>
            <p>Received on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  /**
   * Generate HTML content for AI digest email
   */
  private static generateDigestEmailContent(digestData: any): string {
    // This would generate a more complex HTML email with the digest data
    // For brevity, we're just returning a simple template
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { width: 120px; height: auto; }
          h1 { color: #8b5cf6; }
          h2 { color: #6d28d9; border-bottom: 1px solid #eee; padding-bottom: 10px; }
          .content { margin-bottom: 30px; }
          .discovery { margin-bottom: 20px; }
          .discovery h3 { margin-bottom: 5px; }
          .discovery p { margin-top: 0; }
          .footer { font-size: 12px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
          .button { display: inline-block; background-color: #8b5cf6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://yourdomain.com/logo.png" alt="AIgen Logo" class="logo">
            <h1>Your Weekly AI Digest</h1>
            <p>${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div class="content">
            <h2>Trending on GitHub</h2>
            <div class="discovery">
              <h3>llama3/llama3</h3>
              <p>The latest open-source large language model from Meta AI</p>
              <p><a href="https://github.com/llama3/llama3">View on GitHub</a></p>
            </div>
            
            <h2>Latest from Hugging Face</h2>
            <div class="discovery">
              <h3>mistralai/Mistral-7B-Instruct-v0.2</h3>
              <p>A powerful instruction-following model with 7B parameters</p>
              <p><a href="https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2">View on Hugging Face</a></p>
            </div>
            
            <h2>New Research Papers</h2>
            <div class="discovery">
              <h3>Advancing Self-Supervised Learning for Multi-Modal Representations</h3>
              <p>By Jane Smith, John Doe, Ava Chen</p>
              <p><a href="https://arxiv.org/abs/2404.12345">Read on arXiv</a></p>
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="https://yourdomain.com/explore" class="button">Explore More Discoveries</a>
            </p>
          </div>
          
          <div class="footer">
            <p>© 2025 AIgen. All rights reserved.</p>
            <p><a href="https://yourdomain.com/unsubscribe">Unsubscribe</a> | <a href="https://yourdomain.com/preferences">Manage Preferences</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default EmailService;
