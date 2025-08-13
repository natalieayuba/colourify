import { formatClassName } from '../utils';

export const Toggle = ({ label, name, onClick, disabled }) => (
  <label className="flex gap-2 justify-between items-center mb-8">
    {label}
    <input
      type="checkbox"
      name={name}
      disabled={disabled}
      onClick={onClick}
      className="hidden peer"
    />
    <span
      className={formatClassName(
        'w-10 h-5 bg-gray-300 rounded-full transition-all duration-150 peer-checked:bg-black peer-checked:before:border-black peer-checked:before:translate-x-5 before:w-5 before:h-5 before:bg-white before:absolute before:rounded-full before:border-2 before:border-gray-300 before:transition-all before:duration-150',
        disabled
          ? 'cursor-not-allowed opacity-30'
          : 'cursor-pointer hover:bg-opacity-60 hover:before:border-opacity-60 hover:bg-gray-400 hover:before:border-gray-400'
      )}
    />
  </label>
);
