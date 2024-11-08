// components/Modal.tsx
import React from 'react';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imgSrc, imgAlt, imgWidth, imgHeight }) => {
  if (!isOpen) return null;

  const isPdf = imgSrc.endsWith('.pdf');
  const isVideo = imgSrc.endsWith('.mp4');

  return (
    <div className="modal">
      <div
        className="modal-content w-[70vw] md:w-[45vw]"
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

          { !isPdf && !isVideo && (
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={imgWidth}
              height={imgHeight}
              layout="responsive"
              objectFit="contain"
            />
          )}
        </div>
      </div>

  );
};

export default Modal;