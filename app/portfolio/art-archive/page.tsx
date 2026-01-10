import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import art from '@/app/portfolio/data/art';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import ImageGallery from '@/app/components/ImageGallery';
import { CardIntro } from '@/app/ui/cards';

const blogMetadata = art.find((website) => website.title === 'Collins Creative | Art Archive');

export const metadata: Metadata = {
  title: blogMetadata?.title,
  description: blogMetadata?.description,
  keywords: blogMetadata?.keywords,
  authors: blogMetadata?.authors,
  openGraph: blogMetadata?.openGraph,
};

async function fetchImages() {
  const imagesDirectory = path.join(process.cwd(), 'public/art-archive');
  const filenames = fs.readdirSync(imagesDirectory);

  const images = filenames.map((filename) => {
    const filePath = path.posix.join('/art-archive', filename); // Use path.posix.join to ensure forward slashes
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
            label: 'Art Archive',
            href: '/portfolio/art-archive',
            active: true,
          },
        ]}
      />

      <CardIntro
          CardContent={{
              title: 'Contemporary Artwork',
              value: 'A collection of contemporary sketchbook artwork I created a long time ago during my time at Art College.',
      }}/>

      <ImageGallery images={images} />
    </main>
  );
}