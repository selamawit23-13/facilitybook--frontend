import { TrendingUp } from "lucide-react";

export function ReportInsight() {
  return (
    <div className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
      <TrendingUp
        size={19}
        className="mt-0.5 shrink-0 text-emerald-700"
      />
      <div>
        <p className="text-sm font-semibold text-emerald-900">
          Facility performance insights
        </p>
        <p className="mt-1 text-xs leading-5 text-emerald-800/80">
          FacilityBook reports help organizations understand resource
          demand, identify peak booking periods, monitor department
          activity, and review maintenance records. These figures
          reflect the records currently held in the application.
          Time-based resource utilization and actual downtime require
          additional operational data.
        </p>
      </div>
    </div>
  );
}
