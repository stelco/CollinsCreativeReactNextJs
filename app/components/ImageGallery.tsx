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
  size?: 'default' | 'large';
}

export default function ImageGallery({ images, size = 'default' }: ImageGalleryProps) {
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

  const galleryClassName = size === 'large' ? 'gallery gallery-large' : 'gallery';
  const galleryItemClassName = size === 'large' ? 'gallery-item gallery-item-large' : 'gallery-item';

  return loading ? <GenericLoader /> : (
    <div className={`mt-6 ${galleryClassName}`}>
      {images.map((img) => (
        <div
          key={img.id}
          className={galleryItemClassName}
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
      />
    </div>
  );
}