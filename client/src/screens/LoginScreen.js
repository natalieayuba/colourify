import spotifyIcon from '../images/Spotify_Icon_RGB_Black.png';
import examplePalettes from '../images/example-palettes.png';
import { description } from '../config';

const LoginScreen = () => {
  return (
    <div id='login' className='flex flex-col items-center pt-32'>
      <h1 className='text-6xl sm:text-7xl font-semibold text-center mb-6'>
        Colourify
      </h1>
      <p className='text-xl sm:text-2xl max-w-lg text-center mb-10'>
        {description}
      </p>
      <a
        href='http://localhost:8888/login'
        className='btn bg-spotify-green text-black mb-8'
      >
        <img
          src={spotifyIcon}
          alt='Spotify Icon'
          className='w-8 h-8 text-black'
          loading='eager'
        />
        Log in with Spotify
      </a>
      <img
        src={examplePalettes}
        alt='Example Colourify Palettes'
        loading='eager'
      />
    </div>
  );
};

export default LoginScreen;
