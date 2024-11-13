'use client';

import React, { useState } from 'react';
import cn from "classnames";

import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { exo2 } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import Image from 'next/image';
import Pill from '@/app/ui/pill';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import Modal from '@/app/components/Modal';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  person: UserGroupIcon,
};

interface CardBasicProps {
  CardContent: {
    title?: string;
    heading?: string;
    url?: string;
    value?: string | number;
    value2?: string;
    image?: string;
    skills?: { id: number; name: string; color: string }[];
    isWorkItem?: boolean;
    buttonLink?: boolean;
    buttonLinkUrl?: string;
    buttonLinkUrlBlank?: boolean;
    isModal?: boolean;
  };
}

export function CardBasic({ CardContent }: CardBasicProps) {
  return <Card
    title={CardContent.title}
    heading={CardContent.heading}
    url={CardContent.url}
    value={CardContent.value}
    value2={CardContent.value2}
    image={CardContent.image}
    skills={CardContent.skills}
    isWorkItem={!!CardContent.isWorkItem}
    buttonLink={!!CardContent.buttonLink}
    buttonLinkUrl={CardContent.buttonLinkUrl}
    buttonLinkUrlBlank={!!CardContent.buttonLinkUrlBlank}
    isModal={!!CardContent.isModal}
    type="person"
  />;
}

export async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  heading,
  url,
  value,
  value2,
  type,
  image,
  skills,
  isWorkItem,
  buttonLink,
  buttonLinkUrl,
  buttonLinkUrlBlank,
  isModal
}: {
  title?: string;
  heading?: string;
  url?: string;
  value?: number | string;
  value2?: string | undefined;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'person';
  image?: string;
  skills?: { id: number; name: string; color: string }[];
  isWorkItem?: boolean;
  buttonLink?: boolean;
  buttonLinkUrl?: string;
  buttonLinkUrlBlank?: boolean;
  isModal?: boolean;
}) {
  const Icon = iconMap[type];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: '', alt: '', width: 0, height: 0 });

  const openModal = (selectedImage: { src: string; alt: string; width: number; height: number }) => {
    setSelectedImage(selectedImage);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage({ src: '', alt: '', width: 0, height: 0 });
  };

  return (
    //use cn to apply dark mode
    <div className={cn("bg-gray-100 rounded-xl p-2 shadow-sm bg-grey-100 text-slate-500", "dark:bg-gray-600 dark:text-slate-100")}>

      {!isWorkItem && (
        <div className="flex p-2 align-top items-center">
          {Icon ? <Icon className={cn("h-5 w-5 text-gray-700", "dark:bg-gray-600 dark:text-slate-100")} /> : null}
          <h3 className="ml-2 text-md font-medium">{title}</h3>
        </div>
      )}

      <div className={`${exo2.className} mt-2 flex flex-col gap-6 rounded-xl bg-white text-grey-400 dark:bg-gray-600 dark:text-slate-200 px-4 py-4 text-left text-lg ${isWorkItem == false ? 'lg:flex-row' : 'lg:flex-col'} lg:overflow-hidden lg:text-md`}>
        
        {image && (
          <Image
            src={image}
            width={isWorkItem ? 500 : 250}
            height={320}
            alt={image}
            style={{ height: 'fit-content', borderRadius: '8px' }}
          />
        )}

        <div className="flex flex-col flex-1 gap-6">

          <div className="flex flex-col gap-3">

            <div
              className={cn("flex items-center justify-flex-start text-orange-400",  "dark:text-orange-300")}
              >

              {heading && (
                <div className='text-[25px]'>{heading}</div>
              )}

              {url && (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center font-medium transition-colors hover:text-orange-600 md:text-base pl-3"
                >
                  <span><ArrowTopRightOnSquareIcon className="w-5 md:w-6" /></span>
                </Link>
              )}
            </div>

            {value && (
              <div className='text-sm lg:text-lg'>{value}</div>
            )}
            {value2 && (
              <div className='text-sm lg:text-lg'>{value2}</div>
            )}

            {buttonLink && buttonLinkUrl && (
              <Button
                onClick={() => isModal ? openModal({ src: buttonLinkUrl, alt: heading || '', width: 800, height: 600 }) : window.open(buttonLinkUrl, buttonLinkUrlBlank ? '_blank' : '_self')}
                className="flex h-10 mt-4 items-center justify-center rounded-xl px-4 text-md font-medium text-white transition-colors bg-orange-400 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 dark:text-slate-800"
                style={{ alignSelf: 'center' }}
              >
                {
                  isModal && (
                    <span>Open Examples</span>
                  )
                }
                {
                  !isModal && (
                    <span>Open Page</span>
                  )
                }
                <ArrowTopRightOnSquareIcon className="h-5 ml-4" />
              </Button>
            )}

          </div>

          {skills && !isWorkItem && (
            <div className={cn("flex items-center justify-flex-start text-orange-400 text-[20px]",  "dark:text-orange-300")}>Skills</div>
          )}
          {skills && isWorkItem && (
            <div className={cn("flex items-center justify-flex-start text-orange-400 text-[20px]",  "dark:text-orange-300")}>Skills</div>
          )}

          {skills && !isWorkItem && (
            <div className="flex flex-wrap gap-4">
              {skills.map((pill) => (
                <div key={pill.id}>
                  <Pill text={pill.name} color={pill.color} />
                </div>
              ))}
            </div>
          )}
          {skills && isWorkItem && (
            <div className="flex flex-wrap gap-2">
              {skills.map((pill) => (
                <div key={pill.id}>
                  <Pill text={pill.name} color={pill.color} />
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

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