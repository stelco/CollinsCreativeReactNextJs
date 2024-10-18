//import SideNav from '@/app/ui/portfolio/sidenav';
import Image from 'next/image';
import { Metadata } from 'next';
import { CardBasic } from '@/app/ui/cards';
import SkillsChart from '@/app/ui/portfolio/skills-chart';
import { Suspense } from 'react';
import { CardSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import { aboutMe, aboutPage } from '@/app/portfolio/data/home';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      
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

        <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-2 lg:flex-row flex-grow items-start">

          <div className="flex flex-col justify-center gap-2 rounded-lg">
            <Suspense fallback={<CardSkeleton />}>
              <CardBasic CardContent={aboutMe}/>
            </Suspense>
          </div>

          <div className="flex flex-col justify-center gap-2 rounded-lg">
            <Suspense fallback={<CardSkeleton />}>
            <CardBasic CardContent={aboutPage}/>
            </Suspense>
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