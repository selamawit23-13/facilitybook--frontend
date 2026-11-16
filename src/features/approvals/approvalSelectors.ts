import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

export const selectApprovalReservations = (state: RootState) =>
  state.reservations.items;

export const selectPendingApprovals = createSelector(
  [selectApprovalReservations],
  (reservations) =>
    reservations.filter((reservation) => reservation.status === "Pending")
);

export const selectApprovalStats = createSelector(
  [selectApprovalReservations],
  (reservations) => ({
    total: reservations.length,
    pending: reservations.filter((item) => item.status === "Pending").length,
    approved: reservations.filter((item) => item.status === "Approved").length,
    rejected: reservations.filter((item) => item.status === "Rejected").length,
  })
);
