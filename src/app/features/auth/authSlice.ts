import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { AuthStateType } from "./types";
import { getInitialUser } from "./utils";

const initialState: AuthStateType = {
  user: getInitialUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        localStorage.setItem("user", JSON.stringify(payload.user));
      }
    );
    // logout
    builder.addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state) => {
      state.user = undefined;
      localStorage.clear();
    });
  },
});

const { actions, reducer } = authSlice;
export const {} = actions;

export default reducer;
