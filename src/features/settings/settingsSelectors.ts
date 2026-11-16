import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

export const selectSettings = (state: RootState) => state.settings;

export const selectNotificationPreferences = createSelector(
  [selectSettings],
  (settings) => settings.notificationPreferences
);

export const selectWorkingDays = createSelector(
  [selectSettings],
  (settings) => settings.workingDays
);

export const selectSettingsOverview = createSelector(
  [selectSettings],
  (settings) => ({
    enabledNotifications: settings.notificationPreferences.filter(
      (item) => item.enabled
    ).length,
    totalNotifications: settings.notificationPreferences.length,
    operatingHours: `${settings.openingTime} – ${settings.closingTime}`,
    workingDays: settings.workingDays.length,
  })
);
