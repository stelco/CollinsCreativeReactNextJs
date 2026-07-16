import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import olliesArtWork from '@/app/portfolio/data/ollies-art-work';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import ImageGallery from '@/app/components/ImageGallery';
import { CardIntro } from '@/app/ui/cards';

const ollieMetadata = olliesArtWork.find((website) => website.title === 'Collins Creative | Ollies Creations');

export const metadata: Metadata = {
  title: ollieMetadata?.title,
  description: ollieMetadata?.description,
  keywords: ollieMetadata?.keywords,
  authors: ollieMetadata?.authors,
  openGraph: ollieMetadata?.openGraph,
};

async function fetchImages() {
  const imagesDirectory = path.join(process.cwd(), 'public/ollie-art-archive');
  const filenames = fs.readdirSync(imagesDirectory);

  const images = filenames.map((filename) => {
    const filePath = path.posix.join('/ollie-art-archive', filename);
    return {
      id: filename,
      src: filePath,
      alt: filename,
      width: 150,
      height: 150,
    };
  });

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

      <ImageGallery images={images} />
    </main>
  );
}
