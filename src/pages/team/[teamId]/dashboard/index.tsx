import { teamApi } from "@/api/team-api";
import { IconMap } from "@/components/IconSVG/IconMap";
import { ServiceLineIcon } from "@/components/IconSVG/serviceLineIcon";
import BadgeHover from "@/components/team/BadgeHover";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/profileSlice";
import { getDashboardInformationSelector } from "@/redux/selector";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { IColors } from "@/type/team/team.type";
import {
  AvTimerOutlined,
  BusinessCenterOutlined,
  CalendarMonthOutlined,
  CheckCircleOutlined,
  CircleRounded,
  Delete,
  EmailOutlined,
  EmojiEventsOutlined,
  FlagOutlined,
  LanguageOutlined,
  People,
  PeopleOutline,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const skillColor = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-indigo-700",
  "bg-pink-700",
  "bg-gray-700",
  "bg-teal-700",
  "bg-cyan-700",
  "bg-lime-700",
  "bg-red-700",
  "bg-orange-700",
  "bg-yellow-700",
  "bg-green-700",
  "bg-blue-700",
  "bg-lime-300",
  "bg-indigo-300",
  "bg-pink-300",
  "bg-gray-300",
  "bg-teal-300",
  "bg-cyan-300",
];

const Dashboard = () => {
  const router = useRouter();
  const team = useAppSelector(getDashboardInformationSelector);
  const [teamImgSrc, setTeamImgSrc] = useState(
    team.imageUrl ? teamApi.getTeamImageUrl(team.imageUrl) : "/user1.png"
  );
  const dispatch = useAppDispatch();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (team.imageUrl) {
      setTeamImgSrc(teamApi.getTeamImageUrl(team.imageUrl));
    }
  }, [team.imageUrl]);

  const handleCalculatePercentage = (
    skillDistributionValue: { field: string; quantity: number }[],
    quantity: number
  ) => {
    const totalPercent = skillDistributionValue.reduce(
      (total, value) => value.quantity + total,
      0
    );

    return Math.round((100 * quantity) / totalPercent);
  };

  const handleDeleteTeam = async () => {
    teamApi.deleteTeam(team.id.toString()).then((res) => {
      if (res) {
        dispatch(getProfile());
        toast.success("Delete team success");
        router.push("/manage-teams");
      } else {
        toast.error("Failed deleting team");
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full h-full font-nunito">
        <div className="container mx-auto pt-4">
          <div className="w-full">
            <div className="grid grid-cols-12 gap-2.5">
              <div className="bg-white text-[#606060]  w-full md-2:col-span-3 col-span-12  rounded-3xl shadow-lg">
                <div className="p-2">
                  <div className="h-[30px] w-[30px] relative inline-block float-left mr-2 ">
                    <Image
                      key={team.id}
                      layout="fill"
                      objectFit="contain"
                      src={teamImgSrc}
                      onError={() => setTeamImgSrc("/user1.png")}
                      alt="logo"
                    />
                  </div>
                  <div className="px-2 ">
                    <div className="break-words">
                      <Link href={`/team/${team.id}`}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-words"
                        >
                          <span className="text-2xl break-words block">
                            {team.teamName}
                          </span>
                        </a>
                      </Link>
                      <p className="text-[#848ABD] text-ellipsis">
                        {team.slogan}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div className="px-2 py-1 border rounded-lg w-fit text-gray-400">
                    <span>Basic Profile</span>
                  </div>
                  <div
                    className="text-[#606060] cursor-pointer hover:text-[#848ABD]"
                    onClick={handleDeleteTeam}
                  >
                    Delete team <Delete className="text-[#848ABD]" />
                  </div>
                </div>
                <div className="md-2:flex grid grid-cols-2 flex-col text-sm p-2  text-[#848ABD]">
                  {team.status ? (
                    <span className="text-red-500 py-1">
                      <CheckCircleOutlined /> Verified
                    </span>
                  ) : (
                    <span className="text-gray-400 py-1">
                      <CircleRounded className="text-secondary" /> Profile Not
                      Verified
                    </span>
                  )}
                  <span className="py-1">
                    <CalendarMonthOutlined className="text-[#848abd]" />
                    <span className="text-left ml-1 text-[#848abd]">
                      Last Update: {new Date(team.updateAt).toDateString()}
                    </span>
                  </span>
                  {
                    <a href={team.linkWebsite} className="py-1 break-all">
                      {<LanguageOutlined className="text-[#848abd]" />}
                      <span className="text-left ml-1 text-[#848abd]">
                        {team.linkWebsite}
                      </span>
                    </a>
                  }
                  <span className="py-1 break-all">
                    <EmailOutlined className="text-[#848abd]" />
                    <span className="text-left ml-1 text-[#848abd] ">
                      {team.saleEmail}
                    </span>
                  </span>
                  <span className="py-1">
                    <AvTimerOutlined className="text-[#848abd]" />
                    <span className="text-left ml-1 text-[#848abd]">
                      TimeZone: {team.timeZone}
                    </span>
                  </span>
                  <span className="py-1">
                    <PeopleOutline className="text-[#848abd]" />
                    <span className="text-left ml-1 text-[#848abd]">
                      TeamSize: {team.teamSize}
                    </span>
                  </span>
                  <span className="py-1">
                    <FlagOutlined className="text-[#848abd]" />
                    <span className="text-left ml-1 text-[#848abd]">
                      Founded: {team.founded}
                    </span>
                  </span>

                  <span className="py-1">
                    <ServiceLineIcon className="inline-block mx-1 text-[#848abd] stroke-[#848abd] " />
                    <span className="text-left ml-1 text-[#848abd]">
                      Distribution: {team.skillDistribution?.length | 0}
                    </span>
                  </span>
                  <span className="py-1">
                    <BusinessCenterOutlined className="text-[#848abd]" />
                    <span className="text-left ml-1 text-[#848abd]">
                      Portfolio:{" "}
                      {team.portfolios ? team.portfolios?.length | 0 : 0}
                    </span>
                  </span>
                  <span className="py-1">
                    <EmojiEventsOutlined className="text-[#848abd]" />
                    <span className="text-left ml-1 text-[#848abd]">
                      Awards: {team.awards ? team.awards?.length | 0 : 0}
                    </span>
                  </span>
                </div>
              </div>
              <div className="bg-white  text-[#606060] w-full md-2:col-span-6 col-span-12  border-x rounded-3xl shadow-lg">
                <div className="text-cyan-900 break-normal border-b p-4">
                  {team.skills &&
                    team.skills.map((skill, i) => (
                      <div key={i} className="inline-block p-1 pt-3">
                        <span
                          className={`px-2 py-1  rounded-2xl ${
                            skillColor[
                              skill.id
                                ? skill.id % skillColor.length
                                : Math.round(
                                    Math.random() * (skillColor.length - 1)
                                  )
                            ]
                          } text-white ml-2 mt-2 font-medium`}
                        >
                          {skill.skillName}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="px-8">
                  {team.skillDistribution?.length > 0 &&
                    team.skillDistribution.map((item) => (
                      <div key={item.id} className="mb-10">
                        <h3 className="text-[#6b7a7e] my-3">
                          {item.skillDistributionName}
                        </h3>
                        <div className="w-full ">
                          <div className="h-10 py-2 flex w-full">
                            {item.skillDistributionValue.map(
                              (skillDistributionValue, index) =>
                                skillDistributionValue.quantity > 0 && (
                                  <div
                                    key={skillDistributionValue.field}
                                    className="relative flex justify-center items-center  group h-full first:rounded-l-lg last:rounded-r-lg"
                                    style={{
                                      width: `${handleCalculatePercentage(
                                        item.skillDistributionValue,
                                        skillDistributionValue.quantity
                                      )}%`,
                                      backgroundColor:
                                        IColors[
                                          index %
                                            (Object.keys(IColors).length / 2)
                                        ],
                                    }}
                                  >
                                    {handleCalculatePercentage(
                                      item.skillDistributionValue,
                                      +skillDistributionValue.quantity
                                    ) >= 5 ? (
                                      <span className="block text-sm xxs:text-white text-transparent font-medium">
                                        {`${handleCalculatePercentage(
                                          item.skillDistributionValue,
                                          Number(
                                            skillDistributionValue.quantity
                                          )
                                        )}%`}
                                      </span>
                                    ) : null}
                                    <BadgeHover
                                      label={skillDistributionValue.field}
                                    />
                                  </div>
                                )
                            )}
                          </div>
                        </div>

                        <ul className="flex flex-wrap gap-5">
                          {item.skillDistributionValue.map(
                            (skillDistributionValue, index) =>
                              skillDistributionValue.quantity > 0 && (
                                <li
                                  key={skillDistributionValue.field}
                                  className="flex items-center gap-x-3"
                                >
                                  <div
                                    className="w-4 h-4 rounded-lg"
                                    style={{
                                      backgroundColor:
                                        IColors[
                                          index %
                                            (Object.keys(IColors).length / 2)
                                        ],
                                    }}
                                  ></div>
                                  <h3 className="text-sm text-[#6d6e71]">
                                    {skillDistributionValue.field}{" "}
                                    <span className="md:hidden">
                                      (
                                      {`${handleCalculatePercentage(
                                        item.skillDistributionValue,
                                        skillDistributionValue.quantity
                                      )}%`}
                                      )
                                    </span>
                                  </h3>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-white  text-[#606060] w-full md-2:col-span-3 col-span-12  rounded-3xl shadow-lg">
                <p className="p-3 break-words">
                  {team.description.length > 650
                    ? showAll
                      ? team.description
                      : `${team.description.slice(0, 650)}...`
                    : team.description}
                  {showAll ? (
                    <span
                      className="text-[#606060] hover:underline cursor-pointer ml-2"
                      onClick={() => setShowAll(false)}
                    >
                      Less
                    </span>
                  ) : (
                    <>
                      {team.description.length > 650 && (
                        <span
                          className="text-[#606060] hover:underline cursor-pointer"
                          onClick={() => setShowAll(true)}
                        >
                          More
                        </span>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
