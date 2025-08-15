import { forwardRef, useEffect, useState } from "react";
import { Album, ProgressBar } from ".";
import {
  getPalettes,
  getTopAlbums,
  getTopTracks,
} from "../hooks/useSpotifyAPI";
import { possessify } from "../utils";
import type { AlbumProps } from "./Album";

interface PaletteProps {
  displayName: string;
  loading: boolean;
  progress: number;
  showAlbumName: boolean;
  setProgress: (value: number) => void;
  controller: AbortController;
  selectedTimeRange: string;
}

export const Palette = forwardRef<HTMLDivElement, PaletteProps>(
  (
    {
      displayName,
      loading,
      progress,
      setProgress,
      controller,
      selectedTimeRange,
      showAlbumName,
    },
    ref,
  ) => {
    const [albums, setAlbums] = useState<AlbumProps["album"][]>([]);

    console.log(progress);

    useEffect(() => {
      const fetchData = async () => {
        const url = `/me/top/tracks?limit=50&offset=0&time_range=${selectedTimeRange}`;
        setProgress(0);
        await getTopTracks(url, setProgress, controller)
          .then(async (response) => {
            const albums = getTopAlbums(response.data.items);
            const palettes = await getPalettes(albums);
            setAlbums(
              albums.map((album, index) => {
                album.palette = palettes[index];
                return album;
              }),
            );
          })
          .catch((error: Error) => console.error(error));
      };
      fetchData();
    }, [selectedTimeRange, controller, setProgress]);

    return (
      <div
        className="flex h-[1920px] w-[1080px] items-center justify-center bg-white p-[10%]"
        ref={ref}
        id="palette"
      >
        <div className="flex h-[1500px] w-[800px] flex-col justify-between">
          <div className="mb-16 flex items-baseline justify-between">
            <h1 className="text-4xl font-bold" id="title">
              {possessify(displayName)} Colour Palette
            </h1>
            <p className="text-2xl">mycolourify.netlify.app</p>
          </div>
          {loading ? (
            <ProgressBar value={progress} label="Loading albums..." />
          ) : (
            <div className="flex flex-1 flex-col gap-16">
              {albums.map((album) => (
                <Album
                  key={album.id}
                  album={album}
                  showAlbumName={showAlbumName}
                />
              ))}
            </div>
          )}
          <img
            src="/images/Spotify_Logo_RGB_Black.svg"
            alt="Spotify Logo"
            className="mt-24 h-auto w-1/5 self-center"
            loading="lazy"
          />
        </div>
      </div>
    );
  },
);
