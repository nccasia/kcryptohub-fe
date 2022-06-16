import { awardsApi } from "@/api/awards";
import AwardList from "@/components/awards/AwardList";
import { IconMap } from "@/components/IconSVG/IconMap";
import { Layout } from "@/src/layouts/layout";
import { IAwardDetail } from "@/type/awards/awards.type";
import { Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface AwardDetailProps {
  awardDetail: IAwardDetail;
}

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

const AwardDetail = ({ awardDetail }: AwardDetailProps) => {
  const router = useRouter();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleRedirect = () => {
    router.push("/manage-teams/awards");
  };
  const handleDeleteAward = async () => {
    setOpenConfirmModal(false);
    await awardsApi.deleteAward(awardDetail, handleRedirect);
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
      <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
        <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] w-full shadow-lg outline-none p-4 text-center">
          <span className="text-primary text-2xl my-5 block font-medium">
            Delete Award?
          </span>
          <span className="text-primary text-lg mb-4 block">
            This will permanently delete the following Award:
          </span>
          <span className="text-[#6A797D] text-lg font-bold">
            {awardDetail.awardsTitle}
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

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const awardId = context.params?.awardId;
  const res = await fetch(`${process.env.API_URL}/api/awards/get/${awardId}`);
  const awardInfo = await res.json();
  let awardDetail;
  awardInfo.map((item: IAwardDetail) => (awardDetail = item));
  if (!awardInfo.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      awardDetail,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await fetch(`${process.env.API_URL}/api/awards/getAllAwards/1`);
  // const awards = (await res.json()) || [];

  // const paths = awards.map((award: IAwardDetail) => ({
  //   params: { awardsId: award.id?.toString() },
  // }));
  return {
    paths: [],
    // paths,
    fallback: true,
  };
};

export default AwardDetail;
