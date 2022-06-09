import { Skill } from "@/type/Skill";
import {
  ISkillDistribution,
  ISkillDistributionValue,
} from "@/type/skill/skill.types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Collapse, Slider, Typography } from "@mui/material";
import React from "react";
import { Pie } from "react-chartjs-2";

export interface IProps {
  listSkill: ISkillDistribution[];
  setListSkill: (listSkill: ISkillDistribution[]) => void;
  handleChange: () => void;
  skills: ISkillDistribution[];
  dataChart: any;
  options: any;
  value: number;
  setValue: (value: number) => void;
  step: number;
  setStep: (step: number) => void;
  distributionValue: ISkillDistributionValue[];
  open: boolean;
}

const skillColor = [
  "bg-[#1B85CE]",
  "bg-[#08537E]",
  "bg-[#267C87]",
  "bg-[#62BA56]",
  "bg-[#5D997E]",
  "bg-[#4BA98B]",
  "bg-[#3ACC60]",
  "bg-[#6A957D]",
];

export const ServicesLine = (props: IProps) => {
  return (
    <div>
      <div className="md:flex w-full">
        <div className="md:flex-[50%] md:mr-5">
          <p className="text-sm text-gray-600 py-5">
            Give buyers a sense of how you spend your time. You must add at
            least one (1) Service Line to your Company Profile.
          </p>
          <div className="py-2">
            <span className="text-cyan-800">
              <SearchIcon />
            </span>

            <input
              placeholder="Search for Services Line"
              className="md:max-w-[500px] w-full py-2 outline-none"
            />

            {props.listSkill &&
              props.listSkill.map((cur, index) => (
                <div
                  className="inline-block border-2 mb-3 px-3 mr-2 text-indigo-800 border rounded-md border-cyan-600"
                  key={index}
                >
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        props.setListSkill(
                          props.listSkill.filter((item) => {
                            return cur.id !== item.id;
                          })
                        );
                      }}
                      className="text-xs text-cyan-600"
                    >
                      <CloseIcon className="text-base" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <h2 className="text-xl py-2">All Available Skills</h2>
          <h2 className="text-base py-2 text-gray-600">
            Below is a full list of all the Service Lines available on Clutch.
          </h2>

          <div className="border relative w-full border-2 border-[#cae0e7] text-indigo-800 px-3 py-2 cursor-pointer">
            {props.skills &&
              props.skills.map((data, index) => (
                <div key={index}>
                  <div className="w-full" onClick={props.handleChange}>
                    {data.skillDistributionName}
                  </div>
                  <Collapse in={props.open}>
                    {data.skillDistributionValue.map((value, i) => (
                      <div key={i} className="pt-3 inline-block">
                        <div>
                          {props.listSkill.find((cur) => {
                            return cur.id === data.id;
                          }) ? (
                            <div className="mb-3 px-3 mr-2 text-indigo-800 border border-2 rounded-md border-cyan-600">
                              <div
                                className="flex justify-between items-center"
                                onClick={() => {
                                  if (
                                    props.listSkill.find((cur) => {
                                      return cur.id === data.id;
                                    })
                                  ) {
                                    props.setListSkill(
                                      props.listSkill.filter((cur) => {
                                        return cur.id !== data.id;
                                      })
                                    );
                                  }
                                }}
                              >
                                {value.field}
                                <button
                                  onClick={() => {
                                    props.setListSkill(
                                      props.listSkill.filter((item) => {
                                        return data.id !== item.id;
                                      })
                                    );
                                  }}
                                  className=" text-cyan-600"
                                >
                                  <CloseIcon className="text-base" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="mb-3 px-3 mr-2 text-indigo-800 border rounded-md border-cyan-600">
                              <span
                                onClick={() => {
                                  if (
                                    props.listSkill.find((cur) => {
                                      return cur.id === data.id;
                                    })
                                  ) {
                                    props.setListSkill(
                                      props.listSkill.filter((cur) => {
                                        return cur.id !== data.id;
                                      })
                                    );
                                  }
                                }}
                              >
                                {value.field}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </Collapse>
                </div>
              ))}
          </div>
        </div>

        <div className="md:flex-[50%] md:mr-5">
          <p className="xl:text-3xl text-xl lg:text-2xl">
            Selected Skill Distribution
          </p>
          <div className="flex justify-center items-center w-full">
            <div className="py-5 w-[310px] h-[310px]">
              <Pie
                data={props.dataChart}
                options={props.options}
                width={400}
                height={400}
              />
            </div>
          </div>

          <div className="w-full py-16 px-3">
            {props.listSkill &&
              props.listSkill.map((cur, index) => (
                <div key={index}>
                  <div className="flex items-center py-3">
                    <div
                      className={` rounded-full border w-[20px] h-[20px] ${
                        skillColor[index % skillColor.length || 0]
                      }`}
                    ></div>

                    <div className="px-3">
                      <Typography className="text-indigo-700 border rounded-md border-indigo-600 px-3"></Typography>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="px-3 w-full">
                      <Slider
                        aria-label="Temperature"
                        value={props.value}
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={0}
                        max={100}
                        onChange={(e, number) => {
                          props.setValue(number as number);
                        }}
                        sx={{
                          "& .MuiSlider-thumb": {
                            width: 16,
                            height: 16,
                            backgroundColor: "#fff",
                            "&:before": {
                              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                            },
                            "&:hover, &.Mui-focusVisible, &.Mui-active": {
                              boxShadow: "none",
                            },
                          },
                        }}
                      />
                    </div>

                    <input
                      maxLength={3}
                      className="w-[65px] px-3 py-1 border"
                      onChange={(e) => {
                        if (parseInt(e.target.value) > 100) return;
                        props.setValue(parseInt(e.target.value) || 0);
                      }}
                      value={props.value}
                    />
                    <span className="px-3">%</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:min-h-[80px] my-5">
        <button
          onClick={() => {
            if (props.step === 1) {
              props.setStep(0);
            }
          }}
          className="text-cyan-700 flex items center"
        >
          <span className="text-red-600 font-medium">
            <ChevronLeftIcon />
          </span>
          Back
        </button>

        <button className={"py-3 text-white px-3 flex items center bg-[red]"}>
          Save Changes
        </button>
      </div>
    </div>
  );
};
