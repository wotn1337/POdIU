import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./authActions";
import { StateType } from "./types";

const initialState: StateType = {
  loading: false,
  error: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.loggedIn = true;
      state.userInfo = action.payload;
    },
    setLogout: (state) => {
      state.loggedIn = false;
      state.userInfo = undefined;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: { email } }) => {
      state.loading = false;
      state.loggedIn = true;
      state.userInfo = { email };
    });
    builder.addCase(login.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload.error.message?.toString();
    });

    // logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.loggedIn = false;
      state.userInfo = undefined;
    });
    builder.addCase(logout.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload.error.message?.toString();
    });
  },
});

const { actions, reducer } = authSlice;
export const { setLogin, setLogout } = actions;

export default reducer;
