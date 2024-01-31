/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/**
 * Get data from user's Spotify account.
 */

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
const headers = {
  Authorization: 'Bearer ' + access_token,
};

const source = document.getElementById('palette-template').innerHTML;
const template = Handlebars.compile(source);
const placeholder = document.getElementById('palette');

const numAlbums = 5;
const numSwatches = 5;

function showLogin() {
  $('#login').show();
  $('#loggedin').hide();
}

function hideLogin() {
  $('#login').hide();
  $('#loggedin').show();
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
const getUsersTopTracks = () => {
  const limit = 50;
  const offset = 0;
  const url =
    baseUrl +
    `/me/top/tracks?time_range=long_term&limit=${limit}&offset=${offset}`;
  return $.ajax({ url, headers });
};

/**
 * Get Several Artists
 * https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
 * @param ids An array of artist IDs
 * @returns Promise
 */
const getSeveralArtists = (ids) => {
  const url = baseUrl + `/artists?ids=${ids.join(',')}`;
  return $.ajax({ url, headers });
};

/**
 * Removes ASMR and single (no-album) tracks from data
 * @param tracks An array of tracks
 * @returns The given array of tracks minus the unwanted tracks
 */
const removeUnwantedTracks = async (tracks) => {
  const artistIds = tracks.map((track) => track.artists[0].id);
  let artists = [];
  let i = tracks.length;

  await getSeveralArtists(artistIds).done((response) => {
    artists = response.artists;
  });

  while (i--) {
    const isAsmrGenre = artists.some(
      (artist) =>
        artist.id === tracks[i].artists[0].id && artist.genres.includes('asmr')
    );
    if (
      isAsmrGenre ||
      tracks[i].artists[0].name.includes('ASMR') ||
      tracks[i].album.album_type !== 'ALBUM'
    ) {
      tracks.splice(tracks.indexOf(tracks[i]), 1);
    }
  }

  return tracks;
};

/**
 * Get the user's top albums from their top tracks
 * @param topTracks An array of the user's top tracks
 * @returns An array of albums
 */
const getTopAlbums = (topTracks) => {
  let albums = [];
  let album;

  topTracks.forEach((track) => {
    if (albums.some((album) => album.id === track.album.id)) {
      album = albums.find((album) => album.id === track.album.id);
      const index = albums.indexOf(album);
      album.tracks.push(track.name);
      albums.ranking = albums.reduce((a, b) => a + b) / albums.length;
      albums[index] = album;
    } else {
      album = track.album;
      album.tracks = [track.name];
      album.ranking = topTracks.indexOf(track);
      albums.push(album);
    }
  });

  // albums = albums.filter((album) => album.tracks.length > 1);
  albums.sort((a, b) => a.ranking - b.ranking);
  albums = albums.slice(0, numAlbums);

  return albums;
};

/**
 * Get colour palettes from album art
 * @param albums An array of albums
 * @returns An array of colour palettes
 */
const getPalettes = async (albums) => {
  // try to do it other easy way.
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
 * Generate a colour palette based on the album art of the user's top albums
 */
const generateColourPalette = async () => {
  let username;
  let topTracks;

  await getCurrentUser().done((response) => {
    username = response.display_name;
    username = username.substring(0, username.lastIndexOf(' '));
  });

  // can probs do top tracks inside top albums?
  await getUsersTopTracks().done((response) => {
    topTracks = response.items;
  });

  topTracks = await removeUnwantedTracks(topTracks);

  const topAlbums = getTopAlbums(topTracks);
  const palettes = await getPalettes(topAlbums);

  placeholder.innerHTML = template({ username, topAlbums, palettes });

  hideLogin();
};

if (error) {
  alert('There was an error during the authentication');
} else if (access_token) {
  generateColourPalette();
} else {
  showLogin();
}
