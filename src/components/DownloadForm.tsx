
import React from 'react';
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
import { Download, FolderOpen } from 'lucide-react';
import type { DownloadHistoryItem } from './DownloadForm';
import { useDownload } from '../hooks/useDownload';
import UrlTypeIndicator from './UrlTypeIndicator';

interface DownloadFormProps {
  onAddToHistory: (download: DownloadHistoryItem) => void;
}

const DownloadForm: React.FC<DownloadFormProps> = ({ onAddToHistory }) => {
  const {
    url,
    location,
    quality,
    isLoading,
    isValid,
    urlType,
    handleUrlChange,
    handleLocationSelect,
    handleDownload,
    setQuality
  } = useDownload(onAddToHistory);

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="youtube-url" className="text-sm font-medium">
          YouTube URL
        </Label>
        <div className="input-field-container flex overflow-hidden rounded-lg">
          <div className="bg-primary/10 p-3 flex items-center">
            <UrlTypeIndicator urlType={urlType} />
          </div>
          <Input
            id="youtube-url"
            placeholder={urlType === 'playlist' 
              ? "https://www.youtube.com/playlist?list=..." 
              : "https://www.youtube.com/watch?v=... or shorts/..."
            }
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
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

