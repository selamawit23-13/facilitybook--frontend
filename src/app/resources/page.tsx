
"use client";

import { useMemo, useState, type FormEvent } from "react";
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
  X,
  RotateCcw,
  SlidersHorizontal,
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

const availableWeekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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
  availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  status: "Available",
};

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

function StatusBadge({ status }: { status: ResourceStatus }) {
  const styles: Record<ResourceStatus, string> = {
    Available: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Unavailable: "border-gray-200 bg-gray-100 text-gray-600",
    "Under Maintenance": "border-amber-200 bg-amber-50 text-amber-700",
  };

  const dotStyles: Record<ResourceStatus, string> = {
    Available: "bg-emerald-500",
    Unavailable: "bg-gray-400",
    "Under Maintenance": "bg-amber-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">{description}</p>
    </article>
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

export default function ResourcesPage() {
  const dispatch = useAppDispatch();
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

  const [form, setForm] = useState<Omit<Resource, "id">>({
    ...emptyForm,
    availableDays: [...emptyForm.availableDays],
  });

  const [error, setError] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(resources.map((resource) => resource.category))),
    [resources]
  );

  const filteredResources = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const searchableValues = [
        resource.name,
        resource.description,
        resource.category,
        resource.building,
        resource.floor,
        resource.location,
        resource.features,
      ];

      const matchesSearch =
        !searchText ||
        searchableValues.some((value) =>
          value.toLowerCase().includes(searchText)
        );

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

  const hasActiveFilters =
    search.trim() !== "" ||
    categoryFilter !== "All categories" ||
    statusFilter !== "All statuses";

  function resetFilters() {
    setSearch("");
    setCategoryFilter("All categories");
    setStatusFilter("All statuses");
  }

  function updateForm(
    field: keyof Omit<Resource, "id">,
    value: string | number | string[]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleAvailableDay(day: string) {
    setForm((current) => ({
      ...current,
      availableDays: current.availableDays.includes(day)
        ? current.availableDays.filter((item) => item !== day)
        : [...current.availableDays, day],
    }));
  }

  function openAddDialog() {
    setEditingResourceId(null);
    setForm({
      ...emptyForm,
      availableDays: [...emptyForm.availableDays],
    });
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
      availableDays: [...(resource.availableDays ?? [])],
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

  function saveResource(event: FormEvent<HTMLFormElement>) {
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

    if (form.availableDays.length === 0) {
      setError("Please select at least one available day.");
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
      availableDays: [...form.availableDays],
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

    setForm({
      ...emptyForm,
      availableDays: [...emptyForm.availableDays],
    });
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
      <div className="space-y-7 pb-8">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                FacilityBook Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Resource Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Register, organize and monitor the facilities and equipment
              available for reservation.
            </p>
          </div>

          <Button
            type="button"
            onClick={openAddDialog}
            className="h-11 shrink-0 bg-emerald-700 px-5 text-white shadow-sm hover:bg-emerald-800"
          >
            <Plus size={17} />
            Add Resource
          </Button>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Resources"
            value={resources.length}
            description="All registered facilities and equipment"
            icon={<Boxes size={21} />}
            iconClass="bg-blue-50 text-blue-700"
          />

          <StatCard
            title="Available"
            value={availableCount}
            description="Ready for reservation"
            icon={<CheckCircle2 size={21} />}
            iconClass="bg-emerald-50 text-emerald-700"
          />

          <StatCard
            title="Under Maintenance"
            value={maintenanceCount}
            description="Currently being serviced"
            icon={<Wrench size={21} />}
            iconClass="bg-amber-50 text-amber-700"
          />

          <StatCard
            title="Unavailable"
            value={unavailableCount}
            description="Not currently bookable"
            icon={<Building2 size={21} />}
            iconClass="bg-gray-100 text-gray-600"
          />
        </section>

        {/* Resource table panel */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Registered Resources
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage the resources registered in FacilityBook.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 sm:self-center">
              <Boxes size={14} />
              {filteredResources.length} of {resources.length} records
            </div>
          </div>

          {/* Search and filters */}
          <div className="space-y-3 border-b border-gray-100 bg-gray-50/70 px-5 py-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <SlidersHorizontal size={14} />
              Search and filters
            </div>

            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by resource, building, category or feature..."
                  className={`${inputClass} pl-10 pr-10`}
                  aria-label="Search resources"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className={`${inputClass} lg:w-48`}
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
                className={`${inputClass} lg:w-48`}
                aria-label="Filter resources by status"
              >
                <option>All statuses</option>
                <option>Available</option>
                <option>Unavailable</option>
                <option>Under Maintenance</option>
              </select>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetFilters}
                  className="h-11 shrink-0 border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                >
                  <RotateCcw size={15} />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Resource
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Location
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Capacity
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Operating Hours
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredResources.map((resource) => (
                  <tr
                    key={resource.id}
                    className="transition-colors hover:bg-emerald-50/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex min-w-48 flex-col gap-1">
                        <strong className="text-sm font-semibold text-gray-900">
                          {resource.name}
                        </strong>
                        <span className="max-w-56 text-xs leading-5 text-gray-500">
                          {resource.description || "No description provided"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700">
                        {resource.category}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex min-w-40 flex-col gap-1.5">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-800">
                          <Building2 size={14} className="text-gray-400" />
                          {resource.building}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin size={13} />
                          {resource.floor} · {resource.location}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                        <Users size={15} className="text-gray-400" />
                        {resource.capacity}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-600">
                        <Clock3 size={14} className="text-gray-400" />
                        {resource.operatingHours}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={resource.status} />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          title="View resource"
                          aria-label={`View ${resource.name}`}
                          onClick={() => openDetailsDialog(resource)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-emerald-100 hover:text-emerald-800"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          title="Edit resource"
                          aria-label={`Edit ${resource.name}`}
                          onClick={() => openEditDialog(resource)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          title="Delete resource"
                          aria-label={`Delete ${resource.name}`}
                          onClick={() => removeResource(resource)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredResources.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-3 rounded-2xl bg-gray-100 p-4 text-gray-400">
                          <PackageSearch size={30} />
                        </div>

                        <h3 className="font-semibold text-gray-800">
                          No resources found
                        </h3>

                        <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                          {hasActiveFilters
                            ? "No resources match your search or filters. Try adjusting them."
                            : "There are no registered resources yet. Add your first resource to get started."}
                        </p>

                        {hasActiveFilters ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={resetFilters}
                            className="mt-4"
                          >
                            <RotateCcw size={15} />
                            Clear filters
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            onClick={openAddDialog}
                            className="mt-4 bg-emerald-700 text-white hover:bg-emerald-800"
                          >
                            <Plus size={16} />
                            Add Resource
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex flex-col justify-between gap-2 border-t border-gray-100 bg-gray-50/60 px-5 py-3 text-xs text-gray-500 sm:flex-row sm:items-center">
            <span>
              Showing {filteredResources.length} of {resources.length} resources
            </span>
            <span>FacilityBook Resource Management</span>
          </div>
        </section>

        {/* Information section */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
              <Building2 size={19} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">
                Resource Information
              </h2>
              <p className="text-xs text-gray-500">
                Understand how resources are organized and managed.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 text-sm md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800">
                Resource details
              </h3>
              <p className="leading-6 text-gray-500">
                Each resource has a name, category, description and location
                to help employees identify the right facility or equipment.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-gray-800">
                Availability status
              </h3>
              <p className="leading-6 text-gray-500">
                Resources can be available, unavailable or under maintenance.
                Only available resources should be offered for new reservations.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-gray-800">
                Reservation planning
              </h3>
              <p className="leading-6 text-gray-500">
                Capacity, operating hours and resource features help employees
                choose an appropriate resource for their needs.
              </p>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-4 text-xs text-gray-400">
          <span>FacilityBook · Resource Management</span>
          <span>Facility and Resource Administration</span>
        </footer>
      </div>

      {/* View resource details */}
      <Dialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
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

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                  label="Available Days"
                  value={
                    (selectedResource.availableDays ?? []).join(", ") ||
                    "Not specified"
                  }
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

      {/* Add and edit resource */}
      <Dialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingResourceId !== null
                ? "Edit Resource"
                : "Add New Resource"}
            </DialogTitle>
            <DialogDescription>
              Enter the resource details, location and availability information.
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
                    className={inputClass}
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
                    className={inputClass}
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
                    className={`${inputClass} min-h-20`}
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
                    className={inputClass}
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
                    className={inputClass}
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
                    className={inputClass}
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
                    className={inputClass}
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
                    className={inputClass}
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
                    className={inputClass}
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

                {/* Available Days */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Available Days *
                  </label>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {availableWeekdays.map((day) => (
                      <label
                        key={day}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition ${
                          form.availableDays.includes(day)
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.availableDays.includes(day)}
                          onChange={() => toggleAvailableDay(day)}
                          className="h-4 w-4 accent-emerald-700"
                        />
                        {day}
                      </label>
                    ))}
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Select the days when this resource can be reserved.
                  </p>
                </div>

                <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-2">
                  Equipment and Features
                  <textarea
                    className={`${inputClass} min-h-20`}
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
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              >
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
