import { clsx } from 'clsx';
import Link from 'next/link';
import { exo2 } from '@/app/ui/fonts';
import SocialIcons from '@/app/components/SocialIcons';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <div className="flex flex-col">
      <nav aria-label="Breadcrumb" className="z-10 block rounded-xl bg-gray-100 p-3 shadow-sm">
        <div className="flex justify-between items-center">
          <ol className={clsx(exo2.className, 'flex text-sm md:text-2xl')}>
            {breadcrumbs.map((breadcrumb, index) => (
              <li
                key={breadcrumb.href}
                aria-current={breadcrumb.active}
                className={clsx(
                  breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
                )}
              >
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                {index < breadcrumbs.length - 1 ? (
                  <span className="mx-3 inline-block">/</span>
                ) : null}
              </li>
            ))}
          </ol>
          <SocialIcons />
        </div>
      </nav>
    </div>
  );
}
