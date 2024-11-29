import fs from 'fs';
import path from 'path';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import VideoGallery from '@/app/components/VideoGallery';
import { CardIntro } from '@/app/ui/cards';

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

      <CardIntro
          CardContent={{
              title: 'User experience videos',
              value: 'Videos I created which were used to demonstrate how features I had been working on worked within the software.',
              buttonLink: true,
              buttonLinkUrl: '/portfolio/ui-ux',
              value2: 'Back to UI/UX',
      }}/>

      <VideoGallery videos={videos} />
    </main>
  );
}