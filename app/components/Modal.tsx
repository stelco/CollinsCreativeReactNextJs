// components/Modal.tsx
import React, { useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  imgAlt: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imgSrc, imgAlt, onNext, onPrevious }) => {
  if (!isOpen) return null;

  const isPdf = imgSrc.endsWith('.pdf');
  const isVideo = imgSrc.endsWith('.mp4');
  const isImage = !isPdf && !isVideo;
  const canNavigate = isImage && !!onNext && !!onPrevious;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (!canNavigate) return;

      if (event.key === 'ArrowRight') {
        onNext();
      }

      if (event.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canNavigate, onClose, onNext, onPrevious]);

  return (
    <div className="modal">
      <div
        className={`modal-content ${
          isImage
            ? 'w-auto bg-transparent overflow-visible shadow-none'
            : 'w-[92vw] md:w-[80vw] lg:w-[70vw]'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        <XCircleIcon
          className="absolute top-0 right-0 m-4 text-black w-6 md:w-10"
          style={{ cursor: 'hand', borderRadius: '50%', backgroundColor: '#fff', zIndex: 99999 }}
          onClick={onClose}
        />

          {canNavigate && (
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-500 bg-transparent p-2 text-gray-500 transition-colors hover:bg-white/80 hover:text-black"
              style={{ zIndex: 99999 }}
              onClick={onPrevious}
            >
              <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          )}

          {canNavigate && (
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-500 bg-transparent p-2 text-gray-500 transition-colors hover:bg-white/80 hover:text-black"
              style={{ zIndex: 99999 }}
              onClick={onNext}
            >
              <ChevronRightIcon className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          )}
   
          {isPdf && (
            <div className="pdf-container">
              <iframe
                src={imgSrc}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </div>
          )}
         
          { isVideo && (
            <video
              src={imgSrc}
              width="100%"
              height="100%"
              controls
              autoPlay
            />
          )}

          { isImage && (
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={1600}
              height={1600}
              sizes="92vw"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '92vw',
                maxHeight: '85vh',
              }}
            />
          )}
        </div>
      </div>

  );
};

export default Modal;