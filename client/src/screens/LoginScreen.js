import spotifyIcon from '../assets/images/Spotify_Icon_RGB_White.png';
import examplePalettes from '../assets/images/example-palettes.png';

const LoginScreen = () => {
  return (
    <div id='login' className='flex flex-col items-center pb-40 pt-32 sm:pt-40'>
      <h1 className='text-6xl sm:text-7xl font-semibold text-center mb-6'>
        Colourify
      </h1>
      <p className='text-xl sm:text-2xl max-w-lg text-center mb-12'>
        Generate a colour palette based on the art of your top albums on Spotify
      </p>
      <a href='http://localhost:8888/login' className='btn bg-spotify-green'>
        <img src={spotifyIcon} alt='Spotify Icon' className='w-8 h-8' />
        Log in with Spotify
      </a>
      <div className='mt-10 sm:mt-20 max-w-[944px]'>
        <img src={examplePalettes} alt='Example Colourify Palettes' />
      </div>
    </div>
  );
};

export default LoginScreen;
