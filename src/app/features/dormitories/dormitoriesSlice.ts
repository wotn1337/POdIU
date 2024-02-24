import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { DormitoriesStateType } from "./types";

const initialState: DormitoriesStateType = {
  deletingDormitoryIds: [],
  createDormitoryModal: { open: false },
};

const studentsSlice = createSlice({
  name: "dormitories",
  initialState,
  reducers: {
    setCreateDormitoryModal: (state, { payload }) => {
      state.createDormitoryModal = payload;
    },
  },
  extraReducers: (builder) => {
    // create dormitory
    builder.addMatcher(
      apiSlice.endpoints.createDormitory.matchFulfilled,
      (state) => {
        state.createDormitoryModal = { open: false };
      }
    );
    // update dormitory
    builder.addMatcher(
      apiSlice.endpoints.updateDormitory.matchFulfilled,
      (state) => {
        state.createDormitoryModal = { open: false };
      }
    );
    // delete dormitory
    builder.addMatcher(
      apiSlice.endpoints.deleteDormitory.matchPending,
      (state, { meta }) => {
        state.deletingDormitoryIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteDormitory.matchFulfilled,
      (state, { meta }) => {
        state.deletingDormitoryIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteDormitory.matchRejected,
      (state, { meta }) => {
        state.deletingDormitoryIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
  },
});

const { actions, reducer } = studentsSlice;
export const { setCreateDormitoryModal } = actions;

export default reducer;
