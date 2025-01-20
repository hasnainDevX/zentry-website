import React from "react";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`c-button group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass} !inline-flex`}
    >
      <div>
      {leftIcon}
      </div>
      <div className="flex overflow-hidden flex-col h-[15px]">
        <span className="font-general text-xs uppercase cont ">
          <div>{title}</div>
          <div>{title}</div>
        </span>
      </div>
      {rightIcon}
    </button>
  );
};

export default Button;
