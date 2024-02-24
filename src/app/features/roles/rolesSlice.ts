import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { RolesStateType } from "./types";

const initialState: RolesStateType = {
  deleteRoleIds: [],
  createRoleModal: { open: false },
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setCreateRoleModal: (state, { payload }) => {
      state.createRoleModal = payload;
    },
  },
  extraReducers: (builder) => {
    // delete role
    builder.addMatcher(
      apiSlice.endpoints.deleteRole.matchPending,
      (state, { meta }) => {
        state.deleteRoleIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteRole.matchFulfilled,
      (state, { meta }) => {
        state.deleteRoleIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteRole.matchRejected,
      (state, { meta }) => {
        state.deleteRoleIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    // create role
    builder.addMatcher(
      apiSlice.endpoints.createRole.matchFulfilled,
      (state) => {
        state.createRoleModal = { open: false };
      }
    );
    // update role
    builder.addMatcher(
      apiSlice.endpoints.updateRole.matchFulfilled,
      (state) => {
        state.createRoleModal = { open: false };
      }
    );
  },
});

const { actions, reducer } = rolesSlice;
export const { setCreateRoleModal } = actions;

export default reducer;
