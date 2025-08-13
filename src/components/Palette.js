import { Album, ProgressBar } from '.';
import { possessify } from '../utils';

export const Palette = ({
  username,
  paletteRef,
  loading,
  albums,
  progress,
  showAlbumName,
}) => (
  <div
    className="bg-white w-[1080px] h-[1920px] p-[10%] flex justify-center items-center"
    ref={paletteRef}
    id="palette"
  >
    <div className="flex flex-col justify-between w-[800px] h-[1500px] ">
      <div className="flex items-baseline justify-between mb-16">
        <h1 className="font-bold text-4xl" id="title">
          {possessify(username)} Colour Palette
        </h1>
        <p className="text-2xl">mycolourify.netlify.app</p>
      </div>
      {loading ? (
        <ProgressBar value={progress} label="Loading albums..." />
      ) : (
        <div className="flex-1 flex flex-col gap-16">
          {albums.map((album) => (
            <Album key={album.id} album={album} showAlbumName={showAlbumName} />
          ))}
        </div>
      )}
      <img
        src="/images/Spotify_Logo_RGB_Black.svg"
        alt="Spotify Logo"
        className="w-1/5 h-auto self-center mt-24"
        loading="lazy"
      />
    </div>
  </div>
);
