'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
  const path = usePathname();
  const isActive = path.startsWith(href);

  return (
    <Link
      href={href}
      className={
        'rounded-lg px-3 py-1.5 text-sm font-semibold no-underline transition-colors ' +
        'sm:px-4 sm:py-2 sm:text-base ' +
        (isActive
          ? 'bg-white/25 text-white'
          : 'text-white hover:bg-white/15 hover:text-white')
      }
    >
      {children}
    </Link>
  );
}
