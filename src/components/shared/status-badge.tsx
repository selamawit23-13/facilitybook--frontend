import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const styles =
    normalized === "active" || normalized === "approved" || normalized === "available"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : normalized === "pending" || normalized === "assigned"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : normalized === "inactive" || normalized === "rejected" || normalized === "cancelled"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <Badge variant="outline" className={styles}>
      {status}
    </Badge>
  );
}
