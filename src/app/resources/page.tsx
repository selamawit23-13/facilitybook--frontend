
"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Building2,
  Boxes,
  CheckCircle2,
  Wrench,
  MapPin,
  Users,
  Clock3,
  PackageSearch,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addResource,
  updateResource,
  deleteResource,
  type Resource,
  type ResourceStatus,
} from "@/features/resources/resourceSlice";

const emptyForm: Omit<Resource, "id"> = {
  name: "",
  description: "",
  category: "Meeting Room",
  building: "",
  floor: "",
  location: "",
  capacity: 1,
  features: "",
  operatingHours: "08:00 - 17:00",
  status: "Available",
};

function StatusBadge({ status }: { status: ResourceStatus }) {
  const styles: Record<ResourceStatus, string> = {
    Available: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Unavailable: "border-gray-200 bg-gray-100 text-gray-600",
    "Under Maintenance": "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function ResourcesPage() {
  const dispatch = useAppDispatch();

  // The resource list now comes from the shared Redux store.
  const resources = useAppSelector((state) => state.resources.items);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const [selectedResource, setSelectedResource] =
    useState<Resource | null>(null);

  const [editingResourceId, setEditingResourceId] =
    useState<number | null>(null);

  const [form, setForm] = useState<Omit<Resource, "id">>(emptyForm);
  const [error, setError] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(resources.map((resource) => resource.category))),
    [resources]
  );

  const filteredResources = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchText) ||
        resource.description.toLowerCase().includes(searchText) ||
        resource.category.toLowerCase().includes(searchText) ||
        resource.building.toLowerCase().includes(searchText) ||
        resource.floor.toLowerCase().includes(searchText) ||
        resource.location.toLowerCase().includes(searchText) ||
        resource.features.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "All categories" ||
        resource.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        resource.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [resources, search, categoryFilter, statusFilter]);

  const availableCount = resources.filter(
    (resource) => resource.status === "Available"
  ).length;

  const maintenanceCount = resources.filter(
    (resource) => resource.status === "Under Maintenance"
  ).length;

  const unavailableCount = resources.filter(
    (resource) => resource.status === "Unavailable"
  ).length;

  function updateForm(
    field: keyof Omit<Resource, "id">,
    value: string | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openAddDialog() {
    setEditingResourceId(null);
    setForm(emptyForm);
    setError("");
    setFormDialogOpen(true);
  }

  function openEditDialog(resource: Resource) {
    setEditingResourceId(resource.id);

    setForm({
      name: resource.name,
      description: resource.description,
      category: resource.category,
      building: resource.building,
      floor: resource.floor,
      location: resource.location,
      capacity: resource.capacity,
      features: resource.features,
      operatingHours: resource.operatingHours,
      status: resource.status,
    });

    setError("");
    setDetailsDialogOpen(false);
    setFormDialogOpen(true);
  }

  function openDetailsDialog(resource: Resource) {
    setSelectedResource(resource);
    setDetailsDialogOpen(true);
  }

  function saveResource(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.building.trim() ||
      !form.floor.trim() ||
      !form.location.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!Number.isInteger(form.capacity) || form.capacity < 1) {
      setError("Capacity must be a positive whole number.");
      return;
    }

    const resourceData: Omit<Resource, "id"> = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      building: form.building.trim(),
      floor: form.floor.trim(),
      location: form.location.trim(),
      capacity: form.capacity,
      features: form.features.trim(),
      operatingHours: form.operatingHours.trim(),
      status: form.status,
    };

    if (editingResourceId !== null) {
      dispatch(
        updateResource({
          id: editingResourceId,
          ...resourceData,
        })
      );
    } else {
      dispatch(
        addResource({
          id: Date.now(),
          ...resourceData,
        })
      );
    }

    setForm(emptyForm);
    setEditingResourceId(null);
    setFormDialogOpen(false);
  }

  function removeResource(resource: Resource) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${resource.name}"?`
    );

    if (!confirmed) return;

    dispatch(deleteResource(resource.id));

    if (selectedResource?.id === resource.id) {
      setSelectedResource(null);
      setDetailsDialogOpen(false);
    }
  }

  return (
    <AppShell>
      <div className="fb-enterprise-dashboard">
        {/* Page heading */}
        <section className="fb-page-heading">
          <div>
            <div className="fb-eyebrow">
              FACILITYBOOK MANAGEMENT
            </div>

            <h1>Resource Management</h1>

            <p>
              Register, organize and monitor the facilities and
              equipment available for reservation.
            </p>
          </div>

          <Button
            type="button"
            onClick={openAddDialog}
            className="bg-emerald-700 text-white hover:bg-emerald-800"
          >
            <Plus size={17} />
            Add Resource
          </Button>
        </section>

        {/* Summary cards */}
        <section className="fb-stat-grid fb-module-stats">
          <article className="fb-stat-card">
            <div className="fb-stat-top flex items-center justify-between">
              Total Resources
              <Boxes size={19} />
            </div>

            <div className="fb-stat-value">{resources.length}</div>

            <div className="fb-stat-change">
              Registered facilities and equipment
            </div>
          </article>

          <article className="fb-stat-card">
            <div className="fb-stat-top flex items-center justify-between">
              Available
              <CheckCircle2 size={19} />
            </div>

            <div className="fb-stat-value">{availableCount}</div>

            <div className="fb-stat-change">
              Ready for reservation
            </div>
          </article>

          <article className="fb-stat-card">
            <div className="fb-stat-top flex items-center justify-between">
              Under Maintenance
              <Wrench size={19} />
            </div>

            <div className="fb-stat-value">{maintenanceCount}</div>

            <div className="fb-stat-change">
              Currently being serviced
            </div>
          </article>

          <article className="fb-stat-card">
            <div className="fb-stat-top flex items-center justify-between">
              Unavailable
              <CircleAlertIcon />
            </div>

            <div className="fb-stat-value">{unavailableCount}</div>

            <div className="fb-stat-change">
              Not currently bookable
            </div>
          </article>
        </section>

        {/* Resource records */}
        <section className="fb-panel fb-module-panel">
          <div className="fb-panel-heading">
            <div>
              <h2>Registered Resources</h2>
              <p>
                View and manage the resources registered in FacilityBook.
              </p>
            </div>

            <span className="fb-period-label">
              {filteredResources.length} records
            </span>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col gap-3 px-4 pb-4 md:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search resource, building or feature..."
                className="form-input w-full pl-10"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="form-input min-w-40"
              aria-label="Filter resources by category"
            >
              <option>All categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="form-input min-w-40"
              aria-label="Filter resources by status"
            >
              <option>All statuses</option>
              <option>Available</option>
              <option>Unavailable</option>
              <option>Under Maintenance</option>
            </select>
          </div>

          {/* Resource table */}
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
                {filteredResources.map((resource) => (
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
                      <StatusBadge status={resource.status} />
                    </td>

                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          title="View resource"
                          aria-label={`View ${resource.name}`}
                          onClick={() => openDetailsDialog(resource)}
                          className="rounded-md p-2 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          title="Edit resource"
                          aria-label={`Edit ${resource.name}`}
                          onClick={() => openEditDialog(resource)}
                          className="rounded-md p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          title="Delete resource"
                          aria-label={`Delete ${resource.name}`}
                          onClick={() => removeResource(resource)}
                          className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredResources.length === 0 && (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex flex-col items-center gap-2 py-10 text-center">
                        <PackageSearch
                          size={32}
                          className="text-gray-400"
                        />

                        <strong>No resources found</strong>

                        <span className="text-sm text-gray-500">
                          Try changing your search or filters, or add a new
                          resource.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Resource information */}
        <section className="fb-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <Building2 size={19} className="text-emerald-700" />

            <h2 className="font-semibold">Resource Information</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 md:grid-cols-3">
            <div>
              <strong className="text-gray-800">
                Resource details
              </strong>

              <p>
                Each resource has a name, category, description and
                location to help employees identify the right facility
                or equipment.
              </p>
            </div>

            <div>
              <strong className="text-gray-800">
                Availability status
              </strong>

              <p>
                Resources can be available, unavailable or under
                maintenance. Only available resources should be offered
                for new reservations.
              </p>
            </div>

            <div>
              <strong className="text-gray-800">
                Reservation planning
              </strong>

              <p>
                Capacity, operating hours and resource features help
                employees choose an appropriate resource for their needs.
              </p>
            </div>
          </div>
        </section>

        <footer className="fb-footer">
          FacilityBook <span>•</span> Resource Management
          <span>•</span> Demonstration data
        </footer>
      </div>

      {/* View resource details dialog */}
      <Dialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Resource Information
            </DialogTitle>

            <DialogDescription>
              View the details and current availability of this resource.
            </DialogDescription>
          </DialogHeader>

          {selectedResource && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedResource.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {selectedResource.category}
                  </p>
                </div>

                <StatusBadge status={selectedResource.status} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Building"
                  value={selectedResource.building}
                />

                <DetailItem
                  label="Floor"
                  value={selectedResource.floor}
                />

                <DetailItem
                  label="Location"
                  value={selectedResource.location}
                />

                <DetailItem
                  label="Capacity"
                  value={String(selectedResource.capacity)}
                />

                <DetailItem
                  label="Operating Hours"
                  value={selectedResource.operatingHours}
                />

                <DetailItem
                  label="Features"
                  value={selectedResource.features || "Not specified"}
                />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Description
                </p>

                <p className="text-sm leading-6 text-gray-700">
                  {selectedResource.description || "No description provided."}
                </p>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDetailsDialogOpen(false)}
                >
                  Close
                </Button>

                <Button
                  type="button"
                  onClick={() => openEditDialog(selectedResource)}
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

      {/* Add and edit resource dialog */}
      <Dialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingResourceId !== null ? "Edit Resource" : "Add New Resource"}
            </DialogTitle>

            <DialogDescription>
              Enter the resource details, location and availability
              information.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveResource} className="space-y-5">
            {/* Basic information */}
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
                    onChange={(event) =>
                      updateForm("name", event.target.value)
                    }
                    placeholder="e.g. Conference Room A"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Category *

                  <select
                    className="form-input"
                    value={form.category}
                    onChange={(event) =>
                      updateForm("category", event.target.value)
                    }
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
                    onChange={(event) =>
                      updateForm("description", event.target.value)
                    }
                    placeholder="Describe this resource..."
                  />
                </label>
              </div>
            </section>

            {/* Location and capacity */}
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
                    onChange={(event) =>
                      updateForm("building", event.target.value)
                    }
                    placeholder="e.g. Main Building"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Floor *

                  <input
                    className="form-input"
                    value={form.floor}
                    onChange={(event) =>
                      updateForm("floor", event.target.value)
                    }
                    placeholder="e.g. Floor 2"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Specific Location *

                  <input
                    className="form-input"
                    value={form.location}
                    onChange={(event) =>
                      updateForm("location", event.target.value)
                    }
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
                      updateForm(
                        "capacity",
                        event.target.value === ""
                          ? 0
                          : Number(event.target.value)
                      )
                    }
                    required
                  />
                </label>
              </div>
            </section>

            {/* Operations and availability */}
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
                    onChange={(event) =>
                      updateForm("operatingHours", event.target.value)
                    }
                    placeholder="08:00 - 17:00"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Resource Status

                  <select
                    className="form-input"
                    value={form.status}
                    onChange={(event) =>
                      updateForm(
                        "status",
                        event.target.value as ResourceStatus
                      )
                    }
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Under Maintenance">
                      Under Maintenance
                    </option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-2">
                  Equipment and Features

                  <textarea
                    className="form-input min-h-20"
                    value={form.features}
                    onChange={(event) =>
                      updateForm("features", event.target.value)
                    }
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormDialogOpen(false)}
              >
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
    </AppShell>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="break-words text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
}

function CircleAlertIcon() {
  return <span className="text-lg font-semibold text-gray-500">!</span>;
}
