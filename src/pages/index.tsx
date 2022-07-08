import { TimeZone } from "@/type/enum/TimeZone";
import { ArrowForwardIosOutlined, Code } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import type { NextPage } from "next";
import Link from "next/link";
import { Collapsor } from "../layouts/Collapsor";
import { Layout } from "../layouts/layout";

const categoty: { [id: string]: string[] } = {
  Development: [
    "Mobile App Development",
    "Software Development",
    "Web Development",
    "AR/VR",
    "Artificial Intelligence",
    "Blockchain",
  ],
  "Design & Production": [
    "Web Design",
    "User Experience Design",
    "Logo Design",
    "Graphics Design",
    "Design & Production",
    "Digital Design",
  ],
  Marketing: [
    "Digital Marketing",
    "SEO",
    "Social Media Marketing",
    "Mobile Marketing",
    "Content Marketing",
    "Search Marketing",
  ],
  Advertising: [
    "Advertising",
    "Branding",
    "Creative Services",
    "Video Production",
    "Public Relations",
    "Media Production",
  ],
  "Business Services": [
    "Mobile App Development",
    "Software Development",
    "Web Development",
    "AR/VR",
    "Artificial Intelligence",
    "Blockchain",
  ],
  "IT Services": [
    "Web Design",
    "User Experience Design",
    "Logo Design",
    "Graphics Design",
    "Design & Production",
    "Digital Design",
  ],
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
  return (
    <Layout>
      <div className="bg-cyan-700 flex items-center justify-center">
        <h1 className=" p-2 md:w-11/12 lg:w-5/6 text-white  font-bold">
          Welcome to KryptoHub <ArrowForwardIosOutlined className="text-sm" />
        </h1>
      </div>
      <div>
        <div className="p-4 flex items-center justify-center py-24 bg-gradient-to-b from-white to-[#3e839e2b] border border-[#3e839e2b] shadow-lg shadow-gray-200">
          <div className="">
            <h1 className="text-4xl font-700 mb-5">
              The only resource you need to find the right company.
            </h1>
            <h2 className="text-base text-gray-600 mb-5">
              Choose the best-fit company for your business using 98,000+ client
              reviews from real people.
            </h2>
            <div className="flex lg:flex-row flex-col items-start lg:items-center">
              <h2 className="text-gray-600 mr-3 min-w-[115px]">
                I am looking for
              </h2>
              <div className="flex md:flex-row flex-col w-full ">
                <div className="w-full flex flex-col justify-center relative">
                  <SearchIcon className="absolute left-2 bottom-[6px] text-[#08537e] " />
                  <input
                    className="appearance-none min-w-[300px] border-2 border-[#cae0e7] mr-3 block w-full pl-8 px-3 py-2 border-solid placeholder-gray-500 text-gray-900 focus:outline-none focus:border-black  md:mt-0 mt-4 sm:text-sm placeholder:text-xs"
                    placeholder="e.g.App Development, UX design, IT services..."
                    type="search"
                  />
                </div>
                <h2 className="text-gray-600 mx-3 md:flex items-center hidden">
                  in
                </h2>
                <select className="appearance-none mr-3 min-w-[190px] border-2 border-[#cae0e7] relative block w-full px-3 py-2  border-solid placeholder-gray-500 md:mt-0 mt-3 text-gray-900  focus:outline-none focus:border-black  focus:z-10 sm:text-sm">
                  <option value="">--Timezone--</option>
                  {Object.values(TimeZone).map((cur, index) => (
                    <option key={index} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>

                <button className="px-10 min-w-[150px] py-2 mr-2 bg-red-500 text-white mt-2 md:mt-0 rounded-sm w-full">
                  Find Team
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center py-16">
          <div className="w-3/4">
            <div className="flex flex-col xl:flex-row ">
              <div className="w-full xl:w-1/3 ">
                <h2 className="text-3xl font-normal mb-4">
                  Start Your Search With Our Most Popular Services
                </h2>
                <p className="mb-4 text-gray-600">
                  From development to marketing, find your next business partner
                  on Kryptohub.
                </p>
                <Link href="/teams">
                  <a className="text-cyan-600 hover:underline">
                    Browse All Services{" "}
                    <ArrowForwardIosOutlined className="text-sm" />
                  </a>
                </Link>
              </div>
              <div className="w-16"></div>
              <div className="flex-1 grid md:grid-cols-2 grid-cols-1 gap-8">
                {Object.keys(categoty).map((key, index) => (
                  <Collapsor
                    key={index}
                    label={key}
                    color={color[index]}
                    isOpen={true}
                    preIcon={<Code />}
                  >
                    {categoty[key].map((item, i) => (
                      <Link key={i} href={"/"}>
                        <a className="block text-cyan-700 text-lg p-2 hover:underline">
                          {item}
                        </a>
                      </Link>
                    ))}
                  </Collapsor>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
