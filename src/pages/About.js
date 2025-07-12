import { Link, PageLayout } from '../components';

export const About = () => (
  <PageLayout heading='About Colourify'>
    <p className='mb-6'>
      Colourify is a tool that generates a colour palette from the cover art of
      a user's top five albums on Spotify. To estimate your top albums,
      Colourify gets your top tracks using the{' '}
      <Link
        url='https://developer.spotify.com/documentation/web-api'
        opensNewTab
        text='Spotify Web API'
      />{' '}
      and groups them by album. Check out the{' '}
      <Link
        url='https://github.com/natalieayuba/colourify'
        text='source code on Github'
        opensNewTab
      />{' '}
      to see how this works.
    </p>
    <p className='mb-6'>
      To understand how your data is used, see Colourify's{' '}
      <Link url='/privacy' text='privacy policy' />.
    </p>
  </PageLayout>
);
