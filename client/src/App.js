import Login from './pages/Login';
import Download from './pages/Download';
import { useAccessToken } from './hooks/useSpotifyAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import About from './pages/About';
import Privacy from './pages/Privacy';
import NotFound from './pages/404';
import MetaTags from './components/MetaTags';

const App = () => {
  const { accessToken, setAccessToken } = useAccessToken();
  
  return (
    <BrowserRouter>
      <MetaTags />
      <div className='min-h-screen relative flex justify-center overflow-auto px-6'>
        <main className='mb-32'>
          <Routes>
            <Route path='/' element={accessToken ? <Download /> : <Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer accessToken={accessToken} setAccessToken={setAccessToken} />
      </div>
    </BrowserRouter>
  );
};

export default App;
