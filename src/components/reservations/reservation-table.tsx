
import {
  Ban,
  CalendarDays,
  Clock3,
  MapPin,
  PackageSearch,
  Search,
  SlidersHorizontal,
  RotateCcw,
  X,
} from "lucide-react";

import type { Reservation } from "@/features/reservations/reservationSlice";
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

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

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
  const hasActiveFilters =
    search.trim() !== "" || statusFilter !== "All statuses";

  function resetFilters() {
    onSearchChange("");
    onStatusChange("All statuses");
  }

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Reservation Records
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Review booking requests, schedules and reservation status.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 sm:self-center">
          <CalendarDays size={14} />
          {reservations.length} {reservations.length === 1 ? "record" : "records"}
        </div>
      </div>

      <div className="space-y-3 border-b border-gray-100 bg-gray-50/70 px-5 py-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <SlidersHorizontal size={14} />
          Search and filters
        </div>

        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by resource, requester or department..."
              className={`${inputClass} pl-10 pr-10`}
              aria-label="Search reservations"
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusChange(event.target.value as ReservationFilter)
            }
            className={`${inputClass} lg:w-52`}
            aria-label="Filter reservations by status"
          >
            <option value="All statuses">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Fixed horizontal table layout */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1100px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
            <col className="w-[14%]" />
          </colgroup>

          <thead className="bg-gray-50/70">
            <tr className="border-b border-gray-100">
              {["Resource", "Requested By", "Date", "Schedule", "Status", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="transition-colors hover:bg-emerald-50/30"
              >
                <td className="px-5 py-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <strong className="break-words text-sm font-semibold text-gray-900">
                      {reservation.resource || "Unnamed resource"}
                    </strong>
                    <span className="text-xs text-gray-500">
                      {reservation.category || "Uncategorized"}
                    </span>
                    <span className="flex items-center gap-1.5 break-words text-xs text-gray-500">
                      <MapPin size={13} className="shrink-0" />
                      {reservation.location || "Location not specified"}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <strong className="break-words text-sm font-medium text-gray-800">
                      {reservation.requestedBy || "Unknown requester"}
                    </strong>
                    <span className="break-words text-xs text-gray-500">
                      {reservation.department || "No department"}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-4 align-middle">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                    <CalendarDays size={14} className="shrink-0 text-gray-400" />
                    {formatDate(reservation.date)}
                  </span>
                </td>

                <td className="px-5 py-4 align-middle">
                  <div className="flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-gray-700">
                      <Clock3 size={14} className="shrink-0 text-gray-400" />
                      {formatTime(reservation.startTime) || "Not scheduled"}
                    </span>
                    <span className="pl-[21px] text-xs text-gray-500">
                      to {formatTime(reservation.endTime) || "—"}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 align-middle">
                  <ReservationStatusBadge status={reservation.status} />
                </td>

                <td className="whitespace-nowrap px-5 py-4 align-middle">
                  {(reservation.status === "Pending" ||
                    reservation.status === "Approved") && (
                    <button
                      type="button"
                      onClick={() => onCancel(reservation.id)}
                      aria-label={`Cancel reservation for ${reservation.resource}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                    >
                      <Ban size={14} />
                      Cancel
                    </button>
                  )}

                  {reservation.status === "Cancelled" && (
                    <span className="text-xs font-medium text-gray-400">
                      Cancelled
                    </span>
                  )}

                  {reservation.status === "Rejected" && (
                    <span className="text-xs font-medium text-gray-400">
                      No action
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-16">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 rounded-2xl bg-gray-100 p-4 text-gray-400">
                      {search ? <Search size={30} /> : <PackageSearch size={30} />}
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      No reservations found
                    </h3>

                    <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                      {hasActiveFilters
                        ? "No reservations match your search or filters. Try adjusting them."
                        : "There are no reservation records to display yet."}
                    </p>

                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                      >
                        <RotateCcw size={15} />
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

      <div className="flex flex-col justify-between gap-2 border-t border-gray-100 bg-gray-50/60 px-5 py-3 text-xs text-gray-500 sm:flex-row sm:items-center">
        <span>
          Showing {reservations.length} reservation{" "}
          {reservations.length === 1 ? "record" : "records"}
        </span>
        <span>FacilityBook Reservation Management</span>
      </div>
    </section>
  );
}
