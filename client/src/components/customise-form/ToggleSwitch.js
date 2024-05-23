const ToggleSwitch = ({ loading, albumNameVisible, setAlbumNameVisible }) => {
  return (
    <label className='flex gap-2 justify-between mb-8'>
      Include artist and album name
      <div className='relative w-[40px] h-[22px]'>
        <input
          type='checkbox'
          name='showAlbumName'
          className='opacity-0 w-0 h-0 peer'
          onClick={() => setAlbumNameVisible(!albumNameVisible)}
          disabled={loading}
        />
        <span
          className={`toggle-switch ${
            loading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        ></span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
