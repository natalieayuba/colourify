const UsernameTextBox = ({ username, setUsername }) => {
  return (
    <label className='flex flex-col gap-2 mb-8'>
      Your name
      <input
        type='text'
        name='username'
        className='border-2 w-full h-12 px-4 rounded-lg'
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </label>
  );
};

export default UsernameTextBox;
