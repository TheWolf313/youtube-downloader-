
export interface DownloadHistoryItem {
  id: string;
  url: string;
  title: string;
  quality: string;
  location: string;
  timestamp: Date;
  status: 'completed' | 'failed' | 'processing';
  thumbnailUrl: string;
  type: 'video' | 'short' | 'playlist' | null;
}
