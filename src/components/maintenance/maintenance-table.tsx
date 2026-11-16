"use client";

import {
  Eye,
  CalendarDays,
  Wrench,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import type {
  MaintenanceRecord,
  MaintenanceStatus,
} from "@/features/maintenance/maintenanceSlice";

import { MaintenanceFilters } from "./maintenance-filters";
import { MaintenanceStatusBadge } from "./maintenance-status-badge";
import { formatMaintenanceDate } from "./maintenance-utils";

interface MaintenanceTableProps {
  records: MaintenanceRecord[];
  filteredRecords: MaintenanceRecord[];
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onView: (id: number) => void;
  onUpdateStatus: (id: number, status: MaintenanceStatus) => void;
}

export function MaintenanceTable({
  records,
  filteredRecords,
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onView,
  onUpdateStatus,
}: MaintenanceTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Maintenance Records
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Monitor reported issues and scheduled maintenance work.
            </p>
          </div>

          <MaintenanceFilters
            search={search}
            statusFilter={statusFilter}
            onSearchChange={onSearchChange}
            onStatusChange={onStatusChange}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">Resource</th>
              <th className="px-5 py-4">Issue</th>
              <th className="px-5 py-4">Reported By</th>
              <th className="px-5 py-4">Maintenance Period</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredRecords.map((record) => (
              <tr
                key={record.id}
                className="transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-800">
                    {record.resource}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} />
                    {record.location}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-800">
                    {record.issue}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {record.category}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {record.reportedBy}
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-slate-700">
                    {formatMaintenanceDate(record.startDate)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Until {formatMaintenanceDate(record.endDate)}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <MaintenanceStatusBadge status={record.status} />

                  {record.affectedReservations > 0 && (
                    <p className="mt-1 text-xs text-amber-700">
                      {record.affectedReservations} affected booking(s)
                    </p>
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(record.id)}
                      title="View details"
                      aria-label={`View ${record.resource} maintenance details`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Eye size={16} />
                    </button>

                    {record.status === "Reported" && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(record.id, "Scheduled")}
                        title="Schedule maintenance"
                        aria-label="Schedule maintenance"
                        className="rounded-lg border border-violet-200 p-2 text-violet-700 transition hover:bg-violet-50"
                      >
                        <CalendarDays size={16} />
                      </button>
                    )}

                    {record.status === "Scheduled" && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(record.id, "In Progress")}
                        title="Start maintenance"
                        aria-label="Start maintenance"
                        className="rounded-lg border border-blue-200 p-2 text-blue-700 transition hover:bg-blue-50"
                      >
                        <Wrench size={16} />
                      </button>
                    )}

                    {record.status === "In Progress" && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(record.id, "Completed")}
                        title="Complete maintenance"
                        aria-label="Complete maintenance"
                        className="rounded-lg border border-emerald-200 p-2 text-emerald-700 transition hover:bg-emerald-50"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <Wrench
                    size={30}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <p className="font-semibold text-slate-700">
                    No maintenance records found
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try another search or status filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row">
        <span>
          Showing {filteredRecords.length} of {records.length} records
        </span>
        <span>Maintenance history and resource downtime</span>
      </div>
    </section>
  );
}
