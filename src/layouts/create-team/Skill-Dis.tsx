import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createTeam, resetTeam, updateTeam } from "@/redux/teamSlice";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { Skill } from "@/type/Skill";
import { ISkillDistribution } from "@/type/team/team.type";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import { Slider, Typography } from "@mui/material";
import { Chart as ChartJS, Legend, Title, Tooltip, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Dialog } from "../Dialog";
import { SkillCollapse } from "./SkillCollapse";
import * as yub from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { getProfile } from "@/redux/profileSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { teamApi } from "@/api/team-api";
import { setTeam } from "@/redux/dashboardSlice";

ChartJS.register(ChartDataLabels, Title, Tooltip, Legend, ArcElement);
ChartJS.defaults.plugins.tooltip;

const schema = yub.object().shape({
  skillDistributionName: yub
    .string()
    .required("Skill Distribution Name is required")
    .trim("Skill Distribution Name is required")
    .max(30, "Skill Distribution Name dose not exceed 30 character"),
});
export interface IValue {
  field: string;
  quantity: number | 0;
}
export interface IProps {
  step: number;
  setStep: (step: number) => void;
  imageFile?: File | null;
  setImageFile?: (imageFile: File | null) => void;
  title?: string;
  skillDistribution?: ISkillDistribution[];
  teamUpdate?: ICreateTeam;
}

const skillColor = [
  "#1B85CE",
  "#08537E",
  "#267C87",
  "#62BA56",
  "#5D997E",
  "#4BA98B",
  "#3ACC61",
  "#6A957D",
  "#1B85CE",
  "#08537E",
  "#267C87",
  "#62BA56",
  "#5D997E",
  "#4BA98B",
  "#3ACC61",
  "#6A957D",
];

const skillColorBG = [
  "bg-[#1B85CE]",
  "bg-[#08537E]",
  "bg-[#267C87]",
  "bg-[#62BA56]",
  "bg-[#5D997E]",
  "bg-[#4BA98B]",
  "bg-[#3ACC61]",
  "bg-[#6A957D]",
];

export const SkillDis = (props: IProps) => {
  const router = useRouter();
  const team = useAppSelector((state) => state.TeamReducer.value);
  const {
    watch,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const buttonRef = useRef(null);
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
        {
          field: "HR Marketing",
          quantity: 0,
        },
        {
          field: "SEO",
          quantity: 0,
        },
      ],
    },
  ];

  const [skillDistribute, setDataSkillDistribute] = useState<IValue[]>([]);
  const [skillName, setSkillName] = useState("");
  const [skillId, setSkillId] = useState("");

  useEffect(() => {
    if (props.skillDistribution && props.skillDistribution?.length > 0) {
      setDataSkillDistribute(
        props.skillDistribution[0]?.skillDistributionValue
      );
      setSkillName(props.skillDistribution[0].skillDistributionName);
      setSkillId(props.skillDistribution[0].id as string);
      setValue(
        "skillDistributionName",
        props.skillDistribution[0].skillDistributionName,
        { shouldValidate: true }
      );
    }
  }, [props.skillDistribution]);

  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (
      labels[labels.length - 1] === "Allocate a percentage" &&
      labels.length % colors.length >= 0
    ) {
      colors[labels.length - 1] = "#F5F5F5";
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
        hoverOffset: getData()[0] < 100 ? 1 : 0,
        datalabels: {
          color: getData()[0] <= 100 ? "#F5F5F5" : "black",
          font: {
            size: 20,
          },
        },
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItems: any) {
            if (tooltipItems.label === "Allocate a percentage") {
              return tooltipItems.label + " : " + 0 + "%";
            } else {
              return (
                tooltipItems.label + " : " + tooltipItems.formattedValue + "%"
              );
            }
          },
        },
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: function (context: any) {
          return context.dataset.data[context.dataIndex] >= 10; // or >= 1 or ...
        },
        formatter: (value: any, ctx: any) => {
          let dataArr = ctx.chart.data.datasets[0].data;
        },
      },
    },
  };

  const handleSaveCreateTeam = async () => {
    const formData = {
      id: null || props.teamUpdate?.id,
      teamName: team.teamName || props.teamUpdate?.teamName,
      imageUrl: team.imageUrl || props.teamUpdate?.imageUrl,
      description: team.description || props.teamUpdate?.description,
      skills: team.skills || props.teamUpdate?.skills,
      linkWebsite: team.linkWebsite || props.teamUpdate?.linkWebsite,
      founded: team.founded || props.teamUpdate?.founded,
      timeZone: team.timeZone || props.teamUpdate?.timeZone,
      projectSize: team.projectSize || props.teamUpdate?.projectSize,
      slogan: team.slogan || props.teamUpdate?.slogan,
      teamSize: team.teamSize || props.teamUpdate?.teamSize,
      saleEmail: team.saleEmail || props.teamUpdate?.saleEmail,
      awards: team.awards || props.teamUpdate?.awards,
      keyClients: team.keyClients || props.teamUpdate?.keyClients,
      portfolios: team.portfolios || props.teamUpdate?.portfolios,
      skillDistribution: [
        {
          id: null || skillId,
          ...watch(),
          skillDistributionValue: skillDistribute,
        },
      ],
    };
    if (total === 100) {
      (buttonRef.current as unknown as HTMLButtonElement).disabled = true;
      if (props.title === "Add") {
        await dispatch(
          createTeam({
            team: formData as unknown as ICreateTeam,
            file: props.imageFile || null,
          })
        ).then((res) => {
          dispatch(resetTeam());
        });
        setLoading(true);
        dispatch(getProfile());
        router.push("/manage-teams");
      } else {
        await dispatch(updateTeam(formData as unknown as ICreateTeam));
        setLoading(true);
        if (formData.id){
          teamApi.getTeam(+formData.id).then((res) => {
            dispatch(setTeam(res.data));
          });
        }
      }

      const to = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(to);
      (buttonRef.current as unknown as HTMLButtonElement).disabled = false;
    } else if (total > 100) {
      (buttonRef.current as unknown as HTMLButtonElement).disabled = true;
      setLoading(true);
      toast.error("Total percentage exceed 100%");
      setTimeout(() => {
        (buttonRef.current as unknown as HTMLButtonElement).disabled = false;
        setLoading(false);
      }, 3100);
    } else {
      (buttonRef.current as unknown as HTMLButtonElement).disabled = true;
      setLoading(true);
      toast.error("Total percentage less than 100%");
      setTimeout(() => {
        (buttonRef.current as unknown as HTMLButtonElement).disabled = false;
        setLoading(false);
      }, 3100);
    }
    
  };

  useEffect(() => {
    setTotal(
      skillDistribute.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0)
    );
  }, [skillDistribute, team]);
  return (
    <div>
      <div className="md:flex w-full">
        <div className="md:flex-[50%] md:mr-5">
          <h2 className=" xl:text-3xl text-xl lg:text-2xl text-primary font-[400] font-['Roboto, sans-serif'] ">
            {props.title} Skill Distribution
            {props.title !== "Update" && (
              <span className="md:hidden ml-1 text-gray-500">{`(${
                props.step + 1
              }/2)`}</span>
            )}
          </h2>
          <p className="text-sm text-gray-600 py-5">
            Give buyers a sense of how you spend your time. You must add at
            least one (1) Skill Distribution to your Company Profile.
          </p>
          <div className="py-2">
            <div className="flex items-center mb-4">
              <span className="text-cyan-800 mr-2">
                <SearchIcon />
              </span>

              <input
                placeholder="Search for Skill Distribution"
                className="md:max-w-[400px] w-full py-2 outline-none"
              />
            </div>

            <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
              Skill Distribution Name
            </label>
            <input
              placeholder="Enter name here"
              className="md:max-w-[500px] w-full mb-3 border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
              maxLength={30}
              defaultValue={skillName || "" || props.teamUpdate?.teamName}
              {...register("skillDistributionName")}
            />

            {errors?.skillDistributionName && (
              <div className="flex justify-left  mb-3 text-sm ">
                <p className={"block text-red-500 font-medium"}>
                  {errors?.skillDistributionName?.message}
                </p>
              </div>
            )}
            <div>
              {skillDistribute &&
                skillDistribute.map((cur, index) => (
                  <div
                    className="inline-block border-[3px] mb-3 px-3 mr-2 text-indigo-800 rounded-md border-[#cae0e7] cursor-pointer"
                    key={index}
                    onClick={() => {
                      setDataSkillDistribute(
                        skillDistribute.filter(
                          (item) => item.field !== cur.field
                        )
                      );
                    }}
                  >
                    <div className="flex justify-between items-center">
                      {cur.field}
                      <span className="text-xs text-cyan-700">
                        <CloseIcon className="text-base" />
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <h2 className="text-xl py-2">All Available Skills</h2>
          <h2 className="text-base py-2 text-gray-600">
            Below is a full list of all the Skill Distribution available on
            Kryptohub.
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
          <h2 className=" xl:text-3xl text-xl lg:text-2xl text-primary font-[400] font-['Roboto, sans-serif'] ">
            Select Skill Distribution
          </h2>
          <div className="flex justify-center items-center w-full">
            <div className="py-5 md:max-w-[280px] md:max-h-[280px] w-[340px] h-[340px]">
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
                      className={
                        `rounded-full border w-[20px] h-[20px] ` +
                        `${skillColorBG[index % skillColorBG.length || 0]}`
                      }
                    ></div>

                    <div className="px-3">
                      <Typography className="text-indigo-800 border rounded-md border-[#cae0e7] px-3">
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
                      className="w-[65px] px-3 py-1 border-2 border-[#cae0e7]"
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

      {props.title === "Add" && (
        <div className="flex items-center justify-between md:min-h-[80px] my-5">
          <button
            onClick={() => {
              if (props.step === 1 && (skillDistribute.length > 0 || isValid)) {
                setOpenDialog(true);
              } else {
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

          <LoadingButton
            className={!loading ? "hidden" : "py-3 px-3 flex items center"}
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Save Changes
          </LoadingButton>

          <button
            type="button"
            onClick={handleSubmit(handleSaveCreateTeam)}
            className={
              +loading
                ? "hidden"
                : "py-3 text-white px-3 flex items center bg-[red]"
            }
            ref={buttonRef}
          >
            Save Changes
          </button>
        </div>
      )}

      {props.title === "Update" && (
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={handleSubmit(handleSaveCreateTeam)}
            className={"py-3 text-white px-3 flex items-center bg-[red]"}
            ref={buttonRef}
          >
            {loading ? (
              <LoadingButton
                className="capitalize px-2 rounded-none p-0 text-white flex items-center bg-[red]"
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Saving...
              </LoadingButton>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      )}
      <Dialog
        open={openDialog}
        setOpen={setOpenDialog}
        setStep={props.setStep}
        step={props.step}
      />
    </div>
  );
};
