import Link from 'next/link';
import Image from 'next/image';

import logoImage from '@/assets/logo.png';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <div className="relative">
      <MainHeaderBackground />
      <header
        className={
          'relative z-10 flex flex-col gap-4 px-4 py-6 ' +
          'sm:flex-row sm:items-center sm:justify-between sm:gap-0 md:px-[10%] md:py-8'
        }
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-white sm:gap-6 md:gap-8"
        >
          <Image
            src={logoImage}
            alt="PhotoSharify"
            className={
              'h-14 w-14 shrink-0 object-contain drop-shadow-lg ' +
              'sm:h-16 sm:w-16 md:h-20 md:w-20'
            }
          />
          <span className="whitespace-nowrap text-base font-bold uppercase tracking-widest sm:text-lg">
            PhotoSharify
          </span>
        </Link>
        <nav className="flex shrink-0">
          <ul className="flex list-none flex-wrap gap-3 sm:gap-6 sm:text-xl">
            <li>
              <NavLink href="/photos">Photos</NavLink>
            </li>
            <li>
              <NavLink href="/community">Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
