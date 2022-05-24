import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import * as yub from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import Image from "next/image";
import { Layout } from "@/src/layouts/layout";
import { Multiselect } from "multiselect-react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { postValue } from "../../../../redux/createTeam";
import { CreateTeam } from "redux/teamSlice";
import { ToastContainer } from "react-toastify";

const schema = yub.object().shape({
  teamName: yub.string().required("Team Name is required"),
  teamSize: yub
    .string()
    .required("Team Size is required")
    .matches(/[1-9]/, "Team size require value"),
  timeZone: yub
    .string()
    .required("Time Zone is required")
    .matches(/[1-9]/, "Time Zone require value"),
  organization: yub.string().required("Organization is required"),
  workingTime: yub.string(),
  hour: yub.string(),
  week: yub.string(),
  description: yub.string(),
});
const CreateNewTeam = () => {
  const { data } = useSession();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const skills = ["IT", " BA", " IT mobile dev", " IT web dev"];
  const timeZone = [
    "UTC -12",
    "UTC -11",
    "UTC -10",
    "UTC -9",
    "UTC -8",
    "UTC -7",
    "UTC -6",
    "UTC -5",
    "UTC -4",
    "UTC -3",
    "UTC -2",
    "UTC -1",
    "UTC +-0",
    "UTC +1",
    "UTC +2",
    "UTC +3",
    "UTC +4",
    "UTC +5",
    "UTC +6",
    "UTC +7",
    "UTC +8",
    "UTC +9",
    "UTC +10",
    "UTC +11",
    "UTC +12",
  ];

  const [dataSkill, setData] = useState([]);
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const handleSave = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const formSave = {
      ...watch(),
      avatar: createObjectURL || data?.user?.image,
      skill: dataSkill,
    };
    CreateTeam(dispatch(postValue(formSave)).payload);
    reset();
    setTimeout(() => {
      router.push("/manage-teams");
    }, 3000);
  };

  const onSelect = (select: any) => {
    setData(select);
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });
  return (
    <Layout>
      <div>
        <h1 className="px-4 py-4 text-2xl font-bold">
          Profile {">"} My Teams {">"} Create new team
        </h1>
      </div>
      <div className="flex ">
        <form className="py-5 flex-auto">
          <div className="flex items-center mb-5">
            <span className="text-right mr-4 font-500 w-[150px]">
              Team Name
            </span>
            <input
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
            <span className="text-right mr-4 font-500 w-[150px]">
              Team Size
            </span>
            <select
              className="relative block w-9/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("teamSize")}
            >
              <option>Please select</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
          </div>
          {errors?.teamSize && (
            <div className="flex justify-left ml-44 mb-2 text-sm ">
              <p className={"w-[250px] block mt-[-10px] text-red-600"}>
                {errors?.teamSize?.message}
              </p>
            </div>
          )}
          <div className="flex items-center mb-5">
            <span className="text-right mr-4 font-500 w-[150px]">Timezone</span>
            <select
              className="relative block w-9/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("timeZone")}
            >
              <option>Please select</option>
              {timeZone.map((resp) => {
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
            <span className="text-right mr-4 font-500 w-[150px]">
              Organization
            </span>
            <input
              className="appearance-none relative block w-9/12 px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter text here"
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
            <span className="text-right mr-4 font-500 w-[150px]">Skills</span>
            <div className="relative block w-9/12 px py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
              <Multiselect
                placeholder="Please select"
                options={skills}
                onSelect={onSelect}
                isObject={false}
              />
            </div>
          </div>
          <div className="flex items-center mb-5">
            <span className="text-right mr-4 font-500 w-[150px]">
              Working Time
            </span>
            <input
              className="appearance-none relative block w-6/12 px-3 py-2 border border-gray-700 border-solid mr-3 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter text here"
              {...register("workingTime")}
            />
            <input
              className="appearance-none relative block min-w-[80px] w-1/12 px-3 py-2 border border-gray-700 border-solid mr-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Hours"
              type="number"
              {...register("hour")}
            />
            <span className="text-xl mr-2">{"/"}</span>
            <select
              className="relative block min-w-[100px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("week")}
            >
              <option>Week</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div className="flex mb-5">
            <span className="text-right mr-4 font-500 w-[150px]">
              Description
            </span>
            <textarea
              className="appearance-none relative block w-9/12 h-[80px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("description")}
            />
          </div>
        </form>

        <div className="py-5 flex-col flex w-[300px] justify-between">
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
        </div>
      </div>
      <div className="flex justify-end px-4 mr-20 mb-3">
        <button
          type="button"
          className="px-6 py-2 bg-transparent border mr-2 border-black text-black rounded"
          onClick={() => router.push("/manage-teams")}
        >
          Cancel
        </button>
        <button
          disabled={!isValid}
          className={`px-8 py-2 shadow text-white rounded ${
            !isValid ? "bg-[gray] cursor-not-allowed" : "bg-red-600"
          }`}
          type="submit"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <ToastContainer autoClose={2000} />
    </Layout>
  );
};

export default CreateNewTeam;
