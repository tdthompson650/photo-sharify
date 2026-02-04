'use client';

import { useFormStatus } from 'react-dom';

export default function PhotosFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-emerald-600 px-6 py-2.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-stone-200 sm:px-8 sm:py-3 sm:text-lg"
    >
      {pending ? 'Sharing...' : 'Share Photo'}
    </button>
  );
}
