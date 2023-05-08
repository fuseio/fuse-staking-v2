import React from "react";
import Button from "./Button";

type SubscribeBarProps = {
  className?: string;
  onClick?: () => void;
};

const SubscribeBar = ({ className = "", onClick = () => {} }: SubscribeBarProps) => {
  return (
    <div className={"h-12 flex items-center border border-gray rounded-full " + className}>
      <input
        className="w-full h-full px-6 text-sm font-medium rounded-full focus:outline-none"
        placeholder="Enter Your Email"
      />
      <Button text="Subscribe" className="bg-black font-medium text-white rounded-full me-1"/>
    </div>
  );
};

export default SubscribeBar;
