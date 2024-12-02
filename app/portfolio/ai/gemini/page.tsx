import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';

export const metadata = {
  title: 'Collins Creative | PDF Quiz Generator',
};

export default async function Page() {

  return (
    <main className="flex min-h-screen flex-col">

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          { label: 'AI', href: '/portfolio/ai' },
          {
            label: 'PDF Quiz Generator',
            href: '/portfolio/ai/gemini',
            active: true,
          },
        ]}
      />

      <CardIntro
        CardContent={{
          title: 'Artificial Intelligence Experiments',
          buttonLink: true,
          buttonLinkUrl: '/portfolio/ai',
          value2: 'Back to AI Home Page',
        }}
      />

      <div className={"grow flex flex-col"}>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">PDF Quiz Generator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">This is a work in progress. I am using the PDF.js library to render PDFs in the browser and then using a combination of JavaScript and Python to generate quiz questions from the text. The questions are then displayed in a quiz format.</p>

      </div>

    </main>
  );
}