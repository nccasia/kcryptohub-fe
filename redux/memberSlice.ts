
import axiosClient from "@/api/axios-client";
import { memberApi } from "@/api/member-api";
import { IMember, IMemberAddRequest, IRemoveMember } from "@/type/member/member.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getMemberList = createAsyncThunk(
  "getMemberList",
  async (teamId: number) => {
    if (isNaN(teamId)) return null;
    try {
      const response = await memberApi.getAllMemberLists(teamId)
      return response;
    }
    catch (error) {
      return [];
    }
  }
)

export const joinTeam = createAsyncThunk(
  "joinTeam",
  async (teamId: number) => {
    if (isNaN(teamId)) return null;
    try {
      const response = await memberApi.joinTeam(teamId)
      return response;
    }
    catch (error) {
      return [];
    }
  }
)

export const addMember = createAsyncThunk(
  "addMember",
  async ({ teamId, members }: IMemberAddRequest) => {
    try {
      const data = await memberApi.addMember({ teamId, members });
      return data;
    }
    catch (error) {
      return [];
    }
  }
)

export const removeMember = createAsyncThunk(
  "removeMember",
  async ({ teamId, memberId }: IRemoveMember) => {
    try {
      const data = await memberApi.removeMember({ teamId, memberId });
      return data
    } catch (error) {
      return [];
    }
  }
)

interface initialState {
  member: IMember[];
  success: boolean;
}

const initialState: initialState = {
  member: [],
  success: false
}

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getMemberList.rejected, (state, action) => {
        toast.error(action.error.message, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .addCase(getMemberList.fulfilled, (state, action) => {
        state.member = action.payload?.content;
      })
    builder
      .addCase(addMember.rejected, (state, action) => {
        toast.error(action.error.message, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.success = true
        toast.success("Members successfully invited", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      })
    builder
      .addCase(removeMember.rejected, (state, action) => {
        toast.error(action.error.message, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.success = true;
        toast.success("Delete Success!", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
    builder.addCase(joinTeam.rejected, (state, action) => {
      toast.error(action.error.message, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    )
    builder.addCase(joinTeam.fulfilled, (state, action) => {
      state.success = true;
    })
  },
})

export const { resetSuccess } = memberSlice.actions;

export default memberSlice.reducer;