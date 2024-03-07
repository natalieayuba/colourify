import { useState, useEffect } from 'react';

const useAccessToken = () => {
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

export default useAccessToken;
