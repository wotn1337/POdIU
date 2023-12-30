import { createSlice } from "@reduxjs/toolkit";
import { AdministrationStateType } from "./types";
import {
  createRole,
  createUser,
  deleteRole,
  getPermissions,
  getRoles,
  getUsers,
} from "./administrationActions";

const initialState: AdministrationStateType = {
  users: [],
  loading: false,
  creating: false,
  createUserModalOpen: false,
  createRoleModalOpen: false,
  permissionsLoading: false,
  creatingRole: false,
  loadingRoles: false,
  deleteRolesIds: [],
};

const administrationSlice = createSlice({
  name: "administration",
  initialState,
  reducers: {
    clearCreateMessage: (state) => {
      state.createMessage = undefined;
    },
    setOpenCreateUserPopover: (state, action) => {
      state.createUserModalOpen = action.payload;
    },
    setOpenCreateRolePopover: (state, action) => {
      state.createRoleModalOpen = action.payload;
    },
    clearCreateRoleMessage: (state) => {
      state.createRoleMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    // get users
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
    });

    // create user
    builder.addCase(createUser.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.creating = false;
      state.users.push(action.payload.user);
      state.createMessage = action.payload.message;
      state.createUserModalOpen = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.creating = false;
    });

    // get permissions
    builder.addCase(getPermissions.pending, (state) => {
      state.permissionsLoading = true;
    });
    builder.addCase(getPermissions.fulfilled, (state, { payload }) => {
      state.permissionsLoading = false;
      state.permissions = payload.permissions;
    });
    builder.addCase(getPermissions.rejected, (state) => {
      state.creating = false;
    });

    // create role
    builder.addCase(createRole.pending, (state) => {
      state.creatingRole = true;
    });
    builder.addCase(createRole.fulfilled, (state, { payload }) => {
      state.creatingRole = false;
      state.createRoleModalOpen = false;
      state.createRoleMessage = payload.message;
      state.roles = state.roles
        ? [...state.roles, payload.role]
        : [payload.role];
    });
    builder.addCase(createRole.rejected, (state) => {
      state.creatingRole = false;
    });

    // get roles
    builder.addCase(getRoles.pending, (state) => {
      state.loadingRoles = true;
    });
    builder.addCase(getRoles.fulfilled, (state, { payload }) => {
      state.loadingRoles = false;
      state.roles = payload.roles;
    });
    builder.addCase(getRoles.rejected, (state) => {
      state.loadingRoles = false;
    });

    // delete role
    builder.addCase(deleteRole.pending, (state, { meta: { arg } }) => {
      state.deleteRolesIds.push(arg);
    });
    builder.addCase(deleteRole.fulfilled, (state, { meta: { arg } }) => {
      state.deleteRolesIds = state.deleteRolesIds.filter((id) => id !== arg);
      state.roles = state.roles?.filter(({ id }) => id !== arg);
    });
    builder.addCase(deleteRole.rejected, (state, { meta: { arg } }) => {
      state.deleteRolesIds = state.deleteRolesIds.filter((id) => id !== arg);
    });
  },
});

const { actions, reducer } = administrationSlice;
export const {
  clearCreateMessage,
  setOpenCreateUserPopover,
  setOpenCreateRolePopover,
  clearCreateRoleMessage,
} = actions;

export default reducer;
