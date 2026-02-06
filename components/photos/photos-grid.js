import PhotoItem from './photo-item';

export default function PhotosGrid({ photos }) {
  return (
    <ul
      className={
        'mx-auto my-8 grid w-[92%] max-w-[85rem] list-none grid-cols-1 gap-8 ' +
        'px-4 sm:grid-cols-2 sm:gap-12 sm:px-6 lg:grid-cols-3 lg:px-8'
      }
    >
      {photos.map((photo) => (
        <li key={photo.id} className="h-full">
          <PhotoItem {...photo} />
        </li>
      ))}
    </ul>
  );
}