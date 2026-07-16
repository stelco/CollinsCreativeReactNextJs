"use client";

import React, { useState, useEffect } from 'react';
import { GenericLoader } from '@/app/ui/skeletons';

interface Video {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface VideoGalleryProps {
  videos: Video[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <GenericLoader /> : (
    <div className="mt-6 gallery-video">
      {videos.map((video: Video) => (
        <div
          key={video.id}
          className="gallery-item"
        >
            <video
              src={video.src}
              width={video.width}
              height={video.height}
              controls
              preload="metadata"
              playsInline
            />
        </div>
      ))}
    </div>
  );
}