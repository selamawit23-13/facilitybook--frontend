import type { MaintenanceStatus } from "@/features/maintenance/maintenanceSlice";

interface MaintenanceStatusBadgeProps {
  status: MaintenanceStatus;
}

export function MaintenanceStatusBadge({
  status,
}: MaintenanceStatusBadgeProps) {
  const styles: Record<MaintenanceStatus, string> = {
    Reported: "border-amber-200 bg-amber-50 text-amber-700",
    Scheduled: "border-violet-200 bg-violet-50 text-violet-700",
    "In Progress": "border-blue-200 bg-blue-50 text-blue-700",
    Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
