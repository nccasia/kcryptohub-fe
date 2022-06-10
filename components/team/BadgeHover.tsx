import React from "react";
export interface BadgeHoverProps {
  label: string;
}
const BadgeHover = ({ label }: BadgeHoverProps) => {
  return (
    <div className="hidden z-[1] absolute items-center justify-center px-2 bg-white border-2 border-[#cae0e7] py-2 shadow-sm group-hover:inline-flex right-1/2 bottom-[calc(100%+12px)] translate-x-1/2">
      <span className="text-sm text-[#6a7a7e]">{label}</span>
      <div className="absolute w-[1px] h-[6px] bg-[#e1e1e1] top-[calc(100%+1px)] left-1/2 -translate-x-1/2"></div>
      <div className="absolute w-[10px] h-[10px] bg-white border-2 border-[#e1e1e1] rounded-full top-[calc(100%+7px)] left-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default BadgeHover;
