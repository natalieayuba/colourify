export const Home = () => (
  <div className="flex flex-col items-center pt-24 my-auto">
    <h1 className="text-6xl sm:text-7xl font-semibold mb-6 mr-4">Colourify</h1>
    <p className="text-xl sm:text-2xl max-w-lg text-center mb-10">
      Generate a colour palette from the cover art of your top albums on Spotify
    </p>
    {/* button */}
    <a
      href="/.netlify/functions/login"
      className="btn bg-spotify-green bg-darker-center mb-8"
    >
      <img
        src="/images/Spotify_Icon_RGB_White.svg"
        alt="Spotify Icon"
        className="size-6"
      />
      Log in with Spotify
    </a>
    <img
      srcSet="/images/hero-image-430w.webp 430w, /images/hero-image-860w.webp 860w"
      sizes="(width <= 600px) 430px, 860px"
      src="/images/hero-image-860w.webp"
      alt="Example Colourify Palettes"
      className="pointer-events-none select-none"
      fetchPriority="high"
    />
  </div>
);
