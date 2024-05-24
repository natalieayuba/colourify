import spotifyIcon from '../images/Spotify_Icon_RGB_White.png';
import examplePalettes from '../images/example-palettes.png';
import { title, description } from '../config';

const Login = () => {
  const loginUrl = `${
    process.env.REACT_APP_PRODUCTION_URI ||
    process.env.REACT_APP_DEVELOPMENT_URI
  }/login`;
  
  return (
    <div id='login' className='flex flex-col items-center pt-32'>
      <h1 className='text-6xl sm:text-7xl font-semibold text-center mb-6'>
        {title}
      </h1>
      <p className='text-xl sm:text-2xl max-w-lg text-center mb-10'>
        {description}
      </p>
      <a
        href={loginUrl}
        className='btn bg-spotify-green bg-radial-gradient mb-8'
      >
        <img
          src={spotifyIcon}
          alt='Spotify Icon'
          className='w-6 h-6'
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
