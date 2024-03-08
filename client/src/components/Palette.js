import spotifyLogo from '../assets/images/Spotify_Logo_RGB_Black.png';
import { ColorRing } from 'react-loader-spinner';

const Palette = ({ username, paletteRef, tracks, loading }) => {
  const title = `${username}${
    username.endsWith('s') ? `'` : `'s`
  } Colour Palette`;

  return (
    <div
      className='bg-white w-[1080px] h-[1920px] px-[130px] py-[182px] flex flex-col justify-between'
      ref={paletteRef}
    >
      <div className='flex justify-between items-baseline'>
        <p className='font-bold text-4xl' id='title'>
          {title}
        </p>
        <p className='text-2xl'>colourify.com</p>
      </div>
      <div className='flex justify-center'>
        {/* attribtues arent working? for colourring? */}
        {loading ? (
          <ColorRing />
        ) : (
          <ol className='list-decimal'>
            {tracks.map((track) => (
              <div key={track.id}>
                <li>
                  {track.artists[0].name} - {track.name} - {track.album.name} -{' '}
                  {track.album.album_type}
                </li>
              </div>
            ))}
          </ol>
        )}
      </div>
      <img
        src={spotifyLogo}
        alt='Spotify Logo'
        className='w-[180px] self-center'
      />
    </div>
  );
};

export default Palette;
