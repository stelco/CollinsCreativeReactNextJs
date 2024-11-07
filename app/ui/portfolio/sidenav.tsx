import Link from 'next/link';
import NavLinks from '@/app/ui/portfolio/nav-links';
import CollinsCreativeLogo from '@/app/ui/cc-logo';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 pt-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-3 md:h-40 bg-gradient-to-r from-orange-400 to-transparent"
        href="/"
      >
        <div className="text-white">
          <CollinsCreativeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="h-auto w-full grow rounded-md bg-transparent md:block"></div>
      </div>
    </div>
  );
}
