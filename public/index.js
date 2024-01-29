let params = getHashParams();
const access_token = params.access_token;
const refresh_token = params.refresh_token;
const error = params.error;

const albumsSource = document.getElementById('albums-template').innerHTML;
const albumsTemplate = Handlebars.compile(albumsSource);
const albumsPlaceholder = document.getElementById('albums');

const palettesSource = document.getElementById('palettes-template').innerHTML;
const palettesTemplate = Handlebars.compile(palettesSource);
const palettesPlaceholder = document.getElementById('palettes');

const headers = {
  Authorization: 'Bearer ' + access_token,
};

const numAlbums = 5;
const numSwatches = 5;

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);

  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  return hashParams;
}

function showLogin() {
  $('#login').show();
  $('#loggedin').hide();
}

function hideLogin() {
  $('#login').hide();
  $('#loggedin').show();
}

function getCurrentUser() {
  let username;

  $.ajax({
    url: 'https://api.spotify.com/v1/me',
    headers: headers,
    async: false,
    success: (response) => (username = response.display_name),
  });

  return username;
}

function getTopTracks() {
  let tracks;
  const limit = 50;
  let offset = 0;

  $.ajax({
    url: `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${limit}&offset=${offset}`,
    headers: headers,
    async: false,
    success: (response) => {
      tracks = response?.items;
    },
  });

  tracks = removeUnwantedTracks(tracks);

  return tracks;
}

/**
 * Removes ASMR and single (no-album) tracks from data
 * @return Tracks array without unwanted tracks
 */
function removeUnwantedTracks(tracks) {
  let artists = [];

  for (const track of tracks) {
    artists.push(track.artists[0].id);
  }
  artists = getSeveralArtists(artists);

  let i = tracks.length;

  while (i--) {
    let isAsmrGenre = artists.some(
      (artist) =>
        artist.id === tracks[i].artists[0].id && artist.genres.includes('asmr')
    );
    if (
      isAsmrGenre ||
      tracks[i].artists[0].name.includes('ASMR') ||
      tracks[i].album.album_type === 'SINGLE'
    ) {
      tracks.splice(tracks.indexOf(tracks[i]), 1);
    }
  }

  return tracks;
}

function getSeveralArtists(ids) {
  let artists;
  ids = ids.join(',');

  $.ajax({
    url: `https://api.spotify.com/v1/artists?ids=${ids}`,
    headers: headers,
    async: false,
    success: (response) => {
      artists = response.artists;
    },
  });

  return artists;
}

function getTopAlbums(topTracks) {
  let albums = [];
  let album;

  for (const track of topTracks) {
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
  }

  // albums = albums.filter((album) => album.tracks.length > 1);
  albums.sort((a, b) => {
    return a.ranking - b.ranking;
  });
  albums = albums.slice(0, numAlbums);

  return albums;
}

function getColourPalette() {
  const topTracks = getTopTracks();
  const topAlbums = getTopAlbums(topTracks);
  // add loop here instead?
  albumsPlaceholder.innerHTML = albumsTemplate({ album: topAlbums });

  let palettes = [];

  for (const album of topAlbums) {
    const albumArt = document.getElementById(album.id);
    albumArt.crossOrigin = 'Anonymous';
    if (albumArt.complete) {
      palettes = getColourValues(palettes, albumArt);
    } else {
      albumArt.addEventListener('load', () => {
        palettes = getColourValues(palettes, albumArt);
      });
    }
  }

  palettesPlaceholder.innerHTML = palettesTemplate({ palette: palettes });
  console.log(palettes);

  hideLogin();
}

function getColourValues(palettes, albumArt) {
  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(albumArt, numSwatches);

  for (let i = 0; i < palette.length; i++) {
    const rgb = `rgb(${palette[i][0]}, ${palette[i][1]}, ${palette[i][2]})`;
    palette[i] = `style="background-color: ${rgb};"`;
  }

  palettes.push(palette);

  return palettes;
}

if (error) {
  alert('There was an error during the authentication');
} else if (access_token) {
  getColourPalette();
} else {
  showLogin();
}
