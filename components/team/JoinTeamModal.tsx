import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
interface IData {
  fullName: string;
  email: string;
}

const JoinTeamModal = ({ isShowModal, handleCloseModal }: any) => {
  return (
    <Modal keepMounted open={isShowModal} onClose={handleCloseModal}>
      <div className="absolute top-1/2 left-1/2 rounded-lg  z-40 w-4/5 md:w-5/12 lg:w-2/6 mx-auto bg-white -translate-x-1/2 -translate-y-1/2">
        <form className="p-10 font-nunito">
          <label>
            <h1 className="text-2xl mb-4">Join Team</h1>
            <p className="mb-4 text-sm">some thing description</p>
            <div className="block">
              <div className="mb-4 ">
                <input
                  className="border-solid  w-full  border-2 border-[#eff0f5]  rounded-3xl px-3 py-2 outline-none focus:shadow-md focus:border-[#eff0f5]"
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-4">
                <input
                  className="border-solid  w-full  border-2 border-[#eff0f5]  rounded-3xl px-3 py-2 outline-none focus:shadow-md focus:border-[#eff0f5]"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <button
                className="bg-[#848abd] text-white block text-center mb-4 rounded-3xl px-3 py-2 w-1/4 shadow-lg mx-auto"
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
