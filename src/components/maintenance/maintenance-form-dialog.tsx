"use client";

import { Plus } from "lucide-react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface MaintenanceFormData {
  resource: string;
  category: string;
  location: string;
  issue: string;
  description: string;
  reportedBy: string;
  startDate: string;
  endDate: string;
}

interface MaintenanceFormDialogProps {
  open: boolean;
  form: MaintenanceFormData;
  formError: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof MaintenanceFormData, value: string) => void;
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

export function MaintenanceFormDialog({
  open,
  form,
  formError,
  onOpenChange,
  onSubmit,
  onChange,
}: MaintenanceFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Report Maintenance Issue</DialogTitle>
          <DialogDescription>
            Record a resource issue and provide the maintenance period.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
            <FormField label="Resource name *">
              <input
                required
                value={form.resource}
                onChange={(e) => onChange("resource", e.target.value)}
                placeholder="e.g. Conference Room A"
                className="form-input"
              />
            </FormField>

            <FormField label="Resource category *">
              <select
                required
                value={form.category}
                onChange={(e) => onChange("category", e.target.value)}
                className="form-input"
              >
                <option value="">Select category</option>
                <option value="Meeting Room">Meeting Room</option>
                <option value="Conference Room">Conference Room</option>
                <option value="Training Room">Training Room</option>
                <option value="Computer Laboratory">Computer Laboratory</option>
                <option value="Equipment">Equipment</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Other">Other</option>
              </select>
            </FormField>

            <FormField label="Building and location *">
              <input
                required
                value={form.location}
                onChange={(e) => onChange("location", e.target.value)}
                placeholder="e.g. Building A, Floor 2"
                className="form-input"
              />
            </FormField>

            <FormField label="Issue title *">
              <input
                required
                value={form.issue}
                onChange={(e) => onChange("issue", e.target.value)}
                placeholder="e.g. Air conditioning problem"
                className="form-input"
              />
            </FormField>

            <FormField label="Reported by *">
              <input
                required
                value={form.reportedBy}
                onChange={(e) => onChange("reportedBy", e.target.value)}
                placeholder="Employee or facility staff"
                className="form-input"
              />
            </FormField>

            <FormField label="Maintenance start date *">
              <input
                required
                type="date"
                value={form.startDate}
                onChange={(e) => onChange("startDate", e.target.value)}
                className="form-input"
              />
            </FormField>

            <FormField label="Expected completion date *">
              <input
                required
                type="date"
                min={form.startDate || undefined}
                value={form.endDate}
                onChange={(e) => onChange("endDate", e.target.value)}
                className="form-input"
              />
            </FormField>

            <div className="sm:col-span-2">
              <FormField label="Issue description">
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  placeholder="Describe the problem and the work required..."
                  className="form-input min-h-24 resize-y"
                />
              </FormField>
            </div>
          </div>

          {formError && (
            <p className="mb-3 text-sm text-red-600">{formError}</p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-emerald-700 text-white hover:bg-emerald-800"
            >
              <Plus size={16} className="mr-2" />
              Submit Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
