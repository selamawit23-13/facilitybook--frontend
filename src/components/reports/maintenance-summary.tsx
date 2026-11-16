import { Wrench } from "lucide-react";

interface MaintenanceSummaryProps {
  maintenance: number;
  maintenanceDays: number;
}

export function MaintenanceSummary({
  maintenance,
  maintenanceDays,
}: MaintenanceSummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-amber-50 p-2.5 text-amber-700">
          <Wrench size={20} />
        </div>
        <div>
          <h2 className="font-bold text-[#17251e]">
            Maintenance performance
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Maintenance activity in selected period
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Maintenance tasks
          </p>
          <p className="mt-2 text-2xl font-bold text-[#17251e]">
            {maintenance}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Recorded tasks
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Maintenance duration
          </p>
          <p className="mt-2 text-2xl font-bold text-[#17251e]">
            {maintenanceDays} days
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Inclusive scheduled duration
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-3">
        <Wrench
          size={17}
          className="mt-0.5 shrink-0 text-amber-700"
        />
        <p className="text-xs leading-5 text-amber-900">
          Maintenance records help facility managers identify
          frequently affected resources and plan preventive
          maintenance.
        </p>
      </div>
    </div>
  );
}
