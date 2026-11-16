import {
  Building2,
  MapPin,
  Users,
  Clock3,
  Eye,
  Pencil,
  Trash2,
  PackageSearch,
} from "lucide-react";

import type { ResourceTableProps } from "@/features/resourceTypes";
import { ResourceStatusBadge } from "./resource-status-badge";

export function ResourceTable({
  resources,
  onView,
  onEdit,
  onDelete,
}: ResourceTableProps) {
  return (
    <div className="fb-table-wrap">
      <table className="fb-table fb-module-table">
        <thead>
          <tr>
            <th>RESOURCE</th>
            <th>CATEGORY</th>
            <th>LOCATION</th>
            <th>CAPACITY</th>
            <th>OPERATING HOURS</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>
                <div className="flex flex-col gap-1">
                  <strong>{resource.name}</strong>
                  <span className="max-w-52 text-xs text-gray-500">
                    {resource.description || "No description provided"}
                  </span>
                </div>
              </td>

              <td>{resource.category}</td>

              <td>
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center gap-1">
                    <Building2 size={13} />
                    {resource.building}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} />
                    {resource.floor} · {resource.location}
                  </span>
                </div>
              </td>

              <td>
                <span className="inline-flex items-center gap-1">
                  <Users size={14} />
                  {resource.capacity}
                </span>
              </td>

              <td>
                <span className="inline-flex items-center gap-1 text-sm">
                  <Clock3 size={14} />
                  {resource.operatingHours}
                </span>
              </td>

              <td>
                <ResourceStatusBadge status={resource.status} />
              </td>

              <td>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="View resource"
                    aria-label={`View ${resource.name}`}
                    onClick={() => onView(resource)}
                    className="rounded-md p-2 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    type="button"
                    title="Edit resource"
                    aria-label={`Edit ${resource.name}`}
                    onClick={() => onEdit(resource)}
                    className="rounded-md p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    title="Delete resource"
                    aria-label={`Delete ${resource.name}`}
                    onClick={() => onDelete(resource)}
                    className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {resources.length === 0 && (
            <tr>
              <td colSpan={7}>
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                  <PackageSearch size={32} className="text-gray-400" />
                  <strong>No resources found</strong>
                  <span className="text-sm text-gray-500">
                    Try changing your search or filters, or add a new resource.
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
