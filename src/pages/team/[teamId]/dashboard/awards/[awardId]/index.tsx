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
import { Delete, Language } from "@mui/icons-material";

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
  const teamId = useAppSelector((state) =>
    state.DashboardReducer.team.id.toString()
  );
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
      <div className="bg-thirdary">
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
              <Language className="text-[#848abd]" />
              <a
                href={awardDetail?.awardsWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#606060] cursor-pointer hover:underline"
              >
                {awardDetail?.awardsWebsite}
              </a>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-[#cae0e7] flex flex-col-reverse sm:flex-row justify-between items-center">
            <div className="flex items-center py-3">
              <span
                className="text-sm text-[#848abd] cursor-pointer hover:underline"
                onClick={() => setOpenConfirmModal(true)}
              >
                Delete Award
              </span>
              <Delete className="text-[#848abd] mb-1" />
            </div>
            <Link
              href={{
                pathname: `/team/[teamId]/dashboard/awards/[awardId]/edit`,
                query: { teamId, awardId: router.query.awardId },
              }}
              passHref
            >
              <button className="bg-[#848abd] text-white px-10 py-3 border-2 border-transparent transition duration-300 w-full sm:w-auto rounded-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]">
                Edit Award
              </button>
            </Link>
          </div>
        </AwardLayout>
      </DashboardLayout>
      <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
        <div className="bg-white rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] w-full shadow-lg outline-none p-4 text-center">
          <span className="text-[#848abd] text-2xl my-5 block font-medium">
            Delete Award?
          </span>
          <span className="text-[#606060] text-lg mb-4 block">
            This will permanently delete the following Award:
          </span>
          <span className="text-[#606060] text-lg font-bold">
            {awardDetail?.awardsTitle}
          </span>
          <div className="flex justify-between mt-10">
            <button
              className="p-4 bg-white text-[#848abd] text-sm"
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

export default AwardDetail;
