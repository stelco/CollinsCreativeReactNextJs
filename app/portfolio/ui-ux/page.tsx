import { Suspense } from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardBasic, CardIntro } from '@/app/ui/cards';
import { CardSkeleton } from '@/app/ui/skeletons';
import uiux from '@/app/portfolio/data/uiux';

export const metadata: Metadata = {
  title: 'Collins Creative | UIUX',
};
 
export default async function Page() {

  return (
    <main className="flex min-h-screen flex-col">

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          {
            label: 'UIUX',
            href: '/portfolio/ui-ux',
            active: true,
          },
        ]}
      />

      <CardIntro
          CardContent={{
              title: 'User Interface and User Experience Design',
              value: 'A collection of UI and UX designs and prototypes I have created for various projects.',
      }}/>

      <div className="z-10 grid gap-3 lg:grid-cols-3 md:grid-cols-2 lg:flex-row mt-2 flex-grow items-start">

      {uiux
          .filter((ui) => ui.heading === "Card Component")
          .map((ui, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={ui} />
            </Suspense>
        ))}

      {uiux
          .filter((ui) => ui.heading === "UX Videos")
          .map((ui, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={ui} />
            </Suspense>
        ))}

        {uiux
          .filter((ui) => ui.heading === "Mobile Devices UI")
          .map((ui, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={ui} />
            </Suspense>
        ))}

        {uiux
          .filter((ui) => ui.heading === "eLearning Portal UI")
          .map((ui, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={ui} />
            </Suspense>
        ))}

        {uiux
          .filter((ui) => ui.heading === "Wireframes")
          .map((ui, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={ui} />
            </Suspense>
        ))}

        {uiux
          .filter((ui) => ui.heading === "Tablet UI")
          .map((ui, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={ui} />
            </Suspense>
        ))}

        {uiux
          .filter((ui) => ui.heading === "System Integration Diagram")
          .map((ui, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={ui} />
            </Suspense>
        ))}

        {uiux
          .filter((ui) => ui.heading === "Mobile App device UI")
          .map((ui, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={ui} />
            </Suspense>
        ))}

      </div>

    </main>

  );
}