import { InputFieldCol } from "@/components/portfolio/InputFieldCol";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { PersonOutlineOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaValidation = yup.object().shape({
  keyName: yup.array().of(yup.string().max(30, "Key name is too long")),
});

export const Clients = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });





  const onSubmit = () =>{

  }

  const Input = () => {
    return (
      <div className="border-b pb-4 ">
        <div className="items-center my-4 font-medium w-fit pl-16">
          <label
            htmlFor="keyClient"
            className="text-primary flex justify-between py-2 md:py-0"
          >
            Key Clients
            <span className="text-sm text-gray-300">optional</span>
          </label>
          <div className="w-fit flex flex-col relative">
            <input
              id="keyClient"
              type="text"
              {...register("keyName")}
              maxLength={30}
              autoComplete="off"
              className={` border-2 border-[#cae0e7] xs:min-w-[400px] pl-3 pr-8 py-2 outline-none focus:shadow-3xl focus:border-primary ${
                errors.startDate && "bg-red-200"
              }`}
            />
            <div className="absolute right-0 p-2 text-gray-400 text-sm font-normal">
              {watch("keyName") ? watch("keyName").length : 0}/{30}
            </div>
          </div>
          {errors.startDate && (
            <span className="text-red-500 text-left text-sm font-normal mt-1">
              {errors.startDate?.message}
            </span>
          )}
        </div>
      </div>
    );
  }
  return (
    <ManagePortfolio>
      <div>
        <div className="lg:border-b-0 border-b mb-2 pb-2">
          <h1 className="text-3xl">Key Clients</h1>
          <Typography className="text-xl my-3">
            Add Key Clients that you’d like listed on your Profile.
          </Typography>
        </div>
        <div className="">
          <div className="border-b flex items-center font-medium text-lg">
            <PersonOutlineOutlined className="font-sm" />
            <span>Key Clients</span>
          </div>
          <p className="text-sm text-gray-500 px-8 py-4">
            This list is optional for your Profile. <br /> It’s best to take
            advantage of the Projects and showcase your Client work through
            visual storytelling and case studies.
          </p>
          <form className="">
            <Input />
            <div className="flex items-center justify-end p-4">
              <button className="bg-white px-16 py-3 hover:text-cyan-600 ">
                Cancel
              </button>
              <button
                className="px-4 py-2 w-fit bg-secondary text-white  flex justify-center items-center cursor-pointer border-2 border-secondary
               hover:bg-transparent hover:text-secondary"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </ManagePortfolio>
  );
};

export default Clients;
