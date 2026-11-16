import { Clock } from "lucide-react";

import { SettingsSection } from "./settings-section";

interface OperatingHoursProps {
  openingTime: string;
  closingTime: string;
  workingDays: string[];
  weekdays: string[];
  onOpeningTimeChange: (value: string) => void;
  onClosingTimeChange: (value: string) => void;
  onToggleWorkingDay: (day: string) => void;
}

export function OperatingHours({
  openingTime,
  closingTime,
  workingDays,
  weekdays,
  onOpeningTimeChange,
  onClosingTimeChange,
  onToggleWorkingDay,
}: OperatingHoursProps) {
  return (
    <SettingsSection
      icon={<Clock size={20} />}
      title="Operating hours and availability"
      description="Define when organizational facilities are normally available."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Opening time
          </label>
          <input
            type="time"
            value={openingTime}
            onChange={(event) => onOpeningTimeChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Closing time
          </label>
          <input
            type="time"
            value={closingTime}
            onChange={(event) => onClosingTimeChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-700">
          Working days
        </p>

        <div className="flex flex-wrap gap-2">
          {weekdays.map((day) => {
            const selected = workingDays.includes(day);

            return (
              <button
                type="button"
                key={day}
                onClick={() => onToggleWorkingDay(day)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  selected
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>
      </div>
    </SettingsSection>
  );
}
