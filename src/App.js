import Login from './pages/Login';
import Download from './pages/Download';
import { useAccessToken } from './hooks/useSpotifyAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import About from './pages/About';
import Privacy from './pages/Privacy';
import MetaTags from './components/MetaTags';

const App = () => {
  const { accessToken, setAccessToken } = useAccessToken();

  return (
    <BrowserRouter>
      <MetaTags />
      <div className='min-h-screen relative flex flex-col justify-between'>
        <main className='px-6 flex flex-col items-center flex-1'>
          <Routes>
            <Route path='/' element={accessToken ? <Download /> : <Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/privacy' element={<Privacy />} />
          </Routes>
        </main>
        <Footer accessToken={accessToken} setAccessToken={setAccessToken} />
      </div>
    </BrowserRouter>
  );
};

export default App;
