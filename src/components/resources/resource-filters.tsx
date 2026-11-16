import { Search } from "lucide-react";
import type { ResourceFiltersProps } from "@/features/resourceTypes";

export function ResourceFilters({
  search,
  categoryFilter,
  statusFilter,
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: ResourceFiltersProps) {
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
          placeholder="Search resource, building or feature..."
          className="form-input w-full pl-10"
        />
      </div>

      <select
        value={categoryFilter}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="form-input min-w-40"
        aria-label="Filter resources by category"
      >
        <option>All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
        className="form-input min-w-40"
        aria-label="Filter resources by status"
      >
        <option>All statuses</option>
        <option>Available</option>
        <option>Unavailable</option>
        <option>Under Maintenance</option>
      </select>
    </div>
  );
}
