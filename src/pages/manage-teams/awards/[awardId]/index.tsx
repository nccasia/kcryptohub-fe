import { awardsApi } from "@/api/awards";
import AwardList from "@/components/awards/AwardList";
import { IconMap } from "@/components/IconSVG/IconMap";
import { Layout } from "@/src/layouts/layout";
import { IAwardDetail } from "@/type/awards/awards.type";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface AwardDetailProps {
  awardDetail: IAwardDetail;
}

const AwardDetail = ({ awardDetail }: AwardDetailProps) => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/manage-teams/awards");
  };
  const handleDeleteAward = async () => {
    awardsApi.deleteAward(awardDetail, handleRedirect);
  };

  return (
    <div className="bg-[#e8eef0]">
      <Layout>
        <div className="container mx-auto grid grid-cols-12 gap-5 my-10">
          <AwardList />
          <div className="col-span-12 md:col-span-9 bg-white p-3 shadow-lg">
            <div className="mb-5">
              <h2 className="text-3xl text-primary font-normal mb-5">
                {awardDetail.awardsTitle}
              </h2>
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 flex-none">
                  <Image
                    width="10"
                    height="10"
                    src={IconMap.Website.src}
                    alt="avatar"
                    layout="responsive"
                  />
                </div>
                <a
                  href={awardDetail.awardsWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[#08537E] cursor-pointer hover:underline"
                >
                  {awardDetail.awardsWebsite}
                </a>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-[#cae0e7] flex flex-col-reverse sm:flex-row justify-between items-center">
              <div className="flex gap-x-2 items-center py-3">
                <span
                  className="text-sm text-[#08537E] cursor-pointer hover:underline"
                  onClick={handleDeleteAward}
                >
                  Delete Award
                </span>
                <div className="w-4 h-4 flex-none">
                  <Image
                    width="16"
                    height="16"
                    src={IconMap.Trash.src}
                    alt="avatar"
                    layout="responsive"
                  />
                </div>
              </div>
              <Link
                href={`/manage-teams/awards/${awardDetail.id}/edit`}
                passHref
              >
                <button className="bg-secondary text-white px-10 py-3 border-2 border-transparent transition duration-300 w-full sm:w-auto hover:border-secondary hover:bg-white hover:text-secondary">
                  Edit Award
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const awardId = context.params?.awardId;
  const res = await fetch(`${process.env.API_URL}/api/awards/get/${awardId}`);
  const awardInfo = await res.json();
  let awardDetail;
  awardInfo.map((item: IAwardDetail) => (awardDetail = item));
  return {
    props: {
      awardDetail: awardDetail,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await fetch(`${process.env.API_URL}/api/team/getAll`);
  // const teamList = (await res.json()) || [];

  return {
    paths: [{ params: { awardId: "19" } }],
    // paths: teamList.map((team: ITeamProfile) => ({
    //   params: { teamId: team.id.toString() },
    // })),
    fallback: false,
  };
};

export default AwardDetail;
