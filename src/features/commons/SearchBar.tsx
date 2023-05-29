import React from "react";

type SearchBarProps = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value:any;
};

const SearchBar = ({ className = "", onChange = () => {},value }: SearchBarProps) => {
  return (
    <div
      className={
        "flex items-center rounded-full " + className
      }
    >
      <input
        className="w-full [h-52px] px-6 text-sm font-medium rounded-full py-4"
        placeholder="Search name or address"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
