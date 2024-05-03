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
            className={`bg-white-300 border-2 px-4 py-2 rounded-full cursor-pointer ${
              timeRange === selectedTimeRange
                ? 'selected-time-range'
                : 'hovered-time-range'
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
