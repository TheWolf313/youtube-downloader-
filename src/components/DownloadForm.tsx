
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
import { Youtube, Download, FolderOpen, CheckCircle } from "lucide-react";

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
}

const DownloadForm: React.FC<DownloadFormProps> = ({ onAddToHistory }) => {
  const [url, setUrl] = useState('');
  const [location, setLocation] = useState('/downloads');
  const [quality, setQuality] = useState('highest');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateYoutubeUrl = (input: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return regex.test(input);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);
    setIsValid(validateYoutubeUrl(input));
  };

  const handleLocationSelect = () => {
    // In a real app, this would open a file dialog
    // For this demo, we'll simulate selecting a location
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
      // This would be an actual API call in a real application
      // For demo purposes, we'll simulate a download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDownload: DownloadHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        url,
        title: generateRandomTitle(),
        quality,
        location,
        timestamp: new Date(),
        status: 'completed',
        thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/640/360`
      };
      
      onAddToHistory(newDownload);
      toast.success('Video downloaded successfully!');
      setUrl('');
      setIsValid(false);
    } catch (error) {
      toast.error('Failed to download video');
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
            <Youtube className="h-5 w-5 text-youtube" />
          </div>
          <Input
            id="youtube-url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={handleUrlChange}
            className="flex-1 border-0 focus-visible:ring-0"
          />
        </div>
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
            <span className="animate-pulse-slow">Downloading...</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download Video
          </>
        )}
      </Button>
    </form>
  );
};

export default DownloadForm;
