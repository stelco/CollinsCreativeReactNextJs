'use client';

import React, { useState, useEffect, useRef } from 'react';
import cn from "classnames";
import { CardsSkeleton } from '@/app/ui/skeletons';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ArrowTopRightOnSquareIcon,
  ArrowLeftCircleIcon
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
    githubLink?: boolean;
    value?: string | number;
    value2?: string;
    image?: string;
    video?: { src: string; width: number; height: number };
    skills?: { id: number; name: string; color: string }[];
    isWorkItem?: boolean;
    buttonLink?: boolean;
    buttonLink2?: boolean;
    buttonLinkUrl?: string;
    buttonLinkUrl2?: string;
    buttonLinkUrlBlank?: boolean;
    isModal?: boolean;
    isAI?: boolean;
  };
}

export function CardIntro({ CardContent }: CardBasicProps) {
  return (
    <div className={cn("px-4 bg-gray-100 rounded-b-xl p-2 shadow-sm bg-grey-100 text-slate-500", "dark:bg-gray-600 dark:text-slate-100")}>

      <div className={cn("text-[25px] text-orange-400",  "dark:text-orange-300")}
      style={{ lineHeight: '1.8rem', marginBottom: '10px' }}
      >{CardContent.title}</div>

      {!CardContent.buttonLink && !CardContent.buttonLinkUrl ? (
        <div className="text-[1.025rem] lg:text-lg mb-2">{CardContent.value}</div>
      ) : (
        <div className="text-md">
          {CardContent.value ? CardContent.value : ''}
          <Link
            href={CardContent.buttonLink ? CardContent.buttonLinkUrl || '' : ''}
            rel="noopener noreferrer"
            className="mt-2 flex items-center font-medium transition-colors hover:text-orange-500 md:text-base mb-2"
          >
            <span><ArrowLeftCircleIcon className="w-5 md:w-6 mr-2" /></span>
            {CardContent.value2}
          </Link>

        </div>
      )}
    </div>
  );
}

export function CardBasic({ CardContent }: CardBasicProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <CardsSkeleton /> : <Card
    title={CardContent.title}
    heading={CardContent.heading}
    url={CardContent.url}
    githubLink={!!CardContent.githubLink}
    value={CardContent.value}
    value2={CardContent.value2}
    image={CardContent.image}
    video={CardContent.video}
    skills={CardContent.skills}
    isWorkItem={!!CardContent.isWorkItem}
    buttonLink={!!CardContent.buttonLink}
    buttonLink2={!!CardContent.buttonLink2}
    buttonLinkUrl={CardContent.buttonLinkUrl}
    buttonLinkUrl2={CardContent.buttonLinkUrl2}
    buttonLinkUrlBlank={!!CardContent.buttonLinkUrlBlank}
    isModal={!!CardContent.isModal}
    isAI={!!CardContent.isAI}
    type="person"
    index={0}
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
      <Card title="Collected" value={totalPaidInvoices} type="collected" index={0} />
      <Card title="Pending" value={totalPendingInvoices} type="pending" index={1} />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" index={2} />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
        index={3}
      />
    </>
  );
}

export function Card({
  title,
  heading,
  url,
  githubLink,
  value,
  value2,
  type,
  image,
  video,
  skills,
  isWorkItem,
  buttonLink,
  buttonLink2,
  buttonLinkUrl,
  buttonLinkUrl2,
  buttonLinkUrlBlank,
  isModal,
  isAI,
  index
}: {
  title?: string;
  heading?: string;
  url?: string;
  githubLink?: boolean;
  value?: number | string;
  value2?: string | undefined;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'person';
  image?: string;
  video?: { src: string; width: number; height: number };
  skills?: { id: number; name: string; color: string }[];
  isWorkItem?: boolean;
  buttonLink?: boolean;
  buttonLink2?: boolean;
  buttonLinkUrl?: string;
  buttonLinkUrl2?: string;
  buttonLinkUrlBlank?: boolean;
  isModal?: boolean;
  isAI?: boolean;
  index: number;
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

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={cn("bg-gray-100 rounded-xl p-2 shadow-sm bg-grey-100 text-slate-500", "dark:bg-gray-600 dark:text-slate-100")}
      style={{ height: '-webkit-fill-available' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!isWorkItem && (
        <div className="flex p-2 align-top items-center">
          {Icon ? <Icon className={cn("h-5 w-5 text-gray-700", "dark:bg-gray-600 dark:text-slate-100")} /> : null}
          <h3 className="ml-2 text-md font-medium">{title}</h3>
        </div>
      )}

      <div className={ isAI ? 'background-animation' : 'no-background-animation' }>
            <animate></animate>
            <animate></animate>
            <animate></animate>
            <animate></animate>
            <animate></animate>
            <animate></animate>
            <animate></animate>
            <animate></animate>
            <animate></animate>
            <animate></animate>
        <div className={`${exo2.className} mt-2 flex flex-col gap-6 rounded-xl bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg ${isWorkItem == false ? 'lg:flex-row' : 'lg:flex-col'} lg:overflow-hidden lg:text-md md:items-start items-center`}
        style={{ height: '99%' }}
        >
          <div className="z-50">
          {image && (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 }
              }}
              transition={{ delay: index * 0.2, duration: 0.5, type: 'spring', stiffness: 100 }} // Different delay for each card
            >
              <Image
                src={image}
                width={isWorkItem ? 500 : 250}
                height={320}
                alt={image}
                style={{ height: 'fit-content', borderRadius: '8px' }}
              />
            </motion.div>
          )}

          {video && (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 }
              }}
              transition={{ delay: index * 0.2, duration: 0.5, type: 'spring', stiffness: 100 }} // Different delay for each card
            >
              <video
                src={video?.src}
                width={video?.width}
                height={video?.height}
                controls
                style={{ borderRadius: '8px' }}
              />
            </motion.div>
          )}
          </div>

          <div className="flex flex-col flex-1 gap-6">

            <div className="flex flex-col gap-3 grow">

              <div
                className={cn("flex items-start justify-flex-start text-orange-400",  "dark:text-orange-300")}
                >

                {heading && (
                  <div className='text-[25px]'>{heading}</div>
                )}

                {url && (
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-[3px] justify-end font-medium transition-colors text-orange-400 hover:text-orange-600 md:text-base pl-3"
                    style={{ flex: '1' }}
                  >
                      {
                        githubLink && (
                          <span>
                          <svg className="w-5 md:w-6" fill="currentColor" viewBox="0 -3 20 20">
                            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" clipRule="evenodd" />
                          </svg>
                          </span>

                        )
                      }

                    <span><ArrowTopRightOnSquareIcon className="w-5 md:w-6" /></span>
                  </Link>
                )}
              </div>

              <div style={{ flex: '1' }}>
                {value && (
                  <div className='text-[1.025rem] lg:text-lg'>{value}</div>
                )}
                {value2 && (
                  <div className='mt-[10px] text-[1.025rem] lg:text-lg'>{value2}</div>
                )}
              </div>

              <div className="flex flex-row flex-wrap justify-center gap-4">

                {buttonLink && buttonLinkUrl && (
                  <Button
                    onClick={() => isModal ? openModal({ src: buttonLinkUrl, alt: heading || '', width: 800, height: 600 }) : window.open(buttonLinkUrl, buttonLinkUrlBlank ? '_blank' : '_self')}
                    className="flex h-10 items-center justify-center rounded-xl px-4 text-md font-medium text-white transition-colors bg-orange-400 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 dark:text-slate-800"
                    style={{ alignSelf: 'center' }}
                  >
                    {
                      isModal && !buttonLinkUrlBlank && (
                        <span>Open Examples</span>
                      )
                    }
                    {
                      !isModal && !buttonLinkUrlBlank && (
                        <span>Go To Page</span>
                      )
                    }
                    {
                      buttonLinkUrlBlank && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          Open External Page
                          <span><ArrowTopRightOnSquareIcon className="h-5 ml-4" /></span>
                        </div>
                      )
                    }
                  </Button>
                )}

                {buttonLink2 && buttonLinkUrl2 && (
                  <Button
                    onClick={() => isModal ? openModal({ src: buttonLinkUrl2, alt: heading || '', width: 800, height: 600 }) : window.open(buttonLinkUrl2, buttonLinkUrlBlank ? '_blank' : '_self')}
                    className="flex h-10 items-center justify-center rounded-xl px-4 text-md font-medium text-white transition-colors bg-orange-400 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 dark:text-slate-800"
                    style={{ alignSelf: 'center' }}
                  >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    Open Storybook
                    <span><ArrowTopRightOnSquareIcon className="h-5 ml-4" /></span>
                  </div>
                  </Button>
                )}

              </div>

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
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        imgSrc={selectedImage.src}
        imgAlt={selectedImage.alt}
        imgWidth={selectedImage.width}
        imgHeight={selectedImage.height}
      />
    </motion.div>
  );
}