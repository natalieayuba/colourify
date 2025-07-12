import { useEffect, useState, useRef } from 'react';
import {
  getCurrentUser,
  getTopTracks,
  getTopAlbums,
  getPalettes,
} from '../hooks/useSpotifyAPI';
import {
  ToggleSwitch,
  TimeRangeButtons,
  DownloadButton,
  Palette,
} from '../components';

export const Download = () => {
  const [username, setUsername] = useState('');
  const [albumNameVisible, setAlbumNameVisible] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState('short_term');
  const [controller, setController] = useState(new AbortController());
  const paletteRef = useRef(null);

  useEffect(() => {
    const fetchData = async () =>
      await getCurrentUser().then((response) =>
        setUsername(response.data.display_name)
      );
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/me/top/tracks?limit=50&offset=0&time_range=${selectedTimeRange}`;
      setProgress(0);
      setLoading(true);
      await getTopTracks(url, setProgress, controller)
        .then(async (response) => {
          const albums = getTopAlbums(response.data.items);
          const palettes = await getPalettes(albums);
          setAlbums(
            albums.map((album, index) => {
              album.palette = palettes[index];
              return album;
            })
          );
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [selectedTimeRange, controller]);

  return (
    <div className='py-10 sm:pt-24 gap-20 flex-wrap justify-center flex'>
      <div className='shadow-[0_4px_30px_0px_rgba(0,0,0,0.05)] scale-[0.3] sm:scale-50 mb-[-1344px] mr-[-756px] sm:mb-[-960px] sm:mr-[-540px] origin-top-left'>
        <Palette
          username={username}
          paletteRef={paletteRef}
          loading={loading}
          albums={albums}
          progress={progress}
          albumNameVisible={albumNameVisible}
        />
      </div>
      <form className='w-[324px] sm:w-[520px]'>
        <h2 className='text-3xl sm:text-4xl font-semibold mb-8'>Customise</h2>
        <TimeRangeButtons
          selectedTimeRange={selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
          controller={controller}
          setController={setController}
        />
        <ToggleSwitch
          loading={loading}
          albumNameVisible={albumNameVisible}
          setAlbumNameVisible={setAlbumNameVisible}
        />
        <DownloadButton
          loading={loading}
          paletteRef={paletteRef}
          username={username}
        />
      </form>
    </div>
  );
};
