import CardInfo from "@/components/team/CardInfo";
import Portfolio from "@/components/team/Portfolio";
import Separate from "@/components/team/Separate";
import SkillDistribution from "@/components/team/SkillDistribution";
import Summary from "@/components/team/Summary";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTeamProfile } from "@/redux/teamProfileSlice";
import { Layout } from "@/src/layouts/layout";
import { ESection, ITeamProfile } from "@/type/team/team.type";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { teamApi } from "@/api/team-api";
interface ITeamDetailProps {
  teamProfileInfo: ITeamProfile;
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
    const handleChangeHash = () => {
      const isSummaryVisibile = isInViewport(
        (summaryRef.current! as HTMLElement).offsetHeight,
        summaryRef
      );
      const isSkillDistributionVisibile = isInViewport(
        (skillDistributionRef.current! as HTMLElement).offsetHeight,
        skillDistributionRef
      );
      const isPortfolioVisibile = isInViewport(
        (portfolioRef.current! as HTMLElement).offsetHeight,
        portfolioRef
      );
      if (isSummaryVisibile) {
        window.location.hash = ESection[ESection["SUMMARY"]].toLowerCase();
      } else if (isSkillDistributionVisibile) {
        window.location.hash =
          ESection[ESection["SKILL-DISTRIBUTION"]].toLowerCase();
      } else if (isPortfolioVisibile) {
        window.location.hash = ESection[ESection["PORTFOLIO"]].toLowerCase();
      } else {
        window.location.hash = '';
      }
      setHash(window.location.hash.substr(1).toUpperCase());
    };
    document.addEventListener("scroll", handleChangeHash);
    return () => document.removeEventListener("scroll", handleChangeHash);
  }, []);

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

  const isInViewport = (
    offsetHeight: number,
    ref: MutableRefObject<null | Element>
  ) => {
    if (!ref.current) return false;
    const headerHeight = (headerRef.current! as HTMLElement).offsetHeight;
    const top = ref.current.getBoundingClientRect().top - headerHeight;
    return top + offsetHeight >= 0 && top - offsetHeight <= window.innerHeight;
  };

  const handleScrollToSection = (section: number) => {
    const headerHeight = (headerRef.current! as HTMLElement).offsetHeight;
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
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center md:block">
        <div className="container mx-auto">
          <section
            ref={headerRef}
            className="flex bg-white border border-[#cae0e7] sticky top-0 z-[1]"
          >
            <div className="flex xs:w-auto w-full">
              <div className="w-[100px] relative p-2">
                <Image
                  src={
                    teamProfile.imageUrl
                      ? teamApi.getTeamImageUrl(teamProfile.imageUrl)
                      : "/user1.png"
                  }
                  alt="avatar"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h1 className="w-full bg-primary flex items-center">
                <Link href="#">
                  <a className="xxs:text-3xl text-xl text-white ml-2">
                    {teamProfile.teamName}
                  </a>
                </Link>
              </h1>
            </div>
            <ul className="hidden md:flex">
              <li
                className={`flex items-center px-6 text-sm lg:text-base text-[#107F79] border-x-[1px] border-[#cae0e7] group hover:text-secondary ${
                  hash === ESection[ESection["SUMMARY"]]
                    ? "!text-secondary"
                    : ""
                }`}
                onClick={() => handleScrollToSection(ESection["SUMMARY"])}
              >
                <span
                  className={`py-5 relative after:absolute after:bottom-0 after:left-[calc(0%-10px)] after:h-1 after:w-[calc(100%+20px)] cursor-pointer group-hover:after:bg-[#FF3D2D] ${
                    hash === ESection[ESection["SUMMARY"]]
                      ? "after:!bg-[#FF3D2D]"
                      : ""
                  }`}
                >
                  Summary
                </span>
              </li>
              <li
                className={`flex items-center px-6 text-sm lg:text-base text-[#107F79] border-x-[1px] border-[#cae0e7] group hover:text-secondary ${
                  hash === ESection[ESection["SKILL-DISTRIBUTION"]]
                    ? "!text-secondary"
                    : ""
                }`}
                onClick={() =>
                  handleScrollToSection(ESection["SKILL-DISTRIBUTION"])
                }
              >
                <span
                  className={`py-5 relative after:absolute after:bottom-0 after:left-[calc(0%-10px)] after:h-1 after:w-[calc(100%+20px)] cursor-pointer group-hover:after:bg-[#FF3D2D] ${
                    hash === ESection[ESection["SKILL-DISTRIBUTION"]]
                      ? "after:!bg-[#FF3D2D]"
                      : ""
                  }`}
                >
                  Skill Distribution
                </span>
              </li>
              <li
                className={`flex items-center px-6 text-sm lg:text-base text-[#107F79] border-x-[1px] border-[#cae0e7] group hover:text-secondary ${
                  hash === ESection[ESection["PORTFOLIO"]]
                    ? "!text-secondary"
                    : ""
                }`}
                onClick={() => handleScrollToSection(ESection["PORTFOLIO"])}
              >
                <span
                  className={`py-5 relative after:absolute after:bottom-0 after:left-[calc(0%-10px)] after:h-1 after:w-[calc(100%+20px)] cursor-pointer group-hover:after:bg-[#FF3D2D] ${
                    hash === ESection[ESection["PORTFOLIO"]]
                      ? "after:!bg-[#FF3D2D]"
                      : ""
                  }`}
                >
                  Portfolio
                </span>
              </li>
            </ul>
          </section>
          <Summary summaryRef={summaryRef} />
          <Separate />
          <SkillDistribution
            skillDistributionRef={skillDistributionRef}
            editable={userProfile.userInfo.id === ownerId}
          />
          <Separate />
          <Portfolio
            portfolioRef={portfolioRef}
            handleScrollToSection={handleScrollToSection}
            editable={userProfile.userInfo.id === ownerId}
          />
        </div>
        <CardInfo editable={userProfile.userInfo.id === ownerId} />
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
