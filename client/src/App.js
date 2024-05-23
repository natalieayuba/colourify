import LoginScreen from './screens/LoginScreen';
import DownloadScreen from './screens/DownloadScreen';
import { useAccessToken } from './hooks/useSpotifyAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import AboutScreen from './screens/AboutScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import NotFoundScreen from './screens/404';
import MetaTags from './components/MetaTags';

const App = () => {
  const { accessToken, setAccessToken } = useAccessToken();
  return (
    <BrowserRouter>
      <MetaTags />
      <div className='min-h-screen relative flex justify-center overflow-auto px-6'>
        <main className='mb-52'>
          <Routes>
            <Route
              path='/'
              element={accessToken ? <DownloadScreen /> : <LoginScreen />}
            />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/privacy' element={<PrivacyScreen />} />
            <Route path='*' element={<NotFoundScreen />} />
          </Routes>
        </main>
        <Footer accessToken={accessToken} setAccessToken={setAccessToken} />
      </div>
    </BrowserRouter>
  );
};

export default App;
