interface ResourceCoverageProps {
  utilization: number;
}

export function ResourceCoverage({
  utilization,
}: ResourceCoverageProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-bold text-[#17251e]">
          Resource booking coverage
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Share of registered resources with active bookings
        </p>
      </div>

      <div className="flex flex-col items-center py-7">
        <div
          className="relative flex h-40 w-40 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(#16835b ${utilization}%, #e8f1ec ${utilization}% 100%)`,
          }}
        >
          <div className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-[#17251e]">
              {utilization}%
            </span>
            <span className="mt-1 text-[10px] font-medium text-slate-400">
              COVERAGE
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#16835b]" />
            Resources with bookings
          </span>
          <span className="font-semibold text-slate-800">
            {utilization}%
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e8f1ec]" />
            Without bookings
          </span>
          <span className="font-semibold text-slate-800">
            {100 - utilization}%
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          Based on approved and pending reservations.
        </p>
      </div>
    </div>
  );
}
