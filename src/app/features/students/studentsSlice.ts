import { createSlice } from "@reduxjs/toolkit";
import { StudentsStateType } from "./types";
import { studentsApi } from ".";

const initialState: StudentsStateType = {
  createStudentModal: { open: false },
  deletingStudentIds: [],
  settlementModal: { open: false },
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setSettlementModal: (state, { payload }) => {
      state.settlementModal = payload;
    },
    setCreateStudentModal: (state, { payload }) => {
      state.createStudentModal = payload;
    },
  },
  extraReducers: (builder) => {
    // create student
    builder.addMatcher(
      studentsApi.endpoints.createStudent.matchFulfilled,
      (state) => {
        state.createStudentModal = { open: false };
      }
    );
    // update student
    builder.addMatcher(
      studentsApi.endpoints.updateStudent.matchFulfilled,
      (state) => {
        state.createStudentModal = { open: false };
      }
    );
    // delete student
    builder.addMatcher(
      studentsApi.endpoints.deleteStudent.matchPending,
      (state, { meta }) => {
        state.deletingStudentIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      studentsApi.endpoints.deleteStudent.matchFulfilled,
      (state, { meta }) => {
        state.deletingStudentIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      studentsApi.endpoints.deleteStudent.matchRejected,
      (state, { meta }) => {
        state.deletingStudentIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
  },
});

const { actions, reducer } = studentsSlice;
export const { setCreateStudentModal } = actions;

export default reducer;
