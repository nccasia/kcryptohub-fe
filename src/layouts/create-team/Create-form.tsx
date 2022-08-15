import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { saveTeam, updateTeam } from "@/redux/teamSlice";
import { TimeZone } from "@/type/enum/TimeZone";
import { yupResolver } from "@hookform/resolvers/yup";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Autocomplete, TextField, Paper } from "@mui/material";
import router from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import * as yub from "yup";
import { Dialog } from "../Dialog";
import { UploadImage } from "./UploadImage";
import { teamApi } from "@/api/team-api";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import { setTeam } from "@/redux/dashboardSlice";
import { ICreateTeam, ITeam } from "@/type/team/team.type";
import { ISkill } from "@/type/skill/skill.types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SelectCustom from "@/src/layouts/team/SelectCustom";
import MonthPicker from "@mui/x-date-pickers/MonthPicker";

const schema = yub.object().shape({
  teamName: yub
    .string()
    .required("Team Name is required")
    .trim("Team name is required")
    .max(30, "Max length is 30 characters!"),
  teamSize: yub.string().required("Total Employees is required"),
  timeZone: yub.string().required("Timezone is required"),
  saleEmail: yub
    .string()
    .required("Sales Email is required")
    .trim("Sales Email is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    )
    .max(50, "Max length is 50 characters!"),
  founded: yub.string().required("Founding Year is required"),
  linkWebsite: yub
    .string()
    .required("Team Website is required")
    .trim("Team Website is required")
    .matches(
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
      "Please enter a valid website format!"
    )
    .max(200, "Max length is 200 characters!"),
  projectSize: yub
    .string()
    .required("Project Size is required")
    .max(10, "Invalid length!")
    .default("1-5"),
  slogan: yub
    .string()
    .required("Tagline is required")
    .trim("Tagline is required"),
  description: yub
    .string()
    .required("Description is required")
    .trim("Description is required"),
});

export interface IProps {
  nextStep: () => void;
  step: number;
  setStep: (step: number) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  defaultTeamInfo?: ITeam;
}
const selectRange = {
  totalEmployee: [
    "Freelance",
    "2 - 9",
    "10 - 49",
    "50 - 249",
    "250 - 499",
    "1,000 - 9,999",
    "10,000+",
  ],
  projectSize: ["1-5"],
};

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          "&::-webkit-scrollbar": {
            width: "2px !important",
          },
          "*::-webkit-scrollbar-track": {},
          "*::-webkit-scrollbar-thumb": {},
          "*::-webkit-scrollbar-thumb:hover": {},
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
        notchedOutline: {
          border: "none",
          ":hover": {
            borderColor: "transparent !important",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          // ...
        },
        listbox: {
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },

          "&::-webkit-scrollbar-track-piece:end": {
            backgroundColor: "transparent",
            marginBottom: "10px",
          },

          "&::-webkit-scrollbar-track-piece:start": {
            backgroundColor: " transparent",
            marginTop: "10px",
          },
        },
        option: {
          padding: "6px 14px",
          backgroundColor: "transparent",
          color: "#848ABD",
          display: "flex",
          borderRadius: "10px",

          "&:hover": {
            "& .Mui-Typography-root": { color: "white" },
          },

          "& .Mui-selected": {
            backgroundColor: "#606060",
            "& .Mui-Typography-root": { color: "white" },
          },

          "&.disabled": {
            opacity: 0.5,
            "& .Mui-Typography-root": {
              color: "#848ABD",
            },
          },
        },
      },
    },
  },
});

const CustomPaper = (props: any) => {
  return (
    <Paper
      className="custom-scrollbar-des"
      {...props}
      sx={{
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #ecedee",
      }}
    />
  );
};

export const CreateForm = (props: IProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });
  const dispatch = useAppDispatch();
  const team = useAppSelector((state) => state.TeamReducer.value);

  const [createObjectURL, setCreateObjectURL] = useState("");
  const [image, setImage] = useState(props.imageFile);
  const [dataSkill, setData] = useState<ISkill[]>([]);
  const skills = useAppSelector(getSkillsSelector);
  const timeZone = Object.values(TimeZone);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.defaultTeamInfo && props.defaultTeamInfo.id !== watch("id")) {
      reset({ ...props.defaultTeamInfo, skills: [] });
      setData(props.defaultTeamInfo.skills || []);
      if (props.defaultTeamInfo.imageUrl) {
        setCreateObjectURL(
          teamApi.getTeamImageUrl(props.defaultTeamInfo.imageUrl)
        );
      }
    }
  }, [props.defaultTeamInfo]);

  useEffect(() => {}, [team]);

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      if (Math.ceil(i.size / 1024) <= 15000 && i.type.includes("image")) {
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
        props.setImageFile(i);
      } else if (!i.type.includes("image")) {
        toast.error("File upload must have .jpg, .jpge, .png!");
        setImage(null);
      } else {
        toast.error("File upload is over 15MB!");
        setImage(null);
      }
    }
  };

  useEffect(() => {
    if (team.skills) {
      setData(team.skills);
    }
  }, [team.skills]);

  const handleAutocompleteOption = () => {
    const userSkillIdList = dataSkill.map((skill) => skill.id);
    const restArrSkill =
      skills && skills.filter((skill) => !userSkillIdList.includes(skill.id));
    return restArrSkill || [];
  };
  const handleSearchSkill = (e: SyntheticEvent) => {
    let isExists = false;
    if ((e.target as HTMLInputElement).value.trim() !== "") {
      skills.map((skill) => {
        if (skill.skillName === (e.target as HTMLInputElement).value) {
          isExists = true;
        }
      });
      if (!isExists) {
        const newArrSkill = [
          ...dataSkill,
          { id: null, skillName: (e.target as HTMLInputElement).value },
        ];

        setData(newArrSkill);
      }
      (e.target as HTMLInputElement).value = "";
    }
  };
  const [btnDisable, setBtnDisable] = useState(false);
  const handleSave = async () => {
    if (props.defaultTeamInfo) {
      const data = watch();
      setBtnDisable(true);
      await dispatch(
        updateTeam({
          ...data,
          id: props.defaultTeamInfo.id.toString(),
          imageUrl:
            createObjectURL.length > 0 ? props.defaultTeamInfo.imageUrl : null,
          skills: dataSkill,
        } as ICreateTeam)
      );
      if (image) {
        const res = await teamApi.postImage(image, props.defaultTeamInfo.id);
      }
      teamApi.getTeam(data.id).then((res) => {
        dispatch(setTeam(res.data));
      });
      const to = setTimeout(() => {
        setBtnDisable(false);
      }, 1000);
      return () => clearTimeout(to);
    } else {
      const formSave = {
        ...watch(),
        skills: dataSkill,
      } as unknown as ICreateTeam;

      dispatch(saveTeam(formSave));

      props.nextStep();
    }
  };

  const handleBack = () => {
    if (props.step === 0 && (isDirty || isValid)) {
      setOpen(true);
    } else {
      router.push("/manage-teams");
    }
  };

  const from = Array.from(Array(1950).keys());
  const to = Array.from(Array(new Date().getFullYear() + 1).keys());
  const founded = to.filter((i) => !from.includes(i));

  useEffect(() => {
    console.log(watch(), errors);
  }, [watch()]);
  return (
    <ThemeProvider theme={theme}>
      <div className="font-jost">
        {" "}
        <h2 className=" xl:text-3xl text-xl lg:text-2xl text-[#606060] font-[400] ">
          Enter Team Information
          <span className="md:hidden ml-1 text-gray-500">{`(${
            props.step + 1
          }/2)`}</span>
        </h2>
        <form>
          <div className="md:flex w-full ">
            <div className="md:flex-[50%] md:mr-5">
              <div className="">
                <div className="my-5">
                  <label className="text-[#606060] min-w-[130px] mb-2 block py-2 md:py-0">
                    Team Name
                  </label>

                  <input
                    {...register("teamName")}
                    autoComplete="off"
                    className="md:max-w-[500px] w-full border-2 border-[#ecedee] rounded-3xl  placeholder:text-[#606060] px-3 py-2 outline-none focus:shadow-xl focus:border-[#ecedee]"
                    placeholder="Team Name"
                    maxLength={30}
                    defaultValue={team.teamName || ""}
                  />
                  {errors?.teamName && (
                    <div className="flex justify-left mt-1 text-sm ">
                      <p className={"block text-red-500 font-medium"}>
                        {errors?.teamName?.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-5 mb-5">
                  <label className="text-[#606060] min-w-[130px] mb-2 block py-2 md:py-0">
                    Team Website
                  </label>
                  <div className="w-full flex flex-col justify-center relative">
                    <LanguageOutlinedIcon className="absolute left-2 text-[#848abd] text-[20px]" />
                    <input
                      {...register("linkWebsite")}
                      autoComplete="off"
                      maxLength={200}
                      placeholder="https://team-name.com/"
                      className="md:max-w-[500px] w-full border-2 border-[#ecedee] rounded-3xl pl-10 px-3 py-2 outline-none placeholder:text-[#606060] focus:shadow-xl focus:border-[#ecedee]"
                      defaultValue={team.linkWebsite || ""}
                    />
                  </div>

                  {errors?.linkWebsite && (
                    <div className="flex justify-left mt-1 text-sm ">
                      <p className={" block text-red-500 font-medium"}>
                        {errors?.linkWebsite?.message}
                      </p>
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <SelectCustom
                    label={"Time Zone"}
                    register={register("timeZone")}
                    valueList={timeZone}
                    placeholder=" Select a value "
                    errors={errors.timeZone}
                    setValue={setValue}
                    name={"timeZone"}
                    clearError={clearErrors}
                    defaultValue={team.timeZone || ""}
                  />
                </div>

                <div className="mt-5 mb-5">
                  <SelectCustom
                    label={"Total Employees"}
                    register={register("teamSize")}
                    valueList={selectRange.totalEmployee}
                    placeholder=" Select a value "
                    errors={errors.teamSize}
                    setValue={setValue}
                    name={"teamSize"}
                    clearError={clearErrors}
                    defaultValue={team.teamSize?.toString() || ""}
                  />
                </div>
                <div className="my-5">
                  <SelectCustom
                    label={"Founding year"}
                    register={register("founded")}
                    valueList={
                      founded.map((item) =>
                        item.toString()
                      ) as unknown as string[]
                    }
                    placeholder=" Select founding year "
                    errors={errors.founded}
                    setValue={setValue}
                    name={"founded"}
                    clearError={clearErrors}
                    defaultValue={team.founded || ""}
                  />
                </div>

                <div className="my-5">
                  <label className="text-[#606060] min-w-[130px] mb-2 block py-2 md:py-0">
                    Tagline
                  </label>
                  <div className="flex items-center relative md:max-w-[500px] w-full">
                    <input
                      {...register("slogan")}
                      autoComplete="off"
                      className="w-full border-2 border-[#ecedee]  bg-white rounded-3xl px-3 py-2 pr-16 outline-none placeholder:text-[#606060] focus:shadow-xl focus:border-[#ecedee]"
                      placeholder="Enter Tagline"
                      maxLength={200}
                      defaultValue={team.slogan || ""}
                    />
                    <div className=" absolute right-2 text-gray-400 text-sm font-normal">
                      {watch("slogan") ? watch("slogan").trim().length : 0}/
                      {200}
                    </div>
                  </div>

                  {errors?.slogan && (
                    <div className="flex justify-left mt-1 text-sm ">
                      <p className={" block  text-red-500 font-medium"}>
                        {errors?.slogan?.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="my-5">
                  <label className="text-[#606060] min-w-[130px] mb-2 block py-2 md:py-0">
                    Description
                  </label>
                  <textarea
                    autoComplete="off"
                    placeholder="Short description about your Team"
                    className="md:max-w-[500px] custom-scrollbar-des w-full border-2 border-[#ecedee] resize-none  rounded-3xl px-3 py-2 md:min-h-[100px] outline-none placeholder:text-[#606060] focus:shadow-xl focus:border-[#ecedee]"
                    maxLength={2000}
                    defaultValue={team.description || ""}
                    {...register("description")}
                  />
                  <div
                    className={
                      "flex md:max-w-[500px] " +
                      (errors?.description ? "justify-between" : "justify-end")
                    }
                  >
                    {errors?.description && (
                      <div className="flex justify-left text-sm ">
                        <p className={" block  text-red-500 font-medium"}>
                          {errors?.description?.message}
                        </p>
                      </div>
                    )}
                    <span className="text-sm text-gray-500">
                      {watch("description")?.length | 0}/2000
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex-[50%]  max-w-[1/2]">
              <UploadImage
                uploadToClient={uploadToClient}
                createObjectURL={createObjectURL}
                setImage={setImage}
                setCreateObjectURL={setCreateObjectURL}
                image={props.imageFile || image || undefined}
              />

              <div className="my-5">
                <label className="text-[#606060] min-w-[130px] mb-2 block py-2 md:py-0">
                  Sales Email
                </label>
                <div className="w-full flex flex-col justify-center relative">
                  <EmailOutlinedIcon className="absolute left-2 text-[#848abd] text-[20px] bottom-[11px]" />
                  <input
                    autoComplete="off"
                    {...register("saleEmail")}
                    className="md:max-w-[400px] w-full border-2 border-[#ecedee] rounded-3xl pl-10 px-3 py-2 outline-none focus:shadow-xl focus:border-[#ecedee]"
                    placeholder="email@email.com"
                    maxLength={50}
                    defaultValue={team.saleEmail || ""}
                  />
                </div>
                {errors?.saleEmail && (
                  <div className="flex justify-left mt-1 text-sm ">
                    <p className={" block  text-red-500 font-medium"}>
                      {errors?.saleEmail?.message}
                    </p>
                  </div>
                )}
              </div>

              <h2 className=" xl:text-3xl text-xl lg:text-2xl mt-5 text-[#606060] font-[400] font-['Roboto, sans-serif'] ">
                Project Information
              </h2>
              <div className="my-5 hidden">
                <label className="text-[#606060] min-w-[130px] mb-2 block py-2 md:py-0">
                  Minimum Project Size
                </label>
                <select
                  {...register("projectSize")}
                  className="md:max-w-[200px] w-full border-2 border-[#ecedee] rounded-3xl px-3 py-2 focus:shadow-3xl focus:border-primary outline-none"
                  defaultValue={team.projectSize || "1-5"}
                >
                  <option value="">- Select a value -</option>
                  {selectRange.projectSize.map((cur, index) => (
                    <option key={index} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
                {errors?.projectSize && (
                  <div className="flex justify-left mt-1 text-sm ">
                    <p className={"block  text-red-500 font-medium"}>
                      {errors?.projectSize?.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="my-5">
                <label className="text-[#606060] md:max-w-[400px] flex justify-between items-center min-w-[130px] block py-2 md:py-0">
                  <span>Skills</span>
                  <span className="text-gray-400 text-sm">Optional</span>
                </label>
                <Autocomplete
                  multiple
                  options={handleAutocompleteOption()}
                  getOptionLabel={(option) => option.skillName}
                  PaperComponent={CustomPaper}
                  value={dataSkill}
                  filterSelectedOptions
                  onChange={(e, value) => {
                    setData(value);
                  }}
                  className="md:max-w-[400px] w-full bg-white mt-1 border-2 border-[#ecedee] focus:border-[#ecedee] rounded-3xl text-[#606060] Mui-focused-custom"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register("skills")}
                      onKeyUp={(event) =>
                        event.key === "Enter" ? handleSearchSkill(event) : null
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <hr className="w-full h-[1px] border border-[#ecedee]"></hr>
          <div className="flex items-center justify-between md:min-h-[80px] my-5">
            {props.defaultTeamInfo ? (
              <div className=""></div>
            ) : (
              <button
                type="button"
                className="text-[#606060] flex items center"
                onClick={handleBack}
              >
                <a className="flex items-end">
                  <span className="text-[#848abd] font-medium">
                    <ChevronLeftIcon />
                  </span>
                  Back
                </a>
              </button>
            )}
            <button
              type="button"
              onClick={handleSubmit(handleSave)}
              className={
                "py-3 md:text-md text-lg text-white px-3 flex items center bg-[#848abd] rounded-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)] disabled:opacity-80 "
              }
              disabled={btnDisable}
            >
              {props.defaultTeamInfo ? (
                <>
                  {btnDisable ? (
                    <LoadingButton
                      className="md:text-md text-lg text-white flex items center border-0 opacity-80 p-0 px-2"
                      loading
                      loadingPosition="start"
                      startIcon={<Save />}
                      variant="outlined"
                    >
                      Saving...
                    </LoadingButton>
                  ) : (
                    "Save changes"
                  )}
                </>
              ) : (
                <div className="inline-flex">
                  <span>Add Skill Distribution</span>
                  <span className=" font-medium">
                    <ChevronRightIcon className="mb-[1px]" />
                  </span>
                </div>
              )}
            </button>
          </div>
        </form>
        <Dialog
          open={open}
          setOpen={setOpen}
          step={props.step}
          setStep={props.setStep}
        />
      </div>
    </ThemeProvider>
  );
};
