import { Link } from './Link';

const navlinks = [
  {
    url: '/',
    name: 'Home',
  },
  {
    url: '/about',
    name: 'About',
  },
  {
    url: '/privacy',
    name: 'Privacy',
  },
];

export const Footer = ({ accessToken, setAccessToken }) => {
  const resetAccessToken = () => {
    if (window.location.href.includes(accessToken)) {
      setAccessToken(null);
    }
  };

  return (
    <footer className="mt-10 text-sm p-6 bottom-0 w-full flex justify-center">
      <p className="after:content-['•'] after:text-gray-300 after:mx-2 flex-none">
        Created by{'  '}
        <Link url="https://natalieayuba.com" text="Natalie Ayuba" opensNewTab />
      </p>
      <div className="flex gap-3 flex-none">
        {navlinks.map(({ url, name }) => (
          <Link key={name} url={url} onClick={resetAccessToken} text={name} />
        ))}
      </div>
    </footer>
  );
};
