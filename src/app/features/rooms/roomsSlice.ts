import { createSlice } from "@reduxjs/toolkit";
import { RoomsStateType } from "./types";
import { roomsApi } from ".";

const initialState: RoomsStateType = {
  deletingRoomIds: [],
  createRoomModal: { open: false },
};

const studentsSlice = createSlice({
  name: "dormitories",
  initialState,
  reducers: {
    setCreateRoomModal: (state, { payload }) => {
      state.createRoomModal = payload;
    },
  },
  extraReducers: (builder) => {
    // create room
    builder.addMatcher(
      roomsApi.endpoints.createRoom.matchFulfilled,
      (state) => {
        state.createRoomModal = { open: false };
      }
    );
    // update room
    builder.addMatcher(
      roomsApi.endpoints.updateRoom.matchFulfilled,
      (state) => {
        state.createRoomModal = { open: false };
      }
    );
    // delete dormitory
    builder.addMatcher(
      roomsApi.endpoints.deleteRoom.matchPending,
      (state, { meta }) => {
        state.deletingRoomIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      roomsApi.endpoints.deleteRoom.matchFulfilled,
      (state, { meta }) => {
        state.deletingRoomIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      roomsApi.endpoints.deleteRoom.matchRejected,
      (state, { meta }) => {
        state.deletingRoomIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
  },
});

const { actions, reducer } = studentsSlice;
export const { setCreateRoomModal } = actions;

export default reducer;
