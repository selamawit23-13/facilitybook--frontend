import { CalendarDays, ChevronDown } from "lucide-react";

import { SettingsSection } from "./settings-section";

interface ReservationPoliciesProps {
  cancellationHours: string;
  approvalRequired: boolean;
  onCancellationHoursChange: (value: string) => void;
  onApprovalRequiredChange: (value: boolean) => void;
}

export function ReservationPolicies({
  cancellationHours,
  approvalRequired,
  onCancellationHoursChange,
  onApprovalRequiredChange,
}: ReservationPoliciesProps) {
  return (
    <SettingsSection
      icon={<CalendarDays size={20} />}
      title="Reservation policies"
      description="Review basic booking rules for organizational resources."
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Cancellation notice period
          </label>
          <div className="relative max-w-sm">
            <select
              value={cancellationHours}
              onChange={(event) =>
                onCancellationHoursChange(event.target.value)
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="2">2 hours before reservation</option>
              <option value="6">6 hours before reservation</option>
              <option value="12">12 hours before reservation</option>
              <option value="24">24 hours before reservation</option>
              <option value="48">48 hours before reservation</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Demonstration policy for reservation cancellation.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Reservation approval workflow
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Enable approval review for reservations requiring
              authorization under resource or department policies.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={approvalRequired}
            aria-label="Toggle reservation approval workflow"
            onClick={() => onApprovalRequiredChange(!approvalRequired)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              approvalRequired ? "bg-emerald-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                approvalRequired ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </SettingsSection>
  );
}
