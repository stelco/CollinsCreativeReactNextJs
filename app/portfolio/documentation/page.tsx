import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { CardBasic } from '@/app/ui/cards';
import { CardSkeleton } from '@/app/ui/skeletons';
import documentation from '@/app/portfolio/data/documentation';

export const metadata: Metadata = {
  title: 'Collins Creative | Documentation',
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
            label: 'UIUX',
            href: '/portfolio/documentation',
            active: true,
          },
        ]}
      />

      <div className="z-10 grid gap-3 lg:grid-cols-3 md:grid-cols-2 lg:flex-row mt-2 flex-grow items-start">

        {documentation
          .filter((doc) => doc.heading === "VueJs Component Structure Document")
          .map((doc, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={doc} />
            </Suspense>
        ))}

        {documentation
          .filter((doc) => doc.heading === "UI Research and Prototypes")
          .map((doc, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={doc} />
            </Suspense>
        ))}

        {documentation
          .filter((doc) => doc.heading === "CMS Administration Guidance")
          .map((doc, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={doc} />
            </Suspense>
        ))}

        {documentation
          .filter((doc) => doc.heading === "The Byte! (circa 1987)")
          .map((doc, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={doc} />
            </Suspense>
        ))}

        {documentation
          .filter((doc) => doc.heading === "CMS Research and Analysis")
          .map((doc, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={doc} />
            </Suspense>
        ))}

      </div>

    </main>

  );
}