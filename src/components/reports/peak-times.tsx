import { Clock3 } from "lucide-react";
import type { PeakTimeItem } from "@/features/reports/reportTypes";

interface PeakTimesProps {
  peakTime: PeakTimeItem[];
}

export function PeakTimes({ peakTime }: PeakTimesProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
          <Clock3 size={20} />
        </div>
        <div>
          <h2 className="font-bold text-[#17251e]">
            Peak reservation times
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Booking activity grouped by starting time
          </p>
        </div>
      </div>

      {peakTime.length > 0 ? (
        <div className="mt-6 space-y-4">
          {peakTime.map((slot) => (
            <div key={slot.time}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  {slot.time}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {slot.bookings} bookings
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#16835b]"
                  style={{ width: `${slot.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
          No booking activity in this period.
        </div>
      )}

      <p className="mt-4 text-[11px] text-slate-400">
        Percentages compare each time slot with the busiest slot.
      </p>
    </div>
  );
}
