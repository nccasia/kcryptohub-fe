import { joinTeamApi } from "@/api/joinTeam-api";
import { IAddToMemberList, IMemberContact } from "@/type/member/member.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const joinTeamContact = createAsyncThunk(
	"joinTeamContact",
	async (teamId: number) => {
		if (isNaN(teamId)) return null;
		try {
			const response = await joinTeamApi.postContactJoinTeam(teamId);
			return response;
		} catch (error) {
			return (error as any).response;
		}
	}
)

export const getContact = createAsyncThunk(
	"getContact",
	async (teamId: number) => {
		if (isNaN(teamId)) return null;
		try {
			const response = await joinTeamApi.getContactJoinTeam(teamId);
			return response;
		} catch (error) {
			return (error as any).response;
		}
	}
)

export const changeStatus = createAsyncThunk(
	"changeStatus",
	async (id: number) => {
		try {
			const response = await joinTeamApi.putChangeStatusJoinTeam(id);
			return response;
		} catch (error) {
			return (error as any).response;
		}
	}
)

export const deleteContact = createAsyncThunk(
	"deleteContact",
	async (id: number) => {
		try {
			const response = await joinTeamApi.deleteContactJoinTeam(id);
			return response;
		} catch (error) {
			return (error as any).response;
		}
	}
)

export const addToMemberList = createAsyncThunk(
	"addToMemberList",
	async ({ teamId, userId }: IAddToMemberList) => {
		if (isNaN(teamId)) return null;
		try {
			const response = await joinTeamApi.addToMemberList({ teamId: teamId, userId: userId });
			return response;
		} catch (error) {
			return (error as any).response;
		}
	}
)

export const getAllContact = createAsyncThunk(
	"getAllContact",
	async () => {
		try {
			const response = await joinTeamApi.getAllContactJoinTeam();
			return response;
		} catch (error) {
			return (error as any).response;
		}
	})

interface initialState {
	memberContact: IMemberContact[];
	loading: boolean;
	success: boolean;
	changeStatusSuccess: {
		isApproved: boolean;
		userId: number;
	};
	error: {
		message: string;
		statusCode: number;
	}
}

const initialState: initialState = {
	memberContact: [],
	loading: false,
	success: false,
	changeStatusSuccess: {
		isApproved: false,
		userId: 0,
	},
	error: {
		message: "",
		statusCode: 0,
	}
}

export const joinTeamContactSlice = createSlice({
	name: "joinTeamContact",
	initialState,
	reducers: {
		resetSuccessContact: (state) => {
			state.success = false;
		},
		resetLoading: (state) => {
			state.loading = false;
		}
	},
	extraReducers(builder) {
		builder.addCase(getContact.pending, (state) => {
			state.loading = true;
		})
			.addCase(getContact.fulfilled, (state, action) => {
				state.memberContact = action.payload;
			})
			.addCase(getContact.rejected, (state, action) => {
				state.loading = false;
			})

		builder.addCase(joinTeamContact.pending, (state) => {
			state.loading = true;
		}).addCase(joinTeamContact.fulfilled, (state, action) => {
			state.success = true;
			state.loading = false;
			state.error = action.payload?.data
		}).addCase(joinTeamContact.rejected, (state, action) => {
			state.loading = false;
		})

		builder.addCase(changeStatus.pending, (state) => {
			state.loading = true;
		}).addCase(changeStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.changeStatusSuccess.isApproved = action.payload?.isApproved;
			state.changeStatusSuccess.userId = action.payload?.userId;
		}).addCase(changeStatus.rejected, (state, action) => {
			state.loading = false;
			// state.error = action.error.response;
		})

		builder.addCase(deleteContact.pending, (state) => {
			state.loading = true;
		}).addCase(deleteContact.fulfilled, (state, action) => {
			state.success = true;
			state.loading = false;
		}).addCase(deleteContact.rejected, (state, action) => {
			state.loading = false;
			// state.error = action.error.response;
		})

		builder.addCase(addToMemberList.pending, (state) => {
			state.loading = true;
		}).addCase(addToMemberList.fulfilled, (state, action) => {
			state.success = true;
			state.loading = false;
		}).addCase(addToMemberList.rejected, (state, action) => {
			state.loading = false;
			// state.error = action.error.response;
		})

		builder.addCase(getAllContact.pending, (state) => {
			state.loading = true;
		}
		).addCase(getAllContact.fulfilled, (state, action) => {
			state.memberContact = action.payload;
			state.loading = false;
		}).addCase(getAllContact.rejected, (state, action) => {
			state.loading = false;
			// state.error = action.error.response;
		})

	}
})

export const { resetSuccessContact, resetLoading } = joinTeamContactSlice.actions;

export default joinTeamContactSlice.reducer;