const ToggleSwitch = ({ loading, albumNameVisible, setAlbumNameVisible }) => {
  return (
    <label className='flex gap-2 justify-between mb-8'>
      Include artist and album name
      <div className='relative w-[40px] h-[22px]'>
        <input
          type='checkbox'
          name='showAlbumName'
          className='opacity-0 w-0 h-0 peer disabled:cursor-not-allowed'
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
  );
};

export default ToggleSwitch;
