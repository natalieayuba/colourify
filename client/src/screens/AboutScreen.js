import { SiGithub } from "react-icons/si";

const AboutScreen = () => {
  return (
    <div>
      <h1>About Colourify</h1>
      <p>Inspired by my love of displaying well-designed album art as posters, Colourify generates a colour palette based on the album art of your most listened to albums on Spotify. Using Spotify's Web API, it gets your top tracks, and decipher's your top albums from those songs, only including albums and EPs and removing singles and audiobooks.</p>
      <p>Your Colourify Palette can be shared with your friends or on social media by downloading the palette as an image.</p>
      <p>To understand more about the app's privacy policy click here.</p>
      <a href='https://github.com/nayuba/spotify-colors'><SiGithub /> Source Code</a>
    </div>
  );
};

export default AboutScreen;
