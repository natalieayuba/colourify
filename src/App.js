import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components';
import { useAccessToken } from './hooks/useSpotifyAPI';
import { About, Download, Home, Privacy } from './pages';

const App = () => {
  const { accessToken, setAccessToken } = useAccessToken();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <BrowserRouter>
      <div className="min-h-screen relative flex flex-col justify-between">
        <main className="px-6 flex flex-col items-center flex-1">
          <Routes>
            <Route path="/" element={accessToken ? <Download /> : <Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer accessToken={accessToken} setAccessToken={setAccessToken} />
      </div>
    </BrowserRouter>
  );
};

export default App;
