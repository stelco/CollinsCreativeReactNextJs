import { Metadata } from 'next';
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

const artArchiveImageFilenames = [
  '1000034564.jpg',
  'balancingact.jpg',
  'bedroomsketch.jpg',
  'birdsinmotion.jpg',
  'car1.jpg',
  'car2.jpg',
  'circles1.jpg',
  'collage2.jpg',
  'collage4.jpg',
  'concept1.jpg',
  'concept2.jpg',
  'concept3.jpg',
  'cover.jpg',
  'crayon1.jpg',
  'designsheet1.jpg',
  'designsheet2.jpg',
  'designsheet3.jpg',
  'designsheet4.jpg',
  'face.jpg',
  'fast.jpg',
  'fastandslow.jpg',
  'food.jpg',
  'g_1.jpg',
  'g_2.jpg',
  'g_3.jpg',
  'g_4.jpg',
  'g_5.jpg',
  'g_6.jpg',
  'g_7.jpg',
  'giacometti2.jpg',
  'hell.jpg',
  'independence.jpg',
  'insomnia.jpg',
  'interior.jpg',
  'jump.jpg',
  'layout1.jpg',
  'layout2.jpg',
  'lifedrawing1.jpg',
  'lifedrawing2.jpg',
  'limbic.jpg',
  'myroom.jpg',
  'myroom1999.jpg',
  'obsession.jpg',
  'ohp.jpg',
  'oppositesattract.jpg',
  'ORB-StevenCollins-LargeFrame.jpg',
  'paint1.jpg',
  'paint2.jpg',
  'paint3.jpg',
  'paint4.jpg',
  'pencilsketch1.jpg',
  'pencilsketch2.jpg',
  'photo1.jpg',
  'plane.jpg',
  'plaque-fullsize.JPG',
  'plaque-small.jpg',
  'rearendof2eras1.jpg',
  'reflectiveposes1.jpg',
  'reflectiveposes2.jpg',
  'robocop.jpg',
  'sand.jpg',
  'sand2.jpg',
  'scary.jpg',
  'shoe.jpg',
  'si.jpg',
  'startasyoumeantogoon.jpg',
  'steart.jpg',
  'torso.jpg',
  'townhall.jpg',
  'tyredwood.jpg',
  'ufos.jpg',
  'upanddown.jpg',
  'wallpaperdesign1.jpg',
  'wallpaperdesign2.jpg',
  'wiganpier.jpg',
  'window.jpg',
  'woman.jpg',
  'woman2.jpg',
  'woman3.jpg',
  'women.jpg',
];

async function fetchImages() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'art-archive');

  const images = await Promise.all(
    artArchiveImageFilenames.map(async (filename) => {
      const absoluteFilePath = path.join(imagesDirectory, filename);
      const timestamp = await getImageTimestamp(absoluteFilePath);

      return {
        id: filename,
        src: `/art-archive/${filename}`,
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