
"use client";

import { useMemo, useState } from "react";
import { Plus, SlidersHorizontal } from "lucide-react";

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
  ReservationDialogProps,
  ResourceFilters,
} from "@/features/reservations/reservationTypes";

const emptyFilters: ResourceFilters = {
  category: "All types",
  location: "All locations",
  minimumCapacity: "",
};

export function NewReservationDialog({
  open,
  onOpenChange,
  form,
  resourceOptions,
  reservations,
  today,
  error,
  onSubmit,
  onUpdate,
}: ReservationDialogProps) {
  const [filters, setFilters] = useState<ResourceFilters>(emptyFilters);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(resourceOptions.map((item) => item.category))),
    [resourceOptions]
  );

  const locations = useMemo(
    () => Array.from(new Set(resourceOptions.map((item) => item.location))),
    [resourceOptions]
  );

  function isAvailable(resourceName: string) {
    if (
      !form.date ||
      !form.startTime ||
      !form.endTime ||
      form.endTime <= form.startTime
    ) {
      return true;
    }

    return !reservations.some((reservation) => {
      if (
        reservation.resource !== resourceName ||
        reservation.date !== form.date ||
        (reservation.status !== "Pending" &&
          reservation.status !== "Approved")
      ) {
        return false;
      }

      return (
        form.startTime < reservation.endTime &&
        form.endTime > reservation.startTime
      );
    });
  }

  const filteredResources = useMemo(() => {
    const minimumCapacity = Number(filters.minimumCapacity);

    return resourceOptions.filter((resource) => {
      const matchesCategory =
        filters.category === "All types" ||
        resource.category === filters.category;

      const matchesLocation =
        filters.location === "All locations" ||
        resource.location === filters.location;

      const matchesCapacity =
        !filters.minimumCapacity ||
        resource.capacity >= minimumCapacity;

      const matchesAvailability =
        !showOnlyAvailable || isAvailable(resource.name);

      return (
        matchesCategory &&
        matchesLocation &&
        matchesCapacity &&
        matchesAvailability
      );
    });
  }, [
    resourceOptions,
    filters,
    showOnlyAvailable,
    reservations,
    form.date,
    form.startTime,
    form.endTime,
  ]);

  function updateFilter(
    field: keyof ResourceFilters,
    value: string
  ) {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetFilters() {
    setFilters(emptyFilters);
    setShowOnlyAvailable(false);
  }

  function handleOpenChange(value: boolean) {
    if (!value) {
      resetFilters();
    }

    onOpenChange(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Create New Reservation
          </DialogTitle>
          <DialogDescription>
            Select a resource and provide the booking details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Resource Selection */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-emerald-800">
              Resource Selection
            </h3>

            {/* Resource filters */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <SlidersHorizontal size={16} />
                  Filter Resources
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-medium text-emerald-700 hover:underline"
                >
                  Clear filters
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Resource Type

                  <select
                    className="form-input"
                    value={filters.category}
                    onChange={(event) =>
                      updateFilter("category", event.target.value)
                    }
                  >
                    <option value="All types">All types</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Location

                  <select
                    className="form-input"
                    value={filters.location}
                    onChange={(event) =>
                      updateFilter("location", event.target.value)
                    }
                  >
                    <option value="All locations">All locations</option>

                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-2">
                  Minimum Capacity

                  <input
                    className="form-input"
                    type="number"
                    min="1"
                    placeholder="Enter required capacity"
                    value={filters.minimumCapacity}
                    onChange={(event) =>
                      updateFilter("minimumCapacity", event.target.value)
                    }
                  />
                </label>
              </div>

              <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={showOnlyAvailable}
                  onChange={(event) =>
                    setShowOnlyAvailable(event.target.checked)
                  }
                  className="h-4 w-4 accent-emerald-700"
                />
                Show only available resources
              </label>

              <p className="mt-2 text-xs text-gray-500">
                {filteredResources.length} of {resourceOptions.length} resources match your filters.
              </p>

              {showOnlyAvailable &&
                (!form.date || !form.startTime || !form.endTime) && (
                  <p className="mt-2 text-xs text-amber-700">
                    Select a reservation date, start time, and end time to check availability accurately.
                  </p>
                )}
            </div>

            {/* Resource dropdown */}
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

                {filteredResources.map((resource) => (
                  <option
                    key={resource.name}
                    value={resource.name}
                  >
                    {resource.name} — {resource.category}
                    {showOnlyAvailable ? " — Available" : ""}
                  </option>
                ))}
              </select>
            </label>

            {filteredResources.length === 0 && (
              <p className="mt-2 text-sm text-amber-700">
                No resources match your selected filters. Try changing your filters or schedule.
              </p>
            )}

            {/* Selected resource information */}
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
                          Resource Type
                        </span>
                        <p className="font-medium text-gray-800">
                          {resource.category}
                        </p>
                      </div>

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

                      <div>
                        <span className="text-xs text-gray-500">
                          Availability
                        </span>
                        <p
                          className={`font-medium ${
                            isAvailable(resource.name)
                              ? "text-emerald-700"
                              : "text-red-700"
                          }`}
                        >
                          {!form.date || !form.startTime || !form.endTime
                            ? "Select schedule"
                            : isAvailable(resource.name)
                              ? "Available"
                              : "Not available"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Reservation Schedule */}
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

          {/* Purpose */}
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
              onClick={() => handleOpenChange(false)}
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
