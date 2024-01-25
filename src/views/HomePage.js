import React from 'react';

const HomePage = () => {
  const loginUri = 'http://localhost:3000/login';
  return (
    <>
      <h1>Welcome to Spotify Colors</h1>
      <button href={loginUri}>Log in to Spotify</button>
    </>
  );
};

export default HomePage;
