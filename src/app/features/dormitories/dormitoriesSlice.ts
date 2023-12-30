import { createSlice } from "@reduxjs/toolkit";
import { DormitoriesStateType } from "./types";
import {
  createDormitory,
  deleteDormitory,
  deleteRoom,
  getDormRooms,
  getDormitories,
} from ".";

const initialState: DormitoriesStateType = {
  loading: false,
  dormitories: [],
  current_page: 1,
  per_page: 10,
  deletingIds: [],
  openCreateModal: false,
  creating: false,
  gettingRoomsDormIds: [],
  dormRooms: {},
  deletingRoomIds: [],
};

const studentsSlice = createSlice({
  name: "dormitories",
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.current_page = payload;
    },
    setPageSize: (state, { payload }) => {
      state.per_page = payload;
    },
    setOpenCreateModal: (state, { payload }) => {
      state.openCreateModal = payload;
    },
    setRoomsPage: (state, { payload }) => {
      state.dormRooms[payload.id].current_page = payload.page;
    },
    setRoomsPageSize: (state, { payload }) => {
      state.dormRooms[payload.id].per_page = payload.size;
    },
  },
  extraReducers: (builder) => {
    // get dormitories
    builder.addCase(getDormitories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDormitories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dormitories = payload.dormitories;
      state.total = payload.meta.total;
    });
    builder.addCase(getDormitories.rejected, (state) => {
      state.loading = false;
    });

    // delete dormitory
    builder.addCase(deleteDormitory.pending, (state, { meta: { arg } }) => {
      state.deletingIds.push(arg);
    });
    builder.addCase(deleteDormitory.fulfilled, (state, { meta: { arg } }) => {
      state.deletingIds = state.deletingIds.filter((id) => id !== arg);
      state.dormitories = state.dormitories.filter(({ id }) => id !== arg);
    });
    builder.addCase(deleteDormitory.rejected, (state, { meta: { arg } }) => {
      state.deletingIds = state.deletingIds.filter((id) => id !== arg);
    });

    // create dormitory
    builder.addCase(createDormitory.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createDormitory.fulfilled, (state, { payload }) => {
      state.creating = false;
      state.dormitories.push(payload.dormitory);
    });
    builder.addCase(createDormitory.rejected, (state) => {
      state.creating = false;
    });

    // get dorm rooms
    builder.addCase(getDormRooms.pending, (state, { meta: { arg } }) => {
      state.gettingRoomsDormIds.push(arg.dormId);
    });
    builder.addCase(
      getDormRooms.fulfilled,
      (state, { payload, meta: { arg } }) => {
        state.gettingRoomsDormIds = state.gettingRoomsDormIds.filter(
          (id) => id !== arg.dormId
        );
        if (state.dormRooms[arg.dormId]) {
          state.dormRooms[arg.dormId].rooms = payload.dorm_rooms;
          state.dormRooms[arg.dormId].total = payload.meta.total;
        } else {
          state.dormRooms[arg.dormId] = {
            rooms: payload.dorm_rooms,
            current_page: payload.meta.current_page,
            per_page: payload.meta.per_page,
            total: payload.meta.total,
          };
        }
      }
    );
    builder.addCase(getDormRooms.rejected, (state, { meta: { arg } }) => {
      state.gettingRoomsDormIds = state.gettingRoomsDormIds.filter(
        (id) => id !== arg.dormId
      );
    });

    // delete dormRoom
    builder.addCase(deleteRoom.pending, (state, { meta: { arg } }) => {
      state.deletingRoomIds.push(arg);
    });
    builder.addCase(deleteRoom.fulfilled, (state, { meta: { arg } }) => {
      state.deletingRoomIds = state.deletingRoomIds.filter((id) => id !== arg);
      Object.keys(state.dormRooms).forEach((dormId) => {
        state.dormRooms[+dormId].rooms = state.dormRooms[+dormId].rooms.filter(
          (room) => room.id !== arg
        );
      });
    });
    builder.addCase(deleteRoom.rejected, (state, { meta: { arg } }) => {
      state.deletingRoomIds = state.deletingRoomIds.filter((id) => id !== arg);
    });
  },
});

const { actions, reducer } = studentsSlice;
export const {
  setPage,
  setPageSize,
  setOpenCreateModal,
  setRoomsPage,
  setRoomsPageSize,
} = actions;

export default reducer;
