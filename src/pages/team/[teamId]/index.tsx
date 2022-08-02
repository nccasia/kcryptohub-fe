import CardInfo from "@/components/team/CardInfo";
import Portfolio from "@/components/team/Portfolio";
import Separate from "@/components/team/Separate";
import SkillDistribution from "@/components/team/SkillDistribution";
import Summary from "@/components/team/Summary";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTeamProfile } from "@/redux/teamProfileSlice";
import { Layout } from "@/src/layouts/layout";
import { ESection, ITeam } from "@/type/team/team.type";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { teamApi } from "@/api/team-api";
import { profileApi } from "@/api/profile-api";
interface ITeamDetailProps {
  teamProfileInfo: ITeam;
}
const TeamDetail = () => {
  const router = useRouter();
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);
  const userProfile = useAppSelector((state) => state.ProfileReducer);
  const dispatch = useAppDispatch();
  const headerRef = useRef(null);
  const summaryRef = useRef(null);
  const skillDistributionRef = useRef(null);
  const portfolioRef = useRef(null);
  const [hash, setHash] = useState<string>(ESection[ESection["SUMMARY"]]);
  const { teamId } = router.query;
  const [ownerId, setOwnerId] = useState(NaN);

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
    /*  const headerHeight = (headerRef.current! as HTMLElement).offsetHeight;
    switch (section) {
      case ESection["SUMMARY"]: {
        const offsetTop =
          (summaryRef.current! as HTMLElement).offsetTop - headerHeight;
        window.scrollTo(0, offsetTop);
        break;
      }
      case ESection["SKILL-DISTRIBUTION"]: {
        const offsetTop =
          (skillDistributionRef.current! as HTMLElement).offsetTop -
          headerHeight;
        window.scrollTo(0, offsetTop);
        break;
      }
      case ESection["PORTFOLIO"]: {
        const offsetTop =
          (portfolioRef.current! as HTMLElement).offsetTop - headerHeight;
        window.scrollTo(0, offsetTop);
        break;
      }
      default:
        break;
    } */
  };

  return (
    <Layout>
      <div className="">
        <div className="block font-nunito">
          <div className="h-[95vh] w-full bg-[#5ca7db11] border-[1px] border-[#5ca7db11]">
            <div className="flex md:flex-row lg:px-32 xs:px-10 px-1 md:py-32 flex-col-reverse items-center">
              <div className="md:flex-1 relative">
                <div className="">
                  <div className="md:text-[40px] text-[32px] leading-10 font-semibold text-[#404040] whitespace-normal">
                    We&apos;re {teamProfile.teamName}
                  </div>
                  <div className="my-6 text-[26px] leading-9 font-normal">
                    {teamProfile.slogan}
                  </div>

                  <button className="mt-4 px-3 py-2 text-[14px] rounded-full text-white bg-[#5ca7db] uppercase">
                    See my work
                  </button>
                </div>
              </div>
              <div className="md:flex-1 w-[300px] max-h-[500px] md:h-[500px] h-[350px] relative whitespace-normal text-[#404040]">
                <Image
                  className="rounded-full"
                  alt=""
                  src={
                    profileApi.getImageUrl(teamProfile.imageUrl) || "/user.png"
                  }
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className="lg:px-32 xs:px-10 px-1 py-32 bg-[#f9fafb] border-[1px] border-[#f9fafb]">
            <div className="flex md:flex-row mb-20 flex-col items-center">
              <div className="md:w-1/3 relative">
                <div className="m-auto w-fit text-[#606060]">
                  <div className="md:text-[30px] text-[24px] leading-4 text-[#404040] mb-6">
                    What I do?
                  </div>
                  <div className="md:text-[26px] text-[20px] leading-9 font-normal">
                    I specialize in web, mobile, brand {"&"} product design. I
                    love to turn ideas into beautiful things.
                  </div>
                </div>
              </div>
              <div className="md:flex-1">
                <SkillDistribution
                  skillDistributionRef={skillDistributionRef}
                  editable={userProfile.userInfo.id === ownerId}
                />
              </div>
            </div>
            <div className="">
              <h3 className="md:text-[30px] text-[24px] leading-4 text-[#404040] mb-6 font-medium">
                Tags
              </h3>
            </div>
          </div>

          <div className="lg:px-28 xs:px-10 px-1 bg-[#5ca7db11] border-[1px] border-[#5ca7db11]">
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
