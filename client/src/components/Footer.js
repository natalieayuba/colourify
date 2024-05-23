import { Link } from 'react-router-dom';
import spotifyLogo from '../assets/images/Spotify_Logo_RGB_Black.png';

const Footer = ({ accessToken, setAccessToken }) => {
  const navlinks = [
    ['/', 'Home'],
    ['/about', 'About'],
    ['/privacy', 'Privacy'],
  ];

  const resetAccessToken = () => {
    if (window.location.href.includes(accessToken)) {
      setAccessToken(null);
    }
  };

  return (
    <footer className='text-sm absolute px-6 py-6 bottom-0 w-full '>
      <div className='flex gap-2 flex-wrap justify-center'>
        <p>
          Created by{' '}
          <a href='http://natalieayuba.github.io' className='link'>
            Natalie Ayuba
          </a>
        </p>
        <span className='text-gray-300'>•</span>
        <div className='flex gap-4'>
          {navlinks.map(([to, name]) => (
            <Link
              key={to}
              to={to}
              className='link'
              onClick={() => resetAccessToken()}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
      <img
        src={spotifyLogo}
        alt='Spotify Logo'
        className='w-20 h-auto mx-auto mt-3'
      />
    </footer>
  );
};

export default Footer;
