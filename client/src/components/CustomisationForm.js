import { toPng } from 'html-to-image';
import TimeRangeButton from './TimeRangeButton';

const CustomisationForm = ({
  username,
  setUsername,
  paletteRef,
  selectedTimeRange,
  setSelectedTimeRange,
  loading,
  controller,
  setController,
  albumNameVisible,
  setAlbumNameVisible,
}) => {
  const timeRanges = [
    {
      timeRange: 'short_term',
      text: 'Last month',
    },
    {
      timeRange: 'medium_term',
      text: 'Last 6 months',
    },
    {
      timeRange: 'long_term',
      text: 'All time',
    },
  ];

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
    <form className='w-[324px] sm:w-[520px]'>
      <h2 className='text-3xl sm:text-4xl font-semibold mb-8'>Customise</h2>
      <label className='flex flex-col gap-2 mb-8'>
        Your name
        <input
          type='text'
          className='border-2 w-full h-12 px-4 rounded-lg'
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <fieldset className='mb-8'>
        <legend className='mb-2'>Show top albums from</legend>
        <div className='flex gap-2 flex-wrap'>
          {timeRanges.map(({ timeRange, text }) => (
            <TimeRangeButton
              key={timeRange}
              timeRange={timeRange}
              text={text}
              selectedTimeRange={selectedTimeRange}
              setSelectedTimeRange={setSelectedTimeRange}
              controller={controller}
              setController={setController}
            />
          ))}
        </div>
      </fieldset>
      <label className='flex gap-2 justify-between mb-8'>
        Include artist and album name
        <div className='relative w-[40px] h-[22px]'>
          <input
            type='checkbox'
            className='opacity-0 w-0 h-0 peer'
            onClick={() => setAlbumNameVisible(!albumNameVisible)}
            disabled={loading}
          />
          <span
            className={`absolute top-0 bottom-0 left-0 right-0 bg-gray-300 duration-300 rounded-full peer-checked:bg-black before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[3px] before:bottom-[2px] before:bg-white before:duration-300 before:rounded-full peer-checked:before:translate-x-[16px] ${
              loading ? 'cursor-default' : 'cursor-pointer'
            }`}
          ></span>
        </div>
      </label>
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
    </form>
  );
};

export default CustomisationForm;
