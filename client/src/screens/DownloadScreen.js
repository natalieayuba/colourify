import Palette from '../components/Palette';
import CustomiseForm from '../components/CustomiseForm';
import { useState } from 'react';

const DownloadScreen = ({ user }) => {
  const [username, setUsername] = useState(user.display_name);

  return (
    <div className='mb-60 pt-10 sm:pt-32 gap-20 flex-wrap justify-center flex'>
      <div className='shadow-lg scale-[0.3] sm:scale-50 mb-[-1344px] mr-[-756px] sm:mb-[-960px] sm:mr-[-540px] origin-top-left'>
        <Palette username={username} />
      </div>
      <CustomiseForm username={username} setUsername={setUsername} />
    </div>
  );
};

export default DownloadScreen;
