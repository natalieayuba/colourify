import { useEffect, useState } from 'react';
import axios from 'axios';

const useSpotifyData = (accessToken) => {
  const [user, setUser] = useState(null);

  axios.defaults.baseURL = 'https://api.spotify.com/v1';
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  /**
   * Get Current User's Profile
   * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
   * @returns Promise
   */
  const getCurrentUser = () => axios.get('/me');

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        await getCurrentUser().then((response) => setUser(response.data));
      };
      fetchData();
    }
  }, [accessToken]);

  return { user };
};

export default useSpotifyData;
