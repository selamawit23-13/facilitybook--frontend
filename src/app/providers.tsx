
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";

import { makeStore, type AppStore } from "@/lib/store";
import {
  restoreSession,
  type AuthUser,
} from "@/features/auth/authSlice";

export function Providers({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const newStore = makeStore();

    const token = localStorage.getItem("facilitybook_token");
    const savedUser = localStorage.getItem("facilitybook_user");

    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser) as AuthUser;

        newStore.dispatch(
          restoreSession({
            user,
            token,
          })
        );
      } catch {
        localStorage.removeItem("facilitybook_token");
        localStorage.removeItem("facilitybook_user");
      }
    }

    setStore(newStore);
  }, []);

  // Wait until the Redux store is initialized in the browser.
  if (!store) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        aria-busy="true"
      >
        <p className="text-sm text-muted-foreground">
          Loading FacilityBook...
        </p>
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}
