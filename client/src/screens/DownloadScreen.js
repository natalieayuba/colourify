import Palette from '../components/Palette';
import CustomisationForm from '../components/CustomisationForm';
import { useEffect, useState, useRef } from 'react';
import { getCurrentUser, getPalettes } from '../hooks/useSpotifyAPI';

const DownloadScreen = () => {
  const [username, setUsername] = useState('');
  const [albumNameVisible, setAlbumNameVisible] = useState(false);
  const [palettes, setPalettes] = useState([]);
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
      await getPalettes(url, setProgress, controller).then(
        ({ palettes, albums }) => {
          setPalettes(palettes);
          setAlbums(albums);
        }
      );
      setLoading(false);
    };
    fetchData();
  }, [selectedTimeRange, controller]);

  return (
    <div className='pt-10 sm:pt-32 gap-20 flex-wrap justify-center flex'>
      <div className='shadow-lg scale-[0.3] sm:scale-50 mb-[-1344px] mr-[-756px] sm:mb-[-960px] sm:mr-[-540px] origin-top-left'>
        <Palette
          username={username}
          paletteRef={paletteRef}
          loading={loading}
          progress={progress}
          albums={albums}
          palettes={palettes}
          albumNameVisible={albumNameVisible}
        />
      </div>
      <CustomisationForm
        username={username}
        setUsername={setUsername}
        paletteRef={paletteRef}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        controller={controller}
        setController={setController}
        loading={loading}
        albumNameVisible={albumNameVisible}
        setAlbumNameVisible={setAlbumNameVisible}
      />
    </div>
  );
};

export default DownloadScreen;
