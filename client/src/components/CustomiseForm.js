const CustomiseForm = ({ username, setUsername }) => {
  return (
    <form className='w-[324px] sm:w-[520px]'>
      <h2 className='text-3xl sm:text-4xl font-semibold mb-8'>
        Customise Image
      </h2>
      <div className='flex flex-col gap-2 mb-8'>
        <label htmlFor='username'>Your name</label>
        <input
          type='text'
          name='username'
          id='username'
          className='border w-full h-12 px-4 rounded-lg'
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='flex gap-10 mb-8 items-center justify-between'>
        <label htmlFor='include-album-title-switch'>
          Include artist and album name
        </label>
        <label className='relative inline-block w-[40px] h-[22px]'>
          <input
            type='checkbox'
            id='include-album-title-switch'
            name='include-album-title-switch'
            className='opacity-0 w-0 h-0 peer'
          />
          <span className="absolute cursor-pointer top-0 bottom-0 left-0 right-0 bg-gray-300 duration-300 rounded-full peer-checked:bg-black before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[3px] before:bottom-[2px] before:bg-white before:duration-300 before:rounded-full peer-checked:before:translate-x-[16px]"></span>
        </label>
      </div>
      <button
        type='button'
        id='download-btn'
        className='w-full flex justify-center mt-12 sm:w-auto btn'
      >
        Download image
      </button>
    </form>
  );
};

export default CustomiseForm;
