import { createSlice } from "@reduxjs/toolkit";
import { UsersStateType } from "./types";
import { usersApi } from ".";

const initialState: UsersStateType = {
  deleteUserIds: [],
  createUserModal: { open: false },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCreateUserModal: (state, { payload }) => {
      state.createUserModal = payload;
    },
  },
  extraReducers: (builder) => {
    // delete user
    builder.addMatcher(
      usersApi.endpoints.deleteUser.matchPending,
      (state, { meta }) => {
        state.deleteUserIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      usersApi.endpoints.deleteUser.matchFulfilled,
      (state, { meta }) => {
        state.deleteUserIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      usersApi.endpoints.deleteUser.matchRejected,
      (state, { meta }) => {
        state.deleteUserIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    // create user
    builder.addMatcher(
      usersApi.endpoints.createUser.matchFulfilled,
      (state) => {
        state.createUserModal = { open: false };
      }
    );
    // update user
    builder.addMatcher(
      usersApi.endpoints.updateUser.matchFulfilled,
      (state) => {
        state.createUserModal = { open: false };
      }
    );
  },
});

const { actions, reducer } = usersSlice;
export const { setCreateUserModal } = actions;

export default reducer;
