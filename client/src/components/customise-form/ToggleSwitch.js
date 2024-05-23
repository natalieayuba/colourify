const ToggleSwitch = ({ loading, albumNameVisible, setAlbumNameVisible }) => {
  return (
    <label className='flex gap-2 justify-between items-center mb-8'>
      Include artist and album name
      <input
        type='checkbox'
        name='showAlbumName'
        disabled={loading}
        onClick={() => setAlbumNameVisible(!albumNameVisible)}
        className='hidden peer'
      />
      <span
        className={`w-10 h-5 bg-gray-200 rounded-full transition-all duration-300 peer-checked:bg-black peer-checked:before:border-black peer-checked:before:translate-x-5 before:w-5 before:h-5 before:bg-white before:absolute before:rounded-full before:border-2 before:border-gray-200 before:transition-all before:duration-300 ${
          loading
            ? 'cursor-not-allowed'
            : 'cursor-pointer hover:bg-gray-300 hover:before:border-gray-300'
        }`}
      ></span>
    </label>
  );
};

export default ToggleSwitch;
