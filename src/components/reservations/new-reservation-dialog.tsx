"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReservationDialogProps } from "@/features/reservations/reservationTypes";

export function NewReservationDialog({
  open,
  onOpenChange,
  form,
  resourceOptions,
  today,
  error,
  onSubmit,
  onUpdate,
}: ReservationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Create New Reservation
          </DialogTitle>
          <DialogDescription>
            Select a resource and provide the booking details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-emerald-800">
              Resource Selection
            </h3>

            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Select Resource *

              <select
                className="form-input"
                value={form.resource}
                onChange={(event) =>
                  onUpdate("resource", event.target.value)
                }
                required
              >
                <option value="">Choose a resource</option>
                {resourceOptions.map((resource) => (
                  <option
                    key={resource.name}
                    value={resource.name}
                  >
                    {resource.name} — {resource.category}
                  </option>
                ))}
              </select>
            </label>

            {form.resource && (
              <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50/60 p-3">
                {resourceOptions
                  .filter((item) => item.name === form.resource)
                  .map((resource) => (
                    <div
                      key={resource.name}
                      className="grid grid-cols-2 gap-3 text-sm"
                    >
                      <div>
                        <span className="text-xs text-gray-500">
                          Location
                        </span>
                        <p className="font-medium text-gray-800">
                          {resource.location}
                        </p>
                      </div>

                      <div>
                        <span className="text-xs text-gray-500">
                          Capacity
                        </span>
                        <p className="font-medium text-gray-800">
                          {resource.capacity}{" "}
                          {resource.capacity === 1 ? "unit" : "people"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-emerald-800">
              Reservation Schedule
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-1.5 text-sm font-medium md:col-span-3">
                Reservation Date *

                <input
                  className="form-input"
                  type="date"
                  min={today || undefined}
                  value={form.date}
                  onChange={(event) =>
                    onUpdate("date", event.target.value)
                  }
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Start Time *

                <input
                  className="form-input"
                  type="time"
                  value={form.startTime}
                  onChange={(event) =>
                    onUpdate("startTime", event.target.value)
                  }
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium">
                End Time *

                <input
                  className="form-input"
                  type="time"
                  min={form.startTime || undefined}
                  value={form.endTime}
                  onChange={(event) =>
                    onUpdate("endTime", event.target.value)
                  }
                  required
                />
              </label>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-emerald-800">
              Booking Purpose
            </h3>

            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Purpose and Details *

              <textarea
                className="form-input min-h-24"
                placeholder="Explain why you need this resource..."
                value={form.purpose}
                onChange={(event) =>
                  onUpdate("purpose", event.target.value)
                }
                required
              />
            </label>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
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
              <Plus size={16} />
              Submit Reservation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
