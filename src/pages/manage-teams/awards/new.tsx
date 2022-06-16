import { awardsApi } from "@/api/awards";
import AwardList from "@/components/awards/AwardList";
import { IconMap } from "@/components/IconSVG/IconMap";
import { getAwards } from "@/redux/awardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Layout } from "@/src/layouts/layout";
import { IAwardDetail } from "@/type/awards/awards.type";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaValidation = Yup.object({
  awardsTitle: Yup.string().required("Award title is required!"),
  awardsWebsite: Yup.string()
    .required("Award website is required!")
    .url("Enter correct url!"),
});

const NewAward = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { awards } = useAppSelector((state) => state.AwardsReducer);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAwardDetail>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });
  const handleRedirectToAwardDetail = (id: number, teamId: number) => {
    if (teamId) {
      // router.push(`/manage-teams/awards/${id}`);
      dispatch(getAwards(teamId));
    }
  };

  const handleAddAward = () => {
    handleSubmit(async (value) => {
      awardsApi.createAward(
        { teamId: 1, ...value },
        handleRedirectToAwardDetail
      );
    })();
  };

  return (
    <div className="bg-[#e8eef0]">
      <Layout>
        <div className="container mx-auto grid grid-cols-12 gap-5 my-10">
          <AwardList />
          <div className="col-span-12 md:col-span-9 bg-white p-3 shadow-lg">
            <h2 className="text-3xl text-primary font-normal mb-3">
              Add a New Award
            </h2>
            {awards.length && awards.length < 10 && (
              <>
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
                <div className="flex flex-col-reverse sm:flex-row justify-between md:justify-end gap-x-5 pt-5 mt-5 border-t border-[#cae0e7]">
                  <Link href="/manage-teams/awards" passHref>
                    <button
                      type="button"
                      className="bg-white text-[#08537E] px-10 py-4 hover:underline"
                    >
                      Cancel
                    </button>
                  </Link>
                  <button
                    type="submit"
                    onClick={handleAddAward}
                    className="bg-secondary text-white px-10 py-4 border-2 border-transparent transition duration-300 hover:border-secondary hover:bg-white hover:text-secondary"
                  >
                    Add Award
                  </button>
                </div>
              </>
            )}
            {awards.length == 10 && (
              <p className="text-sm text-[#6A797D]">
                You have reached maximum awards limit (10).
              </p>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default NewAward;
