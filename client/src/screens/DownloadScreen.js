import Palette from '../components/Palette';
import CustomisationForm from '../components/CustomisationForm';
import { useEffect, useState, useRef } from 'react';
import { getCurrentUser, getTopTracks } from '../hooks/useSpotifyAPI';

const DownloadScreen = () => {
  const [username, setUsername] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState('short_term');
  const paletteRef = useRef(null);
  const limit = 50;
  const offset = 0;

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentUser().then((response) =>
        setUsername(response.data.display_name)
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/me/top/tracks?limit=${limit}&offset=${offset}&time_range=${selectedTimeRange}`;
      setLoading(true);
      await getTopTracks(url, setProgress).then((response) =>
        setTracks(response.data.items)
      );
      setLoading(false);
      setProgress(0);
    };
    fetchData();
  }, [selectedTimeRange]);

  return (
    <div className='pt-10 sm:pt-32 gap-20 flex-wrap justify-center flex'>
      <div className='shadow-lg scale-[0.3] sm:scale-50 mb-[-1344px] mr-[-756px] sm:mb-[-960px] sm:mr-[-540px] origin-top-left'>
        <Palette
          username={username}
          paletteRef={paletteRef}
          tracks={tracks}
          loading={loading}
          progress={progress}
        />
      </div>
      <CustomisationForm
        username={username}
        setUsername={setUsername}
        paletteRef={paletteRef}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        loading={loading}
      />
    </div>
  );
};

export default DownloadScreen;
