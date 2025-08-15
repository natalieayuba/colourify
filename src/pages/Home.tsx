import { Button } from "../components";

export const Home = () => (
  <div className="my-auto flex flex-col items-center pt-24">
    <h1 className="mb-6 mr-4 text-6xl font-semibold sm:text-7xl">Colourify</h1>
    <p className="mb-10 max-w-lg text-center text-xl sm:text-2xl">
      Generate a colour palette from the cover art of your top albums on Spotify
    </p>
    <Button
      href="/.netlify/functions/login"
      className="mb-8 bg-spotify-green bg-darker-center"
      icon={
        <img
          src="/images/Spotify_Icon_RGB_White.svg"
          alt="Spotify Icon"
          className="size-6"
        />
      }
    >
      Log in with Spotify
    </Button>
    <img
      srcSet="/images/hero-image-430w.webp 430w, /images/hero-image-860w.webp 860w"
      sizes="(width <= 600px) 430px, 860px"
      src="/images/hero-image-860w.webp"
      alt="Example Colourify Palettes"
      className="pointer-events-none select-none"
    />
  </div>
);
