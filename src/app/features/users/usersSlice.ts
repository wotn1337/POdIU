import { createSlice } from "@reduxjs/toolkit";
import { UsersStateType } from "./types";
import { apiSlice } from "../api";

const initialState: UsersStateType = {
  deleteUserIds: [],
  createUserModal: { open: false },
  notifications: [],
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
      apiSlice.endpoints.deleteUser.matchPending,
      (state, { meta }) => {
        state.deleteUserIds.push(meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteUser.matchFulfilled,
      (state, { meta }) => {
        state.deleteUserIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.deleteUser.matchRejected,
      (state, { meta }) => {
        state.deleteUserIds.filter((id) => id !== meta.arg.originalArgs);
      }
    );
    // create user
    builder.addMatcher(
      apiSlice.endpoints.createUser.matchFulfilled,
      (state) => {
        state.createUserModal = { open: false };
      }
    );
    // update user
    builder.addMatcher(
      apiSlice.endpoints.updateUser.matchFulfilled,
      (state) => {
        state.createUserModal = { open: false };
      }
    );
    // notifications
    builder.addMatcher(
      apiSlice.endpoints.getUserNotifications.matchFulfilled,
      (state, { payload }) => {
        state.notifications = payload.notifications;
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.readNotification.matchFulfilled,
      (state, { meta: { arg } }) => {
        state.notifications = state.notifications.map((n) => {
          if (n.id === arg.originalArgs) {
            return {
              ...n,
              read_at: new Date().toDateString(),
            };
          }
          return n;
        });
      }
    );
  },
});

const { actions, reducer } = usersSlice;
export const { setCreateUserModal } = actions;

export default reducer;
