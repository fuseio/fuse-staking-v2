import React from "react";
import sort from "../../assets/sort.svg";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { motion } from "framer-motion";

type SortBarProps = {
  className?: string;
  onChange?: (index: number) => void;
  options: string[];
  selected: number;
};

const menu = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },
  open: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.4,
    },
  },
};

const SortBar = ({
  className = "",
  onChange = () => {},
  options,
  selected,
}: SortBarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useOutsideClick(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  return (
    <div ref={ref} className={"relative cursor-pointer " + className}>
      <div
        className="flex items-center py-4 px-5 justify-between bg-white rounded-full w-full h-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-sm">
          Sort By: {options[selected].slice(0, 18)}
          {options[selected].length > 18 && "..."}
        </span>
        <img src={sort} alt="sort" />
      </div>
      {isOpen && (
        <motion.div
          animate={isOpen ? "open" : "closed"}
          initial="closed"
          exit="closed"
          variants={menu}
          className="absolute mt-2 left-0 bg-white rounded-lg shadow-xl w-60 p-2 md:w-full z-50"
        >
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
        </motion.div>
      )}
    </div>
  );
};

export default SortBar;
