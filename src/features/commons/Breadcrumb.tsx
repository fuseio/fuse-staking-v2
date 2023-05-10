import React from "react";
import hut from "../../assets/hut.svg";
import right from "../../assets/right.svg";
import rightLight from "../../assets/rightLight.svg";

type BreadcrumbProps = {
  className?: string;
  onClick?: (index: number, element: string) => void;
  states: string[];
  links: string[];
};

const Breadcrumb = ({
  className = "",
  onClick = (index: number, element: string) => {},
  states,
  links,
}: BreadcrumbProps) => {
  return (
    <div className={"flex justify-start items-center " + className}>
      <img src={hut} alt="Home" />
      {states.map((state, index) => {
        if (index < states.length - 1)
          return (
            <span className="flex">
              <img src={rightLight} alt="Right" className="mx-2" />
              <a
                href={links[index]}
                className="font-medium text-sm text-text-inactive hover:underline"
              >
                {state}
              </a>
            </span>
          );
        else
          return (
            <span className="flex">
              <img src={right} alt="Right" className="mx-2" />
              <p className="font-medium text-sm hover:">{state}</p>
            </span>
          );
      })}
    </div>
  );
};

export default Breadcrumb;
