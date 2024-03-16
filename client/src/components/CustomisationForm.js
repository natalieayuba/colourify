import { saveAs } from 'file-saver';
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
    toPng(paletteRef.current).then((dataUrl) => {
      const filename = `${username.toLowerCase()}_colourify_palette.png`;
      saveAs(dataUrl, filename);
    });
  };

  return (
    <form className='w-[324px] sm:w-[520px]'>
      <h2 className='text-3xl sm:text-4xl font-semibold mb-8'>
        Customise
      </h2>
      <div className='flex flex-col gap-2 mb-8 items-start'>
        <label htmlFor='username'>Your name</label>
        <input
          type='text'
          name='username'
          id='username'
          className='border-2 w-full h-12 px-4 rounded-lg'
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col gap-2 mb-8 items-start'>
        <label>Show top albums from</label>
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
      </div>
      <div className='flex gap-2 mb-8 justify-between'>
        <label>Include artist and album name</label>
        <label className='relative inline-block w-[40px] h-[22px]'>
          <input
            type='checkbox'
            id='include-album-title-switch'
            className='opacity-0 w-0 h-0 peer'
            onClick={() => setAlbumNameVisible(!albumNameVisible)}
          />
          <span className="absolute cursor-pointer top-0 bottom-0 left-0 right-0 bg-gray-300 duration-300 rounded-full peer-checked:bg-black before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[3px] before:bottom-[2px] before:bg-white before:duration-300 before:rounded-full peer-checked:before:translate-x-[16px]"></span>
        </label>
      </div>
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
