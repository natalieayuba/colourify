import spotifyLogo from '../assets/images/Spotify_Logo_RGB_Black.png';
import ProgressBar from './ProgressBar';

const Palette = ({
  username,
  paletteRef,
  loading,
  progress,
  albums,
  palettes,
  albumNameVisible,
}) => {
  const title = `${username}${
    username.endsWith('s') ? `'` : `'s`
  } Colour Palette`;

  return (
    <div
      className='bg-white w-[1080px] h-[1920px] p-[10%] flex justify-center items-center'
      ref={paletteRef}
    >
      <div className='flex flex-col justify-between w-[800px] h-[1500px] '>
        <div className='flex items-baseline justify-between mb-16'>
          <p className='font-bold text-4xl' id='title'>
            {title}
          </p>
          <p className='text-2xl'>colourify.herokuapp.com</p>
        </div>
        {loading ? (
          <ProgressBar
            value={progress}
            label='Loading albums...'
            showPercentage
            className='self-center'
          />
        ) : (
          <div className='flex-1 flex flex-col gap-16'>
            {albums.map((album, index) => {
              album.palette = palettes[index];
              const title = `${album.artists[0].name} - ${album.name}`;
              return (
                <div className='flex-1 flex gap-6' key={album.id}>
                  <a
                    id={album.id}
                    href={album.external_urls.spotify}
                    title={title}
                    className='h-full aspect-square relative'
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={album.images[0].url}
                      alt={`${title} Album Cover`}
                      id={album.id}
                      className='absolute'
                    />
                    <p
                      className={`album-title absolute -bottom-12 text-2xl w-max${
                        albumNameVisible ? '' : ' hidden'
                      }`}
                    >
                      {title}
                    </p>
                  </a>
                  <div className='flex-1 flex'>
                    {album.palette.map((swatch) => (
                      <div
                        key={swatch}
                        className='flex-1'
                        style={{
                          backgroundColor: `rgb(${swatch.join(',')})`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <img
          src={spotifyLogo}
          alt='Spotify Logo'
          className='w-[180px] self-center mt-24'
        />
      </div>
    </div>
  );
};

export default Palette;
