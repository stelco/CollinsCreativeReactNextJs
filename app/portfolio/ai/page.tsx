import { Suspense } from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { CardBasic } from '@/app/ui/cards';
import { CardSkeleton } from '@/app/ui/skeletons';
import ai from '@/app/portfolio/data/ai';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Collins Creative | AI experiments',
  description: 'AI experiments by Collins Creative',
};

async function fetchVideos() {
  const videosDirectory = path.join(process.cwd(), 'public/ai/videos');
  const filenames = fs.readdirSync(videosDirectory);

  const videos = filenames.map((filename) => {
    const filePath = path.posix.join('/ai/videos', filename);
    return {
      id: filename,
      src: filePath,
      alt: filename,
      width: 100,
      height: 300,
    };
  });
  return videos;
}
 
export default async function Page() {

  const videos = await fetchVideos();

  return (
    <main className="flex min-h-screen flex-col">

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

        {ai
          .filter((website) => website.heading === "More to follow...")
          .map((website, index) => (
            <Suspense fallback={<CardSkeleton />} key={index}>
              <CardBasic CardContent={website} />
            </Suspense>
        ))}

      </div>

    </main>

  );
}
