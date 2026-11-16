
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ReservationStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Cancelled";

export interface Reservation {
  id: number;
  resource: string;
  category: string;
  location: string;
  requestedBy: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: ReservationStatus;
  approvalType?: string;
  submitted?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

interface ReservationState {
  items: Reservation[];
}

const initialState: ReservationState = {
  items: [
    {
      id: 1,
      resource: "Conference Room A",
      category: "Meeting Room",
      location: "Main Building · Floor 2",
      requestedBy: "Abebe Kebede",
      department: "Human Resources",
      date: "2026-11-13",
      startTime: "09:00",
      endTime: "10:30",
      purpose: "Monthly department meeting",
      status: "Approved",
      approvalType: "Facility Manager",
      submitted: "Nov 11, 2026",
      reviewedBy: "Facility Manager",
    },
    {
      id: 2,
      resource: "Computer Laboratory 2",
      category: "Computer Lab",
      location: "Block B · Floor 1",
      requestedBy: "Sara Mohammed",
      department: "Information Technology",
      date: "2026-11-13",
      startTime: "10:00",
      endTime: "12:00",
      purpose: "Staff computer training",
      status: "Pending",
      approvalType: "Facility Manager",
      submitted: "Nov 12, 2026",
    },
    {
      id: 3,
      resource: "Training Hall",
      category: "Training Hall",
      location: "Main Building · Ground Floor",
      requestedBy: "Dawit Tesfaye",
      department: "Administration",
      date: "2026-11-13",
      startTime: "13:00",
      endTime: "15:00",
      purpose: "Employee development workshop",
      status: "Approved",
      approvalType: "Department Manager",
      submitted: "Nov 12, 2026",
      reviewedBy: "Department Manager",
    },
    {
      id: 4,
      resource: "Meeting Room B",
      category: "Meeting Room",
      location: "Block C · Floor 3",
      requestedBy: "Martha Bekele",
      department: "Finance",
      date: "2026-11-14",
      startTime: "08:30",
      endTime: "09:30",
      purpose: "Budget review",
      status: "Rejected",
      approvalType: "Department Manager",
      submitted: "Nov 13, 2026",
      reviewedBy: "Department Manager",
      rejectionReason:
        "The room is required for another department meeting.",
    },
    {
      id: 5,
      resource: "Projector 04",
      category: "Equipment",
      location: "Block A · Equipment Store",
      requestedBy: "Hana Alemu",
      department: "Education",
      date: "2026-11-15",
      startTime: "14:00",
      endTime: "15:00",
      purpose: "Presentation equipment",
      status: "Pending",
      approvalType: "Facility Manager",
      submitted: "Nov 13, 2026",
    },
    {
      id: 6,
      resource: "Conference Room A",
      category: "Meeting Room",
      location: "Main Building · Floor 2",
      requestedBy: "Daniel Tadesse",
      department: "Operations",
      date: "2026-11-16",
      startTime: "09:00",
      endTime: "11:00",
      purpose: "Operations planning",
      status: "Cancelled",
      submitted: "Nov 14, 2026",
    },
  ],
};

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<Omit<Reservation, "id">>) => {
      const nextId =
        state.items.length > 0
          ? Math.max(...state.items.map((item) => item.id)) + 1
          : 1;

      state.items.unshift({
        ...action.payload,
        id: nextId,
      });
    },

    updateReservation: (
      state,
      action: PayloadAction<Reservation>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    updateReservationStatus: (
      state,
      action: PayloadAction<{
        id: number;
        status: ReservationStatus;
        reviewedBy?: string;
        rejectionReason?: string;
      }>
    ) => {
      const reservation = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (reservation) {
        reservation.status = action.payload.status;

        if (action.payload.reviewedBy) {
          reservation.reviewedBy = action.payload.reviewedBy;
        }

        if (action.payload.rejectionReason !== undefined) {
          reservation.rejectionReason =
            action.payload.rejectionReason;
        }
      }
    },

    cancelReservation: (state, action: PayloadAction<number>) => {
      const reservation = state.items.find(
        (item) => item.id === action.payload
      );

      if (reservation && reservation.status !== "Rejected") {
        reservation.status = "Cancelled";
      }
    },

    deleteReservation: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addReservation,
  updateReservation,
  updateReservationStatus,
  cancelReservation,
  deleteReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;
