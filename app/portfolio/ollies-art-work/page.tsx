import { Metadata } from 'next';
import fs from 'fs/promises';
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

const SUPPORTED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

async function getArchiveImageFilenames(imagesDirectory: string) {
  const entries = await fs.readdir(imagesDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

async function fetchImages() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'ollie-art-archive');
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
        src: `/ollie-art-archive/${filename}`,
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
