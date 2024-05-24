import spotifyIcon from '../images/Spotify_Icon_RGB_White.png';
import examplePalettes from '../images/example-palettes.png';
import { title, description } from '../config';

const Login = () => {
  return (
    <div className='flex flex-col items-center pt-20 my-auto'>
      <h1 className='text-6xl sm:text-7xl font-semibold text-center mb-6'>
        {title}
      </h1>
      <p className='text-xl sm:text-2xl max-w-lg text-center mb-10'>
        {description}
      </p>
      <a
        href='/.netlify/functions/login'
        className='btn bg-spotify-green bg-radial-gradient mb-8'
      >
        <img
          src={spotifyIcon}
          alt='Spotify Icon'
          className='w-5 h-5'
          loading='eager'
        />
        Log in with Spotify
      </a>
      <img
        src={examplePalettes}
        alt='Example Colourify Palettes'
        loading='eager'
        className='pointer-events-none'
      />
    </div>
  );
};

export default Login;
