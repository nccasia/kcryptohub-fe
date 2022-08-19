import { PortfolioApi } from "@/api/portfolio-api";
import { teamApi } from "@/api/team-api";
import { InputFieldCol } from "@/components/portfolio/InputFieldCol";
import { setTeam } from "@/redux/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { UploadImage } from "@/src/layouts/create-team/UploadImage";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import SelectCustom from "@/src/layouts/team/SelectCustom";
import { IPortfolio } from "@/type/team/team.type";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DesktopWindowsOutlined,
  LockOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          transform: "translateX(10%) !important",
          border: "2px solid #848abd",
          color: "#848abd",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
        notchedOutline: {
          border: "none",
          ":hover": {
            borderColor: "transparent !important",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const schemaValidation = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  clientWebsite: yup
    .string()
    .trim("Space is not allowed")
    .matches(
      /(^$)|(^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$)/,
      "Please enter a valid website format! URL must contain http:// or https:// prefix."
    )
    .nullable(),
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Title must be less than 50 characters"),
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
        } else if (
          date.getDate().toString() === "NaN" ||
          date.getMonth().toString() === "NaN" ||
          date.getFullYear().toString() === "NaN"
        ) {
          return createError({
            path,
            message: "Start Date is invalid",
          });
        } else if (+value?.split(" ")[3] < 1960) {
          return createError({
            path,
            message: "Start Date year must be larger than 1960",
          });
        } else if (+value?.split(" ")[3] > 2099) {
          return createError({
            path,
            message: "Start Date year must be smaller than 2099",
          });
        } else {
          return true;
        }
      }
    )
    .nullable(),
  endDate: yup
    .string()
    .test("date", "", function (value, ctx) {
      const { path, createError } = ctx;

      if (!value) return true;
      const date = new Date(value);
      if (
        date.getDate().toString() === "NaN" ||
        date.getMonth().toString() === "NaN" ||
        date.getFullYear().toString() === "NaN"
      ) {
        return createError({
          path,
          message: "End Date is invalid",
        });
      } else if (+value?.split(" ")[3] < 1960) {
        return createError({
          path,
          message: "End Date year must be larger than 1960",
        });
      } else if (+value?.split(" ")[3] > 2099) {
        return createError({
          path,
          message: "End Date year must be smaller than 2099",
        });
      } else {
        return true;
      }
    })
    .when("startDate", {
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
    })
    .nullable(),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().nullable(),
  videoLink: yup
    .string()
    .matches(
      /(^$)|(^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$)/,
      "Please enter a valid website format! URL must contain http:// or https:// prefix."
    )
    .nullable(),
  privacy: yup
    .number()
    .nullable()
    .required("Please choose one privacy setting."),
  media: yup.string().nullable(),
});

const costEstimate = [
  "Freelance",
  "2-9",
  "10-49",
  "50-249",
  "250-499",
  "1,000-9,999",
  "10,000+",
];

const PortfolioEdit = () => {
  const skills = useAppSelector(getSkillsSelector);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  const [teamId, setTeamId] = useState<number>(NaN);
  const [portfolioId, setPortfolioId] = useState<number>(NaN);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [portfolio, setPortfolio] = useState<IPortfolio>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.teamId) {
      setTeamId(Number(router.query.teamId));
    }
    if (router.query.portfolioId) {
      setPortfolioId(Number(router.query.portfolioId));
    }
  }, [router.query]);

  useEffect(() => {
    if (teamId && portfolioId) {
      PortfolioApi.getPortfolio(portfolioId)
        .then((portfolio) => {
          if (portfolio) {
            let media = "";
            if (portfolio.imageUrl) {
              setImageUrl(
                PortfolioApi.getPortfolioImageUrl(portfolio.imageUrl)
              );
              media = "image";
            } else if (portfolio.videoLink) {
              media = "video";
            }
            reset({
              ...portfolio,
              privacy: portfolio.privacy.toString(),
              media: media,
            });
            setPortfolio(portfolio);
          } else {
            toast.error("failed get portfolio info");
          }
        })
        .catch((err) => {
          toast.error("failed get portfolio info");
        });
    }
  }, [portfolioId, reset, teamId]);

  const onSubmit = async () => {
    const data = await PortfolioApi.updatePortfolio(
      {
        ...watch(),
        imageUrl: imageUrl.length > 0 ? portfolio?.imageUrl : null,
      } as IPortfolio,
      teamId,
      portfolioId
    );
    if (image) {
      await PortfolioApi.postImage(image, data.id);
    }
    if (data === null) {
      toast.error("Portfolio update failed!");
    } else {
      reset();
      toast.success("Portfolio updated successfully!");
      router.push(`/team/${teamId}/dashboard/portfolio/${data.id}`);
    }

    teamApi.getTeam(teamId).then((team) => {
      dispatch(setTeam(team.data));
    });
  };
  const handleCancel = () => {
    router.push(`/team/${teamId}/dashboard/portfolio/${portfolioId}`);
  };

  const handleFileChange = (e: any) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <ManagePortfolio>
      <div>
        <div className="lg:border-b-0 border-b mb-2 pb-2 font-nunito">
          <h1 className="text-3xl">Add a New Portfolio Item</h1>
          <Typography className="text-xl my-3">
            Share your latest exciting work.
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="">
              <div className="border-b flex items-center font-medium text-lg">
                <PersonOutlineOutlined className="font-sm mr-2" />
                <span>Client Details</span>
              </div>
              <div className="my-2 pl-4">
                <InputFieldCol
                  label={"Client Team"}
                  register={register("companyName")}
                  errors={errors.companyName}
                  placeholder="Team name"
                  watch={watch("companyName")}
                  maxLength={50}
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
                <DesktopWindowsOutlined className="font-sm mr-2" />
                <span>Portfolio Item Details</span>
              </div>
              <div className="my-2 pl-4">
                <InputFieldCol
                  label={"Title"}
                  register={register("title")}
                  errors={errors.title}
                  placeholder="Enter a Title for this Portfolio Item"
                  watch={watch("title")}
                  maxLength={50}
                />

                <SelectCustom
                  label={"Category"}
                  valueList={skills.map((item) => item.skillName)}
                  placeholder={"Select category"}
                  register={register("category")}
                  errors={errors.category}
                  name={"category"}
                  clearError={clearErrors}
                  setValue={setValue}
                  type={1}
                />

                <SelectCustom
                  label={"Estimated Project Size"}
                  register={register("estimate")}
                  valueList={costEstimate}
                  placeholder=" Select size of project "
                  errors={errors.estimate}
                  clearError={clearErrors}
                  setValue={setValue}
                  name={"estimate"}
                  type={1}
                />
                <div className="flex lg:w-[600px] lg:flex-row flex-col w-full items-start justify-between ">
                  <ThemeProvider theme={theme}>
                    <div className="font-medium xs:w-fit w-full">
                      <label
                        htmlFor="startDate"
                        className="text-primary xs:min-w-[130px] flex justify-between py-2 md:py-0"
                      >
                        Start Date
                        <span className="text-sm text-gray-300">optional</span>
                      </label>
                      <div className="xs:w-fit w-full flex flex-col relative">
                        {/*   <input
                        id="startDate"
                        type="month"
                        {...register("startDate")}
                        className={` bg-[#0000000d] text-[#606060] pl-3 pr-8 py-2 mt-1 rounded-3xl outline-none `}
                      />
 */}
                        <div className="bg-[#0000000d] text-[#606060] pl-3 pr-6 py-1 mt-1 rounded-3xl outline-none">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              {...register("startDate")}
                              className="Mui-selected MuiTypography-root MuiPickersDay-root MuiIconButton-root"
                              inputFormat="MM/dd/yyyy"
                              value={
                                new Date(
                                  watch("startDate") === null
                                    ? ""
                                    : watch("startDate")
                                )
                              }
                              onChange={(e) => {
                                setValue("startDate", e?.toDateString(), {
                                  shouldValidate: true,
                                });
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                        {errors.startDate && (
                          <span className="text-red-500 text-left text-sm font-normal mt-1">
                            {errors.startDate?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="font-medium xs:w-fit w-full">
                      <label
                        htmlFor="endDate"
                        className="text-primary xs:min-w-[130px] flex justify-between py-2 md:py-0"
                      >
                        End Date
                        <span className="text-sm text-gray-300">optional</span>
                      </label>
                      <div className="xs:w-fit w-full flex flex-col relative">
                        <div className="bg-[#0000000d] text-[#606060] pl-3 pr-6 py-1 mt-1 rounded-3xl outline-none Mui-focused ">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              {...register("endDate")}
                              className="Mui-selected MuiTypography-root MuiPickersDay-root MuiIconButton-root MuiPickersDay-today"
                              inputFormat="MM/dd/yyyy"
                              value={
                                new Date(
                                  watch("endDate") === null
                                    ? ""
                                    : watch("endDate")
                                )
                              }
                              onChange={(e) => {
                                setValue("endDate", e?.toDateString(), {
                                  shouldValidate: true,
                                });
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                        {errors.endDate && (
                          <span className="text-red-500 text-left text-sm font-normal mt-1">
                            {errors.endDate?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </ThemeProvider>
                </div>
                <div className="items-center my-4 font-medium">
                  <label
                    htmlFor="descripton"
                    className="text-primary min-w-[130px] block py-2 md:py-0"
                  >
                    Descripton
                  </label>
                  <div className="xs:w-fit w-full flex items-center justify-center flex-col relative">
                    <textarea
                      id="descripton"
                      {...register("description")}
                      placeholder="Tell a great story about this Portfolio Item."
                      maxLength={2000}
                      className={`sm:min-w-[400px] custom-scrollbar-des lg:min-w-[600px] w-full pl-3 pr-8 py-2 bg-[#0000000d] min-h-[150px] rounded-3xl outline-none text-[#606060]`}
                    />
                    <div className="absolute right-0 bottom-0  m-2 text-gray-400 text-sm font-normal">
                      {watch("description") ? watch("description").length : 0}/
                      {2000}
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
                        value={"video"}
                        {...register("media")}
                        className="peer"
                      />
                      <label htmlFor="videoLinkField" className="pl-1">
                        Video Link
                      </label>
                      <div className="xs:w-fit w-full hidden flex-col relative peer-checked:flex">
                        <input
                          id="videoLink"
                          {...register("videoLink")}
                          maxLength={300}
                          className={`sm:min-w-[400px] lg:min-w-[600px] w-full  pl-3 pr-16 py-2 bg-[#0000000d] rounded-3xl outline-none text-[#606060] `}
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
                        value={"image"}
                        className="peer"
                        {...register("media")}
                      />
                      <label htmlFor="imageField" className="pl-1">
                        Image
                      </label>
                      <div className="hidden items-center font-normal justify-between peer-checked:flex">
                        <UploadImage
                          createObjectURL={imageUrl}
                          uploadToClient={handleFileChange}
                          setCreateObjectURL={setImageUrl}
                          setImage={setImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="border-b flex items-center font-medium text-lg">
                <LockOutlined className="font-sm mr-2" />
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
            <div className="flex xxs:flex-row flex-col-reverse items-center justify-end p-4">
              <button
                className="bg-white px-16 py-3 hover:text-[#848abd] "
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel();
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 w-fit bg-[#848abd] rounded-full text-white  flex justify-center items-center cursor-pointer border-2 border-[#848abd]
               disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]"
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                Save Portfolio Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </ManagePortfolio>
  );
};

export default PortfolioEdit;
