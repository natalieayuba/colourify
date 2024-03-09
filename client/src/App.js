import LoginScreen from './screens/LoginScreen';
import DownloadScreen from './screens/DownloadScreen';
import useAccessToken from './hooks/useAccessToken';
import useSpotifyData from './hooks/useSpotifyData';

const App = () => {
  const accessToken = useAccessToken();
  const { user, tracks, selectedTimeRange, setSelectedTimeRange, loading } =
    useSpotifyData(accessToken);

  return accessToken && user && tracks ? (
    <DownloadScreen
      user={user}
      tracks={tracks}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
      loading={loading}
    />
  ) : (
    <LoginScreen />
  );
};

export default App;
