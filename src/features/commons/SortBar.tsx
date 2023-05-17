import React from "react";
import sort from "../../assets/sort.svg";

type SortBarProps = {
  className?: string;
  onChange?: (index: number) => void;
  options: string[];
  selected: number;
};

const SortBar = ({
  className = "",
  onChange = () => {},
  options,
  selected,
}: SortBarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className={"relative cursor-pointer " + className}>
      <div
        className="flex items-center py-4 px-5 justify-between bg-white rounded-full w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-sm">Sort By:</span>
        <img src={sort} alt="sort" />
      </div>
      {isOpen && (
        <div className="absolute mt-2 left-0 bg-white rounded-lg shadow-xl w-60 p-2 md:w-full z-50">
          {options.map((option, index) => (
            <div
              key={index}
              className={
                "flex items-center justify-between px-3 py-2 text-sm " +
                (index === selected ? "bg-selected-gray/30 rounded-md" : "")
              }
              onClick={() => {
                onChange(index);
              }}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBar;
