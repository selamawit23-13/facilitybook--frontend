
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type NotificationType =
  | "Reservation"
  | "Approval"
  | "Maintenance"
  | "System";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  recipient: string;
  resource: string;
  date: string;
  time: string;
  read: boolean;
}

interface NotificationState {
  items: NotificationItem[];
}

const initialState: NotificationState = {
  items: [
    {
      id: 1,
      title: "Reservation approved",
      message:
        "Your reservation request for Conference Room A has been approved. The room is reserved for your selected schedule.",
      type: "Reservation",
      recipient: "Abebe Kebede",
      resource: "Conference Room A",
      date: "Nov 13, 2026",
      time: "09:30 AM",
      read: false,
    },
    {
      id: 2,
      title: "Maintenance scheduled",
      message:
        "Maintenance work has been scheduled for Meeting Room B. The resource may be unavailable during the maintenance period.",
      type: "Maintenance",
      recipient: "Facility Manager",
      resource: "Meeting Room B",
      date: "Nov 13, 2026",
      time: "08:45 AM",
      read: false,
    },
    {
      id: 3,
      title: "New approval request",
      message:
        "A new reservation request requires your review. Please check the reservation details and make an approval decision.",
      type: "Approval",
      recipient: "Department Manager",
      resource: "Training Hall",
      date: "Nov 12, 2026",
      time: "03:15 PM",
      read: true,
    },
    {
      id: 4,
      title: "Reservation cancelled",
      message:
        "A reservation for Projector 04 has been cancelled. The resource is now available for other reservations, subject to its schedule.",
      type: "Reservation",
      recipient: "Sara Mohammed",
      resource: "Projector 04",
      date: "Nov 12, 2026",
      time: "01:20 PM",
      read: true,
    },
    {
      id: 5,
      title: "Reservation reminder",
      message:
        "This is a reminder about your upcoming reservation. Please arrive on time and follow the facility usage guidelines.",
      type: "Reservation",
      recipient: "Abebe Kebede",
      resource: "Computer Laboratory 2",
      date: "Nov 12, 2026",
      time: "10:00 AM",
      read: false,
    },
    {
      id: 6,
      title: "Approval request rejected",
      message:
        "Your reservation request was rejected by the responsible manager. Please review the decision and its reason in your reservation history.",
      type: "Approval",
      recipient: "Sara Mohammed",
      resource: "Conference Hall",
      date: "Nov 11, 2026",
      time: "04:10 PM",
      read: false,
    },
    {
      id: 7,
      title: "Maintenance completed",
      message:
        "Scheduled maintenance has been completed. The resource has been restored to operational status.",
      type: "Maintenance",
      recipient: "Facility Manager",
      resource: "Training Hall",
      date: "Nov 11, 2026",
      time: "11:30 AM",
      read: true,
    },
    {
      id: 8,
      title: "Reservation status updated",
      message:
        "The status of your reservation has changed. Open your reservation details to review the latest information.",
      type: "Reservation",
      recipient: "Employee",
      resource: "Meeting Room B",
      date: "Nov 10, 2026",
      time: "02:40 PM",
      read: true,
    },
  ],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationItem>) => {
      state.items.unshift(action.payload);
    },

    markNotificationRead: (state, action: PayloadAction<number>) => {
      const notification = state.items.find(
        (item) => item.id === action.payload
      );

      if (notification) {
        notification.read = true;
      }
    },

    markAllNotificationsRead: (state) => {
      state.items.forEach((item) => {
        item.read = true;
      });
    },

    deleteNotification: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
