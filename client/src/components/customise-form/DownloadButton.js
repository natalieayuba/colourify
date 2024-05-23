import { toPng } from 'html-to-image';

const DownloadButton = ({ paletteRef, username, loading }) => {
  const downloadImage = () => {
    toPng(paletteRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${username.toLowerCase()}_colourify_palette.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => console.error(error));
  };

  return (
    <button
      type='button'
      id='download-btn'
      className='w-full sm:w-auto flex justify-center mt-12 btn disabled:btn-disabled'
      disabled={loading}
      onClick={() => downloadImage()}
    >
      Download image
    </button>
  );
};

export default DownloadButton;
