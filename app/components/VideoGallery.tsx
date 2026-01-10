"use client";

import React, { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: '', alt: '', width: 0, height: 0 });

  useEffect(() => {
    setLoading(false);
  }, []);

  const openModal = (video: Video) => {
    setSelectedImage(video);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage({ src: '', alt: '', width: 0, height: 0 });
  };

  return loading ? <GenericLoader /> : (
    <div className="mt-6 gallery-video">
      {videos.map((video: Video) => (
        <div
          key={video.id}
          className="gallery-item"
          style={{ cursor: 'pointer' }}
          onClick={() => openModal(video)}
        >
            <video
              src={video.src}
              width={video.width}
              height={video.height}
            />
        </div>
      ))}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        imgSrc={selectedImage.src}
        imgAlt={selectedImage.alt}
        imgWidth={selectedImage.width}
        imgHeight={selectedImage.height}  
      />
    </div>
  );
}