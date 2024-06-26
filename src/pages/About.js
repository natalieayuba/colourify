import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const About = () => {
  return (
    <PageLayout heading='About Colourify'>
      <p className='mb-6'>
        Colourify is a tool that generates a colour palette from the cover art
        of a user's top five albums on Spotify. To estimate your top albums,
        Colourify gets your top tracks using the{' '}
        <a
          className='link'
          href='https://developer.spotify.com/documentation/web-api'
        >
          Spotify Web API
        </a>{' '}
        and groups them by album. Check out the{' '}
        <a href='https://github.com/natalieayuba/colourify' className='link'>
          source code on Github
        </a>{' '}
        to see how this works.
      </p>
      <p className='mb-6'>
        To understand how your data is used, see Colourify's{' '}
        <Link to={'/privacy'} className='link'>
          privacy policy
        </Link>
        , and if you have any questions or issues, feel free to{' '}
        <a className='link' href='mailto:natalieayuba@hotmail.com'>
          contact me
        </a>
        .
      </p>
    </PageLayout>
  );
};

export default About;
