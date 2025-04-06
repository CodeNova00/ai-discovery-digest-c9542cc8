
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExternalLink, Heart, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type DiscoverySource = "github" | "huggingface" | "arxiv";

export interface DiscoveryCardProps {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  category: string;
  source: DiscoverySource;
  url: string;
  likes?: number;
  comments?: number;
}

const sourceColors = {
  github: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  huggingface: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  arxiv: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

const sourceNames = {
  github: "GitHub",
  huggingface: "Hugging Face",
  arxiv: "ArXiv"
};

const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  title,
  summary,
  tags,
  date,
  category,
  source,
  url,
  likes = 0,
  comments = 0
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Badge className={sourceColors[source]} variant="outline">
              {sourceNames[source]}
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              {category}
            </Badge>
          </div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-muted-foreground">{summary}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t flex flex-row justify-between items-center">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Heart className="h-4 w-4 mr-1" />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center text-sm"
        >
          Visit Source <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default DiscoveryCard;
