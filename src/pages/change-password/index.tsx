import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormEvent, useEffect, useState } from "react";
import { ArrowBackIos, Done } from "@mui/icons-material";
import { authApi } from "@/api/auth-api";
import { toast } from "react-toastify";

const schemaValidation = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must includes lowercase, uppercase, number and special character"
    )
    .max(30, "Max length is 30 characters!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match")
    .required("This field is required")
    .max(30, "Max length is 30 characters!"),
});

const RePassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<any>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submited, setSubmited] = useState(false);
  const onSubmit = async () => {
    setIsSubmitting(true);
    if(router.query.token) {
      try{
        await authApi.changePassword(watch("password"), router.query.token as string);
        toast.success("Password changed successfully!");
        setSubmited(true);
        router.push("/login");
      } catch(err: any){
        setIsSubmitting(false);
        toast.error(err.response.data.message);
      }
    } else {
      setIsSubmitting(false);
      toast.error("Invalid token!");
    }
  };
  return (
    <div className="h-auto min-h-full bg-primary flex justify-center xs:items-center px-2 xxs:px-0  py-4">
      <div className="max-w-[420px] h-fit w-full animate-slide-in-left">
        <div className="text-center ">
          <h3 className="text-5xl font-bold text-white">Kryptohub</h3>
        </div>
        <div className="w-full h-fit max-h-3/4 bg-white p-8 mt-8">
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push("/login");
            }}
          >
            <ArrowBackIos /> Back
          </div>
          {!isSubmitting ? (
            <div className="">
              <h3 className="text-cyan-900 text-md py-4">
                <b className="text-2xl font-normal">Change </b>
                your password
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" mb-5 mx-auto max-w-[400px] text-center "
              >
                <div className="flex flex-col py-2">
                  <div className="flex flex-col justify-start items-start ">
                    <label className="font-medium">New Password</label>
                    <input
                      type="password"
                      className="border-solid  w-full  border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      {...register("password")}
                      autoComplete="off"
                    />
                  </div>
                  {errors?.password && (
                    <span className="text-red-500 text-left text-sm mt-2">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col py-2">
                  <div className="flex flex-col justify-start items-start ">
                    <label className="font-medium">Confirm Password</label>
                    <input
                      type="password"
                      className="border-solid  w-full  border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      {...register("confirmPassword")}
                      autoComplete="off"
                    />
                  </div>
                  {errors?.confirmPassword && (
                    <span className="text-red-500 text-left text-sm mt-2">
                      {errors?.confirmPassword?.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-red-500 text-white block text-center py-2 px-5 w-full shadow-lg mt-4 mx-auto"
                >
                  Change Password
                </button>
              </form>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center relative">
              <div className={`h-32 w-32 border-4 rounded-full ${submited? "border-green-600":"border-primary border-t-secondary"} animate-spin duration-1000 flex items-center justify-center `}></div>
              <span className={`absolute ${submited? "text-green-600 animate-ping":""}`}>{submited?<Done className="text-6xl"/>:"Changing"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RePassword;
