import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { jost } from '@/app/ui/fonts';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-2 rounded-lg bg-gray-100 px-6 md:w-2/5 md:px-20">

          <h2 className={`${jost.className} text-xl gold-600 md:text-3xl md:leading-normal`}>
            <strong>Collins Creative</strong>
          </h2>
          <p className={`${jost.className} text-xl gold-300 md:text-2xl md:leading-normal`}>
            An Online Portfolio for Steven Collins
          </p>
          <br/>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            style={{ backgroundColor: '#d36d00' }}
          >
            <span className={`${jost.className}`}>Go To Acme Dashboard</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        <Image
          src="/hero-desktop.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/hero-mobile.png"
          width={560}
          height={620}
          className="block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
        </div>
      </div>
    </main>
  );
}
