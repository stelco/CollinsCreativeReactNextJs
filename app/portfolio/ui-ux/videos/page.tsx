import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import VideoGallery from '@/app/components/VideoGallery';

async function fetchVideos() {
  const videosDirectory = path.join(process.cwd(), 'public/websites/maxcontact/videos');
  const filenames = fs.readdirSync(videosDirectory);

  const videos = filenames.map((filename) => {
    const filePath = path.posix.join('/websites/maxcontact/videos', filename);
    return {
      id: filename,
      src: filePath,
      alt: filename,
      width: 400,
      height: 400,
    };
  });
  return videos;
}

export default async function Page() {

  const videos = await fetchVideos();

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
          { label: 'UIUX', href: '/portfolio/ui-ux' },
          {
            label: 'Videos',
            href: '/portfolio/ui-ux/videos',
            active: true,
          },
        ]}
      />

      <VideoGallery videos={videos} />
    </main>
  );
}