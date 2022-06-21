import { teamApi } from "@/api/team-api";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfoSelector } from "@/redux/selector";
import { Layout } from "@/src/layouts/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalPhoneOutlined, MessageOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface IFromData {
  fullname: string;
  companyname: string;
  contactemail: string;
  phone?: string;
  subject: number;
  message: string;
}

const subjectExample = [
  "Get a quote/discuss my project needs",
  "Propose a partnership opportunity",
  "Find a job",
  "Other",
];
const conatctSchemaValidation = Yup.object({
  fullname: Yup.string()
    .max(30, "Full name does not exceed 30 character!")
    .required("Please enter your full name!"),
  companyname: Yup.string()
    .max(30, "Team name does not exceed 30 character!")
    .required(`Please enter your team name!`),
  contactemail: Yup.string().required(
    "You not yet have a contact email, please update your profile!"
  ),
  phone: Yup.string()
    .matches(/^(\s*|\d+)$/, "Please enter valid phone number!")
    .max(15, "Phone number does not exceed 15 number!"),
  subject: Yup.string()
    .required("Please choose one subject!")
    .max(subjectExample.length, "Subject is invalid!")
    .nullable(),
  message: Yup.string()
    .required("Please enter your message!")
    .max(200, "Message does not exceed 300 character!")
    .min(10, "Message does not less than 10 character!"),
});
export const Contact = () => {
  const router = useRouter();
  const userInfo = useAppSelector(getUserInfoSelector);
  const [teamName, setTeamName] = useState<string>("");

  conatctSchemaValidation.fields.fullname.default(userInfo.username);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFromData>({
    resolver: yupResolver(conatctSchemaValidation),
    mode: "all",
  });

  useEffect(() => {
    if (router.query.teamId) {
      teamApi
        .getTeam(parseInt(router.query.teamId as string) || NaN)
        .then((data) => {
          setTeamName(data.teamName);
        })
        .catch((err) => {});
    }
  }, [router]);
  useEffect(() => {
    setValue("contactemail", userInfo.emailAddress || "", {
      shouldValidate: true,
    });
    if (userInfo.username)
      setValue("fullname", userInfo.username, { shouldValidate: true });
  }, [getValues, setValue, userInfo.emailAddress, userInfo.username]);

  const onSubmit = () => {
    toast.success('Your message has been sent!');
    reset();
  };
  return (
    <Layout>
      <div className="md:mx-32 lg:mx-64 mx-4 flex justify-between">
        <div className="max-w-[500px] w-full py-16">
          <div className="">
            <h1 className="text-5xl text-cy an-900 relative mb-8 after:w-full after:h-[1px] after:absolute after:bottom-[-10px] after:bg-cyan-900 after:left-0">
              {teamName}
            </h1>
            <Typography className="text-lg ">
              Contact {teamName} using the form below
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="items-center my-4 font-medium">
              <label
                htmlFor="fullname"
                className="text-primary min-w-[130px] block py-2 md:py-0"
              >
                Full Name
              </label>
              <div className="w-full flex flex-col">
                <input
                  id="fullname"
                  type="text"
                  {...register("fullname")}
                  autoComplete="off"
                  defaultValue={userInfo.username}
                  maxLength={30}
                  className="md:max-w-[400px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                />
                {errors.fullname && (
                  <span className="text-red-500 text-left text-sm mt-1">
                    {errors.fullname?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="items-center my-4 font-medium">
              <label
                htmlFor="companyname"
                className="text-primary min-w-[130px] block py-2 md:py-0"
              >
                Team Name
              </label>
              <div className="w-full flex flex-col">
                <input
                  id="companyname"
                  type="text"
                  {...register("companyname")}
                  autoComplete="off"
                  maxLength={30}
                  className="md:max-w-[400px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                />
                {errors.companyname && (
                  <span className="text-red-500 text-left text-sm mt-1">
                    {errors.companyname?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="items-center my-4 font-medium">
              <label className="text-primary min-w-[130px] block py-2 md:py-0">
                Contact Email
              </label>
              <div className="w-full flex flex-col ml-4">
                <Typography
                  {...register("contactemail")}
                  className="md:max-w-[400px] w-full py-2 "
                >
                  {userInfo.emailAddress}
                </Typography>
                <span className="text-sm font-normal">
                  To change your Contact Email, go to your
                  <Link href={"/profile"}>
                    <a className="ml-2 text-cyan-700">Account Page.</a>
                  </Link>
                </span>
                {errors.contactemail && (
                  <span className="text-red-500 text-left text-sm mt-1">
                    {errors.contactemail?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="items-center my-4 font-medium">
              <label
                htmlFor="phone"
                className="text-primary min-w-[130px] md:max-w-[400px] flex justify-between py-2 md:py-0 "
              >
                Phone
                <span className="text-gray-400 text-xs">Optional</span>
              </label>
              <div className="w-full flex flex-col justify-center relative">
                <LocalPhoneOutlined className="absolute left-2 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  {...register("phone")}
                  autoComplete="off"
                  placeholder="+1 (555) 555-5555"
                  maxLength={15}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" || e.key === "Tab" || e.key === "Enter") return;
                    if (isNaN(parseInt(e.key))) e.preventDefault();
                  }}
                  className="md:max-w-[400px] w-full border-2 border-[#cae0e7] pl-8 px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                />
              </div>
              {errors && (
                <span className="text-red-500 text-left text-sm mt-1">
                  {errors.phone?.message}
                </span>
              )}
            </div>
            <div className="items-center my-4 font-medium">
              <label
                htmlFor="subject"
                className="text-primary min-w-[130px] md:max-w-[400px] flex justify-between py-2 md:py-0 "
              >
                Subject
              </label>
              <div className="w-full flex flex-col justify-center">
                <fieldset id="subject" className="ml-4 max-w-fit">
                  {subjectExample.map((item, index) => (
                    <label
                      htmlFor={`radio${index}`}
                      className="px-2 py-1 block border-l-2 border-transparent hover:border-cyan-900 hover:bg-gray-200 cursor-pointer"
                      key={index}
                    >
                      <input
                        type="radio"
                        id={`radio${index}`}
                        value={index}
                        className="peer checked:bg-cyan-900"
                        {...register("subject")}
                      />
                      <label
                        htmlFor={`radio${index}`}
                        className="text-cyan-900 font-normal ml-4 peer-checked:font-semibold cursor-pointer"
                      >
                        {item}
                      </label>
                    </label>
                  ))}
                </fieldset>
                {errors.subject && (
                  <span className="text-red-500 text-left text-sm mt-1">
                    {errors.subject?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="items-center my-4 font-medium">
              <label
                htmlFor="message"
                className="text-primary min-w-[130px] block py-2 md:py-0"
              >
                Message
              </label>
              <div className="w-full flex flex-col">
                <textarea
                  id="message"
                  placeholder="Add message you would like to send"
                  maxLength={200}
                  {...register("message", { required: true })}
                  autoComplete="off"
                  className="w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                />
                {errors.message && (
                  <span className="text-red-500 text-left text-sm mt-1">
                    {errors.message?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <Typography>
                By pressing submit, your message along with the information
                provided above will be sent to the vendor.
              </Typography>
            </div>
            <div className="mt-8">
              <button
                className="w-fit px-8 py-2 bg-red-500 font-semibold text-white  
                flex justify-between cursor-pointer
                 border-2 border-red-500 
                 hover:bg-transparent hover:text-red-500"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="max-w-[250px] md:flex hidden p-6 ml-4 flex-col items-center justify-center h-fit mt-32 border shadow-xl shadow-cyan-100 rounded-xl">
          <h1 className="text-3xl w-full">Message</h1>
          <Typography className="w-full font-medium">
            Start a conversation today!
          </Typography>
          <p>
            As soon as the vendor responds to your inquiry you’ll receive an
            email and a new message will be available on Kryptohub.
          </p>
          <Image src={"/desktop.svg"} alt="desktop" width={150} height={150} />
          <Typography className="w-full font-medium">Stay Connected</Typography>
          <div className="flex items-center justify-center">
            <p className="text-sm">
              With each new reply we’ll send you an email and update your
              Message Notification on Kryptohub.
            </p>
            <div className="text-red-500 ">
              <MessageOutlined fontSize="large" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
