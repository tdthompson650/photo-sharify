'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const [error, setError] = useState(null);
  const imageInput = useRef();

  function handlePickImage() {
    setError(null);
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      setError(null);
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setPickedImage(null);
      setError('Image is too large. Maximum size is 5MB.');
      event.target.value = '';
      return;
    }
    setError(null);
    const fileReader = new FileReader();
    fileReader.onload = () => setPickedImage(fileReader.result);
    fileReader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold uppercase tracking-wide text-stone-600"
      >
        {label}
      </label>
      <div className="flex flex-wrap items-start gap-4 sm:gap-6">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-stone-300 bg-beige-100 text-center text-stone-500 sm:h-40 sm:w-40">
          {!pickedImage && <p className="px-4 text-sm">No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="Image selected by the user"
              fill
              className="object-cover"
            />
          )}
        </div>
        <input
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
          required
          className="hidden"
        />
        <button
          type="button"
          onClick={handlePickImage}
          className="rounded-lg bg-stone-200 px-6 py-2.5 font-medium text-stone-700 transition-colors hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          Pick Image
        </button>
        {error && (
          <p className="text-sm text-amber-600">{error}</p>
        )}
      </div>
    </div>
  );
}
