//import SideNav from '@/app/ui/portfolio/sidenav';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { CardBasic } from '@/app/ui/cards';
import SkillsChart from '@/app/ui/portfolio/skills-chart';
import { Suspense } from 'react';
import { CardSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import { aboutMe, aboutPage } from '@/app/portfolio/data/home';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">

      <div>Placeholder for landing page</div>

      <Link
          href="/portfolio/home"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Go To Portfolio Home Page
        </Link>

    </main>
  );
}