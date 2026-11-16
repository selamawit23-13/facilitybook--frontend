"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AppShell } from "@/components/layout/app-shell";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addMaintenanceRecord,
  updateMaintenanceStatus,
  type MaintenanceRecord,
  type MaintenanceStatus,
} from "@/features/maintenance/maintenanceSlice";

import {
  MaintenanceFormDialog,
  type MaintenanceFormData,
} from "@/components/maintenance/maintenance-form-dialog";
import { MaintenanceDetailsDialog } from "@/components/maintenance/maintenance-details-dialog";
import { MaintenanceNotice } from "@/components/maintenance/maintenance-notice";
import { MaintenancePageHeader } from "@/components/maintenance/maintenance-page-header";
import { MaintenanceStats } from "@/components/maintenance/maintenance-stats";
import { MaintenanceTable } from "@/components/maintenance/maintenance-table";

const emptyForm: MaintenanceFormData = {
  resource: "",
  category: "",
  location: "",
  issue: "",
  description: "",
  reportedBy: "",
  startDate: "",
  endDate: "",
};

export default function MaintenancePage() {
  const dispatch = useAppDispatch();

  // Maintenance records are managed by the shared Redux store.
  const records = useAppSelector(
    (state) => state.maintenance.records
  );

  // Local state is only for page interactions and dialogs.
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [detailsRecordId, setDetailsRecordId] = useState<number | null>(null);
  const [form, setForm] = useState<MaintenanceFormData>(emptyForm);
  const [formError, setFormError] = useState("");

  // Always retrieve the latest record from Redux.
  const detailsRecord =
    records.find((record) => record.id === detailsRecordId) ?? null;

  // Calculate dashboard statistics from Redux records.
  const metrics = useMemo(
    () => ({
      total: records.length,
      reported: records.filter((r) => r.status === "Reported").length,
      active: records.filter((r) => r.status === "In Progress").length,
      scheduled: records.filter((r) => r.status === "Scheduled").length,
      completed: records.filter((r) => r.status === "Completed").length,
    }),
    [records]
  );

  // Apply search and status filters.
  const filteredRecords = useMemo(() => {
    const query = search.toLowerCase().trim();

    return records.filter((record) => {
      const matchesSearch =
        record.resource.toLowerCase().includes(query) ||
        record.issue.toLowerCase().includes(query) ||
        record.reportedBy.toLowerCase().includes(query) ||
        record.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  // Update maintenance status through Redux.
  function updateStatus(id: number, status: MaintenanceStatus) {
    dispatch(updateMaintenanceStatus({ id, status }));
  }

  function openNewReport() {
    setForm({ ...emptyForm });
    setFormError("");
    setFormOpen(true);
  }

  function updateFormField(field: keyof MaintenanceFormData, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // Validate and submit a new maintenance report.
  function createMaintenanceRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.resource.trim() ||
      !form.category ||
      !form.location.trim() ||
      !form.issue.trim() ||
      !form.reportedBy.trim() ||
      !form.startDate ||
      !form.endDate
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    if (form.endDate < form.startDate) {
      setFormError("The end date cannot be earlier than the start date.");
      return;
    }

    const newRecord: MaintenanceRecord = {
      id: Math.max(0, ...records.map((r) => r.id)) + 1,
      resource: form.resource.trim(),
      category: form.category,
      location: form.location.trim(),
      issue: form.issue.trim(),
      description: form.description.trim(),
      reportedBy: form.reportedBy.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      status: "Reported",
      affectedReservations: 0,
    };

    dispatch(addMaintenanceRecord(newRecord));

    setFormOpen(false);
    setForm({ ...emptyForm });
    setFormError("");
    setStatusFilter("All");
    setSearch("");
  }

  return (
    <AppShell>
      <div className="space-y-7 pb-8">
        <MaintenancePageHeader onAdd={openNewReport} />

        <MaintenanceStats metrics={metrics} />

        <MaintenanceNotice />

        <MaintenanceTable
          records={records}
          filteredRecords={filteredRecords}
          search={search}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onView={setDetailsRecordId}
          onUpdateStatus={updateStatus}
        />

        <MaintenanceFormDialog
          open={formOpen}
          form={form}
          formError={formError}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setFormError("");
          }}
          onSubmit={createMaintenanceRecord}
          onChange={updateFormField}
        />

        <MaintenanceDetailsDialog
          record={detailsRecord}
          onOpenChange={(open) => {
            if (!open) setDetailsRecordId(null);
          }}
          onUpdateStatus={updateStatus}
        />

        <p className="text-center text-xs text-slate-400">
          Demonstration data only. Maintenance records currently use the
          shared Redux store and are not yet connected to the backend.
        </p>
      </div>
    </AppShell>
  );
}
