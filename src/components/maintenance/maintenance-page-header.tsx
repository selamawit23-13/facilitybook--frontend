"use client";

import { Plus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaintenancePageHeaderProps {
  onAdd: () => void;
}

export function MaintenancePageHeader({
  onAdd,
}: MaintenancePageHeaderProps) {
  return (
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
          <Wrench size={17} />
          Facility Operations
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Maintenance Management
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Report resource issues, schedule maintenance, monitor downtime,
          and restore resources when work is completed.
        </p>
      </div>

      <Button
        onClick={onAdd}
        className="bg-emerald-700 text-white hover:bg-emerald-800"
      >
        <Plus size={17} className="mr-2" />
        Report an issue
      </Button>
    </section>
  );
}
