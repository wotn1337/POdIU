import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RoomsStateType } from "./types";
import { apiSlice } from "../api";

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
    setSettlementModalByRoom: (
      state,
      { payload }: PayloadAction<RoomsStateType["settlementModal"]>
    ) => {
      state.settlementModal = payload;
    },
    setSettlementHistoryModal: (
      state,
      { payload }: PayloadAction<RoomsStateType["settlementHistoryModal"]>
    ) => {
      state.settlementHistoryModal = payload;
    },
  },
  extraReducers: (builder) => {
    // create room
    builder.addMatcher(
      apiSlice.endpoints.createRoom.matchFulfilled,
      (state) => {
        state.createRoomModal = { open: false };
      }
    );
    // update room
    builder.addMatcher(
      apiSlice.endpoints.updateRoom.matchFulfilled,
      (state) => {
        state.createRoomModal = { open: false };
      }
    );
    // delete dormitory
    builder.addMatcher(
      apiSlice.endpoints.deleteRoom.matchPending,
      (state, { meta }) => {
        state.deletingRoomIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteRoom.matchFulfilled,
      (state, { meta }) => {
        state.deletingRoomIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteRoom.matchRejected,
      (state, { meta }) => {
        state.deletingRoomIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
  },
});

const { actions, reducer } = studentsSlice;
export const {
  setCreateRoomModal,
  setSettlementModalByRoom,
  setSettlementHistoryModal,
} = actions;

export default reducer;
