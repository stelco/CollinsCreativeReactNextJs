'use client';

import {
  HomeIcon,
  ChartBarSquareIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/portfolio/home', icon: HomeIcon },
  { name: 'Websites', href: '/portfolio/websites', icon: HomeIcon },
  { name: 'UI/UX', href: '/portfolio/ui-ux', icon: HomeIcon },
  { name: 'Documentation', href: '/portfolio/documentation', icon: HomeIcon },
  { name: 'Art Archive', href: '/portfolio/art-archive', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarSquareIcon },
  { name: 'Artificial Intelligence', href: '/portfolio/ai', icon: StarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md border-gray-300 bg-gray-100 p-3 text-sm font-medium hover:bg-gray-100 hover:text-orange-600 md:flex-none md:justify-start md:p-2 md:px-3 ',
              {
                'bg-gray-100 text-orange-600': pathname === link.href || pathname.startsWith(link.href),
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
