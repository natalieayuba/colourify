import { formatClassName } from '../utils';

// maybe use material ui for styling instead?

export const TimeRangeButton = ({ timeRange, selectedTimeRange, onClick }) => (
  <label
    htmlFor={timeRange.id}
    className={formatClassName(
      'border-2 px-4 py-2 rounded-full cursor-pointer',
      timeRange.id === selectedTimeRange
        ? 'bg-black text-white border-black font-normal'
        : 'hover:bg-gray-50 hover:duration-100 hover:border-gray-300'
    )}
  >
    <input
      type="radio"
      name="time-range"
      className="hidden"
      id={timeRange.id}
      value={timeRange.id}
      onClick={onClick}
    />
    {timeRange.text}
  </label>
);
