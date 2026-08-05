import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import VideoGallery from '@/app/components/VideoGallery';
import { CardIntro } from '@/app/ui/cards';

const uiUxVideoFilenames = [
  '2021-11-03_08-59-19.mp4',
  '2022-02-02_11-12-26.mp4',
  '2022-02-02_16-03-53.mp4',
  '2022-06-01_17-14-26.mp4',
  '2022-07-22_09-35-22.mp4',
  '2022-10-07_10-34-09.mp4',
  '2022-11-10_15-46-26.mp4',
  '2022-11-16_15-36-42.mp4',
  '2022-12-02_11-51-06.mp4',
  '2023-03-08_09-36-38.mp4',
  '2023-04-17_13-01-07.mp4',
  '2023-05-03_15-31-26.mp4',
  '2023-05-17_17-12-12.mp4',
  '2024-09-11_12-18-58.mp4',
];

const videos = uiUxVideoFilenames.map((filename) => ({
  id: filename,
  src: `/websites/maxcontact/videos/${filename}`,
  alt: filename,
  width: 400,
  height: 400,
}));

export default function Page() {

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