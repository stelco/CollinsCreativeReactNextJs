import { Metadata } from 'next';
import path from 'path';
import olliesArtWork from '@/app/portfolio/data/ollies-art-work';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import ImageGallery from '@/app/components/ImageGallery';
import { CardIntro } from '@/app/ui/cards';
import { getImageTimestamp } from '@/app/lib/image-metadata';

const ollieMetadata = olliesArtWork.find((website) => website.title === 'Collins Creative | Ollies Creations');

export const metadata: Metadata = {
  title: ollieMetadata?.title,
  description: ollieMetadata?.description,
  keywords: ollieMetadata?.keywords,
  authors: ollieMetadata?.authors,
  openGraph: ollieMetadata?.openGraph,
};

const ollieArchiveImageFilenames = [
  '1000032777.jpg',
  '1000032779.jpg',
  '1000034333.jpg',
  '1000034551.jpg',
  '1000034552.jpg',
  '1000034553.jpg',
  '1000034562.jpg',
  '1000034563.jpg',
  '1000034565.jpg',
  '1000034566.jpg',
  '20260107_205611.jpg',
  '20260107_210531.jpg',
  '20260117_082252.jpg',
  '20260509_143836.jpg',
  '20260716_131748.jpg',
  '20260716_131751.jpg',
  '20260716_142733.jpg',
  '20260716_144450.jpg',
  '20260716_144852.jpg',
  'IMG-20260508-WA0001.jpg',
  'IMG-20260522-WA0001.jpg',
  'IMG-20260605-WA0000.jpg',
  'IMG-20260617-WA0000.jpg',
  'IMG-20260621-WA0001.jpg',
  'IMG-20260702-WA0001.jpg',
  'IMG_20221029_195518.jpg',
  'IMG_20221031_180044.jpg',
  'queen.png',
  'xmas-1.jpg',
];

async function fetchImages() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'ollie-art-archive');

  const images = await Promise.all(
    ollieArchiveImageFilenames.map(async (filename) => {
      const absoluteFilePath = path.join(imagesDirectory, filename);
      const timestamp = await getImageTimestamp(absoluteFilePath);

      return {
        id: filename,
        src: `/ollie-art-archive/${filename}`,
        alt: filename,
        width: 150,
        height: 150,
        timestamp,
      };
    }),
  );

  return images;
}

export default async function Page() {
  const images = await fetchImages();

  return (
    <main className="flex min-h-screen flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          {
            label: 'Ollies Creations',
            href: '/portfolio/ollies-art-work',
            active: true,
          },
        ]}
      />

      <CardIntro
        CardContent={{
          title: 'Ollies Creations',
          value: 'A collection of my sons artwork and science experiments which he has produced since starting high school. Such a talented boy...like father like son!',
        }}
      />

      <ImageGallery images={images} size="large" />
    </main>
  );
}
