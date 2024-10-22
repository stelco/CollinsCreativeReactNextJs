import fs from 'fs';
import path from 'path';
import Image from 'next/image';

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
    <div className="gallery">
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
  );
}