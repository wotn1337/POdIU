import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import authReducer from "./features/auth/authSlice";
import studentsReducer from "./features/students/studentsSlice";
import dormitoriesReducer from "./features/dormitories/dormitoriesSlice";
import { permissionsApi, rolesApi, usersApi } from "./features";
import rolesReducer from "./features/roles/rolesSlice";
import usersReducer from "./features/users/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    dormitories: dormitoriesReducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    roles: rolesReducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      rolesApi.middleware,
      permissionsApi.middleware,
      usersApi.middleware
    ),
});

export const useDispatch: () => typeof store.dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useReduxSelector;
export default store;
