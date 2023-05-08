import React from "react";

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  text: string;
  padding?: string;
  disabled?: boolean;
};

const Button = ({
  className = "",
  onClick = () => {},
  text,
  padding = "px-4 py-2",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={padding + " " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
