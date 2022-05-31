import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/Home.module.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import * as yub from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import Image from "next/image";
import { Layout } from "@/src/layouts/layout";
import { Multiselect } from "multiselect-react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createTeam } from "@/redux/teamSlice";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { useAppDispatch } from "@/redux/hooks";

const schema = yub.object().shape({
  teamName: yub
    .string()
    .required("Team Name is required")
    .trim("Team name is required"),
  teamSize: yub.string().required("Team Size is required"),
  timeZone: yub.string().required("Time Zone is required"),
  organization: yub
    .string()
    .required("Organization is required")
    .trim("Organization is required"),
  workingTime: yub.string().required("Working time is required"),
  cost: yub.string().required("Project cost is required"),
  founded: yub.string().required("Founded is required"),
  linkWebsite: yub.string().required("Link website is required"),
  contact: yub.string(),
  hour: yub.string(),
  week: yub.string(),
  description: yub.string(),
});
const CreateNewTeam = () => {
  const { data } = useSession();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([]);
  const router = useRouter();
  const skills = [
    " Angular",
    " Javascript",
    " Game 3D",
    " Web Design",
    " Web Development",
    " Mobile Design",
    " UI/UX Design",
  ];
  const location = ["Việt Nam", "America", "China"];

  const [dataSkill, setData] = useState([]);
  const buttonRef = useRef(null);
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
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
      avatarUrl: createObjectURL || data?.user?.image || "./user1.png",
      skill: dataSkill,
    };
    console.log(formSave);
    dispatch(createTeam(formSave as unknown as ICreateTeam));
    reset();
    setTimeout(() => {
      router.push("/manage-teams");
    }, 3000);
  };

  const onSelect = (select: any) => {
    setData(select);
    setValue(select);
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });
  return (
    <Layout>
      <div>
        <h1 className="px-4 py-4 text-2xl font-bold">
          Profile {">"} My Teams {">"} Create new team
        </h1>
      </div>
      <div className="flex ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-5 flex w-full"
          onChange={() => {
            if (buttonRef.current) {
              (buttonRef.current as unknown as HTMLButtonElement).disabled =
                false;
            }
          }}
        >
          <div className="flex-[66%]">
            <div className="mb-20">
              <h1 className="px-10 mb-8 font-semibold text-2xl">
                Basic Information
              </h1>
              <div className="flex items-center mb-5">
                <label className="text-right mr-4 font-500 w-[150px]">
                  Team Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  className="appearance-none relative block w-9/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter text here"
                  {...register("teamName")}
                />
              </div>
              {errors?.teamName && (
                <div className="flex justify-left ml-44 mb-2 text-sm ">
                  <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                    {errors?.teamName?.message}
                  </p>
                </div>
              )}

              <div className="flex items-center mb-5">
                <label className="text-right mr-4 font-500 w-[150px]">
                  Team Size
                </label>
                <input
                  type="number"
                  min={0}
                  className="relative mr-3 block w-2/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm hidden-arrow-input-number"
                  {...register("teamSize")}
                  autoComplete="off"
                  placeholder="Enter value"
                ></input>
                <div className="relative w-2/12 flex items-center">
                  <input
                    type="number"
                    min={0}
                    className="block px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm hidden-arrow-input-number"
                    {...register("cost")}
                    autoComplete="off"
                    placeholder="Project cost"
                  ></input>

                  <span className="absolute right-5 z-[100] text-gray-600">
                    $
                  </span>
                </div>

                <input
                  type="text"
                  className="relative block w-2/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("founded")}
                  autoComplete="off"
                  placeholder="Founded"
                ></input>
              </div>
              {errors?.teamSize && (
                <div className="flex justify-left ml-44 mb-2 text-sm ">
                  <p className={"w-[200px] block mt-[-10px] text-red-600"}>
                    {errors?.teamSize?.message}
                  </p>
                </div>
              )}
              <div className="flex items-center mb-5">
                <label className="text-right mr-4 font-500 w-[150px]">
                  Location
                </label>
                <select
                  className="relative block w-9/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("timeZone")}
                >
                  <option value="">Please select</option>
                  {location.map((resp) => {
                    return <option key={resp}>{resp}</option>;
                  })}
                </select>
              </div>
              {errors?.timeZone && (
                <div className="flex justify-left ml-44 mb-2 text-sm ">
                  <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                    {errors?.timeZone?.message}
                  </p>
                </div>
              )}
              <div className="flex items-center mb-5">
                <label className="text-right mr-4 font-500 w-[150px]">
                  Organization
                </label>
                <input
                  type="text"
                  className="appearance-none relative block w-9/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter text here"
                  autoComplete="off"
                  {...register("organization")}
                />
              </div>
              {errors?.organization && (
                <div className="flex justify-left ml-44 mb-2 text-sm ">
                  <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                    {errors?.organization?.message}
                  </p>
                </div>
              )}
              <div className="flex items-center mb-5">
                <span className="text-right mr-4 font-500 w-[150px]">
                  Skills
                </span>
                <div className="relative block w-9/12 px py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                  <Multiselect
                    placeholder="Please select"
                    options={skills}
                    onSelect={onSelect}
                    showArrow={true}
                    isObject={false}
                  />
                </div>
              </div>
              {errors?.skill && (
                <div className="flex justify-left ml-44 mb-2 text-sm ">
                  <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                    {errors?.skill?.message}
                  </p>
                </div>
              )}
              <div className="flex items-center mb-5">
                <label className="text-right mr-4 font-500 w-[150px]">
                  Working Time
                </label>
                <input
                  type="number"
                  min={0}
                  className="appearance-none relative block w-5/12 px-3 py-2 border border-gray-700 border-solid mr-3 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter text here"
                  autoComplete="off"
                  {...register("workingTime")}
                />
                <input
                  className="appearance-none relative block min-w-[70px] w-1/12 px-3 py-2 border border-gray-700 border-solid mr-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Hours"
                  disabled={true}
                  {...register("hour")}
                />
                <span className="text-xl mr-2">{"/"}</span>
                <select
                  className="relative block min-w-[80px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("week")}
                >
                  <option value="Week">Week</option>
                  <option value="Days">Days</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
              </div>
              {errors?.workingTime && (
                <div className="flex justify-left ml-44 mb-2 text-sm ">
                  <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                    {errors?.workingTime?.message}
                  </p>
                </div>
              )}
              <div className="flex mb-5">
                <label className="text-right mr-4 font-500 w-[150px]">
                  Link Website
                </label>
                <input
                  className="appearance-none relative block w-9/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type="text"
                  {...register("linkWebsite")}
                  placeholder="Enter link here"
                  autoComplete="off"
                />
              </div>
              <div className="flex ">
                <label className="text-right mr-4 font-500 w-[150px]">
                  Description
                </label>
                <textarea
                  className="appearance-none relative block w-9/12 h-[80px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("description")}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="mb-20">
              <h1 className="px-10 mb-8 font-semibold text-2xl">Focus</h1>
            </div>

            <div className="mb-20">
              <h1 className="px-10 mb-8 font-semibold text-2xl">Portfolio</h1>
            </div>
          </div>

          <div className="flex-col flex w-[300px] justify-between">
            <input
              className="hidden"
              id="img"
              type="file"
              onChange={uploadToClient}
            />{" "}
            <label
              className="w-fit relative hover:cursor-pointer"
              htmlFor="img"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <a>
                <Image
                  className={` object-cover rounded ${
                    show ? "opacity-80" : "opacity-100"
                  } `}
                  alt="Avarta"
                  src={
                    createObjectURL ||
                    (data?.user?.image as string) ||
                    "/user1.png"
                  }
                  width={200}
                  height={210}
                ></Image>
                {show && (
                  <span className="absolute w-2/3 top-1/2 left-1/2 text-center translate-x-[-50%] translate-y-[-50%] text-gray-800 font-bold text-l">
                    Choose image
                  </span>
                )}
                <label
                  className="absolute bottom-2 right-0 text-white hover:cursor-pointer"
                  htmlFor="img"
                >
                  <AddPhotoAlternateIcon />
                </label>
              </a>
            </label>
            <div className="flex justify-end px-4 mr-20 mb-3">
              <button
                type="button"
                className="px-6 py-2 bg-transparent border mr-2 border-black text-black rounded"
                onClick={() => router.push("/manage-teams")}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={`px-8 py-2 shadow text-white rounded ${
                  !isValid ? "bg-[gray] cursor-not-allowed" : "bg-red-600"
                }`}
                ref={buttonRef}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer autoClose={2000} />
    </Layout>
  );
};

export default CreateNewTeam;
