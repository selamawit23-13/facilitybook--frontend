import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/authSlice";
import resourceReducer from "@/features/resources/resourceSlice";
import maintenanceReducer from "@/features/maintenance/maintenanceSlice";
import reservationReducer from "@/features/reservations/reservationSlice";
import notificationReducer from "@/features/notifications/notificationSlice";
import userReducer from "@/features/users/userSlice";
import settingsReducer from "@/features/settings/settingsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      resources: resourceReducer,
      maintenance: maintenanceReducer,
      reservations: reservationReducer,
      notifications: notificationReducer,
      users: userReducer,
      settings: settingsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
