import { Skill } from "@/type/Skill";
import {
  ISkillDistribution,
  ISkillDistributionValue,
} from "@/type/skill/skill.types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { SkillCollapse } from "./SkillCollapse";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
ChartJS.register(ChartDataLabels, Title, Tooltip, Legend);

export interface IValue {
  field: string;
  quantity: number | 0;
}
export interface IProps {
  listSkill: Skill[];
  setListSkill: (listSkill: Skill[]) => void;
  handleChange: () => void;
  skills: Skill[];
  value: number;
  setValue: (value: number) => void;
  step: number;
  setStep: (step: number) => void;
  distributionValue: ISkillDistributionValue[];
  open: boolean;
}

const skillColor = [
  "#1B85CE",
  "#08537E",
  "#267C87",
  "#62BA56",
  "#5D997E",
  "#4BA98B",
  "#3ACC6",
  "#6A957D",
];

export const ServicesLine = (props: IProps) => {
  const dataSkillDis: ISkillDistribution[] = [
    {
      id: null,
      skillDistributionName: "Marketing",
      skillDistributionValue: [
        {
          field: "Advertising",
          quantity: 0,
        },
        {
          field: "Branding",
          quantity: 0,
        },
        {
          field: "Content",
          quantity: 0,
        },
        {
          field: "Copywriting",
          quantity: 0,
        },
      ],
    },
    {
      id: null,
      skillDistributionName: "Digital Marketing",
      skillDistributionValue: [
        {
          field: "Digital Strategy",
          quantity: 0,
        },
        {
          field: "Social Media Marketing",
          quantity: 0,
        },
        {
          field: "Content Marketing",
          quantity: 0,
        },
        {
          field: "Pay Per Click",
          quantity: 0,
        },
      ],
    },
  ];

  const [skillDistribute, setDataSkillDistribute] = useState<IValue[]>([]);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const getLabel = () => {
    const labels = skillDistribute.map((data) => data.field);
    const data = getData();
    if (data[0] > 100) {
      return ["Over 100%", ...labels];
    }
    return [...labels, "Allocate a percentage"];
  };
  const getData = () => {
    const data = skillDistribute.map((data) => data.quantity);
    const sum = skillDistribute.reduce((acc, cur) => acc + cur.quantity, 0);
    const extra = 100 - sum;
    if (extra < 0) {
      return [sum];
    } else {
      return [...data, extra];
    }
  };
  const getColor = () => {
    const data = getData();
    const colors = skillColor.slice(0, data.length);
    const labels = getLabel();
    const sum = skillDistribute.reduce((acc, cur) => acc + cur.quantity, 0);
    const extra = 100 - sum;
    if (labels[labels.length - 1] === "Allocate a percentage") {
      colors[colors.length - 1] = "#F5F5F5";
      return colors;
    } else if (extra < 0) {
      colors[colors.length - 1] = "#ffb1ab";
      return colors;
    } else {
      return colors;
    }
  };

  const dataChart = {
    labels: getLabel(),
    datasets: [
      {
        data: getData(),
        backgroundColor: getColor(),
        hoverBackgroundColor: getColor(),
        hoverOffset: 4,
        datalabels: {
          color: getData()[0] < 100 ? "white" : "black",
          font: {
            size: 20,
          },
        },
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: function (context: any) {
          return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
        },
      },
    },
  };

  useEffect(() => {
    setTotal(
      skillDistribute.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0)
    );
  }, [skillDistribute]);
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

            {skillDistribute &&
              skillDistribute.map((cur, index) => (
                <div
                  className="inline-block border-[3px] mb-3 px-3 mr-2 text-indigo-800 rounded-md border-cyan-600 cursor-pointer"
                  key={index}
                  onClick={() => {
                    setDataSkillDistribute(
                      skillDistribute.filter((item) => item.field !== cur.field)
                    );
                  }}
                >
                  <div className="flex justify-between items-center">
                    {cur.field}
                    <span className="text-xs text-cyan-600">
                      <CloseIcon className="text-base" />
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <h2 className="text-xl py-2">All Available Skills</h2>
          <h2 className="text-base py-2 text-gray-600">
            Below is a full list of all the Service Lines available on Clutch.
          </h2>

          <div>
            {dataSkillDis &&
              dataSkillDis.map((cur, index) => (
                <SkillCollapse
                  key={index}
                  item={cur}
                  skillDistribute={skillDistribute}
                  setDataSkillDistribute={setDataSkillDistribute}
                />
              ))}
          </div>
        </div>
        <div className="md:flex-[50%] md:mr-5">
          <p className="xl:text-3xl text-xl lg:text-2xl">
            Selected Skill Distribution
          </p>
          <div className="flex justify-center items-center w-full">
            <div className="py-5 w-[280px] h-[280px]">
              <Pie
                data={dataChart}
                options={options}
                width={400}
                height={400}
              />
            </div>
          </div>

          <div className="w-full py-12 px-3">
            {skillDistribute &&
              skillDistribute.map((cur, index) => (
                <div key={index}>
                  <div className="flex items-center py-3">
                    <div
                      className={` rounded-full border w-[20px] h-[20px] bg-[${
                        skillColor[index % skillColor.length || 0]
                      }]`}
                    ></div>

                    <div className="px-3">
                      <Typography className="text-indigo-700 border rounded-md border-indigo-600 px-3">
                        {cur.field}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="px-3 w-full">
                      <Slider
                        aria-label="Temperature"
                        value={cur.quantity}
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={0}
                        max={100}
                        onChange={(event, value) => {
                          const newSkillDistribute = [...skillDistribute];
                          newSkillDistribute[index] = {
                            ...newSkillDistribute[index],
                            quantity: value as IValue["quantity"] | 0,
                          };
                          setDataSkillDistribute(newSkillDistribute);
                          setShow(true);
                        }}
                        sx={{
                          color: skillColor[index % skillColor.length || 0],
                          "& .MuiSlider-rail": {
                            backgroundColor: "gray",
                          },
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
                      value={cur.quantity}
                      onChange={(event) => {
                        if (parseInt(event.target.value) > 100) return;
                        const newSkillDistribute = [...skillDistribute];
                        newSkillDistribute[index] = {
                          ...newSkillDistribute[index],
                          quantity: parseInt(event.target.value) | 0,
                        };
                        setDataSkillDistribute(newSkillDistribute);
                        setShow(true);
                      }}
                    />
                    <span className="px-3">%</span>
                  </div>
                </div>
              ))}
          </div>
          <hr className="bg-[#cae0e7]" />
          <div
            className={
              "w-full py-4 flex items-center " +
              (total > 100 ? "" : "justify-end")
            }
          >
            <p className="text-red-600" hidden={total <= 100}>
              You cannot exceed 100% for your service allocations; reduce a
              different percentage to increase this service.
            </p>
            <div
              className={
                "text-2xl flex items-center " +
                (total > 100 ? "text-red-600" : "text-black")
              }
            >
              {total === 100 && (
                <CheckCircleIcon className="mt-1 text-green-500 h-[25px] w-[25px]" />
              )}
              {total > 100 && (
                <ErrorOutlineOutlinedIcon className="mt-1 text-red-500 h-[25px] w-[25px]" />
              )}
              {show && <div>{total}%</div>}
            </div>
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
