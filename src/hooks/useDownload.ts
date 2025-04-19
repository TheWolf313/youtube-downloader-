import { useState } from 'react';
import { toast } from 'sonner';
import { validateYoutubeUrl } from '../utils/youtubeValidator';
import type { DownloadHistoryItem } from '../types/download';

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

export const useDownload = (onAddToHistory: (download: DownloadHistoryItem) => void) => {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('highest');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [urlType, setUrlType] = useState<'video' | 'short' | 'playlist' | null>(null);

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const { isValid: valid, type } = validateYoutubeUrl(input);
    setIsValid(valid);
    setUrlType(type);
  };

  const handleDownload = async () => {
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
        timestamp: new Date(),
        status: 'completed',
        thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/640/360`,
        type: urlType || 'video'
      };
      
      onAddToHistory(newDownload);
      toast.success(`${urlType === 'playlist' ? 'Playlist' : 'Video'} downloaded successfully!`);
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

  return {
    url,
    quality,
    isLoading,
    isValid,
    urlType,
    handleUrlChange,
    handleDownload,
    setQuality
  };
};
