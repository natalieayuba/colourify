import React from 'react';

const ProfilePage = () => (
  <div id='loggedin'>
    <div id='user-profile'></div>
    <div id='oauth'></div>
    <button class='btn btn-default' id='obtain-new-token'>
      Obtain new token using the refresh token
    </button>
  </div>
);

export default ProfilePage;
