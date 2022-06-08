import { useSession } from "next-auth/react";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import * as yub from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createTeam, getAllSkill } from "@/redux/teamSlice";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Layout } from "@/src/layouts/layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Modal,
  LinearProgress,
  Slider,
  Typography,
  Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchIcon from "@mui/icons-material/Search";
import {
  ISkills,
  ISkillDistribution,
  ISkillDistributionValue,
} from "@/type/skill/skill.types";
import { getSkillsSelector } from "@/redux/selector";
import { Skill } from "@/type/Skill";
import Link from "next/link";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const schema = yub.object().shape({
  teamName: yub
    .string()
    .required("Company Name is required")
    .trim("Company name is required")
    .max(30, "Max length is 30 characters!"),
  teamSize: yub.string().required("Total Employees is required"),
  salesEmail: yub
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
    .required("Company Website is required")
    .trim("Company Website is required")
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
  const { data } = useSession();
  const dispatch = useAppDispatch();

  const skills = useAppSelector(getSkillsSelector);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState("");

  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [listSkill, setListSkill] = useState<Skill[]>([]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const skillDistribute: ISkillDistribution[] = [];

  const [dataSkill, setData] = useState<Skill[]>([]);
  const [dataSkillDistribute, setDataSkillDistribute] = useState<
    ISkillDistribution[]
  >([]);
  const [distributionValue, setDistributionValue] = useState<
    ISkillDistributionValue[]
  >([{ field: "", quantity: 0 } as ISkillDistributionValue]);
  const [distributionValueForm, setDistributionValueForm] = useState(
    {} as ISkillDistribution
  );

  const buttonRef = useRef(null);

  const dataChart = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [value, 20, 100 - 20 - value],
        backgroundColor: [
          "rgb(27, 133, 206)",
          "rgb(8, 83, 126)",
          "rgb(38, 124, 135)",
        ],
        hoverBackgroundColor: [
          "rgb(27, 133, 206)",
          "rgb(8, 83, 126)",
          "rgb(38, 124, 135)",
          "rgb(98, 186, 86)",
          "rgb(93, 153, 126)",
          "rgb(75, 169, 139)",
          "rgb(58, 204, 96)",
          "rgb(106, 149, 125)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const skillData = [
    { id: 1, skillName: "Devops" },
    { id: 2, skillName: "Sir" },
    { id: 3, skillName: "Design UI" },
    { id: 4, skillName: "Blockchain" },
    { id: 5, skillName: "BA" },
    { id: 6, skillName: "HR Services" },
    { id: 5, skillName: "BA" },
    { id: 6, skillName: "HR Services" },
  ];
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

  const handleSave = () => {
    const formSave = {
      ...watch(),
      skills: dataSkill,
    };
    /* dispatch(createTeam(formSave as unknown as ICreateTeam)); */

    nextStep();

    console.log(formSave);
  };

  const handleAutocompleteOption = () => {
    const userSkillIdList = dataSkill.map((skill) => skill.id);
    const restArrSkill = skills.filter(
      (skill) => !userSkillIdList.includes(skill.id)
    );
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
  const handleAutocompleteDistribution = () => {
    const userSkillIdList = dataSkillDistribute.map((skill) => skill.id);
    const restArrSkill = skillDistribute.filter(
      (skill) => !userSkillIdList.includes(skill.id)
    );
    return restArrSkill || [];
  };
  const handleSearchSkillDistribution = (e: SyntheticEvent) => {
    let isExists = false;
    if ((e.target as HTMLInputElement).value.trim() !== "") {
      skillDistribute.map((skill) => {
        if (
          skill.skillDistributionName === (e.target as HTMLInputElement).value
        ) {
          isExists = true;
        }
      });
      if (!isExists) {
        const newArrSkill = [
          ...dataSkillDistribute,
          {
            id: null,
            skillDistributionName: (e.target as HTMLInputElement).value,
            skillDistributionValue: [
              {
                quantity: 1,
                field: "Name",
              },
            ],
          },
        ];
        setDataSkillDistribute(newArrSkill);
      }
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleOnchange = (e: any) => {
    const formData = e.target as HTMLFormElement;
    setDistributionValueForm({
      ...distributionValueForm,
      [formData.name]: formData.value,
    });
  };

  const handleCloseModal = () => {
    setDistributionValue([
      {
        quantity: 0,
        field: "",
      },
    ] as ISkillDistributionValue[]);
  };

  const handleAddField = () => {
    setDistributionValue([...distributionValue, { quantity: 0, field: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const list = [...distributionValue];
    list.splice(index, 1);
    setDistributionValue(list);
  };

  const handleChangeField = (e: any, index: number) => {
    const list = [...distributionValue];
    list[index] = {
      ...list[index],
      [e.target.name]: e.target.value,
    };
    setDistributionValue(list);
    setDistributionValueForm({
      ...distributionValueForm,
      skillDistributionValue: list,
    });
  };

  const handleSaveField = () => {
    setDataSkillDistribute([...dataSkillDistribute, distributionValueForm]);
    setDistributionValueForm({
      skillDistributionName: "",
      skillDistributionValue: [],
    } as unknown as ISkillDistribution);
    setDistributionValue([
      {
        quantity: 0,
        field: "",
      },
    ] as ISkillDistributionValue[]);
  };

  const nextStep = () => {
    if (step === 0) {
      setStep((cur) => cur + 1);
    }
  };

  const countOnChange = (e: any) => {
    setCount(e.target.value.trim().length || 0);
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
              Create Your Company Profile
            </h1>
            <div className="md:block hidden">
              <div className="flex pt-10 pb-5">
                <div className="flex-[50%] relative px-2 xl:text-xl text-sm lg:text-lg text-white bg-[#08537e] mr-1">
                  {step === 0 && (
                    <div className="absolute bottom-[40px] text-black right-0 flex justify-end items-center">
                      <div className="mr-2 xl:text-lg relative text-xs lg:text-base">
                        Create Company Profile
                      </div>
                      <div className="bg-[#ff3d2e] px-2 py-1 flex justify-center items-center text-white after:content-['']  after:border-[#c3281d] after:border-solid after:rotate-45 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-5px] after:bottom-[-6px]">
                        50%
                      </div>
                    </div>
                  )}
                  Enter Company Information
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
                        Add Services Line
                      </div>
                      <div className="bg-[#ff3d2e] px-2 py-1 flex justify-center items-center text-white after:content-['']  after:border-[#c3281d] after:border-solid after:rotate-45 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-5px] after:bottom-[-6px]">
                        100%
                      </div>
                    </div>
                  )}
                  Add Service Lines
                </div>
              </div>
            </div>
            <h2 className=" xl:text-3xl text-xl lg:text-2xl text-primary font-[400] font-['Roboto, sans-serif'] ">
              {step === 0 ? "Enter Company Information" : "Add Services Line"}
            </h2>
          </div>
          {step === 0 && (
            <form>
              <div className="md:flex w-full">
                <div className="md:flex-[50%] md:mr-5">
                  <div className="">
                    <div className="my-5">
                      <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                        Company Name
                      </label>
                      <input
                        {...register("teamName")}
                        autoComplete="off"
                        className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                        placeholder="Company Name"
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
                        Company Website
                      </label>
                      <input
                        {...register("linkWebsite")}
                        autoComplete="off"
                        placeholder="https://company-name.com/"
                        className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none placeholder:text-[#cae0e7] focus:shadow-3xl focus:border-primary"
                      />
                      {errors?.linkWebsite && (
                        <div className="flex justify-left mt-1 text-sm ">
                          <p className={" block text-red-500 font-medium"}>
                            {errors?.linkWebsite?.message}
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
                    <div className="mb-5 mt-5">
                      <label className="text-primary min-w-[130px] mb-2 block py-2 md:py-0">
                        Founding Year
                      </label>
                      <select
                        {...register("founded")}
                        className="md:max-w-[200px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary "
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
                        placeholder="Short description about your company"
                        className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 md:min-h-[100px] outline-none placeholder:text-[#cae0e7] focus:shadow-3xl focus:border-primary"
                        maxLength={200}
                        {...register("description")}
                        onChange={(e) => {
                          countOnChange(e);
                        }}
                      />
                      <div
                        className={
                          "flex md:max-w-[500px] " +
                          (errors?.description
                            ? "justify-between"
                            : "justify-end")
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
                          {count}/200
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:flex-[50%] max-w-[1/2]">
                  <div className="my-5">
                    <label className="text-primary flex block mb-2 py-2 md:py-0">
                      Company Logo
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
                            <>
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
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-gray-500 px-3 py-3 text-sm flex-[50%]">
                        Your Company Logo must be one of the following image
                        formats:
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
                      {...register("salesEmail")}
                      className="md:max-w-[400px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      placeholder="email@email.com"
                    />
                    {errors?.salesEmail && (
                      <div className="flex justify-left mt-1 text-sm ">
                        <p className={" block  text-red-500 font-medium"}>
                          {errors?.salesEmail?.message}
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
                            event.key === "Enter"
                              ? handleSearchSkill(event)
                              : null
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
              </div>
            </form>
          )}
          {step === 1 && (
            <div>
              <div className="md:flex w-full">
                <div className="md:flex-[50%] md:mr-5">
                  <p className="text-sm text-gray-600 py-5">
                    Give buyers a sense of how you spend your time. You must add
                    at least one (1) Service Line to your Company Profile.
                  </p>
                  <div className="py-2">
                    <span className="text-cyan-800">
                      <SearchIcon />
                    </span>

                    <input
                      placeholder="Search for Services Line"
                      className="md:max-w-[500px] w-full py-2 outline-none"
                    />

                    {listSkill &&
                      listSkill.map((cur, index) => (
                        <div
                          className="inline-block border-2 mb-3 px-3 mr-2 text-indigo-800 border rounded-md border-cyan-600"
                          key={index}
                        >
                          <div className="flex justify-between items-center">
                            {cur.skillName}
                            <button
                              onClick={() => {
                                setListSkill(
                                  listSkill.filter((item) => {
                                    return cur.id !== item.id;
                                  })
                                );
                              }}
                              className="text-xs text-cyan-600"
                            >
                              <CloseIcon />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  <h2 className="text-xl py-2">All Available ServiceLines</h2>
                  <h2 className="text-base py-2 text-gray-600">
                    Below is a full list of all the Service Lines available on
                    Clutch.
                  </h2>

                  <div className="border relative w-full border-2 border-[#cae0e7] text-indigo-800 px-3 py-2 cursor-pointer">
                    <div className="w-full" onClick={handleChange}>
                      Skill Distribution
                    </div>
                    <Collapse in={open}>
                      <div className="pt-3">
                        {skills &&
                          skills.map((data, index) => (
                            <div key={index} className="inline-block ">
                              {listSkill.find((cur) => {
                                return cur.id === data.id;
                              }) ? (
                                <div className="mb-3 px-3 mr-2 text-indigo-800 border border-2 rounded-md border-cyan-600">
                                  <span
                                    className="flex justify-between items-center"
                                    onClick={() => {
                                      if (
                                        listSkill.find((cur) => {
                                          return cur.id === data.id;
                                        })
                                      ) {
                                        setListSkill(
                                          listSkill.filter((cur) => {
                                            return cur.id !== data.id;
                                          })
                                        );
                                      } else {
                                        setListSkill([
                                          ...listSkill,
                                          data as Skill,
                                        ]);
                                      }
                                    }}
                                  >
                                    {data.skillName}
                                    <button
                                      onClick={() => {
                                        setListSkill(
                                          listSkill.filter((item) => {
                                            return data.id !== item.id;
                                          })
                                        );
                                      }}
                                      className="text-xs text-cyan-600"
                                    >
                                      <CloseIcon />
                                    </button>
                                  </span>
                                </div>
                              ) : (
                                <div className="mb-3 px-3 mr-2 text-indigo-800 border rounded-md border-cyan-600">
                                  <span
                                    onClick={() => {
                                      if (
                                        listSkill.find((cur) => {
                                          return cur.id === data.id;
                                        })
                                      ) {
                                        setListSkill(
                                          listSkill.filter((cur) => {
                                            return cur.id !== data.id;
                                          })
                                        );
                                      } else {
                                        setListSkill([
                                          ...listSkill,
                                          data as Skill,
                                        ]);
                                      }
                                    }}
                                  >
                                    {data.skillName}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </Collapse>
                  </div>
                </div>
                <div className="md:flex-[50%] md:mr-5">
                  <p className="xl:text-3xl text-xl lg:text-2xl">
                    Selected Service Lines
                  </p>
                  <div className="flex justify-center items-center w-full">
                    <div className="py-5 w-[310px] h-[310px]">
                      <Pie
                        data={dataChart}
                        options={options}
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className="w-full py-16 px-3">
                    <div className="flex items-center py-3">
                      <div className="bg-[#1B85CE] rounded-full border w-[20px] h-[20px]"></div>

                      <div className="px-3">
                        <Typography className="text-indigo-700 border rounded-md border-indigo-600 px-3">
                          Skill Distribution
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {distributionValue && distributionValue.length > 0 && (
                        <div className="px-3 w-full">
                          <Slider
                            aria-label="Temperature"
                            value={value}
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={0}
                            max={100}
                            onChange={(e, number) => {
                              setValue(number as number);
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
                      )}

                      <input
                        maxLength={3}
                        className="w-[65px] px-3 py-1 border"
                        onChange={(e) => {
                          if (parseInt(e.target.value) > 100) return;
                          setValue(parseInt(e.target.value) || 0);
                        }}
                        value={value}
                      />
                      <span className="px-3">%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between md:min-h-[80px] my-5">
                <button
                  onClick={() => {
                    if (step === 1) {
                      setStep((cur) => cur - 1);
                    }
                  }}
                  className="text-cyan-700 flex items center"
                >
                  <span className="text-red-600 font-medium">
                    <ChevronLeftIcon />
                  </span>
                  Back
                </button>

                <button
                  className={"py-3 text-white px-3 flex items center bg-[red]"}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </Container>
      </ThemeProvider>

      <ToastContainer autoClose={2000} position="bottom-right" />
    </Layout>
  );
};

export default CreateNewTeam;
