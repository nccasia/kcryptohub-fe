import CardItems from "@/components/team/CardItems";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getMemberByTeamId } from "@/redux/memberSlice";
import { addToShortList, removeFromShortList } from "@/redux/profileSlice";
import { getUserInfoSelector } from "@/redux/selector";
import { RootState } from "@/redux/store";
import {
  Bookmark,
  BookmarkBorderOutlined,
  ChatOutlined,
  Edit,
  Language,
  SettingsOutlined,
} from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JoinTeamModal from "./JoinTeamModal";

const CardInfo = ({ editable }: { editable: boolean }) => {
  const [show, setShow] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalMobile, setIsShowModalMobile] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);
  const userProfile = useAppSelector(getUserInfoSelector);
  const router = useRouter();
  const handleVisitWebsite = (url: string) => {
    if (typeof window !== "undefined") window.open(url, "_blank")?.focus();
  };
  const dispatch = useAppDispatch();

  const getMemberApproved = useSelector(
    (state: RootState) => state.MemberReducer?.member
  );

  useEffect(() => {
    const id = getMemberApproved?.find(
      (item) => item?.user?.id === userProfile?.id
    );
    if (id) {
      setIsApproved(true);
    }
  }, [getMemberApproved]);

  useEffect(() => {
    if (router.isReady) {
      dispatch(getMemberByTeamId(parseInt(router.query.teamId as string)));
    }
  }, [router.isReady]);

  const handleAddToShortList = () => {
    dispatch(addToShortList(teamProfile.id));
  };
  const handleRemoveFromShortList = () => {
    dispatch(removeFromShortList(teamProfile.id));
  };
  const handleShowModal = () => {
    setIsShowModal(true);
  };
  const handleCloseModal = () => {
    setIsShowModal(false);
  };
  const handleShowModalMobile = () => {
    setIsShowModalMobile(true);
  };
  const handleCloseModalMobile = () => {
    setIsShowModalMobile(false);
  };

  return (
    <div>
      <div
        className="hidden fixed w-[50px] flex top-0 right-4 float-right
    md:block md:top-44 rounded-full z-20 font-nunito"
      >
        <div
          className="mb-3 fixed w-[50px] flex right-4 float-right bg-white border border-[#848ABD] shadow-xl 
    md:block top-32 rounded-full"
        >
          <div
            className="bg-white flex gap-x-2 mx-2 my-3 justify-center items-center cursor-pointer border-x border-[#cae0e7] md:border-0"
            onClick={() => setShow((cur) => !cur)}
          >
            <div>
              <SettingsOutlined className="text-[#404040] text-md hover:text-[#848ABD]" />
            </div>
          </div>
        </div>
        <div
          className={`fixed mt-4 w-[50px] flex  right-4 float-right bg-white z-[9999] border border-[#848ABD] shadow-xl 
      rounded-full transition-all ${show ? "md:block" : "hidden"}`}
        >
          {editable ? (
            <div className="bg-white flex gap-x-2 mx-2 my-3 justify-between items-center cursor-pointer border-r border-[#cae0e7] md:border-0">
              <CardItems
                type={1}
                pathName={"/team/[teamId]/dashboard"}
                title={"Edit"}
              />
            </div>
          ) : null}
          <CardItems
            title={"Website"}
            type={2}
            website={teamProfile.linkWebsite}
          />
          <CardItems
            type={3}
            title={"Shortlist"}
            teamId={teamProfile.id}
            checkShortlist={userProfile.shortList?.includes(teamProfile.id)}
          />
          <div className="bg-white flex gap-x-2 mx-2 my-3 justify-between items-center cursor-pointer border-r border-[#cae0e7] md:border-0">
            <CardItems
              type={1}
              pathName={"/team/[teamId]/contact"}
              title={"Contact"}
            />
          </div>

          {userProfile.username && !editable && isApproved === false ? (
            <div className="bg-white flex gap-x-2 mx-2 my-3 justify-center items-center cursor-pointer">
              <CardItems
                type={4}
                title={"Join team"}
                handleShowModal={handleShowModal}
              />
              <JoinTeamModal
                isShowModal={isShowModal}
                handleCloseModal={handleCloseModal}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className="md:hidden sticky w-full flex bottom-0 float-right bg-white z-20 border border-[#cae0e7] shadow-xl 
    md:bottom-1/3"
      >
        {editable ? (
          <div className="bg-white flex gap-x-2 mx-2 my-3 justify-center items-center w-1/4 cursor-pointer border-r border-[#cae0e7] md:border-0">
            <Link
              href={{
                pathname: `/team/[teamId]/dashboard`,
                query: { teamId: router.query.teamId },
              }}
            >
              <a className="flex items-center justify-center relative ">
                <Edit className="text-[#404040] text-[20px] hover:text-[#848ABD] " />
              </a>
            </Link>
          </div>
        ) : null}
        <div
          onClick={() => handleVisitWebsite(teamProfile.linkWebsite)}
          className={`mx-2 my-3 flex gap-x-2 flex-col justify-center items-center rounded-full cursor-pointer ${
            editable ? "w-1/4" : "w-2/4"
          }`}
        >
          <div className="w-full flex justify-center relative">
            <Language className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
          </div>
        </div>
        <div className="bg-white flex gap-x-2 mx-2 my-3 justify-center w-1/4 items-center cursor-pointer border-x border-[#cae0e7] md:border-0">
          {userProfile.shortList?.includes(teamProfile.id) ? (
            <div
              className="w-full flex justify-center relative "
              onClick={handleRemoveFromShortList}
            >
              <Bookmark className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
            </div>
          ) : (
            <div
              className="w-full flex justify-center relative"
              onClick={handleAddToShortList}
            >
              <BookmarkBorderOutlined className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
            </div>
          )}
        </div>
        <Link
          href={{
            pathname: `/team/[teamId]/contact`,
            query: { teamId: router.query.teamId },
          }}
        >
          <div className="bg-white flex gap-x-2 mx-2 my-3 w-1/4 justify-center items-center cursor-pointer">
            <div className="w-full flex justify-center relative ">
              <ChatOutlined className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
            </div>
          </div>
        </Link>
        {userProfile.username && !editable && isApproved === false ? (
          <div className="bg-white flex gap-x-2 mx-2 my-3 justify-center w-1/4 items-center cursor-pointer border-x border-[#cae0e7] md:border-0">
            <>
              <div
                className="w-full flex justify-center relative "
                onClick={handleShowModalMobile}
              >
                <GroupsIcon className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
              </div>

              <JoinTeamModal
                isShowModal={isShowModalMobile}
                handleCloseModal={handleCloseModalMobile}
              />
            </>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CardInfo;
