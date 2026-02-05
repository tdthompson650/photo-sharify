import Link from 'next/link';
import { Suspense } from 'react';

import PhotosGrid from '@/components/photos/photos-grid';
import PhotosGridSkeleton from '@/components/photos/photos-grid-skeleton';
import { getPhotos } from '@/lib/photos';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'All Photos',
  description: 'Browse all photos shared by our community.',
};

async function Photos() {
  const photos = await getPhotos();

  if (!photos || photos.length === 0) {
    return (
      <div className="mx-auto my-16 w-full max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          No photos yet
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-600 max-w-xl mx-auto">
          Check back soon—new photos will show up here when they’re added.
        </p>
      </div>
    );
  }

  return <PhotosGrid photos={photos} />;
}

export default function PhotosPage() {
  return (
    <>
      <header className="mx-auto mb-12 w-[92%] max-w-[85rem] space-y-4 px-4 pt-24 sm:pt-32 md:mb-20 md:pt-40 lg:pt-48">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Beautiful photos, shared{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            by you!
          </span>
        </h1>
        <p className="m-0 text-lg text-slate-600">
          Share your favorite photos with our community and discover inspiring
          images from others.
        </p>
        <p>
          <Link
            href="/photos/share"
            className="inline-block mt-4 rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white no-underline transition-colors hover:bg-emerald-500"
          >
            Share a Photo
          </Link>
        </p>
      </header>
      <main className="mx-auto w-[92%] max-w-[85rem] px-4 sm:px-0">
        <Suspense
          fallback={<PhotosGridSkeleton />}
        >
          <Photos />
        </Suspense>
      </main>
    </>
  );
}
