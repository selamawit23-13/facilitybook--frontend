import type { ReactNode } from "react";

interface MaintenanceMetricCardProps {
  label: string;
  value: number;
  note: string;
  icon: ReactNode;
  iconStyle: string;
}

export function MaintenanceMetricCard({
  label,
  value,
  note,
  icon,
  iconStyle,
}: MaintenanceMetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-2 text-xs text-slate-500">{note}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconStyle}`}>{icon}</div>
      </div>
    </div>
  );
}
