import LoginScreen from './screens/LoginScreen';
import DownloadScreen from './screens/DownloadScreen';
import Footer from './components/Footer';
import useAccessToken from './hooks/useAccessToken';
import useSpotifyData from './hooks/useSpotifyData';

const App = () => {
  const accessToken = useAccessToken();
  const { user } = useSpotifyData(accessToken);

  return (
    <div className='bg-grey-50 min-h-screen relative flex justify-center overflow-auto px-4'>
      <main>
        {accessToken && user ? (
          <DownloadScreen user={user} />
        ) : (
          <LoginScreen />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
