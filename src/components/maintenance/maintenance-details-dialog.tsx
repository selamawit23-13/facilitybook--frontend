"use client";

import {
  AlertTriangle,
  UserRound,
  CalendarDays,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type {
  MaintenanceRecord,
  MaintenanceStatus,
} from "@/features/maintenance/maintenanceSlice";

import { MaintenanceStatusBadge } from "./maintenance-status-badge";
import { formatMaintenanceDate } from "./maintenance-utils";

interface MaintenanceDetailsDialogProps {
  record: MaintenanceRecord | null;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: number, status: MaintenanceStatus) => void;
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-emerald-700">{icon}</div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export function MaintenanceDetailsDialog({
  record,
  onOpenChange,
  onUpdateStatus,
}: MaintenanceDetailsDialogProps) {
  return (
    <Dialog
      open={!!record}
      onOpenChange={(open) => {
        if (!open) onOpenChange(false);
      }}
    >
      <DialogContent className="sm:max-w-xl">
        {record && (
          <>
            <DialogHeader>
              <DialogTitle>Maintenance Details</DialogTitle>
              <DialogDescription>
                Review the issue, maintenance period, and current status.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-3">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Resource
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  {record.resource}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {record.category} · {record.location}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  icon={<AlertTriangle size={16} />}
                  label="Issue"
                  value={record.issue}
                />

                <DetailItem
                  icon={<UserRound size={16} />}
                  label="Reported by"
                  value={record.reportedBy}
                />

                <DetailItem
                  icon={<CalendarDays size={16} />}
                  label="Start date"
                  value={formatMaintenanceDate(record.startDate)}
                />

                <DetailItem
                  icon={<Clock3 size={16} />}
                  label="Expected completion"
                  value={formatMaintenanceDate(record.endDate)}
                />
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Description
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {record.description || "No additional description."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-400">Current status</p>
                  <div className="mt-2">
                    <MaintenanceStatusBadge status={record.status} />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Affected reservations
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {record.affectedReservations}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                <p className="text-sm text-amber-800">
                  Availability must be checked against this maintenance
                  period before confirming new reservations.
                </p>
              </div>
            </div>

            <DialogFooter>
              {record.status === "Reported" && (
                <Button
                  onClick={() => onUpdateStatus(record.id, "Scheduled")}
                  className="bg-violet-700 text-white hover:bg-violet-800"
                >
                  Schedule maintenance
                </Button>
              )}

              {record.status === "Scheduled" && (
                <Button
                  onClick={() => onUpdateStatus(record.id, "In Progress")}
                  className="bg-blue-700 text-white hover:bg-blue-800"
                >
                  Start maintenance
                </Button>
              )}

              {record.status === "In Progress" && (
                <Button
                  onClick={() => onUpdateStatus(record.id, "Completed")}
                  className="bg-emerald-700 text-white hover:bg-emerald-800"
                >
                  <CheckCircle2 size={16} className="mr-2" />
                  Mark completed
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
