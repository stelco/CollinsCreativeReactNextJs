import SideNav from '@/app/ui/portfolio/sidenav';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { exo2 } from '@/app/ui/fonts';
import Image from 'next/image';
import { Metadata } from 'next';
import { CardBasic } from '@/app/ui/dashboard/cards';
import SkillsChart from '@/app/ui/portfolio/skills-chart';
import { Suspense } from 'react';
import { CardSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import skills from '@/app/portfolio/skills';

export const metadata: Metadata = {
  title: 'Home',
};

const aboutMe = {
  title: 'About Me',
  heading: 'My name is Steven Collins and this is my Online Portfolio.',
  value: 'I am a professional Web Developer who has been in the creative industry for over 25 years. I specialise in Fully Responsive, User Friendly Front End UI Development and have a background in Contemporary Design Methodologies.',
  value2: 'I have a passion for creating beautiful, component based, functional websites and applications that are easy to use and visually appealing. I am always looking to learn new technologies and improve my skills.',
  image: '/meandollie.jpg',
  skills: skills,
};

const aboutPage = {
  title: 'About This Portfolio',
  heading: 'This is a React/Next.js app with Tailwind CSS',
  value: 'This is a Next.js app with Tailwind CSS, TypeScript, and Heroicons. It is a simple portfolio site that showcases my more recent technical and design skills.',
  value2: 'It is built using the Dashboard page as a starting point and the components and data have been customised for my portfolio pages. It uses a PostGres SQL database and local JSON. It is a work in progress and I will be adding more features and content in the future.',
  image: '/nextjs-logo.png'
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
      
      <div className="fixed inset-0 z-0">
        <Image
          src="/plaque-fullsize-cropped.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="z-10 flex flex-col md:flex-row md:overflow-hidden">

        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1 lg:flex-row p-2 mt-2 flex-grow items-start">

          <div className="flex flex-col justify-center gap-2 rounded-lg">
            <Suspense fallback={<CardSkeleton />}>
              <CardBasic CardContent={aboutMe}/>
            </Suspense>
          </div>

          <div className="flex flex-col justify-center gap-2 rounded-lg">
            <Suspense fallback={<CardSkeleton />}>
            <CardBasic CardContent={aboutPage}/>
            </Suspense>

            {/*<Suspense fallback={<CardSkeleton />}>
            <CardBasic CardContent={aboutPage}/>
            </Suspense>*/}

          </div>

          <div className="flex flex-col justify-center gap-2 rounded-lg col-span-2 hide-at-md">
            <Suspense fallback={<RevenueChartSkeleton />}>
              <SkillsChart />
            </Suspense>
          </div>

        </div>

      </div>

    </main>
  );
}