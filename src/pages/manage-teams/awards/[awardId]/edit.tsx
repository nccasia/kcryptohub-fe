import { awardsApi } from "@/api/awards";
import AwardList from "@/components/awards/AwardList";
import { IconMap } from "@/components/IconSVG/IconMap";
import { getAwards } from "@/redux/awardSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Layout } from "@/src/layouts/layout";
import { IAwardDetail } from "@/type/awards/awards.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

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

interface EditAwardDetail {
  awardDetail: IAwardDetail;
}
const EditAwardDetail = ({ awardDetail }: EditAwardDetail) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAwardDetail>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
    defaultValues: {
      id: awardDetail?.id,
      awardsTitle: awardDetail?.awardsTitle,
      awardsWebsite: awardDetail?.awardsWebsite,
    },
  });

  const handleUpdateAward = () => {
    handleSubmit(async (value) => {
      awardsApi.editAward(value, handleGetAwards);
    })();
  };
  const handleGetAwards = (teamId: number) => {
    dispatch(getAwards(teamId));
  };
  const handleRedirect = (teamId: number) => {
    router.push("/manage-teams/awards");
    dispatch(getAwards(teamId));
  };

  const handleDeleteAward = () => {
    setOpenConfirmModal(false);
    handleSubmit(async (value) => {
      awardsApi.deleteAward(value, handleRedirect);
    })();
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

export default EditAwardDetail;
