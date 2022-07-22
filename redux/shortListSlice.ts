import { shortListApi } from "@/api/shortList-api";
import { Team } from "@/type/team/team.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getShortList = createAsyncThunk(
	"getShortList",
	async () => {
		const res = await shortListApi.getShortList();
		return res.data;
	}
);

export const addToShortList = createAsyncThunk(
	"addToShortList",
	async (teamId: number) => {
		if (isNaN(teamId)) return;
		const res = await shortListApi.addToShortList(teamId);
		return res.data;
	}
);

export const removeFromShortList = createAsyncThunk(
	"removeFromShortList",
	async (id: number) => {
		if (isNaN(id)) return;
		const res = await shortListApi.removeFromShortList(id);
		return res.data;
	}
);

interface initialState {
	shortList: Team[];
	loading: boolean;
	success: boolean;
}
const initialState: initialState = {
	shortList: [],
	loading: false,
	success: false,
};

export const shortListSlice = createSlice({
	name: "shortList",
	initialState,
	reducers: {
		setShortList: (state, action) => {
			state.shortList = action.payload;
		},
		resetLoading: (state) => {
			state.loading = false;
		},
		resetSuccess: (state) => {
			state.success = false;
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getShortList.pending, (state) => {
				state.loading = true;
			})
			.addCase(getShortList.fulfilled, (state, action) => {
				state.shortList = action.payload;
				console.log("payload|-> " + action.payload);
				state.loading = false;
				state.success = true;
			})
			.addCase(getShortList.rejected, (state) => {
				state.loading = false;
			})

		builder
			.addCase(addToShortList.pending, (state) => {
				state.loading = true;
			})
			.addCase(addToShortList.fulfilled, (state, action) => {
				state.shortList.push(action.payload);
				state.loading = false;
				state.success = true;
			})
			.addCase(addToShortList.rejected, (state) => {
				state.loading = false;
			})

		builder
			.addCase(removeFromShortList.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeFromShortList.fulfilled, (state, action) => {
				state.shortList = state.shortList.filter((team) => team.id !== action.payload);
				state.loading = false;
				state.success = true;
			})
			.addCase(removeFromShortList.rejected, (state) => {
				state.loading = false;
			})

	},
});
export default shortListSlice.reducer;
