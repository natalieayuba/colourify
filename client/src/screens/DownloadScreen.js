import Palette from '../components/Palette';
import CustomisationForm from '../components/CustomisationForm';
import { useState, useRef } from 'react';

const DownloadScreen = ({
  user,
  tracks,
  selectedTimeRange,
  setSelectedTimeRange,
  loading,
}) => {
  const [username, setUsername] = useState(user.display_name);
  const paletteRef = useRef(null);

  return (
    <div className='mb-60 pt-10 sm:pt-32 gap-20 flex-wrap justify-center flex'>
      <div className='shadow-lg scale-[0.3] sm:scale-50 mb-[-1344px] mr-[-756px] sm:mb-[-960px] sm:mr-[-540px] origin-top-left'>
        <Palette
          username={username}
          tracks={tracks}
          paletteRef={paletteRef}
          loading={loading}
        />
      </div>
      <CustomisationForm
        username={username}
        paletteRef={paletteRef}
        setUsername={setUsername}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
      />
    </div>
  );
};

export default DownloadScreen;
