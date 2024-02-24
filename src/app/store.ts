import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { apiSlice } from "./features";
import authReducer from "./features/auth/authSlice";
import dormitoriesReducer from "./features/dormitories/dormitoriesSlice";
import rolesReducer from "./features/roles/rolesSlice";
import roomsReducer from "./features/rooms/roomsSlice";
import studentsReducer from "./features/students/studentsSlice";
import usersReducer from "./features/users/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    dormitories: dormitoriesReducer,
    roles: rolesReducer,
    users: usersReducer,
    rooms: roomsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const useDispatch: () => typeof store.dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useReduxSelector;
export default store;
