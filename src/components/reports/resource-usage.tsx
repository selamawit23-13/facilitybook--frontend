import { Building2 } from "lucide-react";
import type { ResourceUsageItem } from "@/features/reports/reportTypes";

interface ResourceUsageProps {
  resources: ResourceUsageItem[];
}

export function ResourceUsage({ resources }: ResourceUsageProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-[#17251e]">
            Most requested resources
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Reservation activity comparison
          </p>
        </div>

        <Building2 size={20} className="text-emerald-700" />
      </div>

      {resources.length > 0 ? (
        <div className="mt-6 space-y-5">
          {resources.map((resource, index) => (
            <div key={resource.name}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-700">
                    {index + 1}. {resource.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {resource.category} · {resource.bookings} bookings
                  </p>
                </div>

                <span className="shrink-0 text-sm font-bold text-[#17251e]">
                  {resource.usage}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#16835b] transition-all duration-500"
                  style={{ width: `${resource.usage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
          No resource bookings in this period.
        </div>
      )}

      <p className="mt-4 text-[11px] text-slate-400">
        Bars show relative booking activity, not time-based utilization.
      </p>
    </div>
  );
}
