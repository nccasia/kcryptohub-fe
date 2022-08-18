import React, { useState } from "react";
import {
  ClickAwayListener,
  createTheme,
  ThemeProvider,
  Tooltip,
  Zoom,
} from "@mui/material";
import { ISkill } from "@/type/skill/skill.types";
const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        popper: {},
        tooltip: {
          fontFamily: "Nunito",
          fontSize: "14px",
          borderRadius: "15px",
          marginBottom: "9px !important",
        },
      },
    },
  },
});
const TooltipCustom = ({
  skillColor,
  skill,
}: {
  skillColor: string[];
  skill: ISkill;
}) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <div className="inline-block p-1 pt-3 font-nunito ">
      <ThemeProvider theme={theme}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            className="font-nunito"
            title={skill.skillName}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableTouchListener
            TransitionComponent={Zoom}
            arrow
            placement="top"
          >
            <span
              className={`px-2 py-1 block rounded-2xl md:max-w-[175px] max-w-[140px] hover:scale-105 cursor-default  truncate  ${
                skillColor[
                  skill.id
                    ? skill.id % skillColor.length
                    : Math.round(Math.random() * (skillColor.length - 1))
                ]
              } text-white ml-2 mt-2 font-medium`}
              onClick={handleTooltipOpen}
              onMouseEnter={handleTooltipOpen}
              onMouseLeave={handleTooltipClose}
            >
              {skill.skillName}
            </span>
          </Tooltip>
        </ClickAwayListener>
      </ThemeProvider>
    </div>
  );
};

export default TooltipCustom;
