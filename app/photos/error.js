'use client';

export default function Error() {
  return (
    <main className="mx-auto mt-20 max-w-xl px-4 text-center">
      <h1 className="m-0 text-4xl font-black uppercase text-slate-800 sm:text-5xl lg:text-6xl">
        An error occurred
      </h1>
      <p className="mt-4 text-lg font-medium text-slate-600 sm:text-xl">
        Something went wrong while loading photos. Please try again later.
      </p>
    </main>
  );
}
