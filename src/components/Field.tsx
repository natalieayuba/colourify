interface FieldProps {
  label: string;
  name: string;
  defaultValue: string;
  value: string;
  setValue: (value: string) => void;
  endContent?: React.ReactNode;
}

export const Field = ({
  label,
  name,
  setValue,
  endContent,
  ...rest
}: FieldProps) => (
  <div>
    <label htmlFor={name} className="mb-2 block">
      {label}
    </label>
    <div className="relative">
      <input
        type="text"
        id={name}
        name={name}
        onChange={(e) => setValue(e.target.value)}
        className="h-12 w-full rounded-lg border px-4"
        {...rest}
      />
      {endContent && (
        <div className="absolute right-0 top-0 flex aspect-square h-full items-center justify-center text-2xl opacity-60 transition-opacity duration-150 hover:opacity-100">
          {endContent}
        </div>
      )}
    </div>
  </div>
);
