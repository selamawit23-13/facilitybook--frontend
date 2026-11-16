import {
  Wrench,
  AlertTriangle,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { MaintenanceMetricCard } from "./maintenance-metric-card";

interface MaintenanceStatsProps {
  metrics: {
    total: number;
    reported: number;
    active: number;
    scheduled: number;
    completed: number;
  };
}

export function MaintenanceStats({ metrics }: MaintenanceStatsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MaintenanceMetricCard
        label="Total Records"
        value={metrics.total}
        note="All maintenance records"
        icon={<Wrench size={20} />}
        iconStyle="bg-slate-100 text-slate-700"
      />

      <MaintenanceMetricCard
        label="Reported"
        value={metrics.reported}
        note="Awaiting scheduling"
        icon={<AlertTriangle size={20} />}
        iconStyle="bg-amber-50 text-amber-700"
      />

      <MaintenanceMetricCard
        label="In Progress"
        value={metrics.active}
        note="Currently being handled"
        icon={<Clock3 size={20} />}
        iconStyle="bg-blue-50 text-blue-700"
      />

      <MaintenanceMetricCard
        label="Completed"
        value={metrics.completed}
        note="Maintenance resolved"
        icon={<CheckCircle2 size={20} />}
        iconStyle="bg-emerald-50 text-emerald-700"
      />
    </section>
  );
}
