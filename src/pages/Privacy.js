import { PageLayout, Link } from '../components';

export const Privacy = () => (
  <PageLayout heading='Privacy Policy'>
    <p className='mb-6'>
      Colourify uses the{' '}
      <Link
        url='https://developer.spotify.com/documentation/web-api'
        text='Spotify Web API'
        opensNewTab
      />{' '}
      to access some data from your Spotify account. By using Colourify, you
      agree to the use of your Spotify username and data about your top tracks
      (used to estimate your top albums).
    </p>
    <p className='mb-6'>
      None of the data used by Colourify is stored, collected, or shared with
      any third parties. The information is solely used to generate your colour
      palette.
    </p>
    <p className='mb-2'>
      If you would like to revoke Colourify's access to your Spotify account:
    </p>
    <ol className='list-decimal list-inside mb-2 pl-4'>
      <li>
        Log in to Spotify and go to the{' '}
        <Link
          url='https://www.spotify.com/account/apps/'
          text='Apps page'
          opensNewTab
        />
        .
      </li>
      <li>Look for Colourify and click 'Remove Access'.</li>
    </ol>
    <p className='mb-6'>
      This will remove all access Colourify has to your Spotify, so next time
      you visit Colourify you will be asked to log in with your Spotify account
      again to re-authorise Colourify's access to your data.{' '}
    </p>
  </PageLayout>
);
