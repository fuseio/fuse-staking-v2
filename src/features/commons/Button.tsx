import React from "react";

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  text: string;
  padding?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  disabledClassname?: string;
  children?: React.ReactNode;
};

const Button = ({
  className = "",
  onClick = () => {},
  text,
  padding = "px-4 py-2",
  disabled = false,
  type = "button",
  disabledClassname = className,
  children,
}: ButtonProps) => {
  return (
    <button
      className={
        disabled ? padding + " " + disabledClassname : padding + " " + className
      }
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
