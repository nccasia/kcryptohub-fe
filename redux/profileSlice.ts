import axiosClient from "@/api/axios-client";
import { IProfile } from "@/type/profile/profile.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getProfile = createAsyncThunk("getProfile", async () => {
  const response = await axiosClient.get("/profile");
  return response.data;
});

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (user: IProfile) => {
    const response = await axiosClient.put(`/profile/${user.id}`, {
      username: user.username,
      emailAddress: user.emailAddress,
    });
    return response.data;
  }
);

const initialState = {
  userInfo: {} as IProfile,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default profileSlice.reducer;
