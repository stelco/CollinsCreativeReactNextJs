import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { CardBasic } from '@/app/ui/cards';
import { CardSkeleton } from '@/app/ui/skeletons';
import websites from '@/app/portfolio/data/websites';

export const metadata: Metadata = {
  title: 'Collins Creative | Websites',
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
          { label: 'Home', href: '/' },
          {
            label: 'Websites',
            href: '/portfolio/websites',
            active: true,
          },
        ]}
      />

      <div className="z-10 grid gap-3 lg:grid-cols-3 md:grid-cols-2 lg:flex-row mt-2 flex-grow items-start">

        {websites
          .filter((website) => website.heading === "MaxContact")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Shenanigans Irish Bar")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Destinology")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Alpha Machine Tools Ltd")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Oldham Roll Of Rememberance")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "York Montessori")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Direct Roof and Build Ltd")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

      </div>

    </main>

  );
}