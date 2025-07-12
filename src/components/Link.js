import { Link as RouterLink } from 'react-router-dom';

export const Link = ({ text, url, opensNewTab, onClick, className }) => {
  const Type = url.startsWith('/') ? RouterLink : 'a';
  return (
    <Type
      className={`text-blue hover:underline${className ? ` ${className}` : ''}`}
      onClick={onClick}
      {...(Type === 'a' ? { href: url } : { to: url })}
      {...(opensNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {text}
    </Type>
  );
};
