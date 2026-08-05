import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import art from '@/app/portfolio/data/art';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import ImageGallery from '@/app/components/ImageGallery';
import { CardIntro } from '@/app/ui/cards';
import { getImageTimestamp } from '@/app/lib/image-metadata';

const blogMetadata = art.find((website) => website.title === 'Collins Creative | Art Archive');

export const metadata: Metadata = {
  title: blogMetadata?.title,
  description: blogMetadata?.description,
  keywords: blogMetadata?.keywords,
  authors: blogMetadata?.authors,
  openGraph: blogMetadata?.openGraph,
};

const SUPPORTED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

async function getArchiveImageFilenames(imagesDirectory: string) {
  const entries = await fs.readdir(imagesDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

async function fetchImages() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'art-archive');
  const imageFilenames = await getArchiveImageFilenames(imagesDirectory);

  const imagesWithSortTime = await Promise.all(
    imageFilenames.map(async (filename) => {
      const absoluteFilePath = path.join(imagesDirectory, filename);
      const timestamp = await getImageTimestamp(absoluteFilePath);
      const stats = await fs.stat(absoluteFilePath);
      const exifTime = timestamp ? new Date(timestamp).getTime() : Number.NaN;
      const sortTime = Number.isNaN(exifTime) ? stats.mtimeMs : exifTime;

      return {
        id: filename,
        src: `/art-archive/${filename}`,
        alt: filename,
        width: 150,
        height: 150,
        timestamp,
        sortTime,
      };
    }),
  );

  return imagesWithSortTime
    .sort((a, b) => b.sortTime - a.sortTime)
    .map(({ sortTime: _sortTime, ...image }) => image);
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

      <ImageGallery images={images} size="large" timestampLabelPrefix="I created this on" />
    </main>
  );
}