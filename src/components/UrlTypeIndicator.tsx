
import React from 'react';
import { Youtube, PlaySquare, ListVideo } from 'lucide-react';

interface UrlTypeIndicatorProps {
  urlType: 'video' | 'short' | 'playlist' | null;
}

const UrlTypeIndicator: React.FC<UrlTypeIndicatorProps> = ({ urlType }) => {
  switch (urlType) {
    case 'video':
      return <Youtube className="h-5 w-5 text-youtube" />;
    case 'short':
      return <PlaySquare className="h-5 w-5 text-youtube" />;
    case 'playlist':
      return <ListVideo className="h-5 w-5 text-youtube" />;
    default:
      return <Youtube className="h-5 w-5 text-muted-foreground" />;
  }
};

export default UrlTypeIndicator;

