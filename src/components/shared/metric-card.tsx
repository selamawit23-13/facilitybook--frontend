import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string | number;
  note: string;
  icon: ReactNode;
  iconClassName?: string;
  valueClassName?: string;
}

export function MetricCard({
  label,
  value,
  note,
  icon,
  iconClassName = "bg-emerald-50 text-emerald-700",
  valueClassName = "text-slate-950",
}: MetricCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className={`mt-2 text-3xl font-bold tracking-tight ${valueClassName}`}>
              {value}
            </p>
          </div>
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}>
            {icon}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">{note}</p>
      </CardContent>
    </Card>
  );
}
