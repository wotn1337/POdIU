import { createApi } from "@reduxjs/toolkit/query/react";
import { Tags } from "./types";
import { getBaseQuery } from "./utils";
import { getAuthApiEndpoints } from "../auth";
import { getPermissionsApiEndpoints } from "../permissions";
import { getRolesApiEndpoints } from "../roles";
import { getUsersApiEndpoints } from "../users";
import { getStudentsApiEndpoints } from "../students";
import { getAcademicGroupsApiEndpoints } from "../academicGroups";
import { getGendersApiEndpoints } from "../genders";
import { getCountriesApiEndpoints } from "../countries";
import { getDormitoriesApiEndpoints } from "../dormitories";
import { getRoomsApiEndpoints } from "../rooms";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: getBaseQuery(),
  tagTypes: Tags,
  endpoints: (builder) => ({
    ...getAuthApiEndpoints(builder),
    ...getPermissionsApiEndpoints(builder),
    ...getRolesApiEndpoints(builder),
    ...getUsersApiEndpoints(builder),
    ...getStudentsApiEndpoints(builder),
    ...getAcademicGroupsApiEndpoints(builder),
    ...getGendersApiEndpoints(builder),
    ...getCountriesApiEndpoints(builder),
    ...getDormitoriesApiEndpoints(builder),
    ...getRoomsApiEndpoints(builder),
  }),
});

export const {
  // auth
  useLazyGetCsrfQuery,
  useLoginMutation,
  useLogoutMutation,
  // permissions
  useGetPermissionsQuery,
  // roles
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  // users
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  // students
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  // academic groups
  useGetAcademicGroupsQuery,
  // genders
  useGetGendersQuery,
  // countries
  useGetCountriesQuery,
  // dormitories
  useGetDormitoriesQuery,
  useCreateDormitoryMutation,
  useUpdateDormitoryMutation,
  useDeleteDormitoryMutation,
  // rooms
  useGetRoomsQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = apiSlice;
