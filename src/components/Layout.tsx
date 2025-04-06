
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,rgba(93,0,255,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(102,0,255,0.05),transparent_70%)]">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
