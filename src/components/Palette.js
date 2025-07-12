import { url } from '../config';
import spotifyLogo from '../images/Spotify_Logo_RGB_Black.png';
import { Albums, ProgressBar } from '.';

export const Palette = ({
  username,
  paletteRef,
  loading,
  albums,
  progress,
  albumNameVisible,
}) => {
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
        {loading ? (
          <ProgressBar value={progress} label='Loading albums...' />
        ) : (
          <Albums albums={albums} albumNameVisible={albumNameVisible} />
        )}
        <img
          src={spotifyLogo}
          alt='Spotify Logo'
          className='w-1/5 h-auto self-center mt-24'
        />
      </div>
    </div>
  );
};
