'use client';

import {
  HomeIcon,
  GlobeAltIcon,
  PresentationChartLineIcon,
  DocumentTextIcon,
  BuildingLibraryIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import cn from "classnames";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/portfolio/home', icon: HomeIcon },
  { name: 'Websites', href: '/portfolio/websites', icon: GlobeAltIcon },
  { name: 'UI/UX', href: '/portfolio/ui-ux', icon: PresentationChartLineIcon },
  { name: 'Documentation', href: '/portfolio/documentation', icon: DocumentTextIcon },
  { name: 'Art Archive', href: '/portfolio/art-archive', icon: BuildingLibraryIcon },
  //{ name: 'Dashboard', href: '/dashboard', icon: ChartBarSquareIcon },
  { name: 'Artificial Intelligence', href: '/portfolio/ai', icon: SparklesIcon },
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
            className={cn(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md border-gray-300 bg-gray-100 p-2 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 text-slate-500 hover:text-orange-600",
              "dark:bg-gray-600 dark:text-slate-100 dark:hover:text-orange-400",
              {
                'bg-gray-100 text-orange-600 dark:text-orange-400': pathname === link.href || pathname.startsWith(link.href),
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
