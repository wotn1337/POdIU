import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import authReducer from "./features/auth/authSlice";
import administrationReducer from "./features/administration/administrationSlice";
import studentsReducer from "./features/students/studentsSlice";
import dormitoriesReducer from "./features/dormitories/dormitoriesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    administration: administrationReducer,
    students: studentsReducer,
    dormitories: dormitoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const useDispatch: () => typeof store.dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useReduxSelector;
export default store;
