import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import {
  getAllContact,
  joinTeamContact,
  resetSuccessContact,
} from "@/redux/joinTeamContactSlice";
import { IMemberContact } from "@/type/member/member.type";
import { toast } from "react-toastify";
interface IData {
  fullName: string;
  email: string;
}

interface IProps {
  isShowModal: boolean;
  handleCloseModal: () => void;
}

const joinTeamModalSchemaValidation = Yup.object({
  fullName: Yup.string()
    .max(30, "Full Name must be less than 30 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .max(50, "Email must be less than 50 characters")
    .matches(
      /^[a-zA-Z0-9.]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is not valid"
    )
    .required("Email is required"),
});

const JoinTeamModal = ({ isShowModal, handleCloseModal }: IProps) => {
  const userAccount = useSelector(
    (state: RootState) => state.ProfileReducer.userInfo
  );

  const AllContact = useSelector(
    (state: RootState) => state.JoinTeamContactReducer.memberContact
  );

  const success = useSelector(
    (state: RootState) => state.JoinTeamContactReducer.success
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IData>({
    resolver: yupResolver(joinTeamModalSchemaValidation),
    mode: "all",
  });

  useEffect(() => {
    setValue("fullName", userAccount.username, {
      shouldValidate: true,
    });
    setValue("email", userAccount.emailAddress, {
      shouldValidate: true,
    });
  }, [getValues, setValue, userAccount]);

  useEffect(() => {
    dispatch(getAllContact());
  }, []);

  const checkDuplicateId = (id: number) => {
    const check = AllContact.find((item: IMemberContact) => item.userId === id);
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async () => {
    if (checkDuplicateId(userAccount.id)) {
      toast.error("You sended request to this team already");
      handleCloseModal();
      return;
    } else {
      toast.success("Successfully sent request");
      return await dispatch(
        joinTeamContact(parseInt(router.query.teamId as string))
      );
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccessContact());
      dispatch(getAllContact());
      handleCloseModal();
    }
  }, [success, dispatch, handleCloseModal]);

  return (
    <Modal keepMounted open={isShowModal} onClose={handleCloseModal}>
      <div className="absolute top-1/2 left-1/2 rounded-lg  z-40 w-4/5 md:w-5/12 lg:w-2/6 mx-auto bg-white -translate-x-1/2 -translate-y-1/2">
        <form className="p-10 font-nunito" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h1 className="text-2xl mb-4">Join Team</h1>
            <p className="mb-4 text-sm">some thing description</p>
            <div className="block">
              <div className="mb-4 ">
                <input
                  className="border-solid  w-full  border-2 border-[#eff0f5]  rounded-3xl px-3 py-2 outline-none focus:shadow-md focus:border-[#eff0f5]"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                  maxLength={30}
                  disabled={true}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  className="border-solid  w-full  border-2 border-[#eff0f5]  rounded-3xl px-3 py-2 outline-none focus:shadow-md focus:border-[#eff0f5]"
                  type="text"
                  placeholder="Email"
                  {...register("email")}
                  maxLength={50}
                  disabled={true}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                disabled={errors.fullName || errors.email ? true : false}
                className={`${
                  errors.fullName || errors.email
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } bg-[#848abd] text-white block text-center mb-4 rounded-3xl px-3 py-2 w-1/4 shadow-lg mx-auto`}
                type="submit"
              >
                Join
              </button>
            </div>
          </label>
        </form>
      </div>
    </Modal>
  );
};

export default JoinTeamModal;
