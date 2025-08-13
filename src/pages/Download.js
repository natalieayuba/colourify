import { useEffect, useRef, useState } from 'react';
import {
  DownloadButton,
  Palette,
  TimeRangeButton,
  Toggle,
} from '../components';
import {
  getCurrentUser,
  getPalettes,
  getTopAlbums,
  getTopTracks,
} from '../hooks/useSpotifyAPI';

const timeRanges = [
  {
    id: 'short_term',
    text: 'Last month',
  },
  {
    id: 'medium_term',
    text: 'Last 6 months',
  },
  { id: 'long_term', text: 'All time' },
];

export const Download = () => {
  const [username, setUsername] = useState('');
  const [showAlbumName, setShowAlbumName] = useState(false);
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
    <div className="py-10 sm:pt-24 gap-20 flex-wrap justify-center flex">
      <div className="shadow-[0_4px_30px_0px_rgba(0,0,0,0.05)] scale-[0.3] sm:scale-50 mb-[-1344px] mr-[-756px] sm:mb-[-960px] sm:mr-[-540px] origin-top-left">
        <Palette
          username={username}
          paletteRef={paletteRef}
          loading={loading}
          albums={albums}
          progress={progress}
          showAlbumName={showAlbumName}
        />
      </div>
      <form className="w-[324px] sm:w-[520px]">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8">Customise</h2>
        <fieldset className="mb-8">
          <legend className="mb-2">Show top albums from</legend>
          <div className="flex gap-2 flex-wrap">
            {timeRanges.map((timeRange) => (
              <TimeRangeButton
                key={timeRange.id}
                timeRange={timeRange}
                selectedTimeRange={selectedTimeRange}
                onClick={() => {
                  if (timeRange.id !== selectedTimeRange) {
                    if (controller) controller.abort();
                    setController(new AbortController());
                    setSelectedTimeRange(timeRange.id);
                  }
                }}
              />
            ))}
          </div>
        </fieldset>
        <Toggle
          disabled={loading}
          label="Include artist and album name"
          name="showAlbumName"
          onClick={() => setShowAlbumName(!showAlbumName)}
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
