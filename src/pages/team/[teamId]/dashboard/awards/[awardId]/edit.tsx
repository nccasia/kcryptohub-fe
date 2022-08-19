import { teamApi } from "@/api/team-api";
import { IconMap } from "@/components/IconSVG/IconMap";
import {
  deleteAward,
  editAward,
  getAwardById,
  getAwards,
} from "@/redux/awardSlice";
import { setTeam } from "@/redux/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AwardLayout from "@/src/layouts/awards/AwardLayout";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { Layout } from "@/src/layouts/layout";
import { IAwardDetail } from "@/type/awards/awards.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Delete } from "@mui/icons-material";
const schemaValidation = Yup.object({
  awardsTitle: Yup.string().required("Award title is required!"),
  awardsWebsite: Yup.string()
    .required("Award website is required!")
    .url("Enter correct url!"),
});

const theme = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(5.43656px)",
          background: "rgba(23,49,59,.3)",
        },
      },
    },
  },
});

const EditAwardDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { awardDetail } = useAppSelector((state) => state.AwardsReducer);
  const teamId = useAppSelector((state) =>
    state.DashboardReducer.team.id.toString()
  );
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IAwardDetail>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  useEffect(() => {
    const getAward = async () => {
      if (router.query?.awardId) {
        await dispatch(getAwardById(router.query?.awardId as string));
      }
    };
    getAward();
  }, [dispatch, router.query?.awardId]);

  useEffect(() => {
    reset({
      id: awardDetail?.id,
      awardsTitle: awardDetail?.awardsTitle,
      awardsWebsite: awardDetail?.awardsWebsite,
      teamId: awardDetail?.teamId,
    });
  }, [awardDetail, reset]);

  const handleUpdateAward = () => {
    handleSubmit(async (value) => {
      (buttonRef.current as unknown as HTMLButtonElement).disabled = true;
      await dispatch(editAward({ award: value, handler: () => {} }));
      dispatch(getAwards(parseInt(teamId)));

      (buttonRef.current as unknown as HTMLButtonElement).disabled = false;
      router.push(`/team/${teamId}/dashboard/awards/${awardDetail.id}`);
    })();
  };
  const handleRedirect = async () => {
    router.push(`/team/${teamId}/dashboard/awards`);
  };

  const buttonRef = useRef(null);
  const handleDeleteAward = async () => {
    setOpenConfirmModal(false);
    await dispatch(
      deleteAward({ award: awardDetail, handler: handleRedirect })
    );
    await dispatch(getAwards(parseInt(teamId)));

    teamApi.getTeam(+teamId).then((data) => {
      dispatch(setTeam(data.data));
    });
  };
  if (router.isFallback) {
    return (
      <div className="bg-thirdary">
        <Layout>
          <div className="h-40 flex items-center justify-center">
            <CircularProgress />
          </div>
        </Layout>
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <AwardLayout>
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
                    className="md:max-w-[400px] w-full border-2 border-[##9CA3AF] pl-3 pr-14 py-2 outline-none placeholder:text-sm rounded-3xl"
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
                    className="md:max-w-[600px] w-full border-2 border-[#9CA3AF] pl-3 pr-16 py-2 outline-none rounded-3xl placeholder:text-sm"
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
            <div className="flex justify-center items-center py-3">
              <span
                className="text-sm text-[#848abd] cursor-pointer hover:underline"
                onClick={() => setOpenConfirmModal(true)}
              >
                Delete Award
              </span>
              <Delete className="text-[#848abd] mb-1" />
            </div>
            <button
              onClick={handleUpdateAward}
              className="bg-[#848abd] text-white px-10 py-3 border-2 border-transparent transition duration-300 w-full sm:w-auto rounded-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]"
              ref={buttonRef}
            >
              Update Award
            </button>
          </div>
        </AwardLayout>
      </DashboardLayout>
      <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
        <div className="bg-white rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] w-full shadow-lg outline-none p-4 text-center">
          <span className="text-[#848abd] text-2xl my-5 block font-medium">
            Delete Award?
          </span>
          <span className="text-[#60606] text-lg mb-4 block">
            This will permanently delete the following Award:
          </span>
          <span className="text-[#606060] text-lg font-bold">
            {awardDetail?.awardsTitle}
          </span>
          <div className="flex justify-between mt-10">
            <button
              className="p-4 bg-white text-[#08537E] text-sm"
              onClick={() => setOpenConfirmModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-7 py-2 bg-[#848abd] text-white text-sm rounded-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]"
              onClick={handleDeleteAward}
            >
              Delete Award
            </button>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  );
};

export default EditAwardDetail;
