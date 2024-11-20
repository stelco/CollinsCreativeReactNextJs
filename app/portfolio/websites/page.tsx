import { Suspense } from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardBasic, CardIntro } from '@/app/ui/cards';
import { CardsSkeleton } from '@/app/ui/skeletons';
import websites from '@/app/portfolio/data/websites';

export const metadata: Metadata = {
  title: 'Collins Creative | Websites',
};
 
export default async function Page() {

  return (
    <main className="flex min-h-screen flex-col">

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          {
            label: 'Websites',
            href: '/portfolio/websites',
            active: true,
          },
        ]}
      />

      <CardIntro
          CardContent={{
              title: 'Commercially built websites and applications',
              value: 'A collection of websites I was involved in building during my various job roles and freelance projects built from scratch.',
      }}/>

      <div className="z-10 grid gap-3 lg:grid-cols-3 md:grid-cols-2 lg:flex-row mt-2 flex-grow items-start">

      {websites
          .filter((website) => website.heading === "NextJs Dashboard")
          .map((website, index) => (
            <Suspense fallback={<CardsSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "MaxContact")
          .map((website, index) => (
            <Suspense fallback={<CardsSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Destinology")
          .map((website, index) => (
            <Suspense fallback={<CardsSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "York Montessori")
          .map((website, index) => (
            <Suspense fallback={<CardsSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Alpha Machine Tools Ltd")
          .map((website, index) => (
            <Suspense fallback={<CardsSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Oldham Roll Of Rememberance")
          .map((website, index) => (
            <Suspense fallback={<CardsSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Shenanigans Irish Bar")
          .map((website, index) => (
            <Suspense fallback={<CardsSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

        {websites
          .filter((website) => website.heading === "Direct Roof and Build Ltd")
          .map((website, index) => (
            <Suspense fallback={<CardsSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

      </div>

    </main>

  );
}