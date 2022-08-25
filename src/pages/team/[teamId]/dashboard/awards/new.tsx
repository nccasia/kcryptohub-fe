import { teamApi } from "@/api/team-api";
import AwardList from "@/components/awards/AwardList";
import { IconMap } from "@/components/IconSVG/IconMap";
import { createAward, getAwards } from "@/redux/awardSlice";
import { setTeam } from "@/redux/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AwardLayout from "@/src/layouts/awards/AwardLayout";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { Layout } from "@/src/layouts/layout";
import { IAwardDetail } from "@/type/awards/awards.type";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
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
  const buttonRef = useRef(null);
  const dispatch = useAppDispatch();
  const { awards } = useAppSelector((state) => state.AwardsReducer);
  const teamId = useAppSelector((state) =>
    state.DashboardReducer.team.id.toString()
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAwardDetail>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  const handleRedirectToAwardDetail: Function = (id: number) => {
    if (id) {
      router.push(`/team/${teamId}/dashboard/awards/${id}`);
    }
  };

  const handleAddAward = () => {
    handleSubmit(async (value) => {
      const award = { teamId: parseInt(teamId), ...value };
      (buttonRef.current as unknown as HTMLButtonElement).disabled = true;
      await dispatch(
        createAward({ award, handler: handleRedirectToAwardDetail })
      );
      dispatch(getAwards(parseInt(teamId)));
      teamApi.getTeam(+teamId).then((data) => {
        dispatch(setTeam(data.data));
      });
      (buttonRef.current as unknown as HTMLButtonElement).disabled = false;
    })();
  };

  return (
    <DashboardLayout>
      <AwardLayout>
        <h2 className="text-3xl 3xl:text-4xl text-primary font-normal mb-3">
          Add a New Award
        </h2>
        {awards.length < 10 && (
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
              <span className="text-xl 3xl:text-2xl text-primary font-normal">
                Award Details
              </span>
            </div>
            <div className="md:pl-5">
              <div className="mb-3 pb-5">
                <h3 className="text-base 3xl:text-xl text-primary font-bold mb-1">
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
                      className="md:max-w-[400px] w-full border-2 border-[##9CA3AF] pl-3 pr-14 py-2 outline-none placeholder:text-sm 3xl:placeholder:text-base rounded-3xl"
                    />
                    {errors?.awardsTitle && (
                      <span className="text-red-500 text-left text-sm 3xl:text-lg mt-1 w-full absolute left-0 top-full">
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
                <h3 className="text-base 3xl:text-xl text-primary font-bold mb-1">
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
                      className="md:max-w-[600px] w-full border-2 border-[#9CA3AF] pl-3  3xl:placeholder:text-base pr-16 py-2 outline-none rounded-3xl placeholder:text-sm"
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
              <Link href={`/team/${teamId}/dashboard/awards`} passHref>
                <button
                  type="button"
                  className="bg-white px-10 3xl:text-lg py-4 hover:text-[#848abd]"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                onClick={handleAddAward}
                className="bg-[#848abd] text-white 3xl:text-lg px-4 py-2 border-2 border-transparent transition duration-300 rounded-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]"
                ref={buttonRef}
              >
                Add Award
              </button>
            </div>
          </>
        )}
        {awards.length == 10 && (
          <p className="text-sm 3xl:text-xl text-[#6A797D]">
            You have reached maximum awards limit (10).
          </p>
        )}
      </AwardLayout>
    </DashboardLayout>
  );
};

export default NewAward;
