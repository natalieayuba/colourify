const TimeRangeButton = ({
  timeRange,
  selectedTimeRange,
  setSelectedTimeRange,
  text,
  controller,
  setController,
}) => {
  return (
    <label
      htmlFor={timeRange}
      className={`bg-white-300 border-2 border-black font-normal px-4 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white hover:duration-100${
        timeRange === selectedTimeRange ? ' bg-black text-white' : ''
      }`}
    >
      <input
        type='radio'
        name='time-range'
        className='hidden'
        id={timeRange}
        value={timeRange}
        onClick={() => {
          if (timeRange !== selectedTimeRange) {
            if (controller) controller.abort();
            setController(new AbortController());
            setSelectedTimeRange(timeRange);
          }
        }}
      />
      {text}
    </label>
  );
};

export default TimeRangeButton;
