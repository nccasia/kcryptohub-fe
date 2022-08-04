import { teamApi } from "@/api/team-api";
import CardInfo from "@/components/team/CardInfo";
import Portfolio from "@/components/team/Portfolio";
import SkillDistribution from "@/components/team/SkillDistribution";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTeamProfile } from "@/redux/teamProfileSlice";
import { Layout } from "@/src/layouts/layout";
import { ESection, ITeam } from "@/type/team/team.type";
import Image from "next/image";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-stone-500",
  "bg-red-700",
  "bg-orange-700",
  "bg-yellow-700",
  "bg-green-700",
  "bg-blue-700",
  "bg-indigo-700",
  "bg-purple-700",
  "bg-pink-700",
  "bg-gray-700",
  "bg-teal-700",
  "bg-cyan-700",
  "bg-lime-700",
  "bg-fuchsia-700",
  "bg-rose-700",
  "bg-stone-700",
  "bg-red-900",
  "bg-orange-900",
  "bg-yellow-900",
  "bg-green-900",
  "bg-blue-900",
  "bg-indigo-900",
  "bg-purple-900",
  "bg-pink-900",
  "bg-gray-900",
  "bg-teal-900",
  "bg-cyan-900",
  "bg-lime-900",
  "bg-fuchsia-900",
  "bg-rose-900",
  "bg-stone-900",
];
interface ITeamDetailProps {
  teamProfileInfo: ITeam;
}
const TeamDetail = () => {
  const router = useRouter();
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);
  const userProfile = useAppSelector((state) => state.ProfileReducer);
  const [read, setRead] = useState(false);
  const dispatch = useAppDispatch();
  const headerRef = useRef(null);
  const summaryRef = useRef(null);
  const skillDistributionRef = useRef(null);
  const portfolioRef = useRef(null);
  const [hash, setHash] = useState<string>(ESection[ESection["SUMMARY"]]);
  const { teamId } = router.query;
  const [ownerId, setOwnerId] = useState(NaN);
  const [showAllSkill, setShowAllSkill] = useState(false);

  useEffect(() => {
    if (teamId) {
      teamApi.getTeam(parseInt(teamId as string)).then((res) => {
        if (res) {
          dispatch(setTeamProfile(res.data));
          setOwnerId(res.userId);
        } else {
          router.push("/404");
        }
      });
    }
  }, [dispatch, teamId]);

  const handleScrollToSection = (section: number) => {
    const headerHeight = (headerRef.current! as HTMLElement).offsetHeight;
    switch (section) {
      case ESection["PORTFOLIO"]: {
        const offsetTop = (portfolioRef.current! as HTMLElement).offsetTop;
        window.scroll({
          top: offsetTop,
          behavior: "smooth",
          left: 0,
        });
        break;
      }
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="">
        <div className="block font-nunito">
          <div
            className="w-full bg-[#5ca7db11] border-[1px] border-[#5ca7db11]"
            ref={headerRef}
          >
            <div
              className="flex  lg:px-32 xs:px-10 px-2 md:py-16 xs:py-10 py-1 flex-col items-center"
              ref={summaryRef}
            >
              <div className="md:flex-1 relative md:mr-3 mb-6">
                <div className="md:block flex flex-col justify-center items-center md:mt-8">
                  <div className="w-full flex justify-center mb-4">
                    <div className="xs:mt-0 mt-5 max-h-[300px] lg:h-[100px] lg:w-[100px] h-[100px] w-[100px] relative">
                      <Image
                        className="rounded-full object-fit"
                        alt=""
                        src={
                          teamProfile.imageUrl
                            ? teamApi.getTeamImageUrl(teamProfile.imageUrl)
                            : "/user1.png"
                        }
                        layout="fill"
                      />
                    </div>
                  </div>

                  <div className="md:text-[40px] sm:text-[30px] text-[26px] md:leading-10 font-semibold text-[#404040] md:text-left text-center whitespace-normal">
                    We&apos;re {teamProfile.teamName}
                  </div>
                  <div className="my-6 md:text-[26px] sm:text-[22px] text-[18px] leading-9 font-normal">
                    {teamProfile.slogan}
                  </div>
                  <button
                    type="button"
                    className="mt-4 px-4 py-3 text-[14px] rounded-full text-white bg-[#5ca7db] uppercase hover:shadow hover:shadow-[#5ca7db]"
                    onClick={() => handleScrollToSection(ESection["PORTFOLIO"])}
                  >
                    See my work
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="lg:px-32 xs:px-10 px-2 py-28 bg-[#f9fafb] border-[1px] border-[#f9fafb]"
            ref={skillDistributionRef}
          >
            <div
              className={`flex flex-col mb-20 items-center ${
                read ? "justify-center" : "md:flex-row"
              }`}
            >
              <div className="md:w-1/3 mr-2 relative">
                <div className="text-[#606060]">
                  <div
                    className={`md:text-[30px] text-[24px] leading-4 text-[#404040]  text-center mb-6 ${
                      read ? "" : "xs:text-left"
                    }`}
                  >
                    What I do?
                  </div>
                  <div
                    className={`md:text-[24px] h-auto max-h-[180px] overflow-hidden break-words whitespace-pre-line text-[18px] font-normal ${
                      read ? "hidden" : ""
                    }`}
                  >
                    {teamProfile.description}
                  </div>

                  <p
                    hidden={teamProfile.description?.length <= 200 || read}
                    className="text-ellipsis overflow-hidden mt-2 text-xs text-red-500 hover:underline tracking-widest cursor-pointer"
                    onClick={() => setRead(!read)}
                  >
                    READ MORE <ArrowForwardIcon className="text-xs" />
                  </p>
                </div>
              </div>
              <div className={`md:flex-1 w-full ${read ? "" : "md:ml-8"}`}>
                <SkillDistribution
                  skillDistributionRef={skillDistributionRef}
                  editable={userProfile.userInfo.id === ownerId}
                />
              </div>
            </div>
            {read && (
              <div className="mt-[-100px] text-justify mb-10 text-[#404040] lg:text-left md:text-[22px] text-[16px] leading-9">
                {teamProfile.description}
                <span
                  className="text-ellipsis ml-2 overflow-hidden mt-2 text-xs text-red-500 hover:underline tracking-widest cursor-pointer"
                  onClick={() => setRead(!read)}
                >
                  SEE LESS <ArrowBackIcon className="text-xs" />
                </span>
              </div>
            )}
            <div className="lg:w-full xs:w-2/3 w-full">
              <h3 className="md:text-[30px] text-[24px] leading-4 text-[#404040] mb-6 font-medium">
                Tags
              </h3>
              <div className="flex flex-col items-start justify-start xs:w-full">
                <div className="flex w-full">
                  <div className="text-cyan-900 w-full break-normal">
                    {teamProfile.skills &&
                      (showAllSkill
                        ? teamProfile.skills
                        : teamProfile.skills.slice(0, 7)
                      ).map((skill, i) => (
                        <div key={i} className="inline-block p-1 pt-3">
                          <span
                            className={`px-3 py-1 block rounded-2xl  md:max-w-[250px] max-w-[140px] hover:max-w-none hover:scale-110 cursor-default truncate  ${
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
                    {teamProfile.skills?.length > 7 && !showAllSkill ? (
                      <div className="inline-block p-1 pt-3">
                        <span
                          className={`px-2 py-1 block rounded-2xl border md:max-w-[175px] max-w-[140px] truncate   cursor-pointer text-black ml-2 mt-2 font-medium`}
                          onClick={() => setShowAllSkill(true)}
                        >
                          More
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="lg:px-32 xs:px-10 px-2 bg-[#5ca7db11] border-[1px] border-[#5ca7db11]"
            ref={portfolioRef}
          >
            <Portfolio
              portfolioRef={portfolioRef}
              handleScrollToSection={handleScrollToSection}
              editable={userProfile.userInfo.id === ownerId}
            />
          </div>
          <CardInfo editable={userProfile.userInfo.id === ownerId} />
        </div>
      </div>
    </Layout>
  );
};

export default TeamDetail;

// export const getStaticProps: GetStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const teamId = context.params?.teamId;
//   const res =
//     process.env.NODE_ENV === "production"
//       ? await fetch(`https://kryptohub-be.herokuapp.com/api/team/get/${teamId}`)
//       : await fetch(`${process.env.API_URL}/api/team/get/${teamId}`);
//   const teamProfile = await res.json();
//   if (teamProfile?.statusCode == 404) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       teamProfileInfo: teamProfile,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   try {
//     const res =
//       process.env.NODE_ENV === "production"
//         ? await fetch(`https://kryptohub-be.herokuapp.com/api/team/getAll`)
//         : await fetch(`${process.env.API_URL}/api/team/getAll`);
//     const teamList = (await res.json()) || [];
//     return {
//       paths:
//         teamList.map((team: ITeamProfile) => ({
//           params: { teamId: team.id.toString() },
//         })) || [],
//       fallback: true,
//     };
//   } catch {
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }
// };
