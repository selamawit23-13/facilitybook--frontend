import {
  Ban,
  CalendarDays,
  Clock3,
  MapPin,
  PackageSearch,
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
    <section className="fb-panel fb-module-panel">
      <div className="fb-panel-heading">
        <div>
          <h2>Reservation Records</h2>
          <p>
            Review booking requests, schedules and reservation status.
          </p>
        </div>

        <span className="fb-period-label">
          {reservations.length} records
        </span>
      </div>

      <ReservationFilters
        search={search}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
      />

      <div className="fb-table-wrap">
        <table className="fb-table fb-module-table">
          <thead>
            <tr>
              <th>RESOURCE</th>
              <th>REQUESTED BY</th>
              <th>DATE</th>
              <th>TIME</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>
                  <div className="flex flex-col gap-1">
                    <strong>{reservation.resource}</strong>
                    <span className="text-xs text-gray-500">
                      {reservation.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} />
                      {reservation.location}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="flex flex-col gap-1">
                    <strong>{reservation.requestedBy}</strong>
                    <span className="text-xs text-gray-500">
                      {reservation.department}
                    </span>
                  </div>
                </td>

                <td>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} />
                    {formatDate(reservation.date)}
                  </span>
                </td>

                <td>
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 size={14} />
                      {formatTime(reservation.startTime)}
                    </span>
                    <span className="text-xs text-gray-500">
                      to {formatTime(reservation.endTime)}
                    </span>
                  </div>
                </td>

                <td>
                  <ReservationStatusBadge status={reservation.status} />
                </td>

                <td>
                  {(reservation.status === "Pending" ||
                    reservation.status === "Approved") && (
                    <button
                      type="button"
                      onClick={() => onCancel(reservation.id)}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <Ban size={14} />
                      Cancel
                    </button>
                  )}

                  {reservation.status === "Cancelled" && (
                    <span className="text-xs text-gray-400">
                      Cancelled
                    </span>
                  )}

                  {reservation.status === "Rejected" && (
                    <span className="text-xs text-gray-400">
                      No action
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {reservations.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center gap-2 py-10 text-center">
                    <PackageSearch
                      size={30}
                      className="text-gray-400"
                    />
                    <strong>No reservations found</strong>
                    <span className="text-sm text-gray-500">
                      Try changing your search or status filter.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

