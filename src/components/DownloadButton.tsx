import html2canvas from 'html2canvas';

interface DownloadButtonProps {
  paletteRef: React.RefObject<HTMLDivElement>;
  username: string;
  loading: boolean;
}

export const DownloadButton = ({
  paletteRef,
  username,
  loading,
}: DownloadButtonProps) => {
  const downloadImage = async () => {
    html2canvas(paletteRef.current.parentElement as HTMLElement, {
      allowTaint: true,
      useCORS: true,
      scale: 2 * window.devicePixelRatio,
    }).then((canvas) => {
      var link = document.createElement('a');
      link.download = `${username.toLowerCase()}_colourify_palette.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    });
  };

  return (
    <button
      type="button"
      id="download-btn"
      className="w-full sm:w-auto flex justify-center mt-12 btn disabled:btn-disabled enabled:hover:opacity-90"
      disabled={loading}
      onClick={downloadImage}
      title="Download image"
    >
      Download image
    </button>
  );
};
