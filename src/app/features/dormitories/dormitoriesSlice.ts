import { createSlice } from "@reduxjs/toolkit";
import { DormitoriesStateType } from "./types";
import {
  createDormitory,
  createRoom,
  deleteDormitory,
  deleteRoom,
  getDormRooms,
  getDormitories,
  updateDormitory,
  updateRoom,
} from ".";

const initialState: DormitoriesStateType = {
  loading: false,
  dormitories: [],
  current_page: 1,
  per_page: 10,
  deletingIds: [],
  createModal: {
    open: false,
  },
  createRoomModal: {
    open: false,
  },
  creating: false,
  creatingRoom: false,
  gettingRoomsDormIds: [],
  dormRooms: {},
  deletingRoomIds: [],
  settlementModal: {
    open: false,
  },
  loadingStudentIds: [],
  filters: {},
  sorters: {},
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
    setCreateModal: (state, { payload }) => {
      state.createModal = payload;
    },
    setCreateRoomModal: (state, { payload }) => {
      state.createRoomModal = payload;
    },
    setRoomsPage: (state, { payload }) => {
      state.dormRooms[payload.id].current_page = payload.page;
    },
    setRoomsPageSize: (state, { payload }) => {
      state.dormRooms[payload.id].per_page = payload.size;
    },
    setSettlementModal: (state, { payload }) => {
      state.settlementModal = payload;
    },
    updateStudentRoom: (state, { payload }) => {
      state.dormRooms[payload.dormId].rooms = state.dormRooms[
        payload.dormId
      ].rooms.map((room) => {
        if (room.id === payload.roomId) {
          return {
            ...room,
            empty_seats_count:
              room.empty_seats_count + (payload.type === "set" ? -1 : 1),
            students_count:
              room.students_count + (payload.type === "set" ? 1 : -1),
            students:
              payload.type === "set"
                ? [...(room.students ?? []), payload.student]
                : room.students?.filter((s) => s.id !== payload.student.id),
          };
        }
        return room;
      });
    },
    addLoadingStudentId: (state, { payload }) => {
      state.loadingStudentIds.push(payload);
    },
    removeLoadingStudentId: (state, { payload }) => {
      state.loadingStudentIds.filter((id) => id !== payload);
    },
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    setSorters: (state, { payload }) => {
      state.sorters = payload;
    },
    clearState: (state) => {
      state = initialState;
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
      state.dormitories.push(payload.data);
      state.createModal = { open: false };
    });
    builder.addCase(createDormitory.rejected, (state) => {
      state.creating = false;
    });

    // update dormitory
    builder.addCase(updateDormitory.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(updateDormitory.fulfilled, (state, { payload }) => {
      state.creating = false;
      state.dormitories = state.dormitories.map((dorm) => {
        if (dorm.id === payload.data.id) {
          return payload.data;
        }
        return dorm;
      });
      state.createModal = { open: false };
    });
    builder.addCase(updateDormitory.rejected, (state) => {
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

    // create dormRoom
    builder.addCase(createRoom.pending, (state) => {
      state.creatingRoom = true;
    });
    builder.addCase(
      createRoom.fulfilled,
      (state, { meta: { arg }, payload }) => {
        const { dorm, number_of_seats } = arg;
        state.creatingRoom = false;
        state.createRoomModal = { open: false };
        if (state.dormRooms[dorm]) {
          state.dormRooms[dorm].rooms.push({
            ...payload.dorm_rooms,
            empty_seats_count: number_of_seats,
            students_count: 0,
          });
        } else {
          state.dormRooms[dorm] = {
            rooms: [payload.dorm_rooms],
            current_page: 1,
            per_page: 10,
            total: 1,
          };
        }
      }
    );
    builder.addCase(createRoom.rejected, (state) => {
      state.creatingRoom = false;
    });

    // update dormRoom
    builder.addCase(updateRoom.pending, (state) => {
      state.creatingRoom = true;
    });
    builder.addCase(
      updateRoom.fulfilled,
      (state, { meta: { arg }, payload }) => {
        console.log(arg);
        const { dorm, oldDorm } = arg;
        state.creatingRoom = false;
        state.createRoomModal = { open: false };
        if (dorm === oldDorm) {
          state.dormRooms[dorm].rooms = state.dormRooms[dorm].rooms.map(
            (room) => {
              if (room.id === payload.dorm_rooms.id) {
                return {
                  ...room,
                  number: payload.dorm_rooms.number,
                  number_of_seats: payload.dorm_rooms.number_of_seats,
                  comment: payload.dorm_rooms.comment,
                };
              }
              return room;
            }
          );
        } else {
          state.dormRooms[oldDorm].rooms = state.dormRooms[
            oldDorm
          ]?.rooms.filter((room) => room.id !== payload.dorm_rooms.id);
          if (state.dormRooms[dorm]) {
            state.dormRooms[dorm].rooms.push(payload.dorm_rooms);
          } else {
            state.dormRooms[dorm] = {
              rooms: [payload.dorm_rooms],
              current_page: 1,
              per_page: 10,
            };
          }
        }
      }
    );
    builder.addCase(updateRoom.rejected, (state) => {
      state.creatingRoom = false;
    });
  },
});

const { actions, reducer } = studentsSlice;
export const {
  setPage,
  setPageSize,
  setCreateModal,
  setCreateRoomModal,
  setRoomsPage,
  setRoomsPageSize,
  setSettlementModal,
  updateStudentRoom,
  addLoadingStudentId,
  removeLoadingStudentId,
  setFilters,
  setSorters,
  clearState,
} = actions;

export default reducer;
