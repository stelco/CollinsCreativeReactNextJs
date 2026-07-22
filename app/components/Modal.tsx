// components/Modal.tsx
import React from 'react';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  imgAlt: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imgSrc, imgAlt }) => {
  if (!isOpen) return null;

  const isPdf = imgSrc.endsWith('.pdf');
  const isVideo = imgSrc.endsWith('.mp4');
  const isImage = !isPdf && !isVideo;

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
                height: '85vh',
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