import { Link } from 'react-router-dom';

const PageLayout = ({ heading, children }) => (
  <div className='max-w-2xl pt-24'>
    <Link to='/' className='link text-sm'>
      🡠 Back to home
    </Link>
    <h1 className='text-4xl font-semibold mb-6 mt-6'>{heading}</h1>
    {children}
  </div>
);

export default PageLayout;
