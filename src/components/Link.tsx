import { Link as RouterLink } from 'react-router-dom';
import { formatClassName } from '../utils';

interface LinkProps {
  text: string;
  url: string;
  opensNewTab?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Link = ({
  text,
  url,
  opensNewTab,
  onClick,
  className,
}: LinkProps) => {
  const isExternal = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url);

  const linkProps = {
    className: formatClassName('text-blue hover:underline', className),
    onClick,
    ...(opensNewTab && { target: '_blank', rel: 'noopener noreferrer' }),
  };

  return isExternal ? (
    <a {...linkProps} href={url}>
      {text}
    </a>
  ) : (
    <RouterLink {...linkProps} to={url}>
      {text}
    </RouterLink>
  );
};
