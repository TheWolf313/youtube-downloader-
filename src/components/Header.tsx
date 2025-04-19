
import React from 'react';
import { Download } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="bg-gradient-brand p-2 rounded-lg mr-3">
            <Download className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-brand">
            YouTube Downloader
          </h1>
        </div>
        <p className="text-center text-muted-foreground mt-2">
          Download YouTube videos and playlists for offline viewing
        </p>
      </div>
    </header>
  );
};

export default Header;
