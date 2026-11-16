import { Search } from "lucide-react";

interface NotificationFiltersProps {
  search: string;
  activeFilter: string;
  unreadCount: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

const filters = [
  "All",
  "Unread",
  "Read",
  "Reservation",
  "Approval",
  "Maintenance",
];

export function NotificationFilters({
  search,
  activeFilter,
  unreadCount,
  onSearchChange,
  onFilterChange,
}: NotificationFiltersProps) {
  return (
    <div className="border-b border-slate-100 p-4 sm:p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-bold text-[#17251e]">Recent activity</h2>
          <p className="mt-1 text-xs text-slate-500">
            Review and manage your notification history.
          </p>
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search notifications..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                active
                  ? "bg-[#123d2b] text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              {filter}
              {filter === "Unread" && unreadCount > 0 && (
                <span
                  className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
