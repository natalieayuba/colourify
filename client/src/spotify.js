import axios from 'axios';
import { useState } from 'react';

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

export const getAccessToken = () => {
  const { access_token, refresh_token, error } = getHashParams();
  if (error) {
    console.log(error);
    return refresh_token;
  } else {
    return access_token;
  }
};

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAccessToken();

const offset = 0;
const limit = 50;
const timeRange = 'short_term';

export let tracks;
export let totalTracks;

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 * @returns Promise
 */
export const getCurrentUser = async () => axios.get('/me');

// /**
//  * Get User's Top Items (Tracks)
//  * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//  * @returns Promise
//  */
// export const getTopTracks = async (
//   url = `/me/top/tracks?limit=${limit}&offset=${offset}&time_range=${timeRange}`
// ) => {
//   axios.get(url).then((response) => {
//     tracks.push(...response.data.items);
//     totalTracks = response.data.total;
//     if (response.data.next != null) {
//       getTopTracks(response.data.next);
//     }
//   });
// };

// export const getSpotifyData = () =>
//   axios.all([getCurrentUser()]).then(
//     axios.spread((user) => ({
//       user: user.data,
//     }))
//   );
