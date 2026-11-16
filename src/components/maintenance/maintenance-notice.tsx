import { AlertTriangle } from "lucide-react";

export function MaintenanceNotice() {
  return (
    <section className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-white p-2 text-emerald-700">
          <AlertTriangle size={19} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">
            Resource availability and maintenance
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Resources undergoing maintenance must not be available for new
            reservations during the affected period. Existing reservations
            may need review by authorized staff.
          </p>
        </div>
      </div>
    </section>
  );
}
