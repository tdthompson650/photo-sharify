import Link from 'next/link';
import Image from 'next/image';

export default function PhotoItem({ title, slug, image, location, creator }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-beige-50 shadow-md shadow-stone-300 transition-all duration-300 hover:shadow-lg">
      <header>
        <div className="relative h-56 sm:h-72 md:h-80">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="space-y-1 px-4 pt-3 sm:px-5 sm:pt-4">
          <h2 className="m-0 text-xl font-bold text-slate-800 sm:text-2xl">{title}</h2>
          <p className="m-0 text-base italic text-slate-500">by {creator}</p>
        </div>
      </header>
      <div className="flex flex-1 flex-col justify-between">
        <p className="px-4 pt-3 text-sm leading-relaxed text-slate-600 sm:px-5 sm:pt-4 sm:text-base">{location}</p>
        <div className="p-4 text-right sm:p-5">
          <Link
            href={`/photos/${slug}`}
            className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-emerald-500 sm:px-5 sm:py-2.5 sm:text-base"
          >
            View Photo
          </Link>
        </div>
      </div>
    </article>
  );
}
