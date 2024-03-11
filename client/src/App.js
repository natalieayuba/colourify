import LoginScreen from './screens/LoginScreen';
import DownloadScreen from './screens/DownloadScreen';
import { useAccessToken } from './hooks/useSpotifyAPI';

const App = () => {
  const accessToken = useAccessToken();
  return accessToken ? <DownloadScreen /> : <LoginScreen />;
};

export default App;
