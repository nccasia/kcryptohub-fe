import axiosClient from "@/api/axios-client";
import { memberApi } from "@/api/member-api";
import { IMember } from "@/type/member/member.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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


interface initialState {
  member: IMember[];
}

const initialState: initialState = {
  member: [],
}

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getMemberList.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(getMemberList.fulfilled, (state, action) => {
        console.log(action.payload);
      })
  },
})

export const MemberReducer = memberSlice.reducer;