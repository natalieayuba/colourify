import { formatClassName } from "../utils";

export interface AlbumProps {
  album: {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { width: number; url: string }[];
    external_urls: { spotify: string };
    palette: string[];
  };
  showAlbumName: boolean;
}

export const Album = ({ album, showAlbumName }: AlbumProps) => {
  const title = `${album.artists[0]?.name} - ${album.name}`;

  const albumCoverUrl = (
    album.images.find(({ width }) => width === 300) || album.images[0]
  )?.url;

  const colourSwatches = album.palette.map((swatch) => (
    <div
      key={swatch}
      className="flex-1"
      style={{ backgroundColor: `rgb(${swatch})` }}
    />
  ));

  return (
    <div className="flex flex-1 gap-6">
      <a
        id={album.id}
        href={album.external_urls.spotify}
        title={title}
        className="relative aspect-square h-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={albumCoverUrl}
          alt={title + " Album Cover"}
          className="absolute"
          loading="eager"
          crossOrigin="anonymous"
        />
        <p
          className={formatClassName(
            "album-title absolute -bottom-16 flex h-16 w-max items-center text-2xl",
            !showAlbumName && "hidden",
          )}
        >
          {title}
        </p>
      </a>
      <div className="flex flex-1">{colourSwatches}</div>
    </div>
  );
};
