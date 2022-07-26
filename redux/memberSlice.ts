
import axiosClient from "@/api/axios-client";
import { memberApi } from "@/api/member-api";
import { IGetMemberList, IMember, IMemberAddRequest, IMemberPageAble, IRemoveMember } from "@/type/member/member.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getMemberList = createAsyncThunk(
  "getMemberList",
  async ({ teamId, page, size, sort }: IGetMemberList) => {
    if (isNaN(teamId)) return null;
    try {
      const response = await memberApi.getAllMemberLists({ teamId, page, size, sort });
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
      return (error as any).response.data;
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
  pageable: IMemberPageAble;
  success: boolean;
  error: {
    message: string;
    statusCode: number;
  }
}

const initialState: initialState = {
  member: [],
  pageable: {
    page: 0,
    size: 0,
    total: 0,
  },
  success: false,
  error: {
    message: "",
    statusCode: 0,
  }
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
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(getMemberList.fulfilled, (state, action) => {
        state.member = action.payload?.content;
        state.pageable = action.payload?.pageable;
      })
    builder
      .addCase(addMember.rejected, (state, action) => {
        toast.error(action.error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.success = true
        toast.success("Members successfully invited", {
          position: toast.POSITION.BOTTOM_RIGHT,
        })

      })
    builder
      .addCase(removeMember.rejected, (state, action) => {
        toast.error(action.error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.success = true;
        toast.success("Delete Success!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      })
    builder.addCase(joinTeam.rejected, (state, action) => {
      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

    }
    )
    builder.addCase(joinTeam.fulfilled, (state, action) => {
      if (action.payload?.statusCode === 201) {
        state.success = true;
      }
    })
  },
})

export const { resetSuccess } = memberSlice.actions;

export default memberSlice.reducer;