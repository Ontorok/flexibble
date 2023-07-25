import Image from "next/image";
import React, { MouseEventHandler } from "react";

type Props = {
  title: string;
  type: "button" | "submit";
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
  isSubmitting?: boolean;
};

const Button = ({ type, title, leftIcon, rightIcon, bgColor, textColor, isSubmitting, handleClick }: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 hover:cursor-pointer ${
        isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"
      } ${textColor || "text-white"} rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right" />}
    </button>
  );
};

export default Button;
