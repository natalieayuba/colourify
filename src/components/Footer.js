import config from '../config';
import { Link } from './Link';

const navlinks = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/privacy', 'Privacy'],
];

export const Footer = ({ accessToken, setAccessToken }) => {
  const resetAccessToken = () => {
    if (window.location.href.includes(accessToken)) {
      setAccessToken(null);
    }
  };

  return (
    <footer className='mt-12 text-sm p-6 bottom-0 gap-y-1 w-full items-center flex flex-col min-[404px]:flex-row justify-center'>
      <p
        className={`min-[404px]:after:content-['•'] after:text-black/50 min-[404px]:after:mx-3`}
      >
        Created by{' '}
        <Link url={config.portfolio} text='Natalie Ayuba' opensNewTab />
      </p>
      <div className='flex gap-4'>
        {navlinks.map(([url, name]) => (
          <Link key={url} url={url} onClick={resetAccessToken} text={name} />
        ))}
      </div>
    </footer>
  );
};
