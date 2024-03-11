const TimeRangeButton = ({
  timeRange,
  selectedTimeRange,
  setSelectedTimeRange,
  text,
  loading,
}) => {
  return (
    <label
      htmlFor={timeRange}
      className={`bg-white-300 border-2 border-black font-normal px-4 py-2 rounded-full ${
        loading
          ? 'btn-disabled'
          : 'cursor-pointer hover:bg-black hover:text-white hover:duration-100'
      }${timeRange === selectedTimeRange ? ' bg-black text-white' : ''}`}
    >
      <input
        type='radio'
        name='time-range'
        className='hidden'
        id={timeRange}
        value={timeRange}
        onClick={() => setSelectedTimeRange(timeRange)}
        disabled={loading}
      />
      {text}
    </label>
  );
};

export default TimeRangeButton;
