import { useEffect, useState } from 'react';
import axios from 'axios';

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
export const getTopTracks = (url, setProgress, controller, topTracks = []) => {
  return axios
    .get(url, { signal: controller.signal })
    .then((response) => {
      topTracks.push(...response.data.items);
      setProgress(topTracks.length / response.data.total);
      if (response.data.next != null) {
        return getTopTracks(response.data.next, setProgress, controller, topTracks);
      } else {
        response.data.items = topTracks;
        return response;
      }
    })
};
