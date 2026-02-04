import Link from 'next/link';

import ImageSlideshow from '@/components/images/image-slideshow';

export default function Home() {
  return (
    <>
      <header className="mx-auto my-8 flex w-[92%] max-w-[85rem] flex-col gap-8 px-4 pt-24 sm:my-12 sm:gap-12 sm:pt-32 md:flex-row md:items-center lg:pt-40">
        <div className="h-56 w-full shrink-0 sm:h-64 md:h-80 md:w-[40rem]">
          <ImageSlideshow />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl">
              PhotoSharify for Photography Enthusiasts
            </h1>
            <p className="text-lg text-slate-600">
              Share your favorite photos with a community of photography lovers.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-lg">
            <Link
              href="/photos"
              className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white no-underline transition-colors hover:bg-emerald-500"
            >
              Browse Photos
            </Link>
            <Link
              href="/community"
              className="inline-block rounded-lg px-6 py-3 font-medium text-emerald-600 no-underline transition-colors hover:text-emerald-500"
            >
              Join Community
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto my-12 w-[92%] max-w-[85rem] space-y-12 px-4 text-center sm:my-16 sm:space-y-16 sm:px-0">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">How it works</h2>
          <p className="text-lg leading-relaxed text-slate-600">
            PhotoSharify is a platform for photographers to share their
            favorite images with the world. Discover new perspectives and
            connect with fellow photo enthusiasts.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Why PhotoSharify?
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            A community-driven space to discover inspiring images, share your
            best shots, and connect with fellow photography enthusiasts.
          </p>
        </section>
      </main>
    </>
  );
}
