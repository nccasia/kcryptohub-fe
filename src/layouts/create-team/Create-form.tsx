import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { createTeam, updateTeam } from "@/redux/teamSlice";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { TimeZone } from "@/type/enum/TimeZone";
import { Skill } from "@/type/Skill";
import { yupResolver } from "@hookform/resolvers/yup";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Autocomplete, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yub from "yup";

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
    .max(70, "Max length is 70 characters!"),
  founded: yub.string().required("Founding Year is required"),
  workingTime: yub
    .string()
    .required("Working Time is required")
    .max(10, "Invalid length!"),
  linkWebsite: yub
    .string()
    .required("Team Website is required")
    .trim("Team Website is required")
    .matches(
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
      "Please enter a valid website format!"
    )
    .max(70, "Max length is 70 characters!"),
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
    };
    dispatch(createTeam(formSave as unknown as ICreateTeam));

    props.nextStep();

    console.log(formSave);
  };

  const handleUpdate = () => {
    const formUpdate = {
      id: team.id,
      ...watch(),
      skills: dataSkill,
    };

    dispatch(updateTeam(formUpdate as unknown as ICreateTeam));
    props.nextStep();
  };

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
                  <option value="Freelancer">Freelancer</option>
                  <option value="2 - 9">2 - 9</option>
                  <option value="10 - 49">10 - 49</option>
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
                  <option value="2022">2022</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
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
            <div className="my-5">
              <label className="text-primary flex block mb-2 py-2 md:py-0">
                Team Logo
              </label>
              <div className="flex items-center justify-between">
                <div className="flex-[50%]">
                  <input
                    id="image"
                    type="file"
                    autoComplete="off"
                    hidden={true}
                    accept="image/*"
                    className="md:max-w-[290px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary "
                    onChange={uploadToClient}
                  />
                  <div className="min-h-[202px] max-w-[267px] w-full h-[202px] mr-3 relative border border-[#cae0e7] border-dashed border-2">
                    {createObjectURL ? (
                      <>
                        <Image
                          src={createObjectURL}
                          width={267}
                          height={202}
                          alt=""
                          draggable={true}
                        />
                      </>
                    ) : (
                      <div>
                        <div className="md:text-xs lg:text-base  absolute top-0 left-0 w-full h-1/2 flex items-center justify-center">
                          Upload Image
                        </div>
                        <p className="md:text-xs lg:text-base w-full h-[50px] absolute top-1/2 left-0 text-center">
                          Drag and drop an image
                        </p>
                        <p className=" md:text-xs lg:text-base w-full h-[50px] absolute top-3/4 left-0 text-center">
                          or{" "}
                          <label
                            htmlFor="image"
                            className=" md:text-xs lg:text-base text-cyan-800 cursor-pointer"
                          >
                            browse for an image
                            <span className="text-red-500">
                              <AddPhotoAlternateIcon />
                            </span>
                          </label>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-gray-500 px-3 py-3 text-sm flex-[50%]">
                  Your Team Logo must be one of the following image formats:
                  <ul className="px-14">
                    <li className="list-disc">
                      <a>.JPG</a>
                    </li>
                    <li className="list-disc">
                      <a>.JPEG</a>
                    </li>
                    <li className="list-disc">
                      <a>.SVG</a>
                    </li>
                    <li className="list-disc">
                      <a>.PNG </a>
                    </li>
                    <li className="list-disc">
                      <a>.WEBP</a>
                    </li>
                  </ul>
                  Maximum file size for image: 15MB
                </div>
              </div>
            </div>
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
                <option value="$1,000+">$1,000+</option>
                <option value="$5,000+">$5,000+</option>
                <option value="$10,000+">$10,000+</option>
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
              <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                Average Hourly Rate
              </label>
              <div className="flex items-center">
                <select
                  {...register("workingTime")}
                  className="md:max-w-[200px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary "
                  defaultValue={team.workingTime || ""}
                >
                  <option value="">- Select a value -</option>
                  <option value="<25$">{"<"} 25$</option>
                  <option value="$25 - $49">$25 - $49</option>
                  <option value="$50 - $99">$50 - $99</option>
                </select>

                <span className="px-3 text-[10px] tracking-widest whitespace-nowrap">
                  PER HOUR
                </span>
              </div>

              {errors?.workingTime && (
                <div className="flex justify-left mt-1 text-sm ">
                  <p className={"block  text-red-500 font-medium"}>
                    {errors?.workingTime?.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="w-full h-[1px] border border-[#cae0e7]"></hr>
        <div className="flex items-center justify-between md:min-h-[80px] my-5">
          <Link href="/manage-teams">
            <a className="text-cyan-700 flex items center">
              <span className="text-red-600 font-medium">
                <ChevronLeftIcon />
              </span>
              Back
            </a>
          </Link>
          {team.id ? (
            <button
              type="button"
              onClick={handleSubmit(handleUpdate)}
              className={"py-3 text-white px-3 flex items center bg-[red]"}
            >
              Add Services line
              <span className=" font-medium">
                <ChevronRightIcon />
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(handleSave)}
              className={"py-3 text-white px-3 flex items center bg-[red]"}
            >
              Add Services line
              <span className=" font-medium">
                <ChevronRightIcon />
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
