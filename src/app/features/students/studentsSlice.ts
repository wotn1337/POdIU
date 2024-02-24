import { createSlice } from "@reduxjs/toolkit";
import { StudentsStateType } from "./types";
import { apiSlice } from "../api";

const initialState: StudentsStateType = {
  createStudentModal: { open: false },
  deletingStudentIds: [],
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
  },
});

const { actions, reducer } = studentsSlice;
export const { setCreateStudentModal, setSettlementStudent } = actions;

export default reducer;
