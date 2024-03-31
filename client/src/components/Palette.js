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
      className='bg-white w-[1080px] h-[1920px] px-[130px] py-[182px] flex flex-col justify-between'
      ref={paletteRef}
    >
      <div className='flex justify-between items-baseline'>
        {username && (
          <p className='font-bold text-4xl' id='title'>
            {title}
          </p>
        )}
        <p className='text-2xl'>colourify.com</p>
      </div>
      <div className='flex justify-center'>
        {loading ? (
          <ProgressBar
            value={progress}
            label='Loading tracks...'
            showPercentage
          />
        ) : (
          <div className='flex h-[1300px] w-full'>
            <div className='flex h-full justify-between flex-col flex-none mr-8'>
              {albums.map((album) => {
                const title = `${album.name} by ${album.artists[0].name}`;
                return (
                  <a
                    id={album.id}
                    href={album.external_urls.spotify}
                    title={title}
                    key={album.id}
                  >
                    <img
                      src={album.images[0].url}
                      className='w-[200px] h-[200px]'
                      alt={`${title}} Album Cover`}
                      id={album.id}
                    />
                    <p
                      className={`album-title absolute mt-3 text-2xl${
                        albumNameVisible ? '' : ' hidden'
                      }`}
                    >
                      {title}
                    </p>
                  </a>
                );
              })}
            </div>
            <div className='flex h-full justify-between flex-col w-full'>
              {palettes.map((swatches) => (
                <div key={swatches} className='flex'>
                  {swatches.map(([r, g, b]) => {
                    const rgb = `${r},${g},${b}`;
                    return (
                      <div
                        key={rgb}
                        className={`h-[200px] min-w-6 flex-1`}
                        style={{ backgroundColor: `rgb(${rgb})` }}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
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
