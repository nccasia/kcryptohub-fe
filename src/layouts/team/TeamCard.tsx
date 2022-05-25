import { Team } from '@/type/team/team.type';
import {
  ContactlessOutlined,
  InfoOutlined,
  BookmarkBorderOutlined,
  Bookmark,
  StarBorderOutlined,
  ArrowForwardIosOutlined,
  GroupsOutlined,
  LanguageOutlined,
  AvTimerOutlined,
  ApartmentOutlined,
  AccessAlarmOutlined,
  ApiOutlined,
} from "@mui/icons-material";
import { Rating } from '@mui/material';
import Image from 'next/image';
import { IconHover } from './IconHover';
interface Props {
    team: Team;
}
const skillColor: {[id: string]: string} = {
    'Mobile':'bg-red-500',
    "Web":'bg-orange-500',
    "Blockchain":'bg-yellow-500',
    "Crypto":'bg-green-500',
    "Digital":'bg-blue-500',
    "Cloud":'bg-indigo-500',
    "AI":'bg-purple-500',
};

export const TeamCard = (props: Props) => {
    const team = props.team;
    return (
      <div className="flex md:flex-row w-full border-y my-4 shadow-md flex-col">
        <div className="flex-1">
          <div className="flex xs:flex-row flex-col items-start border-b relative">
            <div className="flex items-center justify-center p-2">
              <Image width={50} height={50} src={team.logo} alt="logo" />
            </div>
            <div className="flex flex-col w-full px-2">
              <div className="flex flex-row ">
                <div className="flex items-end">
                  <h1 className="text-3xl">{team.name}</h1>
                  <span className="text-cyan-700 ml-2">{team.description}</span>
                </div>
                <div className="absolute top-0 right-0 flex-1 text-right">
                  <span className="uppercase  text-xs font-semibold tracking-widest text-gray-400 mr-8 mt-[-1rem]">
                    Sponsor
                  </span>
                  <div className="absolute top-[-6px] right-2 group">
                    <BookmarkBorderOutlined className="absolute group-hover:hidden" />
                    <Bookmark className=" invisible text-white group-hover:visible group-hover:bg-black" />
                    <div className="absolute right-0 w-48 h-16 hidden border border-black group-hover:block">
                      <div className=""></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <h1 className="text-xl mr-2">{team.rating}</h1>
                <Rating
                  value={team.rating}
                  readOnly
                  precision={0.1}
                  emptyIcon={<StarBorderOutlined />}
                />
                <a href="" className="ml-2">
                  {team.reviewsCount} reviews{" "}
                  <ArrowForwardIosOutlined className="text-sm" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex xs:flex-row flex-col">
            <div className="flex flex-col text-sm p-4 xs:w-1/4">
              <span className="text-cyan-900">
                <IconHover icon={<GroupsOutlined />} hoverText="Team size" />{" "}
                {team.size}
              </span>
              <span className="text-cyan-900">
                <IconHover icon={<AvTimerOutlined />} hoverText="Timezone" />
                {team.timezone}
              </span>
              <span className="text-cyan-900">
                <IconHover
                  icon={<ApartmentOutlined />}
                  hoverText="Organization"
                />
                {team.organization}
              </span>
              <span className="text-cyan-900">
                <IconHover
                  icon={<AccessAlarmOutlined />}
                  hoverText="Working hours"
                />
                {team.workingTime}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start p-4 border-x xs:w-1/2 ">
              <div className="flex w-full">
                <ApiOutlined />
                <p className="text-cyan-900 w-full break-normal">
                  {team.skills.map((skill, i) => (
                    <span key={i}>
                      <b
                        className={`px-2 rounded-2xl ${skillColor[skill]} text-white ml-2`}
                      >
                        {skill}
                      </b>{" "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="xs:w-1/4 p-4 text-sm text-cyan-900"></div>
          </div>
        </div>
        <div className="flex flex-row md:flex-col border-l text-cyan-700 transition-all duration-500 ease-in-out text-sm xs:text-md">
          <a className="sm:px-2 flex items-center justify-start h-1/3 flex-1 border">
            <span className="xs:p-4 w-full bg-red-500 font-semibold text-white flex justify-between cursor-pointer border-2 border-red-500 hover:bg-transparent hover:text-red-500">
              Visit Website <LanguageOutlined fontSize="small" />
            </span>
          </a>
          <a className="px-2 flex items-center justify-start h-1/3 border cursor-pointer hover:text-red-500 flex-1">
            <span className="xs:p-4  w-full flex justify-between">
              View Profile <InfoOutlined fontSize="small" />
            </span>
          </a>
          <a className="px-2 flex items-center justify-start h-1/3 border cursor-pointer hover:text-red-500 flex-1">
            <span className="xs:p-4 w-full flex justify-between">
              Contact <ContactlessOutlined fontSize="small" />
            </span>
          </a>
        </div>
      </div>
    );
}
