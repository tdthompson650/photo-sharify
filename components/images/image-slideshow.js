'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import eiffeltowerImg from '@/assets/eiffeltower.png';
import machupicchuImg from '@/assets/machupicchu.png';
import grandcanyonImg from '@/assets/grandcanyon.png';
import fushimiImg from '@/assets/fushimi.png';
import newyorkImg from '@/assets/newyork.png';
import morainelakeImg from '@/assets/morainelake.png';
import santoriniImg from '@/assets/santorini.png';

const images = [
  { image: eiffeltowerImg, alt: 'Golden Hour Over Paris' },
  { image: machupicchuImg, alt: 'The Lost City in the Clouds' },
  { image: grandcanyonImg, alt: 'Canyon of Fire and Stone' },
  { image: fushimiImg, alt: 'Spring Tranquility in Kyoto' },
  { image: newyorkImg, alt: 'City That Never Sleeps' },
  { image: morainelakeImg, alt: 'Alpine Reflections' },
  { image: santoriniImg, alt: 'Aegean Sunset' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev < images.length - 1 ? prev + 1 : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl shadow-xl">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.image}
          alt={img.alt}
          aria-hidden={i !== currentImageIndex}
          fill
          sizes="(min-width: 768px) 40rem, 100vw"
          priority={i === 0}
          className={
            'absolute inset-0 object-cover transition duration-500 ease-in-out ' +
            (i === currentImageIndex
              ? 'z-10 scale-100 opacity-100'
              : 'scale-110 -translate-x-4 -rotate-[5deg] opacity-0')
          }
        />
      ))}
    </div>
  );
}
