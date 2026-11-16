import type { OverviewCardProps } from "@/features/settingsTypes";

export function OverviewCard({
  icon,
  label,
  value,
  description,
}: OverviewCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
          {icon}
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}
