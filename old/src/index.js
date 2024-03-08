/* eslint-disable no-loop-func */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);

  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  return hashParams;
};

const { access_token, error } = getHashParams();
const colorThief = new ColorThief();
const baseUrl = 'https://api.spotify.com/v1';
const headers = { Authorization: 'Bearer ' + access_token };
const source = document.getElementById('palette-template').innerHTML;
const template = Handlebars.compile(source);
const placeholder = document.getElementById('palette');
const downloadBtn = document.getElementById('download-btn');
const includeAlbumTitleSwitch = document.getElementById('include-album-title-switch');
const usernameField = document.getElementById('username');
const numAlbums = 5;
const numSwatches = 5;
let user;

let topTracks = [];
let maxTracks;

let username;

function showLogin() {
  $('#login').show();
  $('#loggedin').hide();
}

function hideLogin() {
  $('#login').hide();
  $('#loggedin').css('display', 'flex');
}

function confirmNavigation() {
  if (window.location.href.includes('access_token')) {
    return confirm('Are you sure you want to leave?');
  } return null;
}

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 * @returns Promise
 */
const getCurrentUser = () => {
  const url = baseUrl + '/me';
  return $.ajax({ url, headers });
};

/**
 * Get User's Top Items (Tracks)
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 * @returns Promise
 */
const getTopTracks = (
  url = baseUrl + `/me/top/tracks?limit=${limit}&offset=${offset}&time_range=${time_range}`,
) => $.ajax({
  url,
  headers,
  async: false,
  success: (response) => {
    topTracks.push(...response.items);
    maxTracks = response.total;
    if (response.next != null) {
      getTopTracks(response.next);
    }
  },
});

/**
 * Search for Item
 * https://developer.spotify.com/documentation/web-api/reference/search
 * @param q The search query
 * @param type An array of item types
 * @returns Promise
 */
const searchItem = (q, type) => {
  const url = baseUrl + `/search?q=${q}&type=${type}&market=${user.country}`;
  return $.ajax({ url, headers });
};

/**
 * Removes ASMR and excluded album types from data
 * @param tracks An array of tracks
 * @returns The given array of tracks minus the unwanted tracks
 */
const removeUnwantedTracks = async (tracks) => {
  const isAsmrTrack = (track) => track.name.includes('ASMR') || track.album.name.includes('ASMR') || track.artists.some(({ name }) => name.includes('ASMR'));
  const isOnlyDuplicate = (track) => track === tracks.filter((t) => track.external_ids.isrc === t.external_ids.isrc)[0];

  console.log(tracks.filter((track) => isAsmrTrack(track) || track.album.album_type === 'AUDIOBOOK'));
  return tracks.filter((track) => !isAsmrTrack(track) && isOnlyDuplicate(track));
};

/**
 * Get album version of track if exists
 * @param tracks An array of tracks
 */
const replaceSingles = async (tracks) => Promise.all(tracks.map(async (track) => {
  const isEp = ({ album }) => album.album_type === 'single' && album.total_tracks >= 4;
  const isSoundtrack = (album) => album.album_type === 'compilation' && album.name.includes('Soundtrack');
  const isAlbum = ({ album }) => album.album_type === 'album' && album.total_tracks <= 30;

  if (track.album.album_type === 'SINGLE') {
    const q = `track:"isrc:${track.external_ids.isrc}`;
    await searchItem(q, 'track').done(({ tracks }) => {
      if (tracks.items.some(isAlbum)) {
        track = tracks.items.find(isAlbum);
      } else if (tracks.items.some(isEp)) {
        track = tracks.items.find(isEp);
      } else if (tracks.items.some(isSoundtrack)) {
        track = tracks.items.find(isSoundtrack);
      } 
    });
  }
  return track;
}));

/**
 * Get the user's top albums from their top tracks
 * @returns An array of albums
 */
const getTopAlbums = async () => {
  const excludedAlbumTypes = ['SINGLE', 'AUDIOBOOK'];
  const isAcceptedAlbum = (album) => !excludedAlbumTypes.includes(album.album_type);
  let albums = [];
  let album;

  await getTopTracks();
  topTracks = await removeUnwantedTracks(topTracks);
  topTracks = await replaceSingles(topTracks);
  topTracks = topTracks.filter(({ album }) => isAcceptedAlbum(album));

  topTracks.forEach((track) => {
    const newTrack = {
      name: track.name,
      ranking: maxTracks - topTracks.indexOf(track),
    };
    const albumExists = (album) => album.id === track.album.id;
    if (albums.some(albumExists)) {
      album = albums.find(albumExists);
      const index = albums.indexOf(album);
      album.tracks.push(newTrack);
      album.ranking += newTrack.ranking;
      albums[index] = album;
    } else {
      album = track.album;
      album.tracks = [newTrack];
      album.ranking = newTrack.ranking;
      albums.push(album);
    }
  });

  albums.forEach((album, index, array) => {
    array[index].ranking = (album.tracks.length / album.total_tracks) * album.ranking;
  });

  // for (let i = minTracksPerAlbum; i > 0; i--) {
  //   const filteredAlbums = albums.filter((album) => album.tracks.length > i);
  //   if (filteredAlbums.length >= numAlbums) {
  //     albums = filteredAlbums;
  //     break;
  //   }
  // }

  albums.sort((a, b) => b.ranking - a.ranking);
  // albums = albums.slice(0, numAlbums);

  return albums;
};

/**
 * Get colour palettes from album art
 * @param albums An array of albums
 * @returns An array of colour palettes
 */
const getPalettes = async (albums) => {
  const palettes = [];
  const waitForImg = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
      img.crossOrigin = 'Anonymous';
    });

  await Promise.all(
    albums.map((album) => waitForImg(album.images[0].url))
  ).then((images) =>
    images.forEach((albumArt) => {
      const p = colorThief.getPalette(albumArt, numSwatches);
      p.forEach(([r, g, b], index) => {
        const rgb = `rgb(${r}, ${g}, ${b})`;
        p[index] = `style="background-color: ${rgb};"`;
      });
      palettes.push(p);
    })
  );

  return palettes;
};

/**
 * Download colour palette as a png image
 */
const downloadImg = () => {
  htmlToImage.toPng(placeholder).then((dataUrl) => {
    const link = document.createElement('a');
    link.download = `${username.toLowerCase()}_colourify_palette.png`;
    link.href = dataUrl;
    link.click();
  });
};

/**
 * Show artist and album titles beneath each colour palette
 */
const showTitles = () => {
  const albumTitles = document.querySelectorAll('.album-title');
  albumTitles.forEach((albumTitle) => {
    if (includeAlbumTitleSwitch.checked) {
      albumTitle.classList.remove('hidden');
    } else {
      albumTitle.classList.add('hidden');
    }
  });
};

const unwantedTest = async (topTracks) => {
  const isAlbum = ({ album }) => album.album_type === 'album' && album.total_tracks <= 30;
  const isEp = ({ album }) => album.album_type === 'single' && album.total_tracks >= 4;
  const isSoundtrack = (album) => album.album_type === 'compilation' && album.name.includes('Soundtrack');

  console.log(topTracks)
  
  return Promise.all(topTracks
    .filter((topTrack) => topTrack.album.album_type !== 'ALBUM')
    .map(async (topTrack) => {
      const q = `track:"${topTrack.name}" isrc:${topTrack.external_ids.isrc}`;
      let albumVersion;

      await searchItem(q, ['track']).done(({ tracks }) => {
        if (topTrack.album.album_type === 'SINGLE') {
          console.log(topTrack.artists[0].name + ' - ' + topTrack.name);
          if (tracks.items.some(isAlbum) || tracks.items.some(isEp)) {
            albumVersion = tracks.items.find(isAlbum) ?? tracks.items.find(isEp);
            albumVersion.album.album_type = tracks.items.find(isEp) ? 'EP' : 'ALBUM';
            topTrack.albumVersion = albumVersion;
          }
          console.log(topTrack.albumVersion);
        }
      });

      return topTrack;
    }));
};

/**
 * Generate a colour palette based on the album art of the user's top albums
 */
const generateColourPalette = async () => {
  user = await getCurrentUser();
  // const albums = await getTopAlbums();
  // const palettes = await getPalettes(albums);
  // let title;

  // await getCurrentUser().done((response) => {
  //   username = response.display_name;
  // });

  // title = username + (username.endsWith('s') ? "'" : "'s") + '  Colour Palette';
  // albums.forEach((album) => console.log(album));

  await getTopTracks();
  // topTracks = await removeUnwantedTracks(topTracks);
  // topTracks = topTracks.filter(({ album }) => isAcceptedAlbum(album));
  topTracks = await unwantedTest(topTracks);
  placeholder.innerHTML = template({ topTracks });
  // placeholder.innerHTML = template({ title, albums, palettes });
  // downloadBtn.addEventListener('click', () => downloadImg()); // also add checkfieldnotempty??
  // includeAlbumTitleSwitch.addEventListener('change', () => showTitles());
  // usernameField.value = username;
  // usernameField.addEventListener('keyup', () => {
  //   username = usernameField.value;
  //   title = username + (username.endsWith('s') ? "'" : "'s") + '  Colour Palette';
  //   placeholder.innerHTML = template({ title, albums, palettes });
  // });

  hideLogin();
};

if (error) {
  alert('There was an error during authentication.');
} else if (access_token) {
  generateColourPalette();
} else {
  showLogin();
}

export { unwantedTest, generateColourPalette };
