import { createSlice } from "@reduxjs/toolkit";
import { RolesStateType } from "./types";
import { rolesApi } from "./rolesApi";

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
      rolesApi.endpoints.deleteRole.matchPending,
      (state, { meta }) => {
        state.deleteRoleIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      rolesApi.endpoints.deleteRole.matchFulfilled,
      (state, { meta }) => {
        state.deleteRoleIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      rolesApi.endpoints.deleteRole.matchRejected,
      (state, { meta }) => {
        state.deleteRoleIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    // create role
    builder.addMatcher(
      rolesApi.endpoints.createRole.matchFulfilled,
      (state) => {
        state.createRoleModal = { open: false };
      }
    );
    // update role
    builder.addMatcher(
      rolesApi.endpoints.updateRole.matchFulfilled,
      (state) => {
        state.createRoleModal = { open: false };
      }
    );
  },
});

const { actions, reducer } = rolesSlice;
export const { setCreateRoleModal } = actions;

export default reducer;
