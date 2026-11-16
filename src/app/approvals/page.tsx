"use client";

import { useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
  updateReservationStatus,
  type Reservation,
} from "@/features/reservations/reservationSlice";

import {
  selectApprovalReservations,
  selectApprovalStats,
} from "@/features/approvals/approvalSelectors";

import { ApprovalPageHeader } from "@/components/approvals/approval-page-header";
import { ApprovalStats } from "@/components/approvals/approval-stats";
import { ApprovalWorkflowInfo } from "@/components/approvals/approval-workflow-info";
import { ApprovalFilters } from "@/components/approvals/approval-filters";
import { ApprovalTable } from "@/components/approvals/approval-table";
import { ApprovalDetailsDialog } from "@/components/approvals/approval-details-dialog";
import { ApprovalRejectionDialog } from "@/components/approvals/approval-rejection-dialog";

export default function ApprovalsPage() {
  const dispatch = useAppDispatch();

  // Get reservation data and approval statistics through feature selectors.
  const reservations = useAppSelector(selectApprovalReservations);
  const metrics = useAppSelector(selectApprovalStats);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const [rejectionTarget, setRejectionTarget] =
    useState<Reservation | null>(null);

  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState("");

  // Search and filter reservations.
  const filteredReservations = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return reservations.filter((reservation) => {
      const matchesSearch =
        reservation.resource.toLowerCase().includes(searchValue) ||
        reservation.requestedBy.toLowerCase().includes(searchValue) ||
        reservation.department.toLowerCase().includes(searchValue) ||
        reservation.purpose.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        reservation.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, statusFilter]);

  // Approve a pending reservation.
  function approveReservation(reservation: Reservation) {
    if (reservation.status !== "Pending") return;

    dispatch(
      updateReservationStatus({
        id: reservation.id,
        status: "Approved",
        reviewedBy: "Facility / Department Manager",
        rejectionReason: "",
      })
    );

    setSelectedReservation(null);
  }

  // Open the rejection dialog.
  function openRejectDialog(reservation: Reservation) {
    if (reservation.status !== "Pending") return;

    setSelectedReservation(null);
    setRejectionTarget(reservation);
    setRejectionReason("");
    setError("");
  }

  // Reject a reservation after validating the reason.
  function rejectReservation() {
    if (!rejectionTarget) return;

    if (!rejectionReason.trim()) {
      setError("Please provide a reason for rejecting this reservation.");
      return;
    }

    dispatch(
      updateReservationStatus({
        id: rejectionTarget.id,
        status: "Rejected",
        reviewedBy: "Facility / Department Manager",
        rejectionReason: rejectionReason.trim(),
      })
    );

    setRejectionTarget(null);
    setRejectionReason("");
    setError("");
  }

  return (
    <AppShell>
      <div className="space-y-7 pb-8">

        <ApprovalPageHeader
          onReviewPending={() => {
            setStatusFilter("Pending");
            setSearch("");
          }}
        />

        <ApprovalStats
          total={metrics.total}
          pending={metrics.pending}
          approved={metrics.approved}
          rejected={metrics.rejected}
        />

        <ApprovalWorkflowInfo />

        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Reservation Requests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review and manage submitted reservation requests.
              </p>
            </div>

            <ApprovalFilters
              search={search}
              statusFilter={statusFilter}
              onSearchChange={setSearch}
              onStatusChange={setStatusFilter}
            />
          </div>

          <ApprovalTable
            reservations={filteredReservations}
            totalReservations={reservations.length}
            onView={setSelectedReservation}
            onApprove={approveReservation}
            onReject={openRejectDialog}
          />
        </section>

        <ApprovalDetailsDialog
          reservation={selectedReservation}
          onOpenChange={(open) => {
            if (!open) setSelectedReservation(null);
          }}
          onApprove={approveReservation}
          onReject={openRejectDialog}
        />

        <ApprovalRejectionDialog
          reservation={rejectionTarget}
          reason={rejectionReason}
          error={error}
          onReasonChange={(value) => {
            setRejectionReason(value);
            setError("");
          }}
          onOpenChange={(open) => {
            if (!open) {
              setRejectionTarget(null);
              setError("");
            }
          }}
          onConfirm={rejectReservation}
        />

        <p className="text-center text-xs text-slate-400">
          Demonstration data only. Approval decisions are shared through
          Redux and are not yet saved to the backend.
        </p>

      </div>
    </AppShell>
  );
}
