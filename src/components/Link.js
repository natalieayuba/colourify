import { Link as RouterLink } from 'react-router-dom';
import { formatClassName } from '../utils';

export const Link = ({ text, url, opensNewTab, onClick, className }) => {
  const Type = url.startsWith('/') ? RouterLink : 'a';
  return (
    <Type
      className={formatClassName('text-blue hover:underline', className)}
      onClick={onClick}
      {...(Type === 'a' ? { href: url } : { to: url })}
      {...(opensNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {text}
    </Type>
  );
};
