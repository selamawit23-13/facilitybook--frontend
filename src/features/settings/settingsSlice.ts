import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState } from "@/features/settingsTypes";

const initialState: SettingsState = {
  notificationPreferences: [
    { id: "confirmation", enabled: true },
    { id: "approval", enabled: true },
    { id: "maintenance", enabled: true },
    { id: "reminders", enabled: false },
  ],
  workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  openingTime: "08:00",
  closingTime: "17:00",
  cancellationHours: "24",
  approvalRequired: true,
  saved: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleNotification(state, action: PayloadAction<string>) {
      const notification = state.notificationPreferences.find(
        (item) => item.id === action.payload
      );

      if (notification) {
        notification.enabled = !notification.enabled;
        state.saved = false;
      }
    },

    toggleWorkingDay(state, action: PayloadAction<string>) {
      if (state.workingDays.includes(action.payload)) {
        state.workingDays = state.workingDays.filter(
          (day) => day !== action.payload
        );
      } else {
        state.workingDays.push(action.payload);
      }

      state.saved = false;
    },

    setOpeningTime(state, action: PayloadAction<string>) {
      state.openingTime = action.payload;
      state.saved = false;
    },

    setClosingTime(state, action: PayloadAction<string>) {
      state.closingTime = action.payload;
      state.saved = false;
    },

    setCancellationHours(state, action: PayloadAction<string>) {
      state.cancellationHours = action.payload;
      state.saved = false;
    },

    setApprovalRequired(state, action: PayloadAction<boolean>) {
      state.approvalRequired = action.payload;
      state.saved = false;
    },

    markSettingsSaved(state) {
      state.saved = true;
    },
  },
});

export const {
  toggleNotification,
  toggleWorkingDay,
  setOpeningTime,
  setClosingTime,
  setCancellationHours,
  setApprovalRequired,
  markSettingsSaved,
} = settingsSlice.actions;

export default settingsSlice.reducer;
