import { Search } from "lucide-react";
import type { ReservationFilter } from "@/features/reservations/reservationTypes";

interface ReservationFiltersProps {
  search: string;
  statusFilter: ReservationFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ReservationFilter) => void;
}

export function ReservationFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: ReservationFiltersProps) {
  return (
    <div className="flex flex-col gap-3 px-4 pb-4 md:flex-row">
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search resource, employee or purpose..."
          className="form-input w-full pl-10"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(event) =>
          onStatusChange(event.target.value as ReservationFilter)
        }
        className="form-input min-w-44"
        aria-label="Filter reservations by status"
      >
        <option>All statuses</option>
        <option>Pending</option>
        <option>Approved</option>
        <option>Rejected</option>
        <option>Cancelled</option>
      </select>
    </div>
  );
}
