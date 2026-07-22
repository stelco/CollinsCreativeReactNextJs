// components/Modal.tsx
import React, { useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  imgAlt: string;
  imgTimestamp?: string | null;
  timestampLabelPrefix?: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imgSrc, imgAlt, imgTimestamp, timestampLabelPrefix = 'Ollie created this on', onNext, onPrevious }) => {
  if (!isOpen) return null;

  const isPdf = imgSrc.endsWith('.pdf');
  const isVideo = imgSrc.endsWith('.mp4');
  const isImage = !isPdf && !isVideo;
  const canNavigate = isImage && !!onNext && !!onPrevious;
  const formattedTimestamp = imgTimestamp ? new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(imgTimestamp)) : null;

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
        <button
          type="button"
          aria-label="Close image"
          className="absolute right-4 top-4 rounded-full border border-white bg-black p-1 md:p-2 text-white"
          style={{ zIndex: 99999 }}
          onClick={onClose}
        >
          <XMarkIcon className="h-3 w-3 md:h-8 md:w-8" />
        </button>

          {canNavigate && (
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full border border-white bg-transparent p-1 md:p-2 text-white transition-colors hover:bg-white/80 hover:text-black"
              style={{ zIndex: 99999 }}
              onClick={onPrevious}
            >
              <ChevronLeftIcon className="h-3 w-3 md:h-8 md:w-8" />
            </button>
          )}

          {canNavigate && (
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full border border-white bg-transparent p-1 md:p-2 text-white transition-colors hover:bg-white/80 hover:text-black"
              style={{ zIndex: 99999 }}
              onClick={onNext}
            >
              <ChevronRightIcon className="h-3 w-3 md:h-8 md:w-8" />
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
            <div
              className="relative h-[85vh] w-[92vw] max-w-[92vw] rounded-xl"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(135deg, rgba(148, 163, 184, 0.56) 0, rgba(148, 163, 184, 0.56) 16px, rgba(226, 232, 240, 0.42) 16px, rgba(226, 232, 240, 0.42) 32px)',
              }}
            >
              {formattedTimestamp && (
                <div className="absolute bottom-4 right-4 z-[99999] rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {timestampLabelPrefix} {formattedTimestamp}
                </div>
              )}
              {!formattedTimestamp && (
                <div className="absolute bottom-4 right-4 z-[99999] rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  Created date unknown!
                </div>
              )}
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                sizes="92vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
      </div>

  );
};

export default Modal;