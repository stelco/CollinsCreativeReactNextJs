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
  timestamp?: string | null;
}

interface ImageGalleryProps {
  images: Image[];
  size?: 'default' | 'large';
  timestampLabelPrefix?: string;
}

export default function ImageGallery({ images, size = 'default', timestampLabelPrefix = 'Ollie created this on' }: ImageGalleryProps) {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    setLoading(false);
  }, []);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const goToNextImage = () => {
    if (!images.length) return;
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    if (!images.length) return;
    setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const galleryClassName = size === 'large' ? 'gallery gallery-large' : 'gallery';
  const galleryItemClassName = size === 'large' ? 'gallery-item gallery-item-large' : 'gallery-item';

  return loading ? <GenericLoader /> : (
    <div className={`mt-6 ${galleryClassName}`}>
      {images.map((img, index) => (
        <div
          key={img.id}
          className={galleryItemClassName}
          style={{ cursor: 'pointer' }}
          onClick={() => openModal(index)}
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
        imgSrc={selectedIndex >= 0 ? images[selectedIndex].src : ''}
        imgAlt={selectedIndex >= 0 ? images[selectedIndex].alt : ''}
        imgTimestamp={selectedIndex >= 0 ? images[selectedIndex].timestamp : null}
        timestampLabelPrefix={timestampLabelPrefix}
        onNext={images.length > 1 ? goToNextImage : undefined}
        onPrevious={images.length > 1 ? goToPreviousImage : undefined}
      />
    </div>
  );
}