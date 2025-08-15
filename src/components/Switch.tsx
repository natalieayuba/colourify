interface SwitchProps {
  label: string;
  name: string;
  disabled: boolean;
  onClick: () => void;
}

export const Switch = ({ label, ...rest }: SwitchProps) => (
  <label className="flex items-center justify-between gap-2">
    {label}
    <input type="checkbox" className="peer hidden" {...rest} />
    <span className="h-5 w-10 cursor-pointer rounded-full bg-gray-300 transition-all duration-150 before:absolute before:h-5 before:w-5 before:rounded-full before:border-2 before:border-gray-300 before:bg-white before:transition-all before:duration-150 hover:bg-gray-400 hover:bg-opacity-60 hover:before:border-gray-400 hover:before:border-opacity-60 peer-checked:bg-black peer-checked:before:translate-x-5 peer-checked:before:border-black peer-disabled:cursor-not-allowed peer-disabled:opacity-30" />
  </label>
);
