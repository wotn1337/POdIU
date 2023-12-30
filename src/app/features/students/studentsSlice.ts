import { createSlice } from "@reduxjs/toolkit";
import { StudentsStateType } from "./types";
import {
  deleteStudent,
  getAcademicGroups,
  getCountries,
  getGenders,
  getStudents,
} from ".";

const initialState: StudentsStateType = {
  loading: false,
  students: [],
  current_page: 1,
  per_page: 10,
  openCreateModal: false,
  creating: false,
  deletingIds: [],
  academicGroups: [],
  countries: [],
  genders: [],
  loadingAcademicGroups: false,
  loadingCountries: false,
  loadingGenders: false,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.current_page = action.payload;
    },
    setPageSize: (state, action) => {
      state.per_page = action.payload;
    },
    setOpenCreateModal: (state, { payload }) => {
      state.openCreateModal = payload;
    },
  },
  extraReducers: (builder) => {
    // get students
    builder.addCase(getStudents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudents.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.students = payload.students;
      state.total = payload.meta.total;
    });
    builder.addCase(getStudents.rejected, (state) => {
      state.loading = false;
    });

    // delete student
    builder.addCase(deleteStudent.pending, (state, { meta: { arg } }) => {
      state.deletingIds.push(arg);
    });
    builder.addCase(deleteStudent.fulfilled, (state, { meta: { arg } }) => {
      state.deletingIds = state.deletingIds.filter((id) => id !== arg);
      state.students = state.students.filter(({ id }) => id !== arg);
    });
    builder.addCase(deleteStudent.rejected, (state, { meta: { arg } }) => {
      state.deletingIds = state.deletingIds.filter((id) => id !== arg);
    });

    // get countries
    builder.addCase(getCountries.pending, (state) => {
      state.loadingCountries = true;
    });
    builder.addCase(getCountries.fulfilled, (state, { payload }) => {
      state.loadingCountries = false;
      state.countries = payload.countries;
    });
    builder.addCase(getCountries.rejected, (state) => {
      state.loadingCountries = false;
    });

    // get genders
    builder.addCase(getGenders.pending, (state) => {
      state.loadingGenders = true;
    });
    builder.addCase(getGenders.fulfilled, (state, { payload }) => {
      state.loadingGenders = false;
      state.genders = payload.genders;
    });
    builder.addCase(getGenders.rejected, (state) => {
      state.loadingGenders = false;
    });

    // get academic groups
    builder.addCase(getAcademicGroups.pending, (state) => {
      state.loadingAcademicGroups = true;
    });
    builder.addCase(getAcademicGroups.fulfilled, (state, { payload }) => {
      state.loadingAcademicGroups = false;
      state.academicGroups = payload.academic_groups;
    });
    builder.addCase(getAcademicGroups.rejected, (state) => {
      state.loadingAcademicGroups = false;
    });
  },
});

const { actions, reducer } = studentsSlice;
export const { setPage, setPageSize, setOpenCreateModal } = actions;

export default reducer;
