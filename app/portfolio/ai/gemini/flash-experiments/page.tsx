import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';
import ImageGallery from '@/app/components/ImageGallery';
import VideoGallery from '@/app/components/VideoGallery';
import Image from 'next/image';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import {
  flashExperimentsMetaData,
  flashExperimentsIntro,
  flashExperimentSourceImages,
  flashExperimentVideos,
} from '@/app/portfolio/data/flash-experiments';

export const metadata: Metadata = {
  title: flashExperimentsMetaData.title,
  description: flashExperimentsMetaData.description,
  keywords: flashExperimentsMetaData.keywords,
  authors: flashExperimentsMetaData.authors,
  openGraph: flashExperimentsMetaData.openGraph,
};

const availableFlashExperimentVideos = flashExperimentVideos.filter((video) => {
  const relativePublicPath = video.src.replace(/^\//, '');
  const fullPath = path.join(process.cwd(), 'public', relativePublicPath);
  return fs.existsSync(fullPath);
});

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          { label: 'AI', href: '/portfolio/ai' },
          {
            label: 'Gemini Flash Experiments',
            href: '/portfolio/ai/gemini/flash-experiments',
            active: true,
          },
        ]}
      />

      <CardIntro
        CardContent={{
          title: flashExperimentsIntro.title,
          value: flashExperimentsIntro.value,
          buttonLink: true,
          buttonLinkUrl: '/portfolio/ai',
          value2: 'Back to AI Home Page',
        }}
      />

      <div className={"grow flex flex-col text-white dark:text-grey-100 mt-4 bg-gray-100 rounded-xl p-2 shadow-sm bg-grey-100 dark:bg-gray-600"}>
        <div className={'background-animation'} style={{ height: 'auto' }}>
          <animate></animate>
          <animate></animate>
          <animate></animate>
          <animate></animate>

          <div className="flex flex-col md:flex-row gap-4 p-4 border-b-2 rounded-b-none border-gray-100 dark:border-gray-500" style={{ zIndex: 9999, position: 'relative' }}>
            <div className="md:w-[280px] w-full">
              <Image
                src="/ai/gemini-chatbot.jpg"
                alt="Gemini Flash Experiments"
                width={280}
                height={180}
                style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
                priority
              />
            </div>

            <div className="flex-1 text-slate-700 dark:text-slate-100 text-[1.025rem] lg:text-lg">
              <h2 className="text-orange-400 dark:text-orange-300 text-[25px] leading-8 mb-3">
                {flashExperimentsIntro.heading}
              </h2>
              <p>
                {flashExperimentsIntro.value2}
              </p>
              <p className="mt-3">
                {flashExperimentsIntro.value3}
              </p>
            </div>
          </div>

          <div className="px-4 pb-4" style={{ zIndex: 9999, position: 'relative' }}>
            <VideoGallery videos={availableFlashExperimentVideos.slice(0, 3)} />
            <ImageGallery images={flashExperimentSourceImages} />
            <VideoGallery videos={availableFlashExperimentVideos.slice(3)} />
          </div>
        </div>
      </div>
    </main>
  );
}
