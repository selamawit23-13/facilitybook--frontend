import {
  CalendarDays,
  Check,
  ClipboardCheck,
  Eye,
  UserRound,
  X,
} from "lucide-react";

import type { Reservation } from "@/features/reservations/reservationSlice";
import { formatDate, formatTime, getStatusStyle } from "./approval-utils";

interface ApprovalTableProps {
  reservations: Reservation[];
  totalReservations: number;
  onView: (reservation: Reservation) => void;
  onApprove: (reservation: Reservation) => void;
  onReject: (reservation: Reservation) => void;
}

export function ApprovalTable({
  reservations,
  totalReservations,
  onView,
  onApprove,
  onReject,
}: ApprovalTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Reservation Requests
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review and manage submitted reservation requests.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">Reservation</th>
              <th className="px-5 py-4">Employee</th>
              <th className="px-5 py-4">Schedule</th>
              <th className="px-5 py-4">Approval By</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-800">
                    {reservation.resource}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Request #{String(reservation.id).padStart(4, "0")}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <UserRound size={15} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {reservation.requestedBy}
                      </p>
                      <p className="text-xs text-slate-500">
                        {reservation.department}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="flex items-center gap-2 text-sm text-slate-700">
                    <CalendarDays size={14} className="text-slate-400" />
                    {formatDate(reservation.date)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatTime(reservation.startTime)} –{" "}
                    {formatTime(reservation.endTime)}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-slate-700">
                    {reservation.approvalType || "Facility Manager"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Submitted {reservation.submitted || "—"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      reservation.status
                    )}`}
                  >
                    {reservation.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(reservation)}
                      title="View details"
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Eye size={16} />
                    </button>

                    {reservation.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => onApprove(reservation)}
                          title="Approve reservation"
                          className="rounded-lg border border-emerald-200 p-2 text-emerald-700 transition hover:bg-emerald-50"
                        >
                          <Check size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onReject(reservation)}
                          title="Reject reservation"
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <ClipboardCheck
                    size={30}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <p className="font-semibold text-slate-700">
                    No reservation requests found
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or status filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row">
        <span>
          Showing {reservations.length} of {totalReservations} requests
        </span>
        <span>Reservation approval management</span>
      </div>
    </section>
  );
}
