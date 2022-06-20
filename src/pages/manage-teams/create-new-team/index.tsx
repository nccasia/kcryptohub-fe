import { useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { CreateForm } from "@/src/layouts/create-team/Create-form";
import { SkillDis } from "@/src/layouts/create-team/Skill-Dis";
import { Layout } from "@/src/layouts/layout";
import { Skill } from "@/type/Skill";
import {
  ISkillDistribution,
  ISkillDistributionValue,
} from "@/type/skill/skill.types";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "chart.js/auto";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: "2px solid #cae0e7",
          "&.Mui-focused": {
            borderColor: "#17313b",
            boxShadow:
              "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%)",
          },
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
  },
});

const CreateNewTeam = () => {
  const skills = useAppSelector(getSkillsSelector);

  const [step, setStep] = useState(0);
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [listSkill, setListSkill] = useState<Skill[]>([]);

  const [distributionValue, setDistributionValue] = useState<
    ISkillDistributionValue[]
  >([{ field: "", quantity: 0 } as ISkillDistributionValue]);

  const nextStep = () => {
    if (step === 0) {
      setStep((cur) => cur + 1);
    }
  };

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Container
          fixed
          maxWidth="lg"
          className="border border-[#cae0e7] md:!px-8"
        >
          <div>
            <h1 className="xl:text-4xl text-2xl lg:text-3xl text-primary py-5 font-[400] font-['Roboto, sans-serif'] ">
              Create Your Team Profile
            </h1>
            <div className="md:block hidden">
              <div className="flex pt-10 pb-5">
                <div className="flex-[50%] relative px-2 xl:text-xl text-sm lg:text-lg text-white bg-[#08537e] mr-1">
                  {step === 0 && (
                    <div className="absolute bottom-[40px] text-black right-0 flex justify-end items-center">
                      <div className="mr-2 xl:text-lg relative text-xs lg:text-base">
                        Create Team Profile
                      </div>
                      <div className="bg-[#ff3d2e] px-2 py-1 flex justify-center items-center text-white after:content-['']  after:border-[#c3281d] after:border-solid after:rotate-45 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-5px] after:bottom-[-6px]">
                        50%
                      </div>
                    </div>
                  )}
                  Enter Team Information
                </div>

                <div
                  className={
                    "flex-[50%] px-2 xl:text-xl items-center relative text-sm lg:text-lg transition-all duration-500 ease-in-out " +
                    (step === 0
                      ? "bg-[rgba(62,131,158,.25)]"
                      : "bg-[#08537e] text-white")
                  }
                >
                  {step === 1 && (
                    <div className="absolute bottom-[40px] text-black right-0 flex justify-end items-center">
                      <div className="mr-2 xl:text-lg relative text-xs lg:text-base">
                        Add Skill Distribution
                      </div>
                      <div className="bg-[#ff3d2e] px-2 py-1 flex justify-center items-center text-white after:content-['']  after:border-[#c3281d] after:border-solid after:rotate-45 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-5px] after:bottom-[-6px]">
                        100%
                      </div>
                    </div>
                  )}
                  Add Skill Distribution
                </div>
              </div>
            </div>
            <h2 className=" xl:text-3xl text-xl lg:text-2xl text-primary font-[400] font-['Roboto, sans-serif'] ">
              {step === 0 ? "Enter Team Information" : "Add Skill Distribution"}
            </h2>
          </div>
          {step === 0 && (
            <CreateForm nextStep={nextStep} step={step} setStep={setStep} />
          )}
          {step === 1 && (
            <SkillDis
              setListSkill={setListSkill}
              setStep={setStep}
              skills={skills}
              step={step}
              distributionValue={distributionValue}
              listSkill={listSkill}
              value={value}
              setValue={setValue}
              handleChange={handleChange}
              open={open}
            />
          )}
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default CreateNewTeam;
