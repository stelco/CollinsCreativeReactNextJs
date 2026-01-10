import { Metadata } from 'next';
import { CardBasic } from '@/app/ui/cards';
import SkillsChart from '@/app/ui/portfolio/skills-chart';
import { aboutMe, aboutPage, aboutOldPage, homeMetaData } from '@/app/portfolio/data/home';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { Suspense } from 'react';
import { CardsSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';

const homepageMetadata = homeMetaData;

export const metadata: Metadata = {
  title: homepageMetadata?.title,
  description: homepageMetadata?.description,
  keywords: homepageMetadata?.keywords,
  authors: homepageMetadata?.authors,
  openGraph: homepageMetadata?.openGraph,
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home', noSplit: true },
        ]}
      />

      <div className="z-10 flex flex-col md:flex-row md:overflow-hidden">

        <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-2 lg:flex-row flex-grow items-start mt-2">

          <div className="flex flex-col justify-center gap-2 rounded-lg">
            <Suspense fallback={<CardsSkeleton />}>
              <CardBasic CardContent={aboutMe}/>
            </Suspense>
          </div>

          <div className="flex flex-col justify-center gap-2 rounded-lg">
            <Suspense fallback={<CardsSkeleton />}>
              <CardBasic CardContent={aboutPage}/>
            </Suspense>
            <Suspense fallback={<CardsSkeleton />}>
              <CardBasic CardContent={aboutOldPage}/>
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