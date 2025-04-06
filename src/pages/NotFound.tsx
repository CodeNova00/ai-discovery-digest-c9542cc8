
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold gradient-text">404</h1>
        <h2 className="text-3xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/explore">
              <Search className="mr-2 h-4 w-4" /> Explore AIgen
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
