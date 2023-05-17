import React from "react";

type PillProps = {
  className?: string;
  type: "success" | "error" | "warning" | "inactive";
  text: string;
  isLoading?: boolean;
};

const Pill = ({ className = "", type, text, isLoading = false }: PillProps) => {
  return isLoading ? (
    <div
      style={{
        paddingTop: "0.125rem",
        paddingBottom: "0.125rem",
      }}
      className={
        "px-6 rounded-full text-sm bg-dark-gray animate-pulse " + className
      }
    ></div>
  ) : (
    <div
      style={{
        paddingTop: "0.125rem",
        paddingBottom: "0.125rem",
      }}
      className={
        "px-3 rounded-full text-sm " +
        className +
        " " +
        (type === "success"
          ? "bg-success text-success-dark"
          : type === "error"
          ? "bg-error text-error-dark"
          : type === "inactive"
          ? "bg-inactive text-black"
          : "bg-warning text-warning-dark")
      }
    >
      {text}
    </div>
  );
};

export default Pill;
