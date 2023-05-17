import React from "react";
import info from "../../assets/info.svg";

type FilterBarProps = {
  className?: string;
  onClick?: (index: number, element: string) => void;
  name: string;
  states: string[];
  background?: string[];
  text?: string[];
  select?: number;
  tooltip?: string;
};

const FilterBar = ({
  className = "",
  onClick = (index: number, element: string) => {},
  name,
  states,
  background = [],
  text = [],
  select = 0,
  tooltip = "",
}: FilterBarProps) => {
  const [selected, setSelected] = React.useState(select);
  const handleClick = (i: number) => {
    setSelected(i);
    onClick(i, states[i]);
  };
  return (
    <div
      className={
        "relative flex justify-end md:w-full md:justify-center " + className
      }
    >
      <span className="font-normal text-base text-text-dark-gray pe-2 md:text-sm">
        {name}
      </span>
      <img src={info} alt="info" className="peer cursor-pointer mb-0.5" />
      {tooltip && (
        <div className="hidden absolute top-11 left-0 bg-white rounded-lg shadow-lg w-80 py-3 px-4 md:w-full peer-hover:block text-sm z-50">
          {tooltip}
        </div>
      )}
      <div className="ps-2">
        {states.map((state, index) => {
          if (index === 0) {
            return (
              <span
                key={index}
                style={
                  selected === index
                    ? {
                        background: background[index]
                          ? background[index]
                          : "#E7E7E7",
                        color: text[index] ? text[index] : "#000000",
                      }
                    : {}
                }
                className={
                  selected === index
                    ? "text-sm text-black cursor-pointer py-5 px-7 bg-dark-gray font-bold rounded-s-full"
                    : "text-sm text-black cursor-pointer py-5 px-7 bg-white font-bold rounded-s-full"
                }
                onClick={() => handleClick(index)}
              >
                {state}
              </span>
            );
          }
          if (index === states.length - 1) {
            return (
              <span
                key={index}
                style={
                  selected === index
                    ? {
                        background: background[index]
                          ? background[index]
                          : "#E7E7E7",
                        color: text[index] ? text[index] : "#000000",
                      }
                    : {}
                }
                className={
                  selected === index
                    ? "text-sm text-black cursor-pointer py-5 px-7 bg-dark-gray font-bold rounded-e-full"
                    : "text-sm text-black cursor-pointer py-5 px-7 bg-white font-bold rounded-e-full"
                }
                onClick={() => handleClick(index)}
              >
                {state}
              </span>
            );
          }
          return (
            <span
              key={index}
              style={
                selected === index
                  ? {
                      background: background[index]
                        ? background[index]
                        : "#E7E7E7",
                      color: text[index] ? text[index] : "#000000",
                    }
                  : {}
              }
              className={
                selected === index
                  ? "text-sm text-black cursor-pointer py-5 px-7 bg-dark-gray font-bold"
                  : "text-sm text-black cursor-pointer py-5 px-7 bg-white font-bold"
              }
              onClick={() => handleClick(index)}
            >
              {state}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
