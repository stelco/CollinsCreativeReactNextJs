import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export const metadata: Metadata = {
  title: 'Collins Creative | Art Archive',
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
      width: 800, // You can adjust the width and height as needed
      height: 600,
    };
  });

  return images;
}

export default async function ImageGallery() {
  const images = await fetchImages();

  return (
    <main className="flex min-h-screen flex-col">

      <div className="fixed inset-0 z-0">
        <Image
          src="/plaque-fullsize-cropped.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

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


    <div className="gallery mt-8">
      {images.map((img) => (
        <div key={img.id} className="gallery-item">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            layout="responsive"
            loading="lazy"
          />
        </div>
      ))}
    </div>

    </main>
  );
}