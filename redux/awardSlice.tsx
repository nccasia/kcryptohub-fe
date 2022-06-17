import axiosClient from "@/api/axios-client";
import { IAwardDetail, IAwardParams } from "@/type/awards/awards.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAwardById = createAsyncThunk(
  "getAwardById",
  async (id: string) => {
    try {
      const response = await axiosClient.get(`/awards/get/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const getAwards = createAsyncThunk(
  "getAwards",
  async (teamId: number) => {
    const response = await axiosClient.get(`/awards/getAllAwards/${teamId}`);
    return response.data;
  }
);
export const createAward = createAsyncThunk(
  "createAward",
  async ({ award, handler }: IAwardParams) => {
    const response = await axiosClient.post(`/awards/create`, award);
    return { data: response.data, handler };
  }
);
export const deleteAward = createAsyncThunk(
  "deleteAward",
  async ({ award, handler }: IAwardParams) => {
    const response = await axiosClient.delete(`/awards/delete/${award.id}`);

    return { data: response.data, handler };
  }
);
export const editAward = createAsyncThunk(
  "editAward",
  async ({ award }: IAwardParams) => {
    await axiosClient.put(`/awards/update/${award.id}`, award);
  }
);

const initialState = {
  awards: [] as IAwardDetail[],
  awardDetail: {} as IAwardDetail,
};

export const awardsSlice = createSlice({
  name: "awards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAwardById.fulfilled, (state, action) => {
        state.awardDetail = action.payload;
      })
      .addCase(getAwardById.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getAwards.fulfilled, (state, action) => {
        state.awards = action.payload;
      })
      .addCase(createAward.fulfilled, (state, action) => {
        action.payload.handler(action.payload.data.id);
        toast.success("Create Award Success!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(deleteAward.fulfilled, (state, action) => {
        action.payload.handler();
        toast.success(action.payload.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(editAward.fulfilled, () => {
        toast.success("Edit Award Success!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  },
});

export default awardsSlice.reducer;
