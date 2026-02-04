import Image from 'next/image';

import photoIcon from '@/assets/icons/share.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';

export default function CommunityPage() {
  return (
    <>
      <header className="mx-auto mb-12 w-[92%] max-w-[85rem] space-y-4 px-4 pt-24 text-center sm:pt-32 md:mb-20 md:pt-40 lg:pt-48">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          One shared passion:{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            Photography
          </span>
        </h1>
        <p className="text-lg text-slate-600">
          Join our community and share your favorite photos!
        </p>
      </header>
      <main className="mx-auto w-[92%] max-w-[85rem] px-4 text-center sm:px-0">
        <h2 className="mb-8 text-xl font-bold text-slate-800 sm:mb-12 sm:text-2xl">
          Community Perks
        </h2>
        <ul className="m-0 list-none space-y-10 p-0 sm:space-y-12">
          <li className="flex flex-col items-center gap-8">
            <Image
              src={photoIcon}
              alt="Share and discover photos"
              className="h-24 w-24 shrink-0 object-contain sm:h-32 sm:w-32"
            />
            <p className="m-0 text-base font-bold text-slate-700 sm:text-xl">
              Share & discover photos
            </p>
          </li>
          <li className="flex flex-col items-center gap-8">
            <Image
              src={communityIcon}
              alt="A community of photography enthusiasts"
              className="h-24 w-24 shrink-0 object-contain sm:h-32 sm:w-32"
            />
            <p className="m-0 text-base font-bold text-slate-700 sm:text-xl">
              Find new friends & like-minded people
            </p>
          </li>
          <li className="flex flex-col items-center gap-8">
            <Image
              src={eventsIcon}
              alt="Photography enthusiasts at a photo event"
              className="h-24 w-24 shrink-0 object-contain sm:h-32 sm:w-32"
            />
            <p className="m-0 text-base font-bold text-slate-700 sm:text-xl">
              Participate in exclusive events
            </p>
          </li>
        </ul>
      </main>
    </>
  );
}
