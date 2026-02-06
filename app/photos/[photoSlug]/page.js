import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getPhoto } from '@/lib/photos';

// Disable static rendering to ensure fresh DB reads in demo
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const resolved = await params;
  const photoSlug = resolved?.photoSlug;

  if (!photoSlug) return { title: 'Photo not found' };

  const photo = await getPhoto(photoSlug);
  if (!photo) return { title: 'Photo not found' };

  return { title: photo.title, description: photo.location };
}

export default async function PhotoDetailsPage({ params }) {
  const resolved = await params;
  const photoSlug = resolved?.photoSlug;
  if (!photoSlug) notFound();

  const photo = await getPhoto(photoSlug);
  if (!photo) notFound();

  return (
    <>
      <header
        className={
          'mx-auto my-8 flex w-[92%] max-w-[85rem] flex-col gap-8 px-4 pt-24 ' +
          'sm:my-12 sm:gap-12 sm:pt-32 md:flex-row md:items-center lg:pt-40'
        }
      >
        <div
          className={
            'relative h-64 w-full shrink-0 overflow-hidden rounded-xl ' +
            'sm:h-80 md:h-96 md:w-[40rem]'
          }
        >
          <Image
            src={photo.image}
            alt={photo.title}
            fill
            sizes="(min-width: 768px) 40rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl">
              {photo.title}
            </h1>
            <p className="text-base italic text-slate-500">by {photo.creator}</p>
          </div>
          <p className="text-lg text-slate-600">{photo.location}</p>
        </div>
      </header>

      <main className="mx-auto my-12 w-[92%] max-w-[85rem] px-4 sm:px-0">
        <div
          className={
            'prose prose-lg max-w-none rounded-xl bg-beige-50 p-4 ' +
            'shadow-md shadow-stone-300 sm:p-6 md:p-8'
          }
        >
          <h2 className="text-xl font-bold text-slate-800">Description</h2>
          {/* Preserve line breaks from seeded descriptions */}
          <p className="whitespace-pre-line text-slate-700">{photo.description}</p>
        </div>
      </main>
    </>
  );
}