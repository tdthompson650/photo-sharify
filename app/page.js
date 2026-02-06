import Link from 'next/link';

import ImageSlideshow from '@/components/images/image-slideshow';

export default function Home() {
  return (
    <>
      <header className="mx-auto my-8 flex w-[92%] max-w-[85rem] flex-col gap-8 px-4 pt-24 sm:my-12 sm:gap-12 sm:pt-32 lg:flex-row lg:items-center lg:pt-40">
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-64 md:h-80 md:w-[28rem] lg:w-[40rem]">
          <ImageSlideshow />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-4xl lg:text-5xl">
              PhotoSharify for Photography Enthusiasts
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
              Share your favorite photos with a community of photography lovers.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-lg">
            <Link
              href="/photos"
              className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white no-underline transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Browse Photos
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-600 px-6 py-3 font-semibold text-emerald-600 no-underline transition-colors hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Join Community
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto my-12 w-[92%] max-w-[85rem] space-y-12 px-4 pb-32 text-center sm:my-16 sm:space-y-16 sm:px-0">
        <section className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">How it works</h2>
          <p className="text-lg leading-relaxed text-slate-600">
            PhotoSharify is a platform for photographers to share their
            favorite images with the world. Discover new perspectives and
            connect with fellow photo enthusiasts.
          </p>
        </section>
        <section className="mx-auto max-w-3xl space-y-4">
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
