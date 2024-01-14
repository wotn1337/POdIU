import { createSlice } from "@reduxjs/toolkit";
import { AdministrationStateType } from "./types";
import {
  createRole,
  createUser,
  deleteRole,
  deleteUser,
  editUser,
  getPermissions,
  getRoles,
  getUsers,
} from "./administrationActions";

const initialState: AdministrationStateType = {
  users: [],
  loading: false,
  creating: false,
  createUserModal: {
    open: false,
  },
  createRoleModalOpen: false,
  permissionsLoading: false,
  creatingRole: false,
  loadingRoles: false,
  deleteRolesIds: [],
  deleteUserIds: [],
  usersMeta: {
    current_page: 1,
    per_page: 10,
  },
  messages: [],
};

const administrationSlice = createSlice({
  name: "administration",
  initialState,
  reducers: {
    clearCreateMessage: (state) => {
      state.createMessage = undefined;
    },
    setCreateUserModal: (state, action) => {
      state.createUserModal = action.payload;
    },
    setOpenCreateRolePopover: (state, action) => {
      state.createRoleModalOpen = action.payload;
    },
    clearCreateRoleMessage: (state) => {
      state.createRoleMessage = undefined;
    },
    setUsersMeta: (state, { payload }) => {
      state.usersMeta = { ...state.usersMeta, ...payload };
    },
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
  extraReducers: (builder) => {
    // get users
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload.users;
      state.usersMeta = { ...state.usersMeta, total: payload.meta.total };
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
      state.createUserModal = { open: false };
    });
    builder.addCase(createUser.rejected, (state) => {
      state.creating = false;
    });

    // edit user
    builder.addCase(editUser.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.creating = false;
      state.users = state.users.map((user) => {
        if (user.id === action.payload.user.id) {
          return action.payload.user;
        }
        return user;
      });
      state.createMessage = action.payload.message;
      state.createUserModal = { open: false };
    });
    builder.addCase(editUser.rejected, (state) => {
      state.creating = false;
    });

    // delete user
    builder.addCase(deleteUser.pending, (state, { meta: { arg } }) => {
      state.deleteUserIds.push(arg);
    });
    builder.addCase(deleteUser.fulfilled, (state, { meta: { arg } }) => {
      state.deleteUserIds = state.deleteUserIds.filter((id) => id !== arg);
      state.users = state.users.filter((user) => user.id !== arg);
    });
    builder.addCase(deleteUser.rejected, (state, { meta: { arg } }) => {
      state.deleteUserIds = state.deleteUserIds.filter((id) => id !== arg);
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
  setCreateUserModal,
  setOpenCreateRolePopover,
  clearCreateRoleMessage,
  setUsersMeta,
  setMessages,
} = actions;

export default reducer;
