import { useEffect, useState, useRef } from 'react';
import {
  getCurrentUser,
  getTopTracks,
  getTopAlbums,
  getPalettes,
} from '../hooks/useSpotifyAPI';
import Palette from '../components/palette/Palette';
import ProgressBar from '../components/palette/ProgressBar';
import CustomiseForm from '../components/customise-form/CustomiseForm';
import TimeRangeButtons from '../components/customise-form/TimeRangeButtons';
import ToggleSwitch from '../components/customise-form/ToggleSwitch';
import DownloadButton from '../components/customise-form/DownloadButton';
import Albums from '../components/palette/Albums';

const Download = () => {
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
          let albums = getTopAlbums(response.data.items);
          let palettes = await getPalettes(albums);
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
    <div className='pt-10 sm:pt-24 gap-20 flex-wrap justify-center flex'>
      <div className='shadow-[0_4px_30px_0px_rgba(0,0,0,0.05)] scale-[0.3] sm:scale-50 mb-[-1344px] mr-[-756px] sm:mb-[-960px] sm:mr-[-540px] origin-top-left'>
        <Palette
          username={username}
          paletteRef={paletteRef}
          loading={loading}
          albums={
            <Albums albums={albums} albumNameVisible={albumNameVisible} />
          }
          progressBar={
            <ProgressBar value={progress} label='Loading albums...' />
          }
        />
      </div>
      <CustomiseForm
        timeRangeButtons={
          <TimeRangeButtons
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
            controller={controller}
            setController={setController}
          />
        }
        toggleSwitch={
          <ToggleSwitch
            loading={loading}
            albumNameVisible={albumNameVisible}
            setAlbumNameVisible={setAlbumNameVisible}
          />
        }
        downloadButton={
          <DownloadButton
            loading={loading}
            paletteRef={paletteRef}
            username={username}
          />
        }
      />
    </div>
  );
};

export default Download;
