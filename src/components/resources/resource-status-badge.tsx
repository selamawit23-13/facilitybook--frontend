import type { ResourceStatus } from "@/features/resources/resourceSlice";

export function ResourceStatusBadge({
  status,
}: {
  status: ResourceStatus;
}) {
  const styles: Record<ResourceStatus, string> = {
    Available: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Unavailable: "border-gray-200 bg-gray-100 text-gray-600",
    "Under Maintenance": "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
