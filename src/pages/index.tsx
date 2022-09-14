import { TimeZone } from "@/type/enum/TimeZone";
import {
  ArrowForwardIosOutlined,
  ChatOutlined,
  Code,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../layouts/layout";
import * as yub from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@/redux/hooks";
import { getSkillsIsLoadedSelector, getSkillsSelector } from "@/redux/selector";
import { useRouter } from "next/router";
import {
  Autocomplete,
  Collapse,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, {
  FormEvent,
  LegacyRef,
  Ref,
  SyntheticEvent,
  useEffect,
} from "react";
import { useOutsideClick } from "hook/OuterClick";
import CloseIcon from "@mui/icons-material/Close";
import { InputSelect } from "../layouts/team/InputSelect";
import SettingsIcon from "@mui/icons-material/Settings";
import useWindowSize from "../layouts/Header";
import { ISkill } from "@/type/skill/skill.types";
import SelectCustom from "@/src/layouts/team/SelectCustom";

const schema = yub.object().shape({
  skill: yub.string(),
  timeZone: yub.string(),
});

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: "100%",
          paddingRight: "10px",
        },
        input: {
          width: "100%",
          background: "#ecedee",
        },
        inputFocused: {
          background: "transparent",
          outline: "none",
        },
      },
    },
  },
});

const categoty: {
  [id: string]: {
    id: string;
    icon: JSX.Element;
    category: string[];
  };
} = {
  Development: {
    id: "1",
    icon: <Code className="w-6 h-6 absolute top-7 left-7" />,
    category: [
      "Mobile App Development",
      "Software Development",
      "Web Development",
      "AR/VR",
      "Artificial Intelligence",
      "Blockchain",
    ],
  },
  "Design & Production": {
    id: "2",
    icon: <SettingsIcon className="w-6 h-6 absolute top-7 left-7" />,
    category: [
      "Web Design",
      "User Experience Design",
      "Logo Design",
      "Graphics Design",
      "Design & Production",
      "Digital Design",
    ],
  },
  Marketing: {
    id: "3",
    icon: <CloseIcon className="w-6 h-6 absolute top-7 left-7" />,
    category: [
      "Digital Marketing",
      "SEO",
      "Social Media Marketing",
      "Mobile Marketing",
      "Content Marketing",
      "Search Marketing",
    ],
  },
  Advertising: {
    id: "4",
    icon: <SearchIcon className="w-6 h-6 absolute top-7 left-7" />,
    category: [
      "Advertising",
      "Branding",
      "Creative Services",
      "Video Production",
      "Public Relations",
      "Media Production",
    ],
  },
  "Business Services": {
    id: "5",
    icon: <ArrowForwardIosOutlined className="w-6 h-6 absolute top-7 left-7" />,
    category: [
      "Mobile App Development",
      "Software Development",
      "Web Development",
      "AR/VR",
      "Artificial Intelligence",
      "Blockchain",
    ],
  },
  "IT Services": {
    id: "6",
    icon: <ChatOutlined className="w-6 h-6 absolute top-7 left-7" />,
    category: [
      "Web Design",
      "User Experience Design",
      "Logo Design",
      "Graphics Design",
      "Design & Production",
      "Digital Design",
    ],
  },
};

const color = [
  "border-blue-500",
  "border-blue-900",
  "border-green-900",
  "border-blue-500",
  "border-cyan-900",
  "border-cyan-500",
];
const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    resetField,
    clearErrors,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const router = useRouter();

  const skill = useAppSelector(getSkillsSelector);
  const SkillSelectIsLoaded = useAppSelector(getSkillsIsLoadedSelector);

  const [skillList, setSkillList] = React.useState(skill);

  const [searchText, setSearchText] = React.useState("");

  const { show, setShow, nodeRef, subNodeRef } = useOutsideClick();

  const [showTimeZone, setShowTimeZone] = React.useState(false);

  React.useEffect(() => {
    if (SkillSelectIsLoaded) {
      setSkillList(skill);
    }

    setSkillList(
      skill?.filter((item) =>
        item.skillName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, skill, SkillSelectIsLoaded]);

  const handleSearchItems = (even: SyntheticEvent<Element, Event>) => {
    setSearchText((even.target as HTMLElement).innerText);
    console.log((even.target as HTMLElement).innerText);
  };
  const handleStepSubmit = (data: any) => {
    router.push(`teams?skill=${data.skill}&timezone=${data.timeZone}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <header
          className="absolute bg-[#e6e6e6] top-0 left-0 right-0 bottom-0 overflow-hidden bg-center bg-cover w-full h-screen"

          // style={{
          //   backgroundImage:
          //     "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
          // }}
        >
          <div className="relative top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed  font-nunito">
            <div className=" text-center mt-20 flex justify-center flex-col  h-full transition animate-slide-in-up z-[1000]">
              <div className="text-center text-black px-6 my-10 md:px-12">
                <h1 className="text-lg xxs:text-xl 3xl:text-6xl md:text-4xl font-semibold my-3 cursor-pointer hover:underline 3xl:tracking-wide">
                  <a href="https://kryptohub.co/">
                    Welcome to KryptoHub{" "}
                    <ArrowForwardIosOutlined className="text-sm" />
                  </a>
                </h1>
              </div>
              <div className="px-1 md:px-4 flex items-center justify-center mb-28 text-black w-full ">
                <div>
                  <div className="w-4/5 mx-auto xs:w-full">
                    <h1 className="text-base xxs:text-xl md:text-3xl 3xl:text-6xl 3xl:tracking-wide font-700 mb-5 3xl:my-10">
                      The only resource you need to find the right company.
                    </h1>
                  </div>
                  <div className="w-4/5 mx-auto xs:w-full">
                    <h2 className="text-sm xxs:text-base md:text-xl 3xl:text-3xl 3xl:tracking-wide text-black mb-5 3xl:my-10">
                      Choose the best-fit company for your business using
                      98,000+ client reviews from real people.
                    </h2>
                  </div>
                  <div className="flex lg:flex-row flex-col items-start lg:items-center w-full 3xl:my-10">
                    <h2 className="text-black text-base mx-3 pl-3 xxs:pl-0 min-w-[115px]  text-left w-4/5 xxs:w-[10%] 3xl:text-xl">
                      I am looking for
                    </h2>
                    <form
                      onSubmit={handleSubmit(handleStepSubmit)}
                      className="flex md:flex-row items-center flex-col w-full h-auto 3xl:w-[90%]"
                    >
                      <div className="w-4/5 xxs:w-full md:w-2/5  flex flex-col justify-center relative">
                        <div className="relative h-auto">
                          <SearchIcon className="absolute left-2 bottom-[7px] 3xl:bottom-[17px] text-[#848abd] " />
                          <Controller
                            name="skill"
                            control={control}
                            render={({
                              field: { ref, onChange, ...field },
                            }) => (
                              <Autocomplete
                                options={skillList.map(
                                  (option) => option.skillName
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                                onChange={(e, v) => onChange(v)}
                                renderInput={(params) => (
                                  <div
                                    className="bg-[#ecedee] text-[#606060] border-2 border-[#848abd] rounded-3xl mr-3 block w-full pl-8 px-3 py-2 3xl:py-4 pr-8 border-solid placeholder-gray-500 focus:outline-none focus:border-[#848abd]  md:mt-0 mt-4 sm:text-sm 3xl:text-lg placeholder:text-xs 3xl:placeholder:text-2xl custom-scrollbar"
                                    ref={params.InputProps.ref}
                                  >
                                    <input
                                      placeholder="e.g. App Development, UX design, IT services..."
                                      {...params.inputProps}
                                    />
                                  </div>
                                )}
                              />
                            )}
                          />

                          {searchText.length > 0 && (
                            <CloseIcon
                              onClick={() => {
                                resetField("skill");
                                setSearchText("");
                                if (SkillSelectIsLoaded) {
                                  setSkillList(skill);
                                }
                              }}
                              className="absolute right-4 bottom-[10px] 3xl:bottom-[17px] 3xl:right-5 mb-[1px] text-[#08537e] text-[20px]"
                            />
                          )}
                        </div>
                      </div>
                      <h2 className="text-black 3xl:text-xl mx-3 md:flex items-center hidden ">
                        in
                      </h2>
                      <div className="w-4/5 xxs:w-full md:w-2/5">
                        <Controller
                          name="timeZone"
                          control={control}
                          render={({ field: { ref, onChange, ...field } }) => (
                            <Autocomplete
                              options={Object.values(TimeZone)}
                              onChange={(e, v) => onChange(v)}
                              renderInput={(params) => (
                                <div
                                  className="bg-[#ecedee] text-[#606060] border-2 border-[#848abd] rounded-3xl mr-3 block w-full  px-3 py-2 3xl:py-4 border-solid placeholder-gray-500 focus:outline-none focus:border-[#848abd]  md:mt-0 mt-4 sm:text-sm 3xl:text-lg placeholder:text-xs 3xl:placeholder:text-2xl custom-scrollbar"
                                  ref={params.InputProps.ref}
                                >
                                  <input
                                    placeholder="Select timezone"
                                    {...params.inputProps}
                                  />
                                </div>
                              )}
                            />
                          )}
                        />
                        {/* <Autocomplete
                          options={Object.values(TimeZone)}
                          renderInput={(params) => (
                            <div
                              className="bg-[#ecedee] text-[#606060] border-2 border-[#848abd] rounded-3xl mr-3 block w-full  px-3 py-2 3xl:py-4 border-solid placeholder-gray-500 focus:outline-none focus:border-[#848abd]  md:mt-0 mt-4 sm:text-sm 3xl:text-lg placeholder:text-xs 3xl:placeholder:text-2xl custom-scrollbar"
                              ref={params.InputProps.ref}
                            >
                              <input
                                {...register("timeZone")}
                                placeholder="Select timezone"
                                {...params.inputProps}
                              />
                            </div>
                          )}
                        /> */}
                      </div>
                      <div className="w-4/5 xxs:w-full md:w-1/5">
                        <button
                          type="submit"
                          className="px-10 md:px-4 3xl:text-2xl py-2 3xl:py-3 mr-2 bg-[#848abd] text-white mt-2 md:mt-0 rounded-3xl w-full  font-nunito hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]"
                          // onClick={() => {
                          //   router.push(
                          //     `teams?skill=${watch("skill")}&timezone=${watch(
                          //       "timeZone"
                          //     )}`
                          //   );
                          // }}
                        >
                          Find Team
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className=" bg-[#f9fafb] h-fit 3xl:h-[calc(190vh_+_10px)]  pt-[calc(90vh_-_10px)] pb-[20px] flex flex-col items-center justify-center z-0">
          <div className="flex flex-col relative w-full py-[70px] font-nunito">
            <div className="w-full text-center my-5  md:my-[70px] px-3 ">
              <h2 className="text-xl md:text-3xl 3xl:text-6xl font-normal mb-6 text-black">
                Start Your Search With Our Most Popular Services
              </h2>
              <p className="mb-4 text-black text-lg 3xl:text-3xl">
                From development to marketing, find your next business partner
                on Kryptohub.
              </p>
              <Link href="/teams">
                <a className="text-black hover:underline text-lg 3xl:text-3xl">
                  Browse All Services{" "}
                  <ArrowForwardIosOutlined className="text-sm" />
                </a>
              </Link>
            </div>
            <div className="w-full my-10  md:my-[70px]">
              <div className="px-3 md:px-[30px] grid grid-rows-1 md-2:grid-cols-2 md-3:grid-cols-3">
                {Object.keys(categoty).map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="block md:flex w-full px-4 mb-5 "
                    >
                      <div className="px-0 py-3 md:px-3">
                        <div className="w-20 h-20  bg-[#eff0f5] rounded-circle block relative mx-auto">
                          {categoty[item].icon}
                        </div>
                      </div>
                      <div className="px-0 py-3 md:px-3">
                        <h3 className="text-black text-center md:text-left text-lg 3xl:text-3xl font-normal mb-2 font-nunito">
                          {item}
                        </h3>
                        <div className="text-black text-center md:text-left text-sm 3xl:text-xl font-normal">
                          {categoty[item].category.map((item, index) => (
                            <span key={index} className="font-nunito">
                              {item},{" "}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default Home;

// className="w-6 h-6 absolute top-7 left-7"
