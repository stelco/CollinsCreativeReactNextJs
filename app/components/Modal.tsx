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

  return (
    <div className="modal">
      <div
        className="modal-content w-[70vw] md:w-[45vw]"
        >
        <XCircleIcon
            className="absolute top-0 right-0 m-4 text-black w-6 md:w-10"
            style={{ cursor: 'hand', borderRadius: '50%', backgroundColor: '#fff' }}
            onClick={onClose}
        />

        <div className="image-container">
        <Image
            src={imgSrc}
            alt={imgAlt}
            width={imgWidth}
            height={imgHeight}
            layout="responsive"
            objectFit="contain"
          />
        </div>

      </div>
    </div>
  );
};

export default Modal;