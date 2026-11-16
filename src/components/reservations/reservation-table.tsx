
import {
  Ban,
  CalendarDays,
  Clock3,
  MapPin,
  PackageSearch,
  Search,
} from "lucide-react";

import type { Reservation } from "@/features/reservations/reservationSlice";
import { ReservationFilters } from "./reservation-filters";
import type { ReservationFilter } from "@/features/reservations/reservationTypes";
import { ReservationStatusBadge } from "./reservation-status-badge";

interface ReservationTableProps {
  reservations: Reservation[];
  search: string;
  statusFilter: ReservationFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ReservationFilter) => void;
  onCancel: (id: number) => void;
  formatDate: (date: string) => string;
  formatTime: (time: string) => string;
}

export function ReservationTable({
  reservations,
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onCancel,
  formatDate,
  formatTime,
}: ReservationTableProps) {
  return (
    <section className="fb-panel fb-module-panel overflow-hidden">
      {/* Section heading */}
      <div className="fb-panel-heading flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CalendarDays size={19} />
            </div>

            <h2 className="text-base font-semibold text-slate-800">
              Reservation Records
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Review booking requests, schedules and reservation status.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {reservations.length}{" "}
          {reservations.length === 1 ? "record" : "records"}
        </span>
      </div>

      {/* Search and filters */}
      <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
        <ReservationFilters
          search={search}
          statusFilter={statusFilter}
          onSearchChange={onSearchChange}
          onStatusChange={onStatusChange}
        />
      </div>

      {/* Reservation table */}
      <div className="fb-table-wrap overflow-x-auto">
        <table className="fb-table fb-module-table w-full min-w-[850px]">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-wider text-slate-500">
                RESOURCE
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-wider text-slate-500">
                REQUESTED BY
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-wider text-slate-500">
                DATE
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-wider text-slate-500">
                SCHEDULE
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-wider text-slate-500">
                STATUS
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-wider text-slate-500">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
              >
                {/* Resource */}
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1.5">
                    <strong className="text-sm font-semibold text-slate-800">
                      {reservation.resource || "Unnamed resource"}
                    </strong>

                    <span className="text-xs text-slate-500">
                      {reservation.category || "Uncategorized"}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin size={12} />
                      {reservation.location || "Location not specified"}
                    </span>
                  </div>
                </td>

                {/* Requester */}
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1">
                    <strong className="text-sm font-medium text-slate-700">
                      {reservation.requestedBy || "Unknown requester"}
                    </strong>

                    <span className="text-xs text-slate-500">
                      {reservation.department || "No department"}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-slate-700">
                    <CalendarDays size={15} className="text-slate-400" />
                    {formatDate(reservation.date)}
                  </span>
                </td>

                {/* Schedule */}
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-slate-700">
                      <Clock3 size={15} className="text-slate-400" />
                      {formatTime(reservation.startTime) || "Not scheduled"}
                    </span>

                    <span className="pl-[23px] text-xs text-slate-400">
                      to {formatTime(reservation.endTime) || "—"}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <ReservationStatusBadge status={reservation.status} />
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  {(reservation.status === "Pending" ||
                    reservation.status === "Approved") && (
                    <button
                      type="button"
                      onClick={() => onCancel(reservation.id)}
                      aria-label={`Cancel reservation for ${reservation.resource}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:border-red-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      <Ban size={14} />
                      Cancel
                    </button>
                  )}

                  {reservation.status === "Cancelled" && (
                    <span className="text-xs font-medium text-slate-400">
                      Cancelled
                    </span>
                  )}

                  {reservation.status === "Rejected" && (
                    <span className="text-xs font-medium text-slate-400">
                      No action
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-16">
                  <div className="mx-auto flex max-w-sm flex-col items-center gap-3 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      {search ? (
                        <Search size={25} />
                      ) : (
                        <PackageSearch size={25} />
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        No reservations found
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {search || statusFilter !== "All statuses"
                          ? "No records match your current search or status filter. Try changing your filters."
                          : "There are no reservation records to display yet."}
                      </p>
                    </div>

                    {(search || statusFilter !== "All statuses") && (
                      <button
                        type="button"
                        onClick={() => {
                          onSearchChange("");
                          onStatusChange("All statuses");
                        }}
                        className="mt-1 rounded-lg bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      {reservations.length > 0 && (
        <div className="flex flex-col gap-1 border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {reservations.length}
            </span>{" "}
            reservation {reservations.length === 1 ? "record" : "records"}
          </p>

          <p className="text-xs text-slate-400">
            FacilityBook Reservation Management
          </p>
        </div>
      )}
    </section>
  );
}
