import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Folder, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { DownloadHistoryItem } from '../types/download';

interface DownloadHistoryProps {
  items: DownloadHistoryItem[];
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const DownloadHistory: React.FC<DownloadHistoryProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No download history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {item.thumbnailUrl && (
              <div className="bg-muted relative h-48 md:h-full">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="col-span-1 md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg font-medium line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <StatusBadge status={item.status} />
                </div>
                <CardDescription className="truncate">
                  {item.url}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDate(item.timestamp)}</span>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <Badge variant="outline">{item.quality}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Folder className="h-4 w-4 mr-1" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

const StatusBadge: React.FC<{ status: DownloadHistoryItem['status'] }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Failed
        </Badge>
      );
    case 'processing':
      return (
        <Badge variant="secondary" className="animate-pulse">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Processing
        </Badge>
      );
  }
};

export default DownloadHistory;
