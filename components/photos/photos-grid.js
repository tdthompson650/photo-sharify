import PhotoItem from './photo-item';

export default function PhotosGrid({ photos }) {
  return (
    <ul className="mx-auto my-8 grid w-full max-w-[85rem] list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
      {photos.map((photo) => (
        <li key={photo.id}>
          <PhotoItem {...photo} />
        </li>
      ))}
    </ul>
  );
}
