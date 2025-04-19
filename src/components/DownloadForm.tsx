import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Youtube, Download, FolderOpen, CheckCircle, PlaySquare, ListVideo } from "lucide-react";

interface DownloadFormProps {
  onAddToHistory: (download: DownloadHistoryItem) => void;
}

export interface DownloadHistoryItem {
  id: string;
  url: string;
  title: string;
  quality: string;
  location: string;
  timestamp: Date;
  status: 'completed' | 'failed' | 'processing';
  thumbnailUrl?: string;
  type: 'video' | 'short' | 'playlist';
}

const DownloadForm: React.FC<DownloadFormProps> = ({ onAddToHistory }) => {
  const [url, setUrl] = useState('');
  const [location, setLocation] = useState('/downloads');
  const [quality, setQuality] = useState('highest');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [urlType, setUrlType] = useState<'video' | 'short' | 'playlist' | null>(null);

  const validateYoutubeUrl = (input: string) => {
    const videoRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(\S*)?$/;
    const shortRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/|youtu\.be\/)([\w-]+)(\S*)?$/;
    const playlistRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=([\w-]+)(\S*)?$/;

    if (videoRegex.test(input)) {
      setUrlType('video');
      return true;
    } else if (shortRegex.test(input)) {
      setUrlType('short');
      return true;
    } else if (playlistRegex.test(input)) {
      setUrlType('playlist');
      return true;
    }
    
    setUrlType(null);
    return false;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);
    setIsValid(validateYoutubeUrl(input));
  };

  const getUrlTypeIcon = () => {
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

  const handleLocationSelect = () => {
    const locations = [
      '/downloads',
      '/videos',
      '/my-videos',
      '/youtube-downloads'
    ];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    setLocation(randomLocation);
    toast.success(`Location set to ${randomLocation}`);
  };

  const generateRandomTitle = () => {
    const titles = [
      'How to Build a Website in 2025',
      'Amazing Travel Destinations You Must Visit',
      'Learning React in 30 Days',
      'Top 10 Programming Languages in 2025',
      'The Ultimate Cooking Guide'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const processingTime = urlType === 'video' ? 3000 : 2000;
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      const newDownload: DownloadHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        url,
        title: generateRandomTitle(),
        quality,
        location,
        timestamp: new Date(),
        status: 'completed',
        thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/640/360`,
        type: urlType || 'video'
      };
      
      onAddToHistory(newDownload);
      toast.success(`${urlType === 'playlist' ? 'Playlist' : 'Video'} downloaded successfully!`);
      toast.info('Longer videos may take more time to process');
      setUrl('');
      setIsValid(false);
      setUrlType(null);
    } catch (error) {
      toast.error(`Failed to download ${urlType === 'playlist' ? 'playlist' : 'video'}`);
      console.error('Download error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="youtube-url" className="text-sm font-medium">
          YouTube URL
        </Label>
        <div className="input-field-container flex overflow-hidden rounded-lg">
          <div className="bg-primary/10 p-3 flex items-center">
            {getUrlTypeIcon()}
          </div>
          <Input
            id="youtube-url"
            placeholder={urlType === 'playlist' 
              ? "https://www.youtube.com/playlist?list=..." 
              : "https://www.youtube.com/watch?v=... or shorts/..."
            }
            value={url}
            onChange={handleUrlChange}
            className="flex-1 border-0 focus-visible:ring-0"
          />
        </div>
        {isValid && urlType && (
          <p className="text-xs text-muted-foreground mt-1">
            Detected type: {urlType.charAt(0).toUpperCase() + urlType.slice(1)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="download-location" className="text-sm font-medium">
            Download Location
          </Label>
          <div className="input-field-container flex overflow-hidden rounded-lg">
            <Input
              id="download-location"
              readOnly
              value={location}
              className="flex-1 border-0 focus-visible:ring-0"
            />
            <Button
              type="button"
              variant="outline"
              className="border-0"
              onClick={handleLocationSelect}
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Browse
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="video-quality" className="text-sm font-medium">
            Video Quality
          </Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger id="video-quality">
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="highest">Highest (1080p+)</SelectItem>
                <SelectItem value="high">High (720p)</SelectItem>
                <SelectItem value="medium">Medium (480p)</SelectItem>
                <SelectItem value="low">Low (360p)</SelectItem>
                <SelectItem value="audio">Audio Only</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={!isValid || isLoading} 
        className="w-full bg-gradient-brand hover:opacity-90 transition-opacity"
      >
        {isLoading ? (
          <>
            <span className="animate-pulse-slow">
              {urlType === 'playlist' ? 'Downloading Playlist...' : 'Downloading...'}
            </span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            {urlType === 'playlist' ? 'Download Playlist' : 'Download Video'}
          </>
        )}
      </Button>
    </form>
  );
};

export default DownloadForm;
