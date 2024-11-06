import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { CardBasic } from '@/app/ui/cards';
import { CardSkeleton } from '@/app/ui/skeletons';
import ai from '@/app/portfolio/data/ai';

export const metadata: Metadata = {
  title: 'Collins Creative | AI experiments',
  description: 'AI experiments by Collins Creative',
};
 
export default async function Page() {

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

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          {
            label: 'AI',
            href: '/portfolio/ai',
            active: true
          },
        ]}
      />

      <div className="z-10 grid gap-3 lg:grid-cols-3 md:grid-cols-2 lg:flex-row mt-2 flex-grow items-start">

        {ai
          .filter((website) => website.heading === "Hume Empathatic Voice Interface")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

      </div>

    </main>

  );
}