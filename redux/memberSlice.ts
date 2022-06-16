import axiosClient from "@/api/axios-client";
import { memberApi } from "@/api/member-api";
import { IMember } from "@/type/member/member.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export const getMemberList = createAsyncThunk(
  "getMemberList",
  async () => {
    try {
      const data = await memberApi.getAllMemberLists();
      return data;
    }
    catch (error) {
      return [];
    }
  }
)

export const joinTeam = createAsyncThunk(
  "joinTeam",
  async (teamId: number) => {
    try {
      const data = await memberApi.joinTeam(teamId);
      return data;
    }
    catch (error) {
      return [];
    }
  }
)

export const addMember = createAsyncThunk(
  "addMember",
  async (members: IMember[]) => {
    try {
      const data = await memberApi.addMember(1, members);
      return data;
    }
    catch (error) {
      return [];
    }
  }
)





const initialState = {
  member: [] as IMember[],
}

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
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
        state.member = action.payload.content;

      })
  },
})



export const MemberReducer = memberSlice.reducer;