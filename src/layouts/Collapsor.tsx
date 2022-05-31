import { Collapse } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

export const Collapsor = ({ children, isOpen, label, preIcon, color }: {children: ReactNode, isOpen?: boolean, label: string, preIcon?: ReactNode, color?: string}) => {
    const [isOpenState, setIsOpen] = useState(isOpen||false);
    

    return (
      <div
        className={`p-4  border-t-8 shadow-lg shadow-gray-300 ${color}`}
      >
        <button className="bg-transparent font-semibold text-2xl flex items-center justify-center" onClick={()=>{setIsOpen(!isOpenState)}}>
          {preIcon} {label}
        </button>
        <Collapse in={isOpenState} className="flex flex-col ">
          {children}
        </Collapse>
      </div>
    );
}