import Palette from '../components/Palette';
import CustomisationForm from '../components/CustomisationForm';
import { useEffect, useState, useRef } from 'react';
import {
  getCurrentUser,
  getPalettes,
  getTopAlbums,
  getTopTracks,
} from '../hooks/useSpotifyAPI';

const DownloadScreen = () => {
  const [username, setUsername] = useState('');
  const [albumNameVisible, setAlbumNameVisible] = useState(false);
  const [country, setCountry] = useState('');
  const [tracks, setTracks] = useState([]);
  const [palettes, setPalettes] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState('short_term');
  const [controller, setController] = useState(new AbortController());
  const paletteRef = useRef(null);
  const limit = 50;
  const offset = 0;

  useEffect(() => {
    const fetchData = async () =>
      await getCurrentUser().then((response) => {
        setUsername(response.data.display_name);
        setCountry(response.data.country);
      });
    fetchData();
  }, []);

  useEffect(() => {
    if (country) {
      const fetchData = async () => {
        const url = `/me/top/tracks?limit=${limit}&offset=${offset}&time_range=${selectedTimeRange}`;
        setProgress(0);
        setLoading(true);
        // setAlbums(await getTopAlbums(url, setProgress, controller, country));
        await getPalettes(url, setProgress, controller, country).then(({palettes, albums}) => {
          setPalettes(palettes);
          setAlbums(albums);
        });
        setLoading(false);
        // await getTopTracks(url, setProgress, controller, country)
        //   .then((response) => {
        //     setTracks(response.data.items);
        //     setLoading(false);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      };
      fetchData();
    }
  }, [selectedTimeRange, controller, country]);

  return (
    <div className='pt-10 sm:pt-32 gap-20 flex-wrap justify-center flex'>
      <div className='shadow-lg scale-[0.3] sm:scale-50 mb-[-1344px] mr-[-756px] sm:mb-[-960px] sm:mr-[-540px] origin-top-left'>
        <Palette
          username={username}
          paletteRef={paletteRef}
          tracks={tracks}
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
        loading={loading}
        controller={controller}
        setController={setController}
        setLoading={setLoading}
        albumNameVisible={albumNameVisible}
        setAlbumNameVisible={setAlbumNameVisible}
      />
    </div>
  );
};

export default DownloadScreen;
