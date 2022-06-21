import { PortfolioApi } from "@/api/portfolio-api";
import { InputFieldCol } from "@/components/portfolio/InputFieldCol";
import { SelectField } from "@/components/portfolio/SelectField";
import { useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { IPortfolio } from "@/type/team/team.type";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddPhotoAlternate,
  DesktopWindowsOutlined,
  LockOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schemaValidation = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  clientWebsite: yup
    .string()
    .trim("Space is not allowed")
    .matches(
      /(^$)|(^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$)/,
      "Please enter a valid website format! URL must contain http:// or https:// prefix."
    ),
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  estimate: yup.string().required("Project size is required"),
  startDate: yup
    .string()
    .test(
      "maxDate",
      "Project Start date cannot be in the future.",
      function (value, ctx) {
        const { path, createError } = ctx;
        if (!value) return true;
        const date = new Date(value);
        if (date.getTime() - new Date().getTime() > 0) {
          return createError({
            path,
            message: "Project Start date cannot be in the future.",
          });
        } else {
          return true;
        }
      }
    ),
  endDate: yup.string().when("startDate", {
    is: (startDate: string) => startDate,
    then: yup
      .string()
      .test(
        "minDate",
        "Please choose a date after start date",
        (value, ctx) => {
          const { path, createError } = ctx;
          if (!value) return true;
          const date = new Date(value);
          if (date.getTime() - new Date(ctx.parent.startDate).getTime() < 0) {
            return createError({
              path,
              message: `Please choose a date after ${ctx.parent.startDate}`,
            });
          } else {
            return true;
          }
        }
      ),
  }),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string(),
  videoLink: yup
    .string()
    .matches(
      /(^$)|(^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$)/,
      "Please enter a valid website format! URL must contain http:// or https:// prefix."
    ),
  privacy: yup
    .number()
    .nullable()
    .required("Please choose one privacy setting."),
});

const costEstimate = [
  "Less than $10,000",
  "$10,000 to $49,999",
  "$50,000 to $199,999",
  "$200,000 to $999,999",
  "$1,000,000 to $9,999,999",
  "$10,000,000+",
];

const NewPortfolio = () => {
  const skills = useAppSelector(getSkillsSelector);
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  const [teamId, setTeamId] = useState<number>(NaN);
  const router = useRouter();
  useEffect(() => {
    if (router.query.teamId) {
      setTeamId(Number(router.query.teamId));
    }
  }, [router.query.teamId]);

  const onSubmit = async () => {
    const data = await PortfolioApi.createPortfolio(
      watch() as IPortfolio,
      teamId
    );
    if (data === null) {
      toast.error("Portfolio creation failed!");
    } else if(data === 404){
      toast.error("Can't create portfolio for the team that is not yours!");
    } else {
      reset();
      toast.success("Portfolio added successfully!");
      router.push(`/team/${teamId}/dashboard/portfolio/${data.id}`);
    }
  };

  const handleCancel = () => {
    router.push(`/team/${teamId}/dashboard/portfolio`);
  };

  return (
    <ManagePortfolio>
      <div>
        <div className="lg:border-b-0 border-b mb-2 pb-2">
          <h1 className="text-3xl">Add a New Portfolio Item</h1>
          <Typography className="text-xl my-3"> 
            Share your latest exciting work.
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="">
              <div className="border-b flex items-center font-medium text-lg">
                <PersonOutlineOutlined className="font-sm" />
                <span>Client Details</span>
              </div>
              <div className="my-2 pl-4">
                <InputFieldCol
                  label={"Client Team"}
                  register={register("companyName")}
                  errors={errors.companyName}
                  placeholder="team name"
                  watch={watch("companyName")}
                />
                <InputFieldCol
                  label={"Client Website"}
                  register={register("clientWebsite")}
                  errors={errors.clientWebsite}
                  placeholder="https://www.example.com"
                  watch={watch("clientWebsite")}
                  maxLength={200}
                />
              </div>
            </div>
            <div className="">
              <div className="border-b flex items-center font-medium text-lg">
                <DesktopWindowsOutlined className="font-sm" />
                <span>Portfolio Item Details</span>
              </div>
              <div className="my-2 pl-4">
                <InputFieldCol
                  label={"Title"}
                  register={register("title")}
                  errors={errors.title}
                  placeholder="Enter a Title for this Portfolio Item"
                  watch={watch("title")}
                />
                <SelectField
                  label={"Category"}
                  register={register("category")}
                  valueList={skills.map((skill) => skill.skillName)}
                  placeholder="Select a category"
                  errors={errors.category}
                />
                <SelectField
                  label={"Estimated Project Size"}
                  register={register("estimate")}
                  valueList={costEstimate}
                  placeholder=" Select the estimated cost of this project "
                  errors={errors.estimate}
                />
                <div className="flex lg:w-[600px] lg:flex-row flex-col w-full items-start justify-between ">
                  <div className="font-medium">
                    <label
                      htmlFor="startDate"
                      className="text-primary xs:min-w-[130px] flex justify-between py-2 md:py-0"
                    >
                      Start Date
                      <span className="text-sm text-gray-300">optional</span>
                    </label>
                    <div className="w-fit flex flex-col relative">
                      <input
                        id="startDate"
                        type="month"
                        {...register("startDate")}
                        onChange={async () => {
                          trigger("endDate");
                        }}
                        className={` border-2 border-[#cae0e7] pl-3 pr-8 py-2 outline-none focus:shadow-3xl focus:border-primary ${
                          errors.startDate && "bg-red-200"
                        }`}
                      />
                    </div>
                    {errors.startDate && (
                      <span className="text-red-500 text-left text-sm font-normal mt-1">
                        {errors.startDate?.message}
                      </span>
                    )}
                  </div>
                  <div className="font-medium">
                    <label
                      htmlFor="endDate"
                      className="text-primary xs:min-w-[130px] flex justify-between py-2 md:py-0"
                    >
                      End Date
                      <span className="text-sm text-gray-300">optional</span>
                    </label>
                    <div className="w-fit flex flex-col relative">
                      <input
                        id="endDate"
                        type="month"
                        {...register("endDate")}
                        autoComplete="off"
                        placeholder={"MM/YYYY"}
                        className={` border-2 border-[#cae0e7] pl-3 pr-8 py-2 outline-none focus:shadow-3xl focus:border-primary ${
                          errors.endDate && "bg-red-200"
                        }`}
                      />
                    </div>
                    {errors.endDate && (
                      <span className="text-red-500 text-left text-sm font-normal mt-1">
                        {errors.endDate?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="items-center my-4 font-medium">
                  <label
                    htmlFor="descripton"
                    className="text-primary min-w-[130px] block py-2 md:py-0"
                  >
                    Descripton
                  </label>
                  <div className="w-fit flex items-center justify-center flex-col relative">
                    <textarea
                      id="descripton"
                      {...register("description")}
                      placeholder="Tell a great story about this Portfolio Item."
                      maxLength={300}
                      className={`sm:min-w-[400px] lg:min-w-[600px] w-full border-2 border-[#cae0e7] pl-3 pr-8 py-2 outline-none focus:shadow-3xl focus:border-primary ${
                        errors.description && "bg-red-200"
                      }`}
                    />
                    <div className="absolute right-0 bottom-0  m-2 text-gray-400 text-sm font-normal">
                      {watch("description") ? watch("description").length : 0}/
                      {300}
                    </div>
                  </div>
                  {errors.description && (
                    <span className="text-red-500 text-left text-sm font-normal mt-1">
                      {errors.description?.message}
                    </span>
                  )}
                </div>
                <div className="items-center my-4 font-medium">
                  <label
                    htmlFor="endDate"
                    className="text-primary xs:min-w-[130px] max-w-[300px] flex justify-between py-2 md:py-0"
                  >
                    Add a Video Link or Image
                    <span className="text-sm text-gray-300">optional</span>
                  </label>
                  <div className="">
                    <div className="">
                      <input
                        id="videoLinkField"
                        type="radio"
                        name="media"
                        className="peer"
                      />
                      <label htmlFor="videoLinkField" className="pl-1">
                        Video Link
                      </label>
                      <div className="w-fit hidden flex-col relative peer-checked:flex">
                        <input
                          id="videoLink"
                          {...register("videoLink")}
                          maxLength={300}
                          className={`sm:min-w-[400px] lg:min-w-[600px] w-full border-2 border-[#cae0e7] pl-3 pr-8 py-2 outline-none focus:shadow-3xl focus:border-primary ${
                            errors.videoLink && "bg-red-200"
                          }`}
                        />
                        <div className="absolute right-0 h-full p-2 flex items-center justify-center text-gray-400 text-sm font-normal">
                          {watch("videoLink") ? watch("videoLink").length : 0}/
                          {200}
                        </div>
                        {errors.videoLink && (
                          <span className="text-red-500 text-left text-sm font-normal mt-1">
                            {errors.videoLink?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="">
                      <input
                        id="imageField"
                        type="radio"
                        name="media"
                        className="peer"
                      />
                      <label htmlFor="imageField" className="pl-1">
                        Image
                      </label>
                      <div className="hidden items-center justify-between peer-checked:flex">
                        <div className="flex-[50%]">
                          <input
                            id="image"
                            type="file"
                            autoComplete="off"
                            accept="image/*"
                            className="h-0 w-0 peer"
                          />
                          <div className="min-h-[202px] mt-[-30px] max-w-[267px] w-full h-[202px] mr-3 relative border-[#cae0e7] border-dashed border-2 peer-focus:border-cyan-600">
                            {false ? (
                              <div>
                                <Image
                                  src={"createObjectURL"}
                                  layout="fill"
                                  alt=""
                                  draggable={true}
                                />
                              </div>
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
                                      <AddPhotoAlternate />
                                    </span>
                                  </label>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-gray-500 px-3 py-3 text-sm flex-[50%]">
                          Your Team Logo must be one of the following image
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
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="border-b flex items-center font-medium text-lg">
                <LockOutlined className="font-sm" />
                <span>Privacy Settings</span>
              </div>
              <div className="px-4 py-2">
                <div className="">
                  <input
                    type="radio"
                    value={1}
                    id="showall"
                    className="cursor-pointer"
                    {...register("privacy")}
                  />
                  <label htmlFor="showall" className="pl-1 cursor-pointer">
                    Show All
                  </label>
                  <p className="pl-4 text-sm text-gray-500">
                    All of the above content will be displayed on your profile.
                    <br></br>
                    <em>
                      Currently, we will only show portfolio items with images
                    </em>
                  </p>
                </div>
              </div>
              <div className="px-4 py-2">
                <div className="">
                  <input
                    type="radio"
                    value={2}
                    id="confidential"
                    className="cursor-pointer"
                    {...register("privacy")}
                  />
                  <label htmlFor="confidential" className="pl-1 cursor-pointer">
                    Confidential
                  </label>
                  <div className="pl-4 text-sm text-gray-500">
                    <span>
                      Only the following details for this Portfolio Item will be
                      displayed on your Profile:
                    </span>
                    <ul className="list-disc pl-8 pb-4">
                      <li>Title</li>
                      <li>Description</li>
                      <li>Category</li>
                      <li>Image or Video Link</li>
                    </ul>
                    <span>
                      This is ideal for projects where you are not able to
                      showcase client details.
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2">
                <div className="">
                  <input
                    type="radio"
                    value={3}
                    id="hidden"
                    className="cursor-pointer"
                    {...register("privacy")}
                  />
                  <label htmlFor="hidden" className="pl-1 cursor-pointer">
                    Hidden
                  </label>
                  <p className="pl-4 text-sm text-gray-500">
                    This Portfolio Item will be kept safe and hidden from prying
                    eyes until you’re ready to share it.
                  </p>
                </div>
              </div>
              <div className="px-4">
                {errors.privacy && (
                  <span className="text-red-500 text-left text-sm font-normal mt-1">
                    {errors.privacy?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex xxs:flex-row flex-col items-center justify-end p-4">
              <button className="bg-white px-16 py-3 hover:text-cyan-600 " onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="px-4 py-2 w-fit bg-secondary text-white  flex justify-center items-center cursor-pointer border-2 border-secondary
               hover:bg-transparent hover:text-secondary
               disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                Add Portfolio Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </ManagePortfolio>
  );
};

export default NewPortfolio;
