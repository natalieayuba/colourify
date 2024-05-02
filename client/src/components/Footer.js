import { Link } from 'react-router-dom';
import spotifyLogo from '../assets/images/Spotify_Logo_RGB_Black.png';

const Footer = ({ accessToken, setAccessToken }) => {
  const navAlert = (e) => {
    if (window.location.href.includes(accessToken)) {
      const result = window.confirm('Are you sure you want to leave?');
      if (!result) {
        e.preventDefault();
        return false;
      } else {
        setAccessToken(null);
      }
    }
  };

  const navlinks = [
    ['/', 'Home'],
    ['/about', 'About'],
    ['/privacy', 'Privacy'],
  ];

  return (
    <footer className='text-sm absolute mt-10 flex flex-col gap-4 items-center px-6 py-10 bottom-0 w-full border-t'>
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
            <Link key={to} to={to} className='link' onClick={(e) => navAlert(e)}>
              {name}
            </Link>
          ))}
        </div>
      </div>
      <img src={spotifyLogo} alt='Spotify Logo' className='w-24' />
    </footer>
  );
};

export default Footer;
