import { ReactNode } from "react"

export const IconHover = ({icon, hoverText}: {icon: ReactNode, hoverText: string}) => {
    return (
      <span className="relative group w-fit inline-block">
        <span className="flex items-center justify-center">
          <span className="self-start">{icon}</span>
          <span className="hidden group-hover:flex items-center justify-center absolute top-[-1.5rem] whitespace-nowrap w-fit font-xs text-cyan-900 border border-cyan-900 z-10 bg-white before:bg-cyan-50 before:border before:border-cyan-900 before:h-1 before:w-1 before:rounded before:absolute before:bottom-[-9px] before:z-10  after:bg-cyan-900 after:h-[8px] after:w-[1px] after:absolute after:bottom-[-9px] after:z-0">
            {hoverText}
          </span>
        </span>
      </span>
    );
}