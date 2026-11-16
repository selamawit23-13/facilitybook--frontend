import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole =
  | "ADMIN"
  | "EMPLOYEE"
  | "FACILITY_MANAGER"
  | "DEPARTMENT_MANAGER"
  | "RESOURCE_OPERATOR";

export type UserStatus = "Active" | "Inactive";

export interface FacilityUser {
  id: number;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  status: UserStatus;
}

const initialUsers: FacilityUser[] = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@example.com",
    department: "Administration",
    role: "ADMIN",
    status: "Active",
  },
  {
    id: 2,
    name: "Sara Mohammed",
    email: "sara@example.com",
    department: "Information Technology",
    role: "EMPLOYEE",
    status: "Active",
  },
  {
    id: 3,
    name: "Dawit Tesfaye",
    email: "dawit@example.com",
    department: "Human Resources",
    role: "DEPARTMENT_MANAGER",
    status: "Active",
  },
  {
    id: 4,
    name: "Martha Bekele",
    email: "martha@example.com",
    department: "Finance",
    role: "EMPLOYEE",
    status: "Active",
  },
  {
    id: 5,
    name: "Daniel Alemu",
    email: "daniel@example.com",
    department: "Facilities",
    role: "FACILITY_MANAGER",
    status: "Active",
  },
  {
    id: 6,
    name: "Hana Girma",
    email: "hana@example.com",
    department: "Facilities",
    role: "RESOURCE_OPERATOR",
    status: "Active",
  },
  {
    id: 7,
    name: "Samuel Tadesse",
    email: "samuel@example.com",
    department: "Engineering",
    role: "EMPLOYEE",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Meron Getachew",
    email: "meron@example.com",
    department: "Finance",
    role: "DEPARTMENT_MANAGER",
    status: "Active",
  },
];

interface UsersState {
  items: FacilityUser[];
}

const initialState: UsersState = {
  items: initialUsers,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<Omit<FacilityUser, "id">>
    ) => {
      const nextId =
        Math.max(0, ...state.items.map((user) => user.id)) + 1;

      state.items.unshift({
        ...action.payload,
        id: nextId,
      });
    },

    updateUser: (state, action: PayloadAction<FacilityUser>) => {
      const index = state.items.findIndex(
        (user) => user.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    toggleUserStatus: (state, action: PayloadAction<number>) => {
      const user = state.items.find(
        (item) => item.id === action.payload
      );

      if (user) {
        user.status = user.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
});

export const {
  addUser,
  updateUser,
  toggleUserStatus,
} = userSlice.actions;

export default userSlice.reducer;
