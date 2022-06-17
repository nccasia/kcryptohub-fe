import AwardList from "@/components/awards/AwardList";
import { IconMap } from "@/components/IconSVG/IconMap";
import { deleteAward, getAwardById, getAwards } from "@/redux/awardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AwardLayout from "@/src/layouts/awards/AwardLayout";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { Layout } from "@/src/layouts/layout";
import { Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

const AwardDetail = () => {
  const router = useRouter();
  const { awardDetail } = useAppSelector((state) => state.AwardsReducer);
  const { teamId } = useAppSelector((state) => state.DashboardReducer);
  const dispatch = useAppDispatch();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    if (router.query?.awardId) {
      dispatch(getAwardById(router.query?.awardId as string));
    }
  }, [dispatch, router.query?.awardId]);

  const handleRedirect = async () => {
    router.push(`/team/${teamId}/dashboard/awards`);
  };
  const handleDeleteAward = async () => {
    setOpenConfirmModal(false);
    await dispatch(
      deleteAward({ award: awardDetail, handler: handleRedirect })
    );
    await dispatch(getAwards(parseInt(teamId)));
  };

  if (router.isFallback) {
    return (
      <div className="bg-[#e8eef0]">
        <Layout>
          <CircularProgress />
        </Layout>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <AwardLayout>
          <div className="mb-5">
            <h2 className="text-3xl text-primary font-normal mb-5">
              {awardDetail?.awardsTitle}
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
                href={awardDetail?.awardsWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#08537E] cursor-pointer hover:underline"
              >
                {awardDetail?.awardsWebsite}
              </a>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-[#cae0e7] flex flex-col-reverse sm:flex-row justify-between items-center">
            <div className="flex gap-x-2 items-center py-3">
              <span
                className="text-sm text-[#08537E] cursor-pointer hover:underline"
                onClick={() => setOpenConfirmModal(true)}
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
              href={{
                pathname: `/team/[teamId]/dashboard/awards/[awardId]/edit`,
                query: { teamId, awardId: router.query.awardId },
              }}
              passHref
            >
              <button className="bg-secondary text-white px-10 py-3 border-2 border-transparent transition duration-300 w-full sm:w-auto hover:border-secondary hover:bg-white hover:text-secondary">
                Edit Award
              </button>
            </Link>
          </div>
        </AwardLayout>
      </DashboardLayout>
      <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
        <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] w-full shadow-lg outline-none p-4 text-center">
          <span className="text-primary text-2xl my-5 block font-medium">
            Delete Award?
          </span>
          <span className="text-primary text-lg mb-4 block">
            This will permanently delete the following Award:
          </span>
          <span className="text-[#6A797D] text-lg font-bold">
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
              className="px-7 py-4 bg-secondary text-white text-sm rounded-sm"
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

export default AwardDetail;
