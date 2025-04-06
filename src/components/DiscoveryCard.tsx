
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Share2, Bookmark, BookmarkCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface DiscoveryCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  source: string;
  sourceUrl: string;
  tags: string[];
  image?: string;
}

const DiscoveryCard = ({
  id,
  title,
  summary,
  date,
  category,
  source,
  sourceUrl,
  tags,
  image
}: DiscoveryCardProps) => {
  const [saved, setSaved] = React.useState(false);
  const { isLoggedIn } = useAuth();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      toast.error("Please log in to save items", {
        action: {
          label: "Login",
          onClick: () => window.location.href = "/login"
        }
      });
      return;
    }
    
    setSaved(!saved);
    toast.success(saved ? "Removed from saved items" : "Added to saved items");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: title,
        text: summary,
        url: window.location.origin + "/discovery/" + id
      })
      .then(() => toast.success("Shared successfully"))
      .catch((error) => {
        console.error("Error sharing:", error);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(
      `${title}\n\n${summary}\n\nCheck it out at: ${window.location.origin}/discovery/${id}`
    );
    toast.success("Link copied to clipboard");
  };

  const handleCardClick = () => {
    window.open(sourceUrl, "_blank", "noopener,noreferrer");
  };

  const getSourceIcon = () => {
    switch (source.toLowerCase()) {
      case 'github':
        return '🐙';
      case 'arxiv':
        return '📄';
      case 'hugging face':
        return '🤗';
      default:
        return '🔗';
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-0">
        <p className="text-muted-foreground text-sm line-clamp-4">
          {summary}
        </p>
        <div className="flex flex-wrap gap-1 mt-4">
          {tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="font-normal text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="font-normal text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="mr-1">{getSourceIcon()}</span>
          {source}
        </div>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleSave}
            title={saved ? "Remove from saved" : "Save for later"}
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleShare}
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(sourceUrl, "_blank", "noopener,noreferrer");
            }}
            title="View source"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DiscoveryCard;
