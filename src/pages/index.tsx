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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@/redux/hooks";
import { getSkillsIsLoadedSelector, getSkillsSelector } from "@/redux/selector";
import { useRouter } from "next/router";
import { Collapse } from "@mui/material";
import React, { FormEvent, LegacyRef, Ref, useEffect } from "react";
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

  const handleSearchItems = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  console.log("skillList", skillList);
  return (
    <Layout>
      <header
        className="absolute bg-[#e6e6e6] top-0 left-0 right-0 bottom-0 overflow-hidden bg-center bg-cover w-full h-fit md:h-screen"

        // style={{
        //   backgroundImage:
        //     "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
        // }}
      >
        <div className="relative top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed  font-nunito">
          <div className="inline-block mt-20 xxs:flex xxs:justify-center xxs:flex-col  h-full transition animate-slide-in-up z-[1000]">
            <div className="text-center text-black px-6 mt-16 md:px-12">
              <h1 className="text-xl md:text-4xl font-semibold mt-6 mb-3 cursor-pointer hover:underline">
                <a href="https://kryptohub.co/">
                  Welcome to KryptoHub{" "}
                  <ArrowForwardIosOutlined className="text-sm" />
                </a>
              </h1>
            </div>
            <div className="p-4 flex items-center justify-center py-20 text-black ">
              <div className="">
                <h1 className="text-4xl font-700 mb-5">
                  The only resource you need to find the right company.
                </h1>
                <h2 className="text-base text-black mb-5">
                  Choose the best-fit company for your business using 98,000+
                  client reviews from real people.
                </h2>
                <div className="flex lg:flex-row flex-col items-start lg:items-center ">
                  <h2 className="text-black mr-3 min-w-[115px]">
                    I am looking for
                  </h2>
                  <div className="flex md:flex-row flex-col w-full ">
                    <div className="w-full flex flex-col justify-center relative">
                      <div
                        className="relative"
                        ref={nodeRef as LegacyRef<HTMLDivElement>}
                      >
                        <SearchIcon className="absolute left-2 bottom-[6px] text-[#848abd] " />
                        <input
                          className=" appearance-none min-w-[300px] bg-[#ecedee] text-[#606060] border-2 border-[#848abd] rounded-3xl mr-3 block w-full pl-8 px-3 py-2 pr-8 border-solid placeholder-gray-500 focus:outline-none focus:border-[#848abd]  md:mt-0 mt-4 sm:text-sm placeholder:text-xs custom-scrollbar"
                          placeholder="e.g. App Development, UX design, IT services..."
                          autoComplete="off"
                          onClick={() => setShow(true)}
                          {...register("skill")}
                          onChange={handleSearchItems}
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
                            className="absolute right-2 bottom-[8px] mb-[1px] text-[#08537e] text-[20px]"
                          />
                        )}

                        <Collapse
                          in={show}
                          className={`${
                            show ? "absolute" : "hidden"
                          } bg-white rounded-xl h-[50vh] -top-[50vh] w-full  overflow-auto z-20 custom-scrollbar shadow-lg !font-nunito `}
                          ref={subNodeRef as Ref<unknown>}
                        >
                          <h1
                            className={`text-xs pl-2 px-1 text-[#848ABD] mt-1 mb-1 ${
                              SkillSelectIsLoaded && skillList?.length === 0
                                ? "hidden"
                                : "block"
                            }`}
                          >
                            Popular Skill
                          </h1>
                          {SkillSelectIsLoaded && skillList?.length === 0 ? (
                            <div className="text-[#848ABD] text-sm pl-1 py-1 mb-1">
                              No matching results
                            </div>
                          ) : (
                            SkillSelectIsLoaded &&
                            skillList?.map((item, index) => (
                              <InputSelect
                                key={index}
                                item={item}
                                setShow={() => setShow(false)}
                                setValue={() =>
                                  setValue("skill", item.skillName)
                                }
                                label={"skill"}
                                setSearchText={setSearchText}
                              />
                            ))
                          )}
                        </Collapse>
                      </div>
                    </div>
                    <h2 className="text-black mx-3 md:flex items-center hidden ">
                      in
                    </h2>
                    {/* <select
                      className="appearance-none mr-3 min-w-[190px] font-nunito bg-[#ecedee] text-[#606060] border-2 border-[#848abd] rounded-3xl relative block w-full px-3 py-2  border-solid placeholder-gray-500 md:mt-0 mt-3  focus:outline-none focus:border-[#848abd]  focus:z-10 sm:text-sm"
                      {...register("timeZone")}
                    >
                      <option className="font-nunito">--Timezone--</option>
                      {Object.values(TimeZone).map((cur, index) => (
                        <option key={index} value={cur} className="font-nunito">
                          {cur}
                        </option>
                      ))}
                    </select> */}
                    <SelectCustom
                      label={""}
                      register={register("timeZone")}
                      valueList={Object.values(TimeZone)}
                      placeholder=" Select timezone"
                      setValue={setValue}
                      name={"timeZone"}
                      clearError={clearErrors}
                      type={2}
                    />
                    <button
                      className="px-10 min-w-[150px] py-2 mr-2 bg-[#848abd] text-white mt-2 md:mt-0 rounded-3xl w-full font- hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]"
                      onClick={() => {
                        router.push(
                          `teams?skill=${watch("skill")}&timezone=${watch(
                            "timeZone"
                          )}`
                        );
                      }}
                    >
                      Find Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className=" bg-[#f9fafb] h-full pt-[calc(100vh_+_50px)] flex flex-col items-center justify-center z-0">
        <div className="block relative w-full   my-5 py-5 font-nunito">
          <div className="w-full text-center my-[70px] px-3 ">
            <h2 className="text-3xl font-normal mb-6 text-black">
              Start Your Search With Our Most Popular Services
            </h2>
            <p className="mb-4 text-black">
              From development to marketing, find your next business partner on
              Kryptohub.
            </p>
            <Link href="/teams">
              <a className="text-black hover:underline">
                Browse All Services{" "}
                <ArrowForwardIosOutlined className="text-sm" />
              </a>
            </Link>
          </div>
          <div className="w-full my-[70px]">
            <div className="px-3 md:px-[30px] grid grid-rows-1 md-2:grid-cols-2 md-3:grid-cols-3">
              {Object.keys(categoty).map((item, index) => (
                <>
                  <div key={index} className="block md:flex w-full px-4 mb-5 ">
                    <div className="px-0 md:px-3">
                      <div className="w-20 h-20 bg-[#eff0f5] rounded-circle block relative mx-auto">
                        {categoty[item].icon}
                      </div>
                    </div>
                    <div className="px-0 md:px-3">
                      <h3 className="text-black text-center md:text-left text-xl font-normal mb-2 font-nunito">
                        {item}
                      </h3>
                      <div className="text-black text-center md:text-left text-sm font-normal">
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
  );
};

export default Home;

// className="w-6 h-6 absolute top-7 left-7"
