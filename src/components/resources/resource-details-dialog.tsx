import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { ResourceDetailsDialogProps } from "@/features/resourceTypes";
import { ResourceStatusBadge } from "./resource-status-badge";
import { ResourceDetailItem } from "./resource-detail-item";

export function ResourceDetailsDialog({
  open,
  resource,
  onOpenChange,
  onEdit,
}: ResourceDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Resource Information</DialogTitle>
          <DialogDescription>
            View the details and current availability of this resource.
          </DialogDescription>
        </DialogHeader>

        {resource && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {resource.name}
                </h3>
                <p className="text-sm text-gray-500">{resource.category}</p>
              </div>
              <ResourceStatusBadge status={resource.status} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ResourceDetailItem label="Building" value={resource.building} />
              <ResourceDetailItem label="Floor" value={resource.floor} />
              <ResourceDetailItem label="Location" value={resource.location} />
              <ResourceDetailItem label="Capacity" value={String(resource.capacity)} />
              <ResourceDetailItem label="Operating Hours" value={resource.operatingHours} />
              <ResourceDetailItem label="Features" value={resource.features || "Not specified"} />
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Description
              </p>
              <p className="text-sm leading-6 text-gray-700">
                {resource.description || "No description provided."}
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button
                type="button"
                onClick={() => onEdit(resource)}
                className="bg-emerald-700 text-white hover:bg-emerald-800"
              >
                <Pencil size={15} />
                Edit Resource
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
