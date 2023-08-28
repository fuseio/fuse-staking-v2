import React from "react";

type InfoCardProps = {
  Header: string;
  Body?: string;
  Footer?: string;
  classname?: string;
  type?: 1 | 2 | 3;
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  icon?: string;
  onClick?: () => void;
};

const InfoCard = ({
  Header,
  Body = "",
  Footer = "",
  classname = "",
  type = 1,
  size = "small",
  isLoading = false,
  icon,
  onClick,
}: InfoCardProps) => {
  return (
    <div
      className={
        size === "small"
          ? "p-5 w-1/4 bg-white rounded-lg flex flex-col justify-between " +
            classname
          : size === "medium"
          ? "p-5 w-1/2 bg-white rounded-lg flex flex-col justify-between " +
            classname
          : "p-5 w-full bg-white rounded-lg flex flex-col justify-between " +
            classname
      }
    >
      {isLoading ? (
        <div className="py-3 w-2/3 rounded-md bg-black/25 animate-pulse"></div>
      ) : (
        <div className="flex justify-start items-start">
          <div className="text-2xl font-black text-black w-[95%]">{Header}</div>
          {icon && (
            <img
              src={icon}
              alt="icon"
              className="cursor-pointer"
              onClick={onClick}
            />
          )}
        </div>
      )}

      {isLoading ? (
        <div className="py-3 w-1/2 rounded-md bg-black/25 animate-pulse mt-3"></div>
      ) : (
        <div
          className={
            type === 1
              ? "text-base text-black font-normal opacity-50 mt-3"
              : "text-base text-black font-normal mt-3"
          }
        >
          {Body}
        </div>
      )}
      {type !== 3 && (
        <div className="text-base text-black font-normal mt-3">{Footer}</div>
      )}
    </div>
  );
};

export default InfoCard;
