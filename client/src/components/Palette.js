import { useEffect } from 'react';
import spotifyLogo from '../assets/images/Spotify_Logo_RGB_Black.png';
import { tracks, totalTracks } from '../spotify';

const Palette = ({ username }) => {
  const title =
    username + (username.endsWith('s') ? "'" : "'s") + ' Colour Palette';

  return (
    <div
      id='palette'
      className='bg-white w-[1080px] h-[1920px] px-[130px] py-[182px] flex flex-col justify-between'
    >
      <div className='flex justify-between items-baseline'>
        <p className='font-bold text-4xl' id="title">{title}</p>
        <p className='text-2xl'>colourify.com</p>
      </div>
      {/* <div class='flex h-[1300px] w-full'>
        <div class='flex h-full justify-between flex-col flex-none mr-8'>
          {{#each albums}}
            <div>
              <img src='{{images.0.url}}' class='w-[200px] h-[200px]' alt='{{name}} by {{artists.0.name}} Album Cover' id='{{id}}'  />
              <a href="{{external_urls.spotify}}" class='album-title absolute mt-3 text-2xl hidden'>{{name}} by {{artists.0.name}}</a>
            </div>
          {{/each}}
        </div>
        <div class='flex h-full justify-between flex-col w-full'>
          {{#each palettes}}
            <div class='flex'>
              {{#each this}}
                <div class='h-[200px] min-w-6 flex-1' {{{this}}}></div>
              {{/each}}
            </div>
          {{/each}}
        </div>
      </div> */}
      <ol className='list-decimal'>
        {/* {tracks.map((track) => (
          <div>
            <li>
              {track.artists[0].name} - {track.name} - {track.album.name} -{' '}
              {track.album.album_type}
            </li>
            <p></p>
          </div>
        ))} */}
      </ol>
      <img
        src={spotifyLogo}
        alt='Spotify Logo'
        className='w-[180px] self-center'
      />
    </div>
  );
};

export default Palette;
