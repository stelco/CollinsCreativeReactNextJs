import { clsx } from 'clsx';
import Link from 'next/link';
import { exo2 } from '@/app/ui/fonts';
import SocialIcons from '@/app/components/SocialIcons';
import { ThemeSwitcher } from "@/app/components/theme-switcher";
import cn from "classnames";
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
  noSplit?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <div className="flex flex-col">
      <nav
        aria-label="Breadcrumb"
        className={cn(
          "z-10 block rounded-xl bg-gray-100 p-3 shadow-sm",
          "dark:bg-gray-600 dark:text-slate-100",
          breadcrumbs.some(breadcrumb => !breadcrumb.noSplit) && "border-b-2 rounded-b-none border-gray-100 dark:border-gray-500"
        )}
      >
        <div className="flex justify-between items-center">
          <ol className={clsx(exo2.className, 'flex text-[1.025rem] lg:text-lg')}>
            {breadcrumbs.map((breadcrumb, index) => (
              <li
                key={breadcrumb.href}
                aria-current={breadcrumb.active}
                className={clsx(
                  breadcrumb.active ? 'text-gray-900 dark:text-slate-50' : 'text-gray-500 dark:text-slate-200',
                  'flex items-center'
                )}
              >
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                {index < breadcrumbs.length - 1 ? (
                  <span className="mx-[7px] inline-block">
                    <ChevronRightIcon
                      className="w-4 text-gray-500 dark:text-slate-200 align-middle"
                    />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <SocialIcons />
          <div className="flex justify-end align-middle min-w-[75px]">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </div>
  );
}
