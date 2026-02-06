'use client';

import { useState } from 'react';

import ImagePicker from '../image-picker';

export default function SharePhotoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <header className="mx-auto mb-8 max-w-3xl px-4 pt-24 text-center sm:pt-32 md:mb-20 md:pt-40">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Share your{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            favorite photo
          </span>
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Or any other photo you feel needs sharing!
        </p>
      </header>
      <main className="mx-auto w-[92%] max-w-[85rem] px-4 pb-24 sm:px-0">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto max-w-3xl space-y-6 rounded-xl bg-beige-50 p-4 shadow-md shadow-stone-300 sm:p-6 md:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold uppercase tracking-wide text-stone-600"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-stone-300 bg-beige-50 px-4 py-2.5 text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold uppercase tracking-wide text-stone-600"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-stone-300 bg-beige-50 px-4 py-2.5 text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold uppercase tracking-wide text-stone-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stone-300 bg-beige-50 px-4 py-2.5 text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block text-sm font-semibold uppercase tracking-wide text-stone-600"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stone-300 bg-beige-50 px-4 py-2.5 text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold uppercase tracking-wide text-stone-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="10"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stone-300 bg-beige-50 px-4 py-2.5 text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <ImagePicker label="Your image" name="image" />
          <div className="pt-2">
            <p className="mb-3 text-sm text-slate-600">
              Demo mode: uploads are disabled in this deployment.
            </p>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled
                className="cursor-not-allowed rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white opacity-60"
                title="Uploads are disabled in demo mode"
              >
                Share Photo
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
