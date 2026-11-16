"use client";

import type { TrendItem } from "@/features/reports/reportTypes";

interface ReservationTrendProps {
  period: string;
  totalReservations: number;
  trend: TrendItem[];
  maxTrend: number;
}

export function ReservationTrend({
  period,
  totalReservations,
  trend,
  maxTrend,
}: ReservationTrendProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-[#17251e]">
            Reservation activity
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Reservation volume during {period.toLowerCase()}
          </p>
        </div>

        <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
          {totalReservations.toLocaleString()} bookings
        </span>
      </div>

      {totalReservations > 0 ? (
        <div className="mt-8 flex h-56 items-end gap-3 sm:gap-5">
          {trend.map((item) => (
            <div
              key={item.label}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
            >
              <span className="text-xs font-semibold text-slate-500">
                {item.value}
              </span>

              <div className="flex h-[165px] w-full items-end overflow-hidden rounded-t-lg bg-emerald-50">
                <div
                  className="w-full rounded-t-lg bg-[#16835b] transition-all duration-500 hover:bg-[#106a49]"
                  style={{
                    height: `${
                      item.value === 0
                        ? 0
                        : Math.max(
                            5,
                            (item.value / maxTrend) * 100
                          )
                    }%`,
                  }}
                />
              </div>

              <span className="text-center text-[11px] font-medium text-slate-500">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex h-56 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
          No reservation activity in this period.
        </div>
      )}

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="h-2.5 w-2.5 rounded-sm bg-[#16835b]" />
        Number of reservations
      </div>
    </div>
  );
}
