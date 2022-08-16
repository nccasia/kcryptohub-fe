import axiosClient from "@/api/axios-client";
import { shortListApi } from "@/api/shortList-api";
import { IProfile } from "@/type/profile/profile.type";
import { ISkill } from "@/type/skill/skill.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getProfile = createAsyncThunk("getProfile", async () => {
  const response = await axiosClient.get("/profile");
  return response.data;
});

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (user: IProfile) => {
    const response = await axiosClient.put(`/profile/update`, {
      username: user.username,
      emailAddress: user.emailAddress,
      githubAddress: user.githubAddress,
      googleAddress: user.googleAddress,
      avatarPath: user.avatarPath,
      skills: user.skills,
    });
    return response.data;
  }
);

export const uploadAvatar = createAsyncThunk(
  "uploadAvatar",
  async ({ avatar, userId }: { avatar: File, userId: number }) => {
    const formData = new FormData();
    formData.append("file", avatar);
    const response = await axiosClient.post(`/profile/${userId}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const getSkills = createAsyncThunk(
  "getSkills",
  async (keyword: string) => {
    const response = await axiosClient.get(
      `/skill/list?page=1&size=100000&&keyword=${keyword}`
    );
    return response.data.content;
  }
);
export const addToShortList = createAsyncThunk(
  "addToShortList",
  async (teamId: number) => {
    if (isNaN(teamId)) return;
    const res = await shortListApi.addToShortList(teamId);
    return teamId;
  }
);

export const removeFromShortList = createAsyncThunk(
  "removeFromShortList",
  async (id: number) => {
    if (isNaN(id)) return;
    const res = await shortListApi.removeFromShortList(id);
    return id;
  }
);

export const removeAllShortList = createAsyncThunk(
  "removeAllShortList",
  async () => {
    const res = await shortListApi.removeAllShortList();
    return res;
  }
);

const initialState = {
  userInfo: {} as IProfile,
  skills: [] as ISkill[],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
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
      .addCase(updateProfile.fulfilled, (state, action) => {
        localStorage.setItem("accessToken", action.payload.accessToken);
        toast.success("Update profile successfull!", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        toast.error("Can't upload avatar!");
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
      })
      .addCase(addToShortList.rejected, (state, action) => {
        toast.error("Can't add to short list!");
      })
      .addCase(addToShortList.fulfilled, (state, action) => {
        if (!state.userInfo.shortList) state.userInfo.shortList = [];
        if (action.payload) {
          state.userInfo.shortList = [
            ...state.userInfo.shortList, action.payload,
          ];
        }
      })
      .addCase(removeFromShortList.rejected, (state, action) => {
        toast.error("Can't remove from short list!");
      })
      .addCase(removeFromShortList.fulfilled, (state, action) => {
        if (action.payload) {
          state.userInfo.shortList = state.userInfo.shortList.filter(item => item !== action.payload);
        }
      })
      .addCase(removeAllShortList.rejected, (state, action) => {
        toast.error("Can't remove all short list!");
      })
      .addCase(removeAllShortList.fulfilled, (state, action) => {
        state.userInfo.shortList = [];
      });
  },
});

export default profileSlice.reducer;
