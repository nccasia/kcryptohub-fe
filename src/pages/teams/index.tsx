import SearchIcon from "@mui/icons-material/Search";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { IconButton, InputAdornment, InputLabel, OutlinedInput, Rating } from "@mui/material";
import {
    AccessAlarm,
    ContactlessOutlined,
    InfoOutlined,
    LanguageOutlined,
    LocalOffer,
  LocationCityOutlined,
  LocationOnOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
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
const serviceFocusColor = ["#1b85ce", "#08537e", "#267c87", "#5d997e", '#62ba56'];

export const Teams = () => {
  return (
    <>
      <div className="">
        <div className="bg-cyan-900 text-white">
          <div className="flex flex-row border-b border-cyan-200">
            <div className="">KryptoHub</div>
            <div className="flex flex-col flex-1">
              <div className="flex flex-row items-center justify-end">
                <div className="">
                  <OutlinedInput
                    type="text"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        ></IconButton>
                      </InputAdornment>
                    }
                    label="Search"
                    size="small"
                  />
                </div>
                <div className="">
                  <span>Leave a review</span>
                  <CreateOutlinedIcon fontSize="small" />
                </div>
                <div className="">
                  <span>Sign in</span>
                  <PersonOutlineIcon fontSize="small" />
                </div>
              </div>
              <div className="flex flex-row items-center justify-end">
                <div className="">
                  <span>More in Mobile App Developers</span>
                </div>
                <div className="">
                  <span>Other Categories</span>
                </div>
                <div className="">
                  <span>Resource</span>
                </div>
                <div className="">
                  <span>
                    0 <BookmarkBorderOutlinedIcon color="error" />
                  </span>
                </div>
                <div className="">
                  <span>
                    0 <ChatOutlinedIcon color="error" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 flex items-center justify-start text-white  font-semibold">
            <div className="p-4 border-2 border-red-500 w-32 h-12 flex items-center justify-center  ">
              <span>2022 Teams</span>
            </div>
            <div className="ml-4 text-3xl">
              <h1>List Teams</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center border-b-4 border-gray-900">
          <div className="w-3/4 border-x-2 border-gray-200 p-8">
            <div className="w-3/4 text-gray-500 text-sm">
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
        <div className="container-lg relative border-x-2 border-gray-200 w-3/4">
          <div className="sticky top-0 w-full flex flex-col text-gray-700 bg-white">
            <div className="flex flex-row border-b border-gray-200">
              <div className="flex flex-row items-center justify-between">
                <div className="p-4 bg-gray-900 text-white font-semibold">
                  <span>{data.length} Teams</span>
                </div>
              </div>
              <div className="flex-1 bg-white
              
              "></div>
              <div className="flex flex-row items-center justify-center p-2">
                <label className="p-1 border-2 border-gray-400">Sort By</label>
                <select
                  className="p-1 border-2 border-gray-400"
                  name="sort"
                  id=""
                >
                  <option>Sponsor</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row p-2 border-b border-gray-200 justify-start">
              <div className="flex flex-row items-center justify-center">
                <input
                  type="text"
                  placeholder="Location"
                  className="shadow appearance-none border  w-full text-gray-700 focus:outline-none focus:shadow-outline"
                />
                <div className="ml-[-2rem] flex items-center justify-center">
                  <SearchIcon />
                </div>
              </div>
              <div className="flex items-center justify-center border-2 border-gray-200 px-2 ml-2">
                <select name="service" id="">
                  <option value="">Services</option>
                </select>
              </div>
              <div className="flex items-center justify-center border-2 border-gray-200 px-2 ml-2">
                <select name="service" id="">
                  <option value="">Client Budget</option>
                </select>
              </div>
              <div className="flex items-center justify-center border-2 border-gray-200 px-2 ml-2">
                <select name="service" id="">
                  <option value="">Hourly Rate</option>
                </select>
              </div>
              <div className="flex items-center justify-center border-2 border-gray-200 px-2 ml-2">
                <select name="service" id="">
                  <option value="">Industry</option>
                </select>
              </div>
              <div className="flex items-center justify-center border-2 border-gray-200 px-2 ml-2">
                <select name="service" id="">
                  <option value="">Reviews</option>
                </select>
              </div>
              <div className="flex items-center justify-center border-2 border-gray-200 px-1 ml-2">
                <span>All Filter</span>
              </div>
              <div className="flex items-center justify-center ml-2">
                <span>Clear All</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {data.map((item, index) => (
              <div className="flex flex-row w-full border-y my-4" key={index}>
                <div className="flex-1">
                  <div className="flex flex-row border-b">
                    <div className="flex items-center justify-center p-2">
                      <img src={item.logo} alt="logo" />
                    </div>
                    <div className="flex flex-col w-full p-2">
                      <div className="flex flex-row">
                        <div className="flex items-end">
                          <h1 className="text-3xl">{item.companyName}</h1>
                          <span className="text-gray-400 ml-2">
                            {item.description}
                          </span>
                        </div>
                        <div className="flex-1 text-right">
                          <span>Sponsor</span>
                          <BookmarkBorderOutlinedIcon />
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
                  <div className="flex flex-row ">
                    <div className="flex flex-col text-sm p-4 w-1/4">
                      <span className="text-red-500">
                        <CheckCircleOutlinedIcon /> Verified
                      </span>
                      <span className="text-gray-500">
                        <LocalOffer />{" "}
                        {item.stats.minProjectSize.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                      <span className="text-gray-500">
                        <AccessAlarm /> ${item.stats.minHourlyRate} - $
                        {item.stats.maxHourlyRate} / hr
                      </span>
                      <span className="text-gray-500">
                        <PersonOutlineIcon /> {item.stats.employees}
                      </span>
                      <span className="text-gray-500">
                        <LocationOnOutlined /> {item.stats.location}
                      </span>
                    </div>
                    <div className="flex flex-col items-start justify-start p-4 border-x w-1/2 ">
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
                            <div className="absolute text-xs text-gray-400 border-2 top-[-0.25rem] w-fit hidden group-hover:block">
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
                    <div className="w-1/4 p-4 text-sm text-gray-500">
                      <p className="text-base">“{item.quote.content}“</p>
                      <span>
                        {item.quote.author}{" "}
                        <CheckCircleOutlinedIcon color="error" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col border-l text-gray-700 transition-all duration-500 ease-in-out">
                  <a className="px-2 flex items-center justify-start h-1/3 ">
                    <span className="p-4 w-full bg-red-500 font-semibold text-white flex justify-between cursor-pointer border-2 border-red-500 hover:bg-transparent hover:text-red-500">
                      Visit Website <LanguageOutlined />
                    </span>
                  </a>
                  <a className="px-2 flex items-center justify-start h-1/3 border-y cursor-pointer hover:text-red-500">
                    <span className="p-4 w-full flex justify-between">
                      View Profile <InfoOutlined />
                    </span>
                  </a>
                  <a className="px-2 flex items-center justify-start h-1/3 cursor-pointer hover:text-red-500">
                    <span className="p-4 w-full flex justify-between">
                      Contact <ContactlessOutlined />
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
