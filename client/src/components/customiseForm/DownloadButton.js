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
      className='w-full flex justify-center mt-12 sm:w-auto btn disabled:btn-disabled'
      disabled={!username || loading}
      title={!username ? 'Please enter your name above.' : ''}
      onClick={() => downloadImage()}
    >
      Download image
    </button>
  );
};

export default DownloadButton;
