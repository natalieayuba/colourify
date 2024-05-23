const TimeRangeButtons = ({
  selectedTimeRange,
  setSelectedTimeRange,
  controller,
  setController,
}) => {
  const timeRanges = [
    ['short_term', 'Last month'],
    ['medium_term', 'Last 6 months'],
    ['long_term', 'All time'],
  ];

  return (
    <fieldset className='mb-8'>
      <legend className='mb-2'>Show top albums from</legend>
      <div className='flex gap-2 flex-wrap'>
        {timeRanges.map(([timeRange, text]) => (
          <label
            key={timeRange}
            htmlFor={timeRange}
            className={`border-2 px-4 py-2 rounded-full cursor-pointer ${
              timeRange === selectedTimeRange
                ? 'bg-black text-white border-black font-normal'
                : 'hover:bg-gray-50 hover:duration-100 hover:border-gray-300'
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
        ))}
      </div>
    </fieldset>
  );
};

export default TimeRangeButtons;
