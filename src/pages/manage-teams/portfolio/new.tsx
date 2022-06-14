import { InputFieldCol } from "@/components/portfolio/InputFieldCol";
import { SelectField } from "@/components/portfolio/SelectField";
import { useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddPhotoAlternate,
  DesktopWindowsOutlined,
  LockOutlined,
  PersonOutlineOutlined
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";

yup.addMethod(yup.string, "maxStartDate", function (errorMessage) {
  return this.test(`check-max-date`, errorMessage, function (value) {
    const { path, createError } = this;
    if(!value) return true;
    const date = new Date(value);
    if(date.getTime() - new Date().getTime() > 0) {
      return createError({ path, message: errorMessage });
    }
    else{
      return true;
    }
    
  });
});


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
  projectSize: yup.string().required("Project size is required"),
  startDate: yup
    .string(),
  endDate: yup.string(),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string(),
  videoLink: yup.string().matches(
      /(^$)|(^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$)/,
      "Please enter a valid website format! URL must contain http:// or https:// prefix."
    ),
  privacy: yup.string().required("Privacy is required"),
});

const costEstimate = [
    "Less than $10,000",
    "$10,000 to $49,999",
    "$50,000 to $199,999",
    "$200,000 to $999,999",
    "$1,000,000 to $9,999,999",
    "$10,000,000+",
]

const NewPortfolio = () => {
  const skills = useAppSelector(getSkillsSelector);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  return (
    <ManagePortfolio>
      <div>
        <div className="lg:border-b-0 border-b mb-2 pb-2">
          <h1 className="text-3xl">Add a New Portfolio Item</h1>
          <Typography className="text-xl my-3">
            Share your latest exciting work.
          </Typography>
        </div>
        <form>
          <div className="">
            <div className="">
              <div className="border-b flex items-center font-medium text-lg">
                <PersonOutlineOutlined className="font-sm" />
                <span>Client Details</span>
              </div>
              <div className="my-2 pl-4">
                <InputFieldCol
                  label={"Client Company"}
                  register={register("companyName")}
                  errors={errors.companyName}
                  placeholder="company name"
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
                  register={register("projectSize")}
                  valueList={costEstimate}
                  placeholder=" Select the estimated cost of this project "
                  errors={errors.projectSize}
                />
                <div className="flex lg:w-[600px] lg:flex-row flex-col w-full lg:items-center items-start justify-between ">
                  <div className="items-center my-4 font-medium">
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
                        max={`${new Date().getFullYear}-${
                          new Date().getMonth() > 10
                            ? new Date().getMonth()
                            : "0" + new Date().getMonth()
                        }`}
                        {...register("startDate")}
                        autoComplete="off"
                        className={` border-2 border-[#cae0e7] pl-3 pr-8 py-2 outline-none focus:shadow-3xl focus:border-primary `}
                      />
                    </div>
                    {errors && (
                      <span className="text-red-500 text-left text-sm font-normal mt-1">
                        {errors?.message}
                      </span>
                    )}
                  </div>
                  <div className="items-center my-4 font-medium">
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
                        className={` border-2 border-[#cae0e7] pl-3 pr-8 py-2 outline-none focus:shadow-3xl focus:border-primary `}
                      />
                    </div>
                    {errors && (
                      <span className="text-red-500 text-left text-sm font-normal mt-1">
                        {errors?.message}
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
                      <label htmlFor="videoLinkField">Video Link</label>
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
                      </div>
                      {errors.videoLink && (
                        <span className="text-red-500 text-left text-sm font-normal mt-1">
                          {errors.videoLink?.message}
                        </span>
                      )}
                    </div>
                    <div className="">
                      <input
                        id="imageField"
                        type="radio"
                        name="media"
                        className="peer"
                      />
                      <label htmlFor="imageField">Image</label>
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
            <div className="">
              <div className="border-b flex items-center font-medium text-lg">
                <LockOutlined className="font-sm" />
                <span>Privacy Settings</span>
              </div>
              <div className="p-4">
                <div className="">
                  <input
                    type="radio"
                    name="privacy"
                    value="showall"
                    id="showall"
                  />
                  <label htmlFor="showall" className="pl-1">
                    Show All
                  </label>
                  <p className="pl-4">
                    All of the above content will be displayed on your profile.
                    <br></br>
                    <em>
                      Currently, we will only show portfolio items with images
                    </em>
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="">
                  <input
                    type="radio"
                    name="privacy"
                    value="confidential"
                    id="confidential"
                  />
                  <label htmlFor="confidential" className="pl-1">
                    Confidential
                  </label>
                  <p className="pl-4">
                    All of the above content will be displayed on your profile.
                    <br></br>
                    <em>
                      Currently, we will only show portfolio items with images
                    </em>
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="">
                  <input
                    type="radio"
                    name="privacy"
                    value="showall"
                    id="showall"
                  />
                  <label htmlFor="showall" className="pl-1">
                    Show All
                  </label>
                  <p className="pl-4">
                    All of the above content will be displayed on your profile.
                    <br></br>
                    <em>
                      Currently, we will only show portfolio items with images
                    </em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ManagePortfolio>
  );
};

export default NewPortfolio;
