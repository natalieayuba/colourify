import { url } from '../../config';
import spotifyLogo from '../../images/Spotify_Logo_RGB_Black.png';

const Palette = ({ username, paletteRef, loading, albums, progressBar }) => {
  const heading = `${username}${
    username.endsWith('s') ? `'` : `'s`
  } Colour Palette`;

  return (
    <div
      className='bg-white w-[1080px] h-[1920px] p-[10%] flex justify-center items-center'
      ref={paletteRef}
      id='palette'
    >
      <div className='flex flex-col justify-between w-[800px] h-[1500px] '>
        <div className='flex items-baseline justify-between mb-16'>
          {username && (
            <h1 className='font-bold text-4xl' id='title'>
              {heading}
            </h1>
          )}
          <p className='text-2xl'>{url}</p>
        </div>
        {loading ? progressBar : albums}
        <img
          src={spotifyLogo}
          alt='Spotify Logo'
          className='w-1/5 h-auto self-center mt-24'
        />
      </div>
    </div>
  );
};

export default Palette;
