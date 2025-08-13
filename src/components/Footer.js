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
    <footer className="mt-10 text-sm p-6 bottom-0 w-full flex justify-center">
      <p className="after:content-['•'] after:text-gray-300 after:mx-2 flex-none">
        Created by{'  '}
        <Link url="https://natalieayuba.com" text="Natalie Ayuba" opensNewTab />
      </p>
      <div className="flex gap-3 flex-none">
        {navlinks.map(([url, name]) => (
          <Link key={url} url={url} onClick={resetAccessToken} text={name} />
        ))}
      </div>
    </footer>
  );
};
