import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import authReducer from "./features/auth/authSlice";
import studentsReducer from "./features/students/studentsSlice";
import dormitoriesReducer from "./features/dormitories/dormitoriesSlice";
import {
  academicGroupsApi,
  authApi,
  countriesApi,
  dormitoriesApi,
  permissionsApi,
  rolesApi,
  roomsApi,
  studentsApi,
  usersApi,
} from "./features";
import rolesReducer from "./features/roles/rolesSlice";
import usersReducer from "./features/users/usersSlice";
import roomsReducer from "./features/rooms/roomsSlice";
import { gendersApi } from "./features/genders/gendersApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    dormitories: dormitoriesReducer,
    roles: rolesReducer,
    users: usersReducer,
    rooms: roomsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [gendersApi.reducerPath]: gendersApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [academicGroupsApi.reducerPath]: academicGroupsApi.reducer,
    [dormitoriesApi.reducerPath]: dormitoriesApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      rolesApi.middleware,
      permissionsApi.middleware,
      usersApi.middleware,
      studentsApi.middleware,
      gendersApi.middleware,
      countriesApi.middleware,
      academicGroupsApi.middleware,
      dormitoriesApi.middleware,
      roomsApi.middleware
    ),
});

export const useDispatch: () => typeof store.dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useReduxSelector;
export default store;
