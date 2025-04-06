
export interface DiscoveryCardProps {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  date: string;
  category: string;
  tags?: string[];
  imageUrl?: string;
  className?: string;
}

export default DiscoveryCardProps;
