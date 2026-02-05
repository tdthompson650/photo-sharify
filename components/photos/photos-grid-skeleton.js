export default function PhotosGridSkeleton() {
    return (
      <ul className="mx-auto my-8 grid w-full max-w-[85rem] list-none grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:gap-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-xl bg-beige-50 shadow-md shadow-stone-300">
              {/* Image placeholder */}
              <div className="h-56 animate-pulse bg-stone-200 sm:h-72 md:h-80" />
  
              {/* Text placeholders */}
              <div className="space-y-3 px-4 pt-4 sm:px-5">
                <div className="h-6 w-3/4 animate-pulse rounded bg-stone-200" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200" />
              </div>
  
              {/* Location + button placeholders */}
              <div className="mt-auto space-y-4 px-4 py-5 sm:px-5">
                <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200" />
                <div className="ml-auto h-9 w-28 animate-pulse rounded-lg bg-stone-200" />
              </div>
            </article>
          </li>
        ))}
      </ul>
    );
  }