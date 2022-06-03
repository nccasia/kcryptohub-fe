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
} from "@mui/material";
import { ISkills, ISkillDistribution } from "@/type/skill/skill.types";

const schema = yub.object().shape({
  teamName: yub
    .string()
    .required("Team Name is required")
    .trim("Team name is required")
    .max(30, "Max length is 30 characters!"),
  teamSize: yub
    .string()
    .required("Team Size is required")
    .max(10, "Invalid length!"),
  timeZone: yub.string().required("Time Zone is required"),
  location: yub.string().required("Location is required"),
  organization: yub
    .string()
    .required("Organization is required")
    .trim("Organization is required")
    .max(30, "Max length is 30 characters!"),
  founded: yub
    .string()
    .required("This information is required")
    .max(10, "Invalid length!"),
  workingTime: yub
    .string()
    .required("Working Time is required")
    .max(10, "Invalid length!"),
  linkWebsite: yub
    .string()
    .required("Link Website is required")
    .trim("Link Website is required")
    .matches(
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
      "Please enter a valid website format!"
    )
    .max(100, "Max length is 100 characters!"),
  projectSize: yub
    .string()
    .required("Project Size is required")
    .max(10, "Invalid length!"),
  slogan: yub.string().max(200, "Max length is 200 characters!"),
  hour: yub.string(),
  week: yub.string(),
  description: yub.string().max(200, "Max length is 200 characters!"),
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
  const skills = useAppSelector((state) => state.TeamReducer.skillInfo);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [message, setMessage] = useState("");
  const [messageDistribute, setMessageDistribute] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const skillDistribute: ISkillDistribution[] = [];
  const timezone = ["UTC+7", "UTC+8", "UTC+9"];

  const location = ["Việt Nam", " Dubai"];

  const [dataSkill, setData] = useState<ISkills[]>([]);
  const [dataSkillDistribute, setDataSkillDistribute] = useState<
    ISkillDistribution[]
  >([]);
  const [distributionValueForm, setDistributionValueForm] = useState({
    skillDistributionName: "",
    quantity: 0,
    field: "",
  });
  const { skillDistributionName, quantity, field } = distributionValueForm;
  const buttonRef = useRef(null);
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

  const onSubmit: SubmitHandler<any> = () => {
    handleSave();
  };

  const handleSave = () => {
    const formSave = {
      ...watch(),
      hour: "Hours",
      avatar: createObjectURL || data?.user?.image || "./user1.png",
      avatarUrl: "./user1.png",
      skills: dataSkill,
      skillDistribution: dataSkillDistribute,
    };

    if (dataSkill.length > 0 && dataSkillDistribute.length > 0) {
      dispatch(createTeam(formSave as unknown as ICreateTeam));
      reset();
      setCreateObjectURL("");
      setTimeout(() => {
        router.push("/manage-teams");
      }, 3000);
    } else if (dataSkill.length > 0 || dataSkillDistribute.length < 0) {
      setMessageDistribute("Skill distribute must have at least 1 field");
    } else if (dataSkill.length < 0 || dataSkillDistribute.length > 0) {
      setMessage("Skill must have at least 1 field");
    } else {
      setMessage("Skill must have at least 1 field");
      setMessageDistribute("Skill distribute must have at least 1 field");
    }
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

    if (dataSkill.length >= 0) {
      setMessage("");
    } else {
      setMessage("Skill must have at least 1 field");
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

    if (dataSkillDistribute.length >= 0) {
      setMessage("");
    } else {
      setMessage("Skill must have at least 1 field");
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
    setOpenDialog(false);
  };
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Box my={5}>
          <Container
            fixed
            maxWidth="md"
            className="border border-[#cae0e7] py-6 md:!px-24 md:py-12"
          >
            <form
              className="py-5 flex w-full"
              /*   onChange={() => {
                if (buttonRef.current) {
                  (buttonRef.current as unknown as HTMLButtonElement).disabled =
                    false;
                }
              }} */
            >
              <div className="">
                <div className="mb-20">
                  <h2 className="text-primary text-3xl">Basic Information</h2>
                  <div className="md:flex items-center mx-5 my-8">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Avatar:
                    </label>
                    <div className="flex md:max-w-[500px] w-full items-center gap-x-3">
                      <div className="w-16 h-16 flex-none rounded-full overflow-hidden border border-[#cae0e7]">
                        <Image
                          width="62"
                          height="62"
                          src={createObjectURL || "/user1.png"}
                          alt="avatar"
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("avatar")}
                        placeholder="Add your link avatar here"
                        className="w-full border-2 border-[#cae0e7] px-3 py-2 outline-none placeholder:text-[#cae0e7] focus:shadow-3xl focus:border-primary"
                        onChange={uploadToClient}
                      />
                    </div>
                  </div>
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Team Name:
                    </label>
                    <input
                      type="text"
                      {...register("teamName")}
                      autoComplete="off"
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      placeholder="Enter text here"
                    />
                  </div>
                  {errors?.teamName && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.teamName?.message}
                      </p>
                    </div>
                  )}

                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Team Size:
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Enter value here"
                      {...register("teamSize")}
                      autoComplete="off"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary hidden-arrow-input-number"
                    />
                  </div>
                  {errors?.teamSize && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[200px] block mt-[-10px] text-red-600"}>
                        {errors?.teamSize?.message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Time Zone:
                    </label>
                    <select
                      autoComplete="off"
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      {...register("timeZone")}
                    >
                      <option value="">Please select</option>
                      {timezone.map((resp) => {
                        return <option key={resp}>{resp}</option>;
                      })}
                    </select>
                  </div>
                  {errors?.timeZone && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.timeZone?.message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Location:
                    </label>
                    <select
                      autoComplete="off"
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      {...register("location")}
                    >
                      <option value="">Please select</option>
                      {location.map((resp) => {
                        return <option key={resp}>{resp}</option>;
                      })}
                    </select>
                  </div>
                  {errors?.location && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.location?.message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Organization:
                    </label>
                    <input
                      type="text"
                      {...register("organization")}
                      autoComplete="off"
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      placeholder="Enter text here"
                    />
                  </div>
                  {errors?.organization && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.organization?.message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Description:
                    </label>
                    <textarea
                      autoComplete="off"
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none placeholder:text-[#cae0e7] focus:shadow-3xl focus:border-primary"
                      {...register("description")}
                    />
                  </div>
                  {errors?.description && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.description?.message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Slogan:
                    </label>
                    <input
                      type="text"
                      {...register("slogan")}
                      autoComplete="off"
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      placeholder="Enter text here"
                    />
                  </div>
                  {errors?.slogan && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.slogan?.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-20">
                  <h2 className="text-primary text-3xl">Detail Information</h2>
                  <div className="md:flex items-center mx-5 mt-8 mb-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Link:
                    </label>
                    <input
                      type="text"
                      {...register("linkWebsite")}
                      autoComplete="off"
                      placeholder="https://company-name.com/"
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none placeholder:text-[#cae0e7] focus:shadow-3xl focus:border-primary"
                    />
                  </div>
                  {errors?.linkWebsite && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.linkWebsite?.message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Founded:
                    </label>
                    <input
                      type="number"
                      min={1900}
                      max={new Date().getFullYear()}
                      {...register("founded")}
                      autoComplete="off"
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary "
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      placeholder="1900"
                    />
                  </div>
                  {errors?.founded && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.founded?.message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Project Size:
                    </label>
                    <input
                      type="number"
                      {...register("projectSize")}
                      autoComplete="off"
                      min={0}
                      className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary "
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      placeholder="Enter value here"
                    />
                  </div>
                  {errors?.projectSize && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.projectSize?.message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-center mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Working Time:
                    </label>
                    <input
                      type="number"
                      min={0}
                      {...register("workingTime")}
                      autoComplete="off"
                      className="md:max-w-[200px] mr-2 w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary hidden-arrow-input-number"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      placeholder="Enter value here"
                    />

                    <input
                      className="md:min-w-[70px] w-[80px] mr-2 w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      placeholder="Hours"
                      disabled={true}
                      {...register("hour")}
                    />
                    <span className="text-xl mr-2">{"/"}</span>
                    <select
                      className="md:max-w-[100px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      {...register("week")}
                    >
                      <option value="Week">Week</option>
                      <option value="Days">Days</option>
                      <option value="Month">Month</option>
                      <option value="Year">Year</option>
                    </select>
                  </div>
                  {errors?.workingTime && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {errors?.workingTime?.message}
                      </p>
                    </div>
                  )}

                  <div className="md:flex items-start mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Skills:
                    </label>
                    <Autocomplete
                      multiple
                      options={handleAutocompleteOption()}
                      getOptionLabel={(option) => option.skillName}
                      value={dataSkill}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        setData(value);
                        if (dataSkill.length >= 0) {
                          setMessage("");
                        } else {
                          setMessage("Skill must have at least 1 field");
                        }
                      }}
                      className="md:max-w-[410px] w-full"
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
                  {message !== "" && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {message}
                      </p>
                    </div>
                  )}
                  <div className="md:flex items-start mx-5 my-5">
                    <label className="text-primary min-w-[130px] block py-2 md:py-0">
                      Skill Distribution:
                    </label>

                    <Autocomplete
                      multiple
                      options={handleAutocompleteDistribution()}
                      getOptionLabel={(option) => option.skillDistributionName}
                      value={dataSkillDistribute}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        setDataSkillDistribute(value);
                        if (dataSkillDistribute.length >= 0) {
                          setMessage("");
                        } else {
                          setMessage(
                            "Skill distribute must have at least 1 field"
                          );
                        }
                      }}
                      className="md:max-w-[410px] w-full"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onKeyUp={(event) =>
                            event.key === "Enter"
                              ? handleSearchSkillDistribution(event)
                              : null
                          }
                        />
                      )}
                    />
                  </div>
                  {messageDistribute !== "" && (
                    <div className="flex justify-left ml-40 text-sm ">
                      <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                        {messageDistribute}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-6 py-2 bg-transparent border mr-2 border-black text-black rounded"
                    onClick={() => router.push("/manage-teams")}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!isValid || !image}
                    className={`px-8 py-2 shadow text-white rounded ${
                      !isValid || !image
                        ? "bg-[gray] cursor-not-allowed"
                        : "bg-red-600"
                    }`}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </Container>
        </Box>
      </ThemeProvider>

      <ToastContainer autoClose={2000} position="bottom-right" />
      <Modal open={openDialog}>
        <div className="absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 outline-none shadow-2xl bg-white rounded-lg border border-gray-400">
          <h3 className="text-2xl font-bold px-5 py-4 border-b border-gray-400">
            New skill distribution
          </h3>
          <div className="md:flex items-center mx-5 my-5">
            <label className="text-primary min-w-[200px] block py-2 md:py-0">
              Skill distribution name:
            </label>
            <input
              type="text"
              maxLength={30}
              name="skillDistributionName"
              autoComplete="off"
              value={skillDistributionName}
              onChange={handleOnchange}
              className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
              placeholder="Enter text here"
            />
          </div>
          <div className="md:flex items-center mx-5 my-5">
            <label className="text-primary min-w-[200px] block py-2 md:py-0">
              Field:
            </label>
            <input
              type="text"
              maxLength={30}
              name="field"
              autoComplete="off"
              value={field}
              onChange={handleOnchange}
              className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
              placeholder="Enter text here"
            />
          </div>
          <div className="md:flex items-center mx-5 mt-5">
            <label className="text-primary min-w-[200px] block py-2 md:py-0">
              Quantity:
            </label>
            <input
              type="text"
              maxLength={30}
              autoComplete="off"
              name="quantity"
              value={quantity}
              onChange={handleOnchange}
              className="md:max-w-[500px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
              placeholder="Enter text here"
            />
          </div>
          <div className="px-5 py-4 flex justify-end">
            <button
              className="px-4 py-2 text-white mr-2 bg-blue-500 rounded-lg mt-10"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <div className="text-right">
              <button
                onClick={(e) => {
                  handleSearchSkillDistribution(e);
                }}
                className="px-4 py-2 text-white bg-red-500 rounded-lg mt-10"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default CreateNewTeam;
