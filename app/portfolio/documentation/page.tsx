import { Suspense } from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardBasic, CardIntro } from '@/app/ui/cards';
import { CardSkeleton } from '@/app/ui/skeletons';
import documentation from '@/app/portfolio/data/documentation';

const documentationMetadata = documentation.find((website) => website.title === 'Collins Creative | Documentation');

export const metadata: Metadata = {
  title: documentationMetadata?.title,
  description: documentationMetadata?.description,
  keywords: documentationMetadata?.keywords,
  authors: documentationMetadata?.authors,
  openGraph: documentationMetadata?.openGraph,
};
 
export default async function Page() {

  return (
    <main className="flex min-h-screen flex-col">

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          {
            label: 'Documentation',
            href: '/portfolio/documentation',
            active: true,
          },
        ]}
      />

      <CardIntro
          CardContent={{
              title: 'Planning and Documentation',
              value: 'Examples of some of the preliminary planning, research and documentation I have created for various projects.',
      }}/>

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