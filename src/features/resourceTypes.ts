import type { Resource, ResourceStatus } from "@/features/resources/resourceSlice";

export type ResourceFormData = Omit<Resource, "id">;

export interface ResourceStatsProps {
  total: number;
  available: number;
  maintenance: number;
  unavailable: number;
}

export interface ResourceFiltersProps {
  search: string;
  categoryFilter: string;
  statusFilter: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export interface ResourceTableProps {
  resources: Resource[];
  onView: (resource: Resource) => void;
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

export interface ResourceDetailsDialogProps {
  open: boolean;
  resource: Resource | null;
  onOpenChange: (open: boolean) => void;
  onEdit: (resource: Resource) => void;
}

export interface ResourceFormDialogProps {
  open: boolean;
  editingResourceId: number | null;
  form: ResourceFormData;
  error: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFieldChange: (field: keyof ResourceFormData, value: string | number) => void;
}
