import spotifyLogo from '../../assets/images/Spotify_Logo_RGB_Black.png';

const Palette = ({ username, paletteRef, loading, albums, progressBar }) => {
  const heading = `${username}${
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
            {heading}
          </p>
          <p className='text-2xl'>colourify.herokuapp.com</p>
        </div>
        {loading ? progressBar : albums}
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
