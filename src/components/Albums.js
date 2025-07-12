export const Albums = ({ albums, albumNameVisible }) => (
  <div className='flex-1 flex flex-col gap-16'>
    {albums.map((album) => {
      const title = `${album.artists[0].name} - ${album.name}`;
      return (
        <div className='flex-1 flex gap-6' key={album.id}>
          <a
            id={album.id}
            href={album.external_urls.spotify}
            title={title}
            className='h-full aspect-square relative'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={album.images[0].url}
              alt={`${title} Album Cover`}
              className='absolute'
              loading='eager'
              crossOrigin='anonymous'
            />
            <p
              className={`h-16 flex items-center album-title absolute -bottom-16 text-2xl w-max${
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
                style={{ backgroundColor: `rgb(${swatch})` }}
              />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);
