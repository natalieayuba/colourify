import { Link } from 'react-router-dom';

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
    <footer className='mt-12 text-sm p-6 bottom-0 gap-y-1 w-full items-center flex flex-col min-[404px]:flex-row justify-center'>
      <p className={`min-[404px]:after:content-['•'] after:text-gray-300 min-[404px]:after:mx-3`}>
        Created by{' '}
        <a href='http://natalieayuba.github.io' className='link'>
          Natalie Ayuba
        </a>
      </p>
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
    </footer>
  );
};

export default Footer;
