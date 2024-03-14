import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StudentsStateType } from "./types";
import { apiSlice } from "../api";

const initialState: StudentsStateType = {
  createStudentModal: { open: false },
  deletingStudentIds: [],
  evictingStudentIds: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setCreateStudentModal: (state, { payload }) => {
      state.createStudentModal = payload;
    },
    setSettlementStudent: (state, { payload }) => {
      state.settlementStudent = payload;
    },
    setSettlementHistoryStudent: (
      state,
      { payload }: PayloadAction<StudentsStateType["settlementHistoryStudent"]>
    ) => {
      state.settlementHistoryStudent = payload;
    },
  },
  extraReducers: (builder) => {
    // create student
    builder.addMatcher(
      apiSlice.endpoints.createStudent.matchFulfilled,
      (state) => {
        state.createStudentModal = { open: false };
      }
    );
    // update student
    builder.addMatcher(
      apiSlice.endpoints.updateStudent.matchFulfilled,
      (state) => {
        state.createStudentModal = { open: false };
        state.settlementStudent = undefined;
      }
    );
    // delete student
    builder.addMatcher(
      apiSlice.endpoints.deleteStudent.matchPending,
      (state, { meta }) => {
        state.deletingStudentIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteStudent.matchFulfilled,
      (state, { meta }) => {
        state.deletingStudentIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteStudent.matchRejected,
      (state, { meta }) => {
        state.deletingStudentIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    // settle student
    builder.addMatcher(
      apiSlice.endpoints.settleStudent.matchFulfilled,
      (state) => {
        state.settlementStudent = undefined;
      }
    );
    // evict student
    builder.addMatcher(
      apiSlice.endpoints.evictStudent.matchPending,
      (state, { meta }) => {
        state.evictingStudentIds.push(meta.arg.originalArgs.studentId);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.evictStudent.matchFulfilled,
      (state, { meta }) => {
        state.evictingStudentIds.filter(
          (id) => id !== meta.arg.originalArgs.studentId
        );
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.evictStudent.matchRejected,
      (state, { meta }) => {
        state.evictingStudentIds.filter(
          (id) => id !== meta.arg.originalArgs.studentId
        );
      }
    );
  },
});

const { actions, reducer } = studentsSlice;
export const {
  setCreateStudentModal,
  setSettlementStudent,
  setSettlementHistoryStudent,
} = actions;

export default reducer;
