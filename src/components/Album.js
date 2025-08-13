import { formatClassName } from '../utils';

export const Album = ({ album, showAlbumName }) => {
  const title = `${album.artists[0].name} - ${album.name}`;

  const albumCoverUrl = (
    album.images.find(({ width }) => width === 300) || album.images[0]
  ).url;

  const colourSwatches = album.palette.map((swatch) => (
    <div
      key={swatch}
      className="flex-1"
      style={{ backgroundColor: `rgb(${swatch})` }}
    />
  ));

  return (
    <div className="flex-1 flex gap-6">
      <a
        id={album.id}
        href={album.external_urls.spotify}
        title={title}
        className="h-full aspect-square relative"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={albumCoverUrl}
          alt={title + ' Album Cover'}
          className="absolute"
          loading="eager"
          crossOrigin="anonymous"
        />
        <p
          className={formatClassName(
            'h-16 flex items-center album-title absolute -bottom-16 text-2xl w-max',
            !showAlbumName && 'hidden'
          )}
        >
          {title}
        </p>
      </a>
      <div className="flex-1 flex">{colourSwatches}</div>
    </div>
  );
};
