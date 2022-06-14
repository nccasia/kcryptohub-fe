import { awardsApi } from "@/api/awards";
import AwardList from "@/components/awards/AwardList";
import { IconMap } from "@/components/IconSVG/IconMap";
import { Layout } from "@/src/layouts/layout";
import { IAwardDetail } from "@/type/awards/awards.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaValidation = Yup.object({
  awardsTitle: Yup.string().required("Award title is required!"),
  awardsWebsite: Yup.string().required("Award website is required!"),
});

interface EditAwardDetail {
  awardDetail: IAwardDetail;
}

const EditAwardDetail = ({ awardDetail }: EditAwardDetail) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAwardDetail>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
    defaultValues: {
      id: awardDetail.id,
      awardsTitle: awardDetail.awardsTitle,
      awardsWebsite: awardDetail.awardsWebsite,
    },
  });

  const handleUpdateAward = () => {
    handleSubmit(async (value) => {
      awardsApi.editAward(value);
    })();
  };

  const handleRedirect = () => {
    router.push("/manage-teams/awards");
  };

  const handleDeleteAward = () => {
    handleSubmit(async (value) => {
      awardsApi.deleteAward(value, handleRedirect);
    })();
  };

  return (
    <div className="bg-[#e8eef0]">
      <Layout>
        <div className="container mx-auto grid grid-cols-12 gap-5 my-10">
          <AwardList />
          <div className="col-span-12 md:col-span-9 bg-white p-3 shadow-lg">
            <h2 className="text-3xl text-primary font-normal mb-3">Edit</h2>
            <div className="flex items-center gap-x-1 pb-1 border-b border-[#cae0e7] my-2">
              <div className="w-4 h-4 flex-none">
                <Image
                  width="16"
                  height="16"
                  src={IconMap.Person.src}
                  alt="avatar"
                  layout="responsive"
                />
              </div>
              <span className="text-xl text-primary font-normal">
                Award Details
              </span>
            </div>
            <div className="md:pl-5">
              <div className="mb-3 pb-5">
                <h3 className="text-base text-primary font-bold mb-1">
                  Award Title
                </h3>
                <div className="relative inline-block md:max-w-[400px] w-full">
                  <div className="relative">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="e.g. #7 on Time's Top 100 Digital Agencies"
                      maxLength={50}
                      {...register("awardsTitle")}
                      className="md:max-w-[400px] w-full border-2 border-[#cae0e7] pl-3 pr-14 py-2 outline-none focus:shadow-3xl focus:border-primary placeholder:text-sm"
                    />
                    {errors?.awardsTitle && (
                      <span className="text-red-500 text-left text-sm mt-1 w-full absolute left-0 top-full">
                        {errors?.awardsTitle?.message}
                      </span>
                    )}
                  </div>
                  <span className="absolute top-1/2 right-[10px] -translate-y-1/2 text-sm text-[#9CA3AF]">
                    {watch("awardsTitle")?.length || 0}/50
                  </span>
                </div>
              </div>
              <div className="mb-3 pb-5">
                <h3 className="text-base text-primary font-bold mb-1">
                  Award Website
                </h3>
                <div className="relative inline-block md:max-w-[600px] w-full">
                  <div>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="e.g. https://www.time.com/top-100-digital-agencies-2021"
                      maxLength={200}
                      {...register("awardsWebsite")}
                      className="md:max-w-[600px] w-full border-2 border-[#cae0e7] pl-3 pr-16 py-2 outline-none focus:shadow-3xl focus:border-primary placeholder:text-sm"
                    />
                    {errors?.awardsWebsite && (
                      <span className="text-red-500 text-left text-sm mt-1 w-full absolute left-0 top-full">
                        {errors?.awardsWebsite?.message}
                      </span>
                    )}
                  </div>
                  <span className="absolute top-1/2 right-[10px] -translate-y-1/2 text-sm text-[#9CA3AF]">
                    {watch("awardsWebsite")?.length || 0}/200
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-x-5 pt-5 mt-5 border-t border-[#cae0e7]">
              <div className="flex gap-x-2 justify-center items-center py-3">
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
              <button
                onClick={handleUpdateAward}
                className="bg-secondary text-white px-10 py-4 border-2 border-transparent transition duration-300 hover:border-secondary hover:bg-white hover:text-secondary"
              >
                Update Award
              </button>
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

export default EditAwardDetail;
