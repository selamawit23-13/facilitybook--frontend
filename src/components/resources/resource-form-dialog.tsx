import { Plus, Pencil } from "lucide-react";

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
  ResourceFormDialogProps,
} from "@/features/resourceTypes";
import type { ResourceStatus } from "@/features/resources/resourceSlice";

export function ResourceFormDialog({
  open,
  editingResourceId,
  form,
  error,
  onOpenChange,
  onSubmit,
  onFieldChange,
}: ResourceFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editingResourceId !== null ? "Edit Resource" : "Add New Resource"}
          </DialogTitle>
          <DialogDescription>
            Enter the resource details, location and availability information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5">
          <section>
            <h3 className="mb-3 text-sm font-semibold text-emerald-800">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Resource Name *
                <input
                  className="form-input"
                  value={form.name}
                  onChange={(event) => onFieldChange("name", event.target.value)}
                  placeholder="e.g. Conference Room A"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Category *
                <select
                  className="form-input"
                  value={form.category}
                  onChange={(event) => onFieldChange("category", event.target.value)}
                  required
                >
                  <option>Meeting Room</option>
                  <option>Computer Lab</option>
                  <option>Training Hall</option>
                  <option>Equipment</option>
                  <option>Office Equipment</option>
                  <option>Vehicle</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-2">
                Description
                <textarea
                  className="form-input min-h-20"
                  value={form.description}
                  onChange={(event) => onFieldChange("description", event.target.value)}
                  placeholder="Describe this resource..."
                />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-emerald-800">
              Location and Capacity
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Building *
                <input
                  className="form-input"
                  value={form.building}
                  onChange={(event) => onFieldChange("building", event.target.value)}
                  placeholder="e.g. Main Building"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Floor *
                <input
                  className="form-input"
                  value={form.floor}
                  onChange={(event) => onFieldChange("floor", event.target.value)}
                  placeholder="e.g. Floor 2"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Specific Location *
                <input
                  className="form-input"
                  value={form.location}
                  onChange={(event) => onFieldChange("location", event.target.value)}
                  placeholder="e.g. East Wing"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Capacity *
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  step="1"
                  value={form.capacity}
                  onChange={(event) =>
                    onFieldChange(
                      "capacity",
                      event.target.value === "" ? 0 : Number(event.target.value)
                    )
                  }
                  required
                />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-emerald-800">
              Operations and Availability
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Operating Hours
                <input
                  className="form-input"
                  value={form.operatingHours}
                  onChange={(event) => onFieldChange("operatingHours", event.target.value)}
                  placeholder="08:00 - 17:00"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Resource Status
                <select
                  className="form-input"
                  value={form.status}
                  onChange={(event) =>
                    onFieldChange("status", event.target.value as ResourceStatus)
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-2">
                Equipment and Features
                <textarea
                  className="form-input min-h-20"
                  value={form.features}
                  onChange={(event) => onFieldChange("features", event.target.value)}
                  placeholder="e.g. Projector, Wi-Fi, Video Conference"
                />
              </label>
            </div>
          </section>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-700 text-white hover:bg-emerald-800"
            >
              {editingResourceId !== null ? (
                <>
                  <Pencil size={15} />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Resource
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
