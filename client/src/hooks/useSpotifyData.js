import { useEffect, useState } from 'react';
import axios from 'axios';

const useSpotifyData = (accessToken) => {
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('long_term');
  const [loading, setLoading] = useState(false);

  const offset = 0;
  const limit = 50;

  axios.defaults.baseURL = 'https://api.spotify.com/v1';
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  /**
   * Get Current User's Profile
   * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
   * @returns Promise
   */
  const getCurrentUser = () => axios.get('/me');

  /**
   * Get User's Top Items (Tracks)
   * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
   * @returns Promise
   */
  const getTopTracks = (
    url = `/me/top/tracks?limit=${limit}&offset=${offset}&time_range=${selectedTimeRange}`
  ) => axios.get(url);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        await getCurrentUser()
          .then(({ data }) => setUser(data))
          .catch((error) => console.error(error));
      };
      fetchData();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        setLoading(true);
        await getTopTracks()
          .then(({ data }) => setTracks(data.items))
          .catch((error) => console.error(error));
        setLoading(false);
      };
      fetchData();
    }
  }, [accessToken, selectedTimeRange]);

  return { user, tracks, selectedTimeRange, setSelectedTimeRange, loading };
};

export default useSpotifyData;
