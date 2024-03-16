import { useEffect, useState } from 'react';
import axios from 'axios';
import ColorThief from 'colorthief';

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState('');

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

  axios.defaults.baseURL = 'https://api.spotify.com/v1';
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  useEffect(() => {
    const { access_token, refresh_token, error } = getHashParams();
    if (error) {
      console.log(error);
      setAccessToken(refresh_token);
    } else {
      setAccessToken(access_token);
    }
  }, []);

  return accessToken;
};

const allowedAlbumTypes = ['EP', 'SINGLE', 'ALBUM', 'COMPILATION'];

const isAlbum = ({ album }) =>
  album.album_type === 'album' && album.total_tracks <= 30;

const isEp = ({ album }) =>
  album.album_type === 'single' && album.total_tracks >= 4;

const isSoundtrack = ({ album }) =>
  album.album_type === 'compilation' && album.name.includes('Soundtrack');

const removeUnwantedTracks = (tracks) => {
  const isAsmr = (track) =>
    ['ASMR', 'Asmr'].some(
      (asmrStr) =>
        track.artists.some((artist) => artist.name.includes(asmrStr)) ||
        track.album.name.includes(asmrStr) ||
        track.name.includes(asmrStr)
    );

  return tracks.filter(
    (track) =>
      allowedAlbumTypes.includes(track.album.album_type) && !isAsmr(track)
  );
};

const removeSinglesAndDuplicates = (tracks) =>
  tracks
    .filter((track) => track.album.album_type !== 'SINGLE')
    .filter(
      (track, index, array) =>
        index === array.findIndex((t) => track.id === t.id)
    );

// NEED YOU 100% CANNOT FIND IT FOR SOME REASON???
const getAlbumVersions = (tracks, country) =>
  Promise.all(
    tracks.map(async (track) => {
      if (track.album.album_type === 'SINGLE') {
        const q = `track:"${track.name}" isrc:${track.external_ids.isrc}`;
        await searchForItem(q, 'track', country)
          .then((response) => {
            const foundTracks = response.data.tracks.items;
            if (
              foundTracks.some(isAlbum) ||
              foundTracks.some(isEp) ||
              foundTracks.some(isSoundtrack)
            ) {
              track =
                foundTracks.find(isAlbum) ??
                foundTracks.find(isEp) ??
                foundTracks.find(isSoundtrack);
              track.album.album_type = foundTracks.some(isAlbum)
                ? 'ALBUM'
                : foundTracks.some(isEp)
                ? 'EP'
                : 'SOUNDTRACK';
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return track;
    })
  );

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 * @returns Promise
 */
export const getCurrentUser = () => axios.get('/me');

/**
 * Search for Item
 * https://developer.spotify.com/documentation/web-api/reference/search
 * @returns Promise
 */
export const searchForItem = (q, type, country) =>
  axios.get(`/search?q=${q}&type=${type}&market=${country}`);

/**
 * Get User's Top Items (Tracks)
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 * @returns Promise
 */
export const getTopTracks = (url, setProgress, controller, tracks = []) => {
  return axios
    .get(url, { signal: controller.signal })
    .then(async (response) => {
      tracks.push(...response.data.items);
      setProgress(tracks.length / response.data.total);
      if (response.data.next != null) {
        return getTopTracks(
          response.data.next,
          setProgress,
          controller,
          tracks
        );
      } else {
        response.data.items = tracks;
        return response;
      }
    })
    .catch((error) => console.log(error));
};

// /**
//  * Get Several Artists
//  * https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
//  * @returns Promise
//  */
// export const getSeveralArtists = (artistIds) => axios.get('/artists')

/**
 * Get the user's top albums from their top tracks
 * @returns An array of albums
 */
export const getTopAlbums = async (url, setProgress, controller, country) => {
  let albums = [];
  let album;
  let topTracks;
  let total;

  await getTopTracks(url, setProgress, controller).then((response) => {
    topTracks = response.data.items;
    total = response.data.total;
  });
  topTracks = removeUnwantedTracks(topTracks);
  topTracks = await getAlbumVersions(topTracks, country);
  topTracks = removeSinglesAndDuplicates(topTracks);

  topTracks.forEach((track) => {
    const newTrack = {
      name: track.name,
      ranking: total - topTracks.indexOf(track),
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
    array[index].ranking =
      (album.tracks.length / album.total_tracks) * album.ranking;
  });

  albums.sort((a, b) => b.ranking - a.ranking);
  albums = albums.slice(0, 5);

  return albums;
};

export const getPalettes = async (url, setProgress, controller, country) => {
  const albums = await getTopAlbums(url, setProgress, controller, country);
  const colorThief = new ColorThief();
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
  ).then((albumArts) =>
    albumArts.forEach((albumArt) =>
      palettes.push(colorThief.getPalette(albumArt, 5))
    )
  );

  return { albums, palettes };
};
