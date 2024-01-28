let params = getHashParams();
const access_token = params.access_token;
const refresh_token = params.refresh_token;
const error = params.error;

const albumsSource = document.getElementById('albums-template').innerHTML;
const albumsTemplate = Handlebars.compile(albumsSource);
const albumsPlaceholder = document.getElementById('albums');

let username;
const headers = {
  Authorization: 'Bearer ' + access_token,
};
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

function showPalette() {
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
  const tracks = [];
  const limit = 50;
  let offset = 0;

  while (offset < 50) {
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${limit}&offset=${offset}`,
      headers: headers,
      async: false,
      success: (response) => {
        tracks.push(...response.items);
      },
    });

    offset += limit - 1;
  }

  tracks = removeUnwantedTracks(tracks);

  return tracks;
}

// removes asmr tracks and single ablums from data
function removeUnwantedTracks(tracks) {
  const topTracks = [];
  const artists = [];

  for (const track of tracks) {
    console.log(track)
    artists.push(track.artists[0].id);
  }
  artists = getSeveralArtists(artists);

  let i = tracks.length;

  while (i--) {
    const track = tracks[i];
    let isAsmrGenre = artists.some(
      (artist) =>
        artist.id === track.artists[0].id && artist.genres.includes('asmr')
    );
    if (
      isAsmrGenre ||
      track.artist[0].name.includes('ASMR') ||
      album.album_type === 'SINGLE' ||
      topTracks.some((t) => t.id === track.id)
    ) {
      topTracks.splice(tracks.indexOf(track), 1);
    }
  }

  return topTracks;
}

function getSeveralArtists(ids) {
  let artists;
  ids = ids.toString();

  $.ajax({
    url: `https://api.spotify.com/v1/artists?${ids}`,
    headers: headers,
    async: false,
    success: (response) => {
      artists = response;
    },
  });

  return artists;
}

function getTopAlbums(topTracks) {
  let albums = [];
  let album;

  for (const track of topTracks) {
    if (albums.some((album) => album.name === track.album.name)) {
      album = albums.find((album) => album.name === track.album.name);
      const index = albums.indexOf(album);
      const count = albums.reduce((a, b) => a + b) / albums.length;
      album.tracks.push(track.name);
      albums.count = count;
      albums[index] = album;
    } else {
      album = {
        name: track.album.name,
        tracks: [track.name],
        count: topTracks.indexOf(track),
      };
      albums.push(album);
    }
  }

  // albums = albums.filter((album) => album.tracks.length > 1);

  albums.sort((a, b) => {
    return a.count - b.count;
  });

  albums = albums.slice(0, 5);

  return albums;
}

if (error) {
  alert('There was an error during the authentication');
} else if (access_token) {
  console.log(access_token);
  const albums = getTopAlbums(getTopTracks());
  console.log(albums);
  albumsPlaceholder.innerHTML = albumsTemplate(albums);
  showPalette();
} else {
  showLogin();
}
