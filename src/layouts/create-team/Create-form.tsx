import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { saveTeam } from "@/redux/teamSlice";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { TimeZone } from "@/type/enum/TimeZone";
import { Skill } from "@/type/Skill";
import { yupResolver } from "@hookform/resolvers/yup";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Autocomplete, TextField } from "@mui/material";
import router from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import * as yub from "yup";
import { Dialog } from "../Dialog";
import { UploadImage } from "./UploadImage";

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
    .max(50, "Max length is 50 characters!"),
  projectSize: yub
    .string()
    .required("Project Size is required")
    .max(10, "Invalid length!"),
  slogan: yub
    .string()
    .required("Tagline is required")
    .trim("Tagline is required")
    .max(200, "Max length is 200 characters!"),
  description: yub
    .string()
    .required("Description is required")
    .trim("Description is required"),
});

export interface IProps {
  nextStep: () => void;
  step: number;
  setStep: (step: number) => void;
}

export const CreateForm = (props: IProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });
  const dispatch = useAppDispatch();
  const team = useAppSelector((state) => state.TeamReducer.value);
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [image, setImage] = useState(null);
  const [count, setCount] = useState(0);
  const [dataSkill, setData] = useState<Skill[]>([]);
  const skills = useAppSelector(getSkillsSelector);
  const timeZone = Object.values(TimeZone);
  const [open, setOpen] = useState(false);
  const selectRange = {
    totalEmployee: [
      "Freelance",
      "2-9",
      "10-49",
      "50-249",
      "250-499",
      "1,000-9,999",
      "10,000+",
    ],
    projectSize: [
      "N/A",
      "$1,000+",
      "$5,000+",
      "$10,000+",
      "$25,000+",
      "$50,000+",
      "$75,000+",
      "$100,000+",
      "$250,000+",
    ],
  };

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      if (Math.ceil(i.size / 1024) <= 15000 && i.type.includes("image")) {
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
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

  const handleSave = () => {
    const formSave = {
      ...watch(),
      skills: dataSkill,
      imageUrl: image || "/user1.png",
    } as unknown as ICreateTeam;

    dispatch(saveTeam(formSave));
    props.nextStep();
  };

  const handleBack = () => {
    if (props.step === 0 && isDirty) {
      setOpen(true);
    } else {
      router.push("/manage-teams");
    }
  };

  const from = Array.from(Array(1950).keys());
  const to = Array.from(Array(new Date().getFullYear() + 1).keys());
  const founded = to.filter((i) => !from.includes(i));

  useEffect(() => {
    setCount(watch("description").length);
  }, [watch("description")]);
  return (
    <div>
      {" "}
      <form>
        <div className="md:flex w-full">
          <div className="md:flex-[50%] md:mr-5">
            <div className="">
              <div className="my-5">
                <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                  Team Name
                </label>

                <input
                  {...register("teamName")}
                  autoComplete="off"
                  className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                  placeholder="Team Name"
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
                <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                  Team Website
                </label>
                <input
                  {...register("linkWebsite")}
                  autoComplete="off"
                  placeholder="https://Team-name.com/"
                  className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none placeholder:text-[#cae0e7] focus:shadow-3xl focus:border-primary"
                  defaultValue={team.linkWebsite || ""}
                />
                {errors?.linkWebsite && (
                  <div className="flex justify-left mt-1 text-sm ">
                    <p className={" block text-red-500 font-medium"}>
                      {errors?.linkWebsite?.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="my-5">
                <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                  Time Zone
                </label>
                <select
                  {...register("timeZone")}
                  className="md:max-w-[200px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary "
                  defaultValue={team.timeZone || ""}
                >
                  <option value="">- Select a value -</option>
                  {timeZone &&
                    timeZone.map((cur, index) => (
                      <option key={index} value={cur}>
                        {cur}
                      </option>
                    ))}
                </select>
                {errors?.timeZone && (
                  <div className="flex justify-left mt-1 text-sm ">
                    <p className={"block  text-red-500 font-medium"}>
                      {errors?.timeZone?.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 mb-5">
                <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                  Total Employees
                </label>
                <select
                  {...register("teamSize")}
                  className="md:max-w-[200px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary hidden-arrow-input-number"
                  defaultValue={team.teamSize || ""}
                >
                  <option value="">- Select a value -</option>
                  {selectRange.totalEmployee.map((cur, index) => (
                    <option key={index} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
                {errors?.teamSize && (
                  <div className="flex justify-left mt-1  text-sm ">
                    <p className={" block text-red-500 font-medium"}>
                      {errors?.teamSize?.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="my-5">
                <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                  Founding Year
                </label>
                <select
                  {...register("founded")}
                  className="md:max-w-[200px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary "
                  defaultValue={team.founded || ""}
                >
                  <option value="">- Select a value -</option>
                  {founded &&
                    founded.map((cur, index) => (
                      <option key={index} value={cur}>
                        {cur}
                      </option>
                    ))}
                </select>
                {errors?.founded && (
                  <div className="flex justify-left mt-1 text-sm ">
                    <p className={"block  text-red-500 font-medium"}>
                      {errors?.founded?.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="my-5">
                <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                  Tagline
                </label>
                <input
                  {...register("slogan")}
                  autoComplete="off"
                  className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                  placeholder="Enter Tagline"
                  defaultValue={team.slogan || ""}
                />
                {errors?.slogan && (
                  <div className="flex justify-left mt-1 text-sm ">
                    <p className={" block  text-red-500 font-medium"}>
                      {errors?.slogan?.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="my-5">
                <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                  Description
                </label>
                <textarea
                  autoComplete="off"
                  placeholder="Short description about your Team"
                  className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 md:min-h-[100px] outline-none placeholder:text-[#cae0e7] focus:shadow-3xl focus:border-primary"
                  maxLength={200}
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
                  <span className="text-sm text-gray-500">{count}/200</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex-[50%] max-w-[1/2]">
            <UploadImage
              uploadToClient={uploadToClient}
              createObjectURL={createObjectURL}
              setImage={setImage}
              setCreateObjectURL={setCreateObjectURL}
            />
            <div className="my-5">
              <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                Sales Email
              </label>
              <input
                autoComplete="off"
                {...register("saleEmail")}
                className="md:max-w-[400px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                placeholder="email@email.com"
                defaultValue={team.saleEmail || ""}
              />
              {errors?.saleEmail && (
                <div className="flex justify-left mt-1 text-sm ">
                  <p className={" block  text-red-500 font-medium"}>
                    {errors?.saleEmail?.message}
                  </p>
                </div>
              )}
            </div>

            <h2 className=" xl:text-3xl text-xl lg:text-2xl mt-5 text-primary font-[400] font-['Roboto, sans-serif'] ">
              Project Information
            </h2>
            <div className="my-5">
              <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                Minimum Project Size
              </label>
              <select
                {...register("projectSize")}
                className="md:max-w-[200px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary "
                defaultValue={team.projectSize || ""}
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
              <label className="text-primary md:max-w-[400px] flex justify-between items-center min-w-[130px] block py-2 md:py-0">
                <span>Skills</span>
                <span className="text-gray-400 text-sm">Optional</span>
              </label>
              <Autocomplete
                multiple
                options={handleAutocompleteOption()}
                getOptionLabel={(option) => option.skillName}
                value={dataSkill}
                filterSelectedOptions
                onChange={(e, value) => {
                  setData(value);
                }}
                className="md:max-w-[400px] w-full"
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

        <hr className="w-full h-[1px] border border-[#cae0e7]"></hr>
        <div className="flex items-center justify-between md:min-h-[80px] my-5">
          <button
            type="button"
            className="text-cyan-700 flex items center"
            onClick={handleBack}
          >
            <a>
              <span className="text-red-600 font-medium">
                <ChevronLeftIcon />
              </span>
              Back
            </a>
          </button>

          <button
            type="button"
            onClick={handleSubmit(handleSave)}
            className={"py-3 text-white px-3 flex items center bg-[red]"}
          >
            Add Skill Distribution
            <span className=" font-medium">
              <ChevronRightIcon />
            </span>
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
  );
};
