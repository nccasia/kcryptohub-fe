import SearchIcon from "@mui/icons-material/Search";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import {
  Rating,
} from "@mui/material";
import {
  AccessAlarm,
  Bookmark,
  ContactlessOutlined,
  InfoOutlined,
  KeyboardArrowDownOutlined,
  LanguageOutlined,
  LocalOffer,
  LocationOnOutlined,
  Menu,
  StarBorderOutlined,
} from "@mui/icons-material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useState } from "react";
const data = [
  {
    companyName: "Algoworks",
    logo: "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/200-x-200.png",
    url: "https://algoworks.com/",
    description: "Go Mobile. Go Cloud. Go Digital",
    rating: 4.9,
    reviewCount: 67,
    isVerified: true,
    stats: {
      minProjectSize: 10000,
      minHourlyRate: 25,
      maxHourlyRate: 49,
      employees: "250 - 999",
      location: "Sunnyvale, CA",
    },
    serviceFocus: [
      {
        name: "Mobile App Development",
        percent: 60,
      },
      {
        name: "Web Development",
        percent: 30,
      },
      {
        name: "CRM Consulting and Sl",
        percent: 10,
      },
    ],
    quote: {
      content: "They’re always hands-on, and their resources are go-getters",
      author: "Co-Founder, 4té",
    },
  },
  {
    companyName: "Hyperlink InfoSystem",
    logo: "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/logo_new.jpg",
    url: "https://algoworks.com/",
    description: "Best Android & iPhone App Development Services",
    rating: 4.8,
    reviewCount: 110,
    isVerified: true,
    stats: {
      minProjectSize: 10000,
      minHourlyRate: null,
      maxHourlyRate: 25,
      employees: "250 - 999",
      location: "Ahmedabad, India",
    },
    serviceFocus: [
      {
        name: "Mobile App Development",
        percent: 60,
      },
      {
        name: "AR/VR Development",
        percent: 10,
      },
      {
        name: "Blockchain",
        percent: 10,
      },
      {
        name: "CRM Consulting and Sl",
        percent: 10,
      },
      {
        name: "Custom Software Development",
        percent: 10,
      },
    ],
    quote: {
      content:
        "Their development team understands the requirements first and develops a solution that matches client expectations.",
      author: "Co-Founder & CTO, Cryptocurrency Company",
    },
  },
  {
    companyName: "Algoworks",
    logo: "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/200-x-200.png",
    url: "https://algoworks.com/",
    description: "Go Mobile. Go Cloud. Go Digital",
    rating: 4.9,
    reviewCount: 67,
    isVerified: true,
    stats: {
      minProjectSize: 10000,
      minHourlyRate: 25,
      maxHourlyRate: 49,
      employees: "250 - 999",
      location: "Sunnyvale, CA",
    },
    serviceFocus: [
      {
        name: "Mobile App Development",
        percent: 60,
      },
      {
        name: "Web Development",
        percent: 30,
      },
      {
        name: "CRM Consulting and Sl",
        percent: 10,
      },
    ],
    quote: {
      content: "They’re always hands-on, and their resources are go-getters",
      author: "Co-Founder, 4té",
    },
  },
  {
    companyName: "Hyperlink InfoSystem",
    logo: "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/logo_new.jpg",
    url: "https://algoworks.com/",
    description: "Best Android & iPhone App Development Services",
    rating: 4.8,
    reviewCount: 110,
    isVerified: true,
    stats: {
      minProjectSize: 10000,
      minHourlyRate: null,
      maxHourlyRate: 25,
      employees: "250 - 999",
      location: "Ahmedabad, India",
    },
    serviceFocus: [
      {
        name: "Mobile App Development",
        percent: 60,
      },
      {
        name: "AR/VR Development",
        percent: 10,
      },
      {
        name: "Blockchain",
        percent: 10,
      },
      {
        name: "CRM Consulting and Sl",
        percent: 10,
      },
      {
        name: "Custom Software Development",
        percent: 10,
      },
    ],
    quote: {
      content:
        "Their development team understands the requirements first and develops a solution that matches client expectations.",
      author: "Co-Founder & CTO, Cryptocurrency Company",
    },
  },
];
const serviceFocusColor = [
  "#1b85ce",
  "#08537e",
  "#267c87",
  "#5d997e",
  "#62ba56",
];

export const Teams = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="">
        <div className="bg-cyan-900 text-white ">
          <div className="flex flex-col items-center justify-center w-full border-b border-cyan-700">
            <div className="flex md:flex-row flex-col md:items-center items-start justify-center w-full md:w-4/5 px-2 pt-2">
              <div className="flex justify-between w-full md:w-auto">
                <Menu className="md:hidden" onClick={()=>{setShowMenu(!showMenu); console.log(showMenu)}}/>
                <h1 className="" >KryptoHub</h1>
                <SearchIcon className="md:hidden"/>
              </div>
              <div className={`${showMenu ? 'flex' : 'hidden'} md:flex flex-col flex-1`}>
                <div className="flex flex-row items-center justify-end text-cyan-600">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search"
                      className="shadow appearance-none border  w-full focus:outline-none focus:shadow-outline bg-transparent pl-2"
                    />
                    <div className="ml-[-1.5rem]">
                      <SearchIcon fontSize="sm" />
                    </div>
                  </div>
                  <div className="px-8 uppercase tracking-wider text-xs">
                    <span>Leave a review</span>
                    <CreateOutlinedIcon fontSize="sm" />
                  </div>
                  <div className="uppercase tracking-wider text-xs">
                    <span>Sign in</span>
                    <PersonOutlineIcon fontSize="sm" />
                  </div>
                </div>
                <div className="flex xs:flex-row flex-col md:items-center items-start justify-end font-semibold xl:text-xl pt-4 px-4 lg:text-lg text-md ">
                  <div className="cursor-pointer group relative">
                    <div className="">
                      <span>More in Mobile App Developers</span>
                      <KeyboardArrowDownOutlined className="text-red-800 " />
                    </div>
                    <div className="absolute w-full h-20 bg-cyan-600 hidden group-hover:block"></div>
                  </div>
                  <div className="border-l border-cyan-700 px-2 cursor-pointer">
                    <span>Other Categories</span>
                    <KeyboardArrowDownOutlined className="text-red-800" />
                  </div>
                  <div className="border-l border-cyan-700 px-2 cursor-pointer">
                    <span>Resource</span>
                    <KeyboardArrowDownOutlined className="text-red-800" />
                  </div>
                  <div className="border-l border-cyan-700 px-2 cursor-pointer">
                    <span>
                      0 <BookmarkBorderOutlinedIcon className="text-red-800" />
                    </span>
                  </div>
                  <div className="border-l border-cyan-700 px-2 cursor-pointer">
                    <span>
                      0 <ChatOutlinedIcon className="text-red-800" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <div className="py-8 flex items-center justify-start text-white  font-semibold w-full md:w-4/5 px-2">
              <div className="p-4 border-2 border-red-500 w-32 h-12 flex items-center justify-center before:bg-cyan-300 before:h-1 before:w-1 before:rounded before:absolute before:top-[-2px] after:bg-cyan-700 after:h-3 after:w-[1px] after:absolute after:top-[2px]">
                <span>2022 Teams</span>
              </div>
              <div className="ml-4 text-3xl">
                <h1>List Teams</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center border-b-4 border-cyan-900">
          <div className="xl:w-3/4 md:w-11/12 lg:w-5/6 w-full border-x-2 p-8">
            <div className="md:w-3/4 w-full text-cyan-900 text-sm">
              <p>
                Are you wondering how to create a mobile app? We've vetted over
                4,000 app development companies to help you find the best app
                developer for your needs. Use Clutch to create a shortlist of
                your top app development contenders, read detailed client
                reviews of each company, and view examples of past mobile app
                projects. Our research will help you find the right app
                developer for your project.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="container-lg relative border-x-2  xl:w-3/4 md:w-11/12 lg:w-5/6 w-full shadow-xl">
          <div className="sticky top-0 w-full flex flex-col text-cyan-700 bg-white z-10">
            <div className="flex flex-row border-b ">
              <div className="flex flex-row items-center justify-between">
                <div className="p-4 bg-cyan-900 text-white font-semibold">
                  <span>{data.length} Teams</span>
                </div>
              </div>
              <div
                className="flex-1 bg-white
              
              "
              ></div>
              <div className="flex flex-row items-center justify-center p-4 border-l">
                <div className="h-8 flex flex-row items-center justify-center text-sm">
                  <span className="px-1 flex items-center border-l border-y border-cyan-700 h-full">
                    Sort By
                  </span>
                  <select
                    className="px-1 flex items-center border border-cyan-700 h-full"
                    name="sort"
                    id=""
                  >
                    <option>Sponsor</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-row p-2 border-b  justify-start text-sm md:text-md">
              <div className="flex flex-row items-center justify-center">
                <input
                  type="text"
                  placeholder="Location"
                  className="shadow appearance-none border  w-full text-cyan-700 focus:outline-none focus:shadow-outline"
                />
                <div className="ml-[-2rem] flex items-center justify-center">
                  <SearchIcon />
                </div>
              </div>
              <div className="items-center justify-center border-2 border-cyan-800 px-2 ml-2 hidden xs:flex">
                <select name="service" id="">
                  <option value="">Services</option>
                </select>
              </div>
              <div className="items-center justify-center border-2 border-cyan-800 px-2 ml-2 hidden xs:flex">
                <select name="service" id="">
                  <option value="">Client Budget</option>
                </select>
              </div>
              <div className=" items-center justify-center border-2 border-cyan-800 px-2 ml-2 hidden xl:flex">
                <select name="service" id="">
                  <option value="">Hourly Rate</option>
                </select>
              </div>
              <div className=" items-center justify-center border-2 border-cyan-800 px-2 ml-2 hidden xl:flex">
                <select name="service" id="">
                  <option value="">Industry</option>
                </select>
              </div>
              <div className=" items-center justify-center border-2 border-cyan-800 px-2 ml-2 hidden xl:flex">
                <select name="service" id="">
                  <option value="">Reviews</option>
                </select>
              </div>
              <div className="flex items-center justify-center border-2 border-cyan-800 px-1 ml-2">
                <span>All Filter</span>
              </div>
              <div className="flex items-center justify-center ml-2">
                <span>Clear All</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {data.map((item, index) => (
              <div
                className="flex md:flex-row w-full border-y my-4 shadow-md flex-col"
                key={index}
              >
                <div className="flex-1">
                  <div className="flex xs:flex-row flex-col items-start border-b relative">
                    <div className="flex items-center justify-center p-2">
                      <img src={item.logo} alt="logo" />
                    </div>
                    <div className="flex flex-col w-full px-2">
                      <div className="flex flex-row ">
                        <div className="flex items-end">
                          <h1 className="text-3xl">{item.companyName}</h1>
                          <span className="text-cyan-700 ml-2">
                            {item.description}
                          </span>
                        </div>
                        <div className="absolute top-0 right-0 flex-1 text-right">
                          <span className="uppercase  text-xs font-semibold tracking-widest text-gray-400 mr-8 mt-[-1rem]">
                            Sponsor
                          </span>
                          <div className="absolute top-[-6px] right-2 group">
                            <BookmarkBorderOutlinedIcon className="group-hover:hidden" />
                            <Bookmark className="hidden text-white group-hover:block group-hover:bg-black" />
                            <div className="absolute right-0 w-48 h-16 hidden border border-black group-hover:block">
                              <div className=""></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end">
                        <h1 className="text-xl mr-2">{item.rating}</h1>
                        <Rating
                          value={item.rating}
                          readOnly
                          precision={0.1}
                          emptyIcon={<StarBorderOutlined />}
                        />
                        <a href="" className="ml-2">
                          {item.reviewCount} reviews{" "}
                          <ArrowForwardIosOutlinedIcon fontSize="small" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex xs:flex-row flex-col ">
                    <div className="flex flex-col text-sm p-4 xs:w-1/4">
                      <span className="text-red-500">
                        <CheckCircleOutlinedIcon /> Verified
                      </span>
                      <span className="text-cyan-500">
                        <LocalOffer />{" "}
                        {item.stats.minProjectSize.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                      <span className="text-cyan-500">
                        <AccessAlarm /> ${item.stats.minHourlyRate} - $
                        {item.stats.maxHourlyRate} / hr
                      </span>
                      <span className="text-cyan-500">
                        <PersonOutlineIcon /> {item.stats.employees}
                      </span>
                      <span className="text-cyan-500">
                        <LocationOnOutlined /> {item.stats.location}
                      </span>
                    </div>
                    <div className="flex flex-col items-start justify-start p-4 border-x xs:w-1/2 ">
                      <span>Service Focus</span>
                      <div className="w-full h-16  flex flex-row items-center justify-center border-x relative">
                        {item.serviceFocus.map((service, i) => (
                          <div
                            className="h-4 cursor-pointer group"
                            style={{
                              width: `${service.percent}%`,
                              backgroundColor: `${serviceFocusColor[i]}`,
                            }}
                            key={i}
                          >
                            <div className="absolute text-xs text-cyan-700 border-2 top-[-0.25rem] w-fit hidden group-hover:block">
                              {service.percent}% {service.name}
                            </div>
                          </div>
                        ))}
                      </div>
                      <span>
                        {
                          item.serviceFocus.sort(
                            (a, b) => b.percent - a.percent
                          )[0].percent
                        }
                        %{" "}
                        {
                          item.serviceFocus.sort(
                            (a, b) => b.percent - a.percent
                          )[0].name
                        }
                      </span>
                    </div>
                    <div className="xs:w-1/4 p-4 text-sm text-cyan-500">
                      <p className="text-base">“{item.quote.content}“</p>
                      <span>
                        {item.quote.author}{" "}
                        <CheckCircleOutlinedIcon color="error" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col border-l text-cyan-700 transition-all duration-500 ease-in-out text-sm xs:text-md">
                  <a className="px-2 flex items-center justify-start h-1/3 flex-1">
                    <span className="xs:p-4 px-2 w-full bg-red-500 font-semibold text-white flex justify-between cursor-pointer border-2 border-red-500 hover:bg-transparent hover:text-red-500">
                      Visit Website <LanguageOutlined fontSize="sm" />
                    </span>
                  </a>
                  <a className="px-2 flex items-center justify-start h-1/3 border-y cursor-pointer hover:text-red-500 flex-1">
                    <span className="xs:p-4 px-2 w-full flex justify-between">
                      View Profile <InfoOutlined fontSize="sm" />
                    </span>
                  </a>
                  <a className="px-2 flex items-center justify-start h-1/3 cursor-pointer hover:text-red-500 flex-1">
                    <span className="xs:p-4 px-2 w-full flex justify-between">
                      Contact <ContactlessOutlined fontSize="sm" />
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
