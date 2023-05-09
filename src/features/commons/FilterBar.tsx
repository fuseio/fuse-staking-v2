import React from "react";

type FilterBarProps = {
  className?: string;
  onClick?: (index: number, element: string) => void;
  name: string;
  states: string[];
  background?: string[];
  text?: string[];
  select?: number;
};

const FilterBar = ({
  className = "",
  onClick = (index: number, element: string) => {},
  name,
  states,
  background = [],
  text = [],
  select = 0,
}: FilterBarProps) => {
  const [selected, setSelected] = React.useState(select);
  const handleClick = (i: number) => {
    setSelected(i);
    onClick(i, states[i]);
  };
  return (
    <div className={"flex justify-end " + className}>
      <span className="font-normal text-base text-text-dark-gray pe-2">
        {name}
      </span>
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
                    ? "text-base text-black cursor-pointer py-5 px-6 bg-dark-gray font-bold rounded-s-full"
                    : "text-base text-black cursor-pointer py-5 px-6 bg-white font-bold rounded-s-full"
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
                    ? "text-base text-black cursor-pointer py-5 px-5 bg-dark-gray font-bold rounded-e-full"
                    : "text-base text-black cursor-pointer py-5 px-5 bg-white font-bold rounded-e-full"
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
                  ? "text-base text-black cursor-pointer py-5 px-5 bg-dark-gray font-bold"
                  : "text-base text-black cursor-pointer py-5 px-5 bg-white font-bold"
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
