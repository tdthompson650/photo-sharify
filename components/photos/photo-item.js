import Link from 'next/link';
import Image from 'next/image';

export default function PhotoItem({ title, slug, image, location, creator }) {
  return (
    <article
      className={
        'group relative flex h-full flex-col overflow-hidden rounded-xl ' +
        'bg-beige-50 shadow-md shadow-stone-300 transition duration-200 ease-out ' +
        'hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg'
      }
    >
      {/* Stretched link: makes the entire card clickable */}
      <Link
        href={`/photos/${slug}`}
        aria-label={`View photo: ${title}`}
        className={
          'absolute inset-0 z-10 rounded-xl focus-visible:outline-none ' +
          'focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2'
        }
      />

      <header className="relative z-0">
        <div className="relative h-56 sm:h-72 md:h-80">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        <div className="space-y-1 px-4 pt-3 sm:px-5 sm:pt-4">
          <h2 className="m-0 line-clamp-2 text-xl font-bold text-slate-800 sm:text-2xl">
            {title}
          </h2>
          <p className="m-0 text-base italic text-slate-500">by {creator}</p>
        </div>
      </header>

      <div className="relative z-0 flex flex-1 flex-col">
        <p
          className={
            'px-4 pt-3 text-sm leading-relaxed text-slate-600 ' +
            'sm:px-5 sm:pt-4 sm:text-base'
          }
        >
          {location}
        </p>

        {/* Decorative button look (not a link) */}
        <div className="mt-auto p-4 text-right sm:p-5">
          <span
            aria-hidden="true"
            className={
              'inline-flex items-center justify-center rounded-lg bg-emerald-600 ' +
              'px-4 py-2 text-sm font-semibold text-white sm:px-5 sm:py-2.5 sm:text-base'
            }
          >
            View Photo
          </span>
        </div>
      </div>
    </article>
  );
}
