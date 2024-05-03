import LoginScreen from './screens/LoginScreen';
import DownloadScreen from './screens/DownloadScreen';
import { useAccessToken } from './hooks/useSpotifyAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import AboutScreen from './screens/AboutScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import { useState } from 'react';

const App = () => {
  const { accessToken, setAccessToken } = useAccessToken();

  return (
    <BrowserRouter>
      <div className='bg-grey-50 min-h-screen relative flex justify-center overflow-auto px-4'>
        <main className='mb-60'>
          <Routes>
            <Route
              path='/'
              element={accessToken ? <DownloadScreen /> : <LoginScreen />}
            />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/privacy' element={<PrivacyScreen />} />
          </Routes>
        </main>
        <Footer accessToken={accessToken} setAccessToken={setAccessToken} />
      </div>
    </BrowserRouter>
  );
};

export default App;
