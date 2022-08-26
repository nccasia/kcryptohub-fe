import { ErrorOutline } from "@mui/icons-material";
import { ClickAwayListener, Tooltip } from "@mui/material";

interface ITooltipComponentProps {
  handleCloseTooltip: () => void;
  handleOpenTooltip: () => void;
  showTooltip: boolean;
  titleTooltip: string;
  children: React.ReactNode;
}

export const TooltipComponent = ({
  handleCloseTooltip,
  handleOpenTooltip,
  showTooltip,
  titleTooltip,
  children,
}: ITooltipComponentProps) => {
  return (
    <ClickAwayListener onClickAway={handleCloseTooltip}>
      <div className="bg-transparent relative">
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleCloseTooltip}
          placement="bottom"
          open={showTooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={<>{children}</>}
        >
          <div onClick={handleOpenTooltip} className="relative">
            <span className="mr-1 3xl:text-xl">{titleTooltip}</span>
            {!showTooltip ? (
              <span className=" ml-1 absolute right-0 z-20 top-0 left-[90px] 3xl:left-[110px] rounded-full">
                <ErrorOutline className="w-5 h-5 text-[#61619b]" />
              </span>
            ) : (
              <span className="w-4 h-4 ml-1 absolute right-0 z-20 border-2 border-[#61619b] top-1 left-[92px] 3xl:left-[112px] rounded-full after:absolute after:w-4 after:h-[1px] after:right-[-2px] after:bg-[#61619b] after:rotate-90 after:top-[22px]"></span>
            )}
          </div>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};
