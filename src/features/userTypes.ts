import type { UserRole } from "@/features/users/userSlice";

export const roles: UserRole[] = [
  "ADMIN",
  "EMPLOYEE",
  "FACILITY_MANAGER",
  "DEPARTMENT_MANAGER",
  "RESOURCE_OPERATOR",
];

export const departments = [
  "Administration",
  "Information Technology",
  "Human Resources",
  "Finance",
  "Facilities",
  "Engineering",
  "Operations",
];

export const roleDescriptions: Record<UserRole, string> = {
  ADMIN: "Platform administration and configuration",
  EMPLOYEE: "Search and reserve available resources",
  FACILITY_MANAGER: "Manage resources and reservation approvals",
  DEPARTMENT_MANAGER: "Review department reservation requests",
  RESOURCE_OPERATOR: "Manage schedules and maintenance",
};

export function roleLabel(role: UserRole) {
  return role.replaceAll("_", " ");
}

export function roleStyle(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "bg-violet-50 text-violet-700 ring-violet-200";
    case "FACILITY_MANAGER":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "DEPARTMENT_MANAGER":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "RESOURCE_OPERATOR":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}
