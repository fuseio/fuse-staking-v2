import React from "react";

type SearchBarProps = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ className = "", onChange = () => {} }: SearchBarProps) => {
  return (
    <div
      className={
        "flex items-center rounded-full " + className
      }
    >
      <input
        className="w-full h-full px-6 text-sm font-medium rounded-full py-4"
        placeholder="Search"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
