"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '@/app/components/Modal';
import { GenericLoader } from '@/app/ui/skeletons';

interface Image {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: Image[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: '', alt: '', width: 0, height: 0 });

  useEffect(() => {
    setLoading(false);
  }, []);

  const openModal = (img: Image) => {
    setSelectedImage(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage({ src: '', alt: '', width: 0, height: 0 });
  };

  return loading ? <GenericLoader /> : (
    <div className="mt-6 gallery">
      {images.map((img) => (
        <div
          key={img.id}
          className="gallery-item"
          style={{ cursor: 'pointer' }}
          onClick={() => openModal(img)}
        >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              layout="responsive"
              loading="lazy"
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