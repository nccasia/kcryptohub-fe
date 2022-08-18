import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowBackIos, Done, Save } from "@mui/icons-material";
import { authApi } from "@/api/auth-api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";

const schemaValidation = Yup.object({
  email: Yup.string()
    .required("Email is required!")
    .trim("Email is required!")
    .matches(
      /^[a-zA-Z0-9.]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email format!"
    )
    .max(50, "Email dose not exceed 50 character!"),
});

const ForgotPassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<any>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await authApi.resetPassword(watch("email"));
      toast.success("Email has been sent!");
      setIsSubmitting(false);
      reset();
    } catch (err: any) {
      (buttonRef.current as unknown as HTMLButtonElement).disabled = true;
      toast.error(err.response.data.message);

      setTimeout(() => {
        (buttonRef.current as unknown as HTMLButtonElement).disabled = false;
        setIsSubmitting(false);
      }, 3000);
    }
  };
  return (
    <div className="h-auto min-h-full bg-[#f9fafb] font-jost  flex justify-center xs:items-center px-2 xxs:px-0  py-4 ">
      <div className="max-w-[420px] h-fit w-full animate-slide-in-left">
        <div className="text-center ">
          <h3 className="text-5xl font-bold text-[#606060]">Kryptohub</h3>
        </div>
        <div className="w-full h-fit max-h-3/4 bg-white py-8 px-4 md:p-8 mt-8 rounded-3xl shadow-3xl">
          <div
            className="cursor-pointer text-[#606060]"
            onClick={() => {
              router.push("/login");
            }}
          >
            <ArrowBackIos /> Back
          </div>
          <div className="">
            <h3 className="text-[#606060] text-md py-4">
              <b className="text-2xl font-normal">Forgot </b>
              password
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mb-5 mx-auto max-w-[400px] text-center "
          >
            <div className="flex flex-col py-2">
              <div className="flex flex-col justify-start items-start  w-full">
                <label className="font-medium text-[#606060]">Email</label>
                <input
                  type="text"
                  className="border-solid  w-full  border-2  rounded-3xl px-3 py-2 outline-none"
                  {...register("email")}
                  autoComplete="off"
                />
              </div>
              {errors?.email && (
                <span className="text-red-500 text-left text-sm mt-2">
                  {errors?.email?.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#848abd] rounded-3xl text-white block text-center py-2 px-0 md:px-5 w-1/2 shadow-lg mt-4 mx-auto"
              ref={buttonRef}
            >
              {isSubmitting ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<Save />}
                  className="text-white text-sm uppercase p-0"
                >
                  Sending
                </LoadingButton>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
