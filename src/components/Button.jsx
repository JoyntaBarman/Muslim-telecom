import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-[#511BEA] text-white font-bold px-4 py-2 rounded-lg  hover:bg-indigo/90 duration-300",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
