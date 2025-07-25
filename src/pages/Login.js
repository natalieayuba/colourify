import spotifyIcon from '../images/Spotify_Icon_RGB_White.png';
import examplePalettes from '../images/example-palettes.png';

export const Login = () => (
  <div className='flex flex-col items-center pt-24 my-auto'>
    <h1 className='text-6xl sm:text-7xl font-semibold text-center mb-6'>
      Colourify
    </h1>
    <p className='text-xl sm:text-2xl max-w-lg text-center mb-10'>
      Generate a colour palette from the cover art of your top albums on Spotify
    </p>
    <a
      href='/.netlify/functions/login'
      className='btn bg-spotify-green bg-darker-center mb-8'
    >
      <img src={spotifyIcon} alt='Spotify Icon' className='w-5 h-5' />
      Log in with Spotify
    </a>
    <img
      src={examplePalettes}
      alt='Example Colourify Palettes'
      className='pointer-events-none select-none'
    />
  </div>
);
