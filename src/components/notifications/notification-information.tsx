import { Info } from "lucide-react";

export function NotificationInformation() {
  return (
    <div className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
      <Info size={18} className="mt-0.5 shrink-0 text-emerald-700" />

      <div>
        <p className="text-sm font-semibold text-emerald-900">
          Notification center
        </p>

        <p className="mt-1 text-xs leading-5 text-emerald-800/80">
          This page demonstrates in-app notifications for reservation
          confirmations, approval decisions, cancellations, reminders,
          and maintenance updates. Persistent notification history and
          automatic delivery will be connected to the backend later.
        </p>
      </div>
    </div>
  );
}
