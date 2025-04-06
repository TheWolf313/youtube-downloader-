
import React, { useState } from 'react';
import Header from '@/components/Header';
import DownloadForm, { DownloadHistoryItem } from '@/components/DownloadForm';
import DownloadHistory from '@/components/DownloadHistory';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, History } from 'lucide-react';

const Index = () => {
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);

  const handleAddToHistory = (download: DownloadHistoryItem) => {
    setHistory((prev) => [download, ...prev]);
  };

  return (
    <div className="app-background min-h-screen pb-10">
      <Header />
      
      <main className="container mx-auto px-4 pt-6">
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-xl border-0">
          <CardContent className="p-6">
            <Tabs defaultValue="download" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="download" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <History className="h-4 w-4" />
                  <span>History</span>
                  {history.length > 0 && (
                    <span className="ml-1 bg-primary/20 px-2 py-0.5 rounded-full text-xs">
                      {history.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="download" className="mt-6">
                <div className="max-w-2xl mx-auto">
                  <DownloadForm onAddToHistory={handleAddToHistory} />
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <DownloadHistory items={history} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>For demonstration purposes only. No actual videos are downloaded.</p>
          <p className="mt-1">In a real application, server-side code would handle the YouTube video downloading.</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
