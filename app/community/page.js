import Image from 'next/image';

import photoIcon from '@/assets/icons/share.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';

const PERKS = [
  {
    icon: photoIcon,
    alt: 'Share and discover photos',
    title: 'Share & discover photos',
    description:
      'Explore great shots, save favorites, and find new places through other photographers.',
  },
  {
    icon: communityIcon,
    alt: 'A community of photography enthusiasts',
    title: 'Find like-minded people',
    description:
      'Connect with others who share your style—landscape, street, portraits, and more.',
  },
  {
    icon: eventsIcon,
    alt: 'Photography enthusiasts at a photo event',
    title: 'Participate in events',
    description:
      'Join themed challenges and local meetups to stay inspired and keep shooting.',
  },
];

export default function CommunityPage() {
  return (
    <>
      <header className="mx-auto mb-12 w-full max-w-6xl px-4 pt-24 text-center sm:pt-32 md:mb-20 md:pt-40 lg:pt-48">
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          One shared passion:{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            Photography
          </span>
        </h1>
        <p className="text-lg leading-relaxed text-slate-600">
          Join our community and share your favorite photos!
        </p>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 text-center sm:px-6 lg:px-8">
        <h2 className="mb-10 text-xl font-bold text-slate-800 sm:text-2xl">
          Community Perks
        </h2>

        <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((perk) => (
            <li
              key={perk.title}
              className={
                'rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm ' +
                'transition-all duration-200 ease-out hover:-translate-y-0.5 ' +
                'hover:shadow-md sm:p-7 lg:p-8'
              }
            >
              <div className="mx-auto mb-6 flex items-center justify-center">
                <Image
                  src={perk.icon}
                  alt={perk.alt}
                  className="h-36 w-36 object-contain sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                />
              </div>
              <p className="m-0 text-base font-bold text-slate-800 sm:text-lg">
                {perk.title}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                {perk.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
