import { formatClassName } from "../utils";

interface SegmentedControlProps {
  label: string;
  name: string;
  items: { id: string; value: string }[];
  selected: string;
  onSelect: (item: string) => void;
}

export const SegmentedControl = ({
  label,
  name,
  items,
  selected,
  onSelect,
}: SegmentedControlProps) => (
  <fieldset>
    <legend className="mb-2">{label}</legend>
    <div className="flex w-fit flex-wrap rounded-lg border">
      {items.map(({ id, value }) => (
        // multiple index to get position of divider
        // which buttons are touching it that should not have a border
        // this woul dbenefint from testing
        <label
          htmlFor={id}
          key={id}
          className={formatClassName(
            "cursor-pointer border-r px-4 py-2 last:border-r-0",
            id === selected
              ? "rounded-lg bg-black font-normal text-white"
              : "hover:border-gray-300 hover:bg-gray-50 hover:duration-100",
          )}
        >
          <input
            type="radio"
            name={name}
            className="hidden"
            id={id}
            value={id}
            onClick={() => onSelect(id)}
          />
          {value}
        </label>
      ))}
    </div>
  </fieldset>
);
