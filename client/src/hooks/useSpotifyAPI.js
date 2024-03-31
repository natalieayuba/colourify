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
      console.error(error);
      setAccessToken(refresh_token);
    } else {
      setAccessToken(access_token);
    }
  }, []);

  return accessToken;
};

const removeUnwantedTracks = (tracks) => {
  const allowedAlbumTypes = ['EP', 'ALBUM', 'COMPILATION'];
  const isAsmr = (track) =>
    ['ASMR', 'Asmr'].some(
      (asmr) =>
        track.artists.some((artist) => artist.name.includes(asmr)) ||
        track.album.name.includes(asmr) ||
        track.name.includes(asmr)
    );

  return tracks.filter(
    (track) =>
      allowedAlbumTypes.includes(track.album.album_type) && !isAsmr(track)
  );
};

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 * @returns Promise
 */
export const getCurrentUser = () => axios.get('/me');

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
    .catch((error) => console.error(error));
};

/**
 * Get the user's top albums from their top tracks
 * @returns An array of albums
 */
export const getTopAlbums = async (url, setProgress, controller) => {
  let albums = [];
  let album;
  let topTracks;
  let total;

  await getTopTracks(url, setProgress, controller).then((response) => {
    topTracks = response.data.items;
    total = response.data.total;
  });

  topTracks = removeUnwantedTracks(topTracks);

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

  albums.sort((a, b) => b.ranking - a.ranking);
  albums = albums.slice(0, 5);

  return albums;
};

export const getPalettes = async (url, setProgress, controller) => {
  const albums = await getTopAlbums(url, setProgress, controller);
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
